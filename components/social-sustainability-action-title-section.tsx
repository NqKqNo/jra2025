"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SocialSustainabilityActionTitleSection() {
  const sectionRef = useRef(null)
  const titleImageRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const titleImage = titleImageRef.current

    if (!section || !titleImage) return

    gsap.fromTo(
      titleImage,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%", // When the top of the section is 80% down from the top of the viewport
          toggleActions: "play none none none",
        },
      },
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 bg-[#F1F1F1] flex items-center justify-center overflow-hidden"
    >
      <div className="relative z-10">
        <Image
          ref={titleImageRef}
          src="/images/social-sustainability-action-title.png"
          alt="Social Sustainability Action Title"
          width={800}
          height={200}
          layout="responsive"
          objectFit="contain"
          quality={100}
        />
      </div>
    </section>
  )
}
