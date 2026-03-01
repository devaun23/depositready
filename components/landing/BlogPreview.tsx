import Link from "next/link";
import { blogPosts } from "@/lib/blog/posts";

export function BlogPreview() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-brand mb-8">
          Legal Guides for Renters
        </h2>

        <div className="space-y-4">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={post.seoPagePath}
              className="block rounded-xl p-4 -mx-4 hover:bg-[var(--section-bg-alt)] transition-colors group"
            >
              <h3 className="text-sm font-semibold text-black group-hover:text-brand transition-colors mb-0.5">
                {post.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {post.description}
              </p>
            </Link>
          ))}
        </div>

        <Link
          href="/blog"
          className="inline-block mt-6 text-sm font-medium text-brand hover:text-brand-light transition-colors"
        >
          View all guides &rarr;
        </Link>
      </div>
    </section>
  );
}
