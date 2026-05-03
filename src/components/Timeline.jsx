import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, ClipboardList, Megaphone, Vote, Hash, Trophy } from "lucide-react"

const stages = [
  {
    number: 1,
    icon: Bell,
    title: "Election Announcement",
    color: "purple",
    details: [
      "ECI announces election schedule",
      "Model Code of Conduct begins",
      "Typically 4-6 weeks before polling",
    ],
  },
  {
    number: 2,
    icon: ClipboardList,
    title: "Voter Registration",
    color: "pink",
    details: [
      "Check your name on electoral rolls at nvsp.in",
      "Register via Form 6 if you're a new voter (18+)",
      "Deadline: usually 2-3 weeks before polling",
    ],
  },
  {
    number: 3,
    icon: Megaphone,
    title: "Nomination & Campaigning",
    color: "orange",
    details: [
      "Candidates file nomination papers",
      "Political parties campaign across constituencies",
      "Campaigning stops 48 hours before polling (silence period)",
    ],
  },
  {
    number: 4,
    icon: Vote,
    title: "Polling Day",
    color: "green",
    details: [
      "Voting happens at your assigned booth",
      "Carry valid photo ID (Voter ID, Aadhaar, Passport, etc.)",
      "EVM + VVPAT system is used",
    ],
  },
  {
    number: 5,
    icon: Hash,
    title: "Vote Counting",
    color: "blue",
    details: [
      "Counting happens at designated counting centers",
      "EVM results are tallied round by round",
      "Usually happens 1-2 days after polling ends",
    ],
  },
  {
    number: 6,
    icon: Trophy,
    title: "Results & Government Formation",
    color: "yellow",
    details: [
      "Winning candidates are declared",
      "Majority party/alliance forms government",
      "President invites leader to form government (Lok Sabha)",
    ],
  },
]

const colorClasses = {
  purple: {
    bg: "bg-purple-950/90",
    badge: "bg-purple-600",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    border: "border-purple-500/50",
  },
  pink: {
    bg: "bg-pink-950/90",
    badge: "bg-pink-600",
    glow: "shadow-[0_0_15px_rgba(236,72,153,0.3)]",
    border: "border-pink-500/50",
  },
  orange: {
    bg: "bg-orange-950/90",
    badge: "bg-orange-600",
    glow: "shadow-[0_0_15px_rgba(249,115,22,0.3)]",
    border: "border-orange-500/50",
  },
  green: {
    bg: "bg-green-950/90",
    badge: "bg-green-600",
    glow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
    border: "border-green-500/50",
  },
  blue: {
    bg: "bg-blue-950/90",
    badge: "bg-blue-600",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    border: "border-blue-500/50",
  },
  yellow: {
    bg: "bg-yellow-950/90",
    badge: "bg-yellow-600",
    glow: "shadow-[0_0_15px_rgba(234,179,8,0.3)]",
    border: "border-yellow-500/50",
  },
}

export default function Timeline({ onTopicSelect }) {
  const [selectedStage, setSelectedStage] = useState(0)

  const handleStageClick = useCallback((index, title) => {
    setSelectedStage(index)
    if (onTopicSelect) {
      onTopicSelect(title)
    }
  }, [onTopicSelect])

  const handleKeyDown = useCallback((e, index, title) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleStageClick(index, title)
    }
  }, [handleStageClick])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="timeline" className="py-16 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center mb-4 text-white">6-Step Election Process</h2>
        <p className="text-white/60 text-center mb-10 font-sans">
          Click on any stage to learn more from the chatbot!
        </p>

        {/* Progress indicator bar */}
        <div className="mb-10 max-w-4xl mx-auto">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${((selectedStage + 1) / 6) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-3 text-xs font-semibold text-white/50 uppercase tracking-wider">
            <span>Stage 1</span>
            <span>Stage 6</span>
          </div>
        </div>

        {/* Horizontal scrollable container */}
        <motion.div
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stages.map((stage, index) => {
            const colors = colorClasses[stage.color]
            const isSelected = selectedStage === index

            return (
              <motion.div
                key={stage.number}
                variants={itemVariants}
                className="flex-shrink-0 w-80"
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 border h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-xl ${colors.bg} ${
                    isSelected
                      ? `scale-[1.02] ${colors.glow} ${colors.border}`
                      : "border-white/5 hover:border-white/20 hover:bg-black/60 opacity-80 hover:opacity-100"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`Select stage ${stage.number}: ${stage.title}`}
                  onClick={() => handleStageClick(index, stage.title)}
                  onKeyDown={(e) => handleKeyDown(e, index, stage.title)}
                >
                  <CardContent className="p-6">
                    {/* Icon */}
                    <div className="flex justify-center mb-4 text-white">
                      <stage.icon className="w-12 h-12" />
                    </div>

                    {/* Stage number badge */}
                    <div className="flex justify-center mb-4">
                      <Badge className={`${colors.badge} text-white font-sans tracking-wide uppercase`}>
                        Stage {stage.number}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-heading font-bold text-center mb-4 text-white">{stage.title}</h3>

                    {/* Detail bullet points */}
                    <ul className="space-y-3">
                      {stage.details.map((detail, i) => (
                        <li
                          key={i}
                          className="text-sm text-white/80 font-sans flex items-start gap-3"
                        >
                          <span className={`${colors.badge} w-2 h-2 rounded-full mt-1.5 flex-shrink-0 shadow-sm`} />
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Mobile scroll hint */}
        <div className="md:hidden text-center mt-2 text-sm font-sans font-medium text-white/40 tracking-wide uppercase">
          ← Swipe to explore →
        </div>
      </div>
    </section>
  )
}