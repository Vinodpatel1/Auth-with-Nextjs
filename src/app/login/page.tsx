"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Mock Next.js components for the artifact
type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const Link = ({ href, children, className }: LinkProps) => (
  <a href={href} className={className}>
    {children}
  </a>
);


export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  type Sparkle = {
    id: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
    size: number;
  };
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    setIsLoaded(true);

    // Generate floating sparkles
    const newSparkles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 3,
      size: Math.random() * 2 + 1,
    }));
    setSparkles(newSparkles);
  }, []);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);

      // Simulate API call
      const response = await axios.post("/api/users/login", user);

      // Mock axios call - replace with your real API
      console.log("Login success", { user });
      alert("Login successful!");
      router.push("/profile");
    } catch (error) {
      console.log("Login failed", error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full opacity-70 animate-pulse"
            style={{
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animation: `floatSparkle ${sparkle.duration}s ease-in-out infinite`,
              animationDelay: `${sparkle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen py-8 px-4 relative z-10">
        <div
          className={`relative w-full max-w-md transform transition-all duration-1000 ${
            isLoaded
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-10 opacity-0 scale-95"
          }`}
        >
          {/* Card Container */}
          <div
            className="relative bg-gradient-to-br from-gray-900/90 via-slate-900/95 to-black/90 backdrop-blur-xl border border-amber-400/30 shadow-2xl rounded-3xl p-8"
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Header */}
            <div
              className={`text-center mb-8 transform transition-all duration-1000 delay-300 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent mb-3">
                {loading ? "✨ Processing Magic" : "🌟 Welcome Back"}
              </h1>
              <p className="text-amber-400/80 text-sm font-medium">
                Enter your magical credentials to continue
              </p>
            </div>

            {/* Email Field */}
            <div
              className={`mb-6 transform transition-all duration-1000 delay-500 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
            >
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-amber-300/90 mb-3 flex items-center gap-2"
              >
                <span className="text-lg">📧</span>
                <span>Email Address</span>
              </label>
              <div className="relative group">
                <input
                  className={`w-full px-5 py-4 bg-slate-800/60 border-2 border-amber-400/20 rounded-2xl 
                    shadow-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-amber-400/60 focus:border-amber-400/60 transition-all duration-300
                    hover:border-amber-400/40 hover:bg-slate-800/80 backdrop-blur-sm font-medium`}
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="Enter your magical email address"
                />
              </div>
            </div>

            {/* Password Field */}
            <div
              className={`mb-8 transform transition-all duration-1000 delay-700 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
            >
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-amber-300/90 mb-3 flex items-center gap-2"
              >
                <span className="text-lg">🔐</span>
                <span>Password</span>
              </label>
              <div className="relative group">
                <input
                  className={`w-full px-5 py-4 bg-slate-800/60 border-2 border-amber-400/20 rounded-2xl 
                    shadow-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-amber-400/60 focus:border-amber-400/60 transition-all duration-300
                    hover:border-amber-400/40 hover:bg-slate-800/80 backdrop-blur-sm font-medium`}
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="Enter your secret magical spell"
                />
              </div>
            </div>

            {/* Login Button */}
            <div
              className={`mb-8 transform transition-all duration-1000 delay-900 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
            >
              <button
                onClick={onLogin}
                disabled={buttonDisabled}
                className={`group relative w-full py-4 rounded-2xl font-bold text-lg shadow-2xl transform transition-all duration-300 overflow-hidden ${
                  buttonDisabled
                    ? "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-400 cursor-not-allowed border border-gray-600"
                    : loading
                    ? "bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-black cursor-wait"
                    : "bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-black hover:shadow-amber-500/30 hover:scale-105 active:scale-95"
                }`}
              >
                <span className="relative flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-black/30 border-t-black rounded-full animate-spin"></div>
                      <span>Casting Magical Spell...</span>
                      <span className="animate-pulse">✨</span>
                    </>
                  ) : buttonDisabled ? (
                    <>
                      <span className="text-xl">🚫</span>
                      <span>Please Fill All Fields</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl">🎯</span>
                      <span>Begin Your Magical Journey</span>
                      <span className="group-hover:animate-bounce text-xl">✨</span>
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Signup Link */}
            <div
              className={`text-center transform transition-all duration-1000 delay-1100 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
            >
              <p className="text-gray-400 text-sm mb-4 font-medium">
                Don't have a magical account yet?
              </p>
              <Link
                href="/signup"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-800/40 border border-amber-400/20 text-amber-400 hover:text-amber-300 hover:bg-slate-700/60 hover:border-amber-400/40 font-semibold transition-all duration-300 hover:scale-105"
              >
                <span className="text-lg">🌟</span>
                <span>Create Your Magic Account</span>
                <span className="group-hover:animate-bounce group-hover:translate-x-1 transition-transform text-lg">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes floatSparkle {
          0%,
          100% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0.7;
          }
          25% {
            transform: translateY(-10px) rotate(90deg) scale(1.1);
            opacity: 1;
          }
          50% {
            transform: translateY(-20px) rotate(180deg) scale(0.9);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-10px) rotate(270deg) scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
