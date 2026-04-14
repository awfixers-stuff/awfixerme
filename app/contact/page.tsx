import type { Metadata } from "next"
import Link from "next/link"

import { ArrowUpRight, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach AWFixer — email, socials, and the Lounge.",
  openGraph: {
    title: "Contact",
    description: "Reach AWFixer — email, socials, and the Lounge.",
  },
}

const email = "hello@awfixer.me"

const links = [
  { name: "X", href: "https://x.com/awfixer" },
  { name: "Discord", href: "/discord" },
] as const

export default function ContactPage() {
  return (
    <div className="container flex flex-1 flex-col px-4">
      <div className="mx-auto w-full max-w-3xl py-12 md:py-16">
        <p className="mb-3 text-sm font-medium tracking-wide text-primary uppercase">
          Contact
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl">
          Get in touch
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
          Questions, collaborations, or just a hello — pick a channel below. For
          longer context, the{" "}
          <Link
            href="/blog"
            className="font-medium text-primary underline decoration-primary/35 underline-offset-4 transition-colors hover:decoration-primary"
          >
            blog
          </Link>{" "}
          is the best place to see how things are built.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          <div className="flex flex-col gap-4 rounded-3xl border border-primary/15 bg-card/25 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <Mail className="size-5" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-medium tracking-tight">Email</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Prefer async; I read everything.
                </p>
              </div>
            </div>
            <Button className="rounded-full px-6 sm:shrink-0" asChild>
              <a href={`mailto:${email}`}>{email}</a>
            </Button>
          </div>

          <div className="rounded-3xl border border-primary/15 bg-card/20 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
            <p className="text-sm font-medium tracking-tight">Elsewhere</p>
            <ul className="mt-4 flex flex-col gap-2">
              {links.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                    <ArrowUpRight className="size-3.5 opacity-70" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
