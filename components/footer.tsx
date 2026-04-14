import Link from "next/link"

import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Footer() {
  const navigation = [
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const social = [
    { name: "X", href: "https://x.com/ausrobdev" },
    { name: "LinkedIn", href: "#" },
  ]

  const legal = [{ name: "Privacy", href: "/privacy" }]

  return (
    <footer className="mt-auto flex flex-col items-center gap-14 pt-20 lg:pt-28">
      <div className="container max-w-2xl space-y-4 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-4xl">
          Step into the Lounge
        </h2>
        <p className="text-muted-foreground mx-auto max-w-lg text-pretty leading-relaxed">
          The public home of AWFixer — projects, updates, and a place to connect.
          Crimson on black, built to feel like a room worth staying in.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button size="lg" className="rounded-full px-8" asChild>
            <Link href="/contact">Get in touch</Link>
          </Button>
          <Button variant="glass" size="lg" className="rounded-full px-8" asChild>
            <Link href="/about">About AWFixer</Link>
          </Button>
        </div>
      </div>

      <nav className="container flex max-w-3xl flex-col items-center gap-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-sm font-medium transition-opacity hover:opacity-80"
              >
                {item.name}
              </Link>
            </li>
          ))}
          {social.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-0.5 text-sm font-medium transition-opacity hover:opacity-80"
              >
                {item.name} <ArrowUpRight className="size-3.5 opacity-70" />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {legal.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-muted-foreground text-sm transition-opacity hover:opacity-80"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-primary/15 bg-card/30 w-full max-w-4xl rounded-[2rem] border px-8 py-10 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
        <p className="text-primary font-semibold tracking-tight md:text-2xl">
          AWFixer&apos;s Lounge
        </p>
        <p className="text-muted-foreground mt-2 text-sm">
          © {new Date().getFullYear()} AWFixer. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
