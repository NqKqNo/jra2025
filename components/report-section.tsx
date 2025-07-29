import Image from "next/image"
import Link from "next/link"

export default function ReportSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F1F1F1] relative overflow-hidden">
      {/* Top curve image */}
      <div className="absolute top-0 left-0 w-full z-0">
        <Image
          src="/images/report-top-curve.png"
          alt="Report Top Curve"
          width={1920}
          height={200}
          layout="responsive"
          objectFit="contain"
          priority
        />
      </div>

      {/* Bottom curve image */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <Image
          src="/images/report-bottom-curve.png"
          alt="Report Bottom Curve"
          width={1920}
          height={200}
          layout="responsive"
          objectFit="contain"
          priority
        />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-6 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#333333]">レポート</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative w-full h-60">
              <Image src="/images/solar-panels.jpg" alt="サステナビリティレポート" layout="fill" objectFit="cover" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">サステナビリティレポート</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                JRAのサステナビリティに関する取り組みをまとめたレポートです。環境、社会、ガバナンス（ESG）の各側面における活動と成果を詳細に報告しています。
              </p>
              <Link href="#" className="inline-flex items-center text-[#C46126] hover:underline font-medium">
                詳しく見る
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative w-full h-60">
              <Image src="/images/plastic-bottles.jpg" alt="環境報告書" layout="fill" objectFit="cover" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">環境報告書</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                JRAの環境負荷低減に向けた取り組みや、環境マネジメントシステムの運用状況について報告しています。持続可能な社会の実現に貢献するための活動を紹介します。
              </p>
              <Link href="#" className="inline-flex items-center text-[#C46126] hover:underline font-medium">
                詳しく見る
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
