import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative w-full bg-[#F1F1F1] py-12 md:py-20 overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/footer-background.png"
        alt="Footer Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 container mx-auto px-4 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start border-b border-white border-opacity-30 pb-8 mb-8">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <Image src="/images/jra-logo.png" alt="JRA Logo" width={120} height={60} className="mb-4" />
            <p className="text-sm text-center md:text-left">© Japan Racing Association All rights reserved.</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-lg font-medium">
            <Link href="#" className="hover:underline">
              サイトマップ
            </Link>
            <Link href="#" className="hover:underline">
              お問い合わせ
            </Link>
            <Link href="#" className="hover:underline">
              よくあるご質問
            </Link>
            <Link href="#" className="hover:underline">
              個人情報保護
            </Link>
            <Link href="#" className="hover:underline">
              著作権
            </Link>
            <Link href="#" className="hover:underline">
              免責事項
            </Link>
            <Link href="#" className="hover:underline">
              推奨環境
            </Link>
          </nav>
        </div>

        {/* Social Media and External Links */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-sm">
          <div className="flex space-x-6 mb-6 md:mb-0">
            <Link href="#" aria-label="Facebook" className="hover:opacity-75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.588-1.333h2.412v-3.996h-3.228c-3.498 0-4.772 2.006-4.772 4.667v2.333z" />
              </svg>
            </Link>
            <Link href="#" aria-label="Twitter" className="hover:opacity-75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.594 0-5.197 3.617-2.906 5.482-4.01-.2-7.54-2.012-9.94-4.725-.416.71-.66 1.53-.66 2.416 0 1.663.838 3.13 2.118 3.992-.78-.025-1.517-.245-2.165-.583v.03c0 3.981 2.827 7.292 6.593 8.063-.675.163-1.457.23-2.228.084.933 2.905 3.602 5.023 6.76 5.089-2.712 2.139-6.109 3.42-9.834 3.42-1.594 0-3.102-.099-4.604-.274 3.733 2.351 8.125 3.72 12.85 3.72 15.44 0 23.98-12.29 23.98-22.955 0-.35-.01-.698-.023-1.047.98-.71 1.83-1.6 2.51-2.61z" />
              </svg>
            </Link>
            <Link href="#" aria-label="YouTube" className="hover:opacity-75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.678.251-4.348 2.457-4.385 6.438-.037 3.98.629 6.185 4.385 6.438 3.6.245 11.626.246 15.23 0 3.678-.251 4.348-2.457 4.385-6.438.037-3.98-.629-6.185-4.385-6.438zm-11.615 9.816v-6l6 3-6 3z" />
              </svg>
            </Link>
          </div>
          <div className="text-center md:text-right">
            <p>このサイトは、JRAのサステナビリティに関する情報を掲載しています。</p>
            <p>
              競馬に関する情報については、JRA公式サイトをご覧ください。
              <Link href="https://www.jra.go.jp/" className="underline ml-2">
                JRA公式サイト
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
