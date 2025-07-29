"use client"

import type React from "react"

import { ReactLenis } from "@studio-freight/react-lenis"

export function LenisSetup({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
      {children}
    </ReactLenis>
  )
}
