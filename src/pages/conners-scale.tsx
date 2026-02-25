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

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {connersData.title}
            </h1>
            <p className="text-gray-600">{connersData.description}</p>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Instrucciones:</strong> Por favor, responda cada pregunta según
                la frecuencia con que observa cada comportamiento en su hijo(a).
              </p>
            </div>

            {/* Import/Export Controls */}
            <div className="mt-4 flex flex-wrap gap-3">
              <label className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer transition inline-flex items-center">
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
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition inline-flex items-center"
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
                  const categoryInfo = categories[question.category];
                  const isAnswered = responses[question.id] !== undefined;

                  return (
                    <div
                      key={question.id}
                      className={`bg-white rounded-lg shadow p-6 transition-all ${
                        isAnswered ? "ring-2 ring-green-400" : ""
                      }`}
                    >
                      {/* Category badge and question number */}
                      <div className="flex items-start mb-4">
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mr-3"
                          style={{ backgroundColor: categoryInfo.color }}
                        >
                          {categoryInfo.name}
                        </span>
                        <span className="text-gray-500 text-sm">
                          Pregunta {question.id}
                        </span>
                      </div>

                      {/* Question text */}
                      <p className="text-gray-800 mb-4 text-lg">{question.text}</p>

                      {/* Response options */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {responseOptions.map((option) => {
                          const isSelected = responses[question.id]?.value === option.value;

                          return (
                            <label
                              key={option.value}
                              className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition hover:bg-gray-50 ${
                                isSelected
                                  ? "border-indigo-600 bg-indigo-50"
                                  : "border-gray-200 hover:border-indigo-400"
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
                                className="mr-2 w-4 h-4 text-indigo-600"
                              />
                              <span className="text-sm font-medium">{option.label}</span>
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
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition hover:scale-105"
                >
                  Calcular Resultados
                </button>
              </div>
            </>
          )}

          {/* Results Section */}
          {showResults && (
            <div id="results" className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Resultados del Cuestionario
              </h2>

              {/* Total Score Summary */}
              <div className="mb-6 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border-2 border-indigo-200">
                <div className="flex flex-wrap justify-center items-center gap-8">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Puntuación Total</p>
                    <p className="text-5xl font-bold text-indigo-600">
                      {Object.values(responses).reduce((sum, r) => sum + r.value, 0)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">de 252 puntos</p>
                  </div>
                </div>
              </div>

              {/* Interpretation based on total score */}
              {(() => {
                const totalScore = Object.values(responses).reduce((sum, r) => sum + r.value, 0);
                const interpretation = getInterpretation(totalScore);

                const bgColors = {
                  green: "bg-green-50 border-green-200",
                  yellow: "bg-yellow-50 border-yellow-200",
                  red: "bg-red-50 border-red-200"
                };

                const textColors = {
                  green: "text-green-800",
                  yellow: "text-yellow-800",
                  red: "text-red-800"
                };

                const titleColors = {
                  green: "text-green-900",
                  yellow: "text-yellow-900",
                  red: "text-red-900"
                };

                return (
                  <div className={`p-6 rounded-lg border-2 ${bgColors[interpretation.color as keyof typeof bgColors]}`}>
                    <div className="mb-4">
                      <h3 className={`font-bold text-2xl mb-2 ${titleColors[interpretation.color as keyof typeof titleColors]}`}>
                        {interpretation.title}
                      </h3>
                      <p className={`text-sm font-medium ${textColors[interpretation.color as keyof typeof textColors]}`}>
                        Rango de puntuación: {interpretation.range} puntos
                      </p>
                    </div>

                    <div className={`${textColors[interpretation.color as keyof typeof textColors]}`}>
                      <p className="font-semibold mb-3">Interpretación:</p>
                      <ul className="space-y-2">
                        {interpretation.interpretations.map((text, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Important notice */}
                    <div className="mt-6 p-4 bg-white rounded border-2 border-gray-300">
                      <p className="text-sm text-gray-700">
                        <strong>Nota importante:</strong> Esta herramienta es solo para fines
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
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <button
                  onClick={exportResponses}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  Guardar Respuestas
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Imprimir Resultados
                </button>
                <button
                  onClick={resetTest}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition inline-flex items-center"
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
