"use client" // クライアントコンポーネントとしてマーク

import Image from "next/image"
import { useEffect, useRef, useCallback } from "react" // useEffectとuseRefをインポート
import { ScrollTrigger } from "gsap/ScrollTrigger" // ScrollTriggerをインポート

export default function LifeActionSection() {
  const sectionRef = useRef(null)
  const rightSidebarRef = useRef(null)
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null) // ScrollTriggerインスタンスを保持するref
  const resizeObserverAnimationFrameId = useRef<number | null>(null) // ResizeObserverのrequestAnimationFrame ID

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
    if (!sectionRef.current || !rightSidebarRef.current) return

    const section = sectionRef.current
    const rightSidebar = rightSidebarRef.current

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
          return `+=${scrollHeight}` // rightSidebarのスクロール可能な高さ分だけ固定を継続
        },
        pin: true, // セクションを固定
        scrub: "power3.inOut", // 修正: easeInOutCubicに相当するGSAPイージングを適用
        snap: {
          snapTo: 1,
          duration: 0.5,
          ease: "power3.inOut",
        },
        onUpdate: (self) => {
          // メインスクロールの進行度に応じてrightSidebarのscrollTopを更新
          const currentScrollHeight = rightSidebar.scrollHeight - rightSidebar.clientHeight
          rightSidebar.scrollTop = self.progress * currentScrollHeight
        },
        // markers: true, // デバッグ用マーカーを無効化
      })
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
          <div className="relative w-full h-full flex justify-center p-4 life-action-sidebar-inner-wrapper px-0 py-0 items-start flex-row">
            <Image
              src="/images/with生命_left.png"
              alt="with 生命 JRAの畜産振興支援 / 馬との共生"
              layout="fill"
              objectFit="cover"
              priority
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
