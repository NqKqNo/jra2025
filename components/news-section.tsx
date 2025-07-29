"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

export function NewsSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const newsGridRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const newsGrid = newsGridRef.current
    const button = buttonRef.current

    if (!section || !title || !subtitle || !newsGrid || !button) return

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

    // News items animation
    gsap.fromTo(
      gsap.utils.toArray(".news-item"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: newsGrid,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    )

    // Button animation
    gsap.fromTo(
      button,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
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

  const newsItems = [
    {
      date: "2023.10.26",
      category: "お知らせ",
      title: "JRAのサステナビリティレポート2023を公開しました。",
      link: "#",
    },
    {
      date: "2023.10.26",
      category: "お知らせ",
      title: "JRAのサステナビリティレポート2023を公開しました。",
      link: "#",
    },
    {
      date: "2023.10.26",
      category: "お知らせ",
      title: "JRAのサステナビリティレポート2023を公開しました。",
      link: "#",
    },
    {
      date: "2023.10.26",
      category: "お知らせ",
      title: "JRAのサステナビリティレポート2023を公開しました。",
      link: "#",
    },
    {
      date: "2023.10.26",
      category: "お知らせ",
      title: "JRAのサステナビリティレポート2023を公開しました。",
      link: "#",
    },
    {
      date: "2023.10.26",
      category: "お知らせ",
      title: "JRAのサステナビリティレポート2023を公開しました。",
      link: "#",
    },
  ]

  return (
    <section ref={sectionRef} className="w-full py-20 bg-white text-center overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">
          ニュース
        </h2>
        <p ref={subtitleRef} className="text-lg md:text-xl text-[#333333] mb-12 max-w-3xl mx-auto">
          JRAのサステナビリティに関する最新情報をお届けします。
        </p>

        <div ref={newsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="news-item bg-[#F1F1F1] rounded-lg shadow-md p-6 text-left transform transition-transform duration-300 hover:scale-105"
            >
              <p className="text-sm text-gray-500 mb-2">{item.date}</p>
              <span className="inline-block bg-[#E0F2F7] text-[#1FA9EA] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {item.category}
              </span>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">{item.title}</h3>
              <Link href={item.link} className="text-[#1FA9EA] font-medium hover:underline flex items-center">
                詳しく見る
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        <Button
          ref={buttonRef}
          className="bg-gradient-to-r from-[#2EAAE4] to-[#50C4F2] text-white rounded-full px-8 py-6 text-lg md:text-xl font-bold shadow-lg hover:from-[#50C4F2] hover:to-[#2EAAE4] transition-all duration-300"
          style={{ minWidth: "280px" }}
        >
          もっと見る
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
    </section>
  )
}
