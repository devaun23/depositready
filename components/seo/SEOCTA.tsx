import Link from "next/link";

interface SEOCTAProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButtons?: {
    text: string;
    href: string;
  }[];
}

export function SEOCTA({ title, description, primaryButton, secondaryButtons }: SEOCTAProps) {
  return (
    <section className="py-12">
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black mb-3">
          {title}
        </h2>
        <p className="text-gray-600 text-lg mb-6 max-w-xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:flex-wrap">
          <Link
            href={primaryButton.href}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            {primaryButton.text}
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          {secondaryButtons?.map((button, index) => (
            <Link
              key={index}
              href={button.href}
              className="inline-block px-6 py-3 border border-gray-300 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              {button.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
