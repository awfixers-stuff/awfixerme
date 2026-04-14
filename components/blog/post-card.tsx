import Link from "next/link"

import { ArrowUpRight } from "lucide-react"

import type { PostMeta } from "@/lib/posts"

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="border-primary/15 bg-card/25 group block rounded-3xl border p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-colors hover:bg-card/35"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {formatDate(post.date)}
            {post.category ? (
              <span className="before:content-['·'] before:mx-1.5">{post.category}</span>
            ) : null}
          </p>
          <h2 className="text-foreground group-hover:text-primary text-lg font-semibold tracking-tight transition-colors">
            {post.title}
          </h2>
          <p className="text-muted-foreground text-pretty text-sm leading-relaxed">
            {post.description}
          </p>
          {post.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className="border-primary/15 bg-card/40 text-muted-foreground rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <ArrowUpRight className="text-muted-foreground group-hover:text-primary mt-1 size-5 shrink-0 transition-colors" />
      </div>
    </Link>
  )
}
