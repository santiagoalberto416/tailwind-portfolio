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

type CategoryScore = {
  total: number;
  count: number;
  average: number;
  maxScore: number;
  percentage: number;
  severity: string;
  severityColor: string;
};

const ConnersScale: FC = () => {
  const [responses, setResponses] = useState<Record<number, Response>>({});
  const [showResults, setShowResults] = useState(false);
  const [categoryScores, setCategoryScores] = useState<Record<string, CategoryScore>>({});

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

    // Calculate scores by category
    const scores: Record<string, { total: number; count: number }> = {};

    Object.values(responses).forEach((response) => {
      if (!scores[response.category]) {
        scores[response.category] = { total: 0, count: 0 };
      }
      scores[response.category].total += response.value;
      scores[response.category].count++;
    });

    // Calculate averages and severity
    const categoryResults: Record<string, CategoryScore> = {};

    Object.entries(scores).forEach(([category, data]) => {
      const average = data.total / data.count;
      const maxScore = data.count * 3;
      const percentage = (data.total / maxScore) * 100;

      let severity = "Bajo";
      let severityColor = "text-green-600";

      if (average >= 2) {
        severity = "Alto";
        severityColor = "text-red-600";
      } else if (average >= 1.5) {
        severity = "Moderado-Alto";
        severityColor = "text-orange-600";
      } else if (average >= 1) {
        severity = "Moderado";
        severityColor = "text-yellow-600";
      }

      categoryResults[category] = {
        total: data.total,
        count: data.count,
        average,
        maxScore,
        percentage,
        severity,
        severityColor,
      };
    });

    setCategoryScores(categoryResults);
    setShowResults(true);

    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Reset test
  const resetTest = () => {
    setResponses({});
    setShowResults(false);
    setCategoryScores({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get sorted categories by average score
  const getSortedCategories = (): [string, CategoryScore][] => {
    return Object.entries(categoryScores).sort((a, b) => b[1].average - a[1].average);
  };

  // Get high-risk categories
  const getHighRiskCategories = (): string[] => {
    return getSortedCategories()
      .filter(([, score]) => score.average >= 1.5)
      .map(([category]) => categories[category].name);
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

              {/* Category Scores Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {getSortedCategories().map(([category, score]) => {
                  const categoryInfo = categories[category];

                  return (
                    <div
                      key={category}
                      className="p-4 rounded-lg border-2"
                      style={{ borderColor: categoryInfo.color }}
                    >
                      {/* Category header */}
                      <div className="flex items-center mb-2">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: categoryInfo.color }}
                        />
                        <h3 className="font-bold text-gray-800">{categoryInfo.name}</h3>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-3">
                        {categoryInfo.description}
                      </p>

                      {/* Scores */}
                      <div className="flex justify-between items-end mb-3">
                        <div>
                          <p className="text-2xl font-bold text-gray-800">
                            {score.total}/{score.maxScore}
                          </p>
                          <p className="text-sm text-gray-500">
                            Promedio: {score.average.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`${score.severityColor} font-bold`}>
                            {score.severity}
                          </p>
                          <p className="text-sm text-gray-500">
                            {score.percentage.toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${score.percentage}%`,
                            backgroundColor: categoryInfo.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Interpretation */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-bold text-lg text-yellow-800 mb-3">
                  Interpretación de Resultados
                </h3>

                {getHighRiskCategories().length === 0 ? (
                  <p className="text-green-800">
                    <strong>Resultados Generales:</strong> Los puntajes están en rango
                    bajo a moderado en todas las áreas evaluadas. Esto sugiere un
                    funcionamiento dentro de parámetros esperados.
                  </p>
                ) : (
                  <>
                    <p className="text-yellow-800 mb-3">
                      <strong>Áreas que requieren atención:</strong> Se observan puntajes
                      elevados (moderado-alto o alto) en las siguientes áreas:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-yellow-800 mb-4">
                      {getHighRiskCategories().map((cat) => (
                        <li key={cat}>
                          <strong>{cat}</strong>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Important notice */}
                <div className="mt-4 p-4 bg-white rounded border border-yellow-300">
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

              {/* Action buttons */}
              <div className="mt-6 flex gap-4 justify-center">
                <button
                  onClick={() => window.print()}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  Imprimir Resultados
                </button>
                <button
                  onClick={resetTest}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
                >
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
