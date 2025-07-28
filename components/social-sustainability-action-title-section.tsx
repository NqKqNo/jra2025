"use client" // クライアントコンポーネントとしてマーク

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image" // Imageコンポーネントをインポート

// ScrollTriggerプラグインを登録
gsap.registerPlugin(ScrollTrigger)

export default function SocialSustainabilityActionTitleSection() {
  useEffect(() => {
    // console.log("SocialSustainabilityActionTitleSection useEffect ran.") // Debug: Removed

    const textLines = gsap.utils.toArray(".animated-text-line")
    const horseImages = gsap.utils.toArray(".horse-animation")

    // console.log("Found textLines:", textLines) // Debug: Removed
    // console.log("Found horseImages:", horseImages) // Debug: Removed

    // 各ラインのテキストの初期状態を設定 (opacityを1に設定して常に表示)
    gsap.set(textLines, { opacity: 1, y: "0%" })
    // 馬の画像の初期状態を設定
    gsap.set(horseImages, { opacity: 0, x: -100, zIndex: 25 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".social-sustainability-title-container",
        start: "top bottom-=20%",
        once: true,
        // markers: true, // Debug: Removed
        id: "social-sustainability-title-section-trigger",
        // onEnter: () => console.log("ScrollTrigger entered!"), // Debug: Removed
        // onLeave: () => console.log("ScrollTrigger left!"), // Debug: Removed
        // onUpdate: (self) => console.log("ScrollTrigger progress:", self.progress), // Debug: Removed
      },
    })

    textLines.forEach((line, index) => {
      const lineTl = gsap.timeline()

      // ワイプアニメーション (::before要素)
      // ::before要素を直接ターゲットし、xとopacityをアニメーション
      lineTl.fromTo(
        line,
        {
          "--wipe-x": "0%", // 初期位置
          "--wipe-opacity": 1, // 初期不透明度
        },
        {
          "--wipe-x": "100%", // 右に移動して消える
          "--wipe-opacity": 0, // 透明になる
          duration: 0.8,
          ease: "power2.inOut",
          // onComplete: () => console.log(`Wipe animation for line ${index} completed.`), // Debug: Removed
        },
        0,
      )

      tl.add(lineTl, index * 0.1)
    })

    tl.add(() => {
      // console.log("Starting horse animation.") // Debug: Removed
      gsap.to(".horse-top", {
        opacity: 1, // アニメーションでopacityを1に設定
        x: 150,
        duration: 1,
        ease: "power2.out",
        // onComplete: () => console.log("Horse top animation completed."), // Debug: Removed
      })
      gsap.to(".horse-middle", {
        opacity: 1, // アニメーションでopacityを1に設定
        x: 0,
        duration: 1,
        ease: "power2.out",
        // onComplete: () => console.log("Horse middle animation completed."), // Debug: Removed
      })
      gsap.to(".horse-bottom", {
        opacity: 1, // アニメーションでopacityを1に設定
        x: 90,
        duration: 1,
        ease: "power2.out",
        // onComplete: () => console.log("Horse bottom animation completed."), // Debug: Removed
      })
    }, "+=0.5")

    return () => {
      tl.kill()
      ScrollTrigger.getById("social-sustainability-title-section-trigger")?.kill()
      // console.log("ScrollTrigger and timeline killed on unmount.") // Debug: Removed
    }
  }, [])

  return (
    <section className="relative w-full min-h-[300px] flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden bg-gradient-to-b from-[#FFFFFF] to-[#F1F1F1] pb-40">
      {/* タイトルテキストと馬の画像 */}
      <div className="relative z-10 flex items-center justify-center social-sustainability-title-container">
        <h2 className="text-center font-semibold text-[80px] leading-[92px] tracking-[1.6px] uppercase">
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
