import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageSquare, Mail, Paperclip, Sparkles, X } from "lucide-react"

interface StartProjectModalProps {
  show: boolean;
  onClose: () => void;
}

export default function StartProjectModal({ show, onClose }: StartProjectModalProps) {
  const [message, setMessage] = useState("")
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles(selectedFiles)
  }

  const buildFullMessage = () => {
    const fileNames = files.map((file) => `• ${file.name}`).join("\n")
    return `${message}\n\nAttached Files:\n${fileNames || "None"}`
  }

  const handleWhatsApp = () => {
    const encodedMsg = encodeURIComponent(buildFullMessage())
    window.open(`https://wa.me/9290914773?text=${encodedMsg}`, "_blank")
    onClose()
  }

  const handleEmail = () => {
    const subject = encodeURIComponent("New Project Inquiry")
    const body = encodeURIComponent(buildFullMessage())
    window.location.href = `mailto:team.idea2site@gmail.com?subject=${subject}&body=${body}`
    onClose()
  }

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <AnimatePresence>
        {show && (
          <DialogContent 
            forceMount
            className="p-0 max-w-lg w-[92%] overflow-hidden bg-slate-950/95 border border-slate-800 rounded-3xl shadow-[0_0_50px_-12px_rgba(6,182,212,0.15)] sm:w-full select-none"
          >
            {/* Idea2Site Trademark Core */}
<div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
  <motion.div
    animate={{
      rotate: 360,
    }}
    transition={{
      repeat: Infinity,
      duration: 40,
      ease: "linear",
    }}
    className="w-[420px] h-[420px] rounded-[35%] border border-cyan-500/10"
  />

  <motion.div
    animate={{
      rotate: -360,
    }}
    transition={{
      repeat: Infinity,
      duration: 30,
      ease: "linear",
    }}
    className="absolute w-[300px] h-[300px] rounded-[40%] border border-purple-500/10"
  />
</div>
            {/* Background Branding Orbs */}
            <div className="absolute top-0 left-1/4 -translate-y-1/2 w-48 h-48 bg-cyan-500/10 blur-[60px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-48 h-48 bg-purple-500/10 blur-[60px] pointer-events-none rounded-full" />

            {/* Custom Content Wrapper with Cinematic Intro/Outro */}
            <motion.div
  initial={{
    opacity: 0,
    scale: 0.82,
    rotateX: 25,
    rotateY: -10,
    y: 50,
    filter: "blur(12px)",
  }}
  animate={{
    opacity: 1,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    y: 0,
    filter: "blur(0px)",
  }}
  exit={{
    opacity: 0,
    scale: 0.9,
    rotateX: -10,
    y: 40,
    filter: "blur(10px)",
  }}
  transition={{
    type: "spring",
    stiffness: 180,
    damping: 18,
  }}
  className="relative z-10 p-6 md:p-8"
>
              {/* Header with Trademark Flair */}
              <DialogHeader className="pb-6 border-b border-slate-800/50">
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.2 }}
    className="flex justify-center mb-6"
  >
    <motion.div
      animate={{
        boxShadow: [
          "0 0 20px rgba(6,182,212,0.2)",
          "0 0 50px rgba(168,85,247,0.4)",
          "0 0 20px rgba(6,182,212,0.2)",
        ],
      }}
      transition={{
        repeat: Infinity,
        duration: 4,
      }}
      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center"
    >
      <span className="text-white font-black text-lg">
        I²S
      </span>
    </motion.div>
  </motion.div>

  <div className="text-center">
    <div className="text-[10px] tracking-[0.35em] uppercase text-cyan-400 mb-2">
      Idea2Site Project Chamber
    </div>

    <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
      Launch Your Digital Vision
    </DialogTitle>

    <p className="mt-3 text-slate-400 text-sm">
      Transform your idea into a premium digital experience.
    </p>
  </div>
</DialogHeader>

              {/* Message Box */}
              <div className="space-y-5">
                <div className="relative group">
                  <textarea
                    className="w-full p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all duration-300 resize-none h-32"
                    placeholder="Describe your vision, goals, or drop custom links here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="mt-4">
  <div className="flex justify-between text-[10px] uppercase tracking-wider text-slate-500 mb-2">
    <span>Idea</span>
    <span>Strategy</span>
    <span>Design</span>
    <span>Build</span>
    <span>Launch</span>
  </div>

  <div className="relative h-1 bg-slate-800 rounded-full overflow-hidden">
    <motion.div
      animate={{
        x: ["-100%", "100%"],
      }}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: "linear",
      }}
      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
    />
  </div>
</div>
                  <div className="absolute bottom-3 right-3 text-[10px] text-slate-600 font-mono">
                    {message.length} chars
                  </div>
                </div>

                {/* File Upload Zone */}
                <div>
                  <label className="relative flex flex-col items-center justify-center w-full h-24 border border-dashed border-slate-800 hover:border-cyan-500/40 rounded-2xl cursor-pointer bg-slate-900/20 hover:bg-slate-900/40 transition-all group overflow-hidden">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center justify-center py-4 text-center">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 group-hover:border-cyan-500/30 transition-all duration-300">
                        <Paperclip className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                      </div>
                      <p className="mt-2 text-xs font-medium text-slate-400 group-hover:text-slate-300">
                        {files.length > 0 ? `${files.length} file(s) selected` : "Attach layouts, wireframes, or references"}
                      </p>
                    </div>
                  </label>

                  {/* Render Selected File Badges */}
                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-h-20 overflow-y-auto custom-scrollbar">
                      {files.map((file, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-400 max-w-[180px] truncate">
                          <Paperclip className="w-2.5 h-2.5 shrink-0 text-cyan-500" />
                          <span className="truncate">{file.name}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dual Routing Strategy Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <Button 
                    onClick={handleWhatsApp} 
                    className="w-full h-12 rounded-xl font-medium bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-300 shadow-lg shadow-emerald-950/20 active:scale-98 flex items-center justify-center gap-2 group"
                  >
                    <MessageSquare className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    <span>Send via WhatsApp</span>
                  </Button>
                  
                  <Button 
                    onClick={handleEmail} 
                    className="w-full h-12 rounded-xl font-medium bg-slate-100 hover:bg-white text-slate-950 transition-all duration-300 shadow-lg shadow-slate-950/10 active:scale-98 flex items-center justify-center gap-2 group"
                  >
                    <Mail className="w-4 h-4 text-slate-700 transition-transform group-hover:-translate-y-0.5" />
                    <span>Send via Email</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}