'use client';

import { useState } from "react";
import Link from "next/link";
import "./StudyGenius.css";

const MATERIAL_TYPES = [
  { value: "summary",    label: "📋 Summary" },
  { value: "quiz",       label: "❓ Quiz" },
  { value: "notes",      label: "📝 Notes" },
  { value: "flashcards", label: "🎴 Flashcards" },
];

const DIFFICULTY_LEVELS = [
  { value: "easy",   label: "🟢 Easy",   cls: "easy" },
  { value: "medium", label: "🟡 Medium", cls: "medium" },
  { value: "hard",   label: "🔴 Hard",   cls: "hard" },
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

export default function StudyGenius() {
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

  return (
    <div className="sg-page">
      {/* ── Navigation ── */}
      <nav className="sg-nav">
        <div className="sg-nav-inner">
          <span className="sg-logo">📚 Study Genius</span>
          <div className="sg-nav-links">
            <Link href="/dashboard" className="sg-nav-btn">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Tab Bar ── */}
      <div className="sg-tabs">
        <button
          className={`sg-tab${activeTab === "home" ? " active" : ""}`}
          onClick={() => setActiveTab("home")}
        >
          🏠 Home
        </button>
        <button
          className={`sg-tab${activeTab === "create" ? " active" : ""}`}
          onClick={() => setActiveTab("create")}
        >
          ✨ Create
        </button>
      </div>

      {/* ── Main ── */}
      <main className="sg-main">
        {/* ════ HOME TAB ════ */}
        {activeTab === "home" && (
          <>
            <div className="sg-header">
              <h2>Welcome to Study Genius 🎓</h2>
              <p>Generate personalised study materials powered by advanced AI</p>
            </div>

            {/* Feature cards */}
            <div className="sg-features">
              {FEATURES.map((f) => (
                <div key={f.title} className="sg-feature-card">
                  <span className="sg-feature-icon">{f.icon}</span>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ textAlign: "center" }}>
              <button
                className="sg-btn-hero"
                onClick={() => setActiveTab("create")}
              >
                🚀 Start Creating
              </button>
            </div>
          </>
        )}

        {/* ════ CREATE TAB ════ */}
        {activeTab === "create" && (
          <>
            <div className="sg-header">
              <h2>✨ Generate Study Material</h2>
              <p>Fill in the form below and let AI craft your perfect study resource</p>
            </div>

            {/* Form card */}
            <div className="sg-card">
              {/* Topic */}
              <div className="sg-form-group">
                <label className="sg-label">📖 Topic</label>
                <input
                  type="text"
                  className="sg-input"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Photosynthesis, World War II, Python basics…"
                />
              </div>

              {/* Material type */}
              <div className="sg-form-group">
                <label className="sg-label">📚 Material Type</label>
                <div className="sg-type-grid">
                  {MATERIAL_TYPES.map((t) => (
                    <button
                      key={t.value}
                      className={`sg-type-btn${materialType === t.value ? " active" : ""}`}
                      onClick={() => setMaterialType(t.value)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="sg-form-group">
                <label className="sg-label">🎯 Difficulty Level</label>
                <div className="sg-difficulty-row">
                  {DIFFICULTY_LEVELS.map((d) => (
                    <button
                      key={d.value}
                      className={`sg-difficulty-btn ${d.cls}${difficulty === d.value ? " active" : ""}`}
                      onClick={() => setDifficulty(d.value)}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional details */}
              <div className="sg-form-group">
                <label className="sg-label">📝 Additional Details (optional)</label>
                <textarea
                  className="sg-textarea"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Any specific subtopics, exam context, or instructions…"
                />
              </div>

              {/* Error message */}
              {error && (
                <p style={{ color: "var(--error)", marginBottom: "1rem", fontWeight: 600 }}>
                  ⚠️ {error}
                </p>
              )}

              {/* Generate button */}
              <button
                className="sg-btn-primary"
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="sg-spinner" />
                    Generating…
                  </>
                ) : (
                  <>🚀 Generate Material</>
                )}
              </button>
            </div>

            {/* Loading card */}
            {loading && (
              <div className="sg-card">
                <div className="sg-loading-overlay">
                  <div className="sg-spinner" />
                  <p>Crafting your personalised study material…</p>
                </div>
              </div>
            )}

            {/* Result card */}
            {!loading && content && (
              <div className="sg-card sg-result-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-dark)" }}>
                    ✨ Generated Content
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    {copied && (
                      <span className="sg-success-badge">✅ Copied!</span>
                    )}
                    <button className="sg-btn-secondary" onClick={handleCopy}>
                      {copied ? "✅ Copied" : "📋 Copy"}
                    </button>
                  </div>
                </div>

                <div className="sg-content-result">
                  <p className="sg-content-text">{content}</p>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
