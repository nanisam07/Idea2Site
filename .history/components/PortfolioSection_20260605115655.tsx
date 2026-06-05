"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, type Transition } from "framer-motion";

// Apple-Grade Fluid Spring Physics Settings
const fluidSpring: Transition = { type: "spring", stiffness: 120, damping: 24, mass: 0.8 };
const microSpring: Transition = { type: "spring", stiffness: 200, damping: 30 };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { ease: "linear", duration: 0.25 }
  }
};

const leafVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: fluidSpring
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

export default function ApplePortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Interactive Cursor tracking for the Unique Background Mark
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const moveX = useSpring(useTransform(mouseX, [-400, 400], [-30, 30]), microSpring);
  const moveY = useSpring(useTransform(mouseY, [-400, 400], [-30, 30]), microSpring);

  function handleMouseMove(e: React.MouseEvent) {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  return (
    <AnimatePresence mode="wait">
      <motion.section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        className="min-h-screen bg-[#050506] text-[#f5f5f7] relative overflow-hidden py-32 px-6 lg:px-8 font-sans selection:bg-white/20 selection:text-white"
      >
        {/* Apple Iconic Ambient Light Canvas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Top Radial Signature Soft Flare */}
          <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-purple-500/10 via-transparent to-transparent rounded-full blur-[140px]" />
          
          {/* The Unique Mark: Interactive geometric ambient tracking orbs */}
          <motion.div 
            style={{ x: moveX, y: moveY }}
            className="absolute top-[35%] left-[20%] w-[450px] h-[450px] bg-cyan-500/[0.04] rounded-full blur-[120px]" 
          />
          <motion.div 
            style={{ x: useTransform(moveX, (v) => -v), y: useTransform(moveY, (v) => -v) }}
            className="absolute bottom-[20%] right-[15%] w-[550px] h-[550px] bg-pink-500/[0.03] rounded-full blur-[160px]" 
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header Block */}
          <motion.div variants={leafVariants} className="mb-28 text-left max-w-4xl">
            <motion.p 
              initial={{ letterSpacing: "0.05em" }}
              className="text-xs font-semibold tracking-[0.15em] text-slate-400 uppercase mb-4"
            >
              Origin Story
            </motion.p>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-semibold tracking-[-0.03em] text-white leading-[1.05] mb-8">
              Meet the minds behind <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-slate-500">
                Idea 2 Site.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-[#86868b] tracking-tight font-normal max-w-2xl leading-relaxed">
              A collective of builders, thinkers, and designers crafting premium web ecosystems.
            </p>
          </motion.div>

          {/* Interactive Bento Architecture Layout */}
          <div className="grid lg:grid-cols-12 gap-8 mb-8 items-stretch">
            
            {/* Primary Narrative Block */}
            <motion.div 
              variants={leafVariants} 
              className="lg:col-span-7 bg-[#121214]/40 border border-white/[0.06] backdrop-blur-3xl rounded-3xl p-8 sm:p-12 flex flex-col justify-between hover:border-white/[0.12] transition-colors duration-500"
            >
              <div className="space-y-6 text-base sm:text-lg text-[#a1a1a6] font-normal leading-relaxed">
                <p>
                  It all began with an option—something I,{" "}
                  <span className="text-white font-medium">Samuel Victor</span>, had envisioned for a while. I took the first steps: planning the architecture, drafting early interface wireframes, and engineering the foundational frame.
                </p>
                <p>
                  But even with a clear path forward and a functional framework operational, there came a moment where execution confidence naturally wavered.
                </p>
                <p>
                  That was the turning point when I introduced the vision to{" "}
                  <span className="text-white font-medium">Supraja</span> and{" "}
                  <span className="text-white font-medium">Bhavana</span>.
                </p>
                <p>
                  Their alignments were instantaneous. Bhavana introduced pristine structural layouts. Supraja, with a calculated strategic focus, mapped out how to execute scale.
                </p>
              </div>
              <div className="mt-12 pt-6 border-t border-white/[0.06]">
                <p className="text-xl text-white tracking-tight">
                  From that shift, we weren’t working a project—we became a cohesive <span className="text-purple-400 font-medium">team</span>.
                </p>
              </div>
            </motion.div>

            {/* Micro Dynamic Infusion Panel */}
            <motion.div 
              variants={leafVariants}
              className="lg:col-span-5 bg-[#121214]/40 border border-white/[0.06] backdrop-blur-3xl rounded-3xl p-8 flex flex-col justify-between hover:border-white/[0.12] transition-colors duration-500 relative overflow-hidden group"
            >
              <div>
                <h3 className="text-xs font-semibold tracking-widest text-[#86868b] uppercase mb-8">
                  Core Allocation
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "Samuel", signature: "SV", role: "Website engineering & development framework architecture" },
                    { name: "Bhavana", signature: "B", role: "User experience layouts, wireframing & elegant systems" },
                    { name: "Supraja", signature: "S", role: "Strategic iteration scaling & functional design direction" }
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="group/item flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-colors duration-300"
                    >
                      <div className="w-9 h-9 rounded-full bg-[#1c1c1e] border border-white/[0.08] flex items-center justify-center text-xs font-bold text-slate-300 group-hover/item:border-white/30 transition-colors duration-300">
                        {item.signature}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                        <p className="text-xs text-[#86868b] mt-0.5">{item.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                <p className="text-xs text-[#86868b] leading-relaxed">
                  We don’t simply construct applications. We build with clarity—focusing on intuitive interfaces, deep collaboration, and intentional execution.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Subtitle Callout banner */}
          <motion.div variants={leafVariants} className="w-full text-center py-16 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-slate-400">
              "We are not simply co-founders. We are an ecosystem that moves together—step by step."
            </h2>
          </motion.div>

          {/* Apple Elite Card Grid Section */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Samuel Victor",
                title: "Founder & Developer",
                tag: "SV",
                desc: "Directs foundational application structures, component systems, and baseline deployment infrastructure.",
                accent: "group-hover/card:bg-pink-500/10"
              },
              {
                name: "Supraja",
                title: "Co-Founder & Strategy",
                tag: "S",
                desc: "Governs platform lifecycle direction, feature iteration parameters, and market deployment strategy.",
                accent: "group-hover/card:bg-cyan-500/10"
              },
              {
                name: "Bhavana",
                title: "Co-Founder & UI/UX",
                tag: "B",
                desc: "Designs high-fidelity prototypes, interactions, component tokens, and fluid creative design guides.",
                accent: "group-hover/card:bg-purple-500/10"
              },
            ].map((person, idx) => (
              <motion.div
                key={person.name}
                variants={leafVariants}
                whileHover={{ y: -6, transition: microSpring }}
                className="bg-[#121214]/40 border border-white/[0.06] backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between relative group/card transition-all duration-500 hover:border-white/[0.18] hover:bg-[#1a1a1e]/50"
              >
                <div>
                  {/* Subtle Identity Badges */}
                  <div className={`w-12 h-12 rounded-xl bg-[#1c1c1e] border border-white/[0.08] flex items-center justify-center mb-8 shadow-inner transition-colors duration-500 ${person.accent}`}>
                    <span className="text-white text-sm font-bold tracking-wider">{person.tag}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold tracking-tight text-white mb-1">
                    {person.name}
                  </h3>
                  
                  <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">
                    {person.title}
                  </p>
                  
                  <p className="text-sm text-[#86868b] leading-relaxed font-normal">
                    {person.desc}
                  </p>
                </div>
                
                {/* Ultra Clean bottom marker edge */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-8 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>
    </AnimatePresence>
  );
}