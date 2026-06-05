"use client";

import { motion, AnimatePresence } from "framer-motion";

// Container Orchestration for seamless sequence entry
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      ease: "easeInOut",
      duration: 0.4,
    },
  },
};

// Item Animations with Outro definitions
const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 60, damping: 15 },
  },
  exit: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const cardHoverVariants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.4)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function PortfolioSection() {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.15 }}
        className="min-h-screen bg-[#0b0f19] text-white relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
      >
        {/* Modern Animated Gradient Background Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse pointer-events-none" style={{ animationDuration: '12s' }} />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase bg-cyan-400/10 px-4 py-1.5 rounded-full inline-block mb-4 border border-cyan-400/20">
              Our Journey
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-6">
              Meet the Minds Behind <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Idea 2 Site
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full" />
          </motion.div>

          {/* Story Content Grid */}
          <div className="grid lg:grid-cols-12 gap-12 items-start mb-24">
            <motion.div 
              variants={itemVariants} 
              className="lg:col-span-7 space-y-6 text-base sm:text-lg text-slate-300 leading-relaxed font-light"
            >
              <p>
                It all began with an idea—something I,{" "}
                <strong className="text-pink-400 font-medium">Samuel Victor</strong>, had envisioned for a while. I took the first steps: planning the concept, designing early drafts, and building the foundation of the website.
              </p>
              <p>
                But even with a clear vision and a working prototype, there came a moment where I started to lose confidence.
              </p>
              <p>
                That’s when I opened up to{" "}
                <strong className="text-cyan-400 font-medium">Supraja</strong> and{" "}
                <strong className="text-purple-400 font-medium">Bhavana</strong> about the idea.
              </p>
              <p>
                Their support was instant and unwavering. Bhavana brought beautiful designs, while Supraja, with a sharp strategic mind, helped us scale meaningfully.
              </p>
              <p className="text-xl font-normal text-white pt-2">
                From that moment, we weren’t just working on a project—we became a{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent font-bold">
                  team
                </span>
                .
              </p>
            </motion.div>

            {/* Dynamic Capabilities Panel */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-5 bg-white/[0.02] backdrop-blur-md border border-white/[0.07] rounded-3xl p-6 sm:p-8 relative group"
            >
              <div className="absolute -top-3 left-6 px-4 py-1 bg-[#161c2a] border border-white/10 rounded-full text-xs font-semibold text-slate-400">
                Core DNA
              </div>
              <p className="mb-6 text-lg font-semibold text-white">Value Infusion:</p>
              
              <div className="space-y-5">
                {[
                  { name: "Samuel", text: "text-pink-400", border: "border-pink-500/20", bg: "bg-pink-500/10", role: "Led website design and development" },
                  { name: "Bhavana", text: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10", role: "Enhanced user experience with elegant designs" },
                  { name: "Supraja", text: "text-cyan-400", border: "border-cyan-500/20", bg: "bg-cyan-500/10", role: "Helped shape design and strategic direction" }
                ].map((item, idx) => (
                  <div key={idx} className={`flex gap-4 p-3.5 rounded-xl border ${item.border} bg-white/[0.01]`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${item.bg} border ${item.text.replace('text', 'border')} mt-2 flex-shrink-0`} />
                    <div>
                      <h4 className={`font-semibold ${item.text} text-sm sm:text-base`}>{item.name}</h4>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{item.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Core Ethos Callout */}
          <motion.div 
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto mb-20 space-y-4 px-4"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              "We're not just co-founders. We're a team that believes in each other—step by step."
            </h3>
            <p className="text-slate-400 text-sm sm:text-base font-light">
              We don’t just work on projects. We work with people—collaboratively, passionately, and intuitively.
            </p>
          </motion.div>

          {/* Premium Co-Founder Grid Layout */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: "Samuel Victor",
                title: "Founder & Developer",
                tag: "SV",
                desc: "Leading website design, development, and product execution framework architecture.",
                borderClass: "hover:border-pink-500/40 hover:shadow-[0_0_30px_rgba(244,114,182,0.1)]",
                textClass: "text-pink-400",
                gradClass: "from-pink-500 to-rose-600"
              },
              {
                name: "Supraja",
                title: "Co-Founder & Strategy Planner",
                tag: "S",
                desc: "Steering global roadmap structures, design iteration oversight, and market value fitment.",
                borderClass: "hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]",
                textClass: "text-cyan-400",
                gradClass: "from-cyan-500 to-blue-600"
              },
              {
                name: "Bhavana",
                title: "Co-Founder & UI/UX Designer",
                tag: "B",
                desc: "Sculpting visual identifiers, wireframes, and production-ready sleek interface journeys.",
                borderClass: "hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(192,132,252,0.1)]",
                textClass: "text-purple-400",
                gradClass: "from-purple-500 to-indigo-600"
              },
            ].map((person) => (
              <motion.div
                key={person.name}
                variants={itemVariants}
                whileHover="hover"
                initial="initial"
                className={`bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/[0.08] transition-colors duration-300 relative group/card ${person.borderClass}`}
              >
                {/* Avatar Ring */}
                <div className={`w-14 h-14 bg-gradient-to-br ${person.gradClass} rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover/card:rotate-0 transition-transform duration-300`}>
                  <span className="text-white font-black text-xl tracking-wider">{person.tag}</span>
                </div>
                
                <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${person.textClass} mb-1`}>
                  {person.name}
                </h3>
                
                <p className="text-xs sm:text-sm font-medium text-slate-200 mb-4 tracking-wide uppercase">
                  {person.title}
                </p>
                
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                  {person.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>
    </AnimatePresence>
  );
}