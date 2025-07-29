import {} from "lucide-react"

export default function NewsSection() {
  const newsItems = [
    {
      date: "2025.12.31",
      text: "テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テ",
    },
    {
      date: "2025.12.31",
      text: "テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テ",
    },
    {
      date: "2025.12.31",
      text: "テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テ",
    },
    {
      date: "2025.12.30",
      text: "新しいニュースアイテムです。新しいニュースアイテムです。新しいニュースアイテムです。",
    },
    {
      date: "2025.12.29",
      text: "さらに別のニュースアイテムです。さらに別のニュースアイテムです。さらに別のニュースアイテムです。",
    },
  ]

  return (
    <section className="relative w-full py-16 px-4 md:px-6 flex justify-center bg-white pb-40 pt-40">
      {" "}
      {/* 背景色を白色に変更 */}
      {/* 左上の背景オブジェクト */}
      <div
        className="absolute flex-shrink-0 rounded-full z-0"
        style={{
          width: "1000px", // サイズを1/2に
          height: "1000px", // サイズを1/2に
          top: "-500px", // 位置を調整
          left: "-500px", // 位置を左上に調整
          background: "radial-gradient(50% 50% at 50% 50%, rgba(0, 170, 67, 0.10) 0%, rgba(0, 170, 67, 0.03) 100%)",
          filter: "blur(100px)",
        }}
      ></div>
      {/* 右下の背景オブジェクト */}
      <div className="w-full max-w-5xl bg-news-bg-alpha rounded-[10px] shadow-news-card p-8 md:p-12 flex flex-col md:flex-row relative overflow-hidden items-center z-10">
        {" "}
        {/* z-indexを追加して手前に表示 */}
        {/* 左側のタイトル部分 */}
        <div className="md:w-1/4 flex flex-col items-start md:pr-8 mb-8 md:mb-0">
          <p className="text-jra-green font-semibold text-base text-center tracking-0.8 self-stretch mb-0">NEWS</p>
          <h2 className="text-[#333] text-[40px] leading-normal self-stretch text-center font-bold">お知らせ</h2>
        </div>
        {/* 右側のニュースリスト部分 */}
        <div className="md:w-3/4 flex flex-col max-h-[340px] overflow-y-scroll pr-8 custom-news-scrollbar">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-b-0 flex items-center justify-between py-8"
            >
              <div className="flex-grow">
                <p className="text-news-date-color text-sm font-medium leading-14px mb-1">{item.date}</p>
                <p className="text-[#333] text-base font-medium leading-30px">{item.text}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 ml-4 flex-shrink-0"
              >
                <ellipse cx="12" cy="12" rx="12" ry="12" transform="rotate(-90 12 12)" fill="#00AA43" />
                <path d="M11 8L15 12L11 16" stroke="white" strokeLinecap="round" />
              </svg>
            </div>
          ))}
        </div>
        {/* ��端の緑色の線 */}
      </div>
    </section>
  )
}
