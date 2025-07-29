"use client"

import Image from "next/image"

export default function BannerSection() {
  return (
    <section
      className="relative w-full px-4 md:px-6 flex items-center justify-center bg-white py-20 md:py-40 pb-0"
    >
      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg z-10">
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="/images/スペシャルコンテンツバナー.png" // public ディレクトリにある前提
            alt="JRAサステナジャーニー バナー"
            width={1200}
            height={300}
            className="w-full h-auto"
            priority // 初期表示に必ず見せたい場合
          />
        </a>
      </div>
    </section>
  )
}
