import { useState } from "react";
import { ChevronDown, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
      {open && <div className="px-5 pb-5 pt-1 space-y-5">{children}</div>}
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex items-center gap-2">
        <div className="relative h-10 w-12 rounded-md border border-border overflow-hidden shrink-0">
          <div className="absolute inset-0" style={{ backgroundColor: value }} />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-md border border-border bg-card px-3 py-2 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>
    </div>
  );
}

const FONT_OPTIONS = [
  "System Default",
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Poppins",
  "Montserrat",
  "Nunito",
  "Source Sans Pro",
];

export default function AppearanceTab() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lightBrand, setLightBrand] = useState("#002E5E");
  const [lightText, setLightText] = useState("#FFCB05");
  const [darkBrand, setDarkBrand] = useState("#C7C7C7");
  const [darkText, setDarkText] = useState("#002E5E");
  const [font, setFont] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Customize the look and feel of your community.
        </p>
      </div>

      <Section title="Customize Colors">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Default Theme</label>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            {([
              { id: "light", label: "Light Mode", icon: Sun },
              { id: "dark", label: "Dark Mode", icon: Moon },
            ] as const).map((t) => {
              const Icon = t.icon;
              const active = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-all",
                    active
                      ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/20"
                      : "border-border bg-card text-foreground hover:border-primary/40"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-4">
          <div className="text-sm font-semibold text-foreground">Light Theme Colors</div>
          <ColorField label="Brand Color" value={lightBrand} onChange={setLightBrand} />
          <ColorField label="Text on Button Color" value={lightText} onChange={setLightText} />
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-4">
          <div className="text-sm font-semibold text-foreground">Dark Theme Colors</div>
          <ColorField label="Brand Color" value={darkBrand} onChange={setDarkBrand} />
          <ColorField label="Text on Button Color" value={darkText} onChange={setDarkText} />
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => toast.success("Colors saved")}
            className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </Section>

      <Section title="Configure Font">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Select Font for the community</label>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">Select a font...</option>
            {FONT_OPTIONS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toast.success("Font updated")}
            className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Update
          </button>
          <button
            onClick={() => { setFont(""); toast.success("Font reset"); }}
            className="rounded-md border border-border bg-card px-5 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Reset
          </button>
        </div>
      </Section>
    </div>
  );
}
