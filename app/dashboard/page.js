'use client';

import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [materials, setMaterials] = useState([]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Dashboard</h1>
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