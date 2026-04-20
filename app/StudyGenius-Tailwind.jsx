'use client';

import { useState } from "react";
import Link from "next/link";

const MATERIAL_TYPES = [
  { value: "summary",    label: "📋 Summary" },
  { value: "quiz",       label: "❓ Quiz" },
  { value: "notes",      label: "📝 Notes" },
  { value: "flashcards", label: "🎴 Flashcards" },
];

const DIFFICULTY_LEVELS = [
  { value: "easy",   label: "🟢 Easy" },
  { value: "medium", label: "🟡 Medium" },
  { value: "hard",   label: "🔴 Hard" },
];

const FEATURES = [
  {
    icon: "🤖",
    title: "AI-Powered",
    description: "State-of-the-art AI generates high-quality study content instantly.",
  },
  {
    icon: "🎯",
    title: "Personalised",
    description: "Tailored to your topic, difficulty and preferred material format.",
  },
  {
    icon: "⚡",
    title: "Instant Results",
    description: "Get comprehensive study materials in seconds, not hours.",
  },
  {
    icon: "📱",
    title: "Any Device",
    description: "Fully responsive — study on desktop, tablet or mobile.",
  },
];

export default function StudyGeniusTailwind() {
  const [activeTab, setActiveTab] = useState("home");

  // Form state
  const [topic, setTopic] = useState("");
  const [materialType, setMaterialType] = useState("summary");
  const [difficulty, setDifficulty] = useState("medium");
  const [details, setDetails] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic before generating.");
      return;
    }
    setError("");
    setContent("");
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, materialType, difficulty, details }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to generate content. Please try again.");
      } else {
        setContent(data.content || "");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => {
        setError("Could not copy to clipboard. Please copy the text manually.");
      }
    );
  };

  const difficultyStyles = {
    easy:   { active: "bg-emerald-100 border-emerald-500 text-emerald-800", base: "hover:bg-emerald-50 hover:border-emerald-300" },
    medium: { active: "bg-amber-100 border-amber-500 text-amber-800",       base: "hover:bg-amber-50 hover:border-amber-300" },
    hard:   { active: "bg-red-100 border-red-500 text-red-800",             base: "hover:bg-red-50 hover:border-red-300" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* Subtle background overlay */}
      <div className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 50%), " +
            "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.06) 0%, transparent 50%)",
        }}
      />

      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-50 bg-black/25 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-2xl font-bold text-white tracking-tight">📚 Study Genius</span>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white text-sm font-medium
                         hover:bg-white/20 transition-all"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Tab Bar ── */}
      <div className="flex justify-center gap-2 pt-6 relative z-10">
        {[
          { key: "home",   label: "🏠 Home" },
          { key: "create", label: "✨ Create" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all border
              ${activeTab === key
                ? "bg-white text-indigo-600 border-transparent shadow-md"
                : "bg-white/10 text-white/75 border-white/20 hover:bg-white/20 hover:text-white"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Main ── */}
      <main className="max-w-5xl mx-auto px-6 py-12 relative z-10">

        {/* ════ HOME TAB ════ */}
        {activeTab === "home" && (
          <>
            {/* Hero */}
            <div className="text-center mb-12">
              <h2 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
                Welcome to Study Genius 🎓
              </h2>
              <p className="text-indigo-100 text-lg">
                Generate personalised study materials powered by advanced AI
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center text-white
                             hover:-translate-y-1.5 hover:bg-white/20 hover:shadow-xl transition-all duration-200"
                >
                  <span className="text-4xl block mb-3">{f.icon}</span>
                  <h3 className="font-bold text-base mb-1">{f.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={() => setActiveTab("create")}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-600
                           font-bold rounded-full shadow-xl hover:-translate-y-1 hover:shadow-2xl
                           transition-all duration-200 text-lg"
              >
                🚀 Start Creating
              </button>
            </div>
          </>
        )}

        {/* ════ CREATE TAB ════ */}
        {activeTab === "create" && (
          <>
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
                ✨ Generate Study Material
              </h2>
              <p className="text-indigo-100 text-lg">
                Fill in the form below and let AI craft your perfect study resource
              </p>
            </div>

            {/* Form card */}
            <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-10 mb-6">

              {/* Topic */}
              <div className="mb-8">
                <label className="block text-base font-bold text-gray-800 mb-2">📖 Topic</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Photosynthesis, World War II, Python basics…"
                  className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl text-gray-800
                             placeholder-gray-400 focus:outline-none focus:border-indigo-600
                             focus:ring-2 focus:ring-indigo-300 transition"
                />
              </div>

              {/* Material type */}
              <div className="mb-8">
                <label className="block text-base font-bold text-gray-800 mb-3">📚 Material Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {MATERIAL_TYPES.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setMaterialType(t.value)}
                      className={`p-3.5 rounded-xl border-2 font-semibold text-sm transition-all
                        ${materialType === t.value
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-md ring-2 ring-indigo-300"
                          : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-300"
                        }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="mb-8">
                <label className="block text-base font-bold text-gray-800 mb-3">🎯 Difficulty Level</label>
                <div className="flex gap-3 flex-wrap">
                  {DIFFICULTY_LEVELS.map((d) => {
                    const styles = difficultyStyles[d.value];
                    const isActive = difficulty === d.value;
                    return (
                      <button
                        key={d.value}
                        onClick={() => setDifficulty(d.value)}
                        className={`flex-1 min-w-[80px] py-2.5 px-4 rounded-xl border-2 font-semibold text-sm
                                    transition-all ${isActive ? styles.active : `bg-gray-50 border-gray-200 text-gray-600 ${styles.base}`}`}
                      >
                        {d.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional details */}
              <div className="mb-8">
                <label className="block text-base font-bold text-gray-800 mb-2">
                  📝 Additional Details{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Any specific subtopics, exam context, or instructions…"
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl text-gray-800
                             placeholder-gray-400 resize-y focus:outline-none focus:border-indigo-600
                             focus:ring-2 focus:ring-indigo-300 transition"
                />
              </div>

              {/* Error message */}
              {error && (
                <p className="text-red-600 font-semibold mb-4">⚠️ {error}</p>
              )}

              {/* Generate button */}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-4 px-8
                           bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold
                           rounded-xl text-lg shadow-lg hover:from-indigo-700 hover:to-purple-700
                           hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60
                           disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Generating…
                  </>
                ) : (
                  <>🚀 Generate Material</>
                )}
              </button>
            </div>

            {/* Loading card */}
            {loading && (
              <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-10 text-center">
                <svg
                  className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <p className="text-gray-600 text-base">Crafting your personalised study material…</p>
              </div>
            )}

            {/* Result card */}
            {!loading && content && (
              <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-10
                              animate-[slideUp_0.4s_cubic-bezier(0.16,1,0.3,1)_both]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-extrabold text-gray-800">✨ Generated Content</h3>
                  <div className="flex items-center gap-3">
                    {copied && (
                      <span className="text-emerald-600 text-sm font-semibold bg-emerald-50
                                       px-3 py-1 rounded-full border border-emerald-200">
                        ✅ Copied!
                      </span>
                    )}
                    <button
                      onClick={handleCopy}
                      className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold
                                 rounded-lg hover:bg-indigo-700 transition"
                    >
                      {copied ? "✅ Copied" : "📋 Copy"}
                    </button>
                  </div>
                </div>

                <div className="border-l-4 border-indigo-600 pl-5 py-4 bg-gradient-to-r
                                from-indigo-50 to-purple-50 rounded-r-xl">
                  <p className="whitespace-pre-wrap break-words text-gray-700 text-sm
                                leading-relaxed max-h-96 overflow-y-auto font-medium">
                    {content}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
