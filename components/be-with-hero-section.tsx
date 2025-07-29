"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function BeWithHeroSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const image = imageRef.current

    if (!section || !title || !subtitle || !image) return

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
          start: "top 80%", // When the top of the section is 80% down from the top of the viewport
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
          start: "top 70%", // When the top of the section is 70% down from the top of the viewport
          toggleActions: "play none none none",
        },
      },
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-[#F1F1F1] overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="/images/bewith_logo.png"
        alt="Be With Logo Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0 opacity-10"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        <h2 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#333333] leading-tight mb-4">
          Be with,
        </h2>
        <p ref={subtitleRef} className="text-lg md:text-xl lg:text-2xl text-[#333333] font-medium max-w-3xl mb-8">
          JRAは、競馬という文化を通じて、社会とともに、地球とともに、生命とともに、生活者とともに、そして馬とともに、持続可能な社会の実現に貢献していきます。
        </p>
        <div ref={imageRef} className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
          <Image src="/images/be-with-logo.png" alt="Be With Icon" layout="fill" objectFit="contain" quality={100} />
        </div>
      </div>
    </section>
  )
}
