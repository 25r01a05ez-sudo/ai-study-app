'use client';

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Dashboard</h1>
          <UserButton />
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-4">
          Welcome, {user?.firstName}! 👋
        </h2>
        <p className="text-gray-600 mb-8">
          Here you can manage your study materials and track your progress.
        </p>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/create">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer transition">
              <h3 className="text-xl font-bold mb-2">📝 Create Material</h3>
              <p className="text-gray-600">Generate new study materials</p>
            </div>
          </Link>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">📊 My Materials</h3>
            <p className="text-gray-600">View all your materials</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">⭐ Favorites</h3>
            <p className="text-gray-600">Your saved materials</p>
          </div>
        </div>
      </main>
    </div>
  );
}