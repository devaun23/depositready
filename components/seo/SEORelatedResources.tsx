import Link from "next/link";

interface SEORelatedResourcesProps {
  links: {
    title: string;
    href: string;
    description?: string;
  }[];
}

export function SEORelatedResources({ links }: SEORelatedResourcesProps) {
  return (
    <section className="py-10 border-t border-gray-200">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Related Resources
      </div>
      <div className="space-y-3">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors group"
          >
            <div>
              <div className="font-medium text-gray-900 group-hover:text-black">
                {link.title}
              </div>
              {link.description && (
                <div className="text-sm text-gray-500 mt-0.5">
                  {link.description}
                </div>
              )}
            </div>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0"
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
        ))}
      </div>
    </section>
  );
}
