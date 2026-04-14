import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArrowLeft } from "lucide-react"

import { PostBody } from "@/components/blog/post-body"
import { PostTocAside, PostTocMobile } from "@/components/blog/post-toc"
import { getPostBySlug, getPostSlugs } from "@/lib/posts"
import { cn } from "@/lib/utils"
import { extractToc } from "@/lib/toc"

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
  return getPostSlugs()
    .filter((slug) => getPostBySlug(slug) !== null)
    .map((slug) => ({ slug }))
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

  const toc = extractToc(post.content)

  return (
    <div className="container flex flex-1 flex-col px-4">
      <article className="mx-auto w-full max-w-5xl py-12 md:py-16">
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
            {post.category ? (
              <span className="before:content-['·'] before:mx-2">{post.category}</span>
            ) : null}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-5xl">
            {post.title}
          </h1>
          {post.author ? (
            <p className="text-muted-foreground mt-2 text-sm">By {post.author}</p>
          ) : null}
          {post.description ? (
            <p className="text-muted-foreground mt-4 max-w-2xl text-pretty text-lg leading-relaxed">
              {post.description}
            </p>
          ) : null}
          {post.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-primary/15 bg-card/30 text-muted-foreground rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <PostTocMobile entries={toc} />

        <div
          className={cn(
            "mt-8 grid gap-10",
            toc.length > 0 &&
              "lg:grid-cols-[minmax(0,1fr)_minmax(0,240px)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,260px)]",
          )}
        >
          <div className="border-primary/15 bg-card/20 min-w-0 rounded-[2rem] border p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-10">
            <PostBody content={post.content} />
          </div>
          <PostTocAside entries={toc} />
        </div>
      </article>
    </div>
  )
}
