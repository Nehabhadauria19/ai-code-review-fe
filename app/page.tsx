"use client";

import { useState } from "react";
import CodeEditor from "@/components/CodeEditor";
import { api } from "@/lib/api";
import { ReviewResult } from "@/types/review";
import SectionCard from "@/components/SectionCard";
import SeverityBadge from "@/components/SeverityBadge";
import FileUpload from "@/components/FileUpload";
import { useSession, signIn, signOut } from "next-auth/react";
import {  useRouter } from "next/navigation";

export default function Home() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleReview = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/review", {
  code,
  language: "javascript",
  userId: session?.user?.email, // ✅ important
});

      setResult(res.data.review);
    } catch (err: unknown) {
      // ✅ Safe error handling without "any"
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }

    setLoading(false);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 px-6 py-10">
    <div className="max-w-5xl mx-auto space-y-6">

      {/* 🔹 Navbar */}
    <div className="flex justify-between items-center px-6 py-4 rounded-2xl backdrop-blur-md bg-white/70 border border-white/30 shadow-lg">

  <h1 className="text-xl font-semibold text-gray-800">
    🚀 AI Code Review
  </h1>

  <div className="flex items-center gap-3">

    {/* History Button */}
    <button
      onClick={() => router.push("/history")}
      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl transition"
    >
      History
    </button>

    {!session ? (
      <button
        onClick={() => signIn("github")}
        className="bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-xl transition shadow-md"
      >
        Login
      </button>
    ) : (
      <>
        <span className="text-gray-700 font-medium">
          {session.user?.name}
        </span>

        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition shadow-md"
        >
          Logout
        </button>
      </>
    )}
  </div>
</div>
      {/* 🔹 Editor Card */}
    <div className="rounded-2xl backdrop-blur-md bg-white/70 border border-white/30 shadow-lg p-6 space-y-4">
  <CodeEditor code={code} setCode={setCode} />

  <FileUpload setCode={setCode} />

  <button
    onClick={handleReview}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition shadow-lg hover:scale-[1.02]"
  >
    {loading ? "Analyzing..." : "Review Code"}
  </button>

  {error && (
    <p className="text-red-500 text-sm">{error}</p>
  )}
</div>

      {/* 🔹 Results */}
      {result && (
        <div className="space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Review Result
            </h2>
            <SeverityBadge level={result.severity} />
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-5">
            <SectionCard title="🐞 Bugs" items={result.bugs || []} />
            <SectionCard title="🔒 Security" items={result.security || []} />
            <SectionCard title="⚡ Performance" items={result.performance || []} />
            <SectionCard title="✅ Best Practices" items={result.bestPractices || []} />
          </div>
        </div>
      )}

    </div>
  </div>
);
}