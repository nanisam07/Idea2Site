"use client"

import { Instagram, Mail, MessageCircle, ArrowUp, Figma, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-slate-900/50 dark:bg-slate-900/50 light:bg-slate-100/50 backdrop-blur-sm border-t border-white/10 dark:border-white/10 light:border-slate-900/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
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
                <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Idea2Site
                </div>
                <div className="text-xs text-white/60 dark:text-white/60 light:text-slate-600 font-medium tracking-wider">
                  Send. Build. Launch.
                </div>
              </div>
            </div>
            <p className="text-white/70 dark:text-white/70 light:text-slate-600 leading-relaxed">
              Transforming Figma designs into pixel-perfect, high-performance websites that captivate and convert.
            </p>
            <div className="flex space-x-4">
  {/* Instagram - no link provided, keep placeholder or update later */}
  <a href="https://www.instagram.com/idea2site?utm_source=qr&igsh=aHN0MWJ0aWFpNW9o" target="_blank" rel="noopener noreferrer">
    <Button
      size="icon"
      variant="ghost"
      className="w-10 h-10 rounded-full bg-white/10 hover:bg-cyan-500/20 text-white/70 hover:text-cyan-400 transition-all duration-300"
    >
      <Instagram className="w-5 h-5" />
    </Button>
  </a>

  {/* Figma */}
  <a
    href="https://www.figma.com/files/team/1289567530230691064/all-projects?fuid=1289567527325892661"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button
      size="icon"
      variant="ghost"
      className="w-10 h-10 rounded-full bg-white/10 hover:bg-cyan-500/20 text-white/70 hover:text-cyan-400 transition-all duration-300"
    >
      <Figma className="w-5 h-5" />
    </Button>
  </a>

  {/* GitHub */}
  <a href="https://github.com/nanisam07" target="_blank" rel="noopener noreferrer">
    <Button
      size="icon"
      variant="ghost"
      className="w-10 h-10 rounded-full bg-white/10 hover:bg-cyan-500/20 text-white/70 hover:text-cyan-400 transition-all duration-300"
    >
      <Github className="w-5 h-5" />
    </Button>
  </a>

  {/* WhatsApp */}
  <a href="https://wa.me/9290914773" target="_blank" rel="noopener noreferrer">
    <Button
      size="icon"
      variant="ghost"
      className="w-10 h-10 rounded-full bg-white/10 hover:bg-cyan-500/20 text-white/70 hover:text-cyan-400 transition-all duration-300"
    >
      <MessageCircle className="w-5 h-5" />
    </Button>
  </a>
</div>

          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-white light:text-slate-900 mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                "Figma to Website",
                "Custom Design",
                "Responsive Development",
                "Performance Optimization",
                "E-commerce Solutions",
                "Maintenance & Support",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-white/70 dark:text-white/70 light:text-slate-600 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio */}
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-white light:text-slate-900 mb-6">Portfolio</h3>
            <ul className="space-y-3">
              {[
                "E-commerce Sites",
                "SaaS Dashboards",
                "Landing Pages",
                "Portfolio Sites",
                "Business Websites",
                "Mobile Apps",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/70 dark:text-white/70 light:text-slate-600 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
  <div className="flex items-center space-x-3">
    <button
  onClick={() =>
    window.location.href = "mailto:team.idea2site@gmail.com"
  }
  className="flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors"
>
  <Mail className="w-5 h-5 text-cyan-400" />
  team.idea2site@gmail.com
</button>
  </div>
  <div className="flex items-center space-x-3">
    <MessageCircle className="w-5 h-5 text-cyan-400" />
    <a
      href="https://wa.me/9290914773"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white/70 hover:text-cyan-400 transition-colors"
    >
      WhatsApp
    </a>
  </div>
  <div className="flex items-center space-x-3">
    <Instagram className="w-5 h-5 text-cyan-400" />
    <a
      href="https://www.instagram.com/idea2site?utm_source=qr&igsh=aHN0MWJ0aWFpNW9o"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white/70 hover:text-cyan-400 transition-colors"
    >
      @idea2site
    </a>
  </div>
</div>
</div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10 dark:border-white/10 light:border-slate-900/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 dark:text-white/60 light:text-slate-600 text-sm mb-4 md:mb-0">
            © 2025 Idea 2 Site. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-white/60 dark:text-white/60 light:text-slate-600 hover:text-cyan-400 text-sm transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/60 dark:text-white/60 light:text-slate-600 hover:text-cyan-400 text-sm transition-colors duration-200"
            >
              Terms of Service
            </a>
            <Button
              onClick={scrollToTop}
              size="icon"
              variant="ghost"
              className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white transition-all duration-300 transform hover:scale-110"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
