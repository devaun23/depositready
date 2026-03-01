import type { Metadata } from "next";
import Link from "next/link";
import { Navbar, Footer } from "@/components/landing";
import { blogPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Legal Guides for Renters | DepositReady Blog",
  description:
    "Practical guides on security deposit law, landlord disputes, and tenant rights — written in plain English.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <h1 className="font-serif text-3xl md:text-5xl font-semibold text-brand mb-3">
          Legal Guides for Renters
        </h1>
        <p className="text-gray-500 text-base md:text-lg mb-12">
          Plain-English guides on security deposit law and tenant rights.
        </p>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group">
              <Link
                href={post.seoPagePath}
                className="block rounded-xl p-5 -mx-5 hover:bg-[var(--section-bg-alt)] transition-colors"
              >
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                  <span className="font-medium text-accent">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-lg font-semibold text-black group-hover:text-brand transition-colors mb-1">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {post.description}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
