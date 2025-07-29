"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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
            height={isScrolled ? 40 : 50}
            className="transition-all duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link
            href="#"
            className={`text-lg font-medium ${
              isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-gray-200"
            } transition-colors duration-300`}
          >
            JRAのサステナビリティ
          </Link>
          <Link
            href="#"
            className={`text-lg font-medium ${
              isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-gray-200"
            } transition-colors duration-300`}
          >
            ニュース
          </Link>
          <Link
            href="#"
            className={`text-lg font-medium ${
              isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-gray-200"
            } transition-colors duration-300`}
          >
            CMギャラリー
          </Link>
          <Button
            className={`rounded-full px-6 py-3 text-lg font-bold shadow-lg transition-all duration-300 ${
              isScrolled
                ? "bg-gradient-to-r from-[#2EAAE4] to-[#50C4F2] text-white hover:from-[#50C4F2] hover:to-[#2EAAE4]"
                : "bg-white text-[#1FA9EA] hover:bg-gray-100"
            }`}
          >
            お問い合わせ
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 mt-2">
          <nav className="flex flex-col items-center space-y-4">
            <Link href="#" className="text-lg font-medium text-gray-700 hover:text-blue-600" onClick={toggleMenu}>
              JRAのサステナビリティ
            </Link>
            <Link href="#" className="text-lg font-medium text-gray-700 hover:text-blue-600" onClick={toggleMenu}>
              ニュース
            </Link>
            <Link href="#" className="text-lg font-medium text-gray-700 hover:text-blue-600" onClick={toggleMenu}>
              CMギャラリー
            </Link>
            <Button
              className="rounded-full px-6 py-3 text-lg font-bold shadow-lg bg-gradient-to-r from-[#2EAAE4] to-[#50C4F2] text-white hover:from-[#50C4F2] hover:to-[#2EAAE4]"
              onClick={toggleMenu}
            >
              お問い合わせ
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
