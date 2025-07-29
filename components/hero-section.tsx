"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef(null)
  const logoRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const logo = logoRef.current
    const scrollIndicator = scrollIndicatorRef.current

    if (!section || !logo || !scrollIndicator) return

    // Initial animation for logo
    gsap.fromTo(logo, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })

    // Scroll indicator animation
    gsap.fromTo(
      scrollIndicator,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5,
        repeat: -1, // Infinite repeat
        yoyo: true, // Go back and forth
      },
    )

    // Parallax effect for background image
    gsap.to(section, {
      backgroundPositionY: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        <Image
          ref={logoRef}
          src="/images/mv_logo.png"
          alt="JRA Logo"
          width={400}
          height={200}
          className="mb-8 opacity-0" // Initial opacity set to 0 for animation
        />
        <p className="text-white text-lg md:text-xl lg:text-2xl font-medium max-w-3xl">
          JRAは、競馬という文化を通じて、社会とともに、地球とともに、生命とともに、生活者とともに、そして馬とともに、持続可能な社会の実現に貢献していきます。
        </p>
      </div>

      {/* Scroll Indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-10 z-10 opacity-0">
        <Image src="/images/mv-scroll-indicator.png" alt="Scroll Down" width={50} height={50} />
      </div>
    </section>
  )
}
