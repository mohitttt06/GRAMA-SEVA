import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Zap, 
  Droplet, 
  Briefcase, 
  AlertTriangle, 
  CheckCircle2, 
  Users,
  Activity,
  ArrowRight,
  TrendingUp,
  Sliders,
  Check
} from 'lucide-react';
import { 
  ElectricityComplaint, 
  WaterZoneSchedule, 
  WorkerProfile, 
  JobOpportunity, 
  LinemenData 
} from '../types';

interface AdminProps {
  complaints: ElectricityComplaint[];
  setComplaints: React.Dispatch<React.SetStateAction<ElectricityComplaint[]>>;
  schedules: WaterZoneSchedule[];
  setSchedules: React.Dispatch<React.SetStateAction<WaterZoneSchedule[]>>;
  workers: WorkerProfile[];
  jobs: JobOpportunity[];
}

export default function AdminDashboard({ 
  complaints, 
  setComplaints, 
  schedules, 
  setSchedules, 
  workers, 
  jobs 
}: AdminProps) {

  // Simple clean activity log tracker (no fake CLI larping)
  const [activities, setActivities] = useState<string[]>([
    "Assigned COMP-4081 electrical complaint to lineman Rajesh Kumar (Ward 3)",
    "Published updated drinking water release times for Ward 1 (Gram Panchayat Area)",
    "Approved skill-profile listing for citizen worker Ramesh Yadav",
    "Open pipeline valve for Shakti Nagar Zone to meet peak demand levels"
  ]);

  // Handle status step-forward from administrative table
  const handleAdvanceStatus = (id: string) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        let nextStatus: ElectricityComplaint['status'] = 'Pending';
        if (c.status === 'Pending') nextStatus = 'Routed';
        else if (c.status === 'Routed') nextStatus = 'In Progress';
        else if (c.status === 'In Progress') nextStatus = 'Resolved';
        else if (c.status === 'Resolved') nextStatus = 'Routed';

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setActivities(prevAct => [
          `[${timestamp}] Updated status of complaint ${c.id} to ${nextStatus}`,
          ...prevAct.slice(0, 5)
        ]);

        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  // Toggle quick water release valve
  const handleToggleValve = (id: string) => {
    setSchedules(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus: WaterZoneSchedule['status'] = s.status === 'Active' ? 'Completed' : 'Active';
        const nextFlow = nextStatus === 'Active' ? 40 : 0;
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setActivities(prevAct => [
          `[${timestamp}] Manually toggled ward water valve for ${s.id} to ${nextStatus}`,
          ...prevAct.slice(0, 5)
        ]);

        return {
          ...s,
          status: nextStatus,
          flowRate: nextFlow,
          lastUpdated: 'Admin Toggle'
        };
      }
      return s;
    }));
  };

  const unresolvedFaultsCount = complaints.filter(c => c.status !== 'Resolved').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-navy-dark text-slate-200">
      
      {/* HEADER BAR */}
      <div className="relative rounded-3xl overflow-hidden bg-navy-light p-6 sm:p-8 border border-accent-blue/20 shadow-xl">
        <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-accent-blue/5 rounded-full blur-[60px]" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <div className="flex items-center gap-1.5 text-accent-blue">
              <ShieldCheck className="w-4 h-4 animate-pulse" />
              <span className="text-[10px] font-bold font-mono uppercase tracking-wider">
                Gram Panchayat Central Cockpit
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Administrative Overview & Controls
            </h1>
            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              Consolidated grid dispatch boards, overhead water distribution valves, and citizen skill directories for Panchayat management.
            </p>
          </div>
          
          <div className="bg-navy-dark border border-accent-blue/15 p-4 rounded-xl shrink-0 flex items-center gap-3">
            <Activity className="w-7 h-7 text-accent-blue animate-pulse" />
            <div>
              <p className="text-[9px] uppercase font-mono tracking-wider text-slate-400">Panchayat Hub</p>
              <p className="text-sm font-bold text-white font-display">Gateway Synchronized</p>
              <p className="text-[9px] text-accent-cyan">Block BDO Link Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* CORE COUNTER MATRIX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Stat 1 */}
        <div className="bg-navy-light border border-accent-blue/15 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Active Grid Faults</p>
            <p className="text-2xl font-bold font-mono text-white mt-1">{unresolvedFaultsCount}</p>
            <p className="text-[10px] text-amber-400 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Direct routing active
            </p>
          </div>
          <Zap className="w-8 h-8 text-amber-500 opacity-20" />
        </div>

        {/* Stat 2 */}
        <div className="bg-navy-light border border-accent-blue/15 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Active Faucets</p>
            <p className="text-2xl font-bold font-mono text-white mt-1">
              {schedules.filter(s => s.status === 'Active').length}
            </p>
            <p className="text-[10px] text-accent-blue flex items-center gap-0.5">
              <Droplet className="w-3.5 h-3.5" /> Metered ward releases
            </p>
          </div>
          <Droplet className="w-8 h-8 text-accent-blue opacity-20" />
        </div>

        {/* Stat 3 */}
        <div className="bg-navy-light border border-accent-blue/15 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Placements Listed</p>
            <p className="text-2xl font-bold font-mono text-white mt-1">
              {jobs.length}
            </p>
            <p className="text-[10px] text-accent-cyan flex items-center gap-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Local labor matching
            </p>
          </div>
          <Briefcase className="w-8 h-8 text-accent-cyan opacity-20" />
        </div>

        {/* Stat 4 */}
        <div className="bg-navy-light border border-accent-blue/15 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Skill Registrations</p>
            <p className="text-2xl font-bold font-mono text-white mt-1">
              {workers.length}
            </p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> Active village craftsmen
            </p>
          </div>
          <Users className="w-8 h-8 text-emerald-400 opacity-20" />
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INTERACTIVE COMPLAINT DISPATCH CONTROLLER (60% width) */}
        <div className="lg:col-span-8 bg-navy-light border border-accent-blue/15 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="font-display font-bold text-base text-white">Grid Dispatch Workflow Monitor</h3>
            <p className="text-slate-400 text-xs mt-1">
              Admin workflow tool: Click the "Advance Workflow" button to step complaints through routing states.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-navy-dark border-b border-accent-blue/10 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Ward Area</th>
                  <th className="px-4 py-3">Issue Category</th>
                  <th className="px-4 py-3">Lineman</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-dark/60">
                {complaints.map((c) => (
                  <tr key={c.id} className="hover:bg-navy-dark/20 text-slate-300">
                    <td className="px-4 py-3.5 font-bold font-mono text-white">{c.id}</td>
                    <td className="px-4 py-3.5">{c.ward.split(' (')[0]}</td>
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-white">{c.issueType}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[150px]">{c.issueDescription}</div>
                    </td>
                    <td className="px-4 py-3.5 font-medium text-white">
                      {c.lineman ? c.lineman.name : 'Queue'}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-wider ${
                        c.status === 'Resolved' 
                          ? 'bg-emerald-950/45 text-emerald-400 border-emerald-900/30'
                          : c.status === 'In Progress'
                          ? 'bg-amber-950/45 text-amber-400 border-amber-900/30'
                          : 'bg-blue-950/45 text-accent-blue border-accent-blue/20'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => handleAdvanceStatus(c.id)}
                        className="px-2.5 py-1 rounded bg-navy-dark hover:bg-accent-blue hover:text-navy-dark text-[10px] font-bold text-accent-blue transition-all cursor-pointer"
                      >
                        Advance State
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RECENT OPERATIONAL FEED (40% width) */}
        <div className="lg:col-span-4 bg-navy-light border border-accent-blue/15 text-slate-200 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-navy-dark pb-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-white">
              Operations Audit Feed
            </h3>
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {activities.map((activity, idx) => (
              <div key={idx} className="p-3 bg-navy-dark border border-accent-blue/10 rounded-xl text-xs text-slate-300 flex items-start gap-2.5">
                <Check className="w-3.5 h-3.5 text-accent-cyan shrink-0 mt-0.5" />
                <span>{activity}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* QUICK WATER VALVE CONTROLS */}
      <div className="bg-navy-light border border-accent-blue/15 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <h3 className="font-display font-bold text-base text-white">Water Grid Emergency Valve Overrides</h3>
          <p className="text-slate-450 text-xs mt-1">
            Manually trigger and force overhead water release flow without altering existing block schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {schedules.map((s) => (
            <div key={s.id} className="p-4 bg-navy-dark border border-accent-blue/15 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-mono font-bold text-slate-500">{s.id}</span>
                  <span className={`w-2 h-2 rounded-full ${s.status === 'Active' ? 'bg-accent-cyan animate-ping' : 'bg-slate-600'}`}></span>
                </div>
                <h4 className="font-bold text-xs text-white leading-tight mb-1">
                  {s.zone.split(' (')[0]}
                </h4>
                <p className="text-[10px] text-slate-400 mt-1">Current state: <strong>{s.status}</strong></p>
                <p className="text-[10px] text-slate-400">Discharge: {s.flowRate} L/s</p>
              </div>

              <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between">
                <button
                  onClick={() => handleToggleValve(s.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    s.status === 'Active'
                      ? 'bg-rose-950/50 text-rose-400 border border-rose-900/30'
                      : 'bg-blue-950/50 text-accent-blue border border-accent-blue/20'
                  }`}
                >
                  {s.status === 'Active' ? 'Shut Valve' : 'Open Valve'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
