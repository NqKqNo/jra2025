"use client" // クライアントコンポーネントとしてマーク

import Image from "next/image"
import { useRef, useEffect, useState } from "react"

export default function EarthBackground() {
  const textPathRef = useRef<SVGTextPathElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let animationFrameId: number
    const duration = 30000 // アニメーションの周期（ミリ秒）。30秒 = 30000ミリ秒
    let startTime: number | null = null

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsedTime = currentTime - startTime
      const progress = (elapsedTime % duration) / duration
      setOffset(-progress * 100)

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      {/* Background gradient */}
      <div
        className="earth-action-background-gradient absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #E0F2F7 0%, #FFFFFF 100%)",
        }}
      />
      <div
        className="absolute rounded-full z-0"
        style={{
          width: "1400px",
          height: "1400px",
          top: "-700px",
          right: "-700px",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(46, 170, 228, 0.30) 0%, rgba(46, 170, 228, 0.00) 100%)",
          filter: "blur(100px)",
        }}
      ></div>
      <div
        className="absolute rounded-full z-0"
        style={{
          width: "1000px",
          height: "1000px",
          bottom: "-500px",
          left: "-500px",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(46, 170, 228, 0.30) 0%, rgba(46, 170, 228, 0.00) 100%)",
          filter: "blur(100px)",
        }}
      ></div>

      {/* Large background text and arch image container */}
      <div className="earth-action-background-elements-container absolute bottom-0 left-1/2 transform -translate-x-1/2 z-0 w-full max-w-[1440px] h-[500px] overflow-hidden">
        {/* 背景のアーチ画像 */}
        <Image
          src="/images/with地球_アーチ.svg"
          alt="背景のアーチ"
          width={1440}
          height={134}
          className="absolute bottom-0 left-0 w-full h-auto object-cover"
        />

        {/* アーチの外側に沿って文字を配置するSVG */}
        <svg viewBox="0 0 1440 500" className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <path id="earthCircleTextPath" d="M 0 500 A 2000 2000 0 0 1 1440 500" fill="none" />
          <text
            className="earth-action-background-text-svg"
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "200px",
              fontWeight: "bold",
              fill: "rgba(255, 255, 255, 0.60)",
              mixBlendMode: "overlay",
              letterSpacing: "0.1em",
            }}
          >
            <textPath href="#earthCircleTextPath" startOffset={`${offset}%`} textAnchor="middle" ref={textPathRef}>
              WITH EARTH WITH EARTH WITH EARTH WITH EARTH WITH EARTH
            </textPath>
          </text>
        </svg>
      </div>
    </>
  )
}
