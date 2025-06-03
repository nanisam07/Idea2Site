"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles, Figma, Code, Palette } from "lucide-react"
import { useState } from "react"
import StartProjectModal from "@/components/StartProjectModal"
import Link from 'next/link';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6",
        )
        .fromTo(ctaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2",
        )

      // Floating animation for sparkles and icons
      gsap.to(".sparkle", {
        y: -20,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      })

      gsap.to(".floating-icon", {
        y: -15,
        rotation: 5,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Floating design elements */}
          <div className="absolute -top-10 -left-10 sparkle">
            <Sparkles className="w-8 h-8 text-cyan-400 opacity-60" />
          </div>
          <div className="absolute -top-5 right-20 floating-icon">
            <Figma className="w-12 h-12 text-purple-400 opacity-50" />
          </div>
          <div className="absolute top-20 -right-5 sparkle">
            <Code className="w-10 h-10 text-pink-400 opacity-50" />
          </div>
          <div className="absolute top-40 left-10 floating-icon">
            <Palette className="w-8 h-8 text-cyan-400 opacity-40" />
          </div>

          <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Idea to 
            </span>
            <br />
            <span className="text-white dark:text-white light:text-slate-900">Website Magic</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white/80 dark:text-white/80 light:text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Submit your ideas through Figma, images, sketches, messages, or documents — whichever format works best for you.
            <br />
            I transform your ideas into clean, responsive, and high-performing websites.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
  size="lg"
  onClick={() => setShowModal(true)}
  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
>
  <Figma className="w-5 h-5 mr-2" />
  Send Your Design
</Button>
          <Link href ="/portfolio">

            <Button
  variant="outline"
  size="lg"
  onClick={() => {
    const section = document.getElementById("PortfolioSection"); // ✅ correct id
    section?.scrollIntoView({ behavior: "smooth" });
  }}
  className="border-slate-900/30 text-slate-900 hover:bg-slate-900/10 
             dark:border-white/30 dark:text-white dark:hover:bg-white/10 
             px-8 py-3 text-lg rounded-full transition-all duration-300"
>
  View Portfolio
</Button>

          </Link>

          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                200+
              </div>
              <div className="text-white/70 dark:text-white/70 light:text-slate-600">Websites Built</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                48h
              </div>
              <div className="text-white/70 dark:text-white/70 light:text-slate-600">Average Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-white/70 dark:text-white/70 light:text-slate-600">Client Satisfaction</div>
            </div>
          </div>

          <div className="mt-16 animate-bounce">
            <ArrowDown className="w-6 h-6 text-white/60 dark:text-white/60 light:text-slate-600 mx-auto" />
          </div>
        </div>
      </div>
<StartProjectModal show={showModal} onClose={() => setShowModal(false)} />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
    </section>
    
  )
}
