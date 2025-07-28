import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import BannerSection from "@/components/banner-section"
import NewsSection from "@/components/news-section"
import BeWithHeroSection from "@/components/be-with-hero-section"
import SocialSustainabilityActionTitleSection from "@/components/social-sustainability-action-title-section"
import EarthActionSection from "@/components/earth-action-section"
import LifeActionSection from "@/components/life-action-section"
import SocietyActionSection from "@/components/society-action-section"
import ConsumerActionSection from "@/components/consumer-action-section"
import ReportSection from "@/components/report-section"
import CmGallerySection from "@/components/cm-gallery-section" // 新しいコンポーネントをインポート
import Footer from "@/components/footer"

export default function Page() {
  return (
    <div>
      <Header />
      <HeroSection />
      <BannerSection />
      <NewsSection />
      <BeWithHeroSection />
      <SocialSustainabilityActionTitleSection />
      <EarthActionSection className="action-section" />
      <LifeActionSection className="action-section" />
      <SocietyActionSection className="action-section" />
      <ConsumerActionSection className="action-section" />
      <ReportSection />
      <CmGallerySection /> {/* 新しいセクションを追加 */}
      <Footer />
    </div>
  )
}
