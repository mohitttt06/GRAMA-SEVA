import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ElectricityService from './components/ElectricityService';
import WaterManagement from './components/WaterManagement';
import CropIntelligence from './components/CropIntelligence';
import EmploymentHub from './components/EmploymentHub';
import AboutSection from './components/AboutSection';
import AdminDashboard from './components/AdminDashboard';
import { 
  InitialComplaints, 
  InitialWaterSchedules, 
  WaterAnnouncements, 
  InitialWorkers, 
  InitialJobs 
} from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Shared Reactive States
  const [complaints, setComplaints] = useState(InitialComplaints);
  const [schedules, setSchedules] = useState(InitialWaterSchedules);
  const [announcements, setAnnouncements] = useState(WaterAnnouncements);
  const [workers, setWorkers] = useState(InitialWorkers);
  const [jobs, setJobs] = useState(InitialJobs);

  // Compute reactive statistics for the Hero / Dashboard counters
  const stats = {
    activeComplaints: complaints.filter(c => c.status !== 'Resolved').length,
    resolvedComplaints: complaints.filter(c => c.status === 'Resolved').length,
    activeWaterReleases: schedules.filter(s => s.status === 'Active').length,
    reservoirAvg: Math.round(schedules.reduce((acc, curr) => acc + curr.reservoirLevel, 0) / schedules.length),
    cropAnalysesCount: 148, // Live simulated counts
    registeredWorkersCount: workers.length,
    activeJobOpenings: jobs.filter(j => j.status === 'Open').length,
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Hero setCurrentTab={setCurrentTab} stats={stats} />;
      case 'electricity':
        return (
          <ElectricityService 
            complaints={complaints} 
            setComplaints={setComplaints} 
          />
        );
      case 'water':
        return (
          <WaterManagement 
            schedules={schedules} 
            setSchedules={setSchedules}
            announcements={announcements}
            setAnnouncements={setAnnouncements}
          />
        );
      case 'crop':
        return <CropIntelligence />;
      case 'employment':
        return (
          <EmploymentHub 
            workers={workers} 
            setWorkers={setWorkers}
            jobs={jobs}
            setJobs={setJobs}
          />
        );
      case 'admin':
        return (
          <AdminDashboard 
            complaints={complaints}
            setComplaints={setComplaints}
            schedules={schedules}
            setSchedules={setSchedules}
            workers={workers}
            jobs={jobs}
          />
        );
      case 'about':
      case 'contact':
        return <AboutSection />;
      default:
        return <Hero setCurrentTab={setCurrentTab} stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-navy-dark font-sans text-slate-200 flex flex-col justify-between transition-colors duration-300">
      
      {/* Platform Navigation Header */}
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Dynamic Workspace Area */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Professional e-Governance Footer */}
      <footer className="bg-navy-light border-t border-navy-dark/40 text-slate-400 py-12 px-4 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white font-display tracking-tight">
                GramSeva<span className="text-accent-blue font-light">Connect</span>
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              National Smart Rural Development Initiative. Building clean, decentralized public utilities, zero-intermediary work grids, and intelligent crop safety models.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px] font-display">Governance Core</h4>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => setCurrentTab('electricity')} className="hover:text-accent-blue text-left cursor-pointer transition-colors">Electricity Grid Helpdesk</button></li>
              <li><button onClick={() => setCurrentTab('water')} className="hover:text-accent-blue text-left cursor-pointer transition-colors">Drinking Water Broadcasting</button></li>
              <li><button onClick={() => setCurrentTab('crop')} className="hover:text-accent-blue text-left cursor-pointer transition-colors">Crop Stress Prediction</button></li>
              <li><button onClick={() => setCurrentTab('employment')} className="hover:text-accent-blue text-left cursor-pointer transition-colors">Skill Placement Directory</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px] font-display">Citizen Support</h4>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => setCurrentTab('about')} className="hover:text-accent-blue text-left cursor-pointer transition-colors">Mission & Goals</button></li>
              <li><button onClick={() => setCurrentTab('contact')} className="hover:text-accent-blue text-left cursor-pointer transition-colors">BDO Support Helpline</button></li>
              <li><button onClick={() => setCurrentTab('admin')} className="hover:text-accent-blue text-left cursor-pointer transition-colors">Panchayat Administration Terminal</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] font-display">Digital India Initiative</h4>
            <p className="text-[10px] leading-relaxed text-slate-500">
              This portal conforms to standard digital service guidelines (NDSAP) of India. Hosted on secure block servers under the Sehore District Digital Village Project.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-navy-dark text-slate-300 px-2 py-0.5 rounded font-mono text-[9px] uppercase font-bold tracking-wider border border-accent-blue/20">
                NIC Standard V2
              </span>
              <span className="bg-navy-dark text-slate-300 px-2 py-0.5 rounded font-mono text-[9px] uppercase font-bold tracking-wider border border-accent-blue/20">
                W3C AA
              </span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-navy-dark/40 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>© 2026 GramSeva Connect. Ministry of Electronics & IT • Government of India. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline hover:text-accent-blue transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline hover:text-accent-blue transition-colors">Hyperlinking Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline hover:text-accent-blue transition-colors">Security Pledge</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

