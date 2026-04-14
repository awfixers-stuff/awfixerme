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
          </p>
          <h2 className="text-foreground group-hover:text-primary text-lg font-semibold tracking-tight transition-colors">
            {post.title}
          </h2>
          <p className="text-muted-foreground text-pretty text-sm leading-relaxed">
            {post.description}
          </p>
        </div>
        <ArrowUpRight className="text-muted-foreground group-hover:text-primary mt-1 size-5 shrink-0 transition-colors" />
      </div>
    </Link>
  )
}
