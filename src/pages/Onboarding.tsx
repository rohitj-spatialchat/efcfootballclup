import { useState } from "react";
import { ChevronDown } from "lucide-react";
import efcLogo from "@/assets/efclogo.png";

const expertiseTags = [
  "Sport & Exercise Science", "Nutrition", "Sport Psychology",
  "Sportmedicine & Physiotherapy", "Strength & Power", "Fitness & Exercise Physiology",
  "Injury Prevention", "Medical", "Leadership",
  "Sport Medicine", "Periodization", "Conditioning",
];

export default function Onboarding() {
  const [selectedTags, setSelectedTags] = useState<string[]>(["Sport & Exercise Science", "Nutrition", "Sport Psychology", "Sportmedicine & Physiotherapy"]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, hsl(190, 80%, 60%), hsl(280, 50%, 60%), hsl(330, 70%, 60%))",
      }}
    >
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path d="M0 400 Q300 200 600 400 T1200 400" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-5 text-center">
        <img src={efcLogo} alt="EFC Logo" className="h-20 w-20 mx-auto rounded-full object-cover" />
        <h1 className="text-xl font-bold text-white">Tell us about yourself</h1>

        <div className="space-y-4 text-left">
          <div>
            <label className="text-xs font-medium text-white/80 mb-1 block">Name:</label>
            <input type="text" placeholder="Name" className="w-full h-10 rounded-lg bg-white/90 px-4 text-sm placeholder:text-gray-400 focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-white/80 mb-1 block">Club:</label>
            <div className="relative">
              <select className="w-full h-10 rounded-lg bg-white/90 px-4 text-sm text-gray-600 appearance-none focus:outline-none">
                <option>Select a cl...</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-white/80 mb-1 block">Position:</label>
            <div className="relative">
              <select className="w-full h-10 rounded-lg bg-white/90 px-4 text-sm text-gray-600 appearance-none focus:outline-none">
                <option>Select position</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-white/80 mb-1 block">Country:</label>
            <div className="relative">
              <select className="w-full h-10 rounded-lg bg-white/90 px-4 text-sm text-gray-600 appearance-none focus:outline-none">
                <option>Select country</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-white/80 mb-1 block">Expertise:</label>
            <div className="flex flex-wrap gap-2">
              {expertiseTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-primary text-primary-foreground"
                      : "bg-white/80 text-gray-600 hover:bg-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full h-11 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors mt-2">
            Continue
          </button>
        </div>

        <p className="text-sm font-bold text-gray-900 uppercase tracking-wider mt-4">
          THE HEART<br />OF FOOTBALL
        </p>
      </div>
    </div>
  );
}
