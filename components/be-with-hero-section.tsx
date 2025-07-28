"use client" // クライアントコンポーネントとしてマーク

import Image from "next/image"
import { useState, useEffect, useRef } from "react" // useState, useEffect, useRefをインポート

export default function BeWithHeroSection() {
  const sectionRef = useRef<HTMLElement>(null) // セクション要素への参照
  const [isHeroInView, setIsHeroInView] = useState(false) // セクションがビューポート内にあるかどうかの状態
  const [scrollProgress, setScrollProgress] = useState(0) // スクロール進行度の状態

  useEffect(() => {
    // Intersection Observerを設定し、セクションがビューポートに入ったかを検出
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting) // ビューポートに入ったらisHeroInViewをtrueに設定
      },
      { threshold: 0.5 }, // セクションの50%以上が表示されたらトリガー
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current) // オブザーバーをセクションにアタッチ
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current) // クリーンアップ
      }
    }
  }, [])

  useEffect(() => {
    // スクロールイベントリスナーを設定し、スクロール進行度を計算
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect()
        // スクロール進行度を0から1の間で計算
        // セクションの上端がビューポートの半分に達した時点からアニメーションを開始し、
        // セクションの高さ分スクロールしたらアニメーションを完了
        const startScroll = window.innerHeight * 0.5 // ビューポートの半分からアニメーション開始
        const endScroll = sectionRect.height // セクションの高さ分スクロールしたらアニメーション終了

        let progress = 0
        if (sectionRect.top < startScroll) {
          progress = Math.min(1, (startScroll - sectionRect.top) / (endScroll - startScroll))
        }
        setScrollProgress(progress) // スクロール進行度を更新
      }
    }

    window.addEventListener("scroll", handleScroll) // スクロールイベントリスナーを追加
    return () => window.removeEventListener("scroll", handleScroll) // クリーンアップ
  }, [])

  // アニメーションの各フェーズの進行度を計算
  // 1. 背景色の変化と初期スケール (スクロール0%から20%)
  const bgFillStart = 0
  const bgFillEnd = 0.2 // opacity 0->1 and scale 10->5
  let bgFillAmount = 0
  if (scrollProgress >= bgFillStart && scrollProgress <= bgFillEnd) {
    bgFillAmount = (scrollProgress - bgFillStart) / (bgFillEnd - bgFillStart)
  } else if (scrollProgress > bgFillEnd) {
    bgFillAmount = 1
  }

  // const circleOverallOpacity = bgFillAmount // 全体の不透明度 - 動画に置き換えるため削除
  const initialFillScale = 5 // 変更: 10 から 0.1 に
  const transitionFillScale = 5 // 背景色が完全に広がる時点でのスケール
  const finalShrinkScale = 1 // 最終的な円形に縮小した時のスケール

  let currentCircleScale = initialFillScale
  if (scrollProgress < bgFillEnd) {
    currentCircleScale = initialFillScale + (transitionFillScale - initialFillScale) * bgFillAmount // 変更: 拡大アニメーション
  } else {
    // 2. メインの縮小フェーズ (スクロール20%から50%)
    const mainShrinkStart = bgFillEnd // 0.2
    const mainShrinkEnd = 0.5 // 0.7から0.5に変更
    let mainShrinkAmount = 0
    if (scrollProgress >= mainShrinkStart && scrollProgress <= mainShrinkEnd) {
      mainShrinkAmount = (scrollProgress - mainShrinkStart) / (mainShrinkEnd - mainShrinkStart)
    } else if (scrollProgress > mainShrinkEnd) {
      mainShrinkAmount = 1
    }
    currentCircleScale = transitionFillScale - (transitionFillScale - finalShrinkScale) * mainShrinkAmount
  }

  // シャドウの計算 (メインの縮小フェーズ中に適用)
  const shadowActiveStart = 0
  const shadowActiveEnd = 0
  let shadowProgress = 0
  if (scrollProgress >= shadowActiveStart && scrollProgress <= shadowActiveEnd) {
    shadowProgress = (scrollProgress - shadowActiveStart) / (shadowActiveEnd - shadowActiveStart)
  } else if (scrollProgress > shadowActiveEnd) {
    shadowProgress = 1
  }

  // シャドウの色と透明度を補間 (緑から黒へ、透明度も変化)
  // ぼかし効果を追加するために、spreadRadiusを調整し、blurRadiusを固定で大きく設定
  const interpolatedBoxShadow = `0px 0px 15px 0px rgba(0, 0, 0, 0.35)`

  // 3. コンテンツの透明度 (メインの縮小フェーズ後に表示)
  const contentAppearStartProgress = 0.4 // スクロール進行度40%から出現開始
  const contentAppearEndProgress = 0.401 // スクロール進行度40.1%で完全に表示 (ほぼ瞬時)
  let contentOpacity = 0
  if (scrollProgress >= contentAppearStartProgress && scrollProgress <= contentAppearEndProgress) {
    contentOpacity =
      (scrollProgress - contentAppearStartProgress) / (contentAppearEndProgress - contentAppearStartProgress)
  } else if (scrollProgress > contentAppearEndProgress) {
    contentOpacity = 1
  }

  return (
    <section
      ref={sectionRef} // refをセクションにアタッチ
      className={`relative w-full overflow-hidden min-h-[800px] flex flex-col items-center my-0 pt-0 bg-white h-[1600px] pb-0`} // 背景色を白色に変更
    >
      {/* 左上の背景要素 (NEWSセクションと同様のスタイル) */}
      <div
        className="absolute flex-shrink-0 rounded-full z-0"
        style={{
          width: "1000px", // サイズを半分に
          height: "1000px", // サイズを半分に
          top: "100px", // 位置を調整
          left: "-400px", // 位置を左上に調整
          background: "radial-gradient(50% 50% at 50% 50%, rgba(0, 170, 67, 0.10) 0%, rgba(0, 170, 67, 0.03) 100%)",
          filter: "blur(100px)",
        }}
      ></div>
      {/* 右下の背景要素 (NEWSセクションと同様のスタイル) */}
      <div
        className="absolute flex-shrink-0 rounded-full z-0"
        style={{
          width: "500px", // サイズを1/2に
          height: "500px", // サイズを1/2に
          bottom: "100px", // 位置を調整
          right: "-400px", // 位置を右下に調整
          background: "radial-gradient(50% 50% at 50% 50%, rgba(126, 223, 84, 0.10) 0%, rgba(126, 223, 84, 0.03) 100%)",
          filter: "blur(100px)",
        }}
      ></div>

      {/* 緑色の円形背景要素 (sectionに対してabsolute) */}
      <video
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/top_movie_250725-otVoj3QnBYToNoQoAM03I7pY3ahAEL.mp4"
        autoPlay
        muted
        playsInline
        loop
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full be-with-circle-background object-cover"
        style={{
          width: `${1200 * currentCircleScale}px`,
          height: `${1200 * currentCircleScale}px`,
          boxShadow: interpolatedBoxShadow, // 補間されたシャドウを適用
          // opacity: circleOverallOpacity, // 全体の不透明度を制御 - 動画に置き換えるため削除
        }}
      />

      {/* 円形の下に棒線を追加 */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 z-10"
        style={{
          width: "1px",
          height: "235px",
          background: "linear-gradient(90deg, #01A284 0%, #30C558 100%)",
          top: `calc(50% + ${600 * currentCircleScale}px)`, // ��の下端に配置
        }}
      />

      {/* ロゴと説明テキストを囲む新しいdiv */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center be-with-text-container gap-y-10 my-80" // gap-y-10 を追加
        style={{ top: "200px", opacity: contentOpacity }}
      >
        {/* 円形要素内のロゴ */}
        <div
          className="text-center be-with-content w-[401px] h-[237px] flex-shrink-0"
          style={{ filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.30))" }} // この行を追加
        >
          <Image
            src="/images/hero_logo.png"
            alt="馬から生まれる Be With. Action 2025"
            width={401}
            height={237}
            className="object-contain"
            priority
          />
        </div>

        {/* 円形要素下の説明テキスト */}
        <div
          className="px-4 be-with-description text-white mb-5 leading-4 max-w-[900px]"
          style={{
            color: "#FFF",
            textAlign: "center",
            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.30)",
            fontFamily: '"Noto Sans JP"',
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "50px",
            letterSpacing: "0.9px",
            // marginTop: "280px" // 既存のコメントアウトされたスタイルはそのまま
          }}
        >
          <p className="mb-0">未来のために、JRAはサステナビリティを大切にしています。</p>
          <p className="mb-0">競馬は、自然の恵みの上に成り立つスポーツ。</p>
          <p className="mb-0">だからこそ、環境への配慮や地域との共生、</p>
          <p className="mb-0">そして馬と人との健やかな関係づくりに真摯に向き合っています。</p>
          <p className="mb-0">再生可能エネルギーの活用、森林保全、引退馬の支援、次世代への教育活動など、</p>
          <p className="mb-0">未来のための一歩を重ねながら、持続可能な社会の実現に貢献していきます。</p>
          <p className="mb-8">感動とともに、豊かな未来を。</p>
          <p className="text-gray-500 text-xs md:text-sm">（ダミーのテキストです）</p>
        </div>
      </div>
    </section>
  )
}
