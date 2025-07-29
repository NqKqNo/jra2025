"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"

interface CustomHorizontalScrollbarProps {
  children: React.ReactNode
  trackWidth?: string // 例: "160px" または "w-40"
  trackHeight?: string // 例: "10px" または "h-2.5"
}

export default function CustomHorizontalScrollbar({
  children,
  trackWidth = "160px", // ユーザー指定の幅をデフォルトに
  trackHeight = "10px", // ユーザー指定の高さをデフォルトに
}: CustomHorizontalScrollbarProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [thumbWidth, setThumbWidth] = useState(0)
  const [thumbLeft, setThumbLeft] = useState(0)

  const updateThumb = useCallback(() => {
    const contentEl = contentRef.current
    const trackEl = trackRef.current

    if (contentEl && trackEl) {
      const { scrollWidth, clientWidth, scrollLeft } = contentEl
      const trackClientWidth = trackEl.clientWidth

      if (scrollWidth <= clientWidth) {
        // コンテンツが収まる場合はスクロールバーを非表示
        setThumbWidth(0)
        setThumbLeft(0)
        return
      }

      // サムの幅を計算 (表示されているコンテンツの割合)
      const newThumbWidth = (clientWidth / scrollWidth) * trackClientWidth
      // サムの位置を計算 (スクロール位置に応じて)
      const newThumbLeft = (scrollLeft / (scrollWidth - clientWidth)) * (trackClientWidth - newThumbWidth)

      setThumbWidth(newThumbWidth)
      setThumbLeft(newThumbLeft)
    }
  }, [])

  useEffect(() => {
    const contentEl = contentRef.current
    if (contentEl) {
      contentEl.addEventListener("scroll", updateThumb)
      // 初期表示時のサムの位置と幅を更新
      updateThumb()
    }

    const handleResize = () => {
      updateThumb()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (contentEl) {
        contentEl.removeEventListener("scroll", updateThumb)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [updateThumb])

  return (
    <div className="relative w-full pt-40">
      {/* スクロール可能なコンテンツエリア - このdivがscrollerクラスを受け取ります */}
      <div
        ref={contentRef}
        className="custom-horizontal-scrollbar-content flex flex-nowrap overflow-x-auto snap-x snap-mandatory scroll-smooth scroller"
      >
        {children}
      </div>

      {/* カスタムスクロールバーのトラックとサム */}
      <div className="flex justify-center mt-4">
        {/* スクロールバーを中央に配置 */}
        <div
          ref={trackRef}
          className="relative rounded-full"
          style={{
            width: trackWidth,
            height: "2px",
            backgroundColor: "#D5D5D5", // トラックの色
            flexShrink: 0, // ユーザー指定のflex-shrink: 0
          }}
        >
          <div
            ref={thumbRef}
            className="absolute top-0 rounded-full"
            style={{
              width: `${thumbWidth}px`,
              height: "100%", // サムはトラックの高さに合わせる
              left: `${thumbLeft}px`,
              backgroundColor: "#1FA9EA", // サムの色
            }}
          />
        </div>
      </div>
    </div>
  )
}
