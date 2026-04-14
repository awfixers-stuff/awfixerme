import fs from "node:fs"
import path from "node:path"

import type { Metadata } from "next"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

import { proseElements } from "@/components/content/prose-elements"

type AboutFrontmatter = {
  title?: string
  description?: string
}

const ABOUT_PATH = path.join(process.cwd(), "content/about.mdx")

export async function generateMetadata(): Promise<Metadata> {
  const raw = fs.readFileSync(ABOUT_PATH, "utf8")
  const { data } = matter(raw)
  const fm = data as AboutFrontmatter
  const title = typeof fm.title === "string" ? fm.title : "About"
  const description =
    typeof fm.description === "string" ? fm.description : undefined
  return {
    title,
    description,
    openGraph: { title, description },
  }
}

export default async function AboutPage() {
  const raw = fs.readFileSync(ABOUT_PATH, "utf8")
  const { content, frontmatter } = await compileMDX<AboutFrontmatter>({
    source: raw,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
    components: proseElements,
  })

  const title =
    typeof frontmatter.title === "string" ? frontmatter.title : "About"
  const description =
    typeof frontmatter.description === "string"
      ? frontmatter.description
      : undefined

  return (
    <div className="container flex flex-1 flex-col px-4">
      <div className="mx-auto w-full max-w-3xl py-12 md:py-16">
        <p className="text-primary mb-3 text-sm font-medium tracking-wide uppercase">
          About
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="text-muted-foreground mt-4 max-w-2xl text-pretty text-lg leading-relaxed">
            {description}
          </p>
        ) : null}

        <div className="border-primary/15 bg-card/20 mt-10 rounded-[2rem] border p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-10">
          {content}
        </div>
      </div>
    </div>
  )
}
