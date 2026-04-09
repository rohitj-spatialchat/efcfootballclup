import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import efcLogo from "@/assets/efclogo.png";

export default function IntroduceYourself() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [intro, setIntro] = useState("");

  const handlePost = () => {
    if (!intro.trim()) {
      toast({ title: "Please write an introduction", variant: "destructive" });
      return;
    }
    toast({ title: "Introduction posted!", description: "Welcome to the community! Redirecting to dashboard..." });
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(190, 90%, 55%), hsl(190, 80%, 60%) 30%, hsl(280, 40%, 65%) 60%, hsl(330, 70%, 55%))",
      }}
    >
      <div className="absolute inset-0 overflow-hidden opacity-[0.08] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1400 900" fill="none">
          <path d="M-100 500 Q200 300 500 500 Q800 700 1100 400" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-lg space-y-6 text-center">
        <img src={efcLogo} alt="EFC Logo" className="h-36 w-36 mx-auto object-contain" />
        <h1 className="text-2xl font-bold text-gray-900">Introduce Yourself</h1>

        <div className="text-left space-y-3">
          <label className="text-sm font-bold text-gray-900 block">Write a short intro to the community</label>
          <textarea
            rows={6}
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            placeholder="Tell us your preferred name, role, your club category, your top 3 areas of focus (load management, return-to-play, nutrition, psychology, etc.). Additionally, share one professional question or insight you'd like to explore. This helps the community match you with relevant peers and content. You'll be surprised how quickly peers respond."
            className="w-full rounded-xl bg-white/90 p-5 text-sm placeholder:text-gray-400 focus:outline-none resize-none"
          />
        </div>

        <button
          onClick={handlePost}
          className="w-full h-12 rounded-full bg-gray-900 text-white text-sm font-semibold tracking-wider hover:bg-gray-800 transition-colors"
        >
          POST
        </button>

        <p className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em] mt-4">
          THE HEART<br />OF FOOTBALL
        </p>
      </div>
    </div>
  );
}
