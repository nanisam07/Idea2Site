import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUpRight, ShieldCheck, Cpu, Layers, Zap, ArrowRight, Code, Compass, Layers3 } from "lucide-react";

// --- Types & Constants ---
interface SkillBadgeProps { text: string }
interface Card3DProps { children: React.ReactNode; className?: string }

const TEAM = [
  {
    name: "Samuel Victor",
    role: "Founder & Developer",
    skills: ["Next.js", "React", "TypeScript", "Performance Optimization", "SEO Architecture"],
    color: "from-cyan-500 to-blue-600"
  },
  {
    name: "Supraja",
    role: "Co-Founder & Strategy",
    skills: ["Product Strategy", "Design Direction", "Planning", "Execution"],
    color: "from-blue-500 to-purple-600"
  },
  {
    name: "Bhavana",
    role: "Co-Founder & UI/UX",
    skills: ["UI Design", "UX Research", "Wireframing", "Visual Design"],
    color: "from-purple-500 to-pink-600"
  }
];

const APPROACH = [
  {
    title: "Strategy",
    desc: "Understanding goals, users, and opportunities before building.",
    icon: Compass,
    glow: "rgba(6, 182, 212, 0.15)"
  },
  {
    title: "Design",
    desc: "Crafting intuitive, modern, and memorable digital experiences.",
    icon: Layers3,
    glow: "rgba(59, 130, 246, 0.15)"
  },
  {
    title: "Development",
    desc: "Building scalable, high-performance applications using modern technologies.",
    icon: Code,
    glow: "rgba(147, 51, 234, 0.15)"
  }
];

const PROJECTS = [
  { title: "IdeaFlow", category: "Modern SaaS Analytics Platform", color: "from-cyan-500 via-blue-500 to-transparent" },
  { title: "IdeaMart", category: "E-Commerce Experience", color: "from-blue-500 via-purple-500 to-transparent" },
  { title: "IdeaCanvas", category: "Creative Design Platform", color: "from-purple-500 via-pink-500 to-transparent" }
];

const CORE_NODES = [
  { name: "Strategy", x: 0, y: -120, color: "bg-cyan-400" },
  { name: "Design", x: 110, y: -40, color: "bg-blue-400" },
  { name: "Development", x: 70, y: 90, color: "bg-purple-400" },
  { name: "Launch", x: -70, y: 90, color: "bg-pink-400" },
  { name: "Scale", x: -110, y: -40, color: "bg-indigo-400" }
];

// --- Micro Components ---
function SkillBadge({ text }: SkillBadgeProps) {
  return (
    <span className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-slate-900/80 text-slate-400 border border-slate-800/60 whitespace-nowrap">
      {text}
    </span>
  );
}

