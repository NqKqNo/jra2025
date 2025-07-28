"use client" // クライアントコンポーネントとしてマーク

import Image from "next/image"
import { useEffect, useRef, useCallback } from "react" // useEffectとuseRefをインポート
import { gsap } from "gsap" // gsapをインポート
import { ScrollTrigger } from "gsap/ScrollTrigger" // ScrollTriggerをインポート
import { Button } from "@/components/ui/button" // Buttonをインポート

gsap.registerPlugin(ScrollTrigger) // GSAPプラグインを登録

export default function LifeActionSection() {
  const sectionRef = useRef(null)
  const rightSidebarRef = useRef(null)
  const lifeIconContainerRef = useRef(null) // 生命アイコン用のref
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null) // ScrollTriggerインスタンスを保持するref
  const resizeObserverAnimationFrameId = useRef<number | null>(null) // ResizeObserverのrequestAnimationFrame ID
  const lifeAnimationTimeline = useRef<gsap.core.Timeline | null>(null) // 生命アイコンのアニメーションタイムライン
  const rightSidebarContentAnimationTimeline = useRef<gsap.core.Timeline | null>(null) // 右サイドバーコンテンツのアニメーションタイムライン

  // sectionsデータをコンポーネント内に直接定義
  const sections = [
    {
      id: 1,
      title: "国庫納付金について",
      items: [
        {
          image: "/images/国庫納付金の内訳について.png",
          alt: "国庫納付金の内訳について",
          text: "国庫納付金の内訳について",
          isChart: true, // チャート用のフラグを追加
        },
      ],
    },
    {
      id: 2,
      title: "畜産振興を支える活動",
      items: [
        {
          image: "/images/地元行政や公共交通機関への支援.png",
          alt: "地元行政や公共交通機関への支援",
          text: "地元行政や公共交通機関への支援",
        },
        {
          image: "/images/災害時の一時避難場所や備蓄品の提供.png",
          alt: "災害時の一時避難場所や備蓄品の提供",
          text: "災害時の一時避難場所や備蓄品の提供",
        },
        {
          image: "/images/医療機関や教育機関への備品贈呈.png",
          alt: "医療機関や教育機関への備品贈呈",
          text: "医療機関や教育機関への備品贈呈",
        },
      ],
    },
  ]

  // ScrollTriggerをリフレッシュまたは作成する関数をメモ化
  const setupScrollTrigger = useCallback(() => {
    if (!sectionRef.current || !rightSidebarRef.current || !lifeIconContainerRef.current) return

    const section = sectionRef.current
    const rightSidebar = rightSidebarRef.current
    const lifeContainer = lifeIconContainerRef.current

    if (scrollTriggerInstance.current) {
      // If already exists, just refresh it
      scrollTriggerInstance.current.refresh()
    } else {
      // Create ScrollTrigger if it doesn't exist
      scrollTriggerInstance.current = ScrollTrigger.create({
        id: "life-section-pin", // IDをユニークに
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

      // Life icon animation
      if (lifeAnimationTimeline.current) {
        lifeAnimationTimeline.current.kill()
      }
      const lifeTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom", // Start when section enters viewport from bottom
          end: "bottom top", // End when section leaves viewport from top
          scrub: true, // Smoothly scrub animation with scroll
          // markers: true, // Uncomment for debugging scroll trigger positions
        },
      })
      lifeTl
        .fromTo(
          lifeContainer,
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
          lifeContainer,
          {
            y: "-150vh", // Move to 150vh above its natural top-1/2 position
            x: -100, // Move 100px to the left
            opacity: 0,
            ease: "power1.in",
            duration: 0.5, // This duration is relative to the ScrollTrigger's total scroll distance
          },
          ">", // Start this animation immediately after the previous one ends
        )
      lifeAnimationTimeline.current = lifeTl // Store the timeline instance

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
      if (lifeAnimationTimeline.current) {
        lifeAnimationTimeline.current.kill()
        lifeAnimationTimeline.current = null
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
      id="life-action-section"
      ref={sectionRef} // section要素にrefをアタッチ
      className="relative w-full h-[100vh] bg-[#F1F1F1] overflow-hidden life-action-section py-0"
    >
      {/* Large background curves - adjust positions to match design */}

      {/* Main content container */}
      <div className="w-full relative z-10 flex flex-col md:flex-row py-10 life-action-content-container gap-y-0 pl-0 pb-0 pt-0 h-full">
        {/* Left Sidebar "with 生命" section */}
        <div className="left-sidebar-container w-full md:w-[40%] flex justify-center md:justify-start life-action-sidebar-container items-center text-left md:pt-0 absolute top-0 left-0 h-full">
          <div className="relative h-full flex flex-col items-center justify-center p-4 life-action-sidebar-inner-wrapper px-0 py-0 w-[85%]">
            {/* Background curve image */}
            <Image
              src="/images/with生命_round.png"
              alt="Background curve"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 z-0 life-action-background-curve"
            />

            {/* Content: Title, Subtitle, Button */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center ml-[-65px] life-action-content-wrapper">
              <h2 className="text-[48px] md:text-[64px] leading-[1.2] font-bold text-[#FB6E8E] flex items-baseline justify-center life-action-title">
                <span className="text-[32px] md:text-[48px] font-semibold leading-normal mr-2 life-action-title-prefix font-noto-sans-jp">
                  with
                </span>
                生命
              </h2>
              <p className="text-[16px] text-center font-semibold leading-[28px] text-[#FB6E8E] mt-2 life-action-subtitle">
                JRAの畜産振興支援 / 馬との共生
              </p>
              <Button
                className="mt-8 bg-gradient-to-r from-[#FB789A] to-[#FFA5A6] text-white rounded-full px-8 py-6 text-[20px] font-bold flex items-center justify-center shadow-lg hover:from-[#FFA5A6] hover:to-[#FB789A] transition-all duration-300 life-action-button"
                style={{ minWidth: "280px" }}
              >
                取り組みを見る
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="ml-2 life-action-button-icon"
                >
                  <ellipse cx="12" cy="12" rx="12" ry="12" transform="rotate(-90 12 12)" fill="white" />
                  <path d="M11 8L15 12L11 16" stroke="#FB6E8E" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </Button>
            </div>
          </div>
          {/* Life icon with line */}
          <div
            className="absolute top-1/2 right-[-10px] z-20 hidden md:block life-action-life-icon-container"
            ref={lifeIconContainerRef}
          >
            <Image
              src="/images/with生命_iconline.png"
              alt="Life icon with line"
              width={160}
              height={160}
              className="life-action-life-icon"
            />
          </div>
        </div>

        {/* Right content area */}
        <div
          ref={rightSidebarRef} // rightSidebarRefをアタッチ
          className="right-sidebar-container w-full md:w-[60%] mt-10 md:mt-0 life-action-main-content-area flex flex-col gap-[60px] py-5 px-5 mr-0 ml-[40%] h-full overflow-y-auto"
        >
          {sections.map((section) => (
            <div key={section.id} className="life-action-section-group">
              <div className="flex items-center mb-6 px-4 md:px-0 life-action-section-header">
                <div
                  className="w-[88px] h-[52px] flex-shrink-0 rounded-[26px] border border-[#E9B4C2] bg-[#FFF8FA] text-[#FB6E8E] flex items-center justify-center text-[30px] leading-[20px] font-light life-action-section-number-circle"
                  style={{
                    boxShadow: "5px 5px 10px 0px #FFF, -3px -3px 5px 0px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  {section.id}
                </div>
                <h3
                  className="text-[28px] leading-[32px] ml-4 life-action-section-title font-semibold"
                  style={{
                    background: "linear-gradient(45deg, #FB789A 0%, #FFA5A6 100%)",
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
                  className="ml-2 life-action-section-arrow-icon"
                  style={{ transform: "rotate(0deg)", aspectRatio: "1/1" }}
                >
                  <ellipse cx="12" cy="12" rx="12" ry="12" transform="rotate(-90 12 12)" fill="#FB6E8E" />
                  <path d="M11 8L15 12L11 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0 life-action-cards-grid">
                {section.items.map((item, itemIndex) =>
                  item.isEmpty ? (
                    <div key={itemIndex} className="hidden lg:block"></div> // Empty div for layout in desktop
                  ) : item.isChart ? (
                    // Figmaデザインに基づく特別なチャートレイアウト
                    <div
                      key={itemIndex}
                      className="col-span-full rounded-[10px] overflow-hidden life-action-chart-container flex-shrink-0"
                      style={{
                        width: "569px",
                        height: "auto",
                        background: "rgba(241, 241, 241, 0.60)",
                        boxShadow: "-2px -2px 5px 0px #FFF, 3px 3px 5px 0px rgba(0, 0, 0, 0.10)",
                      }}
                    >
                      {/* 上部のフラクション表示エリア */}
                      <div
                        className="h-[120px] relative overflow-hidden ml-6 mr-6 mt-6"
                        style={{ borderRadius: "0px" }}
                      >
                        <Image
                          src="/images/国庫納付金の内訳について.png"
                          alt="国庫納付金の内訳について - 3/4畜産復興、2/4社会福祉"
                          layout="fill"
                          objectFit="cover"
                          className=""
                        />
                      </div>

                      {/* 下部のタイトルエリア */}
                      <div className="p-6">
                        <h4
                          className="text-[16px] text-[#333333] leading-[26px] font-normal"
                          style={{ fontFamily: '"Noto Sans JP"' }}
                        >
                          {item.text}
                        </h4>
                      </div>
                    </div>
                  ) : (
                    // 通常のカードレイアウト
                    <div
                      key={itemIndex}
                      className="rounded-[10px] p-4 flex flex-col justify-between items-stretch text-center overflow-hidden pt-0 pl-0 pr-0 life-action-card pb-0"
                      style={{
                        background: "rgba(241, 241, 241, 0.60)",
                        boxShadow: "-2px -2px 5px 0px #FFF, 3px 3px 5px 0px rgba(0, 0, 0, 0.10)",
                      }}
                    >
                      <div
                        className="w-full pb-[66.66%] relative overflow-hidden life-action-card-image-wrapper mb-0"
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
                      <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed life-action-card-text px-6 mt-6 mb-6 text-left">
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
