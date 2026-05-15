import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const initialTopics = [
  { name: "Tactics & Coaching", posts: 124 },
  { name: "Player Development", posts: 86 },
  { name: "Sports Science", posts: 64 },
  { name: "Match Analysis", posts: 142 },
  { name: "Recruitment & Scouting", posts: 38 },
  { name: "Performance Nutrition", posts: 27 },
];

export default function TopicsSection() {
  const [topics, setTopics] = useState(initialTopics);
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Community Topics</h2>
        <Button onClick={() => { setTopics([...topics, { name: "New Topic", posts: 0 }]); toast.success("Topic added"); }}>
          <Plus className="h-4 w-4" /> Add Topic
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-xs text-muted-foreground uppercase">
              <th className="px-4 py-3 text-left font-medium">Topic</th>
              <th className="px-4 py-3 text-left font-medium">Posts</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {topics.map((t, i) => (
              <tr key={i} className="hover:bg-muted/20">
                <td className="px-4 py-4 text-foreground font-medium">{t.name}</td>
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
    </div>
  );
}
