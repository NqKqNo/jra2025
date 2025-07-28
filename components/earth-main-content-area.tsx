"use client" // クライアントコンポーネントとしてマーク

import EarthBackground from "@/components/earth-background"
import EarthTopLogoSection from "@/components/earth-top-logo-section"
import EarthMainContentSection from "@/components/earth-main-content-section"

export default function EarthMainContentArea() {
  return (
    <main className="earth-action-main relative flex-1 bg-[#F1F1F1] overflow-hidden">
      <EarthBackground />
      <EarthTopLogoSection />
      <EarthMainContentSection />
    </main>
  )
}
