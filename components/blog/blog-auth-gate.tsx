"use client"

import { Show, SignInButton, SignUpButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

type BlogAuthGateProps = {
  children: React.ReactNode
}

export function BlogAuthGate({ children }: BlogAuthGateProps) {
  return (
    <>
      <Show when="signed-in">{children}</Show>
      <Show when="signed-out">
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center md:py-32">
          <p className="text-primary mb-3 text-sm font-medium tracking-wide uppercase">
            Members only
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            Sign in to read the blog
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-md text-pretty leading-relaxed">
            The Lounge is for signed-in members.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
        </div>
      </Show>
    </>
  )
}
