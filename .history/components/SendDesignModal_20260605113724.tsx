import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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
    onClose();
  }

  const handleEmail = () => {
  const subject = encodeURIComponent("New Project Inquiry");
  const body = encodeURIComponent(buildFullMessage());
  window.location.href = `mailto:team.idea2site@gmail.com?subject=${subject}&body=${body}`;
  onClose();
};

// Removed duplicate SendDesignModal definition and export.


  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-slate-900 border border-white/10 max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Send Your Design</DialogTitle>
        </DialogHeader>

        <textarea
          className="w-full p-4 mt-2 border rounded-lg bg-white/10 text-white resize-none h-36"
          placeholder="Describe your idea, include links, notes, etc."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="mt-4">
          <label className="text-white/80 block mb-1">Attach Files</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full file:px-4 file:py-2 file:border-0 file:rounded-full file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
          />
          {files.length > 0 && (
            <ul className="mt-2 text-sm text-white/60 space-y-1">
              {files.map((file, i) => (
                <li key={i}>📎 {file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button onClick={handleWhatsApp} className="bg-green-500 hover:bg-green-600 text-white">
            WhatsApp
          </Button>
          <Button onClick={handleEmail} className="bg-blue-500 hover:bg-blue-600 text-white">
            Email
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
