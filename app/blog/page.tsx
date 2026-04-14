import type { Metadata } from "next"

import { PostCard } from "@/components/blog/post-card"
import { getAllPosts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Blog",
  description: "Updates, notes, and longer writing from AWFixer’s Lounge.",
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <div className="container flex flex-1 flex-col px-4">
      <section className="mx-auto w-full max-w-3xl py-12 md:py-16">
        <p className="text-primary mb-3 text-sm font-medium tracking-wide uppercase">
          Writing
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl">
          Blog
        </h1>
        <p className="text-muted-foreground mt-4 max-w-xl text-pretty leading-relaxed md:text-lg">
          Markdown posts from the repo — versioned with the site, rendered as static
          pages.
        </p>

        <ul className="mt-12 flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>

        {posts.length === 0 ? (
          <p className="text-muted-foreground mt-10 text-sm">
            No posts yet. Add Markdown files under{" "}
            <code className="text-foreground font-mono text-xs">content/posts</code>.
          </p>
        ) : null}
      </section>
    </div>
  )
}
