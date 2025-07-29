import type { Ref } from "react" // Ref型をインポート
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SearchIcon } from "lucide-react" // LockIcon, HelpCircleIcon は不要になったため削除

// refを受け取るためのProps型を定義
type HeaderProps = {
  ref?: Ref<HTMLElement>
}

export default function Header({ ref }: HeaderProps) {
  return (
    <header ref={ref} className="w-full shadow-sm fixed top-0 left-0 right-0 z-50">
      {/* トップバー */}
      <div className="w-full flex h-16 items-center justify-between bg-[#268300] px-4 md:px-6 mx-auto gap-x-0">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <img src="/images/jra-logo.png" alt="JRAロゴ" width={100} height={24} className="h-6 object-contain" />
        </Link>
        <div className="flex items-center gap-4 justify-start">
          <Link href="#" prefetch={false}>
            <img
              src="/images/net-touhyou-login.png"
              alt="ネット投票ログイン"
              width={140}
              height={40}
              className="h-10 object-contain"
            />
          </Link>
          <Link href="#" prefetch={false}>
            <img
              src="/images/otoiawase-faq.png"
              alt="お問い合わせFAQ"
              width={140}
              height={40}
              className="h-10 object-contain"
            />
          </Link>
          <div className="relative hidden md:block">
            <Input
              type="search"
              placeholder="サイト内検索"
              className="w-[200px] rounded-md border border-gray-300 bg-white pl-8 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#0066CC] focus:ring-[#0066CC]"
            />
            <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <SearchIcon className="h-5 w-5 text-white" />
            <span className="sr-only">検索</span>
          </Button>
        </div>
      </div>

      {/* メインナビゲーション */}
      <nav className="bg-[#333333] py-0">
        {" "}
        {/* py-0 から py-3 に変更 */}
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-1 gap-y-2 px-4 md:justify-center">
          <Link href="#" className="text-white hover:text-gray-200 font-bold text-sm mx-2.5" prefetch={false}>
            {" "}
            {/* text-xs から text-sm に変更 */}
            競馬メニュー
          </Link>
          <Link href="#" className="text-white hover:text-gray-200 font-bold text-sm mx-2.5" prefetch={false}>
            馬券・JRA-UMACA
          </Link>
          <Link href="#" className="text-white hover:text-gray-200 font-bold text-sm mx-2.5" prefetch={false}>
            ネット投票導入
          </Link>
          <Link href="#" className="text-white hover:text-gray-200 font-bold text-sm mx-2.5" prefetch={false}>
            {" "}
            {/* mx-2 から mx-2.5 に変更 */}
            イベント・プロモーション
          </Link>
          <Link href="#" className="text-white hover:text-gray-200 font-bold text-sm mx-2.5" prefetch={false}>
            競馬場・ウインズ・指定席
          </Link>
          <Link href="#" className="bg-[#226600] px-4 py-2 text-white font-bold text-sm mx-2.5" prefetch={false}>
            サステナビリティ
          </Link>
          <Link href="#" className="text-white hover:text-gray-200 font-bold text-sm mx-2.5" prefetch={false}>
            企業情報
          </Link>
        </div>
      </nav>

      {/* パンくずリスト */}
      <div className="w-full bg-[#F0F0F0] py-3 px-4 md:px-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="text-[#0066CC] font-bold text-sm">
                {" "}
                {/* text-xs から text-sm に変更 */}
                ホーム
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-400" />
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="text-[#0066CC] font-bold text-sm">
                {" "}
                {/* text-xs から text-sm に変更 */}
                サステナビリティ
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
