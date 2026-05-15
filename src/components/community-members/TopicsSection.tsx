import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";

type Topic = { name: string; posts: number; bg: string; fg: string };

const initialTopics: Topic[] = [
  { name: "Tactics & Coaching", posts: 124, bg: "#1F8A4C", fg: "#FFFFFF" },
  { name: "Player Development", posts: 86, bg: "#7AB8C4", fg: "#FFFFFF" },
  { name: "Sports Science", posts: 64, bg: "#D9277A", fg: "#FFFFFF" },
  { name: "Match Analysis", posts: 142, bg: "#7BC142", fg: "#FFFFFF" },
  { name: "Recruitment & Scouting", posts: 38, bg: "#7E3FF2", fg: "#FFFFFF" },
  { name: "Performance Nutrition", posts: 27, bg: "#E58A7B", fg: "#FFFFFF" },
];

const swatches = ["#FF9090", "#1F8A4C", "#7AB8C4", "#D9277A", "#7BC142", "#7E3FF2", "#E58A7B", "#C4621F", "#0D0D0D", "#E8C547", "#27B1E6", "#0F1F66", "#8A1FB0", "#D67BB0", "#3A4FB8", "#A8B8E8", "#C42B3F"];

export default function TopicsSection() {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [bg, setBg] = useState("#FF9090");
  const [fg, setFg] = useState("#FFFFFF");

  const handleCreate = () => {
    if (!name.trim()) return toast.error("Please enter a topic name");
    setTopics([...topics, { name: name.trim(), posts: 0, bg, fg }]);
    toast.success("Topic created");
    setOpen(false);
    setName(""); setBg("#FF9090"); setFg("#FFFFFF");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Community Topics</h2>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" /> Create Topic
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-xs text-muted-foreground uppercase">
              <th className="px-4 py-3 text-left font-medium">Topic Name</th>
              <th className="px-4 py-3 text-left font-medium">Posts</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {topics.map((t, i) => (
              <tr key={i} className="hover:bg-muted/20">
                <td className="px-4 py-4">
                  <span
                    className="inline-block px-4 py-1.5 rounded-full text-sm font-medium"
                    style={{ backgroundColor: t.bg, color: t.fg }}
                  >
                    {t.name}
                  </span>
                </td>
                <td className="px-4 py-4 text-muted-foreground">{t.posts}</td>
                <td className="px-4 py-4 text-right">
                  <button
                    onClick={() => { setTopics(topics.filter((_, idx) => idx !== i)); toast.success("Topic removed"); }}
                    className="text-xs text-destructive hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="sm:max-w-xl w-full flex flex-col p-0">
          <SheetHeader className="px-6 py-4 border-b border-border">
            <SheetTitle>Create Topic</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            <div>
              <label className="text-sm font-medium">Topic Name <span className="text-destructive">*</span></label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter topic name"
                className="mt-2 w-full h-11 rounded-md border border-border bg-background px-3 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Select Topic Color <span className="text-destructive">*</span></label>
              <div className="mt-2 flex items-center gap-3 rounded-md border border-border px-3 py-2.5">
                <input type="color" value={bg} onChange={(e) => setBg(e.target.value.toUpperCase())} className="h-6 w-6 rounded cursor-pointer border-none p-0 bg-transparent" />
                <input value={bg} onChange={(e) => setBg(e.target.value.toUpperCase())} className="flex-1 bg-transparent text-sm outline-none" />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {swatches.map((s) => (
                  <button key={s} onClick={() => setBg(s)} style={{ backgroundColor: s }} className="h-6 w-6 rounded-full border border-border" />
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Select Text Color <span className="text-destructive">*</span></label>
              <div className="mt-2 flex items-center gap-3 rounded-md border border-border px-3 py-2.5">
                <input type="color" value={fg} onChange={(e) => setFg(e.target.value.toUpperCase())} className="h-6 w-6 rounded cursor-pointer border-none p-0 bg-transparent" />
                <input value={fg} onChange={(e) => setFg(e.target.value.toUpperCase())} className="flex-1 bg-transparent text-sm outline-none" />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["#FFFFFF", "#000000", "#1F8A4C", "#D9277A", "#7E3FF2", "#E58A7B"].map((s) => (
                  <button key={s} onClick={() => setFg(s)} style={{ backgroundColor: s }} className="h-6 w-6 rounded-full border border-border" />
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Preview</label>
              <div className="mt-2 rounded-md border border-border min-h-[80px] flex items-center justify-center px-4 py-4">
                {name.trim() ? (
                  <span className="inline-block px-5 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: bg, color: fg }}>
                    {name}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">Enter a topic name to see preview</span>
                )}
              </div>
            </div>
          </div>

          <SheetFooter className="px-6 py-4 border-t border-border flex !flex-row !justify-between">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create Topic</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
