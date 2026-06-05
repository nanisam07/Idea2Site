"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Award, Users, Target, Lightbulb } from "lucide-react"
import Image from "next/image"

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Pushing boundaries with cutting-edge technology solutions",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working closely with clients to achieve shared success",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Delivering high-quality solutions that exceed expectations",
  },
  {
    icon: Award,
    title: "Reliability",
    description: "Trusted partner for mission-critical technology projects",
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-item",
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="about-item">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                About TechNova
              </span>
            </h2>
            <p className="text-xl text-white/80 dark:text-white/80 light:text-slate-700 mb-8 leading-relaxed">
              We are a forward-thinking technology company dedicated to transforming businesses through innovative
              digital solutions. Our team of experts combines deep technical knowledge with creative problem-solving to
              deliver exceptional results.
            </p>
            <p className="text-lg text-white/70 dark:text-white/70 light:text-slate-600 mb-8 leading-relaxed">
              Since our founding, we've helped organizations across industries leverage technology to streamline
              operations, enhance customer experiences, and drive sustainable growth.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-900/5 border border-white/10 dark:border-white/10 light:border-slate-900/10">
                <div className="text-2xl font-bold text-cyan-400 mb-2">99%</div>
                <div className="text-white/70 dark:text-white/70 light:text-slate-600 text-sm">Client Satisfaction</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-900/5 border border-white/10 dark:border-white/10 light:border-slate-900/10">
                <div className="text-2xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-white/70 dark:text-white/70 light:text-slate-600 text-sm">Support Available</div>
              </div>
            </div>
          </div>

          <div className="about-item">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="TechNova Team"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-2xl"></div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Our Values
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="about-item text-center p-6 rounded-2xl bg-white/5 dark:bg-white/5 light:bg-slate-900/5 backdrop-blur-sm border border-white/10 dark:border-white/10 light:border-slate-900/10 hover:border-cyan-400/50 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-white dark:text-white light:text-slate-900">
                    {value.title}
                  </h4>
                  <p className="text-white/70 dark:text-white/70 light:text-slate-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
