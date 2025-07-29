import Image from "next/image"
import { Button } from "@/components/ui/button"

export function BannerSection() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <Image
        src="/images/footer-background.png"
        alt="Banner Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
          JRAのサステナビリティレポート
        </h2>
        <p className="text-white text-base md:text-lg lg:text-xl mb-8 max-w-2xl">
          JRAのサステナビリティに関する取り組みをまとめたレポートを公開しています。
        </p>
        <Button className="bg-white text-[#1FA9EA] rounded-full px-8 py-6 text-lg md:text-xl font-bold shadow-lg hover:bg-gray-100 transition-all duration-300">
          レポートを見る
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="ml-2"
          >
            <ellipse cx="12" cy="12" rx="12" ry="12" transform="rotate(-90 12 12)" fill="#1FA9EA" />
            <path d="M11 8L15 12L11 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Button>
      </div>
    </section>
  )
}
