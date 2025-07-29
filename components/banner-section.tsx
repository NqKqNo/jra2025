export default function BannerSection() {
  return (
    <section
      className="relative w-full px-4 md:px-6 flex items-center justify-center bg-white py-40 pb-0" // 背景色を削除し、relativeを追加
    >
      <div className="w-full max-w-4xl h-32 md:h-40 bg-[#D9D9D9] rounded-lg flex items-center justify-center shadow-md z-10">
        {" "}
        {/* z-indexを追加して手前に表示 */}
        <p className="text-[#666666] text-lg md:text-xl font-bold">※スペシャルコンテンツバナー</p>
      </div>
    </section>
  )
}
