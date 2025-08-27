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

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-black max-w-4xl w-full rounded-2xl p-8 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Start Your Project
          </DialogTitle>
        </DialogHeader>

        <textarea
          className="w-full p-4 mt-4 bg-gray-700 text-white placeholder-gray-400 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none h-40"
          placeholder="Describe your idea, include links, notes, etc."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="mt-6">
          <label className="text-gray-300 block mb-2 font-medium">Attach Files</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full file:px-6 file:py-3 file:border-0 file:rounded-full file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 file:text-white file:font-semibold file:shadow-lg hover:file:from-purple-600 hover:file:to-pink-600 transition-all cursor-pointer"
          />
          {files.length > 0 && (
            <ul className="mt-4 text-sm text-gray-400 space-y-2">
              {files.map((file, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-purple-400 mr-2">🔗</span> {file.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <Button 
            onClick={handleWhatsApp} 
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-full shadow-lg transition-all"
          >
            Send via WhatsApp
          </Button>
          <Button 
            onClick={handleEmail} 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-full shadow-lg transition-all"
          >
            Send via Email
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}