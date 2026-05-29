import React, { useState } from "react";
import SEO from "@/components/SEO";
import data from "@/data/social-skills-cards.json";

type Card = {
  id: string;
  category: string;
  number: number;
  type: string;
  scenario: string;
  questions: string[];
  tags: string[];
};

const CATEGORIES = [
  { name: "Interacciones Básicas", color: "text-blue-700", bg: "bg-blue-100", border: "border-blue-200", icon: "🤝", count: 16 },
  { name: "Habilidades de Conversación", color: "text-emerald-700", bg: "bg-emerald-100", border: "border-emerald-200", icon: "💬", count: 16 },
  { name: "Empatía", color: "text-amber-700", bg: "bg-amber-100", border: "border-amber-200", icon: "❤️", count: 16 },
  { name: "Amistades", color: "text-pink-700", bg: "bg-pink-100", border: "border-pink-200", icon: "👫", count: 16 },
  { name: "Manejo de Conflictos", color: "text-violet-700", bg: "bg-violet-100", border: "border-violet-200", icon: "🛡️", count: 16 },
];

const CATEGORY_BG: Record<string, string> = {
  "Interacciones Básicas": "bg-blue-300",
  "Habilidades de Conversación": "bg-emerald-300",
  "Empatía": "bg-amber-300",
  "Amistades": "bg-pink-300",
  "Manejo de Conflictos": "bg-violet-300",
};

const CATEGORY_ICONS: Record<string, string> = {
  "Interacciones Básicas": "🤝",
  "Habilidades de Conversación": "💬",
  "Empatía": "❤️",
  "Amistades": "👫",
  "Manejo de Conflictos": "🛡️",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SocialSkillsCards = () => {
  const allCards = data.cards as Card[];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategoryList, setShowCategoryList] = useState(true);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [flippedSet, setFlippedSet] = useState<Set<number>>(new Set());

  const selectCategory = (name: string) => {
    setSelectedCategory(name);
    setShowCategoryList(false);
    setFilteredCards(shuffle(allCards.filter((c) => c.category === name)));
    setFlippedSet(new Set());
  };

  const goBackToCategories = () => {
    setSelectedCategory(null);
    setShowCategoryList(true);
  };

  const toggleFlip = (idx: number) => {
    setFlippedSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  if (showCategoryList) {
    return (
      <>
        <SEO pageTitle="Tarjetas de Habilidades Sociales" pageDescription="Explora y practica habilidades sociales con tarjetas educativas interactivas" />
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-pink-50 to-amber-50 pb-16">
          <div className="max-w-2xl mx-auto px-4 pt-8">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">Tarjetas de Habilidades Sociales</h1>
            <p className="text-blue-600 mb-8 text-lg">{data.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CATEGORIES.map((cat) => {
                const categoryCards = allCards.filter((c) => c.category === cat.name);
                const tags = Array.from(new Set(categoryCards.flatMap((c) => c.tags)));
                return (
                  <button
                    key={cat.name}
                    onClick={() => selectCategory(cat.name)}
                    className={`relative flex flex-col items-start p-6 rounded-2xl border-2 ${cat.border} ${cat.bg} transition-all active:scale-[0.97] hover:shadow-lg text-left w-full`}
                  >
                    <span className="text-4xl mb-3">{cat.icon}</span>
                    <span className={`text-xl font-semibold ${cat.color} mb-1`}>{cat.name}</span>
                    <span className="text-blue-400 text-sm">{cat.count} tarjetas</span>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {tags.slice(0, 4).map((t) => (
                        <span key={t} className={`text-xs px-2 py-0.5 rounded-md ${cat.bg} ${cat.color}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  const catBg = selectedCategory ? CATEGORY_BG[selectedCategory] : "bg-gray-500";
  const catIcon = selectedCategory ? CATEGORY_ICONS[selectedCategory] : "?";

  return (
    <>
      <SEO pageTitle={selectedCategory || "Habilidades Sociales"} pageDescription={`Tarjetas de ${selectedCategory}`} />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-pink-50 to-amber-50 pb-8">
        <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-blue-100">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
            <button
              onClick={goBackToCategories}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-blue-50 border border-blue-200 transition-colors text-xl text-blue-400"
            >
              ←
            </button>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{catIcon}</span>
              <div>
                <h2 className="text-lg font-semibold text-blue-800 leading-tight">{selectedCategory}</h2>
                <span className="text-sm text-blue-400">{filteredCards.length} tarjetas · {flippedSet.size} volteadas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 pt-6 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {filteredCards.map((card, idx) => {
              const isFlipped = flippedSet.has(idx);
              return (
                <div
                  key={card.id}
                  style={{ perspective: "1000px" }}
                >
                  <div
                    className="relative w-full cursor-pointer select-none"
                    style={{
                      minHeight: "360px",
                      transition: "transform 0.5s",
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                    onClick={() => toggleFlip(idx)}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <div className={`w-full h-full rounded-2xl ${catBg} flex flex-col items-center justify-center gap-2 text-white shadow-sm border border-white/30 min-h-[328px]`}>
                        <span className="text-5xl">{catIcon}</span>
                        <span className="text-4xl font-bold">{card.number}</span>
                        <span className="text-xs text-white/80 mt-2">Toca para descubrir</span>
                      </div>
                    </div>

                    <div
                      className="absolute inset-0 rounded-2xl bg-white/90 shadow-sm border border-blue-100 flex flex-col overflow-hidden backdrop-blur-sm"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                      <div className="flex items-center justify-between px-4 py-3 border-b shrink-0" style={{ borderColor: "rgb(219 234 254)" }}>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-md text-white ${catBg}`}>
                            {card.type}
                          </span>
                          <span className="text-xs text-blue-400">#{card.number}</span>
                        </div>
                        <span className="text-xl">{catIcon}</span>
                      </div>

                      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">Situación</h4>
                          <p className="text-blue-900 text-sm leading-relaxed">{card.scenario}</p>
                        </div>

                        {card.questions.length > 0 && (
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">Preguntas</h4>
                            <ul className="space-y-1.5">
                              {card.questions.map((q, qi) => (
                                <li key={qi} className="flex items-start gap-1.5 text-blue-800 text-sm">
                                  <span className="text-blue-400 font-bold shrink-0 mt-0.5">?</span>
                                  <span>{q}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">Etiquetas</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {card.tags.map((t) => (
                              <span key={t} className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-2 border-t shrink-0 text-center" style={{ borderColor: "rgb(219 234 254)" }}>
                        <span className="text-xs text-blue-300">Toca para voltear</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialSkillsCards;
