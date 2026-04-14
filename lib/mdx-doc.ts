import fs from "node:fs"
import path from "node:path"

import type { Metadata } from "next"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

import { proseElements } from "@/components/content/prose-elements"

export type DocFrontmatter = {
  title?: string
  description?: string
}

export function docPath(filename: string) {
  return path.join(process.cwd(), "content", filename)
}

export function generateDocMetadata(
  filename: string,
  fallbackTitle: string,
): Metadata {
  const raw = fs.readFileSync(docPath(filename), "utf8")
  const { data } = matter(raw)
  const fm = data as DocFrontmatter
  const title = typeof fm.title === "string" ? fm.title : fallbackTitle
  const description =
    typeof fm.description === "string" ? fm.description : undefined
  return {
    title,
    description,
    openGraph: { title, description },
  }
}

export async function compileDoc(filename: string) {
  const raw = fs.readFileSync(docPath(filename), "utf8")
  return compileMDX<DocFrontmatter>({
    source: raw,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
    components: proseElements,
  })
}
