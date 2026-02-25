"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

interface ReviewSummary {
  id: string;
  created_at: string;
  name: string;
  email: string;
  state_code: string;
  deposit_amount: number;
  primary_concern: string | null;
  review_status: string;
  payment_status: string;
  flagged_for_review: boolean;
}

interface ReviewDetail {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  state_code: string;
  deposit_amount: number;
  move_out_date: string | null;
  landlord_name: string | null;
  property_address: string | null;
  situation_summary: string;
  landlord_response: string | null;
  communications_history: string | null;
  deductions_described: string | null;
  primary_concern: string | null;
  desired_outcome: string | null;
  review_status: string;
  memo_sections: Record<string, string> | null;
  founder_notes: string | null;
  flagged_for_review: boolean;
  download_token: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  generated: "bg-blue-100 text-blue-800",
  reviewed: "bg-green-100 text-green-800",
  delivered: "bg-emerald-100 text-emerald-800",
};

export default function AdminReviewsPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [reviews, setReviews] = useState<ReviewSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Detail view
  const [detail, setDetail] = useState<ReviewDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [founderNotes, setFounderNotes] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  const loadReviews = useCallback(async () => {
    if (!token) {
      setError("Missing admin token.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const params = new URLSearchParams({ token, page: String(page) });
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`/api/admin/reviews?${params.toString()}`);
      if (!res.ok) {
        setError(res.status === 401 ? "Unauthorized" : "Failed to load.");
        return;
      }

      const data = await res.json();
      setReviews(data.reviews);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch {
      setError("Failed to load reviews.");
    } finally {
      setIsLoading(false);
    }
  }, [token, page, statusFilter]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const openDetail = async (id: string) => {
    setDetailLoading(true);
    try {
      const res = await fetch(`/api/admin/reviews?token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get_detail", caseReviewId: id }),
      });
      const data = await res.json();
      if (res.ok) {
        setDetail(data.review);
        setFounderNotes(data.review.founder_notes || "");
      }
    } finally {
      setDetailLoading(false);
    }
  };

  const performAction = async (action: string) => {
    if (!detail) return;
    setActionLoading(action);
    try {
      const body: Record<string, string> = {
        action,
        caseReviewId: detail.id,
      };
      if (action === "update_notes") {
        body.founderNotes = founderNotes;
      }

      const res = await fetch(`/api/admin/reviews?token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        // Refresh detail
        await openDetail(detail.id);
        // Refresh list
        await loadReviews();
      } else {
        alert(data.error || "Action failed");
      }
    } finally {
      setActionLoading("");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Detail view
  if (detail) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setDetail(null)}
            className="text-sm text-gray-600 hover:text-black mb-4 transition"
          >
            &larr; Back to list
          </button>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-xl font-semibold">{detail.name}</h1>
                <p className="text-sm text-gray-500">{detail.email} {detail.phone && `| ${detail.phone}`}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(detail.created_at).toLocaleString()}
                </p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded ${STATUS_COLORS[detail.review_status] || "bg-gray-100"}`}>
                {detail.review_status}
              </span>
            </div>

            {/* Case Info */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4 mb-6">
              <Info label="State" value={detail.state_code} />
              <Info label="Deposit" value={`$${detail.deposit_amount?.toLocaleString()}`} />
              <Info label="Move-out" value={detail.move_out_date || "—"} />
              <Info label="Landlord" value={detail.landlord_name || "—"} />
              <Info label="Address" value={detail.property_address || "—"} />
              <Info label="Concern" value={detail.primary_concern?.replace(/_/g, " ") || "—"} />
            </div>

            {/* Intake sections */}
            <Section title="Situation" content={detail.situation_summary} />
            {detail.landlord_response && <Section title="Landlord Response" content={detail.landlord_response} />}
            {detail.deductions_described && <Section title="Deductions" content={detail.deductions_described} />}
            {detail.communications_history && <Section title="Communications" content={detail.communications_history} />}
            {detail.desired_outcome && <Section title="Additional Notes" content={detail.desired_outcome} />}

            {/* AI Memo */}
            {detail.memo_sections && (
              <div className="mt-6 border-t pt-6">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-500 mb-4">
                  AI-Generated Memo
                </h3>
                {Object.entries(detail.memo_sections).map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <h4 className="text-sm font-medium text-black capitalize mb-1">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Founder Notes */}
            <div className="mt-6 border-t pt-6">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-500 mb-2">
                Founder Notes
              </h3>
              <textarea
                rows={4}
                value={founderNotes}
                onChange={(e) => setFounderNotes(e.target.value)}
                placeholder="Add your personal notes here — these appear in the memo as 'Specialist's Notes'"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-black focus:border-transparent resize-y"
              />
              <button
                onClick={() => performAction("update_notes")}
                disabled={actionLoading === "update_notes"}
                className="mt-2 text-sm bg-gray-100 text-gray-700 px-4 py-1.5 rounded hover:bg-gray-200 transition disabled:opacity-50"
              >
                {actionLoading === "update_notes" ? "Saving..." : "Save Notes"}
              </button>
            </div>

            {/* Actions */}
            <div className="mt-6 border-t pt-6 flex flex-wrap gap-3">
              {detail.review_status === "pending" && (
                <button
                  onClick={() => performAction("generate")}
                  disabled={!!actionLoading}
                  className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {actionLoading === "generate" ? "Generating..." : "Generate AI Memo"}
                </button>
              )}

              {detail.review_status === "generated" && (
                <>
                  <button
                    onClick={() => performAction("generate")}
                    disabled={!!actionLoading}
                    className="bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                  >
                    {actionLoading === "generate" ? "Regenerating..." : "Regenerate Memo"}
                  </button>
                  <button
                    onClick={() => performAction("approve_deliver")}
                    disabled={!!actionLoading}
                    className="bg-green-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {actionLoading === "approve_deliver" ? "Delivering..." : "Approve & Deliver"}
                  </button>
                </>
              )}

              {(detail.review_status === "reviewed" || detail.review_status === "delivered") && (
                <a
                  href={`/api/case-review/download?token=${detail.download_token}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-800 transition inline-block"
                >
                  Download PDF
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Case Reviews</h1>
            <p className="text-sm text-gray-500">{total} paid reviews</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="text-sm border border-gray-300 rounded px-3 py-1.5"
            >
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="generated">Generated</option>
              <option value="reviewed">Reviewed</option>
              <option value="delivered">Delivered</option>
            </select>
            <button onClick={loadReviews} className="text-sm text-gray-600 hover:text-black transition">
              Refresh
            </button>
          </div>
        </div>

        {isLoading ? (
          <p className="text-gray-500 text-center py-12">Loading...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No paid reviews yet.</p>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">State</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Deposit</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Concern</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((r) => (
                  <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {r.name}
                      {r.flagged_for_review && (
                        <span className="ml-1.5 text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">flagged</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{r.state_code}</td>
                    <td className="px-4 py-3 text-gray-700">
                      ${r.deposit_amount?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 capitalize">
                      {r.primary_concern?.replace(/_/g, " ") || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${STATUS_COLORS[r.review_status] || "bg-gray-100"}`}>
                        {r.review_status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openDetail(r.id)}
                        disabled={detailLoading}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs text-gray-500">{label}</span>
      <p className="text-sm text-gray-900 capitalize">{value}</p>
    </div>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
        {title}
      </h3>
      <p className="text-sm text-gray-800 whitespace-pre-wrap">{content}</p>
    </div>
  );
}
