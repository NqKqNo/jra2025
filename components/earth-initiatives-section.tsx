"use client" // クライアントコンポーネントとしてマーク

import Image from "next/image"
import CustomHorizontalScrollbar from "@/components/custom-horizontal-scrollbar"
import { useEffect } from "react" // useEffectをインポート

export default function EarthInitiativesSection() {
  const initiativesData = [
    {
      id: 1,
      mainTitle: "地球温暖化防止",
      description:
        "JRAは、温室効果ガス（GHG）排出量削減に向けた取り組みを推進し、環境負荷低減に努めるとともに、発電施設を保有・運用するにあたっては、その特性に応じた再生可能エネルギーを活用することで、低炭素社会の実現にも貢献しています。",
      items: [
        {
          image: "/images/太陽光発電システムの運用.jpg",
          alt: "太陽光パネル",
          title: "太陽光発電システムの運用",
          text: "東京、中山、中京、京都、阪神、小倉の6場では、広大なスタンドの屋根に太陽光パネルを設置し、競馬開催で必要な電力の一部を太陽光発電システムを活用しています。",
          illustration: {
            type: "custom",
            content: (
              <div className="flex flex-col items-start p-2 text-left w-full px-0 py-0">
                <h5 className="text-[#2EAAE4] text-base font-bold mb-2">クリーンエネルギー競馬</h5>
                <p className="text-[#333] text-sm mb-8">
                  特定の競馬開催日の「クリーンエネルギー競馬」では、使用電力をすべて再生可能エネルギーで行います。
                  1開催あたり、約12万kWhの電力をまかない、約54万トンのCO2の削減を実現しました。
                </p>
                <div className="w-full flex justify-center bg-transparent rounded-md mb-0 relative pt-[calc(150/400*100%)]">
                  <Image
                    src="/images/太陽光発電システムの運用_illust.png"
                    alt="太陽光発電システムの運用イラスト"
                    fill
                    objectFit="contain"
                  />
                </div>
              </div>
            ),
          },
        },
        {
          image: "/images/バイオマス燃焼発電プラントの導入.jpg",
          alt: "バイオマス発電プラント",
          title: "バイオマス燃焼発電プラントの導入",
          text: "トレーニングセンターや競馬場などの厩舎や診療所、乗馬普及施設の馬房に敷く、使用済みの馬房敷料を燃料にし、毎日絶え間なく排出されるJRAの資源で地球温暖化防止につながるクリーンな発電方法、バイオマス発電プラントを運用しています。",
          illustration: {
            type: "custom",
            content: (
              <div className="flex flex-col items-start p-2 text-left w-full px-0 py-0">
                <h5 className="text-[#2EAAE4] text-base font-bold mb-2">発電量</h5>
                <p className="text-[#333] text-sm mb-8">
                  年間発電量は、330万～350万kWh/年。これはトレーニングセンターで1年間に使用される電力量の約半分に相当します。
                </p>
                <div className="w-full flex justify-center bg-transparent rounded-md mb-0 relative pt-[calc(140/507*100%)]">
                  <Image
                    src="/images/バイオマス燃焼発電プラントの導入_illust.png"
                    alt="バイオマス発電量イラスト"
                    fill
                    objectFit="contain"
                  />
                </div>
              </div>
            ),
          },
        },
        {
          image: "/images/エネルギーコントロールのための監視システム.jpg",
          alt: "監視システム",
          title: "エネルギーコントロールのための監視システム",
          text: "競馬場のスタンド内にある「中央監視室」では、競馬開催日に使用するエネルギーの総合コントロールを行っています。お客様の快適な観戦環境を配慮したうえで、温室効果ガス（CO2）排出量の削減など、省エネルギーに努めています",
          illustration: {
            type: "custom",
            content: (
              <div className="flex flex-col items-start p-2 text-left w-full px-0 py-0">
                <h5 className="text-[#2EAAE4] text-base font-bold mb-2">温室効果ガス（CO2）削減</h5>
                <p className="text-[#333] text-sm mb-8">CO2排出量は、1年間で約23%削減しています。</p>
                <div className="w-full flex justify-center bg-transparent rounded-md mb-0 relative pt-[calc(100/250*100%)]">
                  <Image
                    src="/images/エネルギーコントロールのための監視システム_illust.png"
                    alt="年間CO2排出量イラスト"
                    fill
                    objectFit="contain"
                  />
                </div>
              </div>
            ),
          },
        },
      ],
    },
    {
      id: 2,
      mainTitle: "資源循環型社会の構築への貢献",
      description:
        "JRAでは、持続可能な社会の実現に向け、資源の有効活用や廃棄物の発生抑制、再利用・再生利用に取り組むことで、環境負荷の低減と資源循環型社会の構築に貢献しています。",
      items: [
        {
          image: "/images/ペットボトルを調教用ゼッケンへ.jpg",
          alt: "ペットボトル",
          title: "ペットボトルを調教用ゼッケンへ",
          text: "競馬場やウインズにおいては、日々大量のペットボトルがごみとして排出されています。その中で、中山競馬場では回収したペットボトルの一部を繊維化（再生ポリエステル綿）し、調教に用いるゼッケンの材料布としてリサイクルしています。「競馬の中で完全循環リサイクル」というJRAならではの取組みです。",
          illustration: {
            type: "custom", // imageからcustomに変更
            content: (
              <div className="flex flex-col items-start p-2 text-left w-full py-0 px-0">
                <h5 className="text-[#2EAAE4] text-base font-bold mb-2">調教用ゼッケン</h5>
                <p className="text-[#333] text-sm mb-8">
                  調教用ゼッケンは粉砕されたフレークからリサイクル。1枚あたり500mlペットボトル12本分。
                </p>
                <div className="w-full flex justify-center bg-transparent rounded-md py-0 mb-0 relative pt-[calc(100/250*100%)]">
                  <Image
                    src="/images/ペットボトルを調教用ゼッケンへ_illust.png"
                    alt="ペットボトルリサイクルイラスト"
                    fill
                    objectFit="contain"
                  />
                </div>
              </div>
            ),
          },
        },
        {
          image: "/images/調教用ゼッケンをさらにリサイクル.jpg",
          alt: "リサイクルゼッケン",
          title: "調教用ゼッケンをさらにリサイクル",
          text: "JRA美浦トレーニング・センターで実際に使用された調教用ゼッケンを、茨城県内の障害者支援施設で洗浄し、職人が一つひとつ手造りをして販売。売上の一部は、茨城県内の障害者福祉団体及び支援施設に寄付されています。",
          illustration: {
            type: "custom", // imageからcustomに変更
            content: (
              <div className="flex flex-col items-start p-2 text-left w-full py-0 px-0">
                <h5 className="text-[#2EAAE4] text-base font-bold mb-2">調教用ゼッケン</h5>

                <div className="w-full flex justify-center bg-transparent rounded-md mb-0 py-0 relative pt-[calc(100/250*100%)]">
                  <Image
                    src="/images/調教用ゼッケンをさらにリサイクル_illust.png"
                    alt="調教用ゼッケンリサイクルイラスト"
                    fill
                    objectFit="contain"
                  />
                </div>
              </div>
            ),
          },
        },
        {
          image: "/images/雨水の循環型有効活用.jpg",
          alt: "雨水利用",
          title: "雨水の循環型有効活用",
          text: "広大な敷地を持つJRAならではの資源循環型取組みとして、スタンドに降った雨水を一度地下の水槽に貯蔵し、コース管理に使用する馬場散水やスタンドトイレの洗浄水として再利用を行っています。",
          illustration: {
            type: "custom", // imageからcustomに変更
            content: (
              <div className="flex flex-col items-start p-2 text-left w-full px-0 py-0">
                <h5 className="text-[#2EAAE4] text-base font-bold mb-2">水源の節約量</h5>

                <div className="w-full flex justify-center bg-transparent rounded-md py-0 mb-0 relative pt-[calc(100/250*100%)]">
                  <Image
                    src="/images/雨水の循環型有効活用_illust.png"
                    alt="雨水循環イラスト"
                    fill
                    objectFit="contain"
                  />
                </div>
              </div>
            ),
          },
        },
      ],
    },
  ]

  useEffect(() => {
    /* horizontal scroll */
    const stickyContainers = document.querySelectorAll(".horizontal_scroll")
    stickyContainers.forEach((stickyContainer) => {
      // get elements
      const stickyItem = stickyContainer.querySelector(".sticky")
      const scroller = stickyContainer.querySelector(".scroller")

      if (!stickyItem || !scroller) {
        console.warn("Missing .sticky or .scroller element in horizontal_scroll container.")
        return
      }

      // set sticky height
      const updateStickyHeight = () => {
        const stickyHeight = scroller.scrollWidth - scroller.clientWidth + stickyItem.clientHeight
        stickyContainer.style.setProperty("--sticky-container-height", `${stickyHeight}px`)
      }
      updateStickyHeight()
      new ResizeObserver(updateStickyHeight).observe(scroller)
      new ResizeObserver(updateStickyHeight).observe(stickyItem)

      // sync scroll
      const syncScroll = () => {
        const rect = stickyContainer.getBoundingClientRect()
        if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
          scroller.scrollLeft = window.scrollY - stickyContainer.offsetTop
        } else if (rect.bottom < window.innerHeight) {
          scroller.scrollLeft = scroller.scrollWidth - scroller.clientWidth
        } else {
          scroller.scrollLeft = 0
        }
      }
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              window.addEventListener("scroll", syncScroll, { passive: true })
              syncScroll() // Ensure correct position on initial load/intersection
            } else {
              window.removeEventListener("scroll", syncScroll)
            }
          })
        },
        { threshold: 0 }, // intersectionRatioが0を超えたら発火
      )
      observer.observe(stickyContainer)
    })
  }, []) // 空の依存配列でマウント時に一度だけ実行

  return (
    <section className="earth-initiatives-section relative w-full py-20 px-4 bg-[#FFFFFF] md:px-0 pt-5">
      {/* New background decoration 02 section */}
      <div
        className="absolute bottom-0 right-0"
        style={{
          width: "1516px",
          height: "1516px",
          flexShrink: 0,
          aspectRatio: "1 / 1",
          zIndex: 0,
          pointerEvents: "none",
          transform: "translateX(50%)", // Pushes it 50% of its own width to the right
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1916 1916" fill="none">
          <g filter="url(#filter0_fn_38_1321)">
            <circle cx="958" cy="958" r="758" fill="url(#paint0_radial_38_1321)" fillOpacity="0.3" />
          </g>
          <defs>
            <filter
              id="filter0_fn_38_1321"
              x="0"
              y="0"
              width="1916"
              height="1916"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_38_1321" />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1 1"
                stitchTiles="stitch"
                numOctaves="3"
                result="noise"
                seed="5265"
              />
              <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                <feFuncA
                  type="discrete"
                  tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
                />
              </feComponentTransfer>
              <feComposite
                operator="in"
                in2="effect1_foregroundBlur_38_1321"
                in="coloredNoise1"
                result="noise1Clipped"
              />
              <feFlood floodColor="#2EAAE4" result="color1Flood" />
              <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
              <feMerge result="effect2_noise_38_1321">
                <feMergeNode in="effect1_foregroundBlur_38_1321" />
                <feMergeNode in="color1" />
              </feMerge>
            </filter>
            <radialGradient
              id="paint0_radial_38_1321"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(958 958) rotate(90) scale(758)"
            >
              <stop stopColor="#2EAAE4" />
              <stop offset="1" stopColor="#2EAAE4" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="earth-initiatives-title-wrapper max-w-6xl mx-auto">
        {/* Section Title */}
        <h2
          className="text-[48px] text-center mb-16 font-medium"
          style={{
            fontFamily: '"Noto Sans JP"',
            lineHeight: "84px",
          }}
        >
          <span
            className="earth-initiatives-title-blue"
            style={{
              background: "linear-gradient(87deg, #2EAAE4 0%, #50C4F2 102.59%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            「 地球 」
          </span>
          <span
            className="earth-initiatives-title-black"
            style={{
              color: "#333",
            }}
          >
            に対する取り組み
          </span>
        </h2>

        {initiativesData.map((section) => (
          <div key={section.id} id={`section-${section.id}`} className="horizontal_scroll mb-20 last:mb-0">
            {/* Sub-section Title and Description - these scroll vertically before sticky part */}
            <div className="earth-initiatives-subsection-header relative flex flex-col px-4 md:px-0 w-full max-w-3xl mx-auto gap-8 text-left items-start my-auto">
              {/* 背景装飾01セクション */}
              <div
                className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2"
                style={{
                  width: "1026px",
                  height: "1026px",
                  aspectRatio: "1 / 1",
                  filter: "blur(100px)", // CSSでフィルターを適用
                  zIndex: 0, // コンテンツの下に配置
                  pointerEvents: "none", // イベントをブロックしない
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 1130 1426" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_fn_38_1317)">
                    <circle cx="417" cy="713" r="513" fill="url(#paint0_radial_38_1317)" fillOpacity="0.3" />
                  </g>
                  <defs>
                    <filter
                      id="filter0_fn_38_1317"
                      x="-296"
                      y="0"
                      width="1426"
                      height="1426"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                      <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_38_1317" />
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="1 1"
                        stitchTiles="stitch"
                        numOctaves="3"
                        result="noise"
                        seed="5265"
                      />
                      <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                      <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA
                          type="discrete"
                          tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
                        />
                      </feComponentTransfer>
                      <feComposite
                        operator="in"
                        in2="effect1_foregroundBlur_38_1317"
                        in="coloredNoise1"
                        result="noise1Clipped"
                      />
                      <feFlood floodColor="#2EAAE4" result="color1Flood" />
                      <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                      <feMerge result="effect2_noise_38_1321">
                        <feMergeNode in="effect1_foregroundBlur_38_1317" />
                        <feMergeNode in="color1" />
                      </feMerge>
                    </filter>
                    <radialGradient
                      id="paint0_radial_38_1317"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(417 713) rotate(90) scale(513)"
                    >
                      <stop stopColor="#2EAAE4" />
                      <stop offset="1" stopColor="#2EAAE4" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              <div className="earth-initiatives-number-container flex items-center mb-0 text-left">
                <div
                  className="earth-initiatives-number-circle w-[88px] h-[52px] flex-shrink-0 text-[#1FA9EA] flex items-center justify-center text-[30px] leading-[20px] font-light"
                  style={{
                    borderRadius: "26px",
                    border: "1px solid #97C6DC",
                    background: "#F1F6F6",
                    boxShadow: "5px 5px 10px 0px #FFF, -3px -3px 5px 0px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  {section.id}
                </div>
                <h3
                  className="earth-initiatives-subsection-title text-[28px] leading-[32px] font-semibold ml-4"
                  style={{
                    background: "linear-gradient(87deg, #2EAAE4 0%, #50C4F2 102.59%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {section.mainTitle}
                </h3>
              </div>
              <p className="earth-initiatives-subsection-description text-gray-700 max-w-3xl text-base leading-relaxed mb-0">
                {section.description}
              </p>
            </div>

            {/* This is the element that becomes sticky and contains the horizontal scroller */}
            <div className="sticky">
              <CustomHorizontalScrollbar trackWidth="160px" trackHeight="10px">
                {/* The actual content that will horizontally scroll */}
                <div className="earth-initiatives-cards-container flex flex-nowrap pb-12 pr-10">
                  {section.items.map((item, index) => (
                    <div
                      key={index}
                      className="earth-initiatives-card flex-shrink-0 snap-center mx-2 p-16 flex overflow-hidden rounded-[10px] h-auto w-full max-w-full md:max-w-[1000px] md:mx-3"
                      style={{
                        background: "rgba(241, 241, 241, 0.75)",
                        boxShadow: "-3px -3px 8px 0px #FFF, 5px 5px 10px 0px rgba(0, 0, 0, 0.10)",
                      }}
                    >
                      {/* Left: Image */}
                      <div className="earth-initiatives-card-image-container w-1/2 h-full relative overflow-hidden rounded-none mx-0 px-2.5 py-2.5 rounded-none">
                        <Image src={item.image || "/placeholder.svg"} alt={item.alt} layout="fill" objectFit="cover" />
                      </div>

                      {/* Right: Content */}
                      <div className="earth-initiatives-card-content w-1/2 h-full flex flex-col items-start text-left p-8 px-16 py-0 pr-0 pl-12">
                        <h4
                          className="earth-initiatives-card-title mb-4"
                          style={{
                            color: "#333",
                            fontFamily: '"Noto Sans JP"',
                            fontSize: "24px",
                            fontStyle: "normal",
                            fontWeight: "700",
                            lineHeight: "40px",
                          }}
                        >
                          {item.title}
                        </h4>
                        <p className="earth-initiatives-card-text text-sm text-gray-700 self-stretch mb-6">
                          {item.text}
                        </p>
                        {item.illustration && (
                          <div className="earth-initiatives-card-illustration w-full flex justify-center bg-transparent rounded-md mb-0 py-0">
                            {item.illustration.type === "image" ? (
                              <Image
                                src={item.illustration.src || "/placeholder.svg"}
                                alt={item.illustration.alt}
                                width={250}
                                height={100}
                                objectFit="contain"
                              />
                            ) : (
                              item.illustration.content
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CustomHorizontalScrollbar>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
