import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { proseElements } from "@/components/content/prose-elements"

type PostBodyProps = {
  content: string
}

export function PostBody({ content }: PostBodyProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={proseElements}>
      {content}
    </ReactMarkdown>
  )
}
