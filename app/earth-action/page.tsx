"use client" // クライアントコンポーネントとしてマーク
import Header from "@/components/header"
import Footer from "@/components/footer"
import EarthMainContentArea from "@/components/earth-main-content-area"
import EarthInitiativesSection from "@/components/earth-initiatives-section"
import EarthVideoSection from "@/components/earth-video-section"
import EarthBannerSection from "@/components/earth-banner-section"
import EarthSubPageTransitionSection from "@/components/earth-sub-page-transition-section"
import EarthAdditionalBannerSection from "@/components/earth-additional-banner-section" // 新しいコンポーネントをインポート

export default function EarthActionPage() {
  return (
    <div className="earth-action-page-container flex flex-col min-h-screen">
      <Header />
      <EarthMainContentArea />
      <EarthInitiativesSection />
      <EarthVideoSection />
      <EarthBannerSection />
      <EarthSubPageTransitionSection />
      <EarthAdditionalBannerSection /> {/* 新しいコンポーネントを使用 */}
      <Footer />
    </div>
  )
}
