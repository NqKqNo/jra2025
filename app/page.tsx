"use client" // クライアントコンポーネントとしてマーク

import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import BannerSection from "@/components/banner-section"
import NewsSection from "@/components/news-section"
import BeWithHeroSection from "@/components/be-with-hero-section"
import SocialSustainabilityActionTitleSection from "@/components/social-sustainability-action-title-section"
import ActionSection from "@/components/action-section"
import EarthActionSection from "@/components/earth-action-section"
import LifeActionSection from "@/components/life-action-section"
import SocietyActionSection from "@/components/society-action-section"
import ConsumerActionSection from "@/components/consumer-action-section"
import ReportSection from "@/components/report-section"
import CmGallerySection from "@/components/cm-gallery-section"
import Footer from "@/components/footer"
import { useEffect, useRef, useState, useLayoutEffect } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Page() {
  const headerRef = useRef<HTMLElement>(null)
  const [headerHeight, setHeaderHeight] = useState(143) // 推定されるヘッダーの高さ (px)
  const animationFrameId = useRef<number | null>(null)
  const currentHeaderHeightRef = useRef(headerHeight) // 最新のheaderHeightを保持するためのref
  const scrollTriggerRefreshTimeoutId = useRef<NodeJS.Timeout | null>(null) // ScrollTrigger refresh debounce ID

  // headerHeightが変更されるたびにlatestHeaderHeight.currentを更新
  useEffect(() => {
    currentHeaderHeightRef.current = headerHeight
  }, [headerHeight])

  useLayoutEffect(() => {
    if (!headerRef.current) return

    // 初期高さを設定し、ScrollTriggerをリフレッシュ
    const initialHeight = headerRef.current.offsetHeight
    if (initialHeight !== currentHeaderHeightRef.current) {
      // 初期値と実際の高さが異なる場合のみ更新
      setHeaderHeight(initialHeight)
    } else {
      // 高さが同じでも、初期ロード時にScrollTriggerをリフレッシュ
      // ここでのrefreshはResizeObserverのループを引き起こす可能性が低い
      ScrollTrigger.refresh()
    }

    const observer = new ResizeObserver((entries) => {
      // 既存のrequestAnimationFrameがあればキャンセルし、新しいものをスケジュール
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }

      animationFrameId.current = requestAnimationFrame(() => {
        if (!entries || entries.length === 0 || !headerRef.current) return

        const newHeight = headerRef.current.offsetHeight // 最新のDOMから高さを再取得
        // 現在の状態と比較し、変更があった場合のみ更新
        if (currentHeaderHeightRef.current !== newHeight) {
          setHeaderHeight(newHeight)
        }
        animationFrameId.current = null // 実行後にIDをクリア
      })
    })

    observer.observe(headerRef.current)

    return () => {
      observer.disconnect()
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      // コンポーネントアンマウント時にもScrollTriggerをリフレッシュ
      ScrollTrigger.refresh()
    }
  }, []) // 空の依存配列により、マウント時に一度だけ実行

  // headerHeightが変更されるたびにScrollTriggerをリフレッシュ
  // これにより、headerHeightの変更が確定した後にGSAPがDOMの状態を再計算する
  useEffect(() => {
    // ResizeObserver loop completed with undelivered notifications. エラー対策
    // ScrollTrigger.refresh() を requestAnimationFrame でラップして、
    // レイアウトの変更が完了した後に実行されるようにする
    if (scrollTriggerRefreshTimeoutId.current) {
      clearTimeout(scrollTriggerRefreshTimeoutId.current)
    }
    scrollTriggerRefreshTimeoutId.current = setTimeout(() => {
      ScrollTrigger.refresh()
      scrollTriggerRefreshTimeoutId.current = null
    }, 50) // 短い遅延でデバウンス

    return () => {
      if (scrollTriggerRefreshTimeoutId.current) {
        clearTimeout(scrollTriggerRefreshTimeoutId.current)
      }
    }
  }, [headerHeight])

  return (
    <>
      <Header ref={headerRef} />
      {/* すべてのコンテンツをヘッダーの高さ分のパディングを持つdivでラップ */}
      <div style={{ paddingTop: `${headerHeight}px` }}>
        <HeroSection headerHeight={headerHeight} />
        <BannerSection />
        <NewsSection />
        <BeWithHeroSection />
        <SocialSustainabilityActionTitleSection />
        <ActionSection />
        <EarthActionSection className="action-section" />
        <LifeActionSection className="action-section" />
        <SocietyActionSection className="action-section" />
        <ConsumerActionSection className="action-section" />
        <ReportSection />
        <CmGallerySection />
        <Footer />
      </div>
    </>
  )
}
