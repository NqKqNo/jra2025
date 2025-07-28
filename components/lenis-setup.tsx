"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function LenisSetup() {
  useEffect(() => {
    // より滑らかな減速感を持つ三次イージング関数を定義 (元のcubicEaseOutに戻す)
    const cubicEaseOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const lenis = new Lenis({
      duration: 0.8,
      easing: cubicEaseOut, // 元のcubicEaseOutに戻す
      smoothTouch: true,
      // snap: ".action-section", // ScrollTriggerがスナップ/ピンニングを管理するため、Lenisのスナップは無効化
    })

    // LenisとScrollTriggerを同期
    lenis.on("scroll", ScrollTrigger.update)

    // ScrollTriggerにLenisをスクローラーとして使用するよう指示
    ScrollTrigger.defaults({ scroller: lenis.scroll.instance })

    function raf(time: DOMHighResTimeStamp) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      // コンポーネントアンマウント時に全てのScrollTriggerインスタンスをクリーンアップ
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return null
}
