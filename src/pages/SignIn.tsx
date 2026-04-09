import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import efcLogo from "@/assets/efclogo.png";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }
    const success = login(username, password);
    if (success) {
      toast({ title: "Welcome back!", description: "You've signed in successfully." });
      navigate("/");
    } else {
      setError("Invalid username or password. Try a username/email like 'max' or 'max@efcfootball.com' with password 'max123'.");
    }
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
          <path d="M-100 500 Q200 300 500 500 Q800 700 1100 400 Q1300 200 1500 350" stroke="white" strokeWidth="2" />
          <path d="M-50 600 Q250 400 550 600 Q850 800 1150 500 Q1350 300 1550 450" stroke="white" strokeWidth="1.5" />
          <path d="M1400 100 Q1100 300 800 200 Q500 100 200 300 Q0 400 -100 350" stroke="white" strokeWidth="2" />
          <path d="M1500 200 Q1200 400 900 300 Q600 200 300 400 Q100 500 -50 450" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8 text-center">
        <img src={efcLogo} alt="EFC Logo" className="h-36 w-36 mx-auto object-contain" />
        <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>

        <div className="space-y-3 px-4">
          {error && (
            <div className="bg-red-100 text-red-700 text-xs rounded-lg px-4 py-2 text-left">{error}</div>
          )}
          <input
            type="text"
            placeholder="Username or Email"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full h-12 rounded-full bg-white/90 px-6 text-sm placeholder:text-gray-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full h-12 rounded-full bg-white/90 px-6 text-sm placeholder:text-gray-400 focus:outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full h-12 rounded-full bg-gray-900 text-white text-sm font-semibold tracking-wider hover:bg-gray-800 transition-colors mt-1"
          >
            LOG IN
          </button>
        </div>

        <div className="flex items-center gap-3 px-4">
          <div className="flex-1 h-px bg-white/30" />
          <span className="text-sm text-white/80">or login with</span>
          <div className="flex-1 h-px bg-white/30" />
        </div>

        <div className="flex items-center justify-center gap-4">
          <button className="h-10 w-10 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors">
            <span className="text-sm font-bold" style={{ background: "linear-gradient(to bottom right, #4285F4, #EA4335, #FBBC05, #34A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>G</span>
          </button>
          <button className="h-10 w-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-sm font-bold hover:opacity-90 transition-colors">
            f
          </button>
          <button className="h-10 w-10 rounded-full bg-white text-gray-900 flex items-center justify-center text-sm font-bold hover:bg-white/90 transition-colors">
            ✕
          </button>
        </div>

        <p className="text-sm font-bold text-gray-900 uppercase tracking-[0.2em]">
          THE HEART<br />OF FOOTBALL
        </p>

        <p className="text-sm text-white/80">
          Don't have an account?{" "}
          <Link to="/signup" className="text-white underline font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
