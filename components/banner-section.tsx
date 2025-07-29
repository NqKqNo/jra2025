import Image from "next/image"

export default function BannerSection() {
  return (
    <section
      className="relative w-full px-4 md:px-6 flex items-center justify-center bg-white py-10 pt-20 pb-5" // Paddingを調整
    >
      <div className="relative w-full max-w-4xl h-[160px] md:h-[160px] rounded-lg shadow-md overflow-hidden">
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
