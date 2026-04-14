import type { Post as MarblePost } from "@usemarble/sdk/models"
import { ContentFormat } from "@usemarble/sdk/models"

import { getMarble } from "@/lib/marble/client"

export type PostMeta = {
  slug: string
  title: string
  description: string
  /** ISO date string */
  date: string
  tags: string[]
  category: string | null
  keywords: string[]
  author: string | null
  draft: boolean
}

export type Post = PostMeta & {
  content: string
}

function keywordsFromFields(
  fields: MarblePost["fields"],
): string[] {
  const out: string[] = []
  for (const value of Object.values(fields)) {
    if (typeof value === "string" && value.trim()) {
      out.push(value.trim())
    } else if (Array.isArray(value)) {
      for (const v of value) {
        if (typeof v === "string" && v.trim()) {
          out.push(v.trim())
        }
      }
    }
  }
  return out
}

function toPostMeta(p: MarblePost): PostMeta {
  const author = p.authors[0]?.name ?? null
  const category = p.category?.name ?? null
  const tags = p.tags.map((t) => t.name)
  const draft = p.status === "draft"

  return {
    slug: p.slug,
    title: p.title,
    description: p.description ?? "",
    date: p.publishedAt.toISOString(),
    tags,
    category,
    keywords: keywordsFromFields(p.fields),
    author,
    draft,
  }
}

function toPost(p: MarblePost): Post {
  return {
    ...toPostMeta(p),
    content: p.content,
  }
}

async function fetchAllPublishedPosts(): Promise<MarblePost[]> {
  const marble = getMarble()
  if (!marble) {
    return []
  }

  const collected: MarblePost[] = []
  const iterator = await marble.posts.list({
    limit: 100,
    page: 1,
    status: "published",
    format: ContentFormat.Markdown,
    order: "desc",
  })

  for await (const page of iterator) {
    collected.push(...page.result.posts)
  }

  return collected
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await fetchAllPublishedPosts()
  return posts.map((p) => p.slug)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const marble = getMarble()
  if (!marble) {
    return null
  }

  try {
    const { post } = await marble.posts.get({
      identifier: slug,
      format: ContentFormat.Markdown,
      status: "published",
    })
    if (post.status === "draft" && process.env.NODE_ENV === "production") {
      return null
    }
    return toPost(post)
  } catch {
    return null
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const posts = await fetchAllPublishedPosts()
  return posts.map(toPostMeta)
}
