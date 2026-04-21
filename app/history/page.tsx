"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";
import { ReviewDoc } from "@/types/review";
import SeverityBadge from "@/components/SeverityBadge";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const [data, setData] = useState<ReviewDoc[]>([]);
  const [selected, setSelected] = useState<ReviewDoc | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.email) return;

    api
      .get<ReviewDoc[]>(`/reviews?userId=${session.user.email}`)
      .then((res) => setData(res.data));
  }, [session]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* 🔹 Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            📜 Review History
          </h1>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl"
          >
            ← Back
          </button>
        </div>

        {/* 🔹 Empty State */}
        {data.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            No history found yet.
          </p>
        )}

        {/* 🔹 Grid */}
        <div className="grid md:grid-cols-2 gap-5">

          {data.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelected(item)}
              className="cursor-pointer bg-white dark:bg-gray-800 p-5 rounded-2xl shadow hover:shadow-lg transition"
            >
              {/* Code preview */}
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                {item.code}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center mt-4">
                <SeverityBadge level={item.review.severity} />

                <span className="text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 DETAIL VIEW */}
        {selected && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Review Details
                </h2>

                <button
                  onClick={() => setSelected(null)}
                  className="text-red-500"
                >
                  Close ✖
                </button>
              </div>

              {/* Code */}
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
                {selected.code}
              </pre>

              {/* Severity */}
              <div className="mt-4">
                <SeverityBadge level={selected.review.severity} />
              </div>

              {/* Bugs */}
              <div className="mt-4">
                <h3 className="font-semibold">🐞 Bugs</h3>
                {selected.review.bugs.length === 0 ? (
                  <p>No bugs ✅</p>
                ) : (
                  selected.review.bugs.map((b, i) => (
                    <p key={i}>
                      {typeof b === "string" ? b : b.message}
                    </p>
                  ))
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}