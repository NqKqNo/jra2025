"use client" // クライアントコンポーネントとしてマーク

import Image from "next/image"
import { useEffect, useRef, useCallback } from "react" // useEffectとuseRefをインポート
import { gsap } from "gsap" // GSAPをインポート
import { ScrollTrigger } from "gsap/ScrollTrigger" // ScrollTriggerをインポート

export default function SocietyActionSection() {
  const sectionRef = useRef(null)
  const rightSidebarRef = useRef(null)
  const innerContentRef = useRef(null) // アニメーション対象のコンテンツ用ref
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null) // ScrollTriggerインスタンスを保持するref
  const resizeObserverAnimationFrameId = useRef<number | null>(null) // ResizeObserverのrequestAnimationFrame ID

  // sectionsデータをコンポーネント内に直接定義
  const sections = [
    {
      id: 1,
      title: "社会福祉金",
      items: [
        {
          image: "/images/社会福祉金の内訳について.png",
          alt: "社会福祉金の内訳について",
          text: "社会福祉金の内訳について",
          isChart: true, // Add chart flag for special layout
        },
      ],
    },
    {
      id: 2,
      title: "地域社会への貢献活動",
      items: [
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
        {
          image: "/images/地元行政や公共交通機関への支援.png",
          alt: "地元行政や公共交通機関への支援",
          text: "地元行政や公共交通機関への支援",
        },
      ],
    },
  ]

  // ScrollTriggerをリフレッシュまたは作成する関数をメモ化
  const setupScrollTrigger = useCallback(() => {
    if (!sectionRef.current || !rightSidebarRef.current || !innerContentRef.current) return

    const section = sectionRef.current
    const rightSidebar = rightSidebarRef.current
    const innerContent = innerContentRef.current

    // 既存のScrollTriggerインスタンスをキルしてクリーンアップ
    if (scrollTriggerInstance.current) {
      scrollTriggerInstance.current.kill()
      scrollTriggerInstance.current = null
    }
    // innerContentに対する既存のTweenもキルして競合を防ぐ
    gsap.killTweensOf(innerContent)

    // ScrollTriggerを登録 (一度だけ実行されるように)
    gsap.registerPlugin(ScrollTrigger)

    // innerContentの初期位置を画面下部に設定
    gsap.set(innerContent, { y: "100vh" })

    // アニメーション用のタイムラインを作成
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "society-section-pin-and-scroll", // IDをユニークに
        trigger: section,
        start: "top top", // セクションのトップがビューポートのトップに到達したら固定を開始
        end: "300vh", // rightSidebarのスクロール可能な高さ分だけ固定を継続
        pin: true, // セクションを固定
        scrub: true, // 修正: easeInOutCubicに相当するGSAPイージングを適用
        snap: {
          snapTo: [0, 1], // スナップポイントを0（開始）と1（終了）に設定
          duration: 0.2, // スナップアニメーションの持続時間
          ease: "power3.inOut", // スナップアニメーションのイージング
        },
        onLeave: () => {
          // トリガー領域を離れる際にアニメーションが完了するようにする
          gsap.to(innerContent, { y: "-100vh", duration: 0.5, ease: "power3.out" })
        },
        onEnterBack: () => {
          // 下から再入場する際にアニメーションが正しく開始するようにする
          gsap.set(innerContent, { y: "100vh" })
        },
      },
    })

    // yアニメーションをタイムラインに追加
    tl.to(innerContent, {
      y: "-100vh", // 100vh (初期設定) から -100vh へアニメーション
      ease: "none", // 一貫したスクロールのために線形移動
    })

    // ScrollTriggerインスタンスを保存
    scrollTriggerInstance.current = tl.scrollTrigger
  }, []) // 依存配列は空で、refは安定しているため

  useEffect(() => {
    if (!sectionRef.current || !rightSidebarRef.current || !innerContentRef.current) return

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
      id="society-action-section"
      ref={sectionRef} // section要素にrefをアタッチ
      className="relative w-full h-[100vh] bg-[#F1F1F1] overflow-hidden society-action-section py-0"
    >
      {/* Large background curves - adjust positions to match design */}

      {/* Main content container */}
      <div className="w-full relative z-10 flex flex-col md:flex-row py-10 society-action-content-container gap-y-0 pl-0 pt-0 pb-0 h-full">
        {/* Left Sidebar "with 社会" section */}
        <div className="left-sidebar-container w-[40%] flex justify-center md:justify-start society-action-sidebar-container items-center text-left md:pt-0 absolute top-0 left-0 h-full">
          <div className="relative w-full h-full flex justify-center p-4 society-action-sidebar-inner-wrapper px-0 py-0 items-start flex-row">
            <Image
              src="/images/with社会_left.png"
              alt="with 社会 JRAの社会貢献活動"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>

        {/* Right content area */}
        <div
          ref={rightSidebarRef} // rightSidebarRefをアタッチ
          className="right-sidebar-container w-full md:w-[60%] mt-10 md:mt-0 society-action-main-content-area flex flex-col mr-0 ml-[40%] h-full" // overflow-y-autoを削除
        >
          <div ref={innerContentRef} className="flex flex-col gap-[60px] px-5 py-5">
            {sections.map((sectionData, sectionIndex) =>
              sectionData.items.map((item, itemIndex) =>
                item.isEmpty ? (
                  <div key={itemIndex} className="hidden lg:block"></div>
                ) : item.isChart ? (
                  // Special chart layout for social welfare funds
                  <div
                    key={itemIndex}
                    className="col-span-full rounded-[10px] overflow-hidden society-action-chart-container flex-shrink-0"
                    style={{
                      width: "569px",
                      height: "auto",
                      background: "rgba(241, 241, 241, 0.60)",
                      boxShadow: "-2px -2px 5px 0px #FFF, 3px 3px 5px 0px rgba(0, 0, 0, 0.10)",
                    }}
                  >
                    {/* Chart display area */}
                    <div className="h-[120px] relative overflow-hidden ml-6 mr-6 mt-6" style={{ borderRadius: "0px" }}>
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.alt}
                        layout="fill"
                        objectFit="cover"
                        className=""
                      />
                    </div>

                    {/* Title area */}
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
                  // Regular card layout
                  <div
                    key={itemIndex}
                    className="rounded-[10px] p-4 flex flex-col items-center text-center overflow-hidden pt-0 pl-0 pr-0 society-action-card pb-0"
                    style={{
                      background: "rgba(241, 241, 241, 0.60)",
                      boxShadow: "-2px -2px 5px 0px #FFF, 3px 3px 5px 0px rgba(0, 0, 0, 0.10)",
                    }}
                  >
                    <div
                      className="w-full pb-[66.66%] relative overflow-hidden society-action-card-image-wrapper mb-0"
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
                    <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed society-action-card-text px-6 mt-6 mb-6 text-left">
                      {item.text}
                    </p>
                  </div>
                ),
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
