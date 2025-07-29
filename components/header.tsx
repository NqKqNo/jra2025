"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/jra-logo.png"
            alt="JRA Logo"
            width={isScrolled ? 80 : 100}
            height={isScrolled ? 24 : 30}
            className="transition-all duration-300"
          />
        </Link>
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          <Link
            href="#"
            className={`hover:text-gray-900 transition-colors ${isScrolled ? "text-gray-700" : "text-white"}`}
          >
            JRAについて
          </Link>
          <Link
            href="#"
            className={`hover:text-gray-900 transition-colors ${isScrolled ? "text-gray-700" : "text-white"}`}
          >
            競馬場・ウインズ
          </Link>
          <Link
            href="#"
            className={`hover:text-gray-900 transition-colors ${isScrolled ? "text-gray-700" : "text-white"}`}
          >
            馬券の購入
          </Link>
          <Link
            href="#"
            className={`hover:text-gray-900 transition-colors ${isScrolled ? "text-gray-700" : "text-white"}`}
          >
            社会貢献
          </Link>
        </nav>
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-white z-40 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl font-bold text-gray-800">
          <Link href="#" className="hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
            JRAについて
          </Link>
          <Link href="#" className="hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
            競馬場・ウインズ
          </Link>
          <Link href="#" className="hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
            馬券の購入
          </Link>
          <Link href="#" className="hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
            社会貢献
          </Link>
        </div>
      </div>
    </header>
  )
}
