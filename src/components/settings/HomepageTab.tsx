import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, List, LayoutGrid, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Layout = "list" | "compact";

export default function HomepageTab() {
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerDescription, setBannerDescription] = useState("");
  const [layout, setLayout] = useState<Layout>("list");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setCoverPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    toast.success("Homepage settings saved");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Homepage</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Customize your community banner and choose how the homefeed is displayed.
        </p>
      </div>

      {/* Community Banner */}
      <div className="rounded-lg border border-border bg-muted/30 p-6 space-y-5">
        <div>
          <h3 className="font-semibold text-foreground">Community Banner</h3>
          <p className="text-sm text-muted-foreground mt-1">
            This banner appears at the top of your community homepage.
          </p>
        </div>

        {/* Cover uploader */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          {coverPreview ? (
            <div className="relative rounded-xl overflow-hidden border border-border bg-card aspect-[16/6]">
              <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
              <button
                onClick={() => setCoverPreview(null)}
                className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/90 border border-border flex items-center justify-center text-foreground hover:bg-background transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-background/90 border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-background transition-colors"
              >
                <Upload className="h-3.5 w-3.5" /> Replace
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-xl border-2 border-dashed border-border bg-card hover:border-primary/40 hover:bg-muted/50 transition-colors aspect-[16/6] flex flex-col items-center justify-center gap-2 text-center px-4"
            >
              <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <ImageIcon className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-foreground">Upload cover picture</p>
              <p className="text-xs text-muted-foreground">16:6 Aspect ratio (recommended)</p>
              <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                <Upload className="h-3.5 w-3.5" /> Choose image
              </span>
            </button>
          )}
        </div>

        {/* Banner Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Banner Title</label>
          <input
            type="text"
            value={bannerTitle}
            onChange={(e) => setBannerTitle(e.target.value)}
            placeholder="Enter here"
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
          <p className="text-xs text-muted-foreground">Suggestions: Welcome to my community etc</p>
        </div>

        {/* Banner Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Banner Description</label>
          <textarea
            value={bannerDescription}
            onChange={(e) => setBannerDescription(e.target.value)}
            placeholder="Enter Banner Description"
            rows={4}
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
          />
        </div>
      </div>

      {/* Homefeed Layout */}
      <div className="rounded-lg border border-border bg-muted/30 p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-foreground">Homefeed Layout</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Choose how posts appear on the community homepage.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {([
            { id: "list", label: "List View", desc: "Full-width posts stacked vertically", icon: List },
            { id: "compact", label: "Compact View", desc: "Condensed rows for higher density", icon: LayoutGrid },
          ] as { id: Layout; label: string; desc: string; icon: typeof List }[]).map((opt) => {
            const Icon = opt.icon;
            const active = layout === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setLayout(opt.id)}
                className={cn(
                  "rounded-xl border p-4 text-left transition-all flex items-start gap-3",
                  active
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border bg-card hover:border-primary/40"
                )}
              >
                <div className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                  active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                </div>
                <div className={cn(
                  "h-4 w-4 rounded-full border-2 shrink-0 mt-0.5",
                  active ? "border-primary bg-primary" : "border-border"
                )} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
