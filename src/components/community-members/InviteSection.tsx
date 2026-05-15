import { useState } from "react";
import { Link2, Copy, X, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function InviteSection() {
  const [emails, setEmails] = useState([{ name: "", email: "" }]);
  const [richEditor, setRichEditor] = useState(false);
  const [customMsg, setCustomMsg] = useState("");
  const inviteLink = "https://efc.community";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Invite Members</h2>
        <p className="text-xs text-muted-foreground">100 invite emails remaining today. Resets at 05:29 AM.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">Invite your members to</span>
            <span className="text-primary font-medium">{inviteLink}</span>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Link2 className="h-4 w-4" /> Invite via link
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2">
              <span className="flex-1 text-sm text-foreground truncate">{inviteLink}</span>
              <button
                onClick={() => { navigator.clipboard.writeText(inviteLink); toast.success("Link copied"); }}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                copy <Copy className="h-3 w-3" />
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 space-y-3">
            <div className="text-sm font-medium text-foreground">Invite via email</div>
            {emails.map((row, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  placeholder="Name"
                  value={row.name}
                  onChange={(e) => setEmails(emails.map((r, idx) => idx === i ? { ...r, name: e.target.value } : r))}
                />
                <Input
                  placeholder="Email Id"
                  value={row.email}
                  onChange={(e) => setEmails(emails.map((r, idx) => idx === i ? { ...r, email: e.target.value } : r))}
                />
                <button
                  onClick={() => setEmails(emails.filter((_, idx) => idx !== i))}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setEmails([...emails, { name: "", email: "" }])}
              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
            >
              <Plus className="h-3 w-3" /> Add more
            </button>
            <Button className="w-full" onClick={() => toast.success("Invites sent")}>Send Invite</Button>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 space-y-3">
            <div className="text-sm font-medium text-foreground">Upload a CSV</div>
            <p className="text-xs text-muted-foreground">Upload a CSV file with header as name and email</p>
            <p className="text-xs text-muted-foreground">Here is a <span className="text-primary">template CSV file</span></p>
            <button className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-dashed border-border px-3 py-3 text-sm text-foreground hover:bg-muted">
              <Upload className="h-4 w-4" /> Upload File
            </button>
            <Button className="w-full" onClick={() => toast.success("Invites sent")}>Send Invite</Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Mail Template</h3>
            <button className="text-xs text-primary hover:underline" onClick={() => toast.success("Test mail sent")}>Send Test Mail</button>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 space-y-3 text-sm">
            <p>Hey {"{name}"},</p>
            <p>{"{invited_by_name}"} has invited you to join the {"{community_name}"}</p>
            <Button variant="secondary" className="mt-2">Join</Button>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
            <span className="text-sm text-foreground">Switch to rich text editor</span>
            <Switch checked={richEditor} onCheckedChange={setRichEditor} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Add custom message</h3>
              <button className="text-xs text-primary hover:underline" onClick={() => toast.success("Message saved")}>Save</button>
            </div>
            <Textarea
              placeholder="Enter message here"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              rows={6}
            />
          </div>

          <div className="rounded-lg border border-border bg-card p-4 text-xs text-muted-foreground space-y-1">
            <div className="font-semibold text-foreground text-sm mb-2">Editor Basics</div>
            <p>Use {"{name}"} for Name of user</p>
            <p>Use {"{email}"} for email of user</p>
            <p>Use {"{invited_by_name}"} for invited by user name</p>
            <p>Use {"{group_name}"} for group name</p>
            <p>Use {"{community_name}"} for community name</p>
            <p>Use {"{community_url}"} for community address</p>
            <p>Do not use any space between {"{}"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
