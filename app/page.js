import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-indigo-600">📚 Study Genius</h1>
        <Link href="/create">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Create Material
          </button>
        </Link>
      </nav>

      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="text-center max-w-2xl">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to Study Genius
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Generate personalized study materials using advanced AI technology
          </p>
          <Link href="/create">
            <button className="px-8 py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 transition">
              Get Started Free
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}