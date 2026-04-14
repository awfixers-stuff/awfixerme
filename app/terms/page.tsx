import type { Metadata } from "next"

import { DocPageShell } from "@/components/content/doc-page-shell"
import { compileDoc, generateDocMetadata } from "@/lib/mdx-doc"

export function generateMetadata(): Metadata {
  return generateDocMetadata("terms.mdx", "Terms of Use")
}

export default async function TermsPage() {
  const { content, frontmatter } = await compileDoc("terms.mdx")
  const title =
    typeof frontmatter.title === "string" ? frontmatter.title : "Terms of Use"
  const description =
    typeof frontmatter.description === "string"
      ? frontmatter.description
      : undefined

  return (
    <DocPageShell kicker="Legal" title={title} description={description}>
      {content}
    </DocPageShell>
  )
}
