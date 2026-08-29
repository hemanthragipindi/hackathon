import React, { useState } from 'react';
import { User, Mail, Lock, Building, ArrowRight, ShieldCheck, Leaf, Briefcase, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [role, setRole] = useState('donor');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const getRoleIcon = () => {
    switch(role) {
      case 'donor': return <Briefcase size={16} />;
      case 'ngo': return <Heart size={16} />;
      case 'volunteer': return <User size={16} />;
      default: return <User size={16} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden font-sans p-4 py-12">
      
      {/* Vibrant Background Blobs for Glassmorphism */}
      <div className="absolute top-[5%] right-[15%] w-[500px] h-[500px] bg-emerald-500/40 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[5%] left-[10%] w-[600px] h-[600px] bg-indigo-500/40 rounded-full mix-blend-screen filter blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[40%] left-[45%] w-[400px] h-[400px] bg-teal-500/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Pure Glass Card */}
      <div className="w-full max-w-lg relative z-10">
        
        {/* Card Container */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-400 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
              <Leaf size={32} />
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Join FoodRescue</h2>
            <p className="text-white/60 mt-2 font-medium">Create your account to start making an impact.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Glassy Role Selector */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-white/50 uppercase tracking-widest ml-1">I am a...</label>
              <div className="flex p-1 bg-black/20 rounded-2xl border border-white/10 backdrop-blur-md">
                {[
                  { id: 'donor', label: 'Donor', icon: Briefcase },
                  { id: 'ngo', label: 'NGO', icon: Heart },
                  { id: 'volunteer', label: 'Volunteer', icon: User }
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`flex-1 py-2.5 px-2 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                      role === r.id 
                        ? 'bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/20' 
                        : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <r.icon size={16} className={role === r.id ? "text-white" : "opacity-70"} />
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/90 ml-1">
                  {role === 'ngo' ? 'Organization Name' : 'Full Name'}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-white/50 group-focus-within:text-white transition-colors">
                      {getRoleIcon()}
                    </span>
                  </div>
                  <input 
                    type="text" 
                    className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all backdrop-blur-sm"
                    placeholder={role === 'ngo' ? "Helping Hands NGO" : "Jane Doe"}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/90 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-white/50 group-focus-within:text-white transition-colors" />
                  </div>
                  <input 
                    type="email" 
                    className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all backdrop-blur-sm"
                    placeholder="you@organization.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/90 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-white/50 group-focus-within:text-white transition-colors" />
                  </div>
                  <input 
                    type="password" 
                    className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all backdrop-blur-sm"
                    placeholder="Create a strong password"
                    required
                  />
                </div>
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
                  Create Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="flex items-center gap-2 justify-center mt-6 opacity-70">
              <ShieldCheck size={14} className="text-emerald-300" />
              <span className="text-xs uppercase font-bold tracking-wider text-white/80">Secure 256-bit Encryption</span>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-white/60">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-white hover:text-emerald-300 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
