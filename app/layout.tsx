import { ClerkProvider } from "@clerk/nextjs"
import { shadcn } from "@clerk/themes"
import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body className="relative min-h-svh">
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-background"
          aria-hidden
        />
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_90%_55%_at_50%_-8%,oklch(0.42_0.18_22/0.45),transparent_58%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_70%_40%_at_100%_80%,oklch(0.35_0.14_25/0.2),transparent_55%)]"
          aria-hidden
        />

        <ClerkProvider
          appearance={{
            baseTheme: shadcn,
          }}
        >
          <ThemeProvider>
            <Navbar />
            <main className="relative z-0 flex min-h-svh flex-col pt-28 pb-16 md:pt-32">
              <div className="flex flex-1 flex-col">{children}</div>
              <Footer />
            </main>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
