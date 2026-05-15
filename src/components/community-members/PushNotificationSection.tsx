import { useState } from "react";
import { RefreshCw, Bell, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const audiences = ["Everyone", "EFC Community", "Webinar testing", "Coaches Group", "Players Group"];

const rows = [
  { date: "21 days ago", subject: "Your Turn to Lead EFC 🙌", to: "EFC Community", users: "23542 users" },
  { date: "a month ago", subject: "Live Now! 🔴", to: "EFC Community", users: "23117 users" },
  { date: "a month ago", subject: "test 1", to: "EFC Community", users: "109 users" },
  { date: "a month ago", subject: "Testing push", to: "EFC Community", users: "109 users" },
  { date: "2 months ago", subject: "test", to: "EFC Community", users: "22 users" },
  { date: "2 months ago", subject: "Test Notification", to: "Webinar testing", users: "22 users" },
  { date: "2 months ago", subject: "test 1", to: "EFC Community", users: "22773 users" },
  { date: "2 months ago", subject: "test 3", to: "EFC Community", users: "22774 users" },
  { date: "2 months ago", subject: "test 2 tittle", to: "EFC Community", users: "22774 users" },
  { date: "2 months ago", subject: "test", to: "EFC Community", users: "22774 users" },
];

function NewPushView({ onBack }: { onBack: () => void }) {
  const [to, setTo] = useState("Everyone");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [richText, setRichText] = useState("");
  const [buttonTitle, setButtonTitle] = useState("");
  const [ctaType, setCtaType] = useState<"URL" | "Group" | "channel">("URL");
  const [ctaValue, setCtaValue] = useState("");

  const canSend = title.trim() && description.trim();
  const handleSend = () => {
    if (!canSend) return;
    toast.success("Push notification sent");
    onBack();
  };

  const previewTitle = title.trim() || "New Notification";
  const previewDesc = description.trim() || "Some random description jusitfying how this notification is important.";
  const previewRich = richText.trim() || "Rich Text Here";

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="flex items-center gap-2 text-base font-semibold text-foreground hover:text-primary">
        <ChevronLeft className="h-5 w-5" /> New Custom Push Notification
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-lg border border-border bg-card p-6 space-y-5">
          <div>
            <label className="text-sm font-medium">To:</label>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="mt-2 w-full h-11 rounded-md border border-border bg-background px-3 text-sm">
              {audiences.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter notification title" className="mt-2 w-full h-11 rounded-md border border-border bg-background px-3 text-sm" />
          </div>

          <div>
            <label className="text-sm font-medium">Write Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description here" rows={3} className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm resize-none" />
          </div>

          <div>
            <label className="text-sm font-medium">Write Rich Text Content</label>
            <textarea value={richText} onChange={(e) => setRichText(e.target.value)} placeholder="Write here..." rows={4} className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm resize-none" />
          </div>

          <div>
            <label className="text-sm font-medium">Button Title</label>
            <input value={buttonTitle} onChange={(e) => setButtonTitle(e.target.value)} placeholder="Enter button title" className="mt-2 w-full h-11 rounded-md border border-border bg-background px-3 text-sm" />
          </div>

          <div>
            <label className="text-sm font-medium">CTA Type</label>
            <div className="mt-2 flex items-center gap-6">
              {(["URL", "Group", "channel"] as const).map((t) => (
                <label key={t} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="radio" checked={ctaType === t} onChange={() => setCtaValue("") || setCtaType(t)} className="accent-primary" />
                  {t}
                </label>
              ))}
            </div>
            <input
              value={ctaValue}
              onChange={(e) => setCtaValue(e.target.value)}
              placeholder={ctaType === "URL" ? "https://" : ctaType === "Group" ? "Select group" : "Select channel"}
              className="mt-3 w-full h-11 rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground">Cancel</button>
            <button onClick={handleSend} disabled={!canSend} className={cn("px-5 h-10 rounded-md text-sm font-medium", canSend ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground cursor-not-allowed")}>
              Send
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-start gap-3">
              <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">EFC</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">EFC Community</p>
                  <span className="text-xs text-muted-foreground">Now</span>
                </div>
                <p className="text-sm font-semibold mt-1">{previewTitle}</p>
                <p className="text-sm text-muted-foreground mt-1">{previewDesc}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-lg font-semibold">{previewTitle}</h3>
            <p className="text-xs text-muted-foreground mt-1">Now</p>
            <p className="text-sm text-foreground mt-3 whitespace-pre-wrap">{previewRich}</p>
            {buttonTitle.trim() && (
              <button className="mt-4 px-4 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium">{buttonTitle}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PushNotificationSection() {
  const [view, setView] = useState<"list" | "new">("list");

  if (view === "new") return <NewPushView onBack={() => setView("list")} />;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Custom Push Notification</h2>
        <div className="flex items-center gap-2">
          <button className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border hover:bg-muted">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button onClick={() => setView("new")} title="Send Push" className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border hover:bg-muted">
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>

      <button onClick={() => setView("new")} className="w-full rounded-lg border border-border bg-primary/5 p-6 text-center hover:bg-primary/10 transition-colors">
        <p className="text-sm font-semibold text-primary">Send Push</p>
        <p className="text-sm text-primary mt-1">Send custom push to all the members of community or selected groups</p>
      </button>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-xs text-muted-foreground uppercase">
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Subject</th>
              <th className="px-4 py-3 text-left font-medium">To</th>
              <th className="px-4 py-3 text-left font-medium">Recipients</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-muted/20">
                <td className="px-4 py-4 text-muted-foreground whitespace-nowrap">{r.date}</td>
                <td className="px-4 py-4 text-foreground">{r.subject}</td>
                <td className="px-4 py-4 text-foreground">{r.to}</td>
                <td className="px-4 py-4 text-foreground">{r.users}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
