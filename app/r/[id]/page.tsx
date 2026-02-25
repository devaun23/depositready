import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase";
import { Logo } from "@/components/ui";

interface SharedResult {
  id: string;
  state_code: string;
  state_name: string;
  deposit_amount: number;
  potential_recovery: number;
  days_past_deadline: number | null;
  landlord_in_violation: boolean;
  case_strength: string | null;
  damages_multiplier: number;
  view_count: number;
}

async function getSharedResult(id: string): Promise<SharedResult | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("shared_results")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as SharedResult;
}

function incrementViewCount(id: string) {
  const supabase = getSupabaseAdmin();
  // Fire-and-forget — don't block rendering
  supabase.rpc("increment_view_count", { result_id: id }).then(({ error }) => {
    if (error) {
      // Fallback: direct update if RPC doesn't exist
      supabase
        .from("shared_results")
        .update({ view_count: 1 }) // Will be overwritten by actual increment below
        .eq("id", id);
    }
  });
}

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getSharedResult(id);

  if (!result) {
    return { title: "Result Not Found | DepositReady" };
  }

  const recovery = Math.round(result.potential_recovery).toLocaleString();
  const title = result.landlord_in_violation
    ? `I could recover $${recovery} from my landlord | DepositReady`
    : `My security deposit analysis: $${recovery} | DepositReady`;

  const description = result.landlord_in_violation
    ? `My landlord violated ${result.state_name} security deposit law. ${result.days_past_deadline ? `${result.days_past_deadline} days past the legal deadline.` : ""} Check yours free.`
    : `I analyzed my security deposit situation in ${result.state_name}. Check yours free at DepositReady.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://depositready.co/r/${id}`,
      siteName: "DepositReady",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SharedResultPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getSharedResult(id);

  if (!result) {
    notFound();
  }

  // Increment view count (fire-and-forget)
  incrementViewCount(id);

  const recovery = Math.round(result.potential_recovery).toLocaleString();
  const deposit = Math.round(result.deposit_amount).toLocaleString();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-xl font-semibold text-black"
          >
            <Logo size="md" />
            <span className="hidden sm:inline">DepositReady</span>
          </Link>
          <span className="text-xs text-gray-500">
            Free deposit analysis
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Violation Banner */}
        {result.landlord_in_violation && (
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 text-center animate-slide-in">
            <div className="text-red-600 text-sm font-semibold uppercase tracking-wide mb-1">
              Landlord Violated {result.state_name} Law
            </div>
            {result.days_past_deadline && result.days_past_deadline > 0 && (
              <p className="text-red-500 text-sm">
                {result.days_past_deadline} days past the legal deadline
              </p>
            )}
          </div>
        )}

        {/* Recovery Amount Card */}
        <div
          className={`rounded-2xl p-8 text-center border-2 ${
            result.landlord_in_violation
              ? "bg-accent-light border-accent/30"
              : "bg-amber-50 border-amber-200"
          }`}
        >
          <p
            className={`text-sm mb-2 ${
              result.landlord_in_violation ? "text-accent" : "text-amber-700"
            }`}
          >
            {result.landlord_in_violation
              ? `Under ${result.state_name} law, could recover up to`
              : "Security deposit amount"}
          </p>
          <div
            className={`text-6xl font-bold ${
              result.landlord_in_violation ? "text-accent" : "text-amber-800"
            }`}
          >
            ${recovery}
          </div>
          {result.landlord_in_violation && result.damages_multiplier > 1 && (
            <p className="text-sm text-accent mt-2">
              ${deposit} deposit &times; {result.damages_multiplier}x statutory damages
            </p>
          )}
          {result.case_strength && (
            <div className="mt-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  result.case_strength === "STRONG"
                    ? "bg-green-100 text-green-700"
                    : result.case_strength === "MODERATE"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {result.case_strength} case
              </span>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Think your landlord owes you money?
          </h2>
          <p className="text-gray-600 text-sm">
            Free 30-second analysis. No payment required.
          </p>
          <Link
            href="/diagnose"
            className="inline-block w-full sm:w-auto px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors text-lg"
          >
            Check YOUR Deposit &mdash; Free
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          DepositReady is not a law firm and does not provide legal advice.
        </p>
      </main>
    </div>
  );
}
