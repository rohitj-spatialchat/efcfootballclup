import { useRef, useState } from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function Section({
  title, children, defaultOpen = true,
}: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border pb-6 mb-6 last:border-b-0 last:mb-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 text-base font-semibold text-foreground mb-4"
      >
        {title}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="space-y-5">{children}</div>}
    </div>
  );
}

function LogoUploader({ label, value, onChange }: { label: string; value: string | null; onChange: (v: string | null) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="w-32 h-32 rounded-lg border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 transition flex flex-col items-center justify-center text-xs text-muted-foreground text-center px-2 overflow-hidden"
      >
        {value ? (
          <img src={value} alt={label} className="w-full h-full object-contain" />
        ) : (
          <>
            <Plus className="h-5 w-5 mb-1" />
            <span>{label}</span>
          </>
        )}
      </button>
      {value && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="absolute -top-2 -right-2 bg-background border border-border rounded-full p-1 shadow"
        >
          <X className="h-3 w-3" />
        </button>
      )}
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          const r = new FileReader();
          r.onload = () => onChange(r.result as string);
          r.readAsDataURL(f);
        }}
      />
    </div>
  );
}

export default function BasicInfoTab() {
  const [lightLogo, setLightLogo] = useState<string | null>(null);
  const [darkLogo, setDarkLogo] = useState<string | null>(null);
  const [favicon, setFavicon] = useState<string | null>(null);
  const [name, setName] = useState("EFC Football Club");
  const [address, setAddress] = useState("efc");
  const [timezone, setTimezone] = useState("Europe/London");
  const [language, setLanguage] = useState("EN");
  const [privacyLink, setPrivacyLink] = useState("");
  const [termsLink, setTermsLink] = useState("");
  const [metaTitle, setMetaTitle] = useState("EFC Football Club");
  const [metaDesc, setMetaDesc] = useState("");
  const [ogTitle, setOgTitle] = useState("EFC Football Club");
  const [ogDesc, setOgDesc] = useState("");
  const [ogImage, setOgImage] = useState("");

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h1 className="text-xl font-semibold text-foreground mb-6">Basic Info</h1>

      <Section title="Community Info">
        <div>
          <Label className="text-sm font-medium mb-2 block">Community Logo</Label>
          <div className="flex gap-4 items-start">
            <LogoUploader label="Select Light Mode Logo" value={lightLogo} onChange={setLightLogo} />
            <LogoUploader label="Select Dark Mode Logo" value={darkLogo} onChange={setDarkLogo} />
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              Recommendation: use a square image to fit it perfectly in logo area. Recommended size 200×200 px.
              <br /><br />
              A default dummy logo would be assigned with community initials if logo is not uploaded.
            </p>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Community Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Community Address</Label>
          <div className="flex items-center gap-2">
            <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            <span className="text-sm text-muted-foreground shrink-0">.lovable.app</span>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Favicon</Label>
          <div className="flex gap-4 items-start">
            <LogoUploader label="Upload Favicon" value={favicon} onChange={setFavicon} />
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed mt-2">
              The icon which you'll add, users will see on the browser tab. Size: 32 × 32 px
            </p>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Community Timezone</Label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
              <SelectItem value="Europe/Paris">Europe/Paris (CET)</SelectItem>
              <SelectItem value="Europe/Berlin">Europe/Berlin (CET)</SelectItem>
              <SelectItem value="Europe/Madrid">Europe/Madrid (CET)</SelectItem>
              <SelectItem value="Europe/Rome">Europe/Rome (CET)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Community Default Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="EN">EN</SelectItem>
              <SelectItem value="FR">FR</SelectItem>
              <SelectItem value="DE">DE</SelectItem>
              <SelectItem value="ES">ES</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      <Section title="Policy Links on login screen" defaultOpen={false}>
        <div>
          <Label className="text-sm font-medium mb-2 block">Privacy Policy Link</Label>
          <Input placeholder="Enter here" value={privacyLink} onChange={(e) => setPrivacyLink(e.target.value)} />
        </div>
        <div>
          <Label className="text-sm font-medium mb-2 block">Terms and Conditions Link</Label>
          <Input placeholder="Enter here" value={termsLink} onChange={(e) => setTermsLink(e.target.value)} />
        </div>
      </Section>

      <Section title="SEO Settings" defaultOpen={false}>
        <div>
          <Label className="text-sm font-medium block">Meta Title</Label>
          <p className="text-xs text-muted-foreground italic mb-2">Maximum length of 255 characters allowed</p>
          <Input maxLength={255} value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
        </div>
        <div>
          <Label className="text-sm font-medium block">Meta Description</Label>
          <p className="text-xs text-muted-foreground italic mb-2">Maximum length of 255 characters allowed</p>
          <Textarea maxLength={255} value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} rows={4} />
        </div>
      </Section>

      <Section title="Open Graph Details" defaultOpen={false}>
        <div>
          <Label className="text-sm font-medium block">Open Graph Title</Label>
          <p className="text-xs text-muted-foreground italic mb-2">Maximum length of 255 characters allowed</p>
          <Input maxLength={255} value={ogTitle} onChange={(e) => setOgTitle(e.target.value)} />
        </div>
        <div>
          <Label className="text-sm font-medium block">Open Graph Description</Label>
          <p className="text-xs text-muted-foreground italic mb-2">Maximum length of 255 characters allowed</p>
          <Textarea maxLength={255} value={ogDesc} onChange={(e) => setOgDesc(e.target.value)} rows={4} />
        </div>
        <div>
          <Label className="text-sm font-medium block">Open Graph Image</Label>
          <p className="text-xs text-muted-foreground mb-2">
            Recommended dimensions: 1200px by 630px with a 1.91:1 aspect ratio.
            <br />By default it will take up the community banner uploaded with the community
          </p>
          <Input placeholder="https://example.com/image.jpg" value={ogImage} onChange={(e) => setOgImage(e.target.value)} />
        </div>
      </Section>

      <div className="flex justify-end pt-2">
        <Button onClick={() => toast.success("Basic info saved")}>Save Changes</Button>
      </div>
    </div>
  );
}
