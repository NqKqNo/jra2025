"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

export function CmGallerySection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const galleryRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const gallery = galleryRef.current
    const button = buttonRef.current

    if (!section || !title || !subtitle || !gallery || !button) return

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

    // Gallery items animation
    gsap.fromTo(
      gsap.utils.toArray(".cm-gallery-item"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: gallery,
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

  const galleryItems = [
    {
      image: "/images/uma02-1.png",
      alt: "CM Gallery Image 1",
      title: "UMAJO",
      description: "UMAJOは、女性が競馬をより楽しめるように、JRAが立ち上げたプロジェクトです。",
    },
    {
      image: "/images/uma02-2.png",
      alt: "CM Gallery Image 2",
      title: "UMAJO",
      description: "UMAJOは、女性が競馬をより楽しめるように、JRAが立ち上げたプロジェクトです。",
    },
    {
      image: "/images/uma02-3.png",
      alt: "CM Gallery Image 3",
      title: "UMAJO",
      description: "UMAJOは、女性が競馬をより楽しめるように、JRAが立ち上げたプロジェクトです。",
    },
  ]

  return (
    <section ref={sectionRef} className="w-full py-20 bg-[#F1F1F1] text-center overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">
          CMギャラリー
        </h2>
        <p ref={subtitleRef} className="text-lg md:text-xl text-[#333333] mb-12 max-w-3xl mx-auto">
          JRAの最新CMや過去のCMをご覧いただけます。
        </p>

        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="cm-gallery-item bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <div className="relative w-full h-60">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.alt}
                  layout="fill"
                  objectFit="cover"
                  quality={90}
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#333333] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-base">{item.description}</p>
              </div>
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
