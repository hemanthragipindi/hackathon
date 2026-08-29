import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden font-sans p-4">
      
      {/* Vibrant Background Blobs for Glassmorphism */}
      <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-emerald-500/50 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[20%] w-[450px] h-[450px] bg-teal-600/50 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[30%] left-[60%] w-[350px] h-[350px] bg-indigo-500/40 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Pure Glass Card */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Card Container */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/30">
              <Leaf size={32} />
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">FoodRescue</h2>
            <p className="text-white/60 mt-2 font-medium">Welcome back! Please sign in.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/90 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-white/50 group-focus-within:text-white transition-colors" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all backdrop-blur-sm"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-semibold text-white/90">Password</label>
                <Link to="#" className="text-xs font-semibold text-white/60 hover:text-white transition-colors">Forgot password?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-white/50 group-focus-within:text-white transition-colors" />
                </div>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all backdrop-blur-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-4 mt-4 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-gray-900/20 border-t-gray-900 rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-white/60">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-white hover:text-emerald-300 transition-colors drop-shadow-sm">
                Create one now
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
