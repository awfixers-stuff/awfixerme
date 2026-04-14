import type { ReactNode } from "react"

export function DocPageShell({
  kicker,
  title,
  description,
  children,
}: {
  kicker: string
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <div className="container flex flex-1 flex-col px-4">
      <div className="mx-auto w-full max-w-3xl py-12 md:py-16">
        <p className="text-primary mb-3 text-sm font-medium tracking-wide uppercase">
          {kicker}
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
          {children}
        </div>
      </div>
    </div>
  )
}
