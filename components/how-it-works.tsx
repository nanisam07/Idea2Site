"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Send, Code, Rocket } from "lucide-react"

const steps = [
  {
    icon: Send,
    title: "Send Your Design",
    description:
      "Share your Figma file, mockups, or describe your vision. I'll analyze every detail and ask clarifying questions.",
  },
  {
    icon: Code,
    title: "Development Magic",
    description:
      "I transform your design into pixel-perfect, responsive code using modern technologies and best practices.",
  },
  {
    icon: Rocket,
    title: "Launch & Support",
    description:
      "Your website goes live with full testing, optimization, and ongoing support for any adjustments needed.",
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".step-card",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Animate connecting lines
      gsap.fromTo(
        ".connecting-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-white/80 dark:text-white/80 light:text-slate-700 max-w-2xl mx-auto">
            A simple 3-step process to transform your designs into stunning websites
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <div className="step-card flex items-center mb-12 last:mb-0">
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full flex items-center justify-center relative z-10">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full blur-lg opacity-50"></div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>

                  <div className="ml-8 flex-1">
                    <div className="bg-white/5 dark:bg-white/5 light:bg-slate-900/5 backdrop-blur-sm border border-white/10 dark:border-white/10 light:border-slate-900/10 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300">
                      <h3 className="text-2xl font-semibold mb-4 text-white dark:text-white light:text-slate-900">
                        {step.title}
                      </h3>
                      <p className="text-white/70 dark:text-white/70 light:text-slate-600 leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="absolute left-10 top-20 w-0.5 h-12 bg-gradient-to-b from-cyan-400 to-purple-400 connecting-line origin-top"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
