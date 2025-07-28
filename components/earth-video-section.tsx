import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react" // PlayCircle は不要になったため削除

export default function EarthVideoSection() {
  const videos = [
    {
      id: 1,
      thumbnail: "/images/環境への取り組みについて.png", // 画像を更新
      title: "環境への取り組みについて",
      link: "#",
    },
    {
      id: 2,
      thumbnail: "/images/ペットボトル再利用.png", // 画像を更新
      title: "ペットボトル再利用",
      link: "#",
    },
    {
      id: 3,
      thumbnail: "/images/バイオマス発電.png", // 画像を更新
      title: "バイオマス発電",
      link: "#",
    },
  ]

  return (
    <section className="earth-video-section relative w-full py-20 px-4 md:px-6 pb-0 shadow-none mx-0 pt-0">
      {/* 背景装飾03セクション */}
      <div
        className="absolute top-0 left-[-200px]" // leftを調整し、transformを削除
        style={{
          width: "812px",
          height: "812px",
          flexShrink: 0,
          aspectRatio: "1 / 1",
          zIndex: 0,
          pointerEvents: "none",
          // transform: "translateX(-50%)", // この行を削除
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="-259 200 812 812" fill="none">
          <g filter="url(#filter0_fn_38_1318)">
            <circle cx="147" cy="606" r="406" fill="url(#paint0_radial_38_1318)" fillOpacity="0.3" />
          </g>
          <defs>
            <filter
              id="filter0_fn_38_1318"
              x="-459"
              y="0"
              width="1212"
              height="1212"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_38_1318" />
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
              <feComposite
                operator="in"
                in2="effect1_foregroundBlur_38_1318"
                in="coloredNoise1"
                result="noise1Clipped"
              />
              <feFlood floodColor="#50C4F2" result="color1Flood" />
              <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
              <feMerge result="effect2_noise_38_1318">
                <feMergeNode in="effect1_foregroundBlur_38_1318" />
                <feMergeNode in="color1" />
              </feMerge>
            </filter>
            <radialGradient
              id="paint0_radial_38_1318"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(147 606) rotate(90) scale(406)"
            >
              <stop stopColor="#50C4F2" />
              <stop offset="1" stopColor="#50C4F2" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 shadow-none">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col shadow-none items-start">
              <Link
                href={video.link}
                className="relative block w-full rounded-lg overflow-hidden shadow-lg group"
                prefetch={false}
              >
                {/* アスペクト比3:2を維持するラッパー */}
                <div className="relative w-full pt-[calc(2/3*100%)]">
                  <Image
                    src={video.thumbnail || "/placeholder.svg"}
                    fill // fill を使用して親要素にフィットさせる
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity shadow-none">
                    {/* カスタム再生アイコン */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="32"
                      viewBox="0 0 32 40"
                      fill="none"
                      className="opacity-80 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    >
                      <path d="M32 20L0 40L0 -1.43054e-06L32 20Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </Link>
              <Link
                href={video.link}
                className="flex gap-2 mt-4 hover:underline shadow-none items-center text-left"
                prefetch={false}
                style={{
                  color: "#333",
                  fontFamily: '"Noto Sans JP"',
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "500",
                  lineHeight: "22px",
                }}
              >
                {video.title}
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#1FA9EA" }}
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
