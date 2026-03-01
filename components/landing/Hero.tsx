import Link from "next/link";

export function Hero() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-brand leading-tight">
          Let&rsquo;s get your security deposit back&nbsp;&mdash; together.
        </h1>

        <p className="mt-4 text-gray-500 text-base md:text-lg max-w-xl">
          Free AI guidance. State-specific law. No sign-up required.
        </p>

        <Link
          href="/chat"
          className="inline-flex items-center justify-center gap-2 mt-8 w-full sm:w-auto px-8 py-4 bg-accent text-white text-lg font-medium rounded-xl hover:bg-accent-hover transition-colors shadow-md hover:shadow-lg"
        >
          Start Free Chat
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>

        <a
          href="#how-it-works"
          className="inline-block mt-3 text-sm text-gray-500 hover:text-brand transition-colors"
        >
          See how it works
        </a>

        {/* Social proof */}
        <p className="mt-6 text-sm text-gray-500">
          Joined by <span className="font-semibold text-black">2,400+</span>{" "}
          renters across 16 states
        </p>

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-gray-400 max-w-md">
          Not a law firm. No legal advice. No guaranteed outcomes.
        </p>
      </div>
    </section>
  );
}
