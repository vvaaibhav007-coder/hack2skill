import { useState, useCallback, useRef } from "react"
import { sendMessage, formatHistory } from "@/lib/gemini"

const welcomeMessage = "Namaste! 🙏 I'm Chunav Saathi, your personal election guide. Ask me anything about Indian elections — voter registration, polling day, how votes are counted, or anything else! 🗳️"

const welcomeMsg = {
  id: "welcome",
  sender: "bot",
  text: welcomeMessage,
  timestamp: Date.now(),
}

export function useChat() {
  const [messages, setMessages] = useState([welcomeMsg])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const sendUserMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)
    setError(null)
    scrollToBottom()

    try {
      const history = formatHistory(
        messages.map((m) => ({
          sender: m.sender,
          text: m.text,
        }))
      )
      const response = await sendMessage(text, history)

      const botMsg = {
        id: Date.now().toString() + 1,
        sender: "bot",
        text: response,
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, botMsg])
      scrollToBottom()
    } catch (err) {
      setError(err.message)
      const errorMsg = {
        id: Date.now().toString() + 1,
        sender: "bot",
        text: "Oops! Something went wrong. Please try again! 🙏",
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, errorMsg])
      scrollToBottom()
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, messages, scrollToBottom])

  const clearChat = useCallback(() => {
    setMessages([welcomeMsg])
    setError(null)
    setIsLoading(false)
  }, [])

  return {
    messages,
    isLoading,
    error,
    sendUserMessage,
    clearChat,
    messagesEndRef,
  }
}