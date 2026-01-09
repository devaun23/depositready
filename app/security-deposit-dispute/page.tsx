import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security Deposit Dispute: How to Challenge Unfair Deductions",
  description:
    "If you disagree with your landlord's security deposit deductions, learn how to dispute them properly, avoid common mistakes, and improve your chances of getting your money back.",
};

export default function SecurityDepositDisputePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">
        Security Deposit Dispute: How to Challenge Unfair Deductions
      </h1>

      <p className="mb-6">
        A security deposit dispute happens when a landlord withholds part or all
        of a deposit for reasons the renter disagrees with. This often involves
        inflated charges, missing documentation, or deductions that go beyond
        normal wear and tear.
      </p>

      <p className="mb-6">
        Disputing a security deposit does not require a lawyer in most cases,
        but it does require the right steps, documentation, and timing.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Common Reasons Renters Dispute Security Deposits
      </h2>

      <ul className="list-disc pl-6 mb-6">
        <li>Charges for normal wear and tear</li>
        <li>Cleaning fees not specified in the lease</li>
        <li>Repair costs without receipts or proof</li>
        <li>Deductions listed without itemization</li>
        <li>Deposit not returned by the legal deadline</li>
      </ul>

      <p className="mb-6">
        If any of these apply, your landlord may be required to return some or
        all of your deposit depending on state law.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        How to Properly Dispute a Security Deposit
      </h2>

      <p className="mb-6">
        Successful disputes usually follow a clear process. Renters who get
        results typically:
      </p>

      <ul className="list-disc pl-6 mb-6">
        <li>Review the lease and move out documentation</li>
        <li>Identify which deductions are being disputed</li>
        <li>Reference the legal deadline in their state</li>
        <li>Send a written demand creating a paper trail</li>
      </ul>

      <p className="mb-6">
        Phone calls and informal messages rarely work. Written disputes tied to
        legal requirements are far more effective.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        What to Avoid During a Deposit Dispute
      </h2>

      <ul className="list-disc pl-6 mb-6">
        <li>Threatening legal action without preparation</li>
        <li>Missing response deadlines</li>
        <li>Sending emotional or unclear messages</li>
        <li>Failing to document communication</li>
      </ul>

      <p className="mb-6">
        These mistakes can weaken your position and make disputes drag on or
        fail entirely.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        How DepositReady Helps With Deposit Disputes
      </h2>

      <p className="mb-6">
        DepositReady helps renters dispute security deposits by generating a
        complete, professional dispute packet. You answer a few questions and
        receive a demand letter customized to your state laws, along with a
        clear documentation checklist.
      </p>

      <p className="mb-6">
        This gives landlords a clear, organized request they are more likely to
        take seriously.
      </p>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href="/build"
          className="inline-block rounded-md bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition text-center"
        >
          Start my security deposit dispute
        </Link>

        <Link
          href="/landlord-kept-security-deposit"
          className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
        >
          My landlord kept my deposit
        </Link>

        <Link
          href="/security-deposit-deadline"
          className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
        >
          Check my deposit deadline
        </Link>

        <Link
          href="/security-deposit-demand-letter"
          className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
        >
          Write a demand letter
        </Link>
      </div>

      <p className="text-sm text-gray-500 mt-12">
        DepositReady is not a law firm and does not provide legal advice. No
        outcomes are guaranteed.
      </p>
    </main>
  );
}
