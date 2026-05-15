import { useState } from "react";
import { RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const currencies = ["USD - United States dollar", "EUR - Euro", "GBP - British Pound", "INR - Indian Rupee"];
const frequencies = ["Monthly", "Quarterly", "Yearly", "One-time"];
const groups = ["D2C Brand Launch", "Webinar testing", "Get Started", "Academics", "Academics AUO Jaipur"];

function CreateSubscriptionDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [tab, setTab] = useState<"details" | "access">("details");
  const [currency, setCurrency] = useState(currencies[0]);
  const [amount, setAmount] = useState("23");
  const [frequency, setFrequency] = useState("Monthly");
  const [paywallName, setPaywallName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const baseAmount = Number(amount) || 0;
  const tax = 0;
  const total = baseAmount + tax;
  const code = currency.split(" - ")[0];

  const toggleGroup = (g: string) =>
    setSelectedGroups((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));

  const handlePublish = () => {
    if (!paywallName.trim()) return toast.error("Please enter a paywall name");
    toast.success("Subscription published");
    onOpenChange(false);
    setTab("details");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 gap-0 [&>button]:hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold">Create Subscription</h3>
          <button onClick={() => onOpenChange(false)} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex gap-6 px-6 pt-3 border-b border-border">
          {[
            { id: "details", label: "Subscription Details" },
            { id: "access", label: "Access To" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={cn(
                "pb-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {tab === "details" ? (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="mt-2 w-full h-11 rounded-md border border-border bg-background px-3 text-sm"
                  >
                    {currencies.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Base Amount</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-2 w-full h-11 rounded-md border border-border bg-background px-3 text-sm"
                  />
                </div>
              </div>

              <div className="rounded-lg border border-border bg-muted/30 px-4 py-4 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Base Amount</p>
                  <p className="font-semibold mt-1">{code} {baseAmount}</p>
                </div>
                <span className="text-muted-foreground">+</span>
                <div>
                  <p className="text-xs text-muted-foreground">Tax (0%)</p>
                  <p className="font-semibold mt-1">{code} 0.00</p>
                </div>
                <span className="text-muted-foreground">=</span>
                <div>
                  <p className="text-xs text-muted-foreground">Total Amount</p>
                  <p className="font-semibold mt-1">{code} {total.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Payment Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="mt-2 w-full h-11 rounded-md border border-border bg-background px-3 text-sm"
                >
                  {frequencies.map((f) => <option key={f}>{f}</option>)}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Paywall Name</label>
                <input
                  value={paywallName}
                  onChange={(e) => setPaywallName(e.target.value)}
                  placeholder="basic"
                  className="mt-2 w-full h-11 rounded-md border border-border bg-background px-3 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Small Description <span className="text-muted-foreground font-normal">(try to keep it under 50 words)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold">Groups</h4>
                <p className="text-xs text-muted-foreground mt-1">Only closed groups can be added to subscription</p>
                <div className="mt-3 space-y-3">
                  {groups.map((g) => (
                    <label key={g} className="flex items-center gap-3 cursor-pointer">
                      <Checkbox checked={selectedGroups.includes(g)} onCheckedChange={() => toggleGroup(g)} />
                      <span className="text-sm">{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Courses</h4>
                <p className="text-xs text-muted-foreground mt-1">Only closed and published course can be added to subscription</p>
                <p className="text-center text-sm text-muted-foreground py-6">No courses available</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <button onClick={() => onOpenChange(false)} className="text-sm text-muted-foreground hover:text-foreground">
            Cancel
          </button>
          {tab === "details" ? (
            <Button onClick={() => setTab("access")}>Next</Button>
          ) : (
            <Button onClick={handlePublish}>Publish</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function SubscriptionsSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Subscriptions</h2>
        <div className="flex items-center gap-2">
          <button className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border hover:bg-muted">
            <RefreshCw className="h-4 w-4" />
          </button>
          <Button onClick={() => setOpen(true)}>Create Subscription</Button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="text-sm text-foreground">
          <p>Please link your bank account or razorpay account to receive the payment in your account.</p>
          <p className="mt-1">Contact <span className="text-primary">support@efc.community</span> to know more</p>
        </div>
        <Button variant="outline">Paywall Settings</Button>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-xs text-muted-foreground uppercase">
              <th className="px-4 py-3 text-left font-medium">Subscription Title</th>
              <th className="px-4 py-3 text-left font-medium">Amount</th>
              <th className="px-4 py-3 text-left font-medium">Created On</th>
              <th className="px-4 py-3 text-left font-medium">Current Users</th>
              <th className="px-4 py-3 text-left font-medium">Access To</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">No subscriptions found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <CreateSubscriptionDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
