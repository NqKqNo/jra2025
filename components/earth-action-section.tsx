"use client" // クライアントコンポーネントとしてマーク

import Image from "next/image"
import { useEffect, useRef, useCallback } from "react" // useRef, useCallbackを追加
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button" // 修正されたインポート

gsap.registerPlugin(ScrollTrigger)

export default function EarthActionSection() {
  const sectionRef = useRef(null)
  const rightSidebarRef = useRef(null)
  const globeIconContainerRef = useRef(null)
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null) // ScrollTriggerインスタンスを保持するref
  const resizeObserverAnimationFrameId = useRef<number | null>(null) // ResizeObserverのrequestAnimationFrame ID
  const globeAnimationTimeline = useRef<gsap.core.Timeline | null>(null)
  const rightSidebarContentAnimationTimeline = useRef<gsap.core.Timeline | null>(null) // 右サイドバーコンテンツのアニメーションタイムライン

  // sectionsデータをコンポーネント内に直接定義
  const sections = [
    {
      id: 1,
      title: "地球温暖化防止",
      items: [
        {
          image: "/images/太陽光発電システムの運用.png",
          alt: "太陽光パネル",
          text: "太陽光発電システムの運用",
        },
        {
          image: "/images/バイオマス燃焼発電プラントの導入.png",
          alt: "バイオマス発電プラント",
          text: "バイオマス燃焼発電プラントの導入",
        },
        {
          image: "/images/エネルギーコントロールのための監視システム.png",
          alt: "監視システム",
          text: "エネルギーコントロールのための監視システム",
        },
      ],
    },
    {
      id: 2,
      title: "資源循環型社会の構築への貢献",
      items: [
        {
          image: "/images/ペットボトルを調教用ゼッケンへ.png",
          alt: "ペットボトル",
          text: "ペットボトルを調重用ゼッケンへ",
        },
        {
          image: "/images/調教用ゼッケンをさらにリサイクル.png",
          alt: "リサイクルゼッケン",
          text: "調教用ゼッケンをさらにリサイクル",
        },
        {
          image: "/images/雨水の循環型有効活用.png",
          alt: "雨水利用",
          text: "雨水の循環型有効活用",
        },
      ],
    },
  ]

  // ScrollTriggerをリフレッシュまたは作成する関数をメモ化
  const setupScrollTrigger = useCallback(() => {
    if (!sectionRef.current || !rightSidebarRef.current || !globeIconContainerRef.current) return

    const section = sectionRef.current
    const rightSidebar = rightSidebarRef.current
    const globeContainer = globeIconContainerRef.current

    if (scrollTriggerInstance.current) {
      // If already exists, just refresh it
      scrollTriggerInstance.current.refresh()
    } else {
      // Create ScrollTrigger if it doesn't exist
      scrollTriggerInstance.current = ScrollTrigger.create({
        id: "earth-section-pin", // IDを付与して管理しやすくする
        trigger: section,
        start: "top top", // セクションのトップがビューポートのトップに到達したら固定を開始
        // endを関数にして、rightSidebarのスクロール可能な高さに基づいて動的に計算
        end: () => {
          const scrollHeight = rightSidebar.scrollHeight - rightSidebar.clientHeight
          // ビューポートの高さとrightSidebarのスクロール可能な高さの大きい方を使用
          return `+=${Math.max(window.innerHeight, scrollHeight)}`
        },
        pin: true, // セクションを固定
        scrub: "power3.inOut", // これがイージングを制御する設定です
        snap: {
          snapTo: [0, 1], // 開始時(0)と終了時(1)の両方にスナップ
          duration: 0.2, // durationを早くしました
          ease: "power3.inOut",
        },
        onUpdate: (self) => {
          // メインスクロールの進行度に応じてrightSidebarのscrollTopを更新
          // onUpdate内でもscrollHeightを再計算することで、動的なコンテンツ変更に対応
          const currentScrollHeight = rightSidebar.scrollHeight - rightSidebar.clientHeight
          rightSidebar.scrollTop = self.progress * currentScrollHeight
        },
      })

      // Globe icon animation
      if (globeAnimationTimeline.current) {
        globeAnimationTimeline.current.kill()
      }
      const globeTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom", // Start when section enters viewport from bottom
          end: "bottom top", // End when section leaves viewport from top
          scrub: true, // Smoothly scrub animation with scroll
          // markers: true, // Uncomment for debugging scroll trigger positions
        },
      })
      globeTl
        .fromTo(
          globeContainer,
          {
            y: "50vh", // Start from 50vh below its natural top-1/2 position
            x: 100, // Start 100px to the right
            opacity: 0,
          },
          {
            y: 0, // Move to its natural top-1/2 position
            x: 0, // Move to its natural right-[-10px] position
            opacity: 1,
            ease: "power1.out",
            duration: 0.5, // This duration is relative to the ScrollTrigger's total scroll distance
          },
        )
        .to(
          globeContainer,
          {
            y: "-150vh", // Move to 150vh above its natural top-1/2 position
            x: -100, // Move 100px to the left
            opacity: 0,
            ease: "power1.in",
            duration: 0.5, // This duration is relative to the ScrollTrigger's total scroll distance
          },
          ">", // Start this animation immediately after the previous one ends
        )
      globeAnimationTimeline.current = globeTl // Store the timeline instance

      // Right sidebar content animation
      if (rightSidebarContentAnimationTimeline.current) {
        rightSidebarContentAnimationTimeline.current.kill()
      }
      const rightSidebarTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom", // Start when section enters viewport from bottom
          end: "bottom top", // End when section leaves viewport from top
          scrub: true, // Smoothly scrub animation with scroll
        },
      })
      rightSidebarTl
        .fromTo(
          rightSidebar,
          { y: "100vh", opacity: 1 }, // Start off-screen bottom, opacity 1
          { y: "50vh", opacity: 1, ease: "power1.out", duration: 0.5 }, // Move to 50vh down from its natural position, opacity 1
        )
        .to(
          rightSidebar,
          { y: "-100vh", opacity: 1, ease: "power1.in", duration: 0.5 }, // Continue moving up and off-screen top, opacity 1
          ">", // Start this animation immediately after the previous one ends
        )
      rightSidebarContentAnimationTimeline.current = rightSidebarTl // Store the timeline instance
    }
  }, []) // 依存配列は空で、refは安定しているため

  useEffect(() => {
    const rightSidebar = rightSidebarRef.current

    // ResizeObserverを設定し、rightSidebarのコンテンツの高さが変更された場合にScrollTriggerをリフレッシュ
    const observer = new ResizeObserver(() => {
      if (resizeObserverAnimationFrameId.current) {
        cancelAnimationFrame(resizeObserverAnimationFrameId.current)
      }
      resizeObserverAnimationFrameId.current = requestAnimationFrame(() => {
        setupScrollTrigger() // ScrollTriggerをリフレッシュ
        resizeObserverAnimationFrameId.current = null
      })
    })

    if (rightSidebar) {
      observer.observe(rightSidebar)
    }

    // 初期レンダリング時にScrollTriggerを設定
    setupScrollTrigger()

    // コンポーネントアンマウント時のクリーンアップ
    return () => {
      if (scrollTriggerInstance.current) {
        scrollTriggerInstance.current.kill() // このセクションのScrollTriggerをキル
        scrollTriggerInstance.current = null // refをクリア
      }
      if (globeAnimationTimeline.current) {
        globeAnimationTimeline.current.kill()
        globeAnimationTimeline.current = null
      }
      if (rightSidebarContentAnimationTimeline.current) {
        // 新しいタイムラインのクリーンアップ
        rightSidebarContentAnimationTimeline.current.kill()
        rightSidebarContentAnimationTimeline.current = null
      }
      if (rightSidebar) {
        observer.disconnect() // ResizeObserverを解除
      }
      if (resizeObserverAnimationFrameId.current) {
        cancelAnimationFrame(resizeObserverAnimationFrameId.current)
      }
    }
  }, [setupScrollTrigger]) // setupScrollTriggerを依存配列に追加

  return (
    <section
      id="earth-action-section"
      ref={sectionRef} // section要素にrefをアタッチ
      className="relative w-full h-[100vh] bg-[#F1F1F1] overflow-hidden earth-action-section py-0"
    >
      {/* Large background curves - adjust positions to match design */}

      {/* Main content container */}
      <div className="w-full relative z-10 flex flex-col md:flex-row py-10 earth-action-content-container gap-y-0 pl-0 pt-0 pb-0 h-full">
        {/* Left Sidebar "with 地球" section */}
        <div className="left-sidebar-container w-full md:w-[40%] flex justify-center md:justify-start earth-action-sidebar-container items-center text-left md:pt-0 absolute top-0 left-0 h-full">
          <div className="relative h-full flex flex-col items-center justify-center p-4 earth-action-sidebar-inner-wrapper px-0 py-0 w-[85%]">
            {/* Background curve image */}
            <Image
              src="/images/with地球_round.png"
              alt="Background curve"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 z-0 earth-action-background-curve"
            />

            {/* Content: Title, Subtitle, Button */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center ml-[-65px] earth-action-content-wrapper">
              <h2 className="text-[48px] md:text-[64px] leading-[1.2] font-bold text-[#1FA9EA] flex items-baseline justify-center earth-action-title">
                <span className="text-[32px] md:text-[48px] font-semibold leading-normal mr-2 earth-action-title-prefix font-noto-sans-jp">
                  with
                </span>
                地球
              </h2>
              <p className="text-[16px] text-center font-semibold leading-[28px] text-[#1FA9EA] mt-2 earth-action-subtitle">
                JRAの環境保全活動
              </p>
              <Button
                className="mt-8 bg-gradient-to-r from-[#2EAAE4] to-[#50C4F2] text-white rounded-full px-8 py-6 text-[20px] font-bold flex items-center justify-center shadow-lg hover:from-[#50C4F2] hover:to-[#2EAAE4] transition-all duration-300 earth-action-button"
                style={{ minWidth: "280px" }}
              >
                取り組みを見る
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="ml-2 earth-action-button-icon"
                >
                  <ellipse cx="12" cy="12" rx="12" ry="12" transform="rotate(-90 12 12)" fill="white" />
                  <path d="M11 8L15 12L11 16" stroke="#1FA9EA" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Button>
            </div>
          </div>
          {/* Globe icon with line */}
          <div
            className="absolute top-1/2 right-[-10px] z-20 hidden md:block earth-action-globe-icon-container"
            ref={globeIconContainerRef}
          >
            <Image
              src="/images/with地球_iconline.png"
              alt="Globe icon with line"
              width={160}
              height={160}
              className="earth-action-globe-icon"
            />
          </div>
        </div>

        {/* Right content area */}
        <div
          ref={rightSidebarRef} // rightSidebarRefをアタッチ
          className="right-sidebar-container w-full md:w-[60%] mt-10 md:mt-0 earth-action-main-content-area flex flex-col gap-[60px] px-5 mr-0 ml-[40%] h-full overflow-y-auto justify-center py-5"
        >
          {sections.map((section) => (
            <div key={section.id} className="earth-action-section-group">
              <div className="flex items-center mb-6 px-4 md:px-0 earth-action-section-header">
                <div
                  className="w-[88px] h-[52px] flex-shrink-0 rounded-[26px] border border-[#97C6DC] bg-[#F1F6F6] text-[#1FA9EA] flex items-center justify-center text-[30px] leading-[20px] font-light earth-action-section-number-circle"
                  style={{
                    boxShadow: "5px 5px 10px 0px #FFF, -3px -3px 5px 0px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  {section.id}
                </div>
                <h3
                  className="text-[28px] leading-[32px] ml-4 earth-action-section-title font-semibold"
                  style={{
                    background: "linear-gradient(87deg, #2EAAE4 0%, #50C4F2 102.59%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {section.title}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="ml-2 earth-action-section-arrow-icon"
                  style={{ transform: "rotate(0deg)", aspectRatio: "1/1" }}
                >
                  <ellipse cx="12" cy="12" rx="12" ry="12" transform="rotate(-90 12 12)" fill="#1FA9EA" />
                  <path d="M11 8L15 12L11 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0 earth-action-cards-grid">
                {section.items.map((item, itemIndex) =>
                  item.isEmpty ? (
                    <div key={itemIndex} className="hidden lg:block"></div> // Empty div for layout in desktop
                  ) : (
                    <div
                      key={itemIndex}
                      className="rounded-[10px] p-4 flex flex-col items-center text-center overflow-hidden pt-0 pl-0 pr-0 earth-action-card pb-0"
                      style={{
                        background: "rgba(241, 241, 241, 0.60)",
                        boxShadow: "-2px -2px 5px 0px #FFF, 3px 3px 5px 0px rgba(0, 0, 0, 0.10)",
                      }}
                    >
                      <div
                        className="w-full pb-[66.66%] relative overflow-hidden earth-action-card-image-wrapper mb-0"
                        style={{ borderRadius: "10px 10px 0px 0px" }}
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.alt}
                          layout="fill"
                          objectFit="cover"
                          className=""
                        />
                      </div>
                      <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed earth-action-card-text px-6 mt-6 mb-6 text-left">
                        {item.text}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
