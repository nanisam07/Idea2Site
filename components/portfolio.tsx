"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ExternalLink, Figma } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Modern e-commerce website converted from Figma design with advanced shopping features.",
    image: "e-commerce.jpg",
    tags: ["Figma to Code", "React", "Next.js", "Tailwind"],
    liveUrl: "#",
    figmaUrl: "#",
    category: "E-Commerce",
  },
  {
    title: "SaaS Dashboard",
    description: "Complex dashboard interface built from detailed Figma mockups with data visualization.",
    image: "sass.jpg",
    tags: ["Dashboard", "Vue.js", "D3.js", "Responsive"],
    liveUrl: "#",
    figmaUrl: "#",
    category: "Dashboard",
  },
  {
    title: "Creative Agency Site",
    description: "Award-winning portfolio website with stunning animations and micro-interactions.",
    image: "creative.jpg",
    tags: ["Portfolio", "GSAP", "Three.js", "Creative"],
    liveUrl: "#",
    figmaUrl: "#",
    category: "Portfolio",
  },
  {
    title: "Mobile App Landing",
    description: "Conversion-optimized landing page for mobile app with interactive elements.",
    image: "mobile.jpg",
    tags: ["Landing Page", "Mobile-First", "Conversion", "React"],
    liveUrl: "#",
    figmaUrl: "#",
    category: "Landing Page",
  },
  {
    title: "Restaurant Website",
    description: "Beautiful restaurant website with online ordering system and reservation booking.",
    image: "resturant.jpg",
    tags: ["Restaurant", "Booking System", "WordPress", "Custom"],
    liveUrl: "#",
    figmaUrl: "#",
    category: "Business",
  },
  {
    title: "Tech Startup Site",
    description: "Modern startup website with investor-focused design and lead generation features.",
    image: "techstartup.jpg",
    tags: ["Startup", "Lead Gen", "Modern", "Fast"],
    liveUrl: "#",
    figmaUrl: "#",
    category: "Startup",
  },
]

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
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
    <section ref={sectionRef} id="portfolio" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Recent Work
            </span>
          </h2>
          <p className="text-xl text-white/80 dark:text-white/80 light:text-slate-700 max-w-2xl mx-auto">
            A showcase of websites I've built from Figma designs and custom requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative rounded-2xl overflow-hidden bg-white/5 dark:bg-white/5 light:bg-slate-900/5 backdrop-blur-sm border border-white/10 dark:border-white/10 light:border-slate-900/10 hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs bg-gradient-to-r from-cyan-500/80 to-purple-500/80 text-white rounded-full backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                    <Figma className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white dark:text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-white/70 dark:text-white/70 light:text-slate-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-sm bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 dark:text-cyan-300 light:text-cyan-600 rounded-full border border-cyan-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 dark:border-white/30 light:border-slate-900/30 text-white dark:text-white light:text-slate-900 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-900/10 px-8 py-3 text-lg rounded-full"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}
