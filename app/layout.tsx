import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import LenisSetup from "@/components/lenis-setup"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JRA",
  description: "JRA Figma Page Scraping",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LenisSetup />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
