"use client" // クライアントコンポーネントとしてマーク

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image" // Imageコンポーネントをインポート

// ScrollTriggerプラグインを登録
gsap.registerPlugin(ScrollTrigger)

export default function SocialSustainabilityActionTitleSection() {
  useEffect(() => {
    console.log("SocialSustainabilityActionTitleSection useEffect ran.")

    const textLines = gsap.utils.toArray(".animated-text-line")
    const horseImages = gsap.utils.toArray(".horse-animation")

    console.log("Found textLines:", textLines)
    console.log("Found horseImages:", horseImages)

    // 各ラインのテキストの初期状態を設定 (コメントアウトを解除)
    gsap.set(textLines, { opacity: 0, y: "20%" })
    // 馬の画像の初期状態を設定
    gsap.set(horseImages, { opacity: 0, x: -100, zIndex: 25 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".social-sustainability-title-container",
        start: "top bottom-=20%",
        once: true,
        // markers: true, // マーカーは削除されたまま
        id: "social-sustainability-title-section-trigger",
        onEnter: () => console.log("ScrollTrigger entered!"),
        onLeave: () => console.log("ScrollTrigger left!"),
        onUpdate: (self) => console.log("ScrollTrigger progress:", self.progress),
      },
    })

    textLines.forEach((line, index) => {
      const lineTl = gsap.timeline()

      // ワイプアニメーション (::before要素)
      lineTl.fromTo(
        line,
        {
          "--before-width": "100%",
          "--before-left": "0%",
        },
        {
          "--before-width": "0%",
          "--before-left": "100%",
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => console.log(`Wipe animation for line ${index} completed.`),
        },
        0,
      )

      // テキスト表示アニメーション (opacityとy-position) (コメントアウトを解除)
      lineTl.to(
        line,
        {
          opacity: 1,
          y: "0%",
          duration: 0.8,
          ease: "power3.out",
          onComplete: () =>
            console.log(
              `Text animation for line ${index} completed. Current opacity: ${gsap.getProperty(line, "opacity")}`,
            ),
        },
        0.1,
      )

      tl.add(lineTl, index * 0.1)
    })

    tl.add(() => {
      console.log("Starting horse animation.")
      gsap.to(".horse-top", {
        opacity: 1, // アニメーションでopacityを1に設定
        x: 150,
        duration: 1,
        ease: "power2.out",
        onComplete: () => console.log("Horse top animation completed."),
      })
      gsap.to(".horse-middle", {
        opacity: 1, // アニメーションでopacityを1に設定
        x: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => console.log("Horse middle animation completed."),
      })
      gsap.to(".horse-bottom", {
        opacity: 1, // アニメーションでopacityを1に設定
        x: 90,
        duration: 1,
        ease: "power2.out",
        onComplete: () => console.log("Horse bottom animation completed."),
      })
    }, "+=0.5")

    return () => {
      tl.kill()
      ScrollTrigger.getById("social-sustainability-title-section-trigger")?.kill()
    }
  }, [])

  return (
    <section className="relative w-full min-h-[300px] flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden bg-gradient-to-b from-[#FFFFFF] to-[#F1F1F1] pb-40">
      {/* タイトルテキストと馬の画像 */}
      <div className="relative z-10 flex items-center justify-center social-sustainability-title-container">
        <h2
          className="text-center font-semibold text-[80px] leading-[92px] tracking-[1.6px] uppercase"
          // style から gradient background-clip 関連のスタイルを削除
        >
          <span className="animated-text-line block">SOCIAL</span>
          <span className="animated-text-line block">SUSTAINABILITY</span>
          <span className="animated-text-line block">ACTION</span>
        </h2>
        {/* 馬の画像、h2の右側に絶対配置 */}
        <Image
          src="/images/uma02-3.png" // ファイル名を変更
          alt="Running Horse"
          width={100}
          height={100}
          className="absolute horse-animation horse-top"
          style={{ right: "-100px", top: "-4px" }} // topはh2の行の高さに合わせて調整
        />
        <Image
          src="/images/uma02-1.png" // ファイル名を変更
          alt="Running Horse"
          width={100}
          height={100}
          className="absolute horse-animation horse-middle"
          style={{ right: "-100px", top: "88px" }} // topはh2の行の高さに合わせて調整
        />
        <Image
          src="/images/uma02-2.png" // ファイル名を変更
          alt="Running Horse"
          width={100}
          height={100}
          className="absolute horse-animation horse-bottom"
          style={{ right: "-100px", top: "180px" }} // topはh2の行の高さに合わせて調整
        />
      </div>
    </section>
  )
}
