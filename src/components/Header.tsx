import React, { useState } from 'react';
import { Menu, X, Landmark, Globe, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Header({ currentTab, setCurrentTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  const navItems = [
    { id: 'home', label: 'Home', labelHi: 'मुख्य पृष्ठ' },
    { id: 'electricity', label: 'Electricity Services', labelHi: 'बिजली सेवा' },
    { id: 'water', label: 'Water Management', labelHi: 'जल प्रबंधन' },
    { id: 'crop', label: 'Crop Stress Prediction', labelHi: 'फसल तनाव पूर्वानुमान' },
    { id: 'employment', label: 'Employment Hub', labelHi: 'रोजगार हब' },
    { id: 'admin', label: 'Admin Dashboard', labelHi: 'प्रशासक पैनल' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-navy-light/95 backdrop-blur-md border-b border-accent-blue/20 text-white shadow-lg shadow-navy-dark/40">
      {/* Top micro-bar for Government branding */}
      <div className="bg-navy-dark border-b border-navy-light py-1.5 px-4 text-xs font-sans tracking-wide">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-accent-blue">
            <Landmark className="w-3.5 h-3.5" />
            <span className="font-semibold uppercase text-[10px] sm:text-xs">
              {lang === 'EN' 
                ? 'Ministry of Rural Development & Panchayat Raj • Digital Village Initiative' 
                : 'ग्रामीण विकास और पंचायती राज मंत्रालय • डिजिटल ग्राम पहल'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <button 
              onClick={() => setLang(l => l === 'EN' ? 'HI' : 'EN')}
              className="flex items-center gap-1 text-[11px] font-medium bg-navy-light hover:bg-navy-dark px-2 py-0.5 rounded border border-accent-blue/30 text-accent-blue hover:text-accent-cyan transition-colors cursor-pointer"
            >
              <Globe className="w-3 h-3" />
              <span>{lang === 'EN' ? 'हिंदी' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo Brand area */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
            <div className="bg-gradient-to-br from-accent-blue to-cyan-500 p-2.5 rounded-xl shadow-md border border-accent-blue/20 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-navy-dark" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold font-display tracking-tight bg-gradient-to-r from-white via-slate-100 to-accent-blue bg-clip-text text-transparent">
                  GramSeva
                </span>
                <span className="text-xl font-light font-display text-accent-blue">Connect</span>
              </div>
              <p className="text-[10px] text-accent-blue/70 font-mono tracking-wider -mt-0.5 uppercase">
                {lang === 'EN' ? 'Smart Rural e-Governance' : 'स्मार्ट ग्राम ई-गवर्नेंस'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30 shadow-[0_0_15px_rgba(56,189,248,0.1)]'
                      : 'text-slate-300 hover:text-white hover:bg-navy-dark border border-transparent'
                  }`}
                >
                  {lang === 'EN' ? item.label : item.labelHi}
                </button>
              );
            })}
          </nav>

          {/* District badge */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xs bg-navy-dark text-accent-blue border border-accent-blue/30 px-3 py-1 rounded-lg font-mono">
              {lang === 'EN' ? 'DISTRICT: SEHORE' : 'जिला: सीहोर'}
            </span>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-dark focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-navy-dark bg-navy-light divide-y divide-navy-dark px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors block cursor-pointer ${
                  isActive
                    ? 'bg-accent-blue/20 text-accent-blue border-l-4 border-accent-blue pl-3'
                    : 'text-slate-300 hover:text-white hover:bg-navy-dark'
                }`}
              >
                {lang === 'EN' ? item.label : item.labelHi}
              </button>
            );
          })}
          <div className="pt-4 pb-2 px-4 flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Panchayat Hub</span>
              <span className="text-xs bg-navy-dark text-accent-blue border border-accent-blue/30 px-2 py-0.5 rounded font-mono">
                {lang === 'EN' ? 'DISTRICT: SEHORE' : 'जिला: सीहोर'}
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
