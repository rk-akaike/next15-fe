"use client";

import { useState, useEffect } from "react";
import { getPermissionsForRole } from "@/utils/permissions";
import Link from "next/link";

const roles = ["admin", "user", "guest"];

console.log("Page rendered");

export default function Home() {
  console.log("Home rendered");
  const [role, setRole] = useState<"admin" | "user" | "guest">("guest");
  const [features, setFeatures] = useState<string[]>([]);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/config");
        const data = await response.json();
        console.log("API Response:", data);
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    };

    fetchConfig();
  }, []);

  const handleRoleChange = (newRole: "admin" | "user" | "guest") => {
    setRole(newRole);
    const resolvedFeatures = getPermissionsForRole(newRole);
    setFeatures(resolvedFeatures);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Role-Based Access Control</h1>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Select Role:</label>
        <select
          value={role}
          onChange={(e) =>
            handleRoleChange(e.target.value as "admin" | "user" | "guest")
          }
          className="border border-gray-300 p-2 rounded"
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Accessible Features:</h2>
        {features.length > 0 ? (
          <ul className="list-disc pl-5">
            {features.map((feature) => (
              <li key={feature} className="mb-1">
                {feature}
              </li>
            ))}
          </ul>
        ) : (
          <p>No features available for this role.</p>
        )}
      </div>

      <Link href="/settings">Go to settings</Link>
    </div>
  );
}
