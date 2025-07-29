import Image from "next/image"
import Link from "next/link"

export default function EarthAdditionalBannerSection() {
  return (
    <section className="earth-additional-banner-section relative w-full py-20 px-4 md:px-6 flex flex-col items-center pb-40 pt-10">
      {/* 背景装飾04セクション */}
      <div
        className="absolute bottom-[-100px] left-0"
        style={{
          width: "779px",
          height: "779px",
          flexShrink: 0,
          aspectRatio: "1 / 1",
          zIndex: 0,
          pointerEvents: "none",
          transform: "translateX(-50%)", // 左側に50%はみ出す
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 779 779" fill="none">
          <g filter="url(#filter0_fn_new)">
            <circle cx="389.5" cy="389.5" r="289.5" fill="url(#paint0_radial_new)" fillOpacity="0.3" />
          </g>
          <defs>
            <filter
              id="filter0_fn_new"
              x="0"
              y="0"
              width="779"
              height="779"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_new" />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1 1"
                stitchTiles="stitch"
                numOctaves="3"
                result="noise"
                seed="5265"
              />
              <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                <feFuncA
                  type="discrete"
                  tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
                />
              </feComponentTransfer>
              <feComposite operator="in" in2="effect1_foregroundBlur_new" in="coloredNoise1" result="noise1Clipped" />
              <feFlood floodColor="#00AA43" result="color1Flood" />
              <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
              <feMerge result="effect2_noise_new">
                <feMergeNode in="effect1_foregroundBlur_new" />
                <feMergeNode in="color1" />
              </feMerge>
            </filter>
            <radialGradient
              id="paint0_radial_new"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(389.5 389.5) rotate(90) scale(289.5)"
            >
              <stop stopColor="#00AA43" />
              <stop offset="1" stopColor="#00AA43" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* 背景装飾05セクション */}
      <div
        className="absolute top-[-900px] right-0"
        style={{
          width: "1302px",
          height: "1302px",
          flexShrink: 0,
          aspectRatio: "1 / 1",
          zIndex: 0,
          pointerEvents: "none",
          transform: "translateX(50%)", // 右側に50%はみ出す
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1302 1302" fill="none">
          <g filter="url(#filter0_fn_05)">
            <circle cx="651" cy="651" r="551" fill="url(#paint0_radial_05)" fillOpacity="0.3" />
          </g>
          <defs>
            <filter
              id="filter0_fn_05"
              x="0"
              y="0"
              width="1302"
              height="1302"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_05" />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1 1"
                stitchTiles="stitch"
                numOctaves="3"
                result="noise"
                seed="5265"
              />
              <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                <feFuncA
                  type="discrete"
                  tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
                />
              </feComponentTransfer>
              <feComposite operator="in" in2="effect1_foregroundBlur_05" in="coloredNoise1" result="noise1Clipped" />
              <feFlood floodColor="#7EDF54" result="color1Flood" />
              <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
              <feMerge result="effect2_noise_05">
                <feMergeNode in="effect1_foregroundBlur_05" />
                <feMergeNode in="color1" />
              </feMerge>
            </filter>
            <radialGradient
              id="paint0_radial_05"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(651 651) rotate(90) scale(551)"
            >
              <stop stopColor="#7EDF54" />
              <stop offset="1" stopColor="#7EDF54" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-8 w-full">
        {/* Top Banner: Be With. CM Gallery */}
        <Link
          href="#"
          className="w-full h-[150px] bg-[#D9D9D9] rounded-lg flex items-center justify-center text-gray-600 text-lg font-medium hover:shadow-xl transition-shadow duration-300 shadow-none"
          prefetch={false}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/images/bewith_logo.png" // 画像を新しいものに差し替え
              alt="Be With."
              width={100}
              height={50}
              className="object-contain"
              // style={{ filter: "brightness(0.5) sepia(1) hue-rotate(90deg) saturate(2)" }} // 新しい画像は色が付いているため削除
            />
            <span className="text-[#333] text-xl font-bold">CMギャラリー</span>
          </div>
        </Link>

        {/* Bottom Banner: About Horse Racing Promotion */}
        <Link
          href="#"
          className="w-full h-[150px] bg-[#D9D9D9] rounded-lg flex items-center justify-center text-gray-600 text-lg font-medium hover:shadow-xl transition-shadow duration-300 shadow-none"
          prefetch={false}
        >
          <span className="text-[#333] text-xl font-bold">馬事振興への取り組みについて</span>
        </Link>
      </div>
    </section>
  )
}
