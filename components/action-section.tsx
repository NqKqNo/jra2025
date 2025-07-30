"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"

// SVG Icons - embedded directly due to gradients and specific paths
const EarthIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M47.6104 25.1904C47.5202 35.8453 39.645 44.6904 29.2451 46.6104C34.85 44.0054 38.7596 38.8903 40.2646 32.3105H40.2598C43.3997 30.5456 45.8904 28.1454 47.6104 25.1904ZM2.39941 24.25C4.00941 27.285 6.50012 29.8404 9.62012 31.7754V31.7695C11.0301 38.6095 15 43.9305 20.75 46.6055C10.29 44.6755 2.37988 35.74 2.37988 25C2.37988 24.75 2.38941 24.5 2.39941 24.25ZM12.0098 33.0703C15.4947 34.7253 19.58 35.7002 24 35.8252V45.7002C18.0801 43.9302 13.8148 39.3252 12.0098 33.0703ZM37.875 33.4805C36.0049 39.5252 31.7949 43.9702 26 45.7002V35.8301C30.4749 35.7251 34.475 34.9204 37.875 33.4805ZM12.6953 18.9053C15.9352 20.5751 19.7602 21.5098 24 21.6348V33.8301C19.255 33.6851 14.9348 32.5104 11.4248 30.5254C11.1248 28.7754 10.9945 26.9251 11.0645 24.9951C11.1345 23.0401 11.6953 20.9653 12.6953 18.9053ZM37.3047 18.9053C38.3047 20.9652 38.8646 23.0401 38.9346 24.9951L38.9521 25.7734C38.9678 27.5894 38.81 29.3299 38.4951 30.9746C35.0601 32.7246 30.835 33.7101 26 33.8301V21.6348C30.2398 21.5098 34.0648 20.5752 37.3047 18.9053ZM44.0947 13.2197C45.6547 15.5996 46.7495 18.2947 47.2695 21.1846L47 21.875C45.745 25.07 43.5996 27.6903 40.7246 29.6553C40.9146 28.1403 40.9897 26.5598 40.9297 24.9248C40.8397 22.445 40.1846 20.0752 39.0947 17.8604C41.0347 16.6054 42.7147 15.0497 44.0947 13.2197ZM5.9043 13.2246C7.28427 15.0546 8.96434 16.6102 10.9043 17.8652C9.81444 20.0801 9.15437 22.4499 9.06934 24.9297C9.01934 26.3547 9.06508 27.745 9.20508 29.085C6.49008 27.055 4.43934 24.4597 3.31934 21.4297L2.97461 20.4902V20.4951L2.84961 20.54C3.40961 17.895 4.4643 15.4296 5.9043 13.2246ZM24 19.6348C20.1103 19.5098 16.6102 18.6603 13.6553 17.1455C15.8603 13.5405 19.405 10.1248 24 7.6748V19.6348ZM26 7.6748C30.595 10.1198 34.1397 13.5405 36.3447 17.1455C33.3898 18.6604 29.8898 19.5098 26 19.6348V7.6748ZM33.2305 4.50977C37.0654 5.96977 40.3851 8.41542 42.8701 11.5254L42.6953 11.7646C41.4553 13.4846 39.9101 14.9354 38.1201 16.1104C35.6202 12.0604 31.6802 8.63542 27.2402 6.19043C29.1052 5.46043 31.1055 4.88477 33.2305 4.50977ZM16.7646 4.50488C18.8846 4.88487 20.89 5.45462 22.7549 6.18457C18.3149 8.62957 14.375 12.0555 11.875 16.1055C10.09 14.9305 8.54469 13.4796 7.30469 11.7646H7.2998L7.125 11.5195C9.60992 8.40474 12.9349 5.96485 16.7646 4.50488ZM24 4.61523C22.905 4.15024 21.7947 3.74527 20.6797 3.40527C21.7597 3.20527 22.87 3.07539 24 3.02539V4.61523ZM26 3.02539C27.13 3.07039 28.2403 3.20027 29.3203 3.40527C28.2053 3.74527 27.095 4.15023 26 4.61523V3.02539Z"
      fill="url(#paint0_linear_144_607)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_144_607"
        x1="2.37988"
        y1="46.6104"
        x2="51.3767"
        y2="43.5578"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2EAAE4" />
        <stop offset="1" stopColor="#50C4F2" />
      </linearGradient>
    </defs>
  </svg>
)

const LifeIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24.9999 14.3798C22.5349 8.51983 17.4449 5.40983 12.2899 6.08483C7.62991 6.69483 3.02991 12.0498 3.84491 19.9748C4.65991 27.8948 9.71491 35.6098 24.9999 44.0098C40.2849 35.6098 45.3399 27.8948 46.1549 19.9748C46.9699 12.0548 42.3699 6.69983 37.7099 6.08483C32.5499 5.40483 27.4649 8.51983 24.9999 14.3798Z"
      fill="url(#paint0_linear_144_717)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_144_717"
        x1="3.74991"
        y1="24.9998"
        x2="46.2499"
        y2="24.9998"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FB789A" />
        <stop offset="1" stopColor="#FFA5A6" />
      </linearGradient>
    </defs>
  </svg>
)

const SocietyIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.7998 3.76025C21.0698 3.76025 21.29 3.98049 21.29 4.25049V7.96045H23.0654C23.3351 7.96067 23.5545 8.17998 23.5547 8.44971V44.7603H25.8799V23.5552C25.8799 23.2852 26.1001 23.0649 26.3701 23.0649H44.2998C44.5698 23.0649 44.79 23.2852 44.79 23.5552V44.7603H49.0195C49.5595 44.7603 50 45.2103 50 45.7603C49.9999 46.3101 49.5595 46.7603 49.0195 46.7603H0.980469C0.440549 46.7603 0.000130185 46.3101 0 45.7603C0 45.2103 0.440469 44.7603 0.980469 44.7603H4.64551V8.44971C4.64567 8.17993 4.86498 7.96059 5.13477 7.96045H6.38477V4.25049C6.38477 3.98049 6.60501 3.76026 6.875 3.76025H20.7998ZM29.3301 36.7397V39.2446H41.3398V36.7397H29.3301ZM29.3301 31.9204V34.4253H41.3398V31.9204H29.3301ZM8.79004 32.6353H11.4902V30.1304H8.79004V32.6353ZM12.835 32.6353H15.5352V30.1304H12.835V32.6353ZM16.8799 32.6353H19.5801V30.1304H16.8799V32.6353ZM29.3301 27.1001V29.605H41.3398V27.1001H29.3301ZM8.79004 28.355H11.4902V25.8501H8.79004V28.355ZM12.835 28.355H15.5352V25.8501H12.835V28.355ZM16.8799 28.355H19.5801V25.8501H16.8799V28.355ZM8.79004 24.1147H11.4902V21.6099H8.79004V24.1147ZM12.835 24.1147H15.5352V21.6099H12.835V24.1147ZM16.8799 24.1147H19.5801V21.6099H16.8799V24.1147ZM8.79004 19.7153H11.4902V17.2104H8.79004V19.7153ZM12.835 19.7153H15.5352V17.2104H12.835V19.7153ZM16.8799 19.7153H19.5801V17.2104H16.8799V19.7153ZM8.79004 15.3149H11.4902V12.8101H8.79004V15.3149ZM12.835 15.3149H15.5352V12.8101H12.835V15.3149ZM16.8799 15.3149H19.5801V12.8101H16.8799V15.3149Z"
      fill="url(#paint0_linear_144_827)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_144_827"
        x1="-3.54671e-07"
        y1="46.7603"
        x2="42.5155"
        y2="-2.6764"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A279D6" />
        <stop offset="1" stopColor="#A598F0" />
      </linearGradient>
    </defs>
  </svg>
)

