import Link from "next/link"

import { auth } from "@clerk/nextjs/server"

import { Button } from "@/components/ui/button"

export default async function Page() {
  const { userId } = await auth()

  return (
    <div className="container flex flex-1 flex-col items-center px-4">
      <section className="flex w-full max-w-3xl flex-col items-center gap-8 py-12 text-center md:py-20">
        <div className="border-primary/20 bg-card/30 relative w-full rounded-[2rem] border p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-2xl md:p-12">
          <p className="text-primary mb-3 text-sm font-medium tracking-wide uppercase">
            Welcome
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl">
            AWFixer&apos;s Lounge
          </h1>
          <p className="text-muted-foreground mx-auto mt-5 max-w-md text-pretty leading-relaxed md:text-lg">
            A crimson-on-black, glass-edged home on the web — the public face of
            AWFixer. This is the first build: rounded corners, soft light, room to
            grow.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="rounded-full px-8" asChild>
              <a href="#start">Explore</a>
            </Button>
            <Button variant="glass" size="lg" className="rounded-full px-8" asChild>
              <Link href="/blog">Read the blog</Link>
            </Button>
          </div>
          {userId ? (
            <p className="text-muted-foreground mt-8 text-xs">
              You&apos;re signed in — thanks for stopping by the Lounge.
            </p>
          ) : null}
        </div>

        <div
          id="start"
          className="border-primary/15 bg-card/20 w-full scroll-mt-32 rounded-3xl border p-6 text-left backdrop-blur-xl md:p-8"
        >
          <h2 className="text-lg font-semibold tracking-tight">First build notes</h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            The frame is set: navigation, footer, and hero use the same liquid-glass
            treatment and full rounding. Swap this block for your real content when
            you&apos;re ready.
          </p>
          <p className="text-muted-foreground mt-4 font-mono text-xs">
            Tip: press <kbd className="text-foreground rounded-md bg-white/8 px-1.5 py-0.5">d</kbd>{" "}
            to toggle light or dark theme.
          </p>
        </div>
      </section>
    </div>
  )
}
