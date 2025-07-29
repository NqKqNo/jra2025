import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full relative bg-[#F1F1F1] pt-12 pb-8 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/footer-background.png"
          alt="Footer Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-50"
        />
      </div>

      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        <Image src="/images/JRA.png" alt="JRA Logo" width={150} height={50} className="mb-8" />
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-gray-700 text-lg font-medium">
          <Link href="#" className="hover:text-gray-900 transition-colors">
            JRAについて
          </Link>
          <Link href="#" className="hover:text-gray-900 transition-colors">
            競馬場・ウインズ
          </Link>
          <Link href="#" className="hover:text-gray-900 transition-colors">
            馬券の購入
          </Link>
          <Link href="#" className="hover:text-gray-900 transition-colors">
            レース情報
          </Link>
          <Link href="#" className="hover:text-gray-900 transition-colors">
            馬・騎手・調教師
          </Link>
          <Link href="#" className="hover:text-gray-900 transition-colors">
            競馬学校
          </Link>
          <Link href="#" className="hover:text-gray-900 transition-colors">
            馬事文化
          </Link>
          <Link href="#" className="hover:text-gray-900 transition-colors">
            社会貢献
          </Link>
        </nav>
        <p className="text-gray-500 text-sm">© Japan Racing Association. All rights reserved.</p>
      </div>
    </footer>
  )
}