const HorseIcon = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M28.1299 8.90531C25.1099 7.62031 23.8049 6.70531 23.4449 6.18531C23.7999 4.95031 23.4449 0.445312 22.0099 0.445312C21.2549 1.27531 19.6899 5.00031 19.6349 5.30031C19.6199 5.37031 19.5999 5.43531 19.5849 5.50531C16.8149 5.17031 11.9849 5.66031 9.63993 12.2753C9.00993 14.0453 8.90493 15.7353 9.29493 17.2503C8.33493 18.3353 7.37993 19.4253 6.43993 20.5253C5.54993 21.5703 4.83493 22.8003 5.00993 24.2403C5.42993 27.6553 9.04493 29.5053 12.0999 27.3003C15.3149 24.9853 18.6049 24.4003 22.0899 22.9603C23.2499 22.4803 24.0499 22.2553 24.7049 23.4103C25.1799 29.1703 18.1649 30.2853 13.6299 38.2953C11.4649 42.1203 9.93493 49.5553 9.93493 49.5553H39.7099C39.7099 49.5553 40.8299 44.5703 43.3249 39.4303C49.6399 26.4203 37.0199 12.2453 28.1399 8.90531H28.1299ZM11.5199 12.9453C12.9399 8.95031 15.3749 7.66531 17.6199 7.45531C17.1599 8.19531 16.6749 9.16031 16.3599 10.3053C15.8699 12.0953 15.6899 13.7653 15.5949 15.3753C15.0499 14.7003 14.7399 14.1203 14.7349 14.1103L14.0149 12.7203L13.0599 13.9603C13.0149 14.0203 12.1799 15.1153 11.4049 17.2703C10.9299 16.0103 10.9599 14.5253 11.5249 12.9453H11.5199Z"
      fill="url(#paint0_linear_191_121)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_191_121"
        x1="4.9834"
        y1="49.5553"
        x2="53.0886"
        y2="10.3285"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C46126" />
        <stop offset="1" stopColor="#E69260" />
      </linearGradient>
    </defs>
  </svg>
)

