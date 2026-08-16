import React from 'react';
import { Phone, ShieldCheck, UserCheck, Calendar, Activity, Lock, Stethoscope } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenPortal: () => void;
  portalActive: boolean;
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenPortal,
  portalActive,
  isAdminMode,
  setIsAdminMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-100">
      {/* Top Emergency & Compliance Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white text-xs py-2 px-4 flex flex-wrap items-center justify-between gap-2 shadow-inner">
        <div className="flex items-center gap-2 font-medium mx-auto sm:mx-0">
          <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span> Emergency
          </span>
          <span>Medical Emergency? Call <strong>108 / 112</strong> immediately or visit your nearest Hospital Casualty.</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] text-red-100 font-sans">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> NMC Telemedicine Compliant (2020)
          </span>
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-blue-200" /> DPDP Act 2023 Encrypted
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight font-sans">AarogyaCare</span>
              <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-1.5 py-0.5 rounded">INDIA</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide">Ayushman Health & Teleconsult Portal</p>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a href="#doctors" className="hover:text-sky-600 transition-colors">Find Doctors</a>
          <a href="#specialties" className="hover:text-sky-600 transition-colors">Specialties</a>
          <a href="#telemedicine" className="hover:text-sky-600 transition-colors">Teleconsultation</a>
          <a href="#abha" className="hover:text-sky-600 transition-colors">ABHA Health Card</a>
          <a href="#reviews" className="hover:text-sky-600 transition-colors">Verified Reviews</a>
          <a href="#faq" className="hover:text-sky-600 transition-colors">FAQs</a>
        </nav>

        {/* Action Buttons & Portal Switchers */}
        <div className="flex items-center gap-2.5">
          {/* Admin / Doctor Toggle Switch */}
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
              isAdminMode
                ? 'bg-amber-50 text-amber-900 border-amber-300 font-semibold shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="Toggle Doctor / Clinic Admin Mode"
          >
            <Activity className="w-3.5 h-3.5 text-amber-600" />
            <span>{isAdminMode ? 'Doctor Portal Mode' : 'Doctor Portal Switch'}</span>
          </button>

          {/* Patient Portal / ABHA Button */}
          <button
            onClick={onOpenPortal}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border transition-all ${
              portalActive
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700" />
            <span className="hidden xs:inline">Patient Portal & ABHA</span>
            <span className="xs:hidden">Portal</span>
          </button>

          {/* Book Appointment CTA Button */}
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm shadow-md hover:from-sky-700 hover:to-blue-800 active:scale-95 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>
    </header>
  );
};
