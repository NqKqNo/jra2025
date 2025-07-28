import Image from "next/image"

export default function EarthMainContentSection() {
  return (
    <section className="earth-action-content-section relative z-20 w-full max-w-6xl mx-auto px-4 md:px-6 flex flex-col items-start md:items-center gap-8 md:gap-16 md:flex-col py-20 pb-60 pt-20">
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16">
        {/* Left: Title Image */}
        <div className="earth-action-title-image-container flex-shrink-0 w-full md:w-1/3 flex justify-center md:justify-end flex-row items-center text-right">
          <Image
            src="/images/title_地球.png"
            alt="with 地球 JRAの環境保全活動"
            width={250}
            height={250}
            className="object-contain"
            priority
          />
        </div>

        {/* Right: Main Text Content */}
        <div className="earth-action-text-content flex-1 text-gray-700">
          <h1
            className="earth-action-main-title text-3xl md:text-4xl font-bold mb-6"
            style={{
              color: "var(--light-blue, #1FA9EA)",
              fontFamily: '"Noto Sans JP"',
              fontSize: "32px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "50px",
            }}
          >
            持続可能な社会の構築と
            <br />
            中央競馬の持続的成長を目指して
          </h1>
          <p
            className="earth-action-description-text mb-0px]3px]"
            style={{
              color: "#333",
              fontFamily: '"Noto Sans JP"',
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "30px",
            }}
          >
            JRAの事業活動は樹木・芝生・水などのさまざまな自然やサラブレッドという生き物の恵みに支えられて成り立っています。私たちは、地球環境と地域環境の保全を通じて、持続可能な社会の構築に貢献することを重要な経営課題と認識し、JRAの事業活動に伴い生じる環境への負荷を極力抑制しながら事業活動と環境との調和を図ってまいります。
          </p>
        </div>
      </div>
      <div className="earth-action-sdgs-content text-center">
        <div className="earth-action-sdgs-title-wrapper flex justify-center mb-4">
          <p
            className="earth-action-sdgs-title my-auto"
            style={{
              color: "#333",
              textAlign: "center",
              fontFamily: '"Noto Sans JP"',
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "500",
              lineHeight: "12px",
              width: "160px",
              height: "28px",
              flexShrink: "0",
              borderRadius: "77.16px",
              border: "0.772px solid #989898",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            貢献するSDGsのゴール
          </p>
        </div>
        <div className="earth-action-sdgs-icons flex flex-wrap gap-4">
          <Image
            src="/images/sdg_icon_07_ja_2.png"
            alt="SDG 7: エネルギーをみんなに そしてクリーンに"
            width={70}
            height={70}
            className="object-contain"
          />
          <Image
            src="/images/sdg_icon_12_ja_2.png"
            alt="SDG 12: つくる責任 つかう責任"
            width={70}
            height={70}
            className="object-contain"
          />
          <Image
            src="/images/sdg_icon_13_ja_2.png"
            alt="SDG 13: 気候変動に具体的な対策を"
            width={70}
            height={70}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}
