import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getTeamLogo } from "@/lib/teamLogos";
import efcLogo from "@/assets/efclogo.png";

const members = [
  {
    name: "Amanda Kim",
    role: "Head of Medical & Performance",
    flag: "🇫🇷",
    team: "AC Milan",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "James Wilson",
    role: "Director of Sports Science",
    flag: "🇩🇪",
    team: "Bayern Munich",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Daniel Brown",
    role: "Lead Performance Physiologist",
    flag: "🇩🇰",
    team: "Chelsea FC",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Sarah Johnson",
    role: "Head of Athlete Health & Rehabilitation",
    flag: "🇩🇪",
    team: "Liverpool FC",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  },
];

const recommended = [
  "Optimizing Injury Rehabilitation",
  "Psychological Strategies in Recovery",
  "Nutrition for Peak Performance",
];

export default function Recommendations() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [connectedMembers, setConnectedMembers] = useState<Set<string>>(new Set());
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set());

  const handleConnect = (name: string) => {
    if (connectedMembers.has(name)) {
      setConnectedMembers(prev => { const n = new Set(prev); n.delete(name); return n; });
      toast({ title: "Disconnected", description: `Removed connection with ${name}.` });
    } else {
      setConnectedMembers(prev => new Set(prev).add(name));
      toast({ title: "Connected!", description: `You connected with ${name}.` });
    }
  };

  const handleRegister = (item: string) => {
    if (registeredEvents.has(item)) {
      toast({ title: "Already registered", description: `You're already registered for "${item}".` });
      return;
    }
    setRegisteredEvents(prev => new Set(prev).add(item));
    toast({ title: "Registered!", description: `You've registered for "${item}".` });
  };

  return (
    <div
      className="min-h-screen px-6 py-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(190, 90%, 55%), hsl(190, 80%, 60%) 30%, hsl(280, 40%, 65%) 60%, hsl(330, 70%, 55%))",
      }}
    >
      <div className="absolute inset-0 overflow-hidden opacity-[0.08] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1400 900" fill="none">
          <path d="M-100 500 Q200 300 500 500 Q800 700 1100 400" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <img src={efcLogo} alt="EFC Logo" className="h-20 w-20 object-contain" />
          <p className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em] text-right">
            THE HEART<br />OF FOOTBALL
          </p>
        </div>

        <div className="flex gap-8">
          {/* Left - Members */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
              Community Members Recommended for You<br />Based on Your Interests
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {members.map((member) => {
                const teamLogo = getTeamLogo(member.team);
                return (
                  <div key={member.name} className="bg-white rounded-xl p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-14 w-14 rounded-full object-cover bg-gray-200"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <span className="text-lg">{member.flag}</span>
                      </div>
                      {teamLogo ? (
                        <img
                          src={teamLogo}
                          alt={member.team}
                          className="h-8 w-8 object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                    <button
                      onClick={() => handleConnect(member.name)}
                      className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                        connectedMembers.has(member.name)
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-900 text-white hover:bg-gray-800"
                      }`}
                    >
                      {connectedMembers.has(member.name) ? "✓ Connected" : "Connect"}
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => navigate("/introduce")}
              className="mt-6 w-full h-12 rounded-full bg-gray-900 text-white text-sm font-semibold tracking-wider hover:bg-gray-800 transition-colors"
            >
              CONTINUE
            </button>
          </div>

          {/* Right - Recommended */}
          <div className="w-72">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Recommended for You</h3>
            <div className="space-y-3">
              {recommended.map((item) => (
                <div key={item} className="bg-white rounded-xl p-4 space-y-2">
                  <p className="font-bold text-gray-900 text-sm">{item}</p>
                  <button
                    onClick={() => handleRegister(item)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      registeredEvents.has(item)
                        ? "bg-green-600 text-white"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    {registeredEvents.has(item) ? "✓ Registered" : "Register now"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
