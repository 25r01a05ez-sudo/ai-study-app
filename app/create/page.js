'use client';

import { useState } from "react";
import { Loader } from "lucide-react";
import Link from "next/link";

export default function CreatePage() {
  const [topic, setTopic] = useState("");
  const [materialType, setMaterialType] = useState("summary");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, materialType }),
      });

      const data = await response.json();
      setContent(data.content || data.error);
    } catch (error) {
      setContent("Error generating content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/">
            <h1 className="text-2xl font-bold text-indigo-600 cursor-pointer">
              📚 Study Genius
            </h1>
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">Generate Study Material</h2>

        <div className="bg-white p-8 rounded-lg shadow">
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic (e.g., Photosynthesis, World War 2)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Material Type</label>
            <select
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="summary">Summary</option>
              <option value="quiz">Quiz</option>
              <option value="notes">Notes</option>
              <option value="flashcards">Flashcards</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Generating...
              </>
            ) : (
              "Generate Material"
            )}
          </button>
        </div>

        {content && (
          <div className="mt-8 bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-4">Generated Content</h3>
            <div className="whitespace-pre-wrap text-gray-700">{content}</div>
          </div>
        )}
      </main>
    </div>
  );
}