import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Check } from "lucide-react";
import efcLogo from "@/assets/efclogo.png";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Welcome() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [videoOpen, setVideoOpen] = useState<string | null>(null);
  const { toast } = useToast();

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
        <div
          onClick={() => setVideoOpen("welcome")}
          className="w-full h-24 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <span className="text-cyan-300 text-xl font-bold tracking-wider">WELCOME</span>
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <Play className="h-5 w-5 text-white fill-white" />
          </div>
          <img src={efcLogo} alt="EFC" className="h-12 w-12 object-contain opacity-60" />
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setVideoOpen("conduct")}
            className="h-24 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, hsl(190, 80%, 60%), hsl(330, 70%, 60%))" }}
          >
            <span className="text-white text-xs font-bold tracking-wider leading-tight">CODE OF<br />CONDUCT</span>
            <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center">
              <Play className="h-3.5 w-3.5 text-white fill-white" />
            </div>
          </button>
          <button
            onClick={() => setVideoOpen("tour")}
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

      {/* Video Dialog */}
      <Dialog open={!!videoOpen} onOpenChange={(open) => !open && setVideoOpen(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {videoOpen === "welcome" && "Welcome to EFC MPU Community"}
              {videoOpen === "conduct" && "Code of Conduct"}
              {videoOpen === "tour" && "Platform Tour"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="w-full h-64 rounded-lg bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                  <Play className="h-8 w-8 text-white fill-white" />
                </div>
                <p className="text-white/60 text-sm">Video content would play here</p>
              </div>
            </div>
            {videoOpen === "conduct" && (
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>Our Community Values:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Treat all members with respect and professionalism</li>
                  <li>Share knowledge openly and constructively</li>
                  <li>Maintain confidentiality of sensitive information</li>
                  <li>Support evidence-based discussions</li>
                  <li>Report any inappropriate behavior to moderators</li>
                </ul>
              </div>
            )}
            {videoOpen === "tour" && (
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>Platform Features:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Feed</strong> — Share posts, research, and discussions</li>
                  <li><strong>Knowledge Hub</strong> — Access courses and learning materials</li>
                  <li><strong>Networking</strong> — Connect with professionals worldwide</li>
                  <li><strong>Events</strong> — Join webinars, workshops, and conferences</li>
                  <li><strong>Leaderboard</strong> — Track your MPU points and badges</li>
                </ul>
              </div>
            )}
            <button
              onClick={() => {
                if (videoOpen === "conduct") {
                  setAccepted(true);
                  toast({ title: "Code of conduct viewed", description: "You can now proceed." });
                }
                setVideoOpen(null);
              }}
              className="w-full h-10 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              {videoOpen === "conduct" ? "Accept & Close" : "Close"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
