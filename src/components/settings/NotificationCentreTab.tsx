import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PREFERENCES = [
  { id: "comments", label: "Notify me about comment on my posts" },
  { id: "replies", label: "Notify me about replies on my comment" },
  { id: "upvote", label: "Notify me about upvote on my post" },
  { id: "reaction-comment", label: "Notify me about reaction to my comment" },
  { id: "reaction-reply", label: "Notify me about reaction on my reply" },
  { id: "dm", label: "Notify me about direct message" },
  { id: "mentions", label: "Notify me about mentions" },
];

const GROUPS = [
  "Sport & Exercise",
  "Science",
  "Nutrition",
  "Sport Psychology",
  "Medical & Physiotherapy",
  "Strength & Power",
  "Fitness & Exercise Physiology",
];

type GroupPref = "all" | "admin" | "none";

export default function NotificationCentreTab() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(PREFERENCES.map((p) => [p.id, true]))
  );
  const [groupPrefs, setGroupPrefs] = useState<Record<string, GroupPref>>(
    Object.fromEntries(GROUPS.map((g) => [g, "all"])) as Record<string, GroupPref>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Notification Centre</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal account notification preferences.
        </p>
      </div>

      {/* Preferences table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3 bg-muted/50 border-b border-border">
          <div className="text-sm font-semibold text-foreground">Preferences</div>
          <div className="text-sm font-semibold text-foreground w-28 text-center">Email notification</div>
        </div>
        {PREFERENCES.map((p, idx) => (
          <div
            key={p.id}
            className={cn(
              "grid grid-cols-[1fr_auto] gap-4 items-center px-5 py-3.5",
              idx !== PREFERENCES.length - 1 && "border-b border-border"
            )}
          >
            <div className="text-sm text-foreground">{p.label}</div>
            <div className="w-28 flex justify-center">
              <Checkbox
                checked={prefs[p.id]}
                onCheckedChange={(v) => setPrefs((s) => ({ ...s, [p.id]: Boolean(v) }))}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => toast.success("Notification preferences saved")}
          className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Save
        </button>
      </div>

      {/* Group notifications */}
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground">Notification for new posts</h3>
        <p className="text-sm text-muted-foreground">
          Only groups and channel available which you are part of. You can also control notification.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-[1fr_repeat(3,7rem)] gap-2 px-5 py-3 bg-muted/50 border-b border-border">
          <div className="text-sm font-semibold text-foreground">Group & Channels</div>
          <div className="text-sm font-semibold text-foreground text-center">All Activity</div>
          <div className="text-sm font-semibold text-foreground text-center">Post by admin</div>
          <div className="text-sm font-semibold text-foreground text-center">No Notification</div>
        </div>
        {GROUPS.map((g, idx) => {
          const v = groupPrefs[g];
          return (
            <div
              key={g}
              className={cn(
                "grid grid-cols-[1fr_repeat(3,7rem)] gap-2 items-center px-5 py-3.5",
                idx !== GROUPS.length - 1 && "border-b border-border"
              )}
            >
              <div className="text-sm text-foreground">{g}</div>
              {(["all", "admin", "none"] as GroupPref[]).map((opt) => (
                <div key={opt} className="flex justify-center">
                  <Checkbox
                    checked={v === opt}
                    onCheckedChange={() =>
                      setGroupPrefs((s) => ({ ...s, [g]: opt }))
                    }
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => toast.success("Group notifications saved")}
          className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
}
