"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  o: number;
}

// ─── Custom Hook: useInView ───────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── AnimatedCounter ─────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix,
  duration = 2000,
  trigger,
}: {
  target: number;
  suffix: string;
  duration?: number;
  trigger: boolean;
}) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return (
    <span className="trust-num">
      {value}
      {suffix}
    </span>
  );
}

// ─── TeamCard ────────────────────────────────────────────────────────────────
function TeamCard({
  initials,
  name,
  role,
  skills,
  avatarClass,
  roleColor,
  delay,
  inView,
}: {
  initials: string;
  name: string;
  role: string;
  skills: string[];
  avatarClass: string;
  roleColor: string;
  delay: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    card.style.transform = `translateY(-8px) scale(1.01) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    card.style.perspective = "600px";
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "";
      cardRef.current.style.perspective = "";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="team-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="float-glow fg1" />
      <div className="float-glow fg2" />
      <div className={`avatar ${avatarClass}`}>{initials}</div>
      <h3 className="team-name">{name}</h3>
      <div className="team-role" style={{ color: roleColor }}>
        {role}
      </div>
      <div className="skills-wrap">
        {skills.map((s) => (
          <span key={s} className="skill-pill">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── ProjectCard ─────────────────────────────────────────────────────────────
function ProjectCard({
  initials,
  title,
  tag,
  desc,
  accentColor,
  bgGrad,
  btnGrad,
  delay,
  inView,
}: {
  initials: string;
  title: string;
  tag: string;
  desc: string;
  accentColor: string;
  bgGrad: string;
  btnGrad: string;
  delay: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="proj-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="proj-glow-border"
        style={{ opacity: hovered ? 1 : 0 }}
      />
      <div className="proj-inner">
        <div className="proj-preview" style={{ background: bgGrad }}>
          <div className="proj-icon-large" style={{ color: accentColor }}>
            {initials}
          </div>
          <div
            className="proj-shine"
            style={{ transform: hovered ? "translateX(100%)" : "translateX(0)" }}
          />
        </div>
        <div className="proj-body">
          <div className="proj-tag" style={{ color: accentColor }}>
            {tag}
          </div>
          <h4 className="proj-title">{title}</h4>
          <p className="proj-desc">{desc}</p>
          <div className="proj-btns">
            <button className="btn-demo" style={{ background: btnGrad }}>
              Live Demo ↗
            </button>
            <button className="btn-gh">GitHub</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AboutIdea2Site() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  // section visibility
  const story = useInView();
  const timeline = useInView(0.2);
  const team = useInView();
  const projects = useInView();
  const trust = useInView(0.3);
  const outro = useInView(0.2);

  // headline word reveal
  const words = ["Meet", "The", "Minds", "Behind", "Idea2Site"];

  // ── Particles ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let pts: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      pts.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 4,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.5 + 0.2,
      });
    }

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        const d = Math.hypot(p.x - mx, p.y - my);
        const glow = Math.max(0, 1 - d / 200);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.o + glow * 0.3})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── Custom Cursor ──
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", onMove);
    const interval = setInterval(() => {
      const m = mouseRef.current;
      m.rx += (m.x - m.rx) * 0.12;
      m.ry += (m.y - m.ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = m.rx + "px";
        ringRef.current.style.top = m.ry + "px";
      }
    }, 16);
    return () => {
      document.removeEventListener("mousemove", onMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>

      {/* Cursor */}
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      {/* Mesh background */}
      <div className="mesh-bg">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />
      </div>
      <canvas ref={canvasRef} className="particles-canvas" />

      <div className="page">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-eyebrow">About Idea2Site</div>
          <h1 className="hero-headline">
            {words.map((w, i) => (
              <span key={w} className="word">
                <span
                  className={`word-inner ${i === 4 ? "grad-word" : ""}`}
                  style={{ animationDelay: `${0.5 + i * 0.12}s` }}
                >
                  {w}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-sub">
            Turning ideas into beautiful digital experiences through strategy,
            design, and development.
          </p>
          <div className="scroll-hint">
            <div className="scroll-line" />
            <span>Scroll to explore</span>
          </div>
        </section>

        <div className="divider" />

        {/* ── STORY ── */}
        <section ref={story.ref}>
          <div className="section-tag">Our Story</div>
          <h2 className="section-title">
            It all started
            <br />
            with an{" "}
            <span className="grad-word">idea.</span>
          </h2>
          <div className="story-grid">
            {[
              {
                year: "The Beginning",
                title: "A single vision",
                body: "Samuel Victor began building Idea2Site with one conviction — that modern digital experiences should be accessible to every business and startup, not just the ones with massive budgets.",
                accent: "var(--cyan)",
                delay: 100,
              },
              {
                year: "The Growth",
                title: "A team takes shape",
                body: "Supraja joined, bringing product strategy and clear-eyed direction. Then Bhavana — with a designer's instinct for what's beautiful and what's usable. The vision became a studio.",
                accent: "var(--purple)",
                delay: 200,
              },
              {
                year: "Today",
                title: "Ideas into products",
                body: "Idea2Site transforms ideas into websites, applications, and digital products built to grow. Every project is personal. Every line of code is intentional. Every design decision is yours.",
                accent: "var(--blue)",
                delay: 300,
                wide: true,
              },
            ].map((card) => (
              <div
                key={card.year}
                className={`story-card${card.wide ? " story-card-wide" : ""}`}
                style={{
                  opacity: story.inView ? 1 : 0,
                  transform: story.inView ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: `${card.delay}ms`,
                }}
              >
                <div
                  className="story-accent"
                  style={{
                    background: `radial-gradient(circle, ${card.accent}, transparent)`,
                  }}
                />
                <div className="story-year">{card.year}</div>
                <h3 className="story-h3">{card.title}</h3>
                <p className="story-p">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ── HOW WE WORK ── */}
        <section ref={timeline.ref}>
          <div className="section-tag">Process</div>
          <h2 className="section-title">How we work</h2>
          <div className="tl-wrap">
            <div className="tl-track" />
            <div
              className="tl-line"
              style={{ width: timeline.inView ? "100%" : "0%" }}
            />
            <div className="tl-steps">
              {[
                { num: "01", title: "Discover", desc: "Understanding your goals and requirements deeply before a single pixel is moved.", delay: 100 },
                { num: "02", title: "Design", desc: "Crafting intuitive user experiences that feel inevitable once you see them.", delay: 200 },
                { num: "03", title: "Develop", desc: "Building scalable, performant applications on the right technology stack.", delay: 300 },
                { num: "04", title: "Launch", desc: "Deploying with precision and optimizing relentlessly for growth.", delay: 400 },
              ].map((s) => (
                <div
                  key={s.num}
                  className="tl-step"
                  style={{
                    opacity: timeline.inView ? 1 : 0,
                    transform: timeline.inView ? "translateY(0)" : "translateY(30px)",
                    transitionDelay: `${s.delay}ms`,
                  }}
                >
                  <div className="tl-dot" />
                  <span className="tl-num">{s.num}</span>
                  <h4 className="tl-h4">{s.title}</h4>
                  <p className="tl-p">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ── TEAM ── */}
        <section ref={team.ref}>
          <div className="section-tag">The People</div>
          <h2 className="section-title">Meet the team</h2>
          <div className="team-grid">
            <TeamCard initials="SV" name="Samuel Victor" role="Founder & Developer"
              skills={["Next.js", "React", "TypeScript", "Performance", "SEO", "Architecture"]}
              avatarClass="av1" roleColor="var(--cyan)" delay={100} inView={team.inView} />
            <TeamCard initials="SU" name="Supraja" role="Co-Founder & Strategy"
              skills={["Product Strategy", "Planning", "Execution", "Design Direction"]}
              avatarClass="av2" roleColor="var(--purple)" delay={200} inView={team.inView} />
            <TeamCard initials="BH" name="Bhavana" role="Co-Founder & UI/UX"
              skills={["UI Design", "UX Research", "Wireframing", "Visual Design"]}
              avatarClass="av3" roleColor="var(--blue)" delay={300} inView={team.inView} />
          </div>
        </section>

        <div className="divider" />

        {/* ── PROJECTS ── */}
        <section ref={projects.ref}>
          <div className="section-tag">Our Work</div>
          <h2 className="section-title">Featured projects</h2>
          <div className="proj-grid">
            <ProjectCard initials="IA" title="IdeaFlow" tag="SaaS · Analytics"
              desc="SaaS analytics platform with real-time dashboards and actionable business intelligence."
              accentColor="var(--cyan)"
              bgGrad="linear-gradient(135deg,rgba(0,212,255,.08),rgba(79,142,247,.05))"
              btnGrad="linear-gradient(135deg,#00d4ff,#4f8ef7)"
              delay={100} inView={projects.inView} />
            <ProjectCard initials="IM" title="IdeaMart" tag="E-Commerce · Platform"
              desc="Full-stack e-commerce platform with seamless checkout, inventory, and storefront tools."
              accentColor="var(--purple)"
              bgGrad="linear-gradient(135deg,rgba(168,85,247,.08),rgba(124,58,237,.05))"
              btnGrad="linear-gradient(135deg,#a855f7,#7c3aed)"
              delay={200} inView={projects.inView} />
            <ProjectCard initials="IC" title="IdeaCanvas" tag="Design · Creative"
              desc="Creative design platform built for teams who move fast without sacrificing quality."
              accentColor="var(--blue)"
              bgGrad="linear-gradient(135deg,rgba(79,142,247,.08),rgba(0,212,255,.05))"
              btnGrad="linear-gradient(135deg,#4f8ef7,#00d4ff)"
              delay={300} inView={projects.inView} />
          </div>
        </section>

        <div className="divider" />

        {/* ── TRUST ── */}
        <section ref={trust.ref}>
          <div className="section-tag">Why Us</div>
          <h2 className="section-title">Built different</h2>
          <div className="trust-row">
            {[
              { id: "c1", target: 50, suffix: "+", label: "Projects Delivered", delay: 100 },
              { id: "c2", target: 340, suffix: "ms", label: "Avg Load Time", delay: 200 },
              { id: "c3", target: 40, suffix: "+", label: "Happy Clients", delay: 300 },
              { id: "c4", target: 100, suffix: "%", label: "Mobile Responsive", delay: 400 },
            ].map((c) => (
              <div
                key={c.id}
                className="trust-card"
                style={{
                  opacity: trust.inView ? 1 : 0,
                  transform: trust.inView ? "scale(1)" : "scale(0.95)",
                  transitionDelay: `${c.delay}ms`,
                }}
              >
                <AnimatedCounter target={c.target} suffix={c.suffix} trigger={trust.inView} />
                <div className="trust-label">{c.label}</div>
              </div>
            ))}
          </div>
          <div className="trust-badges">
            {["Modern Stack", "Mobile Responsive", "Fast Performance", "SEO Optimized"].map(
              (b, i) => (
                <span key={b} className={`trust-badge ${i % 2 === 0 ? "tb-green" : "tb-blue"}`}>
                  {b}
                </span>
              )
            )}
          </div>
        </section>

        <div className="divider" />

        {/* ── OUTRO ── */}
        <section ref={outro.ref} className="outro">
          <div
            className="aurora"
            style={{
              animation: outro.inView
                ? "auroraExpand 4s ease-out forwards"
                : "none",
              opacity: outro.inView ? undefined : 0,
            }}
          />
          <div className="outro-tag">Ready when you are</div>
          <h2 className="outro-h2">
            Let's Build Something
            <br />
            <span className="grad-word">Extraordinary</span> Together.
          </h2>
          <p className="outro-sub">
            Whether you're launching a startup, scaling a business, or bringing
            a new idea to life — Idea2Site is ready to help.
          </p>
          <div className="cta-group">
  <a href="/SendDesignModal" className="cta-primary">
    Start Your Project
  </a>

  <a href="#portfolio" className="cta-secondary">
    View Portfolio →
  </a>
</div>
        </section>
      </div>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  :root {
    --cyan: #00d4ff;
    --blue: #4f8ef7;
    --purple: #a855f7;
    --purple2: #7c3aed;
    --glass: rgba(255,255,255,0.04);
    --glass-border: rgba(255,255,255,0.08);
  }

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #030712;
    color: #e2e8f0;
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
    cursor: none;
  }

  /* CURSOR */
  .cursor {
    position: fixed; width: 12px; height: 12px;
    background: var(--cyan); border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width .2s, height .2s;
    mix-blend-mode: screen;
  }
  .cursor-ring {
    position: fixed; width: 40px; height: 40px;
    border: 1px solid rgba(0,212,255,.3); border-radius: 50%;
    pointer-events: none; z-index: 9998;
    transform: translate(-50%, -50%);
    transition: left .08s, top .08s;
  }

  /* MESH BG */
  .mesh-bg { position: fixed; inset: 0; z-index: 0; overflow: hidden; }
  .orb {
    position: absolute; border-radius: 50%;
    filter: blur(80px); animation: orbFloat 8s ease-in-out infinite;
  }
  .orb1 {
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(0,212,255,.15), transparent 70%);
    top: -100px; left: -100px; animation-delay: 0s;
  }
  .orb2 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(168,85,247,.18), transparent 70%);
    bottom: -50px; right: -50px; animation-delay: -3s;
  }
  .orb3 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(79,142,247,.12), transparent 70%);
    top: 40%; left: 30%; animation-delay: -5s;
  }
  @keyframes orbFloat {
    0%,100% { transform: translate(0,0) scale(1); }
    33% { transform: translate(30px,-30px) scale(1.05); }
    66% { transform: translate(-20px,20px) scale(.95); }
  }

  .particles-canvas {
    position: fixed; inset: 0; z-index: 1;
    pointer-events: none; opacity: .6;
  }

  /* PAGE */
  .page {
    position: relative; z-index: 2;
    max-width: 1100px; margin: 0 auto; padding: 0 40px;
  }

  /* HERO */
  .hero {
    min-height: 100vh; display: flex; flex-direction: column;
    justify-content: center; padding: 80px 0 60px; position: relative;
  }
  .hero-eyebrow {
    font-family: 'DM Sans', sans-serif; font-size: 13px;
    letter-spacing: .2em; text-transform: uppercase; color: var(--cyan);
    opacity: 0; animation: fadeUp .8s .3s forwards;
    display: flex; align-items: center; gap: 10px; margin-bottom: 28px;
  }
  .hero-eyebrow::before {
    content: ''; width: 32px; height: 1px; background: var(--cyan);
  }
  .hero-headline {
    font-family: 'Syne', sans-serif;
    font-size: clamp(48px, 7vw, 88px);
    font-weight: 800; line-height: 1.02;
    letter-spacing: -.03em; margin-bottom: 28px;
  }
  .word { display: inline-block; overflow: hidden; margin-right: .15em; }
  .word-inner {
    display: inline-block;
    transform: translateY(110%); opacity: 0;
    animation: wordReveal .7s cubic-bezier(.16,1,.3,1) forwards;
  }
  @keyframes wordReveal { to { transform: translateY(0); opacity: 1; } }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .grad-word {
    background: linear-gradient(135deg, var(--cyan), var(--blue), var(--purple));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-sub {
    font-size: 18px; font-weight: 300;
    color: rgba(226,232,240,.55); line-height: 1.7; max-width: 560px;
    opacity: 0; animation: fadeUp .8s 1.2s forwards;
  }
  .scroll-hint {
    position: absolute; bottom: 40px; left: 0;
    display: flex; align-items: center; gap: 12px;
    opacity: 0; animation: fadeUp 1s 1.8s forwards;
  }
  .scroll-hint span {
    font-size: 11px; letter-spacing: .15em;
    text-transform: uppercase; color: rgba(226,232,240,.3);
  }
  .scroll-line {
    width: 40px; height: 1px;
    background: linear-gradient(90deg, var(--cyan), transparent);
    animation: scrollLine 2s 2s infinite;
  }
  @keyframes scrollLine {
    0% { width: 0; opacity: 1; } 100% { width: 60px; opacity: 0; }
  }

  /* SECTION */
  section { padding: 100px 0; }
  .section-tag {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 16px; border: 1px solid var(--glass-border);
    border-radius: 100px; font-size: 12px; letter-spacing: .15em;
    text-transform: uppercase; color: var(--cyan);
    background: rgba(0,212,255,.05); margin-bottom: 24px;
  }
  .section-tag::before {
    content: ''; width: 6px; height: 6px;
    border-radius: 50%; background: var(--cyan);
    animation: dotPulse 2s infinite;
  }
  @keyframes dotPulse {
    0%,100% { opacity:1; transform: scale(1); }
    50% { opacity:.4; transform: scale(.8); }
  }
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 700; letter-spacing: -.02em; line-height: 1.1; margin-bottom: 16px;
  }
  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--glass-border), transparent);
  }

  /* STORY */
  .story-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 56px;
  }
  @media(max-width:700px) { .story-grid { grid-template-columns: 1fr; } }
  .story-card {
    position: relative; padding: 36px; border-radius: 20px;
    border: 1px solid var(--glass-border); background: var(--glass);
    backdrop-filter: blur(20px); overflow: hidden;
    transition: opacity .5s, transform .5s, border-color .3s;
  }
  .story-card-wide { grid-column: span 2; }
  @media(max-width:700px) { .story-card-wide { grid-column: span 1; } }
  .story-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(0,212,255,.05), transparent, rgba(168,85,247,.05));
    opacity: 0; transition: opacity .3s;
  }
  .story-card:hover::before { opacity: 1; }
  .story-card:hover { border-color: rgba(0,212,255,.2); transform: translateY(-4px); }
  .story-accent {
    position: absolute; top: 20px; right: 20px;
    width: 60px; height: 60px; border-radius: 50%; opacity: .15;
  }
  .story-year {
    font-size: 12px; letter-spacing: .15em; text-transform: uppercase;
    color: var(--cyan); margin-bottom: 12px;
  }
  .story-h3 { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; margin-bottom: 12px; }
  .story-p { font-size: 15px; color: rgba(226,232,240,.55); line-height: 1.75; }

  /* TIMELINE */
  .tl-wrap { margin-top: 60px; position: relative; }
  .tl-track {
    position: absolute; top: 50px; left: 0; right: 0;
    height: 1px; background: linear-gradient(90deg, transparent, var(--glass-border), var(--glass-border), transparent);
  }
  .tl-line {
    position: absolute; top: 50px; left: 0; height: 1px;
    background: linear-gradient(90deg, var(--cyan), var(--purple));
    transition: width 1.5s cubic-bezier(.22,1,.36,1);
  }
  .tl-steps {
    display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; position: relative;
  }
  @media(max-width:700px) { .tl-steps { grid-template-columns: 1fr 1fr; } }
  .tl-step {
    text-align: center; padding: 40px 20px 24px;
    border-radius: 16px; border: 1px solid transparent;
    transition: opacity .4s, transform .4s, border-color .3s, background .3s;
  }
  .tl-step:hover { border-color: var(--glass-border); background: var(--glass); }
  .tl-dot {
    width: 16px; height: 16px; border-radius: 50%;
    background: #030712; border: 2px solid var(--glass-border);
    margin: 0 auto 24px; transition: border-color .3s, box-shadow .3s;
  }
  .tl-step:hover .tl-dot {
    border-color: var(--cyan);
    box-shadow: 0 0 20px rgba(0,212,255,.4);
  }
  .tl-num {
    font-family: 'Syne', sans-serif; font-size: 40px; font-weight: 800;
    background: linear-gradient(135deg, rgba(0,212,255,.15), rgba(168,85,247,.15));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; display: block; margin-bottom: 8px;
  }
  .tl-h4 { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 8px; }
  .tl-p { font-size: 13px; color: rgba(226,232,240,.45); line-height: 1.6; }

  /* TEAM */
  .team-grid {
    display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 56px;
  }
  @media(max-width:700px) { .team-grid { grid-template-columns: 1fr; } }
  .team-card {
    position: relative; padding: 40px 32px 36px;
    border-radius: 24px; border: 1px solid var(--glass-border);
    background: var(--glass); overflow: hidden;
    transition: opacity .5s, transform .5s, border-color .3s;
    transform-style: preserve-3d;
  }
  .team-card::after {
    content: ''; position: absolute; inset: -1px; border-radius: 24px;
    background: linear-gradient(135deg, rgba(0,212,255,.15), transparent, rgba(168,85,247,.1));
    opacity: 0; transition: opacity .4s; z-index: -1;
  }
  .team-card:hover::after { opacity: 1; }
  .team-card:hover { border-color: rgba(0,212,255,.2); }
  .float-glow {
    position: absolute; border-radius: 50%; filter: blur(40px);
    pointer-events: none; animation: floatGlow 6s ease-in-out infinite;
  }
  .fg1 {
    width: 120px; height: 120px; top: -20px; right: -20px;
    background: radial-gradient(circle, rgba(0,212,255,.1), transparent);
  }
  .fg2 {
    width: 120px; height: 120px; bottom: -20px; left: -20px;
    background: radial-gradient(circle, rgba(168,85,247,.1), transparent);
    animation-delay: -3s;
  }
  @keyframes floatGlow {
    0%,100% { transform: translate(0,0); }
    50% { transform: translate(10px,-10px); }
  }
  .avatar {
    width: 72px; height: 72px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800;
    margin-bottom: 24px; position: relative;
  }
  .avatar::after {
    content: ''; position: absolute; inset: -3px; border-radius: 50%;
    border: 1px solid transparent; animation: avatarGlow 3s ease-in-out infinite;
  }
  .av1 { background: linear-gradient(135deg, rgba(0,212,255,.2), rgba(79,142,247,.2)); color: var(--cyan); }
  .av1::after { border-color: rgba(0,212,255,.3); animation-delay: 0s; }
  .av2 { background: linear-gradient(135deg, rgba(168,85,247,.2), rgba(124,58,237,.2)); color: var(--purple); }
  .av2::after { border-color: rgba(168,85,247,.3); animation-delay: -1s; }
  .av3 { background: linear-gradient(135deg, rgba(79,142,247,.2), rgba(0,212,255,.2)); color: var(--blue); }
  .av3::after { border-color: rgba(79,142,247,.3); animation-delay: -2s; }
  @keyframes avatarGlow { 0%,100% { opacity:.3; } 50% { opacity:1; } }
  .team-name { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; margin-bottom: 4px; }
  .team-role { font-size: 13px; letter-spacing: .05em; margin-bottom: 20px; }
  .skills-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill-pill {
    padding: 4px 12px; border-radius: 100px;
    background: rgba(255,255,255,.04); border: 1px solid var(--glass-border);
    font-size: 11px; color: rgba(226,232,240,.5); letter-spacing: .03em;
    transition: all .2s;
  }
  .team-card:hover .skill-pill { border-color: rgba(0,212,255,.15); color: rgba(226,232,240,.7); }

  /* PROJECTS */
  .proj-grid {
    display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 56px;
  }
  @media(max-width:700px) { .proj-grid { grid-template-columns: 1fr; } }
  .proj-card {
    border-radius: 20px; border: 1px solid var(--glass-border);
    background: var(--glass); overflow: visible; position: relative;
    transition: opacity .5s, transform .5s, border-color .3s;
  }
  .proj-card:hover { border-color: transparent; transform: translateY(-6px); }
  .proj-glow-border {
    position: absolute; inset: -1px; border-radius: 20px;
    background: linear-gradient(135deg, var(--cyan), var(--blue), var(--purple));
    transition: opacity .4s; z-index: 0;
  }
  .proj-inner {
    position: relative; z-index: 1; background: #030712;
    border-radius: 19px; overflow: hidden;
    display: flex; flex-direction: column;
  }
  .proj-preview {
    height: 160px; position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .proj-icon-large {
    font-family: 'Syne', sans-serif; font-size: 48px;
    font-weight: 800; opacity: .15; position: absolute;
  }
  .proj-shine {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,.04) 60%, transparent);
    transition: transform .5s;
  }
  .proj-body { padding: 24px; }
  .proj-tag { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 8px; }
  .proj-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; margin-bottom: 8px; }
  .proj-desc { font-size: 13px; color: rgba(226,232,240,.45); line-height: 1.6; margin-bottom: 20px; }
  .proj-btns { display: flex; gap: 8px; }
  .btn-demo {
    padding: 8px 16px; border-radius: 8px; color: #030712;
    font-size: 12px; font-weight: 600; font-family: 'DM Sans', sans-serif;
    border: none; cursor: pointer; transition: opacity .2s;
  }
  .btn-demo:hover { opacity: .85; }
  .btn-gh {
    padding: 8px 16px; border-radius: 8px; background: transparent;
    color: rgba(226,232,240,.5); font-size: 12px;
    border: 1px solid var(--glass-border); cursor: pointer;
    transition: all .2s; font-family: 'DM Sans', sans-serif;
  }
  .btn-gh:hover { border-color: rgba(226,232,240,.2); color: rgba(226,232,240,.8); }

  /* TRUST */
  .trust-row {
    display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; margin-top: 56px;
  }
  @media(max-width:700px) { .trust-row { grid-template-columns: 1fr 1fr; } }
  .trust-card {
    padding: 32px 24px; border-radius: 16px;
    border: 1px solid var(--glass-border); background: var(--glass);
    text-align: center; transition: opacity .5s, transform .5s, border-color .3s;
  }
  .trust-card:hover { border-color: rgba(0,212,255,.2); background: rgba(0,212,255,.03); }
  .trust-num {
    font-family: 'Syne', sans-serif; font-size: 40px; font-weight: 800;
    background: linear-gradient(135deg, var(--cyan), var(--purple));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; display: block; line-height: 1;
  }
  .trust-label { font-size: 13px; color: rgba(226,232,240,.4); margin-top: 8px; letter-spacing: .03em; }
  .trust-badges { text-align: center; margin-top: 32px; }
  .trust-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 16px; border-radius: 100px;
    border: 1px solid var(--glass-border); background: rgba(255,255,255,.02);
    font-size: 12px; color: rgba(226,232,240,.4); margin: 0 6px;
  }
  .trust-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; }
  .tb-green::before { background: #22c55e; box-shadow: 0 0 8px #22c55e; }
  .tb-blue::before { background: var(--blue); box-shadow: 0 0 8px var(--blue); }

  /* OUTRO */
  .outro {
    min-height: 80vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 100px 0; position: relative;
  }
  .aurora {
    position: absolute; inset: -50%; z-index: -1; border-radius: 50%;
    background: radial-gradient(ellipse, rgba(0,212,255,.08) 0%, rgba(168,85,247,.06) 40%, transparent 70%);
    opacity: 0;
  }
  @keyframes auroraExpand {
    0% { opacity:0; transform: scale(.3); }
    100% { opacity:1; transform: scale(1); }
  }
  .outro-tag {
    font-size: 12px; letter-spacing: .2em; text-transform: uppercase;
    color: var(--cyan); margin-bottom: 32px; opacity: .7;
  }
  .outro-h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(36px, 5vw, 68px);
    font-weight: 800; letter-spacing: -.03em; line-height: 1.05; margin-bottom: 24px;
  }
  .outro-sub {
    font-size: 17px; color: rgba(226,232,240,.45); line-height: 1.7;
    max-width: 540px; margin: 0 auto 48px;
  }
  .cta-group { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .cta-primary {
    padding: 16px 36px; border-radius: 12px;
    background: linear-gradient(135deg, var(--cyan), var(--blue), var(--purple));
    color: #030712; font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700; border: none; cursor: pointer;
    transition: all .3s; position: relative; overflow: hidden;
  }
  .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 20px 60px rgba(0,212,255,.2); }
  .cta-secondary {
    padding: 16px 36px; border-radius: 12px;
    background: transparent; color: rgba(226,232,240,.7);
    font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 600;
    border: 1px solid var(--glass-border); cursor: pointer; transition: all .3s;
  }
  .cta-secondary:hover { border-color: rgba(226,232,240,.2); color: #e2e8f0; transform: translateY(-2px); }
`;