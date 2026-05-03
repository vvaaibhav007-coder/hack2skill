import { useState, useEffect, Suspense, lazy, useCallback } from "react"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Timeline from "@/components/Timeline"
import ChatBot from "@/components/ChatBot"
import { Map, MessageSquare, Heart, MessageCircle } from "lucide-react"

// Efficiency: Lazy load heavy 3D library to improve initial bundle size
const Spline = lazy(() => import("@splinetool/react-spline"))

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [showFloatingButton, setShowFloatingButton] = useState(true)
  const [splineLoaded, setSplineLoaded] = useState(false)

  const handleTopicSelect = useCallback((title: string) => {
    setSelectedTopic(title)
    const chatbotSection = document.getElementById("chatbot")
    if (chatbotSection) {
      chatbotSection.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const chatbotSection = document.getElementById("chatbot")
      if (chatbotSection) {
        const rect = chatbotSection.getBoundingClientRect()
        setShowFloatingButton(rect.top > window.innerHeight)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToChatbot = () => {
    const chatbotSection = document.getElementById("chatbot")
    if (chatbotSection) {
      chatbotSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative min-h-screen bg-black text-slate-50 font-sans">
      {/* Global Interactive Spline Background */}
      <div className="fixed inset-0 z-0">
        <Suspense
          fallback={
            <div className="h-full w-full flex items-center justify-center bg-black">
              <p className="text-white/50">Loading 3D experience...</p>
            </div>
          }
        >
          {!splineLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-black">
              <p className="text-white/50">Loading 3D experience...</p>
            </div>
          )}
          <Spline
            scene="https://prod.spline.design/4m-o29o9-XBFAUAv/scene.splinecode"
            onLoad={() => setSplineLoaded(true)}
          />
        </Suspense>
        {/* Dark overlay to ensure text is readable over the 3D model */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none z-10" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />

          {/* Timeline Section */}
          <section id="timeline" className="py-24">
            <h2 className="text-5xl font-heading font-bold text-center mb-12">
              <span className="text-white flex items-center justify-center gap-4">
                <Map className="w-12 h-12 text-violet-400" />
                How Elections Work in India
              </span>
            </h2>
            <Timeline onTopicSelect={handleTopicSelect} />
          </section>

          {/* ChatBot Section */}
          <section id="chatbot" className="py-24">
            <h2 className="text-5xl font-heading font-bold text-center mb-8">
              <span className="text-white flex items-center justify-center gap-4">
                <MessageSquare className="w-12 h-12 text-violet-400" />
                Ask Chunav Saathi Anything
              </span>
            </h2>
            <ChatBot initialTopic={selectedTopic} />
          </section>
        </main>

        {/* Floating Chat Button */}
        {showFloatingButton && (
          <button
            onClick={scrollToChatbot}
            aria-label="Open Chatbot"
            className="fixed bottom-6 right-6 bg-violet-600 text-white px-6 py-3 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold z-50"
          >
            <MessageCircle className="w-6 h-6" aria-hidden="true" />
            <span>Chat</span>
          </button>
        )}

        {/* Footer */}
        <footer className="py-8 border-t border-white/10 bg-black/90 text-center text-sm text-violet-300">
          <p>
            Built with <Heart className="inline-block w-4 h-4 text-red-500 mx-1 fill-current" /> for{" "}
            <span className="text-violet-400 font-semibold">Prompt Wars Challenge 2</span>
            {" "}| Powered by{" "}
            <span className="text-violet-400 font-semibold">Gemini AI</span>
            {" "}+{" "}
            <span className="text-violet-400 font-semibold">Google Antigravity</span>
          </p>
        </footer>
      </div>
    </div>
  )
}