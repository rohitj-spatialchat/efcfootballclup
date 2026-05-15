import { RefreshCw, Bell } from "lucide-react";

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

export default function PushNotificationSection() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Custom Push Notification</h2>
        <div className="flex items-center gap-2">
          <button className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border hover:bg-muted">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border hover:bg-muted">
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-primary/5 p-6 text-center">
        <p className="text-sm font-semibold text-primary">Send Push</p>
        <p className="text-sm text-primary mt-1">Send custom push to all the members of community or selected groups</p>
      </div>

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
