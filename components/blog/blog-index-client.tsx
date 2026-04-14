"use client"

import { useMemo, useState } from "react"

import { Search } from "lucide-react"

import { PostCard } from "@/components/blog/post-card"
import type { PostMeta } from "@/lib/posts"

type BlogIndexClientProps = {
  posts: PostMeta[]
}

function normalize(s: string) {
  return s.trim().toLowerCase()
}

function postSearchBlob(post: PostMeta): string {
  return [
    post.title,
    post.description,
    post.category ?? "",
    post.author ?? "",
    ...post.tags,
    ...post.keywords,
  ]
    .join(" ")
    .toLowerCase()
}

function scoreMatch(post: PostMeta, q: string): number {
  const hay = postSearchBlob(post)
  const term = normalize(q)
  if (!term) return 1
  if (!hay.includes(term)) return 0
  const title = post.title.toLowerCase()
  const cat = (post.category ?? "").toLowerCase()
  let score = 1
  if (title.includes(term)) score += 4
  if (post.tags.some((t) => t.toLowerCase().includes(term))) score += 3
  if (cat.includes(term)) score += 2
  if ((post.author ?? "").toLowerCase().includes(term)) score += 2
  post.keywords.forEach((k) => {
    if (k.toLowerCase().includes(term)) score += 1.5
  })
  if (post.description.toLowerCase().includes(term)) score += 1
  return score
}

export function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = normalize(query)
    if (!q) return posts
    const ranked = posts
      .map((post) => ({ post, score: scoreMatch(post, q) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
    return ranked.map((r) => r.post)
  }, [posts, query])

  return (
    <div className="mt-10 space-y-8">
      <label className="group relative block">
        <span className="sr-only">Search posts</span>
        <Search className="text-muted-foreground group-focus-within:text-primary pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 transition-colors" />
        <input
          type="search"
          name="blog-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title, tags, category, keywords, author…"
          autoComplete="off"
          className="border-primary/15 bg-card/30 text-foreground placeholder:text-muted-foreground focus:border-primary/40 w-full rounded-full border py-3 pr-4 pl-11 text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] outline-none backdrop-blur-xl transition-[box-shadow,border-color] focus:ring-2 focus:ring-[oklch(0.58_0.22_25/0.25)]"
        />
      </label>

      <ul className="flex flex-col gap-4">
        {filtered.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>

      {posts.length > 0 && filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No posts match &quot;{query}&quot;. Try another tag, keyword, or title fragment.
        </p>
      ) : null}
    </div>
  )
}
