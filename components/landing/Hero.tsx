"use client";

export function Hero() {
  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-light/40 via-background to-background" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Headline */}
        <div
          className="opacity-0 animate-fadeSlideUp"
          style={{ animationDelay: "0ms", animationFillMode: "both", animationDuration: "0.6s" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-tight text-foreground">
            Your landlord may owe you{" "}
            <span className="gradient-text">2&ndash;3&times; your security deposit.</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className="opacity-0 animate-fadeSlideUp"
          style={{ animationDelay: "150ms", animationFillMode: "both", animationDuration: "0.5s" }}
        >
          <p className="mt-5 text-base sm:text-lg text-muted max-w-lg mx-auto leading-relaxed">
            Most renters never realize their landlord already violated the law.
            DepositReady checks your case in 60 seconds and shows exactly what you may be owed.
          </p>
        </div>

        {/* CTA Button */}
        <div
          className="opacity-0 animate-fadeSlideUp"
          style={{ animationDelay: "300ms", animationFillMode: "both", animationDuration: "0.5s" }}
        >
          <div className="mt-10">
            <a
              href="#claim-engine"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white text-base font-semibold rounded-2xl hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 shadow-xl shadow-accent/20 min-h-[44px]"
            >
              Check My Case Free
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <p className="mt-3 text-xs text-muted/70 flex items-center justify-center gap-1.5">
              {/* Clock icon */}
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              60 seconds · No sign-up · Free verdict
            </p>
          </div>
        </div>

        {/* Bottom trust signals */}
        <div
          className="opacity-0 animate-fadeSlideUp"
          style={{ animationDelay: "500ms", animationFillMode: "both", animationDuration: "0.5s" }}
        >
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-xs text-muted/70">
            <span className="flex items-center gap-1.5">
              {/* ShieldCheck icon */}
              <svg className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Money-back guarantee
            </span>
            <span className="h-3 w-px bg-border" />
            <span>2,400+ renter cases analyzed</span>
            <span className="h-3 w-px bg-border" />
            <span className="flex items-center gap-1.5">
              {/* Lock icon */}
              <svg className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Secure &amp; private
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
