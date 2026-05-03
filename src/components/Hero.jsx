import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Vote, Flag, CheckCircle, ClipboardList } from "lucide-react"

const floatingIcons = [
  <Vote key="1" className="w-10 h-10 text-violet-400" />,
  <Flag key="2" className="w-10 h-10 text-orange-400" />,
  <CheckCircle key="3" className="w-10 h-10 text-green-400" />,
  <ClipboardList key="4" className="w-10 h-10 text-blue-400" />
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Floating Emojis */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {floatingIcons.map((icon, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${15 + index * 20}%`,
              top: `${20 + (index % 2) * 30}%`,
            }}
            animate={{
              y: [-10, 10],
            }}
            transition={{
              duration: 2 + index * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 relative z-30 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="inline-block mb-4">
          <span className="px-4 py-2 rounded-full bg-violet-900/80 border border-violet-500/30 text-violet-300 text-sm font-semibold tracking-wider uppercase font-sans">
            Interactive Election Guide
          </span>
        </motion.div>
        
        <motion.h1
          className="text-white mb-6 font-heading font-bold"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 1.1 }}
          variants={itemVariants}
        >
          <Vote className="inline-block w-[clamp(3rem,8vw,6rem)] h-[clamp(3rem,8vw,6rem)] text-violet-400 mr-4 align-top" /> Chunav <span className="text-violet-400">Saathi</span>
        </motion.h1>

        <motion.p
          className="text-white/80 text-lg md:text-2xl mb-10 max-w-3xl mx-auto font-sans font-light"
          variants={itemVariants}
        >
          India&apos;s most immersive election guide — designed for the youth to understand their democratic rights.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          variants={itemVariants}
        >
          <Button
            size="lg"
            className="bg-violet-600 hover:bg-violet-500 text-white border-0 h-14 px-8 rounded-full text-lg shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all"
            onClick={() => scrollToSection("chatbot")}
          >
            Start Chatting →
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 bg-black/80 h-14 px-8 rounded-full text-lg transition-all"
            onClick={() => scrollToSection("timeline")}
          >
            See Timeline
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}