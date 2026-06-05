"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import HowItWorks from "@/components/how-it-works"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import Testimonials from '@/components/Testimonials';


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function WebBuilderPage() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      // Fade in animations for sections
      gsap.fromTo(
        ".fade-in",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".fade-in",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Parallax effect for background elements
      gsap.to(".parallax", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 light:from-slate-50 light:via-purple-50 light:to-slate-50 text-white dark:text-white light:text-slate-900 overflow-x-hidden transition-colors duration-500">
      <AnimatedBackground />
      <Header />
      <main ref={mainRef} className="relative z-10">
        <Hero />
        <Services />
        <Portfolio />
        <HowItWorks />
        <Testimonials />
      
        <Contact />
      </main>
      <Footer />
    </div>
  )
  
}
