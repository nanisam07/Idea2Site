"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function PortfolioSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative"
    >
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          custom={0}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Meet the Minds Behind Idea 2 Site
          </h1>
        </motion.div>

        {/* Story Content */}
        <motion.div
          variants={fadeInUp}
          custom={1}
          className="max-w-4xl mx-auto space-y-8 text-lg md:text-xl leading-relaxed text-white/90"
        >
          <p>
            It all began with an idea—something I,{" "}
            <strong className="text-pink-400">Samuel Victor</strong>, had envisioned for a while. I took the first steps: planning the concept, designing early drafts, and building the foundation of the website.
          </p>
          <p>
            But even with a clear vision and a working prototype, there came a moment where I started to lose confidence.
          </p>
          <p>
            That’s when I opened up to{" "}
            <strong className="text-cyan-400">Supraja</strong> and{" "}
            <strong className="text-purple-400">Bhavana</strong> about the idea.
          </p>
          <p>
            Their support was instant and unwavering. Bhavana brought beautiful designs. Supraja, with a sharp strategic mind, helped us scale meaningfully.
          </p>
          <p>
            From that moment, we weren’t just working on a project—we became a{" "}
            <strong className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">team</strong>.
          </p>

          <div className="my-12">
            <p className="mb-6 text-xl font-semibold">Each of us brought something unique:</p>
            <ul className="space-y-4 pl-6">
              {[
                {
                  name: "Samuel",
                  color: "bg-pink-400",
                  role: "Led website design and development",
                },
                {
                  name: "Bhavana",
                  color: "bg-purple-400",
                  role: "Enhanced user experience with elegant designs",
                },
                {
                  name: "Supraja",
                  color: "bg-cyan-400",
                  role: "Helped shape design and strategic direction",
                },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  variants={fadeInUp}
                  custom={2 + i}
                  className="flex items-start gap-4"
                >
                  <div className={`w-2 h-2 ${item.color} rounded-full mt-3`} />
                  <p>
                    <strong className={item.color.replace("bg-", "text-")}>
                      {item.name}
                    </strong>{" "}
                    - {item.role}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          <p className="text-xl font-semibold">
            We're not just co-founders. We're a team that believes in each other—step by step.
          </p> 
          <p className="ext-xl font-semibold">
            We don’t just work on projects.
We work with people—closely, collaboratively, and passionately.
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Samuel Victor",
              title: "Founder & Developer",
              tag: "SV",
              desc: "Leading website design, development, and product foundation",
              color: "pink",
            },
            {
              name: "Supraja",
              title: " Co-Founder , Designer & Strategy Planner",
              tag: "S",
              desc: "Contributing to design and strategic direction with purpose",
              color: "cyan",
            },
            {
              name: "Bhavana",
              title: " Co founder & UI/UX Designer",
              tag: "B",
              desc: "Creating elegant, thoughtful designs and enhanced user experiences",
              color: "purple",
            },
          ].map((person, i) => (
            <motion.div
              key={person.name}
              variants={fadeInUp}
              custom={5 + i}
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-${person.color}-400/30 transition-all duration-300`}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br from-${person.color}-400 to-${person.color}-600 rounded-full flex items-center justify-center mb-4`}
              >
                <span className="text-white font-bold text-lg">{person.tag}</span>
              </div>
              <h3 className={`text-xl font-semibold text-${person.color}-400 mb-2`}>
                {person.name}
              </h3>
              <p className="text-white/70">{person.title}</p>
              <p className="text-sm text-white/60 mt-2">{person.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
    </motion.div>
  );
}
