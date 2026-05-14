import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ title, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/50 transition-colors"
      >
        <span className="font-semibold text-foreground">{title}</span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="px-5 pb-5 pt-1 space-y-3">{children}</div>}
    </div>
  );
}

function ToggleRow({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <div className="flex items-start gap-3 py-1.5">
      <Switch checked={checked} onCheckedChange={onChange} className="mt-0.5" />
      <div className="flex-1">
        <div className="text-sm text-foreground">{label}</div>
        {hint && <div className="text-xs text-muted-foreground mt-0.5">{hint}</div>}
      </div>
    </div>
  );
}

const initial = {
  hideDM: false,
  hideEvents: false,
  hideCourses: false,
  hideMemberDir: false,
  hideLogo: false,
  hideName: true,
  hideProfileWeb: false,
  hideProfileMobile: false,
  showNavlinks: false,
  hideLogout: true,
  collapsedGroups: false,
  hideClosedGroups: false,
  showPoweredBy: false,
  hideSwitcher: true,
  markdown: false,
  anyoneCreateEvent: true,
  hideUnsubscribe: true,
  disableEmails: true,
  restrictNameUsername: true,
};

export default function CommunityExperienceTab() {
  const [s, setS] = useState(initial);
  const [postTimer, setPostTimer] = useState("600");
  const [reportEmail, setReportEmail] = useState("community@efc.com");

  const set = <K extends keyof typeof initial>(k: K) => (v: boolean) =>
    setS((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Community Experience</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Tailor what members see and how the community behaves.
        </p>
      </div>

      <Section title="Show Hide Features">
        <ToggleRow checked={s.hideDM} onChange={set("hideDM")} label="Hide Direct Messaging for Users" />
        <ToggleRow checked={s.hideEvents} onChange={set("hideEvents")} label="Hide Event/Calendar for community" />
        <ToggleRow checked={s.hideCourses} onChange={set("hideCourses")} label="Hide Courses" />
        <ToggleRow checked={s.hideMemberDir} onChange={set("hideMemberDir")} label="Hide Member Directory Page" />
      </Section>

      <Section title="Customize Header">
        <ToggleRow checked={s.hideLogo} onChange={set("hideLogo")} label="Hide community logo in the header" />
        <ToggleRow checked={s.hideName} onChange={set("hideName")} label="Hide community name from the header" />
        <ToggleRow checked={s.hideProfileWeb} onChange={set("hideProfileWeb")} label="Hide profile picture in the header in web view" />
        <ToggleRow checked={s.hideProfileMobile} onChange={set("hideProfileMobile")} label="Hide profile picture in the header in mobile view" />
        <ToggleRow checked={s.showNavlinks} onChange={set("showNavlinks")} label="Show Community links as Navlinks" />
        <ToggleRow checked={s.hideLogout} onChange={set("hideLogout")} label="Hide logout button in the profile drop down" />
      </Section>

      <Section title="Customize Sidebar">
        <ToggleRow checked={s.collapsedGroups} onChange={set("collapsedGroups")} label="Show collapsed groups by default" />
        <ToggleRow
          checked={s.hideClosedGroups}
          onChange={set("hideClosedGroups")}
          label="Hide Closed Groups Without Join"
          hint="Closed groups would not be shown to the user if they are not a member of the group"
        />
        <ToggleRow checked={s.showPoweredBy} onChange={set("showPoweredBy")} label="Show powered by EFC" />
        <ToggleRow checked={s.hideSwitcher} onChange={set("hideSwitcher")} label="Hide Community Switcher" />
      </Section>

      <Section title="Misc">
        <ToggleRow checked={s.markdown} onChange={set("markdown")} label="Use Mark Down Editor to create post" />
        <ToggleRow checked={s.anyoneCreateEvent} onChange={set("anyoneCreateEvent")} label="Anyone can create event in community" />
        <ToggleRow checked={s.hideUnsubscribe} onChange={set("hideUnsubscribe")} label="Hide unsubscribe button from the community" />
        <ToggleRow checked={s.disableEmails} onChange={set("disableEmails")} label="Disable all email notifications from the community" />
      </Section>

      <Section title="Advanced Configurables">
        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
          <div className="text-sm font-semibold text-foreground">Community Post Timer Limit (in seconds)</div>
          <div className="flex gap-2">
            <input
              type="number"
              value={postTimer}
              onChange={(e) => setPostTimer(e.target.value)}
              className="flex-1 max-w-xs rounded-md border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button
              onClick={() => toast.success("Post timer updated")}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Update
            </button>
          </div>
          <p className="text-xs text-muted-foreground">User must wait until the selected time limit has passed to post again</p>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
          <div className="text-sm font-semibold text-foreground">Community Report Email</div>
          <div className="flex gap-2">
            <input
              type="email"
              value={reportEmail}
              onChange={(e) => setReportEmail(e.target.value)}
              className="flex-1 max-w-md rounded-md border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button
              onClick={() => toast.success("Report email updated")}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Update
            </button>
          </div>
          <p className="text-xs text-muted-foreground">The reports submitted by community users will be sent to this email address.</p>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
          <div className="text-sm font-semibold text-foreground">Prevent Users From Updating Profile</div>
          <label className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2.5 cursor-pointer">
            <Checkbox
              checked={s.restrictNameUsername}
              onCheckedChange={(v) => set("restrictNameUsername")(Boolean(v))}
            />
            <span className="text-sm text-foreground">Restrict users from updating their name and username</span>
          </label>
        </div>
      </Section>

      <div className="flex justify-end">
        <button
          onClick={() => toast.success("Community experience saved")}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
