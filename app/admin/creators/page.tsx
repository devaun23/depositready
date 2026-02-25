"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

interface CreatorStats {
  creator_code: string;
  leads: number;
  sales: number;
  revenue: number;
  conversion_rate: number;
  platforms: Record<string, number>;
  first_seen: string;
  last_seen: string;
}

type SortKey = "creator_code" | "leads" | "sales" | "revenue" | "conversion_rate" | "last_seen";

export default function CreatorDashboard() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [creators, setCreators] = useState<CreatorStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("leads");
  const [sortAsc, setSortAsc] = useState(false);

  const loadCreators = useCallback(async () => {
    if (!token) {
      setError("Missing admin token.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/creators?token=${token}`);
      if (!res.ok) {
        setError(res.status === 401 ? "Unauthorized — check your token." : "Failed to load data.");
        return;
      }
      const data = await res.json();
      setCreators(data.creators);
    } catch {
      setError("Failed to load data.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadCreators();
  }, [loadCreators]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const sorted = [...creators].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  const totalLeads = creators.reduce((s, c) => s + c.leads, 0);
  const totalSales = creators.reduce((s, c) => s + c.sales, 0);
  const totalRevenue = creators.reduce((s, c) => s + c.revenue, 0);

  const topPlatform = (platforms: Record<string, number>) => {
    const entries = Object.entries(platforms).filter(([k]) => k !== "unknown");
    if (entries.length === 0) {
      return platforms["unknown"] ? "unknown" : "—";
    }
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0];
  };

  const sortArrow = (key: SortKey) => {
    if (sortKey !== key) return "";
    return sortAsc ? " \u2191" : " \u2193";
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Creator Dashboard</h1>
            <p className="text-sm text-gray-500">{creators.length} creators tracked</p>
          </div>
          <button onClick={loadCreators} className="text-sm text-gray-600 hover:text-black transition">
            Refresh
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Total Leads</p>
            <p className="text-2xl font-semibold text-gray-900">{totalLeads}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Total Sales</p>
            <p className="text-2xl font-semibold text-gray-900">{totalSales}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Total Revenue</p>
            <p className="text-2xl font-semibold text-gray-900">${totalRevenue}</p>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <p className="text-gray-500 text-center py-12">Loading...</p>
        ) : creators.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No creator traffic yet.</p>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {([
                    ["creator_code", "Creator"],
                    ["leads", "Leads"],
                    ["sales", "Sales"],
                    ["revenue", "Revenue"],
                    ["conversion_rate", "Conv. Rate"],
                  ] as [SortKey, string][]).map(([key, label]) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      className="text-left px-4 py-3 text-xs font-medium text-gray-500 cursor-pointer hover:text-gray-900 select-none"
                    >
                      {label}{sortArrow(key)}
                    </th>
                  ))}
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Top Platform</th>
                  <th
                    onClick={() => handleSort("last_seen")}
                    className="text-left px-4 py-3 text-xs font-medium text-gray-500 cursor-pointer hover:text-gray-900 select-none"
                  >
                    Last Active{sortArrow("last_seen")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((c) => (
                  <tr key={c.creator_code} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-900 font-medium">{c.creator_code}</td>
                    <td className="px-4 py-3 text-gray-700">{c.leads}</td>
                    <td className="px-4 py-3 text-gray-700">{c.sales}</td>
                    <td className="px-4 py-3 text-gray-700">${c.revenue}</td>
                    <td className="px-4 py-3 text-gray-700">{c.conversion_rate}%</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${platformColor(topPlatform(c.platforms))}`}>
                        {topPlatform(c.platforms)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{c.last_seen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function platformColor(platform: string): string {
  const colors: Record<string, string> = {
    tiktok: "bg-pink-100 text-pink-800",
    instagram: "bg-purple-100 text-purple-800",
    twitter: "bg-sky-100 text-sky-800",
    facebook: "bg-blue-100 text-blue-800",
    youtube: "bg-red-100 text-red-800",
    reddit: "bg-orange-100 text-orange-800",
    linkedin: "bg-indigo-100 text-indigo-800",
    unknown: "bg-gray-100 text-gray-600",
  };
  return colors[platform] || "bg-gray-100 text-gray-800";
}
