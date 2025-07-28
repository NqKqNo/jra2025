"use client" // クライアントコンポーネントとしてマーク

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image" // Imageコンポーネントをインポート

// ScrollTriggerプラグインを登録
gsap.registerPlugin(ScrollTrigger)

export default function SocialSustainabilityActionTitleSection() {
  useEffect(() => {
    // アニメーションターゲットとなる各span要素を取得
    const textLines = gsap.utils.toArray(".animated-text-line")
    const horseImages = gsap.utils.toArray(".horse-animation") // 馬の画像要素を取得

    // 各ラインのテキス��の初期状態を設定
    gsap.set(textLines, { opacity: 0, y: "20%" })
    // 馬の画像の初期状態を設定 (非表示で左にオフセット)
    gsap.set(horseImages, { opacity: 0, x: -100 })

    // メインのスクロールトリガー付きタイムラインを作成
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".social-sustainability-title-container", // h2を囲むdivをトリガーに設定
        start: "top bottom-=20%", // ビューポートの下から20%のところで開始
        once: true, // 一度だけアニメーション
      },
    })

    // 各テキストラインに対してアニメーションを設定
    textLines.forEach((line, index) => {
      // 各ラインのアニメーションを同期させるためのサブタイムライン
      const lineTl = gsap.timeline()

      // ワイプアニメーション (::before要素)
      lineTl.fromTo(
        line,
        {
          "--before-width": "100%", // 開始時は全体を覆う
          "--before-left": "0%", // 左端から開始
        },
        {
          "--before-width": "0%", // 幅を0%に
          "--before-left": "100%", // 左端を100%に (右に移動して消える)
          duration: 0.8, // ワイプの速度
          ease: "power2.inOut",
        },
        0, // サブタイムラインの開始位置
      )

      // テキスト表示アニメーション (opacityとy-position)
      lineTl.to(
        line,
        {
          opacity: 1,
          y: "0%",
          duration: 0.8, // テキストアニメーションの速度
          ease: "power3.out", // ユーザー指定の"poser3.out"に最も近い標準イーズ
        },
        0.1, // ワイプが少し始まった後にテキストアニメーションを開始
      )

      // 各ラインのアニメーションをメインタイムラインに stagger で追加
      tl.add(lineTl, index * 0.1) // 各ラインを0.1秒ずつ遅延させて開始
    })

    // テキストアニメーション終了後に馬の画像をアニメーション
    tl.add(
      () => {
        gsap.to(".horse-top", {
          opacity: 1,
          x: 150, // 右に20px移動
          duration: 1,
          ease: "power2.out",
        })
        gsap.to(".horse-middle", {
          opacity: 1,
          x: 0, // 左に10px移動
          duration: 1,
          ease: "power2.out",
        })
        gsap.to(".horse-bottom", {
          opacity: 1,
          x: 90, // 右に50px移動
          duration: 1,
          ease: "power2.out",
        })
      },
      "+=0.5", // テキストアニメーションの終了から0.5秒後に開始
    )
  }, [])

  return (
    <section className="relative w-full min-h-[300px] flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden bg-gradient-to-b from-[#FFFFFF] to-[#F1F1F1] pb-40">
      {/* 垂直線 */}

      {/* 左下の曲線オブジェクト */}

      {/* タイトルテキストと馬の画像 */}
      <div className="relative z-10 flex items-center justify-center social-sustainability-title-container">
        <h2
          className="text-center font-semibold text-[80px] leading-[92px] tracking-[1.6px] uppercase"
          // style から gradient background-clip 関連のスタイルを削除
        >
          <span className="animated-text-line block">SOCIAL</span>
          <span className="animated-text-line block">SUSTAINABILITY</span>
          <span className="animated-text-line block">ACTION</span>
        </h2>
        {/* 馬の画像、h2の右側に絶対配置 */}
        <Image
          src="/images/馬02+ 3.png"
          alt="Running Horse"
          width={100}
          height={100}
          className="absolute horse-animation horse-top"
          style={{ right: "-100px", top: "-4px" }} // topはh2の行の高さに合わせて調整
        />
        <Image
          src="/images/馬02+ 1.png"
          alt="Running Horse"
          width={100}
          height={100}
          className="absolute horse-animation horse-middle"
          style={{ right: "-100px", top: "88px" }} // topはh2の行の高さに合わせて調整
        />
        <Image
          src="/images/馬02+ 2.png"
          alt="Running Horse"
          width={100}
          height={100}
          className="absolute horse-animation horse-bottom"
          style={{ right: "-100px", top: "180px" }} // topはh2の行の高さに合わせて調整
        />
      </div>
    </section>
  )
}
