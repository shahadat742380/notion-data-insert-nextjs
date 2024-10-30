"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/test-app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone }),
      });

      if (res.ok) {
        setStatus("Data added successfully!");
        setName("");
        setEmail("");
        setPhone("");
      } else {
        const { error } = await res.json();
        setStatus(error || "Failed to add data.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Failed to add data.");
    }
  };

  return (
    <div className="py-20">
      <div className="pb-5">{status && <p className="text-2xl text-center">{status}</p>}</div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md mx-auto p-10 border "
      >
        <div>
          <label htmlFor="name" className="block font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block font-medium">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
