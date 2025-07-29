import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-background-full.png"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      {/* Bottom curve image */}
      <div className="absolute bottom-0 left-0 w-full z-10">
        <Image
          src="/images/mv-bottom-curve.png"
          alt="Bottom Curve"
          width={1920}
          height={200}
          layout="responsive"
          objectFit="contain"
          priority
        />
      </div>

      {/* Main content */}
      <div className="relative z-20 text-center text-white px-4">
        <Image src="/images/hero_logo.png" alt="JRA Logo" width={600} height={200} className="mx-auto mb-8" priority />
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
          JRAは、
          <span className="text-[#E69260]">馬</span>と、
          <span className="text-[#50C4F2]">地球</span>と、
          <br className="hidden md:inline" />
          <span className="text-[#FFA5A6]">生命</span>と、
          <span className="text-[#A598F0]">社会</span>と、
          <br className="hidden md:inline" />
          <span className="text-[#E69260]">生活者</span>とともに。
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          JRAは、競馬事業を通じて得た収益を社会に還元し、持続可能な社会の実現に貢献しています。
        </p>
        <div className="flex justify-center space-x-4 mb-12">
          <Image
            src="/images/mv-with-livelihood.png"
            alt="With Livelihood"
            width={150}
            height={50}
            className="cursor-pointer"
          />
          <Image src="/images/mv-with-earth.png" alt="With Earth" width={150} height={50} className="cursor-pointer" />
          <Image src="/images/mv-with-life.png" alt="With Life" width={150} height={50} className="cursor-pointer" />
          <Image
            src="/images/mv-with-society.png"
            alt="With Society"
            width={150}
            height={50}
            className="cursor-pointer"
          />
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Image
            src="/images/mv-scroll-indicator.png"
            alt="Scroll Down"
            width={50}
            height={50}
            className="animate-bounce"
          />
        </div>
      </div>
    </section>
  )
}
