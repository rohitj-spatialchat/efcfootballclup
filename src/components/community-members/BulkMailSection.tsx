import { useState } from "react";
import { RefreshCw, Mail, ChevronLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const rows = [
  { date: "2 years ago", subject: "You have been invited to join EFC Community", invited: "EFC Community", users: "1 users" },
  { date: "2 years ago", subject: "You have been invited to join Webinar testing in EFC Community", invited: "Webinar testing", users: "2 users" },
  { date: "2 years ago", subject: "You have been invited to join webinar testing in EFC Community", invited: "-", users: "2 users" },
];

const audiences = ["Everyone", "EFC Community", "Coaches Group", "Players Group", "Analysts Group"];

function SendMailView({ onBack }: { onBack: () => void }) {
  const [to, setTo] = useState("Everyone");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [richText, setRichText] = useState(true);

  const canSend = subject.trim() && message.trim();

  const handleSend = () => {
    if (!canSend) return;
    toast.success("Bulk mail sent successfully");
    onBack();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-base font-semibold text-foreground hover:text-primary">
          <ChevronLeft className="h-5 w-5" /> Send Mail
        </button>
        <p className="text-sm text-muted-foreground">10000 bulk email remaining this month. Resets at 01 Jun 2026 05:29 AM.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground">To:</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="mt-2 w-full h-11 rounded-md border border-border bg-background px-3 text-sm"
            >
              {audiences.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter mail subject"
              className="mt-2 w-full h-11 rounded-md border border-border bg-background px-3 text-sm"
            />
          </div>

          <div className="flex items-center justify-between rounded-md border border-border px-4 py-3">
            <span className="text-sm font-medium">Switch to rich text editor</span>
            <Switch checked={richText} onCheckedChange={setRichText} />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Write Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message here"
              rows={9}
              className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground">Cancel</button>
            <button
              onClick={handleSend}
              disabled={!canSend}
              className="px-5 h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/20 p-5 h-fit">
          <h3 className="text-sm font-semibold text-foreground mb-3">Editor Basics</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Use {"{name}"} for Name of user</li>
            <li>Use {"{email}"} for email of user</li>
            <li>Use {"{group_name}"} for group name</li>
            <li>Use {"{community_name}"} for community name</li>
            <li>Use {"{community_url}"} for community address</li>
            <li>Do not use any space between {"{}"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function BulkMailSection() {
  const [view, setView] = useState<"list" | "send">("list");

  if (view === "send") return <SendMailView onBack={() => setView("list")} />;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Bulk Mail</h2>
        <div className="flex items-center gap-2">
          <button className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border hover:bg-muted">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("send")}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border hover:bg-muted"
            title="Send Mail"
          >
            <Mail className="h-4 w-4" />
          </button>
        </div>
      </div>

      <button
        onClick={() => setView("send")}
        className="w-full rounded-lg border border-border bg-primary/5 p-6 text-center hover:bg-primary/10 transition-colors"
      >
        <p className="text-sm font-semibold text-primary">Send Mail</p>
        <p className="text-sm text-primary mt-1">Send bulk mail to all the members of community or selected groups</p>
      </button>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-xs text-muted-foreground uppercase">
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Subject</th>
              <th className="px-4 py-3 text-left font-medium">Invited</th>
              <th className="px-4 py-3 text-left font-medium">Recipients</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-muted/20">
                <td className="px-4 py-4 text-muted-foreground">{r.date}</td>
                <td className="px-4 py-4 text-foreground">{r.subject}</td>
                <td className="px-4 py-4 text-foreground">{r.invited}</td>
                <td className="px-4 py-4 text-foreground">{r.users}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
