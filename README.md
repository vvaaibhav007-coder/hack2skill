<div align="center">
  <h1>🗳️ Chunav Saathi — ElectionGuide India 🇮🇳</h1>
  <p><strong>India's most fun and interactive election guide for first-time voters.</strong></p>
</div>

---

## 📌 Problem Statement
Most first-time Indian voters (especially the youth) find the election process confusing and intimidating. The sheer amount of administrative jargon, multi-stage timelines, and registration procedures can often discourage young citizens from participating. There is a need for a modern, accessible, and friendly platform to simplify democracy.

## 💡 Solution
**Chunav Saathi** bridges this gap by offering a vibrant, interactive platform. It features an engaging 6-stage interactive election timeline and an AI-powered chatbot that acts as a friendly, knowledgeable elder sibling to answer any questions about the electoral process in India.

## ✨ Features
*   **🗺️ 6-stage interactive election timeline:** Click through the entire journey from announcement to results.
*   **🤖 Gemini-powered AI chatbot (Chunav Saathi):** Get your doubts cleared instantly.
*   **📱 Mobile-first responsive design:** Looks great and works perfectly on all devices.
*   **⚡ Covers Lok Sabha + State elections:** Comprehensive knowledge base.
*   **🎨 Gen-Z friendly colorful UI:** Bright gradients, engaging 3D assets, and emoji-rich interfaces.
*   **🌐 Built on Google Antigravity + React:** Fast, modern web technologies.

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19 + Vite** | Core frontend framework and fast bundler |
| **Tailwind CSS** | Rapid, utility-first styling |
| **Framer Motion** | Smooth, fluid UI animations and page transitions |
| **Google Gemini API** | Powers the intelligent "Chunav Saathi" chatbot |
| **Spline 3D** | Immersive 3D background elements |
| **Shadcn/UI & Radix UI** | Accessible, customizable UI components (Buttons, Cards, Badges, etc.) |

## 🧠 Prompt Engineering

The system prompt for "Chunav Saathi" was carefully designed to ensure the best possible user experience:
*   **Persona:** We defined the AI as a "warm, simple, encouraging elder sibling" to make the intimidating process feel approachable.
*   **Non-Partisan:** A strict rule to remain completely neutral and never favor any political party ensures trust and objectivity.
*   **Structured Output:** We mandated numbered steps and the avoidance of "walls of text" to keep answers digestible for mobile readers.
*   **Hindi Integration:** Instructed the AI to use simple Hindi terms (like "chunav" or "matdan") naturally to create a localized, familiar feel.
*   **Pro Tips:** Every answer must end with an actionable "💡 Pro Tip" to encourage active participation.

## 🚀 Setup & Installation

Follow these steps to run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd election_guide
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your Google Gemini API key:
    ```bash
    VITE_GEMINI_API_KEY=your_gemini_api_key_here
    ```
    *(You can copy `.env.example` to `.env` and fill in the value)*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 📁 Project Structure

```
election_guide/
├── src/
│   ├── components/
│   │   ├── ChatBot.jsx       # Gemini-powered chat interface
│   │   ├── Hero.jsx          # Landing section with Spline 3D
│   │   ├── Timeline.jsx      # Interactive election timeline
│   │   └── ui/               # Shadcn UI components
│   ├── lib/
│   │   ├── gemini.js         # Gemini API integration & prompt
│   │   └── utils.ts          # Utility functions
│   ├── App.jsx               # Main application component
│   ├── index.css             # Global styles and Tailwind config
│   └── main.jsx              # Application entry point
├── .env.example              # Example environment variables
├── package.json              # Project dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
└── vite.config.ts            # Vite configuration
```

## 📸 Screenshots

![Hero Section]([Add screenshot here])
*The engaging hero section with 3D elements.*

![Interactive Timeline]([Add screenshot here])
*The 6-stage interactive election timeline.*

![Chunav Saathi Chatbot]([Add screenshot here])
*Asking questions to the Chunav Saathi AI chatbot.*

## 🔗 Live Demo

[Add live demo link here]

## ✍️ Author

**[Your Name]**
*   GitHub: [Placeholder Link]
*   LinkedIn: [Placeholder Link]

## 📄 License

This project is licensed under the MIT License.
