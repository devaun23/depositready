import Link from "next/link";

const messages = [
  {
    role: "user" as const,
    text: "I moved out 6 weeks ago and my landlord still hasn\u2019t returned my $1,800 deposit.",
  },
  {
    role: "assistant" as const,
    text: "I can help with that. What state did you rent in? I\u2019ll check your specific deadlines and what you may be owed.",
  },
];

export function ChatPreview() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-[var(--section-bg-alt)]">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand mb-10">
          Try it free. Right now.
        </h2>

        {/* Simulated chat window */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-[var(--shadow-elevated)] overflow-hidden max-w-md mx-auto">
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
            <span className="ml-2 text-xs text-gray-400">
              DepositReady Chat
            </span>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-brand/8 text-gray-900 rounded-br-md"
                      : "bg-white text-gray-900 shadow-sm border border-gray-100/80 rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white text-lg font-medium rounded-xl hover:bg-accent-hover transition-colors shadow-md hover:shadow-lg"
          >
            Start Free Case Chat
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
        </div>
      </div>
    </section>
  );
}
