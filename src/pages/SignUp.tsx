import { useState } from "react";
import { Link } from "react-router-dom";
import efcLogo from "@/assets/efclogo.png";

export default function SignUp() {
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
          <path d="M0 500 Q300 300 600 500 T1200 500" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-sm space-y-6 text-center">
        <img src={efcLogo} alt="EFC Logo" className="h-24 w-24 mx-auto rounded-full object-cover" />
        <h1 className="text-2xl font-bold text-white">Sign Up</h1>

        <div className="space-y-3">
          <input type="text" placeholder="First Name" className="w-full h-11 rounded-lg bg-white/90 px-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50" />
          <input type="text" placeholder="Last Name" className="w-full h-11 rounded-lg bg-white/90 px-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50" />
          <input type="email" placeholder="Email" className="w-full h-11 rounded-lg bg-white/90 px-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50" />
          <input type="tel" placeholder="Phone Number" className="w-full h-11 rounded-lg bg-white/90 px-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50" />
          <button className="w-full h-11 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
            SIGN UP
          </button>
        </div>

        <div className="text-xs text-white/80">or login with</div>
        <div className="flex items-center justify-center gap-4">
          {["G", "f", "𝕏"].map((icon, i) => (
            <button key={i} className="h-9 w-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold hover:bg-gray-800 transition-colors">
              {icon}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <p className="text-sm font-bold text-gray-900 uppercase tracking-wider">THE HEART<br />OF FOOTBALL</p>
          <p className="text-xs text-white/80">
            Already have an account?{" "}
            <Link to="/signin" className="text-white underline font-medium">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
