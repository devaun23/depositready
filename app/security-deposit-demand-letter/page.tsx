import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security Deposit Demand Letter: How to Write One That Works",
  description:
    "A security deposit demand letter is often the fastest way to get your deposit back. Learn what to include, common mistakes, and how renters resolve disputes.",
};

export default function SecurityDepositDemandLetterPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">
        Security Deposit Demand Letter: How to Write One That Works
      </h1>

      <p className="mb-6">
        If your landlord has not returned your security deposit or charged
        deductions you do not agree with, a security deposit demand letter is
        often the fastest way to resolve the dispute.
      </p>

      <p className="mb-6">
        A demand letter creates a written record, references legal deadlines,
        and signals that you understand your rights. Many landlords respond once
        a formal letter is sent.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        What Is a Security Deposit Demand Letter?
      </h2>

      <p className="mb-6">
        A security deposit demand letter is a written request asking the
        landlord to return all or part of your deposit. It typically references
        state deadlines, explains why deductions are disputed, and sets a clear
        timeframe for response.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        What a Strong Demand Letter Should Include
      </h2>

      <ul className="list-disc pl-6 mb-6">
        <li>Your move out date and rental address</li>
        <li>The amount of the security deposit paid</li>
        <li>The legal deadline for return in your state</li>
        <li>A request for the deposit or proper itemization</li>
        <li>A clear response deadline</li>
      </ul>

      <p className="mb-6">
        Missing key details or sending an emotional message instead of a clear,
        professional request often causes landlords to ignore the dispute.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Common Mistakes Renters Make
      </h2>

      <ul className="list-disc pl-6 mb-6">
        <li>Threatening legal action without understanding deadlines</li>
        <li>Sending vague emails or text messages</li>
        <li>Failing to reference state specific requirements</li>
        <li>Not keeping a written paper trail</li>
      </ul>

      <p className="mb-6">
        These mistakes weaken your position and make it easier for the landlord
        to delay or deny your request.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        How DepositReady Makes This Easy
      </h2>

      <p className="mb-6">
        DepositReady generates a professional security deposit demand letter
        customized to your state laws. You answer a few questions and receive a
        letter that includes the correct deadlines, structure, and language
        landlords recognize.
      </p>

      <p className="mb-6">
        Instead of guessing what to write, you can send a clear, organized
        demand in minutes.
      </p>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href="/build"
          className="inline-block rounded-md bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition text-center"
        >
          Generate my demand letter
        </Link>

        <Link
          href="/security-deposit-deadline"
          className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
        >
          Check my deposit deadline
        </Link>

        <Link
          href="/landlord-kept-security-deposit"
          className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
        >
          My landlord kept my deposit
        </Link>

        <Link
          href="/security-deposit-dispute"
          className="inline-block rounded-md border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-50 transition text-center"
        >
          Dispute unfair deductions
        </Link>
      </div>

      <p className="text-sm text-gray-500 mt-12">
        DepositReady is not a law firm and does not provide legal advice. No
        outcomes are guaranteed.
      </p>
    </main>
  );
}
