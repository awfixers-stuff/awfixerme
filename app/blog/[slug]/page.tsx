import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArrowLeft } from "lucide-react"

import { PostBody } from "@/components/blog/post-body"
import { getPostBySlug, getPostSlugs } from "@/lib/posts"

type PageProps = {
  params: Promise<{ slug: string }>
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Not found" }
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="container flex flex-1 flex-col px-4">
      <article className="mx-auto w-full max-w-3xl py-12 md:py-16">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="size-4" />
          All posts
        </Link>

        <header className="mt-8">
          <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
            {formatDate(post.date)}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-5xl">
            {post.title}
          </h1>
          {post.description ? (
            <p className="text-muted-foreground mt-4 max-w-2xl text-pretty text-lg leading-relaxed">
              {post.description}
            </p>
          ) : null}
        </header>

        <div className="border-primary/15 bg-card/20 mt-10 rounded-[2rem] border p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-10">
          <PostBody content={post.content} />
        </div>
      </article>
    </div>
  )
}
