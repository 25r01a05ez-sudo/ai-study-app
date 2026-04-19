'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [materials, setMaterials] = useState([]);
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Dashboard</h1>
      <p>Welcome, {user.firstName || user.emailAddresses?.[0]?.emailAddress || 'User'}!</p>
      <p>Your study materials will appear here.</p>
      
      <Link href="/create">
        <button style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
          ➕ Create New Material
        </button>
      </Link>

      <div style={{ marginTop: "20px" }}>
        {materials.length === 0 ? (
          <p>No materials yet. Create one to get started!</p>
        ) : (
          materials.map((m, i) => <div key={i}>{m}</div>)
        )}
      </div>
    </div>
  );
}