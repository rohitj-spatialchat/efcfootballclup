import { motion } from "framer-motion";
import { ArrowUp, Sparkles, Plus, MessageSquare, Loader2 } from "lucide-react";
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

const aiResponses: Record<string, string> = {
  "Hamstring injury prevention": "Hamstring injury prevention in football involves a multi-faceted approach:\n\n1. **Nordic Hamstring Exercise (NHE)**: The gold standard — shown to reduce hamstring injuries by up to 51% when performed regularly.\n2. **Eccentric strengthening**: Progressive overload targeting the biceps femoris long head.\n3. **Sprint training**: Gradual exposure to high-speed running distances.\n4. **Load monitoring**: Tracking acute:chronic workload ratios to avoid spikes above 1.5.\n5. **Flexibility**: Dynamic warm-ups before sessions, static stretching post-training.\n\nKey insight: Most hamstring injuries occur during the late swing phase of sprinting when the muscle is eccentrically loaded at high velocities.",
  "ACL recovery timeline": "ACL recovery timelines for elite footballers typically follow this progression:\n\n• **Weeks 0-6**: Post-surgery rehabilitation, focus on reducing swelling and restoring range of motion\n• **Weeks 6-12**: Progressive strengthening, stationary cycling, pool-based rehab\n• **Months 3-6**: Running progression, agility drills, sport-specific movements\n• **Months 6-9**: Full training integration, match simulation\n• **Months 9-12**: Return to competitive play\n\nModern protocols emphasize psychological readiness alongside physical benchmarks. Research shows that fear of re-injury is a significant factor in re-injury rates.",
  "GPS load monitoring": "GPS load monitoring in football has revolutionized training periodization:\n\n**Key Metrics:**\n• Total distance covered\n• High-speed running distance (>5.5 m/s)\n• Sprint distance (>7 m/s)\n• Accelerations/decelerations\n• PlayerLoad™ (tri-axial accelerometer data)\n\n**Best Practices:**\n1. Establish individual baselines over 4-6 weeks\n2. Monitor acute:chronic workload ratio (keep between 0.8-1.3)\n3. Flag exposures exceeding 1.5x chronic load\n4. Integrate with RPE and wellness questionnaires\n5. Use rolling 28-day averages for chronic load calculation\n\nClubs using systematic GPS monitoring report 20-30% reduction in non-contact injuries.",
  "Return to play protocols": "Return-to-play (RTP) protocols in professional football follow evidence-based criteria:\n\n**Physical Benchmarks:**\n• Limb symmetry index >90% for strength tests\n• Single-leg hop tests within 10% of uninvolved side\n• Completion of sport-specific agility tests without pain\n• Match-intensity training tolerance over 3+ sessions\n\n**Psychological Readiness:**\n• ACL-RSI score >56/100\n• Confidence in full-speed movements\n• No fear avoidance behaviors during training\n\n**Progressive Framework:**\n1. Rehab exercises → 2. Running → 3. Agility → 4. Sport-specific drills → 5. Modified training → 6. Full training → 7. Match play\n\nThe multi-disciplinary approach involving physiotherapists, sports scientists, psychologists, and coaches yields the best outcomes.",
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function AISearchPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null);

  const handleSend = (text?: string) => {
    const q = (text || query).trim();
    if (!q || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: q };
    setMessages(prev => [...prev, userMessage]);
    setQuery("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const matchedKey = Object.keys(aiResponses).find(k => q.toLowerCase().includes(k.toLowerCase()));
      const response = matchedKey
        ? aiResponses[matchedKey]
        : `Great question about "${q}"!\n\nBased on the latest research in sports science and football medicine, here are the key considerations:\n\n1. **Evidence-based approach**: Always prioritize peer-reviewed research and validated protocols.\n2. **Individualization**: Each athlete's response varies — consider age, injury history, and position demands.\n3. **Multidisciplinary collaboration**: Involve medical staff, coaches, and sports scientists in decision-making.\n4. **Progressive loading**: Gradual exposure is key to adaptation and injury prevention.\n\nWould you like me to dive deeper into any specific aspect of this topic?`;

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 1500);
  };

  const handleNewChat = () => {
    setMessages([]);
    setQuery("");
    setActiveChatIndex(null);
  };

  const handlePreviousChat = (chat: string, index: number) => {
    setMessages([]);
    setActiveChatIndex(index);
    handleSend(chat);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex h-[calc(100vh-3.5rem)] -m-6">
      {/* Sidebar - Chat History */}
      <div className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-card">
        <div className="p-3">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
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
              onClick={() => handlePreviousChat(chat, i)}
              className={`w-full text-left flex items-start gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                activeChatIndex === i ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
              }`}
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
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 mb-4">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <h1 className="text-2xl font-semibold text-foreground mb-2">EFC AI Assistant</h1>
                <p className="text-sm text-muted-foreground">
                  Ask me anything about football medicine, sports science, injury prevention, and performance optimization.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {[
                    "Hamstring injury prevention",
                    "ACL recovery timeline",
                    "GPS load monitoring",
                    "Return to play protocols",
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground hover:bg-muted transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-6">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div className={`rounded-xl px-4 py-3 max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}>
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-xl px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Input Area - Bottom */}
        <div className="border-t border-border p-4">
          <div className="max-w-2xl mx-auto relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Message EFC AI..."
              rows={1}
              className="w-full resize-none rounded-xl border border-input bg-card px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow shadow-card"
              style={{ minHeight: 48 }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!query.trim() || isLoading}
              className="absolute right-3 bottom-3 h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
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
