import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Idea2site",
  description: "Transforming businesses through innovative technology solutions",
    generator: 'v0.dev',
    icons: {
    icon: "/idea2site.png", // or .png if that's your file
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
