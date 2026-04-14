import type { Metadata } from "next"

import { BlogIndexClient } from "@/components/blog/blog-index-client"
import { getAllPosts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Blog",
  description: "Updates, notes, and longer writing from AWFixer’s Lounge.",
}

/** ISR: refresh from Marble periodically; webhooks hit `/api/revalidate` for on-demand updates. */
export const revalidate = 3600

export default async function BlogIndexPage() {
  const posts = await getAllPosts()

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
          Posts are authored in{" "}
          <a
            href="https://marblecms.com"
            className="text-primary font-medium underline decoration-primary/35 underline-offset-4"
          >
            Marble
          </a>{" "}
          and delivered through the Marble API.
        </p>

        <BlogIndexClient posts={posts} />

        {posts.length === 0 ? (
          <p className="text-muted-foreground mt-10 text-sm">
            No published posts yet. Publish from your Marble workspace or set{" "}
            <code className="text-foreground font-mono text-xs">MARBLE_API_KEY</code>{" "}
            locally.
          </p>
        ) : null}
      </section>
    </div>
  )
}
