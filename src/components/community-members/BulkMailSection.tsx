import { RefreshCw, Mail } from "lucide-react";

const rows = [
  { date: "2 years ago", subject: "You have been invited to join EFC Community", invited: "EFC Community", users: "1 users" },
  { date: "2 years ago", subject: "You have been invited to join Webinar testing in EFC Community", invited: "Webinar testing", users: "2 users" },
  { date: "2 years ago", subject: "You have been invited to join webinar testing in EFC Community", invited: "-", users: "2 users" },
];

export default function BulkMailSection() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Bulk Mail</h2>
        <div className="flex items-center gap-2">
          <button className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border hover:bg-muted">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border hover:bg-muted">
            <Mail className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-primary/5 p-6 text-center">
        <p className="text-sm font-semibold text-primary">Send Mail</p>
        <p className="text-sm text-primary mt-1">Send bulk mail to all the members of community or selected groups</p>
      </div>

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
