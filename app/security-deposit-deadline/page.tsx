import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer } from "@/components/landing";

export const metadata: Metadata = {
  title: "Security Deposit Deadline by State: How Long Does a Landlord Have?",
  description:
    "Security deposit return deadlines vary by state. Learn the common deadline range, what landlords must send, and what to do if the deadline is missed.",
};

export default function SecurityDepositDeadlinePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content" className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">
          Security Deposit Deadline: How Long Does a Landlord Have to Return It?
        </h1>

        <p className="mb-6">
          If you moved out and your landlord has not returned your security
          deposit, the most important question is the deadline in your state.
          Many deposit disputes are decided by whether the landlord sent the
          deposit or an itemized deduction notice on time.
        </p>

        <p className="mb-6">
          Deadlines vary by state, but a common range is about 14 to 45 days after
          move out. Some states also require specific wording, delivery methods,
          or receipts for deductions.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          What Landlords Usually Must Do by the Deadline
        </h2>

        <p className="mb-4">
          By the deadline, landlords typically must do one of the following:
        </p>

        <ul className="list-disc pl-6 mb-6">
          <li>Return the full security deposit, or</li>
          <li>
            Send a written itemized list of deductions and return any remaining
            balance
          </li>
        </ul>

        <p className="mb-6">
          If your landlord only texted you, gave a vague explanation, or never
          provided an itemized list, that can be a compliance issue depending on
          your state.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          If the Deadline Was Missed, Your Leverage Can Increase
        </h2>

        <p className="mb-6">
          When landlords miss legal deadlines, renters often gain leverage. The
          landlord may lose the ability to withhold certain amounts or may face
          penalties depending on state law. Even when penalties do not apply, a
          missed deadline can strengthen your negotiating position.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          The Fastest Way to Resolve a Deposit Dispute
        </h2>

        <p className="mb-6">
          Most renters get better results when they stop arguing informally and
          send a clear written demand that references the deadline, requests the
          required documentation, and includes photos or move out evidence.
          Landlords take organized paper trails seriously.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          How DepositReady Helps
        </h2>

        <p className="mb-6">
          DepositReady helps you check the deadline and generate a professional
          dispute packet in minutes. You answer a few questions and get a demand
          letter customized to your state and a clean documentation checklist you
          can send immediately.
        </p>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/build"
            className="inline-block rounded-md bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition text-center"
          >
            Check my deadline and build my packet
          </Link>

          <Link
            href="/landlord-kept-security-deposit"
            className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
          >
            My landlord kept my deposit
          </Link>

          <Link
            href="/security-deposit-demand-letter"
            className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
          >
            Write a demand letter
          </Link>

          <Link
            href="/security-deposit-dispute"
            className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
          >
            How to dispute a deposit
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-12">
          DepositReady is not a law firm and does not provide legal advice. No
          outcomes are guaranteed.
        </p>
      </main>
      <Footer />
    </div>
  );
}
