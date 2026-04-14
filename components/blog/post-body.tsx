import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type PostBodyProps = {
  content: string
}

export function PostBody({ content }: PostBodyProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-10 scroll-mt-32 text-2xl font-semibold tracking-tight first:mt-0 md:text-3xl">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-10 scroll-mt-32 text-xl font-semibold tracking-tight first:mt-0 md:text-2xl">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 scroll-mt-32 text-lg font-semibold tracking-tight md:text-xl">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-muted-foreground mt-4 text-pretty leading-relaxed first:mt-0 md:text-[1.05rem]">
            {children}
          </p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-primary font-medium underline decoration-primary/35 underline-offset-4 transition-colors hover:decoration-primary"
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-6 leading-relaxed first:mt-0">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="text-muted-foreground mt-4 list-decimal space-y-2 pl-6 leading-relaxed first:mt-0">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        strong: ({ children }) => (
          <strong className="text-foreground font-semibold">{children}</strong>
        ),
        em: ({ children }) => <em className="text-foreground/95">{children}</em>,
        code: ({ className, children }) => {
          const isBlock = className?.includes("language-")
          if (isBlock) {
            return (
              <code className="font-mono text-sm text-foreground">{children}</code>
            )
          }
          return (
            <code className="bg-muted/80 text-foreground rounded-md px-1.5 py-0.5 font-mono text-[0.9em]">
              {children}
            </code>
          )
        },
        pre: ({ children }) => (
          <pre className="border-primary/15 bg-card/40 mt-4 overflow-x-auto rounded-2xl border p-4 text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl first:mt-0">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-primary/30 text-muted-foreground mt-4 border-l-2 pl-5 italic first:mt-0">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="border-primary/15 my-10" />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
