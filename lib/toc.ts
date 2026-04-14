import { toString } from "mdast-util-to-string"
import remarkGfm from "remark-gfm"
import { remark } from "remark"
import Slugger from "github-slugger"
import { visit } from "unist-util-visit"
import type { Root } from "mdast"

export type TocEntry = {
  depth: number
  id: string
  text: string
}

const MIN_DEPTH = 2
const MAX_DEPTH = 4

export function extractToc(markdown: string): TocEntry[] {
  const tree = remark().use(remarkGfm).parse(markdown) as Root
  const slugger = new Slugger()
  const entries: TocEntry[] = []
  visit(tree, "heading", (node) => {
    if (node.depth < MIN_DEPTH || node.depth > MAX_DEPTH) return
    const text = toString(node).trim()
    if (!text) return
    const id = slugger.slug(text)
    entries.push({ depth: node.depth, id, text })
  })
  return entries
}
