import Link from "next/link";

export function AlreadySentLetter() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 bg-gray-50 snap-start">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black mb-3">
          Sent a letter? Here&apos;s what&apos;s next.
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-6 max-w-lg mx-auto">
          If your landlord ignored you or sent a partial refund, you still have options.
        </p>
        <Link
          href="/next-steps"
          className="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-gray-700 transition border-b border-black pb-0.5"
        >
          See your next steps
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
