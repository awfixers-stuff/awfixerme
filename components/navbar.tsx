"use client"

import { useState } from "react"

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { ChevronRight } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const ITEMS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="flex justify-center px-4 pt-5 md:px-6 md:pt-8">
      <section
        className={cn(
          "border-primary/20 bg-card/35 z-50 w-full max-w-3xl rounded-[2rem] border shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-all duration-300",
          "supports-[backdrop-filter]:bg-card/25",
        )}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="group flex min-w-0 shrink flex-col gap-0.5 leading-tight"
          >
            <span className="text-primary font-semibold tracking-tight">
              AWFixer&apos;s Lounge
            </span>
            <span className="text-muted-foreground hidden text-xs font-normal tracking-wide uppercase sm:block">
              by AWFixer
            </span>
          </Link>

          <NavigationMenu className="max-lg:hidden">
            <NavigationMenuList className="gap-1">
              {ITEMS.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/8",
                        pathname === link.href && "text-primary bg-white/6",
                      )}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <Show when="signed-out">
              <div className="max-lg:hidden flex items-center gap-2">
                <SignInButton mode="modal">
                  <Button variant="glass" size="sm" className="rounded-full">
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    size="sm"
                    className="rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]"
                  >
                    Join
                  </Button>
                </SignUpButton>
              </div>
            </Show>
            <Show when="signed-in">
              <div className="max-lg:hidden">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "size-9 rounded-full ring-2 ring-primary/35 ring-offset-2 ring-offset-background",
                    },
                  }}
                />
              </div>
            </Show>

            <button
              type="button"
              className="text-muted-foreground relative flex size-9 items-center justify-center rounded-full lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative block w-[18px]">
                <span
                  aria-hidden
                  className={cn(
                    "absolute block h-0.5 w-full rounded-full bg-current transition duration-300 ease-out",
                    isMenuOpen ? "top-0 rotate-45" : "-top-1.5",
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-0 block h-0.5 w-full rounded-full bg-current transition duration-300 ease-out",
                    isMenuOpen ? "opacity-0" : "opacity-100",
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute block h-0.5 w-full rounded-full bg-current transition duration-300 ease-out",
                    isMenuOpen ? "top-0 -rotate-45" : "top-1.5",
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={cn(
            "border-primary/15 bg-card/90 mx-2 mb-2 flex flex-col rounded-[1.35rem] border backdrop-blur-xl transition-all duration-300 ease-out lg:hidden",
            isMenuOpen
              ? "max-h-[min(70vh,420px)] opacity-100"
              : "pointer-events-none max-h-0 overflow-hidden border-transparent opacity-0",
          )}
        >
          <nav className="divide-border flex flex-1 flex-col divide-y px-4 py-2">
            {ITEMS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-foreground hover:text-primary flex items-center justify-between py-3.5 text-base font-medium transition-colors",
                  pathname === link.href && "text-primary",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
                <ChevronRight className="text-muted-foreground size-4" />
              </Link>
            ))}
            <Show when="signed-out">
              <div className="flex flex-col gap-2 py-4">
                <SignInButton mode="modal">
                  <Button variant="glass" className="w-full rounded-full">
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="w-full rounded-full">Join the Lounge</Button>
                </SignUpButton>
              </div>
            </Show>
            <Show when="signed-in">
              <div className="flex items-center justify-center py-4">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "size-10 rounded-full ring-2 ring-primary/35 ring-offset-2 ring-offset-background",
                    },
                  }}
                />
              </div>
            </Show>
          </nav>
        </div>
      </section>
    </header>
  )
}
