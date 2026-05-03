import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function QuickChips({ questions, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-wrap gap-2 justify-center"
    >
      {questions.map((question, index) => (
        <motion.div
          key={question}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelect(question)}
            className="rounded-full"
          >
            {question}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}