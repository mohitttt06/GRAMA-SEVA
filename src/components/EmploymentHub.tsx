import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  UserCheck, 
  Plus, 
  Search, 
  MapPin, 
  Phone, 
  Award, 
  Check, 
  X,
  Users,
  Building,
  Sparkles
} from 'lucide-react';
import { WorkerProfile, JobOpportunity, Wards } from '../types';

interface EmploymentProps {
  workers: WorkerProfile[];
  setWorkers: React.Dispatch<React.SetStateAction<WorkerProfile[]>>;
  jobs: JobOpportunity[];
  setJobs: React.Dispatch<React.SetStateAction<JobOpportunity[]>>;
}

const WORKFORCE_HERO = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200";

// Standard realistic worker avatars
const AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
];

export default function EmploymentHub({ workers, setWorkers, jobs, setJobs }: EmploymentProps) {
  const [activeSubTab, setActiveSubTab] = useState<'listings' | 'register' | 'post-job'>('listings');

  // Match tracker selections
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>(workers[0]?.id || '');
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || '');

  // Form states: Worker Registration
  const [workName, setWorkName] = useState('');
  const [workGender, setWorkGender] = useState('Male');
  const [workAge, setWorkAge] = useState(26);
  const [workWard, setWorkWard] = useState(Wards[0]);
  const [workExperience, setWorkExperience] = useState('');
  const [workPhone, setWorkPhone] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Form states: Job Opportunity Posting
  const [jobTitle, setJobTitle] = useState('');
  const [jobEmployer, setJobEmployer] = useState('');
  const [jobWard, setJobWard] = useState(Wards[0]);
  const [jobWage, setJobWage] = useState('₹450 / Day');
  const [jobType, setJobType] = useState<JobOpportunity['type']>('Daily Wage');
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);

  const skillPool = [
    'Masonry', 'Plumbing', 'Carpentry', 'Concrete Mixing', 
    'Drip Irrigation Setup', 'Tractor Driving', 'Tailoring', 
    'Organic Composting', 'Electrician', 'Fruit Processing'
  ];

  const handleRegisterWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workName.trim() || !workPhone.trim() || selectedSkills.length === 0) {
      alert('Please enter your Name, Phone, and choose at least one skill.');
      return;
    }

    const newWorker: WorkerProfile = {
      id: `WORK-${Math.floor(100 + Math.random() * 900)}`,
      name: workName,
      gender: workGender,
      age: Number(workAge),
      ward: workWard,
      skills: selectedSkills,
      experience: workExperience || 'Skilled local labor',
      phone: workPhone,
      registeredAt: new Date().toISOString().split('T')[0]
    };

    setWorkers([newWorker, ...workers]);
    setSelectedWorkerId(newWorker.id);
    
    // Reset Form
    setWorkName('');
    setWorkPhone('');
    setWorkExperience('');
    setSelectedSkills([]);
    setActiveSubTab('listings');
    alert('Skill Profile Registered in Panchayat Directory!');
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim() || !jobEmployer.trim() || requiredSkills.length === 0) {
      alert('Please fill out Job Title, Employer, and choose required skills.');
      return;
    }

    const newJob: JobOpportunity = {
      id: `JOB-${Math.floor(200 + Math.random() * 800)}`,
      title: jobTitle,
      employer: jobEmployer,
      ward: jobWard,
      skillsRequired: requiredSkills,
      wage: jobWage,
      type: jobType,
      status: 'Open',
      postedAt: new Date().toISOString().split('T')[0]
    };

    setJobs([newJob, ...jobs]);
    setSelectedJobId(newJob.id);

    setJobTitle('');
    setJobEmployer('');
    setRequiredSkills([]);
    setActiveSubTab('listings');
    alert('Panchayat Employment Opportunity published!');
  };

  const handleToggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleToggleReqSkill = (skill: string) => {
    setRequiredSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const getMatchScore = (worker: WorkerProfile, job: JobOpportunity) => {
    const required = job.skillsRequired;
    const skills = worker.skills;
    const intersection = required.filter(skill => skills.includes(skill));
    if (required.length === 0) return 0;
    return Math.round((intersection.length / required.length) * 100);
  };

  const currentSelectedWorker = workers.find(w => w.id === selectedWorkerId);
  const currentSelectedJob = jobs.find(j => j.id === selectedJobId);

  const matchedJobsForWorker = currentSelectedWorker
    ? jobs.map(j => ({ ...j, score: getMatchScore(currentSelectedWorker, j) }))
          .filter(j => j.score > 0)
          .sort((a, b) => b.score - a.score)
    : [];

  // Match random AVATAR index based on worker id hash
  const getAvatarUrl = (id: string, index: number) => {
    const code = id.charCodeAt(id.length - 1) || 0;
    return AVATARS[(code + index) % AVATARS.length];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-navy-dark text-slate-200">
      
      {/* HEADER BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-navy-light p-6 sm:p-8 border border-accent-blue/20 shadow-xl">
        <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-accent-blue/5 rounded-full blur-[60px]" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <span className="text-[10px] font-bold font-mono uppercase bg-accent-blue/10 text-accent-blue px-3 py-1 rounded-full border border-accent-blue/20">
              Panchayat Skill Registry
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Livelihood & Skill Matching
            </h1>
            <p className="text-slate-300 text-xs leading-relaxed font-sans">
              Connect certified village plumbers, brickmasons, and craftspeople directly with local projects without intermediaries.
            </p>
          </div>
          
          <div className="flex gap-2 self-start md:self-center shrink-0">
            <button
              onClick={() => setActiveSubTab('register')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-accent-blue text-navy-dark hover:bg-accent-cyan transition-all font-display cursor-pointer"
            >
              Register Skill Profile
            </button>
            <button
              onClick={() => setActiveSubTab('post-job')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-navy-dark text-accent-blue border border-accent-blue/25 hover:bg-navy-light transition-all font-display cursor-pointer"
            >
              Post Work Opportunity
            </button>
          </div>
        </div>
      </div>

      {/* WORKFORCE IMAGERY HERO */}
      <div className="rounded-2xl overflow-hidden border border-accent-blue/15 shadow-md relative min-h-[140px]">
        <img 
          src={WORKFORCE_HERO} 
          alt="Local Infrastructure construction" 
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 via-navy-dark/45 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 space-y-1">
          <h3 className="text-sm font-bold text-white font-display">Decentralized Livelihood Matching</h3>
          <p className="text-[11px] text-slate-300 max-w-lg">
            Empowering village workers by matching active infrastructure works, water pipeline excavations, and private agricultural requirements.
          </p>
        </div>
      </div>

      {/* SIMPLE STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Registered Craftspeople", count: workers.length, icon: Users, color: "text-accent-blue" },
          { label: "Active Opportunities", count: jobs.filter(j => j.status === 'Open').length, icon: Briefcase, color: "text-accent-cyan" },
          { label: "Livelihood Placement Rate", count: "92%", icon: Award, color: "text-emerald-400" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-navy-light p-5 rounded-2xl border border-accent-blue/15 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold mt-1 text-white font-mono">{stat.count}</p>
            </div>
            <stat.icon className={`w-8 h-8 opacity-20 ${stat.color}`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INTERACTIVE COLUMN SWITCHER (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="flex border-b border-accent-blue/15">
            <button
              onClick={() => setActiveSubTab('listings')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 px-4 transition-all cursor-pointer ${
                activeSubTab === 'listings'
                  ? 'border-accent-blue text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              Directory Registry
            </button>
            <button
              onClick={() => setActiveSubTab('register')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 px-4 transition-all cursor-pointer ${
                activeSubTab === 'register'
                  ? 'border-accent-blue text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              Add Skill Profile
            </button>
            <button
              onClick={() => setActiveSubTab('post-job')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 px-4 transition-all cursor-pointer ${
                activeSubTab === 'post-job'
                  ? 'border-accent-blue text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              List Job Opportunity
            </button>
          </div>

          <AnimatePresence mode="wait">
            
            {/* 1. DIRECTORY LISTINGS */}
            {activeSubTab === 'listings' && (
              <motion.div 
                key="listings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Workers column */}
                <div className="bg-navy-light border border-accent-blue/15 rounded-2xl p-5 space-y-4 shadow-sm">
                  <div className="flex justify-between items-center border-b border-navy-dark pb-3">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-accent-blue" />
                      Village Skill Pool ({workers.length})
                    </h3>
                  </div>

                  <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                    {workers.map((worker, i) => (
                      <div
                        key={worker.id}
                        onClick={() => setSelectedWorkerId(worker.id)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                          selectedWorkerId === worker.id
                            ? 'border-accent-blue bg-accent-blue/10'
                            : 'border-accent-blue/10 hover:bg-navy-dark/40'
                        }`}
                      >
                        {/* High Quality Worker Avatar */}
                        <img 
                          src={getAvatarUrl(worker.id, i)} 
                          alt={worker.name} 
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover border border-accent-blue/30 shrink-0" 
                        />

                        <div className="space-y-1 min-w-0">
                          <h4 className="font-bold text-xs text-white flex items-center gap-1.5 truncate">
                            {worker.name}
                            <span className="text-[9px] bg-navy-dark text-slate-400 px-1.5 py-0.5 rounded shrink-0">
                              {worker.age} Yrs • {worker.gender[0]}
                            </span>
                          </h4>
                          <p className="text-[10px] text-slate-400 truncate">{worker.ward.split(' (')[0]}</p>
                          
                          <div className="flex flex-wrap gap-1 pt-1">
                            {worker.skills.map((s, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-navy-dark text-accent-blue border border-accent-blue/10">
                                {s}
                              </span>
                            ))}
                          </div>
                          <p className="text-[9px] text-slate-400 italic pt-1 truncate">Exp: {worker.experience}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Jobs Opportunity Column */}
                <div className="bg-navy-light border border-accent-blue/15 rounded-2xl p-5 space-y-4 shadow-sm">
                  <div className="flex justify-between items-center border-b border-navy-dark pb-3">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-accent-cyan" />
                      Active Livelihood Postings ({jobs.length})
                    </h3>
                  </div>

                  <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        onClick={() => setSelectedJobId(job.id)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedJobId === job.id
                            ? 'border-accent-cyan bg-accent-blue/10'
                            : 'border-accent-blue/10 hover:bg-navy-dark/40'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[8px] bg-navy-dark text-accent-cyan border border-accent-blue/10 px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                            {job.type}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">{job.id}</span>
                        </div>

                        <h4 className="font-bold text-xs text-white leading-tight mb-1">{job.title}</h4>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-accent-blue" />
                          {job.employer}
                        </p>

                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {job.skillsRequired.map((s, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded text-[8px] bg-navy-dark text-slate-300">
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="mt-3 pt-3 border-t border-navy-dark/50 flex justify-between items-center text-[10px]">
                          <span className="font-bold text-accent-cyan text-sm">{job.wage}</span>
                          <span className="text-slate-400">{job.ward.split(' (')[0]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* 2. REGISTER SKILL PROFILE */}
            {activeSubTab === 'register' && (
              <motion.form 
                key="register"
                onSubmit={handleRegisterWorker}
                className="bg-navy-light border border-accent-blue/15 rounded-2xl p-6 space-y-4 max-w-xl mx-auto shadow-md"
              >
                <div className="flex items-center gap-2 border-b border-navy-dark pb-3 mb-2">
                  <UserCheck className="w-4 h-4 text-accent-blue" />
                  <div>
                    <h3 className="font-bold text-white text-sm">Register Craftsperson</h3>
                    <p className="text-[11px] text-slate-400">Add profile to get matched with active Panchayat jobs.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-450 mb-1">Full Name</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={workName}
                      onChange={(e) => setWorkName(e.target.value)}
                      className="w-full text-xs p-2.5 bg-navy-dark border border-accent-blue/15 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-450 mb-1">Phone Number</label>
                    <input 
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={workPhone}
                      onChange={(e) => setWorkPhone(e.target.value)}
                      className="w-full text-xs p-2.5 bg-navy-dark border border-accent-blue/15 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-450 mb-1">Gender</label>
                    <select 
                      value={workGender}
                      onChange={(e) => setWorkGender(e.target.value)}
                      className="w-full text-xs p-2.5 bg-navy-dark border border-accent-blue/15 rounded-lg text-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-450 mb-1">Age</label>
                    <input 
                      type="number"
                      min={18}
                      max={65}
                      value={workAge}
                      onChange={(e) => setWorkAge(Number(e.target.value))}
                      className="w-full text-xs p-2.5 bg-navy-dark border border-accent-blue/15 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-450 mb-1">Ward Area</label>
                    <select 
                      value={workWard}
                      onChange={(e) => setWorkWard(e.target.value)}
                      className="w-full text-xs p-2.5 bg-navy-dark border border-accent-blue/15 rounded-lg text-white"
                    >
                      {Wards.map(w => (
                        <option key={w} value={w}>{w.split(' (')[0]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-450 mb-1">Brief Experience Description</label>
                  <textarea 
                    rows={2}
                    placeholder="Provide details about previous construction, plumbing, or tailoring work..."
                    value={workExperience}
                    onChange={(e) => setWorkExperience(e.target.value)}
                    className="w-full text-xs p-2.5 bg-navy-dark border border-accent-blue/15 rounded-lg text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-450 mb-1.5">Select Primary Skills</label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 bg-navy-dark border border-accent-blue/15 rounded-lg">
                    {skillPool.map((skill) => {
                      const isChecked = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleToggleSkill(skill)}
                          className={`p-2 rounded-lg text-left text-[11px] font-medium transition-all flex items-center justify-between ${
                            isChecked
                              ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30'
                              : 'bg-navy-light border border-accent-blue/5 text-slate-400'
                          }`}
                        >
                          <span>{skill}</span>
                          {isChecked && <Check className="w-3 h-3" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg font-bold text-xs bg-accent-blue hover:bg-accent-cyan text-navy-dark transition-all cursor-pointer"
                >
                  Confirm Registration
                </button>
              </motion.form>
            )}

            {/* 3. POST OPPORTUNITY */}
            {activeSubTab === 'post-job' && (
              <motion.form 
                key="post-job"
                onSubmit={handlePostJob}
                className="bg-navy-light border border-accent-blue/15 rounded-2xl p-6 space-y-4 max-w-xl mx-auto shadow-md"
              >
                <div className="flex items-center gap-2 border-b border-navy-dark pb-3 mb-2">
                  <Building className="w-4 h-4 text-accent-cyan" />
                  <div>
                    <h3 className="font-bold text-white text-sm">Post Work Opportunity</h3>
                    <p className="text-[11px] text-slate-400">Post new agricultural or block tasks to get automatic skilled matches.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-450 mb-1">Opportunity Title</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Community Well Masonry"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full text-xs p-2.5 bg-navy-dark border border-accent-blue/15 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-450 mb-1">Employer / Dept</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Public Works Dept"
                      value={jobEmployer}
                      onChange={(e) => setJobEmployer(e.target.value)}
                      className="w-full text-xs p-2.5 bg-navy-dark border border-accent-blue/15 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-450 mb-1">Daily Wage / Rate</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. ₹450 / Day"
                      value={jobWage}
                      onChange={(e) => setJobWage(e.target.value)}
                      className="w-full text-xs p-2.5 bg-navy-dark border border-accent-blue/15 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-450 mb-1">Employment Type</label>
                    <select 
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-navy-dark border border-accent-blue/15 rounded-lg text-white"
                    >
                      <option value="Daily Wage">Daily Wage</option>
                      <option value="Short Term">Short Term</option>
                      <option value="Seasonal">Seasonal</option>
                      <option value="Full-time">Full-time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-450 mb-1">Ward Location</label>
                    <select 
                      value={jobWard}
                      onChange={(e) => setJobWard(e.target.value)}
                      className="w-full text-xs p-2.5 bg-navy-dark border border-accent-blue/15 rounded-lg text-white"
                    >
                      {Wards.map(w => (
                        <option key={w} value={w}>{w.split(' (')[0]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-450 mb-1.5">Required Skills</label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 bg-navy-dark border border-accent-blue/15 rounded-lg">
                    {skillPool.map((skill) => {
                      const isChecked = requiredSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleToggleReqSkill(skill)}
                          className={`p-2 rounded-lg text-left text-[11px] font-medium transition-all flex items-center justify-between ${
                            isChecked
                              ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30'
                              : 'bg-navy-light border border-accent-blue/5 text-slate-400'
                          }`}
                        >
                          <span>{skill}</span>
                          {isChecked && <Check className="w-3 h-3" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg font-bold text-xs bg-accent-cyan hover:bg-accent-blue hover:text-white text-navy-dark transition-all cursor-pointer"
                >
                  Publish Opportunity
                </button>
              </motion.form>
            )}

          </AnimatePresence>

        </div>

        {/* MATCHING COMPONENT SIDE PANEL (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-slate-950 text-white border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-1.5 border-b border-slate-850 pb-3 mb-4">
              <Sparkles className="w-4 h-4 text-accent-cyan animate-pulse" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-white">Smart Match Intelligence</h3>
            </div>

            {currentSelectedWorker ? (
              <div className="space-y-4 text-left">
                <div className="p-3 bg-navy-dark border border-accent-blue/10 rounded-xl">
                  <p className="text-[9px] uppercase font-mono tracking-wider text-accent-cyan">Active Worker Candidate</p>
                  <h4 className="font-bold text-xs text-white mt-1">{currentSelectedWorker.name}</h4>
                  <p className="text-[9px] text-slate-400 mt-0.5">{currentSelectedWorker.skills.join(', ')}</p>
                </div>

                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {matchedJobsForWorker.length > 0 ? (
                    matchedJobsForWorker.map((mj) => (
                      <div key={mj.id} className="p-3 rounded-xl bg-navy-dark border border-accent-blue/10 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[8px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold">
                              {mj.score}% SKILL MATCH
                            </span>
                            <h5 className="font-bold text-xs text-white mt-1.5">{mj.title}</h5>
                            <p className="text-[9px] text-slate-400">{mj.employer}</p>
                          </div>
                          <span className="text-xs font-bold font-mono text-accent-cyan">{mj.wage}</span>
                        </div>

                        {/* Match Progress circle */}
                        <div className="w-full bg-navy-light h-1 rounded-full overflow-hidden mt-3">
                          <div className="bg-accent-cyan h-full" style={{ width: `${mj.score}%` }} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-slate-500">
                      No matching jobs currently match this worker's skills.
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-850 text-center">
                  <a 
                    href={`tel:${currentSelectedWorker.phone}`}
                    className="inline-flex items-center gap-1.5 text-xs text-accent-blue font-semibold hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Citizen: {currentSelectedWorker.phone}
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs">
                Select a worker in the registry to evaluate matches.
              </div>
            )}
          </div>

          {/* Skill supply demand stats */}
          <div className="bg-navy-light border border-accent-blue/15 rounded-2xl p-5 space-y-4 shadow-sm">
            <h4 className="font-bold text-xs text-white uppercase font-mono tracking-wider border-b border-navy-dark pb-2">
              Skill Supply vs Local Demand
            </h4>

            <div className="space-y-3 text-xs">
              {[
                { name: "Masonry & Concrete", demand: 85, workersCount: 4, jobsCount: 3 },
                { name: "Electrician / Wiring", demand: 70, workersCount: 2, jobsCount: 2 },
                { name: "Drip Irrigation Setup", demand: 60, workersCount: 3, jobsCount: 2 }
              ].map((skill, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-305">
                    <span>{skill.name}</span>
                    <span className="font-mono text-slate-400">{skill.demand}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-navy-dark h-1.5 rounded-full overflow-hidden">
                      <div className="bg-accent-blue h-full" style={{ width: `${skill.demand}%` }} />
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono shrink-0">
                      {skill.workersCount}W / {skill.jobsCount}J
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
