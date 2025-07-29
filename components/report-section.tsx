"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

export function ReportSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const imageRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const image = imageRef.current
    const button = buttonRef.current

    if (!section || !title || !subtitle || !image || !button) return

    // Title and Subtitle animation
    gsap.fromTo(
      [title, subtitle],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    )

    // Image animation
    gsap.fromTo(
      image,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      },
    )

    // Button animation
    gsap.fromTo(
      button,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: button,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      },
    )
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full py-20 bg-[#F1F1F1] text-center overflow-hidden">
      {/* Top curve image */}
      <Image
        src="/images/report-top-curve.png"
        alt="Top Curve"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute top-0 left-0 w-full h-auto z-0"
        style={{ transform: "translateY(-50%)" }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">
          JRAのサステナビリティレポート
        </h2>
        <p ref={subtitleRef} className="text-lg md:text-xl text-[#333333] mb-12 max-w-3xl mx-auto">
          JRAのサステナビリティに関する取り組みをまとめたレポートを公開しています。
        </p>

        <div ref={imageRef} className="relative w-full max-w-4xl mx-auto mb-12">
          <Image
            src="/images/net-touhyou-login.png"
            alt="Report Image"
            width={1000}
            height={600}
            layout="responsive"
            objectFit="contain"
            quality={90}
          />
        </div>

        <Button
          ref={buttonRef}
          className="bg-gradient-to-r from-[#2EAAE4] to-[#50C4F2] text-white rounded-full px-8 py-6 text-lg md:text-xl font-bold shadow-lg hover:from-[#50C4F2] hover:to-[#2EAAE4] transition-all duration-300"
          style={{ minWidth: "280px" }}
        >
          レポートを見る
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="ml-2"
          >
            <ellipse cx="12" cy="12" rx="12" ry="12" transform="rotate(-90 12 12)" fill="white" />
            <path d="M11 8L15 12L11 16" stroke="#1FA9EA" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Button>
      </div>

      {/* Bottom curve image */}
      <Image
        src="/images/report-bottom-curve.png"
        alt="Bottom Curve"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute bottom-0 left-0 w-full h-auto z-0"
        style={{ transform: "translateY(50%)" }}
      />
    </section>
  )
}
