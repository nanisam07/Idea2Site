"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Menu, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import StartProjectModal from "@/components/StartProjectModal"
import SendDesignModal from "@/components/SendDesignModal"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showStartModal, setShowStartModal] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#process", label: "Process" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-slate-900/90 dark:bg-slate-900/90 backdrop-blur-md py-2 shadow-2xl border-b border-cyan-500/20"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <a
                  href="#home"
                  className="group relative w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 z-0 rounded-xl" />
                  <Image
                    src="Idea2site.png"
                    alt="Logo"
                    fill
                    className="object-contain z-10"
                  />
                </a>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Idea 2 Site
                </div>
                <div className="text-xs text-white/60 font-medium tracking-wider">
                  Send. Build. Launch.
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              <div className="flex items-center space-x-1 bg-white/5 backdrop-blur-sm rounded-full p-2 border border-white/10">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="relative px-6 py-2 text-white/80 hover:text-white transition-all duration-300 rounded-full group"
                  >
                    <span className="relative z-10 font-medium">{item.label}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-8 transition-all duration-300"></div>
                  </a>
                ))}
              </div>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 relative z-10 transform group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <Moon className="h-5 w-5 relative z-10 transform group-hover:-rotate-12 transition-transform duration-500" />
                )}
              </Button>

              {/* CTA Button Desktop */}
              <Button
                onClick={() => setShowStartModal(true)}
                className="hidden sm:flex bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
              >
                Start Project
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-cyan-500/20">
            <nav className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-white/80 hover:text-cyan-400 transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-white/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}

                {/* Send Design Button */}
                <Button
                  onClick={() => {
                    setShowSendModal(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-full"
                >
                  Send your Design
                </Button>

                {/* Start Project Button */}
                <Button
                  onClick={() => {
                    setShowStartModal(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-full"
                >
                  Start Project
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Modals */}
      <StartProjectModal show={showStartModal} onClose={() => setShowStartModal(false)} />
      <SendDesignModal show={showSendModal} onClose={() => setShowSendModal(false)} />
    </>
  )
}
