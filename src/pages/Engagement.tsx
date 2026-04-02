import { motion } from "framer-motion";
import { MessageSquare, MoreVertical, Calendar, Plus, Activity, ChevronUp, Send, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

const initialPolls = [
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

const initialQuestions = [
  { q: "How does the new pricing model work?", votes: 24, status: "Answered" as const, author: "Sarah Johnson", time: "5 min ago", event: "Product Launch Webinar", answer: "Great question! The new pricing is based on active users per month..." },
  { q: "Will there be API documentation available?", votes: 18, status: "Pending" as const, author: "Michael Chen", time: "8 min ago", event: "Product Launch Webinar", answer: undefined },
  { q: "What are the system requirements?", votes: 12, status: "Answered" as const, author: "Emily Rodriguez", time: "15 min ago", event: "Customer Success Summit", answer: "The platform works on all modern browsers..." },
];

export default function EngagementPage() {
  const { toast } = useToast();
  const [polls, setPolls] = useState(initialPolls);
  const [questions, setQuestions] = useState(initialQuestions);

  // Create Poll
  const [createPollOpen, setCreatePollOpen] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", "", ""]);

  // Answer Q&A
  const [answerIdx, setAnswerIdx] = useState<number | null>(null);
  const [answerText, setAnswerText] = useState("");

  // Poll detail
  const [pollDetailIdx, setPollDetailIdx] = useState<number | null>(null);

  // View History
  const [historyOpen, setHistoryOpen] = useState(false);

  const handleCreatePoll = () => {
    if (!pollQuestion.trim()) { toast({ title: "Question required", variant: "destructive" }); return; }
    const validOptions = pollOptions.filter(o => o.trim());
    if (validOptions.length < 2) { toast({ title: "At least 2 options required", variant: "destructive" }); return; }
    setPolls([{
      question: pollQuestion,
      responses: 0,
      event: "Current Event",
      options: validOptions.map(o => ({ label: o, pct: 0, votes: 0 })),
    }, ...polls]);
    toast({ title: "Poll created", description: `"${pollQuestion}" is now live.` });
    setPollQuestion(""); setPollOptions(["", "", ""]); setCreatePollOpen(false);
  };

  const handleAnswerQuestion = () => {
    if (answerIdx === null || !answerText.trim()) return;
    const updated = [...questions];
    updated[answerIdx] = { ...updated[answerIdx], status: "Answered", answer: answerText };
    setQuestions(updated);
    toast({ title: "Answer submitted", description: "Your answer has been posted." });
    setAnswerText(""); setAnswerIdx(null);
  };

  const handleUpvote = (idx: number) => {
    const updated = [...questions];
    updated[idx] = { ...updated[idx], votes: updated[idx].votes + 1 };
    setQuestions(updated);
  };

  const statCards = [
    { icon: MessageSquare, value: String(polls.length), label: "Active Polls", color: "text-primary" },
    { icon: MoreVertical, value: String(questions.length), label: "Q&A Questions", color: "text-emerald-600" },
    { icon: MessageSquare, value: "3", label: "Chat Messages", color: "text-amber-600" },
    { icon: Activity, value: "78%", label: "Avg Engagement", color: "text-primary" },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Actions */}
      <motion.div variants={item} className="flex items-center gap-3">
        <button onClick={() => setHistoryOpen(true)} className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-primary hover:bg-muted transition-colors">
          <Calendar className="h-3.5 w-3.5" /> View History
        </button>
        <button onClick={() => setCreatePollOpen(true)} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-3.5 w-3.5" /> Create Poll
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-5 shadow-sm">
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
            <button onClick={() => toast({ title: "All polls", description: `${polls.length} total polls available.` })} className="text-sm text-muted-foreground hover:text-foreground">View All</button>
          </div>
          {polls.map((poll, idx) => (
            <motion.div key={poll.question} variants={item} className="rounded-lg border border-border bg-card p-5 shadow-sm">
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
                <button onClick={() => setPollDetailIdx(idx)} className="text-xs text-primary hover:underline">View Details</button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Q&A */}
        <motion.div variants={item} className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Q&A Questions</h2>
          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div key={q.q} className="space-y-2">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <button onClick={() => handleUpvote(idx)} className="hover:text-primary transition-colors">
                      <ChevronUp className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </button>
                    <span className="text-sm font-semibold text-foreground">{q.votes}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground">{q.q}</h4>
                      <span className={cn("text-xs font-medium", q.status === "Answered" ? "text-emerald-600" : "text-destructive")}>
                        {q.status === "Answered" ? "✓ Answered" : "Pending"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Asked by {q.author} • {q.time} • {q.event}
                    </p>
                    {q.answer && (
                      <div className="mt-2 pl-3 border-l-2 border-emerald-500/30">
                        <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Answer:</span> {q.answer}</p>
                      </div>
                    )}
                    {q.status === "Pending" && (
                      <button onClick={() => { setAnswerIdx(idx); setAnswerText(""); }} className="mt-2 inline-flex items-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
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

      {/* Create Poll Dialog */}
      <Dialog open={createPollOpen} onOpenChange={setCreatePollOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Poll</DialogTitle>
            <DialogDescription>Create a new poll for your event attendees.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Question</label>
              <input type="text" value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} placeholder="What would you like to ask?" className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Options</label>
              {pollOptions.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="text" value={opt} onChange={e => { const u = [...pollOptions]; u[i] = e.target.value; setPollOptions(u); }} placeholder={`Option ${i + 1}`} className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" />
                  {pollOptions.length > 2 && (
                    <button onClick={() => setPollOptions(pollOptions.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
                  )}
                </div>
              ))}
              {pollOptions.length < 5 && (
                <button onClick={() => setPollOptions([...pollOptions, ""])} className="text-xs text-primary hover:underline">+ Add option</button>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setCreatePollOpen(false)} className="flex-1 rounded-md border border-border px-4 py-2 text-sm hover:bg-muted transition-colors">Cancel</button>
              <button onClick={handleCreatePoll} className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Create Poll</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Answer Question Dialog */}
      <Dialog open={answerIdx !== null} onOpenChange={() => setAnswerIdx(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Answer Question</DialogTitle>
            <DialogDescription>{answerIdx !== null ? questions[answerIdx]?.q : ""}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <textarea value={answerText} onChange={e => setAnswerText(e.target.value)} placeholder="Type your answer..." rows={4} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none" />
            <div className="flex gap-3">
              <button onClick={() => setAnswerIdx(null)} className="flex-1 rounded-md border border-border px-4 py-2 text-sm hover:bg-muted transition-colors">Cancel</button>
              <button onClick={handleAnswerQuestion} className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5">
                <Send className="h-4 w-4" /> Submit Answer
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Poll Detail Dialog */}
      <Dialog open={pollDetailIdx !== null} onOpenChange={() => setPollDetailIdx(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Poll Details</DialogTitle>
            <DialogDescription>{pollDetailIdx !== null ? polls[pollDetailIdx]?.question : ""}</DialogDescription>
          </DialogHeader>
          {pollDetailIdx !== null && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Event: {polls[pollDetailIdx].event}</p>
              <p className="text-sm text-muted-foreground">Total responses: {polls[pollDetailIdx].responses}</p>
              <div className="space-y-3">
                {polls[pollDetailIdx].options.map(opt => (
                  <div key={opt.label} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{opt.label}</span>
                    <span className="text-sm text-muted-foreground">{opt.votes} votes ({opt.pct}%)</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { setPollDetailIdx(null); toast({ title: "Poll closed", description: "This poll has been ended." }); }} className="w-full rounded-md border border-destructive text-destructive px-4 py-2 text-sm hover:bg-destructive/10 transition-colors">
                Close Poll
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Engagement History</DialogTitle>
            <DialogDescription>Past engagement activity across events.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {[
              { event: "Q4 All-Hands", date: "Jan 15, 2026", polls: 3, questions: 12, messages: 89 },
              { event: "Product Demo Day", date: "Dec 10, 2025", polls: 2, questions: 8, messages: 45 },
              { event: "Year-End Review", date: "Dec 1, 2025", polls: 5, questions: 22, messages: 156 },
            ].map(h => (
              <div key={h.event} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{h.event}</p>
                  <p className="text-xs text-muted-foreground">{h.date}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{h.polls} polls</span>
                  <span>{h.questions} Q&A</span>
                  <span>{h.messages} msgs</span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
