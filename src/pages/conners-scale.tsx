import React, { FC, useState, useEffect } from "react";
import SEO from "@/components/SEO";
import connersDataParents from "@/data/conners-questions.json";
import connersDataTeachers from "@/data/conners-questions-teachers.json";

type ResponseOption = {
  value: number;
  label: string;
};

type Question = {
  id: number;
  text: string;
  category: string;
};

type Response = {
  value: number;
  category: string;
};

type CategoryInfo = {
  name: string;
  description: string;
  color: string;
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

type QuestionnaireType = "parents" | "teachers";

const LOCALSTORAGE_KEY = "conners-scale-autosave";

const ConnersScale: FC = () => {
  const [questionnaireType, setQuestionnaireType] =
    useState<QuestionnaireType>("parents");
  const [responses, setResponses] = useState<Record<number, Response>>({});
  const [showResults, setShowResults] = useState(false);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

  const connersData =
    questionnaireType === "parents" ? connersDataParents : connersDataTeachers;
  const questions: Question[] = connersData.questions;
  const responseOptions: ResponseOption[] = connersData.responseOptions;
  const categories: Record<string, CategoryInfo> = connersData.categories;

  // Load from localStorage on mount
  useEffect(() => {
    if (hasLoadedFromStorage) return;

    try {
      const savedData = localStorage.getItem(LOCALSTORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.responses && Object.keys(parsed.responses).length > 0) {
          const shouldRestore = window.confirm(
            `Se encontraron respuestas guardadas anteriormente (${Object.keys(parsed.responses).length} preguntas del cuestionario "${parsed.questionnaireType === "parents" ? "Padres" : "Maestros"}"). ¿Desea recuperarlas?`
          );

          if (shouldRestore) {
            if (parsed.questionnaireType) {
              setQuestionnaireType(parsed.questionnaireType);
            }
            setResponses(parsed.responses);
          } else {
            // Clear localStorage if user doesn't want to restore
            localStorage.removeItem(LOCALSTORAGE_KEY);
          }
        }
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }

    setHasLoadedFromStorage(true);
  }, [hasLoadedFromStorage]);

  // Auto-save to localStorage when responses or questionnaire type change
  useEffect(() => {
    if (!hasLoadedFromStorage) return;

    if (Object.keys(responses).length > 0) {
      try {
        const dataToSave = {
          questionnaireType,
          responses,
          lastSaved: new Date().toISOString(),
        };
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(dataToSave));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  }, [responses, questionnaireType, hasLoadedFromStorage]);

  // Save response for a question
  const handleResponse = (
    questionId: number,
    value: number,
    category: string,
  ) => {
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
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Calculate category scores
  const getCategoryScores = (): Record<string, CategoryScore> => {
    const scores: Record<string, { total: number; count: number }> = {};

    Object.values(responses).forEach((response) => {
      if (!scores[response.category]) {
        scores[response.category] = { total: 0, count: 0 };
      }
      scores[response.category].total += response.value;
      scores[response.category].count++;
    });

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

    return categoryResults;
  };

  // Get high-score questions (2 and 3)
  const getHighlightQuestions = (): { question: Question; score: number }[] => {
    return Object.entries(responses)
      .filter(([, response]) => response.value >= 2)
      .map(([questionId, response]) => ({
        question: questions.find((q) => q.id === parseInt(questionId))!,
        score: response.value,
      }))
      .sort((a, b) => b.score - a.score);
  };

  // Export responses to JSON file
  const exportResponses = () => {
    const exportData = {
      metadata: {
        name: "Respuestas - Escala Conners",
        date: new Date().toISOString().split("T")[0],
        description: "Archivo de respuestas del cuestionario Conners",
        questionnaireType: questionnaireType,
        totalQuestions: questions.length,
        answeredQuestions: Object.keys(responses).length,
      },
      responses: responses,
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `conners-respuestas-${new Date().toISOString().split("T")[0]}.json`;
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
        if (data.responses && typeof data.responses === "object") {
          // Check if questionnaire type matches
          const importedType = data.metadata?.questionnaireType as QuestionnaireType | undefined;

          if (importedType && importedType !== questionnaireType) {
            // Ask user if they want to switch questionnaire types
            const switchType = window.confirm(
              `Las respuestas son del cuestionario "${importedType === "parents" ? "Padres" : "Maestros"}". ` +
              `Actualmente está en el cuestionario "${questionnaireType === "parents" ? "Padres" : "Maestros"}". ` +
              `¿Desea cambiar automáticamente al cuestionario correcto?`
            );

            if (switchType) {
              setQuestionnaireType(importedType);
            } else {
              alert("Carga cancelada. Por favor, seleccione el tipo de cuestionario correcto primero.");
              // Reset file input
              event.target.value = "";
              return;
            }
          }

          // Convert string keys to numbers if needed
          const importedResponses: Record<number, Response> = {};
          Object.entries(data.responses).forEach(
            ([key, value]: [string, any]) => {
              const questionId = parseInt(key);
              if (
                value &&
                typeof value === "object" &&
                "value" in value &&
                "category" in value
              ) {
                importedResponses[questionId] = value as Response;
              }
            },
          );

          setResponses(importedResponses);
          setShowResults(false);
          alert(
            `¡Respuestas cargadas exitosamente! (${Object.keys(importedResponses).length} preguntas)`,
          );
        } else {
          alert(
            "El archivo no tiene el formato correcto. Por favor, verifica el archivo.",
          );
        }
      } catch (error) {
        alert(
          "Error al leer el archivo. Asegúrate de que sea un archivo JSON válido.",
        );
      }
    };
    reader.readAsText(file);

    // Reset file input to allow re-importing the same file
    event.target.value = "";
  };

  // Reset test
  const resetTest = () => {
    setResponses({});
    setShowResults(false);
    // Clear localStorage
    localStorage.removeItem(LOCALSTORAGE_KEY);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get interpretation based on total score and questionnaire type
  const getInterpretation = (
    totalScore: number,
  ): {
    range: string;
    interpretations: string[];
    color: string;
    title: string;
  } => {
    if (questionnaireType === "parents") {
      // Interpretation for parents (84 questions, max 252 points)
      if (totalScore <= 80) {
        return {
          range: "0 - 80",
          title: "Rango Normal",
          color: "green",
          interpretations: [
            "El niño no presenta dificultades cotidianas ni en la casa",
            "Puede considerarse un niño normoactivo",
            "Podría tratarse de un niño hipoactivo",
          ],
        };
      } else if (totalScore <= 160) {
        return {
          range: "81 - 160",
          title: "Rango Moderado",
          color: "yellow",
          interpretations: [
            "Puede tratarse de un niño hiperactivo situacional",
            "Puede tratarse de un niño normoactivo, pero inmaduro de temperamento",
          ],
        };
      } else {
        return {
          range: "161 - 240",
          title: "Rango Alto",
          color: "red",
          interpretations: [
            "Puede tratarse de un niño hiperactivo",
            "Puede tratarse de un niño disruptivo",
          ],
        };
      }
    } else {
      // Interpretation for teachers (59 questions, max 177 points)
      if (totalScore <= 59) {
        return {
          range: "0 - 59",
          title: "Rango Normal",
          color: "green",
          interpretations: [
            "El niño no presenta dificultades en el aula",
            "Puede considerarse un niño normoactivo",
            "Podría tratarse de un niño hipoactivo",
          ],
        };
      } else if (totalScore <= 118) {
        return {
          range: "60 - 118",
          title: "Rango Moderado",
          color: "yellow",
          interpretations: [
            "Puede tratarse de un niño hiperactivo situacional",
            "Puede tratarse de un niño normoactivo, pero inmaduro de temperamento",
          ],
        };
      } else {
        return {
          range: "119 - 177",
          title: "Rango Alto",
          color: "red",
          interpretations: [
            "Puede tratarse de un niño hiperactivo",
            "Puede tratarse de un niño disruptivo",
          ],
        };
      }
    }
  };

  // Handle questionnaire type change
  const handleQuestionnaireTypeChange = (type: QuestionnaireType) => {
    if (type !== questionnaireType) {
      // Warn user if they have responses
      if (Object.keys(responses).length > 0) {
        const confirmSwitch = window.confirm(
          "Cambiar el tipo de cuestionario eliminará todas las respuestas actuales. ¿Desea continuar?"
        );
        if (!confirmSwitch) {
          return;
        }
      }
      setQuestionnaireType(type);
      setResponses({});
      setShowResults(false);
      // Clear localStorage when switching types manually
      localStorage.removeItem(LOCALSTORAGE_KEY);
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
              Escala Conners - Forma Revisada
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              Cuestionario para evaluar problemas de conducta y atención en
              niños
            </p>

            {/* Questionnaire Type Selector */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-purple-700 mb-3">
                Seleccione el tipo de cuestionario:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => handleQuestionnaireTypeChange("parents")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    questionnaireType === "parents"
                      ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg"
                      : "border-purple-200/50 hover:border-purple-300 hover:bg-purple-50/30"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">👨‍👩‍👧‍👦</span>
                    <span className="font-bold text-lg text-gray-800">
                      Para Padres
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    84 preguntas sobre el comportamiento en casa
                  </p>
                </button>

                <button
                  onClick={() => handleQuestionnaireTypeChange("teachers")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    questionnaireType === "teachers"
                      ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg"
                      : "border-purple-200/50 hover:border-purple-300 hover:bg-purple-50/30"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">👨‍🏫</span>
                    <span className="font-bold text-lg text-gray-800">
                      Para Maestros
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    59 preguntas sobre el comportamiento en el aula
                  </p>
                </button>
              </div>
            </div>
            <div className="mt-4 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-purple-200/50">
              <p className="text-sm text-purple-900 leading-relaxed">
                <strong className="text-purple-700">📋 Instrucciones:</strong>{" "}
                {questionnaireType === "parents"
                  ? "Por favor, responda cada pregunta según la frecuencia con que observa cada comportamiento en su hijo(a)."
                  : "Por favor, responda cada pregunta según la frecuencia con que observa cada comportamiento en el estudiante en el aula."}
              </p>
            </div>

            {/* Import/Export Controls */}
            <div className="mt-4 flex flex-wrap gap-3">
              <label className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-2.5 px-5 rounded-xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
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
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                  Guardar Respuestas ({Object.keys(responses).length}/
                  {questions.length})
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
                        isAnswered
                          ? "border-green-300 shadow-green-100"
                          : "border-purple-100"
                      }`}
                    >
                      {/* Question number */}
                      <div className="flex items-start mb-4">
                        <span className="text-gray-500 text-sm font-medium">
                          Pregunta {question.id}
                        </span>
                      </div>

                      {/* Question text */}
                      <p className="text-gray-700 mb-4 text-lg leading-relaxed font-medium">
                        {question.text}
                      </p>

                      {/* Response options */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {responseOptions.map((option) => {
                          const isSelected =
                            responses[question.id]?.value === option.value;

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
                                    question.category,
                                  )
                                }
                                className="mr-2 w-4 h-4 text-purple-600 accent-purple-500"
                              />
                              <span className="text-sm font-semibold text-gray-700">
                                {option.label}
                              </span>
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
            <div
              id="results"
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-purple-100"
            >
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center">
                ✨ Resultados del Cuestionario
              </h2>

              {/* Total Score Summary */}
              <div className="mb-8 p-8 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-2xl border-2 border-purple-200/50 shadow-lg">
                <div className="flex flex-wrap justify-center items-center gap-8">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-purple-700 mb-3 uppercase tracking-wide">
                      Puntuación Total
                    </p>
                    <p className="text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {Object.values(responses).reduce(
                        (sum, r) => sum + r.value,
                        0,
                      )}
                    </p>
                    <p className="text-sm text-purple-600 mt-2 font-medium">
                      de {questions.length * 3} puntos (
                      {questionnaireType === "parents" ? "Padres" : "Maestros"})
                    </p>
                  </div>
                </div>
              </div>

              {/* Category Scores Grid */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  📊 Resultados por Área
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(getCategoryScores())
                    .sort((a, b) => b[1].average - a[1].average)
                    .map(([category, score]) => {
                      const categoryInfo = categories[category];

                      return (
                        <div
                          key={category}
                          className="p-4 rounded-xl border-2"
                          style={{ borderColor: categoryInfo.color }}
                        >
                          {/* Category header */}
                          <div className="flex items-center mb-2">
                            <div
                              className="w-6 h-3 rounded-md mr-2"
                              style={{ backgroundColor: categoryInfo.color }}
                            />
                            <h3 className="font-bold text-gray-800">
                              {categoryInfo.name}
                            </h3>
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
                          <div className="w-full bg-gray-200 rounded-lg h-2">
                            <div
                              className="h-2 rounded-lg transition-all duration-500"
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
              </div>

              {/* Highlight Questions */}
              {getHighlightQuestions().length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    ⚠️ Áreas de Mayor Preocupación
                  </h3>
                  <div className="space-y-3">
                    {getHighlightQuestions().map(({ question, score }) => {
                      const categoryInfo = categories[question.category];

                      return (
                        <div
                          key={question.id}
                          className={`p-4 rounded-xl border-2 ${
                            score === 3
                              ? "bg-red-50 border-red-300"
                              : "bg-orange-50 border-orange-300"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="flex-shrink-0 w-10 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                              style={{ backgroundColor: categoryInfo.color }}
                            >
                              {score}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="text-xs font-semibold text-gray-500">
                                  Pregunta {question.id}
                                </span>
                                <span
                                  className="text-xs px-2.5 py-1 rounded-lg text-white font-semibold"
                                  style={{
                                    backgroundColor: categoryInfo.color,
                                  }}
                                >
                                  {categoryInfo.name}
                                </span>
                              </div>
                              <p className="text-gray-800 font-medium">
                                {question.text}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {score === 3
                                  ? "Muy frecuentemente"
                                  : "A menudo"}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Interpretation based on total score */}
              {(() => {
                const totalScore = Object.values(responses).reduce(
                  (sum, r) => sum + r.value,
                  0,
                );
                const interpretation = getInterpretation(totalScore);

                const bgColors = {
                  green:
                    "bg-gradient-to-br from-green-50 to-teal-50 border-green-300/50",
                  yellow:
                    "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300/50",
                  red: "bg-gradient-to-br from-red-50 to-pink-50 border-red-300/50",
                };

                const textColors = {
                  green: "text-green-700",
                  yellow: "text-yellow-700",
                  red: "text-red-700",
                };

                const titleColors = {
                  green: "text-green-800",
                  yellow: "text-yellow-800",
                  red: "text-red-800",
                };

                return (
                  <div
                    className={`p-8 rounded-2xl border-2 shadow-xl ${bgColors[interpretation.color as keyof typeof bgColors]}`}
                  >
                    <div className="mb-6">
                      <h3
                        className={`font-extrabold text-3xl mb-3 ${titleColors[interpretation.color as keyof typeof titleColors]}`}
                      >
                        {interpretation.title}
                      </h3>
                      <p
                        className={`text-base font-semibold ${textColors[interpretation.color as keyof typeof textColors]}`}
                      >
                        📊 Rango de puntuación: {interpretation.range} puntos
                      </p>
                    </div>

                    <div
                      className={`${textColors[interpretation.color as keyof typeof textColors]}`}
                    >
                      <p className="font-bold mb-4 text-lg">
                        💡 Interpretación:
                      </p>
                      <ul className="space-y-3">
                        {interpretation.interpretations.map((text, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-3 text-lg">✓</span>
                            <span className="leading-relaxed font-medium">
                              {text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Important notice */}
                    <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-purple-200/50 shadow-md">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <strong className="text-purple-700">
                          ⚠️ Nota importante:
                        </strong>{" "}
                        Esta herramienta es solo para fines orientativos y
                        educativos. Los resultados NO constituyen un diagnóstico
                        clínico. Si tiene preocupaciones sobre el comportamiento
                        o desarrollo de su hijo(a), consulte con un profesional
                        de la salud mental calificado (psicólogo, psiquiatra
                        infantil o pediatra especializado).
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
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                  Guardar Respuestas
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 text-white font-semibold py-3 px-7 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  Imprimir Resultados
                </button>
                <button
                  onClick={resetTest}
                  className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-3 px-7 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
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
