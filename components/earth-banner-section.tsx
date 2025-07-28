import Image from "next/image"

export default function EarthBannerSection() {
  return (
    <section className="earth-banner-section relative w-full py-20 px-4 md:px-0 shadow-none pt-9 pb-44">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="w-full h-[150px] bg-[#D9D9D9] rounded-lg flex items-center justify-center text-gray-600 text-lg font-medium shadow-none">
          ※関連コンテンツバナー（仮）
        </div>
        <div className="w-full h-[150px] bg-[#D9D9D9] rounded-lg flex items-center justify-center text-gray-600 text-lg font-medium shadow-none mb-10">
          ※関連コンテンツバナー（仮）
        </div>
      </div>
      {/* 背景画像 */}
      <Image
        src="/images/circle-green-curve.png" // 画像を新しいものに差し替え
        alt="背景の曲線"
        width={1920} // 幅を大きく設定して、画面幅いっぱいに広がるようにする
        height={100} // 画像の元の高さに合わせて設定
        className="absolute bottom-0 left-0 w-full h-auto object-cover z-0"
      />
    </section>
  )
}
