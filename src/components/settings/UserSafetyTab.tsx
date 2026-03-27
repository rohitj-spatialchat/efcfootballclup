import { useState } from "react";
import { ShieldAlert, X, Plus, Check, Trash2, Ban, Eye, AlertTriangle, Flag, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const defaultBannedWords = ["spam", "scam", "inappropriate", "harassment"];

const defaultReports = [
  { id: 1, reporter: "James Park", reportedUser: "Unknown User", type: "Post", reason: "Spam content", content: "Buy cheap products at...", date: "2 hours ago", status: "pending" as const },
  { id: 2, reporter: "Tina Geizen", reportedUser: "Saurav Kumar", type: "Comment", reason: "Harassment", content: "You don't know anything about...", date: "5 hours ago", status: "pending" as const },
  { id: 3, reporter: "Andre Borrelly", reportedUser: "Guest User", type: "DM", reason: "Inappropriate language", content: "Message containing banned words...", date: "1 day ago", status: "resolved" as const },
  { id: 4, reporter: "Shanmukha V", reportedUser: "New Member", type: "Post", reason: "Misinformation", content: "False claims about the club...", date: "2 days ago", status: "pending" as const },
  { id: 5, reporter: "Anastasia Davis", reportedUser: "Anonymous", type: "Comment", reason: "Spam", content: "Click this link to win...", date: "3 days ago", status: "resolved" as const },
];

const statusColors = {
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  resolved: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const typeIcons: Record<string, typeof Flag> = {
  Post: Flag,
  Comment: MessageSquare,
  DM: MessageSquare,
};

export default function UserSafetyTab() {
  const [bannedWords, setBannedWords] = useState(defaultBannedWords);
  const [newWord, setNewWord] = useState("");
  const [reports, setReports] = useState(defaultReports);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "resolved">("all");

  const addWord = () => {
    const word = newWord.trim().toLowerCase();
    if (word && !bannedWords.includes(word)) {
      setBannedWords([...bannedWords, word]);
      setNewWord("");
      toast.success(`"${word}" added to banned words`);
    }
  };

  const removeWord = (word: string) => {
    setBannedWords(bannedWords.filter((w) => w !== word));
    toast.success(`"${word}" removed from banned words`);
  };

  const handleApprove = (id: number) => {
    setReports(reports.map((r) => (r.id === id ? { ...r, status: "resolved" as const } : r)));
    toast.success("Content approved");
  };

  const handleDelete = (id: number) => {
    setReports(reports.map((r) => (r.id === id ? { ...r, status: "resolved" as const } : r)));
    toast.success("Content deleted");
  };

  const handleBanUser = (id: number) => {
    const report = reports.find((r) => r.id === id);
    setReports(reports.map((r) => (r.id === id ? { ...r, status: "resolved" as const } : r)));
    toast.success(`${report?.reportedUser} has been banned`);
  };

  const filteredReports = filterStatus === "all" ? reports : reports.filter((r) => r.status === filterStatus);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-primary" /> User Safety Control Panel
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Manage content moderation, banned words, and user reports.</p>
      </div>

      {/* Banned Words */}
      <div className="rounded-xl border border-border bg-muted/30 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Ban className="h-4 w-4 text-destructive" /> Banned Words
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">These words are automatically filtered across all posts, comments, and DMs.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addWord()}
            placeholder="Type a word to ban..."
            className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
          <button
            onClick={addWord}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {bannedWords.map((word) => (
            <span
              key={word}
              className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 text-destructive border border-destructive/20 px-3 py-1.5 text-xs font-medium"
            >
              {word}
              <button onClick={() => removeWord(word)} className="hover:bg-destructive/20 rounded-full p-0.5 transition-colors">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          {bannedWords.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No banned words configured.</p>
          )}
        </div>
      </div>

      {/* Reports */}
      <div className="rounded-xl border border-border bg-muted/30 p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Content Reports
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">Review flagged content and take action.</p>
          </div>
          <div className="flex items-center gap-2">
            {(["all", "pending", "resolved"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors capitalize",
                  filterStatus === s ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {s} {s !== "all" && `(${reports.filter((r) => r.status === s).length})`}
                {s === "all" && `(${reports.length})`}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredReports.map((report) => {
            const TypeIcon = typeIcons[report.type] || Flag;
            return (
              <div
                key={report.id}
                className="rounded-lg border border-border bg-card p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="h-9 w-9 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                      <TypeIcon className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-foreground">{report.reason}</p>
                        <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium", statusColors[report.status])}>
                          {report.status}
                        </span>
                        <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-2 py-0.5">{report.type}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 truncate">"{report.content}"</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Reported by <span className="font-medium text-foreground">{report.reporter}</span> · Against <span className="font-medium text-foreground">{report.reportedUser}</span> · {report.date}
                      </p>
                    </div>
                  </div>

                  {report.status === "pending" && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleApprove(report.id)}
                        className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 text-emerald-600 px-2.5 py-1.5 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
                        title="Approve content"
                      >
                        <Check className="h-3 w-3" /> Approve
                      </button>
                      <button
                        onClick={() => handleDelete(report.id)}
                        className="inline-flex items-center gap-1 rounded-md bg-destructive/10 text-destructive px-2.5 py-1.5 text-xs font-medium hover:bg-destructive/20 transition-colors"
                        title="Delete content"
                      >
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                      <button
                        onClick={() => handleBanUser(report.id)}
                        className="inline-flex items-center gap-1 rounded-md bg-foreground text-background px-2.5 py-1.5 text-xs font-medium hover:bg-foreground/90 transition-colors"
                        title="Ban user"
                      >
                        <Ban className="h-3 w-3" /> Ban
                      </button>
                    </div>
                  )}

                  {report.status === "resolved" && (
                    <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="h-3 w-3" /> Resolved
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
