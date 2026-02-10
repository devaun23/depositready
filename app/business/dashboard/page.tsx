"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar, Footer } from "@/components/landing";
import { Input, Select, Button } from "@/components/ui";
import { STATE_OPTIONS } from "@/lib/state-rules";

interface CreditPack {
  id: string;
  email: string;
  company_name: string | null;
  package_size: number;
  credits_remaining: number;
  payment_status: string;
  created_at: string;
}

interface UsageRecord {
  id: string;
  created_at: string;
  tenant_name: string | null;
  state_code: string | null;
  deposit_amount: number | null;
  download_token: string;
}

export default function BusinessDashboardPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [creditPack, setCreditPack] = useState<CreditPack | null>(null);
  const [usage, setUsage] = useState<UsageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Generation form
  const [genForm, setGenForm] = useState({
    tenantName: "",
    stateCode: "",
    depositAmount: "",
    moveOutDate: "",
    landlordName: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState("");
  const [genSuccess, setGenSuccess] = useState("");

  // Load dashboard data
  useEffect(() => {
    if (!token) {
      setError("Missing access token. Check your dashboard link.");
      setIsLoading(false);
      return;
    }

    async function loadDashboard() {
      try {
        const response = await fetch(
          `/api/business/generate?token=${encodeURIComponent(token!)}`,
          { method: "GET" }
        );

        if (!response.ok) {
          const result = await response.json();
          setError(result.error || "Failed to load dashboard");
          return;
        }

        const result = await response.json();
        setCreditPack(result.creditPack);
        setUsage(result.usage || []);
      } catch {
        setError("Failed to load dashboard. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, [token]);

  const handleGenChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setGenForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      setGenError("");
      setGenSuccess("");
    },
    []
  );

  const handleGenerate = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (isGenerating || !token) return;

      if (!genForm.tenantName || !genForm.stateCode || !genForm.depositAmount || !genForm.moveOutDate) {
        setGenError("Please fill in all required fields.");
        return;
      }

      setIsGenerating(true);
      setGenError("");
      setGenSuccess("");

      try {
        const response = await fetch("/api/business/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accessToken: token,
            tenantName: genForm.tenantName,
            stateCode: genForm.stateCode,
            depositAmount: parseFloat(genForm.depositAmount),
            moveOutDate: genForm.moveOutDate,
            landlordName: genForm.landlordName || undefined,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          setGenError(result.error || "Failed to generate letter.");
          return;
        }

        // Update local state
        if (creditPack) {
          setCreditPack({
            ...creditPack,
            credits_remaining: creditPack.credits_remaining - 1,
          });
        }

        setUsage((prev) => [result.usage, ...prev]);
        setGenSuccess(`Letter generated! Download token: ${result.usage.download_token}`);

        // Reset form
        setGenForm({
          tenantName: "",
          stateCode: "",
          depositAmount: "",
          moveOutDate: "",
          landlordName: "",
        });
      } catch {
        setGenError("Network error. Please try again.");
      } finally {
        setIsGenerating(false);
      }
    },
    [token, genForm, isGenerating, creditPack]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="py-16 px-4 text-center">
          <h1 className="text-2xl font-semibold text-black mb-4">
            Dashboard Unavailable
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/business"
            className="text-blue-600 hover:underline"
          >
            Go to Business page
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  if (!creditPack) return null;

  const isPaid = creditPack.payment_status === "paid";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="py-8 md:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-2xl md:text-3xl font-semibold text-black mb-2">
              Business Dashboard
            </h1>
            {creditPack.company_name && (
              <p className="text-gray-600">{creditPack.company_name}</p>
            )}
          </div>

          {/* Payment pending warning */}
          {!isPaid && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-amber-800 font-medium">
                Payment pending — complete checkout to activate your credits.
              </p>
            </div>
          )}

          {/* Credits overview */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500 mb-1">Credits Remaining</p>
              <p className="text-3xl font-bold text-black">
                {creditPack.credits_remaining}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                of {creditPack.package_size} total
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500 mb-1">Letters Generated</p>
              <p className="text-3xl font-bold text-black">{usage.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <p className={`text-lg font-semibold ${isPaid ? "text-green-600" : "text-amber-600"}`}>
                {isPaid ? "Active" : "Pending Payment"}
              </p>
            </div>
          </div>

          {/* Generate Letter Form */}
          {isPaid && creditPack.credits_remaining > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
              <h2 className="text-lg font-semibold text-black mb-4">
                Generate a Letter
              </h2>

              <form onSubmit={handleGenerate}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Tenant Name"
                    name="tenantName"
                    placeholder="John Doe"
                    value={genForm.tenantName}
                    onChange={handleGenChange}
                    required
                  />
                  <Select
                    label="State"
                    name="stateCode"
                    value={genForm.stateCode}
                    onChange={handleGenChange}
                    options={STATE_OPTIONS}
                    placeholder="Select state"
                    required
                  />
                  <Input
                    label="Deposit Amount"
                    name="depositAmount"
                    type="number"
                    placeholder="$1,500"
                    min="1"
                    step="0.01"
                    value={genForm.depositAmount}
                    onChange={handleGenChange}
                    required
                  />
                  <Input
                    label="Move-out Date"
                    name="moveOutDate"
                    type="date"
                    value={genForm.moveOutDate}
                    onChange={handleGenChange}
                    required
                  />
                </div>

                <Input
                  label="Landlord Name"
                  name="landlordName"
                  placeholder="Optional"
                  value={genForm.landlordName}
                  onChange={handleGenChange}
                />

                {genError && (
                  <p className="text-red-600 text-sm mt-3">{genError}</p>
                )}
                {genSuccess && (
                  <p className="text-green-600 text-sm mt-3">{genSuccess}</p>
                )}

                <div className="mt-6">
                  <Button
                    type="submit"
                    size="lg"
                    loading={isGenerating}
                    disabled={isGenerating}
                  >
                    Generate Letter (1 credit)
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* No credits left */}
          {isPaid && creditPack.credits_remaining === 0 && (
            <div className="bg-gray-100 rounded-xl p-6 mb-8 text-center">
              <p className="text-gray-700 font-medium mb-2">
                All credits used
              </p>
              <a
                href="/business"
                className="text-blue-600 hover:underline text-sm"
              >
                Purchase more credits
              </a>
            </div>
          )}

          {/* Usage History */}
          {usage.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-black">
                  Generated Letters
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {usage.map((record) => (
                  <div
                    key={record.id}
                    className="px-6 py-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-black">
                        {record.tenant_name || "Unnamed"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {record.state_code} ·{" "}
                        {record.deposit_amount
                          ? `$${Number(record.deposit_amount).toLocaleString()}`
                          : "—"}{" "}
                        ·{" "}
                        {new Date(record.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <a
                      href={`/download?token=${record.download_token}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
