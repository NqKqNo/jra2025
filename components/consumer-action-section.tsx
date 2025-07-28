"use client" // クライアントコンポーネントとしてマーク

import Image from "next/image"
import { useEffect, useRef, useCallback } from "react" // useEffectとuseRefをインポート
import { gsap } from "gsap" // gsapをインポート
import { ScrollTrigger } from "gsap/ScrollTrigger" // ScrollTriggerをインポート
import { Button } from "@/components/ui/button" // Buttonをインポート

gsap.registerPlugin(ScrollTrigger) // GSAPプラグインを登録

export default function ConsumerActionSection() {
  const sectionRef = useRef(null)
  const rightSidebarRef = useRef(null)
  const consumerIconContainerRef = useRef(null) // 生活者アイコン用のref
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null) // ScrollTriggerインスタンスを保持するref
  const resizeObserverAnimationFrameId = useRef<number | null>(null) // ResizeObserverのrequestAnimationFrame ID
  const consumerAnimationTimeline = useRef<gsap.core.Timeline | null>(null) // 生活者アイコンのアニメーションタイムライン
  const rightSidebarContentAnimationTimeline = useRef<gsap.core.Timeline | null>(null) // 右サイドバーコンテンツのアニメーションタイムライン

  // sectionsデータをコンポーネント内に直接定義
  const sections = [
    {
      id: 1,
      title: "JRAの馬文化と産業の発展",
      items: [
        {
          image: "/images/馬文化の発展への貢献.png",
          alt: "馬文化の発展への貢献",
          text: "馬文化の発展への貢献",
        },
        {
          image: "/images/馬文化の継承への貢献.png",
          alt: "馬文化の継承への貢献",
          text: "馬文化の継承への貢献",
        },
      ],
    },
    {
      id: 2,
      title: "次世代育成",
      items: [
        {
          image: "/images/キッザニア甲子園「ホースパークパビリオン」出展.png",
          alt: "キッザニア甲子園「ホースパークパビリオン」出展",
          text: "キッザニア甲子園「ホースパークパビリオン」出展",
        },
        {
          image: "/images/全国ポニー競馬選手権「ジョッキーベイビーズ」の開催.png",
          alt: "全国ポニー競馬選手権「ジョッキーベイビーズ」の開催",
          text: "全国ポニー競馬選手権「ジョッキーベイビーズ」の開催",
        },
      ],
    },
  ]

  // ScrollTriggerをリフレッシュまたは作成する関数をメモ化
  const setupScrollTrigger = useCallback(() => {
    if (!sectionRef.current || !rightSidebarRef.current || !consumerIconContainerRef.current) return

    const section = sectionRef.current
    const rightSidebar = rightSidebarRef.current
    const consumerContainer = consumerIconContainerRef.current

    if (scrollTriggerInstance.current) {
      // If already exists, just refresh it
      scrollTriggerInstance.current.refresh()
    } else {
      // Create ScrollTrigger if it doesn't exist
      scrollTriggerInstance.current = ScrollTrigger.create({
        id: "consumer-section-pin", // IDをユニークに
        trigger: section,
        start: "top top", // セクションのトップがビューポートのトップに到達したら固定を開始
        // endを関数にして、rightSidebarのスクロール可能な高さに基づいて動的に計算
        end: () => {
          const scrollHeight = rightSidebar.scrollHeight - rightSidebar.clientHeight
          // ビューポートの高さとrightSidebarのスクロール可能な高さの大きい方を使用
          return `+=${Math.max(window.innerHeight, scrollHeight)}`
        },
        pin: true, // セクションを固定
        scrub: "power3.inOut", // 修正: easeInOutCubicに相当するGSAPイージングを適用
        snap: {
          snapTo: [0, 1], // 開始時(0)と終了時(1)の両方にスナップ
          duration: 0.2, // durationを早くしました
          ease: "power3.inOut",
        },
        onUpdate: (self) => {
          // メインスクロールの進行度に応じてrightSidebarのscrollTopを更新
          const currentScrollHeight = rightSidebar.scrollHeight - rightSidebar.clientHeight
          rightSidebar.scrollTop = self.progress * currentScrollHeight
        },
      })

      // Consumer icon animation
      if (consumerAnimationTimeline.current) {
        consumerAnimationTimeline.current.kill()
      }
      const consumerTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom", // Start when section enters viewport from bottom
          end: "bottom top", // End when section leaves viewport from top
          scrub: true, // Smoothly scrub animation with scroll
        },
      })
      consumerTl
        .fromTo(
          consumerContainer,
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
          consumerContainer,
          {
            y: "-150vh", // Move to 150vh above its natural top-1/2 position
            x: -100, // Move 100px to the left
            opacity: 0,
            ease: "power1.in",
            duration: 0.5, // This duration is relative to the ScrollTrigger's total scroll distance
          },
          ">", // Start this animation immediately after the previous one ends
        )
      consumerAnimationTimeline.current = consumerTl // Store the timeline instance

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
    if (!sectionRef.current || !rightSidebarRef.current) return

    const rightSidebar = rightSidebarRef.current

    // 初期レンダリング時にScrollTriggerを設定
    setupScrollTrigger()

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

    observer.observe(rightSidebar)

    // コンポーネントアンマウント時のクリーンアップ
    return () => {
      if (scrollTriggerInstance.current) {
        scrollTriggerInstance.current.kill() // このセクションのScrollTriggerをキル
        scrollTriggerInstance.current = null // refをクリア
      }
      if (consumerAnimationTimeline.current) {
        consumerAnimationTimeline.current.kill()
        consumerAnimationTimeline.current = null
      }
      if (rightSidebarContentAnimationTimeline.current) {
        // 新しいタイムラインのクリーンアップ
        rightSidebarContentAnimationTimeline.current.kill()
        rightSidebarContentAnimationTimeline.current = null
      }
      observer.disconnect() // ResizeObserverを解除
      if (resizeObserverAnimationFrameId.current) {
        cancelAnimationFrame(resizeObserverAnimationFrameId.current)
      }
    }
  }, [setupScrollTrigger]) // setupScrollTriggerを依存配列に追加

  return (
    <section
      id="consumer-action-section"
      ref={sectionRef} // section要素にrefをアタッチ
      className="relative w-full h-[100vh] consumer-action-section py-0 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F1F1F1 0%, #FFFFFF 100%)" }}
    >
      {/* Large background curves - adjust positions to match design */}

      {/* Main content container */}
      <div className="w-full relative z-10 flex flex-col md:flex-row py-10 consumer-action-content-container gap-y-0 pl-0 pt-0 pb-0 h-full">
        {/* Left Sidebar "with 生活者" section */}
        <div className="left-sidebar-container w-full md:w-[40%] flex justify-center md:justify-start consumer-action-sidebar-container items-center text-left md:pt-0 absolute top-0 left-0 h-full">
          <div className="relative h-full flex flex-col items-center justify-center p-4 consumer-action-sidebar-inner-wrapper px-0 py-0 w-[85%]">
            {/* Background curve image */}
            <Image
              src="/images/with馬_round.png"
              alt="Background curve"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 z-0 consumer-action-background-curve"
            />

            {/* Content: Title, Subtitle, Button */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center ml-[-65px] consumer-action-content-wrapper">
              <h2 className="text-[48px] md:text-[64px] leading-[1.2] font-bold text-[#C86B35] flex items-baseline justify-center consumer-action-title">
                <span className="text-[32px] md:text-[48px] font-semibold leading-normal mr-2 consumer-action-title-prefix font-noto-sans-jp">
                  with
                </span>
                馬
              </h2>
              <p className="text-[16px] text-center font-semibold leading-[28px] text-[#C86B35] mt-2 consumer-action-subtitle">
                JRAの生活者への貢献活動
              </p>
              <Button
                className="mt-8 bg-gradient-to-r from-[#C46126] to-[#E69260] text-white rounded-full px-8 py-6 text-[20px] font-bold flex items-center justify-center shadow-lg hover:from-[#E69260] hover:to-[#C46126] transition-all duration-300 consumer-action-button"
                style={{ minWidth: "280px" }}
              >
                取り組みを見る
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="ml-2 consumer-action-button-icon"
                >
                  <ellipse cx="12" cy="12" rx="12" ry="12" transform="rotate(-90 12 12)" fill="white" />
                  <path d="M11 8L15 12L11 16" stroke="#C86B35" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Button>
            </div>
          </div>
          {/* Consumer icon with line */}
          <div
            className="absolute top-1/2 right-[-10px] z-20 hidden md:block consumer-action-consumer-icon-container"
            ref={consumerIconContainerRef}
          >
            <Image
              src="/images/with馬_iconline.png"
              alt="Consumer icon with line"
              width={160}
              height={160}
              className="consumer-action-consumer-icon"
            />
          </div>
        </div>

        {/* Right content area */}
        <div
          ref={rightSidebarRef} // rightSidebarRefをアタッチ
          className="right-sidebar-container w-full md:w-[60%] mt-10 md:mt-0 consumer-action-main-content-area flex flex-col gap-[60px] px-5 py-5 mr-0 ml-[40%] h-full overflow-y-auto"
        >
          {sections.map((section) => (
            <div key={section.id} className="consumer-action-section-group">
              <div className="flex items-center mb-6 px-4 md:px-0 consumer-action-section-header">
                <div
                  className="w-[88px] h-[52px] flex-shrink-0 rounded-[26px] border border-[#DFB094] bg-[#FDF2EC] text-[#C86B35] flex items-center justify-center text-[30px] leading-[20px] font-light consumer-action-section-number-circle"
                  style={{
                    boxShadow: "5px 5px 10px 0px #FFF, -3px -3px 5px 0px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  {section.id}
                </div>
                <h3
                  className="text-[28px] leading-[32px] ml-4 consumer-action-section-title font-semibold"
                  style={{
                    background: "linear-gradient(45deg, #C46126 0%, #E69260 100%)",
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
                  className="ml-2 consumer-action-section-arrow-icon"
                  style={{ transform: "rotate(0deg)", aspectRatio: "1/1" }}
                >
                  <ellipse cx="12" cy="12" rx="12" ry="12" transform="rotate(-90 12 12)" fill="#C86B35" />
                  <path d="M11 8L15 12L11 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0 consumer-action-cards-grid">
                {section.items.map((item, itemIndex) =>
                  item.isEmpty ? (
                    <div key={itemIndex} className="hidden lg:block"></div> // Empty div for layout in desktop
                  ) : (
                    <div
                      key={itemIndex}
                      className="rounded-[10px] p-4 flex flex-col items-center text-center overflow-hidden pt-0 pl-0 pr-0 consumer-action-card pb-0"
                      style={{
                        background: "rgba(241, 241, 241, 0.60)",
                        boxShadow: "-2px -2px 5px 0px #FFF, 3px 3px 5px 0px rgba(0, 0, 0, 0.10)",
                      }}
                    >
                      <div
                        className="w-full pb-[66.66%] relative overflow-hidden consumer-action-card-image-wrapper mb-0"
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
                      <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed consumer-action-card-text px-6 mt-6 mb-6 text-left">
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
