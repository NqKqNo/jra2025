import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-[#226600] py-8 text-white text-sm">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 md:px-6">
        {/* ナビゲーションリンク */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-4">
          <Link href="#" className="hover:underline" prefetch={false}>
            馬券は20歳になってから
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="#" className="hover:underline" prefetch={false}>
            JRAのギャンブル等依存症対策
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="#" className="hover:underline" prefetch={false}>
            払戻金の支払を受けた方へ
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="#" className="hover:underline" prefetch={false}>
            サイトマップ
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="#" className="hover:underline" prefetch={false}>
            リンク
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="#" className="hover:underline" prefetch={false}>
            ご利用に際して
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="#" className="flex items-center gap-1 hover:underline" prefetch={false}>
            Horse Racing in Japan
            <ExternalLinkIcon className="w-3 h-3" />
          </Link>
        </div>
        {/* コピーライト */}
        <p className="text-xs text-gray-300">Copyright © Japan Racing Association All rights reserved.</p>
      </div>
    </footer>
  )
}
