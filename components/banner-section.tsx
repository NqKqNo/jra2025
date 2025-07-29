import Image from "next/image"

export default function BannerSection() {
  return (
    <section
      className="relative w-full px-4 md:px-6 flex items-center justify-center bg-white py-10 pt-20 pb-5" // Paddingを調整
    >
      <div
        className="relative w-full max-w-4xl rounded-lg shadow-md overflow-hidden"
        style={{ height: "160px" }} // ← 明示的にここで高さ指定
      >
        <Image
          src="/images/banner-special-content.png"
          alt="JRA サステナジャーニー バナー"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>
    </section>
  )
}
