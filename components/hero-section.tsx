"use client" // クライアントコンポーネントとしてマーク

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react" // useStateとuseEffectをインポート

type HeroSectionProps = {
  headerHeight: number // headerHeightを受け取るためのプロップ型を定義
}

export default function HeroSection({ headerHeight }: HeroSectionProps) {
  const [showActionLinks, setShowActionLinks] = useState(false) // mv-action-links用
  const [showHeroCircleBg, setShowHeroCircleBg] = useState(false) // hero-background-circle用
  const [showMvLogo, setShowMvLogo] = useState(false) // MVロゴ用
  const [showMvBottomCurve, setShowMvBottomCurve] = useState(false) // mv-bottom-curve用

  useEffect(() => {
    // hero-background-circle のアニメーション
    const circleTimer = setTimeout(() => {
      setShowHeroCircleBg(true)
    }, 4000) // 4秒の遅延

    // mv-action-links のアニメーション
    const linksTimer = setTimeout(() => {
      setShowActionLinks(true)
    }, 7000) // 6秒の遅延

    // MVロゴのアニメーション
    const logoTimer = setTimeout(() => {
      setShowMvLogo(true)
    }, 5000) // 4秒の遅延

    // mv-bottom-curve のアニメーション
    const bottomCurveTimer = setTimeout(() => {
      setShowMvBottomCurve(true)
    }, 6000) // 5秒の遅延

    return () => {
      clearTimeout(circleTimer) // クリーンアップ
      clearTimeout(linksTimer) // クリーンアップ
      clearTimeout(logoTimer) // クリーンアップ
      clearTimeout(bottomCurveTimer) // クリーンアップ
    }
  }, [])

  return (
    <section
      className="relative w-full flex flex-col items-center justify-start text-white px-4 md:px-6 overflow-hidden"
      style={{ minHeight: `calc(100vh - ${headerHeight}px)` }} // headerHeightに基づいて高さを調整
    >
      <video
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FV-hRGlaNBfEfZ5LLx944trZMkieTlW8j.mp4"
        autoPlay
        muted
        playsInline
        loop={false}
        className="absolute top-0 left-0 w-full h-full object-cover z-[-3]" // z-indexを調整して最背面に配置
      />
      {/* 背景左上のオブジェクト */}
      <div
        className="absolute w-[887px] h-[887px] flex-shrink-0 rounded-full z-[-1]"
        style={{
          top: "-200px", // 位置を調整
          left: "-200px", // 位置を左上に調整
          background: "radial-gradient(50% 50% at 50% 50%, rgba(0, 170, 67, 0.10) 0%, rgba(0, 170, 67, 0.03) 100%)",
          filter: "blur(100px)",
        }}
      ></div>
      {/* 背景右下のオブジェクト */}
      <div
        className="absolute w-[706px] h-[706px] flex-shrink-0 rounded-full z-[-1]"
        style={{
          bottom: "-200px", // 位置を調整
          right: "-200px", // 位置を右下に調整
          background: "radial-gradient(50% 50% at 50% 50%, rgba(126, 223, 84, 0.10) 0%, rgba(126, 223, 84, 0.03) 100%)",
          filter: "blur(100px)",
        }}
      ></div>
      {/* MVセクション画面中央にロゴを追加 */}

      {/* アニメーションを追加するdiv - 親コンテナはレイアウトのみを担当 */}
      <div className="mv-action-links relative z-20 flex flex-col md:flex-row gap-4 md:gap-4 mt-auto mb-0 md:mb-[0px]">
        {" "}
        {/* z-indexをz-20に変更 */}
        {/* with 地球 */}
        <Link
          href="#earth-action-section"
          className={`flex flex-col items-center transition-all duration-500 ease-out ${
            showActionLinks ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
          style={{ transitionDelay: showActionLinks ? "0s" : "0s" }} // 個別アニメーション用
          prefetch={false}
        >
          <Image
            src="/images/with地球.png"
            alt="with 地球"
            width={130}
            height={130}
            className="w-[130px] h-[130px] object-contain transition-transform duration-300 hover:scale-1.2"
          />
        </Link>
        {/* with 生命 */}
        <Link
          href="#life-action-section"
          className={`flex flex-col items-center relative -top-[30px] transition-all duration-500 ease-out ${
            showActionLinks ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
          style={{ transitionDelay: showActionLinks ? "0.2s" : "0s" }} // 個別アニメーション用
          prefetch={false}
        >
          <Image
            src="/images/with生命.png"
            alt="with 生命"
            width={300}
            height={300}
            className="w-[130px] h-[130px] object-contain"
          />
        </Link>
        {/* with 社会 */}
        <Link
          href="#society-action-section"
          className={`flex flex-col items-center relative -top-[30px] transition-all duration-500 ease-out ${
            showActionLinks ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
          style={{ transitionDelay: showActionLinks ? "0.4s" : "0s" }} // 個別アニメーション用
          prefetch={false}
        >
          <Image
            src="/images/with社会.png"
            alt="with 社会"
            width={300}
            height={300}
            className="w-[130px] h-[130px] object-contain"
          />
        </Link>
        {/* with 生活者 */}
        <Link
          href="#consumer-action-section"
          className={`flex flex-col items-center transition-all duration-500 ease-out ${
            showActionLinks ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
          style={{ transitionDelay: showActionLinks ? "0.6s" : "0s" }} // 個別アニメーション用
          prefetch={false}
        >
          <Image
            src="/images/with馬.png"
            alt="with 馬"
            width={300}
            height={300}
            className="w-[130px] h-[130px] object-contain transition-transform duration-300 hover:scale-120"
          />
        </Link>
      </div>
      {/* 半円オブジェクト */}
      <Image
        src="/images/mv-bottom-curve.png"
        alt="Bottom Curve"
        layout="fill"
        objectFit="cover"
        className={`mv-bottom-curve absolute bottom-0 left-0 w-full z-10 transition-opacity duration-1000 ease-out ${
          showMvBottomCurve ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Scroll Indicator */}
      <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8 flex flex-col items-center text-[#333333] text-sm font-bold mb-0 z-20">
        <Image src="/images/mv-scroll-indicator.png" alt="Scroll Indicator" width={36} height={120} layout="fixed" />{" "}
        {/* widthとheightを1.5倍に調整 */}
      </div>
    </section>
  )
}
