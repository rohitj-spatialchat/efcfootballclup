import { motion } from "framer-motion";
import { ArrowUp, Sparkles, Plus, MessageSquare } from "lucide-react";
import { useState } from "react";

const previousChats = [
  "Why do hamstring injuries keep recurring in elite footballers?",
  "Best injury prevention programs for pre-season training",
  "ACL vs meniscus injuries and their impact on career longevity",
  "Return-to-play criteria after muscle strain injuries",
  "How load management reduces soft tissue injuries",
  "Groin muscle dysfunction diagnosis and treatment protocols",
  "Ankle sprains in football: rehabilitation timelines",
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function AISearchPage() {
  const [query, setQuery] = useState("");

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex h-[calc(100vh-3.5rem)] -m-6">
      {/* Sidebar - Chat History */}
      <div className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-card">
        <div className="p-3">
          <button className="w-full flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
            <Plus className="h-4 w-4" /> New Chat
          </button>
        </div>
        <div className="px-3 mb-2">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider px-2">Previous Chats</p>
        </div>
        <div className="flex-1 overflow-y-auto px-3 space-y-0.5">
          {previousChats.map((chat, i) => (
            <button
              key={i}
              onClick={() => setQuery(chat)}
              className="w-full text-left flex items-start gap-2 px-3 py-2 rounded-md text-sm text-foreground hover:bg-muted transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5 mt-0.5 shrink-0 text-muted-foreground" />
              <span className="line-clamp-1">{chat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages Area */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 mb-4">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">EFC AI Assistant</h1>
            <p className="text-sm text-muted-foreground">
              Ask me anything about football medicine, sports science, injury prevention, and performance optimization.
            </p>
            {/* Suggestion chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {[
                "Hamstring injury prevention",
                "ACL recovery timeline",
                "GPS load monitoring",
                "Return to play protocols",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground hover:bg-muted transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Area - Bottom */}
        <div className="border-t border-border p-4">
          <div className="max-w-2xl mx-auto relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Message EFC AI..."
              rows={1}
              className="w-full resize-none rounded-xl border border-input bg-card px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow shadow-card"
              style={{ minHeight: 48 }}
            />
            <button className="absolute right-3 bottom-3 h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-2">
            EFC AI can make mistakes. Verify important information with qualified professionals.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
