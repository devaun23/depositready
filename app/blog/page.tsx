"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/landing";
import { blogPosts } from "@/lib/blog/posts";

const CATEGORY_COLORS: Record<string, string> = {
  "Know Your Rights": "#6366f1",
  "Deductions": "#9333ea",
  "Take Action": "#1e3a5f",
};

const CATEGORIES = ["All", ...Object.keys(CATEGORY_COLORS)];

const CARD_HEIGHTS = ["h-48", "h-56", "h-40"];

function DocumentIcon() {
  return (
    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  );
}

const CARD_ICONS = [DocumentIcon, ScaleIcon, PenIcon];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {/* Editorial header */}
        <div className="mb-10 md:mb-16">
          <span className="inline-block rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500 tracking-wider uppercase mb-4">
            Guides &amp; Resources
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight">
            The Deposit Digest
          </h1>
        </div>

        {/* Category filter bar */}
        <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors min-h-[44px] ${
                activeCategory === cat
                  ? "bg-gray-900 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, i) => {
            const Icon = CARD_ICONS[i % CARD_ICONS.length];
            const height = CARD_HEIGHTS[i % CARD_HEIGHTS.length];
            const categoryColor = CATEGORY_COLORS[post.category] || "#6b7280";

            return (
              <Link key={post.slug} href={post.seoPagePath} className="group">
                <div className="rounded-xl border border-gray-200 overflow-hidden hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                  {/* Image placeholder area */}
                  <div className={`bg-gray-50 ${height} flex items-center justify-center`}>
                    <Icon />
                  </div>
                  {/* Body */}
                  <div className="p-5">
                    {/* Meta line */}
                    <div className="flex items-center gap-2 text-xs mb-3">
                      <span
                        className="font-medium uppercase tracking-wider"
                        style={{ color: categoryColor }}
                      >
                        {post.category}
                      </span>
                      <span className="text-gray-400">&middot;</span>
                      <span className="text-gray-400">{post.date}</span>
                    </div>
                    {/* Title */}
                    <h2 className="font-serif text-xl font-semibold text-gray-900 group-hover:text-accent tracking-tight mb-2 transition-colors">
                      {post.title}
                    </h2>
                    {/* Excerpt */}
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
                      {post.description}
                    </p>
                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{post.readingTime}</span>
                      <span className="group-hover:text-accent transition-colors">
                        Read &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