function Card3D({ children, className = "" }: Card3DProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`transition-all duration-200 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
}

// --- Main Component ---
export default function AboutIdea2Site() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="bg-slate-950 text-slate-100 font-sans overflow-hidden min-h-screen relative selection:bg-cyan-500/30">
      
      {/* Background Ambience Systems */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[30%] right-1/4 w-[600px] h-[600px] bg-purple-500/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-40 sm:space-y-48 py-24">
        
        {/* ================= SECTION 1: INTRO STORY ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 sticky top-24">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Story</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
            >
              From an Idea<br />to an Ecosystem.
            </motion.h2>
          </div>
          
          <div className="lg:col-span-8 space-y-6 text-slate-400 text-lg leading-relaxed font-light pt-2">
            {[
              "It all started with an idea. I, Samuel Victor, began building the foundation of what would become Idea2Site with a vision to create modern digital experiences that help businesses grow online.",
              "As the journey evolved, Supraja and Bhavana joined the vision. Bhavana brought creativity, design thinking, and user-focused experiences. Supraja contributed strategic planning, design direction, and execution-focused thinking.",
              "Together, we transformed a simple idea into a collaborative team dedicated to turning concepts into scalable digital products."
            ].map((paragraph, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.15 * idx }}
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-900 mt-8"
            >
              {["Strategy.", "Design.", "Development."].map((principle, index) => (
                <div key={index}>
                  <div className="text-[10px] font-mono text-cyan-500 mb-1">0{index + 1}</div>
                  <div className="text-white font-medium text-base tracking-wide">{principle}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= SECTION 2: THE IDEA2SITE CORE ================= */}
        <section className="flex flex-col items-center justify-center text-center py-10">
          <div className="mb-12">
            <span className="text-[10px] font-mono tracking-[0.2em] text-purple-400 uppercase bg-purple-950/40 px-3 py-1 rounded-full border border-purple-900/30">System Infrastructure</span>
            <h3 className="text-3xl font-bold tracking-tight mt-3 text-slate-200">The Idea2Site Core</h3>
          </div>

          <div className="relative w-full max-w-[450px] h-[400px] flex items-center justify-center">
            {/* Active Connection Beams */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {CORE_NODES.map((node, i) => (
                <line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${node.x}px)`}
                  y2={`calc(50% + ${node.y}px)`}
                  className="stroke-slate-800 transition-all duration-500"
                  style={{
                    stroke: hoveredNode === node.name ? "url(#cyan-purple-gradient)" : "rgba(30, 41, 59, 0.8)",
                    strokeWidth: hoveredNode === node.name ? 2 : 1,
                  }}
                />
              ))}
              <defs>
                <linearGradient id="cyan-purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>

            {/* Central Trademark Core Node */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-28 h-28 rounded-full border border-dashed border-cyan-500/20 flex items-center justify-center"
            />
            <div className="absolute z-20 w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.15)] group cursor-pointer">
              <span className="text-xl font-black tracking-tighter bg-gradient-to-tr from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">I²S</span>
            </div>

            {/* Orbit Satellite Nodes */}
            {CORE_NODES.map((node, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ x: node.x, y: node.y }}
                onMouseEnter={() => setHoveredNode(node.name)}
                onMouseLeave={() => setHoveredNode(null)}
                className="absolute z-10 cursor-pointer group"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${node.color} ring-4 ring-slate-950 transition-all duration-300 group-hover:scale-125 shadow-[0_0_15px_currentColor]`} />
                  <span className="absolute mt-5 text-[11px] font-mono text-slate-500 group-hover:text-slate-200 tracking-wider transition-colors duration-300">
                    {node.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 3: OUR APPROACH ================= */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold tracking-tight text-white">Engineered for Precision</h3>
            <p className="text-sm text-slate-500">Every project passes through our exact multi-disciplinary product approach.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {APPROACH.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative p-6 rounded-2xl bg-slate-900/20 border border-slate-900 hover:border-slate-800 transition-all duration-300 group overflow-hidden"
              >
                {/* Visual Glow Ambient Backing */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10 pointer-events-none" 
                  style={{ background: `radial-gradient(circle at 50% 50%, ${item.glow}, transparent 60%)` }}
                />
                
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-slate-200 transition-colors duration-300 mb-4">
                  <item.icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-medium text-slate-200 mb-2">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 4: MEET THE TEAM ================= */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono text-cyan-400 tracking-widest uppercase">The Brains</span>
              <h3 className="text-3xl font-bold tracking-tight text-slate-200 mt-1">Operational Founders</h3>
            </div>
            <p className="text-sm text-slate-500 max-w-xs">No layers of account managers. Work directly with the architects crafting your architecture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/40 to-slate-950 border border-slate-900 flex flex-col justify-between min-h-[280px] hover:border-slate-800/80 transition-all group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${member.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300 mb-4 blur-[1px]`} />
                  <h4 className="text-lg font-semibold text-slate-200">{member.name}</h4>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">{member.role}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-6">
                  {member.skills.map((skill, i) => (
                    <SkillBadge key={i} text={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 5: FEATURED PROJECTS ================= */}
        <section className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold tracking-tight text-slate-200">Selected Product Proofs</h3>
            <p className="text-sm text-slate-500 mt-1">A brief glance at ecosystem primitives launched by our studio.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((project, idx) => (
              <Card3D key={idx} className="h-full">
                <div className="p-6 h-full rounded-2xl bg-slate-900/30 border border-slate-900/80 flex flex-col justify-between relative overflow-hidden group min-h-[220px]">
                  {/* Structural Background Border Accent Glow */}
                  <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${project.color} opacity-40`} />

                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">{project.category}</span>
                    <h4 className="text-xl font-bold text-slate-200 group-hover:text-white transition-colors">{project.title}</h4>
                  </div>

                  <button className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 mt-8 group/btn transition-colors duration-200 w-fit">
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </Card3D>
            ))}
          </div>
        </section>

        {/* ================= SECTION 6: OUTRO CTA ================= */}
        <section className="relative rounded-3xl border border-slate-900 bg-slate-950 overflow-hidden py-16 px-8 md:p-20 text-center">
          {/* Dynamic Aurora Base Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-transparent blur-3xl opacity-60 pointer-events-none" />
          
          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
            >
              Your Idea Deserves More Than Just A Website.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-sm md:text-base font-light leading-relaxed"
            >
              It deserves strategy, design, and development working together to create something extraordinary.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5"
            >
              <button className="w-full sm:w-auto h-11 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium text-sm transition-all shadow-lg shadow-cyan-950/20 active:scale-[0.98] flex items-center justify-center gap-1.5 group">
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="w-full sm:w-auto h-11 px-6 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 font-medium text-sm transition-all active:scale-[0.98]">
                Explore Portfolio
              </button>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
}