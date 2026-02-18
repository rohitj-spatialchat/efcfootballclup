import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import efcLogo from "@/assets/efclogo.png";

export default function Welcome() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(190, 90%, 55%), hsl(190, 80%, 60%) 30%, hsl(280, 40%, 65%) 60%, hsl(330, 70%, 55%))",
      }}
    >
      <div className="absolute inset-0 overflow-hidden opacity-[0.08] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1400 900" fill="none">
          <path d="M-100 500 Q200 300 500 500 Q800 700 1100 400 Q1300 200 1500 350" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-4 text-center">
        {/* Welcome video banner */}
        <div className="w-full h-24 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center gap-3 cursor-pointer hover:opacity-90 transition-opacity">
          <span className="text-cyan-300 text-xl font-bold tracking-wider">WELCOME</span>
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <Play className="h-5 w-5 text-white fill-white" />
          </div>
          <img src={efcLogo} alt="EFC" className="h-12 w-12 object-contain opacity-60" />
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-2 gap-3">
          <button
            className="h-24 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, hsl(190, 80%, 60%), hsl(330, 70%, 60%))" }}
          >
            <span className="text-white text-xs font-bold tracking-wider leading-tight">CODE OF<br />CONDUCT</span>
            <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center">
              <Play className="h-3.5 w-3.5 text-white fill-white" />
            </div>
          </button>
          <button
            className="h-24 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, hsl(190, 80%, 60%), hsl(330, 70%, 60%))" }}
          >
            <span className="text-white text-xs font-bold tracking-wider leading-tight">TOUR OF THE<br />PLATFORM</span>
            <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center">
              <Play className="h-3.5 w-3.5 text-white fill-white" />
            </div>
          </button>
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-2 text-left cursor-pointer">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="h-4 w-4 rounded border-gray-400"
          />
          <span className="text-sm text-gray-900">Accept code of conduct</span>
        </label>

        <button
          onClick={() => navigate("/recommendations")}
          disabled={!accepted}
          className="w-full h-12 rounded-full bg-gray-900 text-white text-sm font-semibold tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          CONTINUE
        </button>

        <p className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em] mt-4">
          THE HEART<br />OF FOOTBALL
        </p>
      </div>
    </div>
  );
}
