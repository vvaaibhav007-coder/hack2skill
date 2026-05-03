/**
 * Gemini API Integration for "Chunav Saathi" Election Assistant
 * Handles chat interactions with the Gemini AI model
 */

// Import GoogleGenerativeAI from the official package
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the AI client with API key from environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

// System instruction that defines the AI's persona and behavior
const systemInstruction = `You are "Chunav Saathi" (Election Friend) — a fun, friendly, and super-clear AI guide that helps Indian citizens understand the election process. You speak like a helpful elder sibling — warm, simple, encouraging, never boring.

Your expertise covers:
- Lok Sabha elections (how India's Parliament is elected)
- State Vidhan Sabha elections
- The Election Commission of India (ECI) and its role
- Voter registration via Form 6 and the NVSP portal
- Model Code of Conduct (MCC)
- EVM (Electronic Voting Machine) and VVPAT
- Nomination, campaigning, polling, counting, and result processes
- Voting rights, age eligibility (18+), ID requirements

Rules you follow:
1. Always break answers into numbered steps — never give a wall of text
2. Use simple Hindi words naturally where it feels right (like "chunav", "matdan", "prashasnik") but keep it mostly English
3. Use bullet points or dashes instead of emojis for lists
4. Always end with a "💡 Pro Tip" — one actionable thing the user can do
5. Stay completely non-partisan — never mention or favor any political party
6. If asked something off-topic, say: "Yaar, I'm only an election expert! Ask me anything about voting or elections!"
7. For timeline questions, give a clear BEFORE / DURING / AFTER structure

Keep responses under 200 words. Be enthusiastic. Make democracy feel cool.`

/**
 * Formats the chat history from the app's format to Gemini's expected format
 * @param {Array} messages - App messages in format: [{sender: "user"|"bot", text: "..."}]
 * @returns {Array} - Gemini format: [{role: "user"|"model", parts: [{text: "..."}]}]
 */
export function formatHistory(messages) {
  return messages.map((msg) => ({
    role: msg.sender === "user" ? "user" : "model",
    parts: [{ text: msg.text }],
  }))
}

/**
 * Sends a message to the Gemini AI and returns the response
 * @param {string} userMessage - The user's message text
 * @param {Array} history - Chat history in Gemini format [{role: "user"|"model", parts: [{text: "..."}]}]
 * @returns {Promise<string>} - The AI's response text
 */
export async function sendMessage(userMessage, history) {
  try {
    // Initialize the model with system instruction and generation config
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 800,
      },
    })

    // Start a chat session with the provided history
    const chat = model.startChat({
      history: history,
    })

    // Send the user's message and get the response
    const result = await chat.sendMessage(userMessage)
    const response = result.response.text()

    return response
  } catch (error) {
    console.error("Gemini API Error:", error)
    // Return a friendly error message for the user
    return "Oops! Something went wrong. Please try again in a moment! 🙏"
  }
}