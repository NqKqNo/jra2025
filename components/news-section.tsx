import Image from "next/image"
import Link from "next/link"

export default function NewsSection() {
  const newsItems = [
    {
      id: 1,
      image: "/images/uma02-1.png",
      date: "2023.10.26",
      category: "お知らせ",
      title: "JRAの社会貢献活動に関する最新情報",
      url: "#",
    },
    {
      id: 2,
      image: "/images/uma02-2.png",
      date: "2023.10.20",
      category: "イベント",
      title: "地域社会との連携イベント開催のお知らせ",
      url: "#",
    },
    {
      id: 3,
      image: "/images/uma02-3.png",
      date: "2023.10.15",
      category: "プレスリリース",
      title: "環境保全活動への新たな取り組みについて",
      url: "#",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F1F1F1] relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-6 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#333333]">ニュース</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="relative w-full h-48">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} layout="fill" objectFit="cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{item.date}</span>
                  <span className="mx-2">•</span>
                  <span>{item.category}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex-grow">{item.title}</h3>
                <Link href={item.url} className="inline-flex items-center text-[#C46126] hover:underline font-medium">
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
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link
            href="#"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#C46126] hover:bg-[#E69260] transition-colors"
          >
            ニュース一覧
          </Link>
        </div>
      </div>
    </section>
  )
}
