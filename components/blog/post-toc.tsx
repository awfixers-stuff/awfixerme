import type { TocEntry } from "@/lib/toc"

function TocList({ entries }: { entries: TocEntry[] }) {
  return (
    <ul className="border-primary/15 bg-card/25 space-y-1.5 rounded-2xl border p-4 text-sm">
      {entries.map((e) => (
        <li
          key={`${e.depth}-${e.id}-${e.text}`}
          style={{ paddingLeft: `${Math.max(0, e.depth - 2) * 12}px` }}
        >
          <a
            href={`#${e.id}`}
            className="text-muted-foreground hover:text-primary block leading-snug underline decoration-transparent underline-offset-2 transition-colors hover:decoration-primary/50"
          >
            {e.text}
          </a>
        </li>
      ))}
    </ul>
  )
}

/** Collapsible TOC for smaller viewports */
export function PostTocMobile({ entries }: { entries: TocEntry[] }) {
  if (entries.length === 0) return null
  return (
    <div className="mt-8 lg:hidden">
      <details className="border-primary/15 bg-card/20 group rounded-2xl border open:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
        <summary className="text-foreground cursor-pointer list-none px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
          On this page{" "}
          <span className="text-muted-foreground group-open:hidden">· tap to open</span>
        </summary>
        <div className="border-primary/10 border-t px-3 pb-3 pt-1">
          <TocList entries={entries} />
        </div>
      </details>
    </div>
  )
}

/** Sticky sidebar TOC (large screens) */
export function PostTocAside({ entries }: { entries: TocEntry[] }) {
  if (entries.length === 0) return null
  return (
    <aside className="hidden lg:block">
      <nav aria-label="Table of contents" className="sticky top-32">
        <p className="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase">
          On this page
        </p>
        <TocList entries={entries} />
      </nav>
    </aside>
  )
}
