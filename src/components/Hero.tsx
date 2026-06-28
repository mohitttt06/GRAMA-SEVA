import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Droplet, 
  Sprout, 
  Briefcase, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
  stats: {
    activeComplaints: number;
    resolvedComplaints: number;
    activeWaterReleases: number;
    reservoirAvg: number;
    cropAnalysesCount: number;
    registeredWorkersCount: number;
    activeJobOpenings: number;
  };
}

export default function Hero({ setCurrentTab, stats }: HeroProps) {
  return (
    <div className="space-y-24 pb-20 bg-navy-dark text-slate-200">
      
      {/* HERO SECTION */}
      <div className="relative overflow-hidden bg-navy-dark py-12 lg:py-20 border-b border-navy-light/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline, Subtitle, CTAs */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                Panchayat Smart Governance Core
              </span>
              
              <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Smart Rural Governance Platform
              </h1>
              
              <p className="text-base text-slate-300 leading-relaxed max-w-xl font-sans">
                Connecting citizens, agriculture, utilities, and employment through a single digital platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('alternating-features');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold bg-accent-blue text-navy-dark hover:bg-accent-cyan transition-all cursor-pointer font-display shadow-lg shadow-accent-blue/15"
                >
                  Explore Services
                </button>
                <button
                  onClick={() => setCurrentTab('admin')}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold bg-navy-light text-white border border-accent-blue/20 hover:bg-navy-dark hover:border-accent-blue/40 transition-all cursor-pointer"
                >
                  View Dashboard
                </button>
              </div>
            </div>

            {/* Right Column: Large Professional Rural Development Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-accent-blue/20 shadow-2xl shadow-navy-dark/80 group">
                <img 
                  src="https://images.unsplash.com/photo-1546738221-1b918a38c4ff?auto=format&fit=crop&q=80&w=1200" 
                  alt="Smart Village Aerial Landscape" 
                  referrerPolicy="no-referrer"
                  className="w-full h-[320px] sm:h-[400px] object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 bg-navy-light/95 border border-accent-blue/15 p-3 rounded-xl backdrop-blur-sm">
                  <p className="text-xs font-semibold text-white">Sehore Block Village Development Model</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Automated services tracking and rural public welfare management.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* QUICK HIGHLIGHT MATRIX (Simplified / Real metrics only) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-light border border-accent-blue/15 rounded-2xl p-6 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-accent-blue/10">
            
            <div className="flex flex-col justify-center p-2">
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Outage Complaints</span>
              <span className="text-2xl font-bold font-mono text-white mt-1">{stats.activeComplaints} Active</span>
              <span className="text-[10px] text-accent-blue mt-0.5">{stats.resolvedComplaints} Grid Faults Solved</span>
            </div>

            <div className="flex flex-col justify-center p-2 pt-4 md:pt-2">
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Reservoir Water</span>
              <span className="text-2xl font-bold font-mono text-white mt-1">{stats.reservoirAvg}% Average</span>
              <span className="text-[10px] text-accent-blue mt-0.5">{stats.activeWaterReleases} Release Zones Active</span>
            </div>

            <div className="flex flex-col justify-center p-2 pt-4 md:pt-2">
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Crop Health Logs</span>
              <span className="text-2xl font-bold font-mono text-white mt-1">{stats.cropAnalysesCount} Records</span>
              <span className="text-[10px] text-accent-blue mt-0.5">Real-time Stress Forecasts</span>
            </div>

            <div className="flex flex-col justify-center p-2 pt-4 md:pt-2">
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Workforce Hub</span>
              <span className="text-2xl font-bold font-mono text-white mt-1">{stats.registeredWorkersCount} Members</span>
              <span className="text-[10px] text-accent-blue mt-0.5">{stats.activeJobOpenings} Daily Wage Opportunities</span>
            </div>

          </div>
        </div>
      </div>

      {/* ALTERNATING IMAGE-TEXT LAYOUT SECTION */}
      <div id="alternating-features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
            Integrated Public Services
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Modern utilities and employment coordination under unified digital tracking.
          </p>
        </div>

        {/* Row 1: Electricity Service */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-4">
            <div className="p-2 w-10 h-10 rounded-xl bg-accent-blue/10 text-accent-blue flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Smart Electricity Service Grid</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Report and resolve village microgrid faults instantly with automated lineman assignments and live complaint status tracking.
            </p>
            <button
              onClick={() => setCurrentTab('electricity')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue hover:text-accent-cyan cursor-pointer transition-colors"
            >
              Manage Power Complaints <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="rounded-xl overflow-hidden border border-accent-blue/15 shadow-xl max-h-[240px]">
              <img 
                src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200" 
                alt="Rural Electrical Networks" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Water Management */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="rounded-xl overflow-hidden border border-accent-blue/15 shadow-xl max-h-[240px]">
              <img 
                src="https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&q=80&w=1200" 
                alt="Water supply canals and reservoir pipelines" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 space-y-4">
            <div className="p-2 w-10 h-10 rounded-xl bg-accent-blue/10 text-accent-blue flex items-center justify-center">
              <Droplet className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Decentralized Water Distribution</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Monitor water release schedules, live reservoir storage metrics, and weekly purity tests for your ward in one simple view.
            </p>
            <button
              onClick={() => setCurrentTab('water')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue hover:text-accent-cyan cursor-pointer transition-colors"
            >
              Monitor Water Schedules <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Row 3: Crop Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-4">
            <div className="p-2 w-10 h-10 rounded-xl bg-accent-blue/10 text-accent-blue flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Crop Stress Prediction System</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Log local weather parameters and upload crop leaf images to assess disease, drought, and pest stress risks with diagnostic recommendations.
            </p>
            <button
              onClick={() => setCurrentTab('crop')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue hover:text-accent-cyan cursor-pointer transition-colors"
            >
              Analyze Farm Crop Health <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="rounded-xl overflow-hidden border border-accent-blue/15 shadow-xl max-h-[240px]">
              <img 
                src="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=1200" 
                alt="Agricultural fields and healthy farm plants" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Row 4: Employment Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="rounded-xl overflow-hidden border border-accent-blue/15 shadow-xl max-h-[240px]">
              <img 
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200" 
                alt="Skilled work and local development construction" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 space-y-4">
            <div className="p-2 w-10 h-10 rounded-xl bg-accent-blue/10 text-accent-blue flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Rural Livelihood & Skilled Work Hub</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Direct wage matching coordinates local skilled craftspeople and employers directly inside the Panchayat, completely removing intermediate fees.
            </p>
            <button
              onClick={() => setCurrentTab('employment')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-blue hover:text-accent-cyan cursor-pointer transition-colors"
            >
              Connect with Jobs & Labors <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* SIMPLE ACTION SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative rounded-2xl overflow-hidden bg-navy-light border border-accent-blue/15 shadow-xl p-8 text-left">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-2xl font-bold font-display text-white">
              Panchayat Central Command Console
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you an authorized Block Officer or Village Head? Sign in to the central administrative panel to dispatch emergency linemen, control water main bypass valves, and monitor rural development metrics.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentTab('admin')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-accent-blue text-navy-dark hover:bg-accent-cyan cursor-pointer transition-all"
              >
                Access Administration Terminal <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
