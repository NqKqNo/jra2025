import Image from "next/image"

export default function BeWithHeroSection() {
  return (
    <section className="w-full h-[100vh] relative flex items-center justify-center overflow-hidden bg-[#F1F1F1]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bewith_logo.png"
          alt="Be With Logo Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-10"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <Image src="/images/be-with-logo.png" alt="Be With Logo" width={600} height={200} className="mx-auto mb-8" />
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#333333] leading-tight mb-4">
          JRAは、
          <span
            style={{
              background: "linear-gradient(45deg, #C46126 0%, #E69260 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            馬
          </span>
          と、
          <span
            style={{
              background: "linear-gradient(87deg, #2EAAE4 0%, #50C4F2 102.59%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            地球
          </span>
          と、
          <br className="hidden md:inline" />
          <span
            style={{
              background: "linear-gradient(45deg, #FB789A 0%, #FFA5A6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            生命
          </span>
          と、
          <span
            style={{
              background: "linear-gradient(45deg, #A279D6 0%, #A598F0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            社会
          </span>
          と、
          <br className="hidden md:inline" />
          <span
            style={{
              background: "linear-gradient(45deg, #C46126 0%, #E69260 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            生活者
          </span>
          とともに。
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          JRAは、競馬事業を通じて得た収益を社会に還元し、持続可能な社会の実現に貢献しています。
        </p>
      </div>
    </section>
  )
}
