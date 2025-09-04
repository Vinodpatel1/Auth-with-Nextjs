"use client";
import  { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define the type for sparkle properties

type Sparkle = {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
};

export default function ProfilePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [data , setData] = useState("nothing");

  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);

    // Generate floating sparkles
    const newSparkles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }));
    setSparkles(newSparkles);
  }, []);


  const getUserDeatails = async () => {
    const res = await axios.get("/api/users/me",{ withCredentials: true });
    console.log(res.data);
    setData(res.data.data._id);
  };


  const handleLogout = async() => {
    console.log("Logged out with magic ✨");
    try {
       await axios.get("/api/users/logout");
      alert( "Logout successful: ");
      router.push("/login");
      
    } catch (error: any) {
      console.error("Logout failed:", error.message);
      alert("Logout failed: " + error.message);
      return;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Clouds */}
        <div className="absolute top-10 left-10 w-32 h-16 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-12 bg-white bg-opacity-5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-16 w-28 h-14 bg-white bg-opacity-8 rounded-full animate-pulse delay-2000"></div>

        {/* Floating Sparkles */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-70"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animation: `float ${sparkle.duration}s ease-in-out infinite`,
              animationDelay: `${sparkle.delay}s`,
            }}
          ></div>
        ))}

        {/* Magical Particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-amber-300 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-orange-300 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-yellow-300 rounded-full animate-ping delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-6 relative z-10">
        <div
          className={`relative bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-slate-800/90 backdrop-blur-md border border-emerald-400/30 shadow-2xl rounded-3xl max-w-lg w-full p-10 text-center transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(16, 185, 129, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Magical Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400/10 via-teal-400/5 to-cyan-400/10 animate-pulse"></div>

          {/* Profile Image with Magical Frame */}
          <div className="relative flex justify-center mb-8">
            <div className="relative group">
              {/* Outer magical ring */}
              <div className="absolute inset-0 w-36 h-36 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 animate-spin-slow p-1">
                <div className="w-full h-full rounded-full bg-slate-800"></div>
              </div>

              {/* Inner glow ring */}
              <div className="absolute inset-2 w-32 h-32 rounded-full bg-gradient-to-r from-pink-400/50 via-purple-400/50 to-blue-400/50 animate-pulse"></div>

              {/* Profile image */}
              <img
                src="/gattu.png.png" // 👈 place your image in the `public` folder as `profile.png`
                alt="Profile"
                className="relative w-32 h-32 rounded-full object-cover transform group-hover:scale-105 transition-transform duration-500 border-4 border-white/20 shadow-2xl"
              />

              {/* Floating magic particles around image */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-500"></div>
              <div className="absolute top-4 -right-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-1000"></div>
            </div>
          </div>

          {/* Content with stagger animation */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            {/* Name with magical text effect */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent mb-3 relative">
              Vinod Patel


              



              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent animate-pulse opacity-50"></div>
            </h1>

            <h4 className="underline  font-bold bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent mb-3 relative">
              {data ==='nothing' ? 'Nothing' : <Link 
              href={`/profile/${data}`}>Link to Profile :: {data}
              </Link> }
              {/* <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent animate-pulse opacity-50"></div> */}
            </h4>
            {/* <h2>{data ==='nothing' ? 'Nothing' : <Link 
              href={`/profile/${data}`}>{data}
              </Link> }</h2> */}

            <p className="text-emerald-400 text-lg mb-8 font-medium">
              ✨ Frontend Developer | React & Next.js Enchanter ✨
            </p>
          </div>

          {/* About section with delayed animation */}
          <div
            className={`transform transition-all duration-1000 delay-500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <div className="text-gray-200 text-base leading-relaxed mb-10 space-y-4">
              <div className="relative p-6 rounded-2xl bg-gradient-to-r from-slate-700/50 to-slate-600/50 border border-emerald-500/20 backdrop-blur-sm">
                <p>
                  Hello! I'm a passionate developer who weaves magic into modern
                  web applications with{" "}
                  <span className="font-semibold text-emerald-300">
                    Next.js
                  </span>{" "}
                  and <span className="font-semibold text-teal-300">React</span>
                  . ✨
                </p>
                <p className="mt-4">
                  I enjoy solving real-world problems, learning new
                  technologies, and creating digital experiences that spark
                  wonder. When I'm not coding, I explore new realms, share
                  knowledge, and contribute to the magical developer community.
                  🌟
                </p>

                {/* Floating decorative elements */}
                <div className="absolute top-2 right-4 text-yellow-400 text-xs animate-pulse">
                  ⭐
                </div>
                <div className="absolute bottom-2 left-4 text-pink-400 text-xs animate-pulse delay-1000">
                  🌸
                </div>
              </div>
            </div>
          </div>

          {/* Logout button with magical hover effects */}
          <div
            className={`transform transition-all duration-1000 delay-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            } mb-6`}
          >
            <button
              onClick={handleLogout}
              className="group relative w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white font-semibold shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-md"></div>

              {/* Button content */}
              <span className="relative flex items-center justify-center gap-2">
                <span className="text-2xl">🚪</span>
                <span>Logout</span>
                <span className="text-2xl group-hover:animate-bounce">✨</span>
              </span>

              {/* Sparkle trail effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-ping delay-200"></div>
                <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-white rounded-full animate-ping delay-400"></div>
              </div>
            </button>
          </div>


          <div
            className={`transform transition-all duration-1000 delay-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <button
              onClick={getUserDeatails}
              className="group relative w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white font-semibold shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-md"></div>

              {/* Button content */}
              <span className="relative flex items-center justify-center gap-2">
                <span className="text-2xl">🚪</span>
                <span>Get User Details...</span>
                <span className="text-2xl group-hover:animate-bounce">✨</span>
              </span>

              {/* Sparkle trail effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-ping delay-200"></div>
                <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-white rounded-full animate-ping delay-400"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
