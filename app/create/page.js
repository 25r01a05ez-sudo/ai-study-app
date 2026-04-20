'use client';

import { useState } from "react";
import { Loader, Copy, Check } from "lucide-react";
import Link from "next/link";
import { UserButton, Show, SignInButton } from "@clerk/nextjs";

export default function CreatePage() {
  const [topic, setTopic] = useState("");
  const [materialType, setMaterialType] = useState("summary");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const materialTypes = [
    { value: "summary", label: "📋 Summary", icon: "📋" },
    { value: "quiz", label: "❓ Quiz", icon: "❓" },
    { value: "notes", label: "📝 Notes", icon: "📝" },
    { value: "flashcards", label: "🎴 Flashcards", icon: "🎴" },
  ];

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

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* Navigation */}
      <nav className="bg-black bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold text-white cursor-pointer hover:text-indigo-200 transition">
              📚 Study Genius
            </h1>
          </Link>
          <Link href="/dashboard">
            <button className="px-4 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white rounded-lg transition">
              Dashboard
            </button>
          </Link>
          <Show when="signed-in">
            <UserButton afterSignOutUrl="/" />
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition">
                Sign In
              </button>
            </SignInButton>
          </Show>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">✨ Generate Study Material</h2>
          <p className="text-indigo-100 text-lg">Create personalized study materials powered by AI</p>
        </div>

        {/* Form Card */}
        <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-10 mb-8">
          {/* Topic Input */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-800 mb-3">📖 Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Photosynthesis, World War 2, Python..."
              className="w-full px-6 py-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300 transition text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Material Type Selection */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-800 mb-4">📚 Material Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {materialTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setMaterialType(type.value)}
                  className={`p-4 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                    materialType === type.value
                      ? "bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center justify-center gap-3 text-lg"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={24} />
                <span>Generating Magic...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Generate Material</span>
              </>
            )}
          </button>
        </div>

        {/* Generated Content Card */}
        {content && (
          <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl p-10 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold text-gray-800">✨ Generated Content</h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                {copied ? (
                  <>
                    <Check size={20} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={20} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="border-l-4 border-indigo-600 pl-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
              <div className="whitespace-pre-wrap break-words text-gray-700 leading-relaxed text-base font-medium max-h-96 overflow-y-auto">
                {content}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}