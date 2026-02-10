export function PMHero() {
  return (
    <section className="min-h-[calc(100dvh-64px)] sm:min-h-0 flex flex-col justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 snap-start">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-block bg-black text-white text-xs font-medium px-3 py-1 rounded-full mb-6">
          For Florida Property Managers
        </div>

        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-black leading-tight mb-6 md:mb-8">
          Lawsuit-Proof Your
          <br />
          <span className="text-gray-600">
            Security Deposit Process.
          </span>
        </h1>

        <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
          Generate a FL §83.49-compliant deposit disposition packet in 10
          minutes. Proper notice, itemized deductions, certified mail
          instructions — everything you need to avoid a lawsuit.
        </p>

        <a
          href="/pm/wizard"
          className="inline-flex items-center justify-center bg-black text-white px-8 py-4 text-lg font-medium rounded hover:bg-gray-800 transition-colors min-h-[48px] mb-6"
        >
          Generate My Packet — $29
        </a>

        <p className="text-xs text-gray-500">
          $29 per packet · Instant download · FL §83.49 compliant · No
          subscription required
        </p>
      </div>
    </section>
  );
}
