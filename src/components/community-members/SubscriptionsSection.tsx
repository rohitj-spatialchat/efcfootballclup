import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubscriptionsSection() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Subscriptions</h2>
        <div className="flex items-center gap-2">
          <button className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border hover:bg-muted">
            <RefreshCw className="h-4 w-4" />
          </button>
          <Button>Create Subscription</Button>
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
    </div>
  );
}
