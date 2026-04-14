import fs from "node:fs"
import path from "node:path"

import matter from "gray-matter"

const POSTS_DIR = path.join(process.cwd(), "content/posts")

export type PostMeta = {
  slug: string
  title: string
  description: string
  /** ISO date string from frontmatter */
  date: string
}

export type Post = PostMeta & {
  content: string
}

function parseDate(value: unknown): string {
  if (typeof value === "string" && value.trim()) {
    const d = new Date(value)
    if (!Number.isNaN(d.getTime())) return d.toISOString()
  }
  return new Date(0).toISOString()
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

export function getPostBySlug(slug: string): Post | null {
  const file = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, "utf8")
  const { data, content } = matter(raw)
  const title = typeof data.title === "string" ? data.title : slug
  const description =
    typeof data.description === "string" ? data.description : ""
  const date = parseDate(data.date)
  return { slug, title, description, date, content }
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const post = getPostBySlug(slug)
      if (!post) return null
      return {
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
      }
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
