import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { sendMessage, formatHistory } from "@/lib/gemini"
import { Bot, User, Vote } from "lucide-react"

const quickQuestions = [
  "How do I register to vote?",
  "What is EVM?",
  "When is silence period?",
  "What ID do I need?",
  "How are votes counted?",
  "Who is eligible to vote?",
]

const welcomeMessage = "Namaste! I'm Chunav Saathi, your personal election guide. Ask me anything about Indian elections — voter registration, polling day, how votes are counted, or anything else!"

export default function ChatBot({ initialTopic }) {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: welcomeMessage,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef(null)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (initialTopic && !hasInitialized.current) {
      hasInitialized.current = true
      const topicMessage = `Tell me about ${initialTopic}`
      handleSendMessage(topicMessage)
    }
  }, [initialTopic])

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        const scrollElement = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]")
        if (scrollElement) {
          scrollElement.scrollTop = scrollElement.scrollHeight
        }
      }, 100)
    }
  }, [])

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    scrollToBottom()

    try {
      const history = formatHistory(
        messages.filter((m) => m.role !== "assistant" || m.id !== "welcome").map((m) => ({
          sender: m.role === "user" ? "user" : "bot",
          text: m.content,
        }))
      )
      const response = await sendMessage(messageText, history)
      const assistantMessage = {
        id: Date.now().toString() + 1,
        role: "assistant",
        content: response,
      }
      setMessages((prev) => [...prev, assistantMessage])
      scrollToBottom()
    } catch (error) {
      const errorMessage = {
        id: Date.now().toString() + 1,
        role: "assistant",
        content: "Oops! Something went wrong. Please try again! 🙏",
      }
      setMessages((prev) => [...prev, errorMessage])
      scrollToBottom()
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestion = (question) => {
    handleSendMessage(question)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(input)
    }
  }

  return (
    <section id="chatbot" className="py-16 bg-transparent">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-heading font-bold text-center mb-4 text-white flex items-center justify-center gap-3">
          <Vote className="w-10 h-10 text-violet-400" />
          Chunav Saathi
        </h2>
        <p className="text-white/60 font-sans text-center mb-8">Your personal election guide</p>

        {/* Quick Question Chips */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {quickQuestions.map((question, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer bg-black/80 border-violet-500/30 text-violet-200 hover:bg-violet-600 hover:text-white hover:border-violet-500 transition-all duration-300 px-4 py-2 text-sm font-sans"
              onClick={() => handleQuickQuestion(question)}
            >
              {question}
            </Badge>
          ))}
        </div>

        <Card className="h-[550px] flex flex-col border border-white/10 bg-black/90 shadow-[0_0_40px_rgba(139,92,246,0.15)] rounded-2xl overflow-hidden">
          <CardHeader className="pb-4 border-b border-white/10 bg-black/90">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Bot className="w-8 h-8 text-violet-400" />
              <span className="text-violet-400 font-heading font-bold">
                Ask me anything!
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0 relative">
            <div className="absolute inset-0 bg-violet-950/10 pointer-events-none" />
            <ScrollArea className="h-full p-6" ref={scrollRef}>
              <div className="space-y-6" role="log" aria-live="polite" aria-label="Chat messages">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{
                        opacity: 0,
                        y: 20,
                        scale: 0.95,
                      }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`flex gap-4 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-xl shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                          <Bot className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-5 py-4 shadow-lg ${
                          message.role === "user"
                            ? "bg-violet-600 text-white rounded-tr-sm"
                            : "bg-neutral-900 border border-white/10 text-slate-100 rounded-tl-sm"
                        }`}
                      >
                        <p className="text-[15px] leading-relaxed font-sans whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {message.role === "user" && (
                        <div className="w-10 h-10 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-xl shrink-0">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Loading State with Bouncing Dots */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-xl shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-neutral-900 border border-white/10 rounded-2xl px-5 py-4 rounded-tl-sm">
                      <div className="flex gap-1.5 h-6 items-center">
                        <span className="w-2.5 h-2.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2.5 h-2.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2.5 h-2.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          {/* Input Area */}
          <div className="p-5 border-t border-white/10 bg-black/90">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage(input)
              }}
              className="flex gap-3"
            >
              <Input
                id="chatbot-input"
                aria-label="Type your question for the election guide"
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1 bg-neutral-900 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-violet-500 focus-visible:border-violet-500 h-12 text-base transition-all rounded-xl"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="bg-violet-600 hover:bg-violet-500 text-white border-0 h-12 px-6 rounded-xl font-semibold shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
              >
                Send
              </Button>
            </form>
            <p className="text-xs text-white/30 mt-3 text-center font-sans tracking-wide">Press Enter to send</p>
          </div>
        </Card>
      </div>
    </section>
  )
}