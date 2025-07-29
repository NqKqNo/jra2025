import Image from "next/image"
import Link from "next/link"
import { Download } from "lucide-react"

export default function ReportSection() {
  return (
    <section
      className="relative w-full min-h-[100vh] flex flex-col items-center justify-start text-white px-4 md:px-6 overflow-hidden pt-40 pb-40"
      style={{ background: "linear-gradient(180deg, #0A9F31 0%, #05A15E 50%, #01A285 90.38%)" }}
    >
      {/* Top curved background image */}
      <Image
        src="/images/report-top-curve.png"
        alt="Top Curve"
        width={1920} // 元画像の幅
        height={300} // 元画像の高さ
        className="absolute top-0 left-0 w-full h-auto z-0"
        style={{ objectPosition: "top" }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto pt-20 pb-20">
        <h2 className="text-[94px] font-semibold mb-6 uppercase tracking-[1.88px]">IMPACT REPORT 2025</h2>
        <p className="text-base md:text-lg mb-12 max-w-2xl">
          重要課題と成果を発信。説明テキストを入れます。説明テキストを入れます。
          <br />
          説明テキストを入れます。説明テキストを入れます。説明テキストを入れます。
        </p>

        {/* Report preview placeholder */}
        <div className="w-full max-w-[700px] bg-[#D9D9D9] rounded-lg mb-12 flex items-center justify-center h-[400px]">
          <p className="text-[#666666] text-lg md:text-xl font-bold">レポートプレビュー</p>
        </div>

        {/* PDF Download Link */}
        <Link
          href="#"
          className="flex items-center gap-2 text-white text-base md:text-lg underline hover:no-underline"
          prefetch={false}
        >
          PDFダウンロード
          <Download className="w-5 h-5" />
        </Link>
      </div>
    </section>
  )
}
