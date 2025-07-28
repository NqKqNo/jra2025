import Image from "next/image"

export default function CmGallerySection() {
  return (
    <section
      className="relative w-full px-4 md:px-6 flex flex-col items-center justify-center overflow-hidden py-60"
      style={{
        background: "#F1F1F1", // 背景色を#F1F1F1に変更
      }}
    >
      <Image
        src="/images/report-bottom-curve.png"
        alt="Bottom Curve"
        width={1920}
        height={300}
        className="absolute top-0 left-0 w-full h-auto z-0"
        style={{ objectPosition: "top" }}
      />
      {/* 背景左上の装飾 */}
      <div
        className="absolute flex-shrink-0 rounded-full z-0"
        style={{
          width: "779px",
          height: "779px",
          top: "-200px", // 位置を調整
          left: "-400px", // 位置を左上に調整
          background: "radial-gradient(50% 50% at 50% 50%, rgba(0, 170, 67, 0.10) 0%, rgba(0, 170, 67, 0.03) 100%)",
          filter: "blur(100px)",
        }}
      ></div>

      {/* 背景右下の装飾 */}
      <div
        className="absolute flex-shrink-0 rounded-full z-0"
        style={{
          width: "1302px",
          height: "1302px",
          bottom: "-400px", // 位置を調整
          right: "-600px", // 位置を右下に調整
          background: "radial-gradient(50% 50% at 50% 50%, rgba(126, 223, 84, 0.10) 0%, rgba(126, 223, 84, 0.03) 100%)",
          filter: "blur(100px)",
        }}
      ></div>

      <div className="w-full max-w-4xl flex flex-col gap-y-10">
        {/* トップバナー: Be With. CMギャラリー */}
        <div className="w-full h-32 md:h-40 bg-[#D9D9D9] rounded-lg flex items-center justify-center shadow-md">
          <div className="flex items-center gap-2">
            <Image
              src="/images/bewith_logo.png" // 既存のロゴを使用
              alt="Be With."
              width={100}
              height={50}
              className="object-contain"
            />
            <span className="text-[#333333] text-lg md:text-xl font-bold">CMギャラリー</span>
          </div>
        </div>
        {/* 中央バナー: プロモーションコンテンツバナー (仮) */}
        <div className="w-full h-32 md:h-40 bg-[#D9D9D9] rounded-lg flex items-center justify-center shadow-md">
          <p className="text-[#666666] text-lg md:text-xl font-bold">※プロモーションコンテンツバナー (仮)</p>
        </div>
        {/* 下部バナー: プロモーションコンテンツバナー (仮) */}
        <div className="w-full h-32 md:h-40 bg-[#D9D9D9] rounded-lg flex items-center justify-center shadow-md">
          <p className="text-[#666666] text-lg md:text-xl font-bold">※プロモーションコンテンツバナー (仮)</p>
        </div>
      </div>
    </section>
  )
}
