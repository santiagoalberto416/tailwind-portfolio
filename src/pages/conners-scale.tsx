import React, { FC, useState } from "react";
import SEO from "@/components/SEO";
import connersData from "@/data/conners-questions.json";

type ResponseOption = {
  value: number;
  label: string;
};

type Question = {
  id: number;
  text: string;
  category: string;
};

type CategoryInfo = {
  name: string;
  description: string;
  color: string;
};

type Response = {
  value: number;
  category: string;
};

const ConnersScale: FC = () => {
  const [responses, setResponses] = useState<Record<number, Response>>({});
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = connersData.questions;
  const responseOptions: ResponseOption[] = connersData.responseOptions;
  const categories: Record<string, CategoryInfo> = connersData.categories;

  // Save response for a question
  const handleResponse = (questionId: number, value: number, category: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: { value, category },
    }));
  };

  // Calculate results
  const calculateResults = () => {
    // Check if all questions are answered
    if (Object.keys(responses).length < questions.length) {
      alert("Por favor, responda todas las preguntas antes de continuar.");
      return;
    }

    setShowResults(true);

    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Export responses to JSON file
  const exportResponses = () => {
    const exportData = {
      metadata: {
        name: "Respuestas - Escala Conners",
        date: new Date().toISOString().split('T')[0],
        description: "Archivo de respuestas del cuestionario Conners",
        totalQuestions: questions.length,
        answeredQuestions: Object.keys(responses).length
      },
      responses: responses
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `conners-respuestas-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import responses from JSON file
  const importResponses = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);

        // Validate the structure
        if (data.responses && typeof data.responses === 'object') {
          // Convert string keys to numbers if needed
          const importedResponses: Record<number, Response> = {};
          Object.entries(data.responses).forEach(([key, value]: [string, any]) => {
            const questionId = parseInt(key);
            if (value && typeof value === 'object' && 'value' in value && 'category' in value) {
              importedResponses[questionId] = value as Response;
            }
          });

          setResponses(importedResponses);
          setShowResults(false);
          alert(`¡Respuestas cargadas exitosamente! (${Object.keys(importedResponses).length} preguntas)`);
        } else {
          alert("El archivo no tiene el formato correcto. Por favor, verifica el archivo.");
        }
      } catch (error) {
        alert("Error al leer el archivo. Asegúrate de que sea un archivo JSON válido.");
      }
    };
    reader.readAsText(file);
  };

  // Reset test
  const resetTest = () => {
    setResponses({});
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get interpretation based on total score
  const getInterpretation = (totalScore: number): { range: string; interpretations: string[]; color: string; title: string } => {
    if (totalScore <= 80) {
      return {
        range: "0 - 80",
        title: "Rango Normal",
        color: "green",
        interpretations: [
          "El niño no presenta dificultades cotidianas ni en la casa",
          "Puede considerarse un niño normoactivo",
          "Podría tratarse de un niño hipoactivo"
        ]
      };
    } else if (totalScore <= 160) {
      return {
        range: "81 - 160",
        title: "Rango Moderado",
        color: "yellow",
        interpretations: [
          "Puede tratarse de un niño hiperactivo situacional",
          "Puede tratarse de un niño normoactivo, pero inmaduro de temperamento"
        ]
      };
    } else {
      return {
        range: "161 - 240",
        title: "Rango Alto",
        color: "red",
        interpretations: [
          "Puede tratarse de un niño hiperactivo",
          "Puede tratarse de un niño disruptivo"
        ]
      };
    }
  };

  return (
    <>
      <SEO
        pageTitle="Escala Conners para Padres"
        pageDescription="Cuestionario para evaluar problemas de conducta y atención en niños"
      />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8 px-4 font-['Inter',sans-serif]">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6 border border-purple-100">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              {connersData.title}
            </h1>
            <p className="text-gray-600 text-lg">{connersData.description}</p>
            <div className="mt-4 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-purple-200/50">
              <p className="text-sm text-purple-900 leading-relaxed">
                <strong className="text-purple-700">📋 Instrucciones:</strong> Por favor, responda cada pregunta según
                la frecuencia con que observa cada comportamiento en su hijo(a).
              </p>
            </div>

            {/* Import/Export Controls */}
            <div className="mt-4 flex flex-wrap gap-3">
              <label className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-2.5 px-5 rounded-xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Cargar Respuestas
                <input
                  type="file"
                  accept=".json"
                  onChange={importResponses}
                  className="hidden"
                />
              </label>

              {Object.keys(responses).length > 0 && (
                <button
                  onClick={exportResponses}
                  className="bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 text-white font-semibold py-2.5 px-5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  Guardar Respuestas ({Object.keys(responses).length}/{questions.length})
                </button>
              )}
            </div>
          </div>

          {/* Questionnaire */}
          {!showResults && (
            <>
              <div className="space-y-4 mb-8">
                {questions.map((question) => {
                  const isAnswered = responses[question.id] !== undefined;

                  return (
                    <div
                      key={question.id}
                      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 transition-all duration-300 border-2 ${
                        isAnswered ? "border-green-300 shadow-green-100" : "border-purple-100"
                      }`}
                    >
                      {/* Question number */}
                      <div className="flex items-start mb-4">
                        <span className="text-gray-500 text-sm font-medium">
                          Pregunta {question.id}
                        </span>
                      </div>

                      {/* Question text */}
                      <p className="text-gray-700 mb-4 text-lg leading-relaxed font-medium">{question.text}</p>

                      {/* Response options */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {responseOptions.map((option) => {
                          const isSelected = responses[question.id]?.value === option.value;

                          return (
                            <label
                              key={option.value}
                              className={`flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                isSelected
                                  ? "border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 shadow-md"
                                  : "border-purple-200/50 hover:border-purple-300 hover:bg-purple-50/30"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`q${question.id}`}
                                value={option.value}
                                checked={isSelected}
                                onChange={() =>
                                  handleResponse(
                                    question.id,
                                    option.value,
                                    question.category
                                  )
                                }
                                className="mr-2 w-4 h-4 text-purple-600 accent-purple-500"
                              />
                              <span className="text-sm font-semibold text-gray-700">{option.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Submit Button */}
              <div className="text-center mb-8">
                <button
                  onClick={calculateResults}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg"
                >
                  ✨ Calcular Resultados
                </button>
              </div>
            </>
          )}

          {/* Results Section */}
          {showResults && (
            <div id="results" className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-purple-100">
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center">
                ✨ Resultados del Cuestionario
              </h2>

              {/* Total Score Summary */}
              <div className="mb-8 p-8 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-2xl border-2 border-purple-200/50 shadow-lg">
                <div className="flex flex-wrap justify-center items-center gap-8">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-purple-700 mb-3 uppercase tracking-wide">Puntuación Total</p>
                    <p className="text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {Object.values(responses).reduce((sum, r) => sum + r.value, 0)}
                    </p>
                    <p className="text-sm text-purple-600 mt-2 font-medium">de 252 puntos</p>
                  </div>
                </div>
              </div>

              {/* Interpretation based on total score */}
              {(() => {
                const totalScore = Object.values(responses).reduce((sum, r) => sum + r.value, 0);
                const interpretation = getInterpretation(totalScore);

                const bgColors = {
                  green: "bg-gradient-to-br from-green-50 to-teal-50 border-green-300/50",
                  yellow: "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300/50",
                  red: "bg-gradient-to-br from-red-50 to-pink-50 border-red-300/50"
                };

                const textColors = {
                  green: "text-green-700",
                  yellow: "text-yellow-700",
                  red: "text-red-700"
                };

                const titleColors = {
                  green: "text-green-800",
                  yellow: "text-yellow-800",
                  red: "text-red-800"
                };

                return (
                  <div className={`p-8 rounded-2xl border-2 shadow-xl ${bgColors[interpretation.color as keyof typeof bgColors]}`}>
                    <div className="mb-6">
                      <h3 className={`font-extrabold text-3xl mb-3 ${titleColors[interpretation.color as keyof typeof titleColors]}`}>
                        {interpretation.title}
                      </h3>
                      <p className={`text-base font-semibold ${textColors[interpretation.color as keyof typeof textColors]}`}>
                        📊 Rango de puntuación: {interpretation.range} puntos
                      </p>
                    </div>

                    <div className={`${textColors[interpretation.color as keyof typeof textColors]}`}>
                      <p className="font-bold mb-4 text-lg">💡 Interpretación:</p>
                      <ul className="space-y-3">
                        {interpretation.interpretations.map((text, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-3 text-lg">✓</span>
                            <span className="leading-relaxed font-medium">{text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Important notice */}
                    <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-purple-200/50 shadow-md">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <strong className="text-purple-700">⚠️ Nota importante:</strong> Esta herramienta es solo para fines
                        orientativos y educativos. Los resultados NO constituyen un
                        diagnóstico clínico. Si tiene preocupaciones sobre el comportamiento o
                        desarrollo de su hijo(a), consulte con un profesional de la salud
                        mental calificado (psicólogo, psiquiatra infantil o pediatra
                        especializado).
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <button
                  onClick={exportResponses}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-7 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  Guardar Respuestas
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 text-white font-semibold py-3 px-7 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Imprimir Resultados
                </button>
                <button
                  onClick={resetTest}
                  className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-3 px-7 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Realizar Nuevo Test
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Print styles */}
      <style jsx>{`
        @media print {
          body {
            background: white;
          }
          .bg-gradient-to-br {
            background: white;
          }
        }
      `}</style>
    </>
  );
};

export default ConnersScale;
