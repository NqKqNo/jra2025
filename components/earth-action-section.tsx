"use client" // クライアントコンポーネントとしてマーク

import Image from "next/image"
import { useEffect, useRef, useCallback } from "react" // useRef, useCallbackを追加
import { gsap } from "gsap" // GSAPをインポート
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function EarthActionSection() {
  const sectionRef = useRef(null)
  const rightSidebarRef = useRef(null)
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null) // ScrollTriggerインスタンスを保持するref
  const resizeObserverAnimationFrameId = useRef<number | null>(null) // ResizeObserverのrequestAnimationFrame ID

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
    if (!sectionRef.current || !rightSidebarRef.current) return

    const section = sectionRef.current
    const rightSidebar = rightSidebarRef.current

    // 既存のScrollTriggerインスタンスをキルしてクリーンアップ
    if (scrollTriggerInstance.current) {
      scrollTriggerInstance.current.kill() // このセクションのScrollTriggerをキル
      scrollTriggerInstance.current = null // refをクリア
    }

    gsap.killTweensOf(rightSidebar) // 右サイドバーの既存のアニメーションを全て停止

    // 初期位置を画面下部に設定
    gsap.set(rightSidebar, { y: "100vh" })

    // ScrollTriggerを登録 (一度だけ実行されるように)
    gsap.registerPlugin(ScrollTrigger)

    // メインのScrollTrigger（セクションのピン留めを制御）
    scrollTriggerInstance.current = ScrollTrigger.create({
      id: "earth-section-pin", // IDを付与して管理しやすくする
      trigger: section,
      start: "top top", // セクションのトップがビューポートのトップに到達したら固定を開始
      end: "300vh", // rightSidebarのスクロール可能な高さ分だけ固定を継続
      pin: true, // セクションを固定
      scrub: true, // スクロール位置とアニメーションの進行度を滑らかに連動
      snap: {
        snapTo: [0, 1], // スナップポイントを0（開始）と1（終了）に設定
        duration: 0.2, // スナップアニメーションの持続時間
        ease: "power3.inOut", // スナップアニメーションのイージング
      },
      // onUpdateを削除またはコメントアウト。yアニメーションがスクロールを制御するため
      // onUpdate: (self) => {
      //   const currentScrollHeight = rightSidebar.scrollHeight - rightSidebar.clientHeight
      //   rightSidebar.scrollTop = self.progress * currentScrollHeight
      // },
    })

    // rightSidebarのy位置をアニメーションさせるタイムライン
    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "300vh",
          scrub: true,
        },
      })
      .to(rightSidebar, {
        y: "50vh", // スクロール中間点でyを50vhに
        ease: "power3.inOut",
        duration: 0.5, // タイムラインの相対的な期間
      })
      .to(rightSidebar, {
        y: "-100vh", // スクロール終了時点でyを-100vhに
        ease: "power3.inOut",
        duration: 0.5, // タイムラインの相対的な期間
      })
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
      id="earth-action-section"
      ref={sectionRef} // section要素にrefをアタッチ
      className="relative w-full h-[100vh] bg-[#F1F1F1] overflow-hidden earth-action-section py-0"
    >
      {/* Large background curves - adjust positions to match design */}

      {/* Main content container */}
      <div className="w-full relative z-10 flex flex-col md:flex-row py-10 earth-action-content-container gap-y-0 pl-0 pt-0 pb-0 h-full">
        {/* Left Sidebar "with 地球" section */}
        <div className="left-sidebar-container w-[40%] flex justify-center md:justify-start earth-action-sidebar-container items-center text-left md:pt-0 absolute top-0 left-0 h-full">
          <div className="relative w-full h-full flex p-4 earth-action-sidebar-inner-wrapper px-0 py-0 items-start flex-row">
            <Image
              src="/images/with地球_left.png"
              alt="with 地球 JRAの環境保全活動"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>

        {/* Right content area */}
        <div
          ref={rightSidebarRef} // rightSidebarRefをアタッチ
          className="right-sidebar-container w-full md:w-[60%] mt-10 md:mt-0 earth-action-main-content-area flex flex-col gap-[60px] px-5 mr-0 ml-[40%] h-full overflow-hidden justify-center py-5" // overflow-y-autoをoverflow-hiddenに変更
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
