"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function LenisSetup() {
  useEffect(() => {
    // GSAPとScrollTriggerを登録
    gsap.registerPlugin(ScrollTrigger)

    // Lenisを初期化
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // LenisのスクロールイベントをGSAPのScrollTriggerに接続
    lenis.on("scroll", ScrollTrigger.update)

    // GSAPのtickごとにLenisを更新
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // GSAPのtickを一時停止しないように設定
    gsap.ticker.lagSmoothing(0)

    // クリーンアップ関数
    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return null
}
