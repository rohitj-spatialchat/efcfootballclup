import { motion } from "framer-motion";
import { MessageSquare, MoreVertical, Calendar, Plus, Activity, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const statCards = [
  { icon: MessageSquare, value: "2", label: "Active Polls", color: "text-primary" },
  { icon: MoreVertical, value: "3", label: "Q&A Questions", color: "text-success" },
  { icon: MessageSquare, value: "3", label: "Chat Messages", color: "text-warning" },
  { icon: Activity, value: "78%", label: "Avg Engagement", color: "text-primary" },
];

const polls = [
  {
    question: "What feature would you like to see next?",
    responses: 156,
    event: "Product Launch Webinar",
    options: [
      { label: "AI Networking", pct: 40, votes: 62 },
      { label: "Mobile App", pct: 35, votes: 54 },
      { label: "Advanced Analytics", pct: 25, votes: 40 },
    ],
  },
  {
    question: "How would you rate this session?",
    responses: 89,
    event: "Q1 Team All-Hands",
    options: [
      { label: "Excellent", pct: 58, votes: 52 },
      { label: "Good", pct: 31, votes: 28 },
      { label: "Average", pct: 10, votes: 9 },
    ],
  },
];

const questions = [
  { q: "How does the new pricing model work?", votes: 24, status: "Answered", author: "Sarah Johnson", time: "5 min ago", event: "Product Launch Webinar", answer: "Great question! The new pricing is based on active users per month..." },
  { q: "Will there be API documentation available?", votes: 18, status: "Pending", author: "Michael Chen", time: "8 min ago", event: "Product Launch Webinar" },
  { q: "What are the system requirements?", votes: 12, status: "Answered", author: "Emily Rodriguez", time: "15 min ago", event: "Customer Success Summit", answer: "The platform works on all modern browsers..." },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function EngagementPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Actions */}
      <motion.div variants={item} className="flex items-center gap-3">
        <button className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-primary hover:bg-muted transition-colors">
          <Calendar className="h-3.5 w-3.5" /> View History
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-3.5 w-3.5" /> Create Poll
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-3">
              <s.icon className={cn("h-6 w-6", s.color)} />
              <div>
                <p className="text-3xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Polls + Q&A */}
      <div className="grid grid-cols-3 gap-6">
        {/* Active Polls */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Active Polls</h2>
            <button className="text-sm text-muted-foreground hover:text-foreground">View All</button>
          </div>
          {polls.map((poll) => (
            <motion.div key={poll.question} variants={item} className="rounded-lg border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">{poll.question}</h3>
                <span className="text-xs text-muted-foreground">{poll.responses} responses</span>
              </div>
              <div className="space-y-3">
                {poll.options.map((opt) => (
                  <div key={opt.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{opt.label}</span>
                      <span className="text-sm text-muted-foreground">{opt.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted overflow-hidden mb-1">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${opt.pct}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{opt.votes} votes</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">{poll.event}</span>
                <button className="text-xs text-primary hover:underline">View Details</button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Q&A */}
        <motion.div variants={item} className="rounded-lg border border-border bg-card p-5 shadow-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Q&A Questions</h2>
          <div className="space-y-4">
            {questions.map((q) => (
              <div key={q.q} className="space-y-2">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">{q.votes}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground">{q.q}</h4>
                      <span className={cn("text-xs font-medium", q.status === "Answered" ? "text-success" : "text-destructive")}>
                        {q.status === "Answered" ? "✓ Answered" : "Pending"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Asked by {q.author} • {q.time} • {q.event}
                    </p>
                    {q.answer && (
                      <div className="mt-2 pl-3 border-l-2 border-success/30">
                        <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Answer:</span> {q.answer}</p>
                      </div>
                    )}
                    {q.status === "Pending" && (
                      <button className="mt-2 inline-flex items-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                        Answer Question
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
