import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Main Navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-white/10"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl font-heading font-bold text-white tracking-wide">Election Guide</span>
            <span className="text-violet-400 font-medium text-sm font-sans uppercase">India</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Go to Home section"
              className="text-white/80 hover:text-white hover:bg-white/10 transition-colors font-sans font-medium"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.getElementById("timeline")?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Go to Process section"
              className="text-white/80 hover:text-white hover:bg-white/10 transition-colors font-sans font-medium"
            >
              Process
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.getElementById("chatbot")?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Go to FAQ/Chatbot section"
              className="text-white/80 hover:text-white hover:bg-white/10 transition-colors font-sans font-medium"
            >
              FAQ
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}