export default function FullPageScrollComponent() {
  const fullPageScrollRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(1) // Start with section 1 active

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Number.parseInt(entry.target.getAttribute("data-index") || "1")
        setActiveIndex(index)
      }
    })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: fullPageScrollRef.current,
      rootMargin: "-50% 0px", // Trigger when the section is in the middle 50% of the viewport
      threshold: 0,
    })

    // Observe all sections
    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section)
      }
    })

    // Clean up observer on component unmount
    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.unobserve(section)
        }
      })
    }
  }, [handleIntersection])

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="page-front">
      {" "}
      {/* Replaces the <body> tag's class */}
      <div className="pageBase" data-index={activeIndex}>
        <div id="fog" className="fog">
          <div className="fog01"></div>
          <div className="fog02"></div>
        </div>
      </div>
      <div className="fullPageScroll" ref={fullPageScrollRef}>
        {/* Section 1 */}
        <section
          id="section1"
          className={`section ${activeIndex === 1 ? "active" : ""}`}
          data-index="1"
          ref={(el) => (sectionRefs.current[0] = el)}
        >
          <div className="circle">
            <div className="circle__inner">
              <div className="circle__icon">
                <EarthIcon />
              </div>
            </div>
          </div>
          <div className="section__header">
            <div className="headerInner">
              <h2>
                with<span>地球</span>
              </h2>
              <p>JRAの環境保全運動</p>
              <Link href="https://v0-jra-2025-earth-action.vercel.app/earth-action" className="button" target="_blank">
                <span className="button__text"> 取り組みを見る </span>
                <span className="button__arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 4L20 12L12 20"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M20 12H4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          <div className="section__body">
            <div className="section__block">
              <Link
                href="https://v0-jra-2025-earth-action.vercel.app/earth-action#section-1"
                className="heading"
                target="_blank"
              >
                <h2>
                  <span className="heading__number">1</span>地球温暖化防止<span className="heading__icon"></span>
                </h2>
              </Link>
              <ul className="cardList">
                <li className="card">
                  <div className="card__image">
                    <Image src="/placeholder.svg?height=100&width=150" alt="Solar panel" width={150} height={100} />
                  </div>
                  <div className="card__content">
                    <h3>太陽光発電システムの運用</h3>
                  </div>
                </li>
                <li className="card">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=100&width=150"
                      alt="Biomass power plant"
                      width={150}
                      height={100}
                    />
                  </div>
                  <div className="card__content">
                    <h3>バイオマス燃焼発電プラントの導入</h3>
                  </div>
                </li>
                <li className="card">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=100&width=150"
                      alt="Energy monitoring system"
                      width={150}
                      height={100}
                    />
                  </div>
                  <div className="card__content">
                    <h3>エネルギーコントロールのための監視システム</h3>
                  </div>
                </li>
              </ul>
            </div>
            <div className="section__block">
              <Link
                href="https://v0-jra-2025-earth-action.vercel.app/earth-action#section-2"
                className="heading"
                target="_blank"
              >
                <h2>
                  <span className="heading__number">2</span>資源循環型社会の構築への貢献
                  <span className="heading__icon"></span>
                </h2>
              </Link>
              <ul className="cardList">
                <li className="card">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=100&width=150"
                      alt="Recycled plastic bottles"
                      width={150}
                      height={100}
                    />
                  </div>
                  <div className="card__content">
                    <h3>ペットボトルを調教用ゼッケンへ</h3>
                  </div>
                </li>
                <li className="card">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=100&width=150"
                      alt="Recycled training bibs"
                      width={150}
                      height={100}
                    />
                  </div>
                  <div className="card__content">
                    <h3>調教用ゼッケンをさらにリサイクル</h3>
                  </div>
                </li>
                <li className="card">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=100&width=150"
                      alt="Rainwater harvesting"
                      width={150}
                      height={100}
                    />
                  </div>
                  <div className="card__content">
                    <h3>雨水の循環型有効活用</h3>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section
          id="section2"
          className={`section ${activeIndex === 2 ? "active" : ""}`}
          data-index="2"
          ref={(el) => (sectionRefs.current[1] = el)}
        >
          <div className="circle">
            <div className="circle__inner">
              <div className="circle__icon">
                <LifeIcon />
              </div>
            </div>
          </div>
          <div className="section__header">
            <div className="headerInner">
              <h2>
                with<span>生命</span>
              </h2>
              <p>JRAの環境保全運動</p>
              <Link href="#" className="button" target="_blank">
                <span className="button__text"> 取り組みを見る </span>
                <span className="button__arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 4L20 12L12 20"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M20 12H4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          <div className="section__body">
            <div className="section__block">
              <Link href="#" className="heading">
                <h2>
                  <span className="heading__number">1</span>国庫納付金について<span className="heading__icon"></span>
                </h2>
              </Link>
              <ul className="cardList">
                <li className="card card--large">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="National treasury payment breakdown"
                      width={300}
                      height={200}
                    />
                  </div>
                  <div className="card__content">
                    <h3>国庫納付金の内訳について</h3>
                  </div>
                </li>
              </ul>
            </div>
            <div className="section__block">
              <Link href="#" className="heading">
                <h2>
                  <span className="heading__number">2</span>畜産振興を支える活動<span className="heading__icon"></span>
                </h2>
              </Link>
              <ul className="cardList">
                <li className="card">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=100&width=150"
                      alt="Livestock research"
                      width={150}
                      height={100}
                    />
                  </div>
                  <div className="card__content">
                    <h3>畜産技術の研究開発</h3>
                  </div>
                </li>
                <li className="card">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=100&width=150"
                      alt="Animal disease prevention"
                      width={150}
                      height={100}
                    />
                  </div>
                  <div className="card__content">
                    <h3>家畜感染症への対策</h3>
                  </div>
                </li>
                <li className="card">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=100&width=150"
                      alt="Next generation talent development"
                      width={150}
                      height={100}
                    />
                  </div>
                  <div className="card__content">
                    <h3>次世代の人材育成サポート</h3>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section
          id="section3"
          className={`section ${activeIndex === 3 ? "active" : ""}`}
          data-index="3"
          ref={(el) => (sectionRefs.current[2] = el)}
        >
          <div className="circle">
            <div className="circle__inner">
              <div className="circle__icon">
                <SocietyIcon />
              </div>
            </div>
          </div>
          <div className="section__header">
            <div className="headerInner">
              <h2>
                with<span>社会</span>
              </h2>
              <p>地域・社会との協調</p>
              <Link href="#" className="button" target="_blank">
                <span className="button__text"> 取り組みを見る </span>
                <span className="button__arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 4L20 12L12 20"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M20 12H4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          <div className="section__body">
            <div className="section__block">
              <Link href="#" className="heading">
                <h2>
                  <span className="heading__number">1</span>国庫納付金<span className="heading__icon"></span>
                </h2>
              </Link>
              <ul className="cardList">
                <li className="card card--large">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="National treasury payment breakdown"
                      width={300}
                      height={200}
                    />
                  </div>
                  <div className="card__content">
                    <h3>国庫納付金の内訳について</h3>
                  </div>
                </li>
              </ul>
            </div>
            <div className="section__block">
              <Link href="#" className="heading">
                <h2>
                  <span className="heading__number">2</span>地域社会への貢献活動<span className="heading__icon"></span>
                </h2>
              </Link>
              <ul className="cardList">
                <li className="card">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=100&width=150"
                      alt="Disaster relief shelter"
                      width={150}
                      height={100}
                    />
                  </div>
                  <div className="card__content">
                    <h3>災害時の一時避難場所や備蓄品の提供</h3>
                  </div>
                </li>
                <li className="card">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=100&width=150"
                      alt="Medical equipment donation"
                      width={150}
                      height={100}
                    />
                  </div>
                  <div className="card__content">
                    <h3>医療機関や教育機関への備品贈呈</h3>
                  </div>
                </li>
                <li className="card">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=100&width=150"
                      alt="Local government support"
                      width={150}
                      height={100}
                    />
                  </div>
                  <div className="card__content">
                    <h3>地元行政や公共交通機関への支援</h3>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section
          id="section4"
          className={`section ${activeIndex === 4 ? "active" : ""}`}
          data-index="4"
          ref={(el) => (sectionRefs.current[3] = el)}
        >
          <div className="circle">
            <div className="circle__inner">
              <div className="circle__icon">
                <HorseIcon />
              </div>
            </div>
          </div>
          <div className="section__header">
            <div className="headerInner">
              <h2>
                with<span>馬</span>
              </h2>
              <p>馬との共生</p>
              <Link href="#" className="button" target="_blank">
                <span className="button__text"> 取り組みを見る </span>
                <span className="button__arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 4L20 12L12 20"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M20 12H4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          <div className="section__body">
            <div className="section__block">
              <Link href="#" className="heading">
                <h2>
                  <span className="heading__number">1</span>JRAの馬文化と産業の発展
                  <span className="heading__icon"></span>
                </h2>
              </Link>
              <ul className="cardList">
                <li className="card">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=100&width=150"
                      alt="Horse culture development"
                      width={150}
                      height={100}
                    />
                  </div>
                  <div className="card__content">
                    <h3>馬文化の発展への貢献</h3>
                  </div>
                </li>
                <li className="card">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=100&width=150"
                      alt="Horse culture inheritance"
                      width={150}
                      height={100}
                    />
                  </div>
                  <div className="card__content">
                    <h3>馬文化の継承への貢献</h3>
                  </div>
                </li>
              </ul>
            </div>
            <div className="section__block">
              <Link href="#" className="heading">
                <h2>
                  <span className="heading__number">2</span>次世代育成<span className="heading__icon"></span>
                </h2>
              </Link>
              <ul className="cardList">
                <li className="card">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=100&width=150"
                      alt="KidZania Koshien Horse Park Pavilion"
                      width={150}
                      height={100}
                    />
                  </div>
                  <div className="card__content">
                    <h3>
                      キッザニア甲子園
                      <br />
                      「ホースパークパビリオン」出展
                    </h3>
                  </div>
                </li>
                <li className="card">
                  <div className="card__image">
                    <Image
                      src="/placeholder.svg?height=100&width=150"
                      alt="National Pony Race Championship Jockey Babies"
                      width={150}
                      height={100}
                    />
                  </div>
                  <div className="card__content">
                    <h3>
                      全国ポニー競馬選手権
                      <br />
                      「ジョッキーベイビーズ」の開催
                    </h3>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      <nav id="pagination" className="pagination">
        {[1, 2, 3, 4].map((index) => (
          <a
            key={`pagination${index}`}
            id={`pagination${index}`}
            href={`#section${index}`}
            className={activeIndex === index ? "active" : ""}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection(`section${index}`)
            }}
          ></a>
        ))}
      </nav>
    </div>
  )
}
