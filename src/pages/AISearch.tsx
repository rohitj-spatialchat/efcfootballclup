import { motion } from "framer-motion";
import { Search, Plus, ArrowUp, Sparkles } from "lucide-react";
import { useState } from "react";

const suggestedQuestions = [
  "Why do hamstring injuries keep...",
  "Best injury prevention programs...",
  "ACL vs meniscus injuries and th...",
  "Return-to-play criteria after mus...",
  "How load management reduces...",
  "Groin muscle dysfunction diagno...",
  "Ankle sprains in football: rehab...",
  "Sports science vs traditional rou...",
  "How data-driven analysis helps...",
  "Hamstring strength imbalance a...",
  "Why muscle injuries spike during...",
  "Preventing non-contact injuries...",
  "GPS data and its role in football...",
  "Managing player fatigue across...",
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function AISearchPage() {
  const [query, setQuery] = useState("");

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto space-y-8 py-12">
      {/* Header */}
      <motion.div variants={item} className="text-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">EFC AI Search</span>
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">What's on the agenda today?</h1>
      </motion.div>

      {/* Search Input */}
      <motion.div variants={item} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything..."
          className="w-full h-12 rounded-xl border border-input bg-card pl-4 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow shadow-card"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
          <ArrowUp className="h-4 w-4" />
        </button>
      </motion.div>

      {/* Suggested Questions */}
      <motion.div variants={item}>
        <h3 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Chats</h3>
        <div className="space-y-0.5">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => setQuery(q)}
              className="w-full text-left px-3 py-2 rounded-md text-sm text-foreground hover:bg-muted transition-colors truncate"
            >
              {q}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
