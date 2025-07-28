import Image from "next/image"
import Link from "next/link"
// ChevronRight は画像に含まれるため不要になりました
// import { ChevronRight } from 'lucide-react'

export default function EarthSubPageTransitionSection() {
  const navItems = [
    {
      id: 1,
      image: "/images/with地球.png", // 新しい画像パス
      alt: "with 地球 JRAの環境保全活動",
      link: "/earth-action", // 現在のページへのリンク
    },
    {
      id: 2,
      image: "/images/with生命.png", // 新しい画像パス
      alt: "with 生命 JRAの畜産振興支援",
      link: "#",
    },
    {
      id: 3,
      image: "/images/with社会.png", // 新しい画像パス
      alt: "with 社会 地域・社会との協調",
      link: "#",
    },
    {
      id: 4,
      image: "/images/with馬.png", // 新しい画像パス
      alt: "with 馬 馬との共生",
      link: "#",
    },
  ]

  return (
    <section className="earth-sub-page-transition-section w-full relative overflow-hidden">
      {/* Top Green Section */}
      <div
        className="relative w-full py-16 flex flex-col items-center justify-center text-white text-center md:py-24 md:pb-32"
        style={{
          background: "linear-gradient(180deg, #268301 -175.72%, #00AA43 -2.31%, #009EA7 171.1%)",
        }}
      >
        <Image
          src="/images/logo_white.png"
          alt="Be With. Action 2025"
          width={300}
          height={150}
          className="object-contain"
        />
      </div>

      {/* Bottom Light Green Section with Navigation */}
      <div className="relative w-full py-16 px-4 md:px-6 flex flex-col items-center md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto -mt-32 md:-mt-40 z-10 shadow-none">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              // 画像自体が完全なデザインなので、Linkのスタイルは最小限に
              className="flex flex-col items-center text-center group shadow-none"
              prefetch={false}
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.alt}
                width={136} // 幅を136pxに設定
                height={136} // アスペクト比を維持するため、高さも136pxに設定
                className="object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
