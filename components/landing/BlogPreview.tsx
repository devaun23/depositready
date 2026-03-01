"use client";

import Link from "next/link";
import { blogPosts } from "@/lib/blog/posts";
import { useScrollReveal } from "@/lib/useScrollReveal";

const CATEGORY_COLORS: Record<string, string> = {
  "Know Your Rights": "#6366f1",
  "Deductions": "#9333ea",
  "Take Action": "#1e3a5f",
};

export function BlogPreview() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-16 md:py-24 px-4 sm:px-6 bg-white"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand mb-8">
          The Deposit Digest
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => {
            const categoryColor = CATEGORY_COLORS[post.category] || "#6b7280";

            return (
              <Link
                key={post.slug}
                href={post.seoPagePath}
                className="group"
              >
                <div
                  className={`rounded-xl border border-gray-200 p-5 hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 h-full ${
                    visible ? "animate-fadeSlideUp" : "opacity-0"
                  }`}
                  style={{ animationDelay: visible ? `${i * 100}ms` : undefined, animationFillMode: "both" }}
                >
                  {/* Category badge */}
                  <div className="flex items-center gap-2 text-xs mb-3">
                    <span
                      className="font-medium uppercase tracking-wider"
                      style={{ color: categoryColor }}
                    >
                      {post.category}
                    </span>
                    <span className="text-gray-400">&middot;</span>
                    <span className="text-gray-400">{post.readingTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-base font-semibold text-gray-900 group-hover:text-accent tracking-tight mb-2 transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          href="/blog"
          className="inline-block mt-8 text-sm font-medium text-brand hover:text-brand-light transition-colors"
        >
          View all guides &rarr;
        </Link>
      </div>
    </section>
  );
}
