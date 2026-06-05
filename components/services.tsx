"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Figma, Code, Smartphone, Zap, Globe, Palette } from "lucide-react"

const services = [
  {
    icon: Figma,
    title: "Figma to Website",
    description: "Pixel-perfect conversion of your Figma designs into fully functional websites.",
  },
  {
    icon: Palette,
    title: "Custom Design",
    description: "Unique, brand-focused designs created from scratch based on your requirements.",
  },
  {
    icon: Smartphone,
    title: "Responsive Development",
    description: "Mobile-first approach ensuring perfect display across all devices and screen sizes.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast websites optimized for speed, SEO, and user experience.",
  },
  {
    icon: Code,
    title: "Clean Code",
    description: "Modern, maintainable code using the latest web technologies and best practices.",
  },
  {
    icon: Globe,
    title: "Full-Stack Solutions",
    description: "Complete web applications with backend functionality and database integration.",
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              What I Offer
            </span>
          </h2>
          <p className="text-xl text-white/80 dark:text-white/80 light:text-slate-700 max-w-2xl mx-auto">
            From concept to launch, I provide comprehensive web development services tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="service-card group relative p-8 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-900/5 backdrop-blur-sm border border-white/10 dark:border-white/10 light:border-slate-900/10 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-4 text-white dark:text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-white/70 dark:text-white/70 light:text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
