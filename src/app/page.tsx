"use client";

import React, { useState } from "react";

type ResultType = {
  post: string;
  hashtags: string[];
  ideas: string[];
};

export default function Home() {
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");

  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName,
          industry,
          description,
          audience,
        }),
      });

      const data = await response.json();

      const cleaned = data.data
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      console.log("PARSED DATA:", parsed);

      setResult(parsed);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 p-6">
      <div className="max-w-2xl w-full p-8 bg-white rounded-2xl shadow-md">
        <h1 className="text-4xl font-bold text-center mb-2 text-black">
          <span className="text-pink-500">Bloomly</span> AI 🌸
        </h1>

        <p className="text-center text-gray-600 mb-8 text-lg">
          Helping Small Businesses Bloom Online
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Business Name
            </label>

            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Sweet Crumbs"
              className="w-full border border-gray-300 p-3 rounded-xl text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Industry
            </label>

            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Bakery"
              className="w-full border border-gray-300 p-3 rounded-xl text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Business Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your business..."
              className="w-full border border-gray-300 p-3 rounded-xl text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Target Audience
            </label>

            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. Students and families"
              className="w-full border border-gray-300 p-3 rounded-xl text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Content"}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}
        </form>

        {result && (
          <div className="mt-8 space-y-6">
            <div className="bg-pink-50 p-5 rounded-xl">
              <h2 className="font-bold text-lg text-pink-700 mb-3">
                Instagram Post
              </h2>

              <p className="text-gray-800 whitespace-pre-wrap">
                {result.post}
              </p>
            </div>

            <div className="bg-purple-50 p-5 rounded-xl">
              <h2 className="font-bold text-lg text-purple-700 mb-3">
                Hashtags
              </h2>

              <div className="flex flex-wrap gap-2">
                {(result.hashtags || []).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white border px-3 py-1 rounded-full text-sm text-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-green-50 p-5 rounded-xl">
              <h2 className="font-bold text-lg text-green-700 mb-3">
                Content Ideas
              </h2>

              <div className="space-y-3">
                {(result.ideas || []).map((idea, index) => (
                  <div
                    key={index}
                    className="bg-white border rounded-lg p-3 text-black"
                  >
                    {idea}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}