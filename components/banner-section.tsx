import Image from "next/image"

export default function BannerSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F1F1F1] relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#333333]">
            JRAの取り組みを
            <br className="sm:hidden" />
            もっと知る
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg overflow-hidden group">
              <Image
                src="/images/net-touhyou-login.png"
                alt="ネット投票ログイン"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white text-xl font-semibold">ネット投票ログイン</h3>
              </div>
            </div>
            <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg overflow-hidden group">
              <Image
                src="/images/otoiawase-faq.png"
                alt="お問い合わせ・FAQ"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white text-xl font-semibold">お問い合わせ・FAQ</h3>
              </div>
            </div>
            <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg overflow-hidden group">
              <Image
                src="/images/uma02-1.png"
                alt="馬02+ 1"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white text-xl font-semibold">馬02+ 1</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
