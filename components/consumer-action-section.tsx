"use client" // クライアントコンポーネントとしてマーク

import Image from "next/image"
import { useEffect, useRef, useCallback } from "react" // useEffectとuseRefをインポート
import { ScrollTrigger } from "gsap/ScrollTrigger" // ScrollTriggerをインポート

export default function ConsumerActionSection() {
  const sectionRef = useRef(null)
  const rightSidebarRef = useRef(null)
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null) // ScrollTriggerインスタンスを保持するref
  const resizeObserverAnimationFrameId = useRef<number | null>(null) // ResizeObserverのrequestAnimationFrame ID

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
    if (!sectionRef.current || !rightSidebarRef.current) return

    const section = sectionRef.current
    const rightSidebar = rightSidebarRef.current

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
          <div className="relative w-full h-full flex justify-center p-4 consumer-action-sidebar-inner-wrapper px-0 py-0 items-start flex-row">
            <Image src="/images/with馬_left.png" alt="with 馬 馬との共生" layout="fill" objectFit="cover" priority />
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
