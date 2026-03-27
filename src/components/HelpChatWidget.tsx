import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleQuestion, X, ArrowUp, HelpCircle, AlertTriangle, Smile, Sparkles } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const SUPPORT_EMAIL = "support@spatialchathq.com";

const quickActions = [
  { label: "Ask a question", icon: HelpCircle },
  { label: "Report a bug", icon: AlertTriangle },
  { label: "Give feedback", icon: Smile },
  { label: "Perform an action", icon: Sparkles },
];

// Simple local AI that answers common questions
function getAIResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("event") && (q.includes("create") || q.includes("add") || q.includes("how"))) {
    return "To create an event, go to the **Events** page and click the **Create Event** button. Fill in the details like title, date, and description, then publish it.";
  }
  if (q.includes("leaderboard") || q.includes("points") || q.includes("mpu")) {
    return "The leaderboard is based on **MPU points**. You earn points by liking, commenting, posting, and networking. Admins can customize point values in **Settings → Gamification**.";
  }
  if (q.includes("group") || q.includes("community")) {
    return "You can browse and join groups from the **Community** page. Each group has its own feed, members list, and discussion threads.";
  }
  if (q.includes("networking") || q.includes("connect")) {
    return "Visit the **Networking** page to discover and connect with other members. You can filter by interests and send connection requests.";
  }
  if (q.includes("settings") || q.includes("profile")) {
    return "You can manage your profile and preferences in **Settings**. This includes team management, gamification rules, and user safety controls.";
  }
  if (q.includes("analytics") || q.includes("data") || q.includes("report")) {
    return "Check the **Analytics** page for insights on engagement, events, and community growth. Event-specific analytics are available inside each event.";
  }
  if (q.includes("ban") || q.includes("report") || q.includes("safety") || q.includes("moderat")) {
    return "Admins can manage user safety in **Settings → User Safety**. You can ban words, review reports, and take actions like approving, deleting, or banning users.";
  }
  if (q.includes("chat") || q.includes("message") || q.includes("dm")) {
    return "You can send direct messages from the **Chat** page. Click on any conversation to start messaging.";
  }
  if (q.includes("knowledge") || q.includes("learn") || q.includes("article")) {
    return "The **Knowledge Hub** contains articles, guides, and resources. Browse by category or use the search to find specific topics.";
  }
  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return "Hello! 👋 How can I help you today? Feel free to ask about events, community, networking, or any platform feature.";
  }

  return `I'm not sure about that. For further assistance, please contact our support team at **${SUPPORT_EMAIL}**. They'll be happy to help!`;
}

export default function HelpChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getAIResponse(text);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setIsTyping(false);
    }, 600 + Math.random() * 600);
  };

  const handleQuickAction = (label: string) => {
    sendMessage(label);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            <MessageCircleQuestion className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[560px] rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">How can we help today?</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px] max-h-[360px]">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Sparkles className="h-7 w-7 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-1">Hi there 👋</h4>
                  <p className="text-sm text-muted-foreground mb-5">How can we help you today?</p>
                  <div className="grid grid-cols-2 gap-2 w-full max-w-[280px]">
                    {quickActions.map((a) => (
                      <button
                        key={a.label}
                        onClick={() => handleQuickAction(a.label)}
                        className="flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors text-left"
                      >
                        <a.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          m.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {m.content.split("**").map((part, j) =>
                          j % 2 === 1 ? <strong key={j}>{part}</strong> : <span key={j}>{part}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-xl px-4 py-3 text-sm text-muted-foreground">
                        <span className="animate-pulse">Typing...</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border p-3">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  placeholder="What do you need help with?"
                  rows={2}
                  className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 pr-12 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="absolute right-3 bottom-3 h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-40"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
              <p className="text-center text-[10px] text-muted-foreground mt-2">
                Copilot uses AI to generate responses ⓘ
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}