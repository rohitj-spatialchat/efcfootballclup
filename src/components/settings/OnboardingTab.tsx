import { useState } from "react";
import { ChevronDown, Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const defaultMessage =
  "Welcome to the EFC Community — the home of football's performance professionals. Connect with coaches, sport scientists, physios and analysts from across Europe, share insights, join live sessions, and grow together.";

const groupOptions = [
  "Sport & Exercise",
  "Science",
  "Nutrition",
  "Sport Psychology",
  "Medical & Physiotherapy",
  "Strength & Power",
  "Fitness & Exercise Physiology",
];

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
      {open && <div className="px-5 pb-5 pt-1 space-y-4">{children}</div>}
    </div>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-5 w-9 rounded-full transition-colors shrink-0",
          checked ? "bg-primary" : "bg-muted-foreground/30"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-4" : "translate-x-0.5"
          )}
        />
      </button>
      <span className="text-sm text-foreground">{label}</span>
    </label>
  );
}

export default function OnboardingTab() {
  const [loginRequired, setLoginRequired] = useState(false);
  const [gated, setGated] = useState(false);
  const [disableEmail, setDisableEmail] = useState(false);
  const [disableGoogle, setDisableGoogle] = useState(false);
  const [disableFacebook, setDisableFacebook] = useState(false);
  const [messages, setMessages] = useState<string[]>([defaultMessage]);
  const [autoJoin, setAutoJoin] = useState<string[]>(["Sport & Exercise", "Science", "Nutrition"]);

  const updateMessage = (i: number, val: string) => {
    setMessages((prev) => prev.map((m, idx) => (idx === i ? val : m)));
  };

  const removeMessage = (i: number) => {
    setMessages((prev) => prev.filter((_, idx) => idx !== i));
  };

  const addMessage = () => setMessages((prev) => [...prev, ""]);

  const toggleGroup = (g: string) => {
    setAutoJoin((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Onboarding</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure how new members enter and experience the EFC community.
        </p>
      </div>

      <Section title="Entry to community">
        <div className="space-y-3">
          <Toggle checked={loginRequired} onChange={setLoginRequired} label="Make login/signup mandatory to see homefeed" />
          <Toggle checked={gated} onChange={setGated} label="Make it a gated community" />
        </div>
      </Section>

      <Section title="Register/Login">
        <div className="space-y-3">
          <Toggle checked={disableEmail} onChange={setDisableEmail} label="Disable login/sign up via E-mail" />
          <Toggle checked={disableGoogle} onChange={setDisableGoogle} label="Disable login/sign up via Google Account" />
          <Toggle checked={disableFacebook} onChange={setDisableFacebook} label="Disable login/sign up via Facebook" />
        </div>
      </Section>

      <Section title="Landing On Homefeed">
        <p className="text-sm text-muted-foreground">Greet your members with a personalized message</p>
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground tracking-wider">MESSAGE {i + 1}</span>
                {messages.length > 1 && (
                  <button
                    onClick={() => removeMessage(i)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <textarea
                value={msg}
                onChange={(e) => updateMessage(i, e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none italic"
              />
            </div>
          ))}
          <button
            onClick={addMessage}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Add message
          </button>
        </div>
      </Section>

      <Section title="Auto Join Groups">
        <p className="text-sm text-muted-foreground">New members will automatically join the selected groups.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {groupOptions.map((g) => {
            const checked = autoJoin.includes(g);
            return (
              <label
                key={g}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors",
                  checked ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted/50"
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleGroup(g)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
                />
                <span className="text-sm text-foreground">{g}</span>
              </label>
            );
          })}
        </div>
      </Section>

      <div className="flex justify-end">
        <button
          onClick={() => toast.success("Onboarding settings saved")}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
