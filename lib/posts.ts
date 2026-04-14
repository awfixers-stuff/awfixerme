import fs from "node:fs"
import path from "node:path"

import matter from "gray-matter"

const POSTS_DIR = path.join(process.cwd(), "content/posts")

function parseDate(value: unknown): string {
  if (typeof value === "string" && value.trim()) {
    const d = new Date(value)
    if (!Number.isNaN(d.getTime())) return d.toISOString()
  }
  return new Date(0).toISOString()
}

function parseStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((v): v is string => typeof v === "string")
      .map((v) => v.trim())
      .filter(Boolean)
  }
  if (typeof value === "string") {
    return value
      .split(/[,;]/)
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

function parseOptionalString(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim()
  return null
}

function parseBool(value: unknown, fallback: boolean): boolean {
  if (typeof value === "boolean") return value
  if (value === "true") return true
  if (value === "false") return false
  return fallback
}

export type PostMeta = {
  slug: string
  title: string
  description: string
  /** ISO date string from frontmatter */
  date: string
  /** Topic labels (shown in cards and indexed for search) */
  tags: string[]
  /** Single bucket, e.g. notes, build-log, design */
  category: string | null
  /** Extra search phrases (not necessarily visible in UI) */
  keywords: string[]
  author: string | null
  /** When true, hidden from lists and 404 in production builds */
  draft: boolean
}

export type Post = PostMeta & {
  content: string
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

function metaFromData(
  slug: string,
  data: Record<string, unknown>,
): Omit<PostMeta, "slug"> {
  const title = typeof data.title === "string" ? data.title : slug
  const description =
    typeof data.description === "string" ? data.description : ""

  return {
    title,
    description,
    date: parseDate(data.date),
    tags: parseStringList(data.tags),
    category: parseOptionalString(data.category),
    keywords: parseStringList(data.keywords),
    author: parseOptionalString(data.author),
    draft: parseBool(data.draft, false),
  }
}

function isDraftBlocked(meta: Pick<PostMeta, "draft">): boolean {
  return meta.draft && process.env.NODE_ENV === "production"
}

export function getPostBySlug(slug: string): Post | null {
  const file = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, "utf8")
  const { data, content } = matter(raw) as {
    data: Record<string, unknown>
    content: string
  }
  const meta = metaFromData(slug, data)
  if (isDraftBlocked(meta)) return null

  return {
    slug,
    ...meta,
    content,
  }
}

export function getAllPosts(): PostMeta[] {
  const items = getPostSlugs()
    .map((slug) => {
      const file = path.join(POSTS_DIR, `${slug}.md`)
      if (!fs.existsSync(file)) return null
      const raw = fs.readFileSync(file, "utf8")
      const { data } = matter(raw) as {
        data: Record<string, unknown>
      }
      const meta = metaFromData(slug, data)
      if (isDraftBlocked(meta)) return null
      return { slug, ...meta }
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return items
}
