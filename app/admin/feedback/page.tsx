"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

interface FeedbackEntry {
  id: string;
  created_at: string;
  page_path: string;
  trigger_type: string;
  sentiment: string | null;
  rating: number | null;
  helpful: boolean | null;
  confusion_area: string | null;
  what_looking_for: string | null;
  improvement_suggestion: string | null;
  email: string | null;
  screen_width: number | null;
}

export default function AdminFeedbackPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [filterPage, setFilterPage] = useState("");
  const [filterSentiment, setFilterSentiment] = useState("");
  const [filterTrigger, setFilterTrigger] = useState("");

  const loadFeedback = useCallback(async () => {
    if (!token) {
      setError("Missing admin token.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams({ token, page: String(page) });
      if (filterPage) params.set("filter_page", filterPage);
      if (filterSentiment) params.set("filter_sentiment", filterSentiment);
      if (filterTrigger) params.set("filter_trigger", filterTrigger);

      const res = await fetch(`/api/admin/feedback?${params.toString()}`);
      if (!res.ok) {
        setError(res.status === 401 ? "Unauthorized — check your token." : "Failed to load feedback.");
        return;
      }

      const data = await res.json();
      setFeedback(data.feedback);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch {
      setError("Failed to load feedback.");
    } finally {
      setIsLoading(false);
    }
  }, [token, page, filterPage, filterSentiment, filterTrigger]);

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);

  const handleFilter = () => {
    setPage(1);
    loadFeedback();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const sentimentBadge = (s: string | null) => {
    if (!s) return null;
    const colors: Record<string, string> = {
      positive: "bg-green-100 text-green-800",
      negative: "bg-red-100 text-red-800",
      neutral: "bg-gray-100 text-gray-800",
    };
    return (
      <span className={`text-xs font-medium px-2 py-0.5 rounded ${colors[s] || "bg-gray-100 text-gray-800"}`}>
        {s}
      </span>
    );
  };

  const triggerBadge = (t: string) => {
    const colors: Record<string, string> = {
      floating_button: "bg-blue-100 text-blue-800",
      inline_pulse: "bg-purple-100 text-purple-800",
      exit_survey: "bg-amber-100 text-amber-800",
    };
    return (
      <span className={`text-xs font-medium px-2 py-0.5 rounded ${colors[t] || "bg-gray-100 text-gray-800"}`}>
        {t.replace("_", " ")}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Feedback Dashboard</h1>
            <p className="text-sm text-gray-500">{total} total entries</p>
          </div>
          <button onClick={loadFeedback} className="text-sm text-gray-600 hover:text-black transition">
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Page</label>
              <input
                type="text"
                value={filterPage}
                onChange={(e) => setFilterPage(e.target.value)}
                placeholder="e.g. /quiz"
                className="px-3 py-1.5 border border-gray-300 rounded text-sm w-32"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Sentiment</label>
              <select
                value={filterSentiment}
                onChange={(e) => setFilterSentiment(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm"
              >
                <option value="">All</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Trigger</label>
              <select
                value={filterTrigger}
                onChange={(e) => setFilterTrigger(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm"
              >
                <option value="">All</option>
                <option value="floating_button">Floating Button</option>
                <option value="inline_pulse">Inline Pulse</option>
                <option value="exit_survey">Exit Survey</option>
              </select>
            </div>
            <button
              onClick={handleFilter}
              className="bg-black text-white text-sm font-medium px-4 py-1.5 rounded hover:bg-gray-800 transition"
            >
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <p className="text-gray-500 text-center py-12">Loading...</p>
        ) : feedback.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No feedback yet.</p>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Time</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Page</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Sentiment</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Content</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Email</th>
                </tr>
              </thead>
              <tbody>
                {feedback.map((f) => {
                  const content = f.improvement_suggestion || f.confusion_area || f.what_looking_for;
                  const time = new Date(f.created_at).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  });

                  return (
                    <tr key={f.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{time}</td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-700">{f.page_path}</td>
                      <td className="px-4 py-3">{triggerBadge(f.trigger_type)}</td>
                      <td className="px-4 py-3">
                        {sentimentBadge(f.sentiment)}
                        {f.helpful !== null && (
                          <span className="ml-1 text-xs">{f.helpful ? "\u{1F44D}" : "\u{1F44E}"}</span>
                        )}
                        {f.rating && (
                          <span className="ml-1 text-xs text-gray-600">{f.rating}/5</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-700 max-w-xs truncate">
                        {content || <span className="text-gray-400">—</span>}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">{f.email || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="text-sm text-gray-600 hover:text-black disabled:text-gray-300 transition"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="text-sm text-gray-600 hover:text-black disabled:text-gray-300 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
