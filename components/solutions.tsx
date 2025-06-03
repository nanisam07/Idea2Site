"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Building2, ShoppingCart, Heart, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import SendDesignModal from "@/components/SendDesignModal"

const solutions = [
  {
    icon: Building2,
    title: "Enterprise Solutions",
    description: "Scalable enterprise software and digital transformation services for large organizations.",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Custom ERP Systems", "Workflow Automation", "Data Integration", "Security Compliance"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Platforms",
    description: "Complete e-commerce solutions with advanced features and seamless user experiences.",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Multi-vendor Support", "Payment Integration", "Inventory Management", "Analytics Dashboard"],
  },
  {
    icon: Heart,
    title: "Healthcare Technology",
    description: "HIPAA-compliant healthcare solutions that improve patient care and operational efficiency.",
    image: "/placeholder.svg?height=300&width=400",
    features: ["Patient Management", "Telemedicine", "Electronic Records", "Compliance Tools"],
  },
  {
    icon: GraduationCap,
    title: "Education Platforms",
    description: "Modern learning management systems and educational technology solutions.",
    image: "/placeholder.svg?height=300&width=400",
    features: ["LMS Development", "Virtual Classrooms", "Student Analytics", "Content Management"],
  },
]

export default function Solutions() {
  const sectionRef = useRef<HTMLElement>(null)
  const [showSendModal, setShowSendModal] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".solution-card",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
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
    <section ref={sectionRef} id="solutions" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Industry Solutions
            </span>
          </h2>
          <p className="text-xl text-white/80 dark:text-white/80 light:text-slate-700 max-w-2xl mx-auto">
            Tailored technology solutions designed for specific industry needs and challenges
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon
            return (
              <div
                key={index}
                className="solution-card group relative rounded-2xl overflow-hidden bg-white/5 dark:bg-white/5 light:bg-slate-900/5 backdrop-blur-sm border border-white/10 dark:border-white/10 light:border-slate-900/10 hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={solution.image || "/placeholder.svg"}
                    alt={solution.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white dark:text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors duration-300">
                    {solution.title}
                  </h3>

                  <p className="text-white/70 dark:text-white/70 light:text-slate-600 mb-4 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                        <span className="text-white/60 dark:text-white/60 light:text-slate-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => setShowSendModal(true)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-full"
                  >
                    Send Design
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <SendDesignModal show={showSendModal} onClose={() => setShowSendModal(false)} />
    </section>
  )
}
