import Image from "next/image"

export default function EarthTopLogoSection() {
  return (
    <div
      className="earth-action-top-logo-section relative z-20 flex flex-col items-center flex-shrink-0 h-auto"
      style={{
        background: "linear-gradient(0deg, #009EA7 -82.67%, #00AA43 41.33%, #268301 165.33%)",
      }}
    >
      <Image
        src="/images/logo_white.png"
        alt="競馬のチカラを、社会に。Be With. Action 2025"
        width={150}
        height={75}
        className="p-5"
        priority
      />
    </div>
  )
}
