"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

import { useState, useEffect } from "react";

// Mock Next.js components for the artifact
type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const Link = ({ href, children, className }: LinkProps) => (
  <a href={href} className={className}>{children}</a>
);



export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
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
  type MagicalOrb = {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
  };
  const [magicalOrbs, setMagicalOrbs] = useState<MagicalOrb[]>([]);

  useEffect(() => {
    setIsLoaded(true);
    
    // Generate floating sparkles
    const newSparkles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 3,
      size: Math.random() * 3 + 1,
    }));
    setSparkles(newSparkles);

    // Generate magical orbs
    const newOrbs = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 40,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
    }));
    setMagicalOrbs(newOrbs);
  }, []);

  useEffect(() => {
    setButtonDisabled(!(user.username && user.email && user.password));
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock axios call - replace with: const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", { user });
      alert("Signup successful 🎉");
      router.push("/login");
      
    } catch (error) {
      console.log("Signup failed", error);
      alert("Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Sparkles */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full opacity-70"
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

        {/* Magical Orbs */}
        {magicalOrbs.map((orb) => (
          <div
            key={orb.id}
            className="absolute bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-2xl animate-pulse"
            style={{
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              animationDelay: `${orb.delay}s`,
              animationDuration: `${orb.duration}s`,
            }}
          />
        ))}
        
        {/* Magical Particles */}
        <div className="absolute top-20 left-20 w-1 h-1 bg-amber-300 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-orange-300 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-2000"></div>
        <div className="absolute top-60 right-20 w-1 h-1 bg-amber-400 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-60 right-60 w-1 h-1 bg-orange-400 rounded-full animate-ping delay-1500"></div>
        <div className="absolute top-32 left-60 w-1 h-1 bg-yellow-300 rounded-full animate-ping delay-3000"></div>
        
        {/* Constellation Effects */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-amber-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-orange-400 rounded-full opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-yellow-400 rounded-full opacity-60 animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen py-8 px-4 relative z-10">
        <div 
          className={`relative w-full max-w-md transform transition-all duration-1200 ${
            isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-90'
          }`}
        >
          {/* Magical Card Container */}
          <div 
            className="relative bg-gradient-to-br from-gray-900/90 via-slate-900/95 to-black/90 backdrop-blur-xl border border-amber-400/30 shadow-2xl rounded-3xl p-8"
            style={{
              boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(245, 158, 11, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Magical Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/12 via-orange-400/6 to-yellow-400/12 animate-pulse"></div>
            
            {/* Floating Magic Elements around card */}
            <div className="absolute -top-4 -right-4 w-5 h-5 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
            <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-amber-400 rounded-full animate-bounce delay-500 opacity-80"></div>
            <div className="absolute top-1/4 -right-6 w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-1000 opacity-80"></div>
            <div className="absolute bottom-1/4 -left-5 w-3 h-3 bg-yellow-300 rounded-full animate-bounce delay-1500 opacity-80"></div>
            <div className="absolute top-1/2 -right-3 w-2 h-2 bg-amber-300 rounded-full animate-bounce delay-2000 opacity-80"></div>
            <div className="absolute top-3/4 -left-3 w-2 h-2 bg-orange-300 rounded-full animate-bounce delay-2500 opacity-80"></div>

            {/* Header */}
            <div className={`text-center mb-8 transform transition-all duration-1000 delay-400 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}>
              <div className="relative">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent mb-3">
                  {loading ? "⚡ Creating Magic..." : "✨ Join The Magic"}
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent animate-pulse opacity-30 blur-sm">
                  {loading ? "⚡ Creating Magic..." : "✨ Join The Magic"}
                </div>
              </div>
              <p className="text-amber-400/80 text-sm font-medium">Create your account and begin your magical journey</p>
            </div>

            {/* Decorative Divider */}
            <div className="relative my-8">
              <hr className="border-amber-400/30" />
              <div className="absolute inset-0 flex justify-center">
                <div className="bg-black px-4 flex items-center gap-1">
                  <div className="w-1 h-1 bg-amber-400 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-300"></div>
                  <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-600"></div>
                  <div className="w-1 h-1 bg-amber-400 rounded-full animate-pulse delay-900"></div>
                  <div className="w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-1200"></div>
                </div>
              </div>
            </div>

            {/* Username Field */}
            <div className={`mb-6 transform transition-all duration-1000 delay-600 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-amber-300/90 mb-3 flex items-center gap-2"
              >
                <span className="text-lg">🙍‍♂️</span> 
                <span>Choose Your Username</span>
              </label>
              <div className="relative group">
                <input
                  id="username"
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  placeholder="Enter your magical username"
                  className="w-full px-5 py-4 bg-slate-800/60 border-2 border-amber-400/20 rounded-2xl shadow-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400/60 transition-all duration-300 hover:border-amber-400/40 hover:bg-slate-800/80 backdrop-blur-sm font-medium"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Email Field */}
            <div className={`mb-6 transform transition-all duration-1000 delay-800 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-amber-300/90 mb-3 flex items-center gap-2"
              >
                <span className="text-lg">📧</span> 
                <span>Email Address</span>
              </label>
              <div className="relative group">
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="Enter your magical email address"
                  className="w-full px-5 py-4 bg-slate-800/60 border-2 border-amber-400/20 rounded-2xl shadow-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400/60 transition-all duration-300 hover:border-amber-400/40 hover:bg-slate-800/80 backdrop-blur-sm font-medium"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Password Field */}
            <div className={`mb-8 transform transition-all duration-1000 delay-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-amber-300/90 mb-3 flex items-center gap-2"
              >
                <span className="text-lg">🔑</span> 
                <span>Create Password</span>
              </label>
              <div className="relative group">
                <input
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="Create a strong magical password"
                  className="w-full px-5 py-4 bg-slate-800/60 border-2 border-amber-400/20 rounded-2xl shadow-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-amber-400/60 transition-all duration-300 hover:border-amber-400/40 hover:bg-slate-800/80 backdrop-blur-sm font-medium"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Signup Button */}
            <div className={`mb-8 transform transition-all duration-1000 delay-1200 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              <button
                onClick={onSignup}
                disabled={buttonDisabled || loading}
                className={`group relative w-full py-4 rounded-2xl font-bold text-lg shadow-2xl transform transition-all duration-300 overflow-hidden ${
                  buttonDisabled || loading
                    ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-400 cursor-not-allowed border border-gray-600' 
                    : 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-black hover:shadow-amber-500/30 hover:scale-105 active:scale-95'
                }`}
              >
                {/* Button glow effect */}
                {!buttonDisabled && !loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-md"></div>
                )}
                
                {/* Button content */}
                <span className="relative flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-black/30 border-t-black rounded-full animate-spin"></div>
                      <span>✨ Creating Your Account...</span>
                      <span className="animate-pulse">🌟</span>
                    </>
                  ) : buttonDisabled ? (
                    <>
                      <span className="text-xl">🚫</span>
                      <span>Please Fill All Fields</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl">🚀</span>
                      <span>Begin Your Magical Adventure</span>
                      <span className="group-hover:animate-bounce text-xl">✨</span>
                    </>
                  )}
                </span>
                
                {/* Enhanced Sparkle trail effect */}
                {!buttonDisabled && !loading && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-100"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-200"></div>
                    <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
                    <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-white rounded-full animate-ping delay-400"></div>
                    <div className="absolute top-2/3 right-1/6 w-1 h-1 bg-white rounded-full animate-ping delay-500"></div>
                  </div>
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className={`text-center transform transition-all duration-1000 delay-1400 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              <p className="text-gray-400 text-sm mb-4 font-medium">Already part of our magical community?</p>
              <Link
                href="/login"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-800/40 border border-amber-400/20 text-amber-400 hover:text-amber-300 hover:bg-slate-700/60 hover:border-amber-400/40 font-semibold transition-all duration-300 hover:scale-105"
              >
                <span className="text-lg">🔑</span>
                <span>Login to Your Account</span>
                <span className="group-hover:animate-bounce group-hover:translate-x-1 transition-transform text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes floatSparkle {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0.7;
          }
          25% {
            transform: translateY(-15px) rotate(90deg) scale(1.2);
            opacity: 1;
          }
          50% {
            transform: translateY(-30px) rotate(180deg) scale(0.8);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-15px) rotate(270deg) scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}