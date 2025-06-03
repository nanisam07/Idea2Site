"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Mail, MessageCircle, Instagram, Send, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [projectType, setProjectType] = useState("")
  const [description, setDescription] = useState("")
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !projectType || !description) {
      alert("Please fill in all the fields before submitting.")
      return
    }

    setShowModal(true)
  }

  const message = `Hello! I would like to start a project.\n\nName: ${name}\nEmail: ${email}\nType: ${projectType}\nDetails: ${description}`

  return (
    <section ref={sectionRef} id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Let's Build Together
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Ready to bring your design to life? Send me your Figma file or describe your project, and let's create
            something amazing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="contact-item">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-white">Start Your Project</h3>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400"
                  />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400"
                  />
                </div>

                <Input
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  placeholder="Project Type (e.g., Figma to Website)"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400"
                />

                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400 resize-none"
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Project Details
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-item space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-white">Get in Touch</h3>

              <div className="space-y-6">
                <a
                  href="mailto:projects@idea2site.com"
                  className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-white/70">projects@idea2site.com</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/9290914773"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">WhatsApp</p>
                    <p className="text-white/70">Quick project discussions</p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/webcraft.design"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Instagram</p>
                    <p className="text-white/70">@idea2site</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-medium">Response Time</span>
              </div>
              <p className="text-white/70 mb-4">Usually within 2–4 hours</p>

              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 text-sm">Available for new projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">Send via WhatsApp or Email</h2>
            <p className="mb-6 text-sm text-gray-600">
              Choose how you’d like to send your project details.
            </p>
            <div className="flex flex-col gap-4">
              <a
                href={`https://wa.me/9290914773?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition"
              >
                Send via WhatsApp
              </a>
              <a
                href={`mailto:projects@idea2site.com?subject=New Project Inquiry&body=${encodeURIComponent(message)}`}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition"
              >
                Send via Email
              </a>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-800 mt-4 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
