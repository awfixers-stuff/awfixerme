import type { Metadata } from "next"

import { DocPageShell } from "@/components/content/doc-page-shell"
import { compileDoc, generateDocMetadata } from "@/lib/mdx-doc"

export function generateMetadata(): Metadata {
  return generateDocMetadata("privacy.mdx", "Privacy Policy")
}

export default async function PrivacyPage() {
  const { content, frontmatter } = await compileDoc("privacy.mdx")
  const title =
    typeof frontmatter.title === "string"
      ? frontmatter.title
      : "Privacy Policy"
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
