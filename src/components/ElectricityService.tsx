import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  User, 
  MapPin, 
  AlertTriangle, 
  Phone, 
  Star, 
  CheckCircle2, 
  Clock, 
  Search,
  Activity,
  UserCheck,
  Check,
  AlertCircle
} from 'lucide-react';
import { 
  ElectricityComplaint, 
  Wards, 
  LinemenData, 
  Lineman 
} from '../types';

interface ElectricityProps {
  complaints: ElectricityComplaint[];
  setComplaints: React.Dispatch<React.SetStateAction<ElectricityComplaint[]>>;
}

export default function ElectricityService({ complaints, setComplaints }: ElectricityProps) {
  // Form State
  const [citizenName, setCitizenName] = useState('');
  const [selectedWard, setSelectedWard] = useState(Wards[0]);
  const [issueType, setIssueType] = useState('Power Outage');
  const [description, setDescription] = useState('');
  
  // Search / filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Success routing popup state
  const [recentRoute, setRecentRoute] = useState<{
    complaintId: string;
    lineman: Lineman;
    ward: string;
    issue: string;
  } | null>(null);

  // Selected complaint details for the workflow visualizer
  const [selectedComplaintId, setSelectedComplaintId] = useState<string>(
    complaints.length > 0 ? complaints[0].id : ''
  );

  const selectedComplaint = complaints.find(c => c.id === selectedComplaintId);

  const issueTypes = [
    'Power Outage (Whole Area)',
    'Transformer Sparking / Blast',
    'Streetlight Malfunction',
    'Low Voltage Issue',
    'Fallen Pole / Live Wire on Ground',
    'Meter Malfunction / Sparking',
    'Billing Discrepancy'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!citizenName.trim() || !description.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    const assignedLineman = LinemenData[selectedWard] || null;
    const newComplaintId = `COMP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newComplaint: ElectricityComplaint = {
      id: newComplaintId,
      ward: selectedWard,
      issueType: issueType,
      issueDescription: description,
      status: 'Routed',
      lineman: assignedLineman,
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }) + ' ' + new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      citizenName: citizenName
    };

    setComplaints([newComplaint, ...complaints]);
    setSelectedComplaintId(newComplaintId);

    // Show dynamic lineman routing success
    if (assignedLineman) {
      setRecentRoute({
        complaintId: newComplaintId,
        lineman: assignedLineman,
        ward: selectedWard,
        issue: issueType
      });
    }

    // Reset Form
    setCitizenName('');
    setDescription('');
    setIssueType(issueTypes[0]);
  };

  // Helper to get status colors
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-950/40 text-amber-400 border-amber-900/30';
      case 'Routed':
        return 'bg-blue-950/40 text-blue-400 border-blue-900/30';
      case 'In Progress':
        return 'bg-purple-950/40 text-purple-400 border-purple-900/30';
      case 'Resolved':
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-900/30';
      default:
        return 'bg-navy-dark text-slate-400';
    }
  };

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = 
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.issueType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ward.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'All' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-navy-dark text-slate-200">
      
      {/* HEADER BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-navy-light p-6 sm:p-8 border border-accent-blue/20 shadow-xl">
        <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-accent-blue/5 rounded-full blur-[60px]" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <span className="text-[10px] font-bold font-mono uppercase bg-accent-blue/10 text-accent-blue px-3 py-1 rounded-full border border-accent-blue/20">
              Panchayat Electrical Utility
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Electricity Grid Helpdesk
            </h1>
            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              Log outages, faulty transformers, or streetlights. Complaints are automatically routed to appointed ward technicians with live dispatch transparency.
            </p>
          </div>
          <div className="bg-navy-dark p-4 rounded-xl border border-accent-blue/20 shrink-0">
            <p className="text-[9px] uppercase font-mono tracking-wider text-accent-blue">Panchayat Grid Status</p>
            <p className="text-lg font-bold font-display text-white mt-0.5">Stable Line (220V)</p>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-accent-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
              Grid Linemen Active Duty
            </div>
          </div>
        </div>
      </div>

      {/* RURAL INFRASTRUCTURE IMAGE & KEY STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Photo with alternating visual text block */}
        <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-accent-blue/15 shadow-lg relative min-h-[180px]">
          <img 
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200" 
            alt="Power grid line poles" 
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 space-y-1">
            <h3 className="text-sm font-bold text-white font-display">Secure Energy Dispatches</h3>
            <p className="text-[11px] text-slate-300 max-w-md">
              Real-time mapping prevents middleman intervention and ensures technicians arrive within hours of submission.
            </p>
          </div>
        </div>

        {/* Right Side: Simple Metrics Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {[
            { label: "Active Faults", count: complaints.filter(c => c.status !== 'Resolved').length, border: "border-amber-500/20 text-amber-400 bg-amber-500/5" },
            { label: "Successfully Routed", count: complaints.filter(c => c.status === 'Routed').length, border: "border-accent-blue/20 text-accent-blue bg-accent-blue/5" },
            { label: "Under Repair", count: complaints.filter(c => c.status === 'In Progress').length, border: "border-purple-500/20 text-purple-400 bg-purple-500/5" },
            { label: "Resolved", count: complaints.filter(c => c.status === 'Resolved').length, border: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5" }
          ].map((m, i) => (
            <div key={i} className={`p-4 rounded-xl border ${m.border} flex flex-col justify-between`}>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{m.label}</span>
              <span className="text-2xl font-bold font-mono mt-1">{m.count}</span>
            </div>
          ))}
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COMPLAINT SUBMISSION FORM (45% width) */}
        <div className="lg:col-span-5 bg-navy-light border border-accent-blue/15 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-accent-blue" />
            <h2 className="text-base font-bold font-display text-white">
              File Grid Grievance
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Citizen Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ram Charan Patel"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-navy-dark rounded-xl border border-accent-blue/20 focus:outline-none focus:border-accent-blue text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Ward Number
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-navy-dark rounded-xl border border-accent-blue/20 focus:outline-none focus:border-accent-blue text-white appearance-none"
                >
                  {Wards.map((ward) => (
                    <option key={ward} value={ward}>
                      {ward}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Issue Category
              </label>
              <div className="relative">
                <AlertTriangle className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-navy-dark rounded-xl border border-accent-blue/20 focus:outline-none focus:border-accent-blue text-white appearance-none"
                >
                  {issueTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Describe the Issue
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe details e.g. Sparking near ward 3 school pole..."
                className="w-full p-3 text-xs bg-navy-dark rounded-xl border border-accent-blue/20 focus:outline-none focus:border-accent-blue text-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-semibold bg-accent-blue hover:bg-accent-cyan text-navy-dark text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              Submit & Route Complaint
            </button>
          </form>
        </div>

        {/* WORKFLOW TRACKER VISUALIZATION & LINEMAN DETAILED BOARD */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-navy-light text-slate-100 rounded-2xl p-6 border border-accent-blue/15 shadow-sm">
            <h3 className="text-xs font-semibold tracking-wider font-mono text-accent-blue uppercase mb-4">
              Complaint Status Visualizer
            </h3>

            {selectedComplaint ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-navy-dark pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold font-mono text-white">{selectedComplaint.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase border ${getStatusBadge(selectedComplaint.status)}`}>
                        {selectedComplaint.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{selectedComplaint.ward} • Reported by {selectedComplaint.citizenName}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono bg-navy-dark px-2 py-0.5 rounded">
                    {selectedComplaint.submittedAt.split(' ')[0]}
                  </span>
                </div>

                {/* Vertical visual timeline list */}
                <div className="space-y-3.5 text-xs">
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Grievance Registered</h4>
                      <p className="text-[10px] text-slate-400">Parsed by automated e-portal router successfully.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                      ['Routed', 'In Progress', 'Resolved'].includes(selectedComplaint.status)
                        ? 'bg-emerald-950/50 text-emerald-400 border-emerald-900/30'
                        : 'bg-navy-dark text-slate-500 border-accent-blue/10'
                    }`}>
                      {['Routed', 'In Progress', 'Resolved'].includes(selectedComplaint.status) ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Lineman Dispatched</h4>
                      <p className="text-[10px] text-slate-400">
                        {selectedComplaint.lineman ? `Assigned to ${selectedComplaint.lineman.name}.` : 'Routing process in queue.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                      ['In Progress', 'Resolved'].includes(selectedComplaint.status)
                        ? 'bg-purple-950/50 text-purple-400 border-purple-900/30'
                        : 'bg-navy-dark text-slate-500 border-accent-blue/10'
                    }`}>
                      {['In Progress', 'Resolved'].includes(selectedComplaint.status) ? <Activity className="w-3 h-3 animate-pulse" /> : <Clock className="w-3 h-3" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">On-Site Technical Diagnostics</h4>
                      <p className="text-[10px] text-slate-400">Technician is resolving the physical line fault.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                      selectedComplaint.status === 'Resolved'
                        ? 'bg-emerald-950/50 text-emerald-400 border-emerald-900/30'
                        : 'bg-navy-dark text-slate-500 border-accent-blue/10'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Resolved & Closed</h4>
                      <p className="text-[10px] text-slate-400">Work order certified complete by ward engineer.</p>
                    </div>
                  </div>
                </div>

                {/* Lineman Contact details */}
                {selectedComplaint.lineman && (
                  <div className="p-3 rounded-xl bg-navy-dark border border-accent-blue/15 flex justify-between items-center text-xs mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent-blue text-navy-dark font-bold flex items-center justify-center">
                        {selectedComplaint.lineman.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-white">{selectedComplaint.lineman.name}</span>
                          <span className="flex items-center text-accent-cyan text-[10px]">
                            <Star className="w-2.5 h-2.5 fill-accent-cyan mr-0.5" />
                            {selectedComplaint.lineman.rating}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400">Assigned Lineman</p>
                      </div>
                    </div>
                    <a 
                      href={`tel:${selectedComplaint.lineman.phone}`} 
                      className="flex items-center gap-1 bg-accent-blue/15 hover:bg-accent-blue/25 px-2.5 py-1 rounded text-[11px] text-accent-blue transition-colors cursor-pointer"
                    >
                      <Phone className="w-3 h-3" /> Call Technician
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500">
                <AlertCircle className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                Select a complaint from the registry below to track live dispatches.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* COMPLAINT REGISTRY TABLE */}
      <div className="bg-navy-light border border-accent-blue/15 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-navy-dark/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold font-display text-white">Panchayat Grievance Registry</h3>
            <p className="text-xs text-slate-400 mt-0.5">Database of reported power concerns and dispatch status.</p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search location or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-48 pl-8 pr-3 py-1.5 text-xs bg-navy-dark rounded-lg border border-accent-blue/20 focus:outline-none focus:border-accent-blue text-white"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2 py-1.5 text-xs bg-navy-dark rounded-lg border border-accent-blue/20 text-slate-300 focus:outline-none"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Routed">Routed</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs text-slate-300">
            <thead>
              <tr className="bg-navy-dark/40 border-b border-navy-dark/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Citizen</th>
                <th className="px-5 py-3">Ward Location</th>
                <th className="px-5 py-3">Issue Category</th>
                <th className="px-5 py-3">Assigned Lineman</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-dark/30">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((c) => (
                  <tr 
                    key={c.id} 
                    onClick={() => setSelectedComplaintId(c.id)}
                    className={`hover:bg-navy-dark/20 transition-colors cursor-pointer ${
                      selectedComplaintId === c.id ? 'bg-accent-blue/5 font-semibold' : ''
                    }`}
                  >
                    <td className="px-5 py-3 font-mono font-bold text-white">{c.id}</td>
                    <td className="px-5 py-3">{c.citizenName}</td>
                    <td className="px-5 py-3">{c.ward.split(' (')[0]}</td>
                    <td className="px-5 py-3">
                      <div className="font-semibold text-white">{c.issueType}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[150px]">{c.issueDescription}</div>
                    </td>
                    <td className="px-5 py-3">
                      {c.lineman ? (
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-navy-dark text-[9px] font-bold flex items-center justify-center border border-accent-blue/15 text-accent-blue">
                            {c.lineman.avatar}
                          </div>
                          <span>{c.lineman.name}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500">Unassigned</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase border ${getStatusBadge(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedComplaintId(c.id);
                        }}
                        className="text-accent-blue hover:text-accent-cyan hover:underline text-[11px]"
                      >
                        Track
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-slate-500">
                    No matching complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* POPUP CONFIRMATION */}
      <AnimatePresence>
        {recentRoute && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-navy-light border border-accent-blue/30 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-white space-y-4"
            >
              <div className="flex items-center gap-3 text-accent-blue">
                <UserCheck className="w-5 h-5 text-accent-cyan animate-bounce" />
                <div>
                  <h3 className="font-bold text-sm font-display">Grievance Smart-Routed</h3>
                  <p className="text-[10px] text-slate-400 font-mono">{recentRoute.complaintId}</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Matched successfully with ward technician <strong>{recentRoute.lineman.name}</strong>. SMS dispatch confirmation triggered.
              </p>

              <div className="p-3 rounded-lg bg-navy-dark border border-accent-blue/10 flex justify-between items-center text-xs">
                <span>Lineman Phone:</span>
                <span className="font-bold text-accent-blue">{recentRoute.lineman.phone}</span>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setRecentRoute(null)}
                  className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-accent-blue hover:bg-accent-cyan text-navy-dark transition-colors cursor-pointer"
                >
                  OK, Track Status
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
