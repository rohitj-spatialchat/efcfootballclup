import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import efcLogo from "@/assets/efclogo.png";

const interestTags = [
  "Sport & Exercise Science", "Nutrition", "Sport Psychology",
  "Sports Medicine & Physiotherapy", "Strength & Power", "Fitness & Exercise Physiology",
  "Recovery and Regeneration", "Networking", "Leadership", "Management",
  "Career Development", "Coaching", "Education", "Communication",
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : prev.length < 3 ? [...prev, tag] : prev
    );
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start px-4 py-12 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(190, 90%, 55%), hsl(190, 80%, 60%) 30%, hsl(280, 40%, 65%) 60%, hsl(330, 70%, 55%))",
      }}
    >
      <div className="absolute inset-0 overflow-hidden opacity-[0.08] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1400 900" fill="none">
          <path d="M-100 500 Q200 300 500 500 Q800 700 1100 400 Q1300 200 1500 350" stroke="white" strokeWidth="2" />
          <path d="M1400 100 Q1100 300 800 200 Q500 100 200 300 Q0 400 -100 350" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-lg space-y-6 text-center">
        <img src={efcLogo} alt="EFC Logo" className="h-36 w-36 mx-auto object-contain" />
        <h1 className="text-2xl font-bold text-gray-900">Tell us about yourself</h1>

        <div className="space-y-4 text-left px-2">
          <div>
            <label className="text-sm font-bold text-gray-900 mb-1 block">Name</label>
            <input type="text" placeholder="Name" className="w-full h-12 rounded-full bg-white/90 px-6 text-sm placeholder:text-gray-400 focus:outline-none" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-900 mb-1 block">Club</label>
            <div className="relative">
              <select className="w-full h-12 rounded-full bg-white/90 px-6 text-sm text-gray-400 appearance-none focus:outline-none">
                <option>Select club</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-sm font-bold text-gray-900 mb-1 block">Position</label>
            <div className="relative">
              <select className="w-full h-12 rounded-full bg-white/90 px-6 text-sm text-gray-400 appearance-none focus:outline-none">
                <option>Select position</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-sm font-bold text-gray-900 mb-1 block">Country</label>
            <div className="relative">
              <select className="w-full h-12 rounded-full bg-white/90 px-6 text-sm text-gray-400 appearance-none focus:outline-none">
                <option>Select country</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="text-sm font-bold text-gray-900 mb-1 block">Interests(choose 3):</label>
            <div className="flex flex-wrap gap-2">
              {interestTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors border ${
                    selectedTags.includes(tag)
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white/80 text-gray-600 border-gray-300 hover:bg-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate("/welcome")}
            className="w-full h-12 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors mt-2"
          >
            Continue
          </button>
        </div>

        <p className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em] mt-6">
          THE HEART<br />OF FOOTBALL
        </p>
      </div>
    </div>
  );
}
