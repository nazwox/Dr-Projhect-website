import React from 'react';
import { Search, MapPin, ShieldCheck, Video, Stethoscope, Building, Award, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  specialties: string[];
  cities: string[];
  insurances: string[];
  selectedSpecialty: string;
  setSelectedSpecialty: (val: string) => void;
  selectedCity: string;
  setSelectedCity: (val: string) => void;
  selectedInsurance: string;
  setSelectedInsurance: (val: string) => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  onSearch: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  specialties,
  cities,
  insurances,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedCity,
  setSelectedCity,
  selectedInsurance,
  setSelectedInsurance,
  searchTerm,
  setSearchTerm,
  onSearch,
}) => {
  return (
    <div className="relative bg-gradient-to-b from-sky-50 via-slate-50 to-white pt-8 pb-14 border-b border-slate-100 overflow-hidden">
      {/* Subtle Background Pattern Orbs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" /> NMC Registered Medical Practitioners
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-xs">
            <Video className="w-3.5 h-3.5 text-emerald-600" /> NMC Telemedicine Guidelines 2020 Compliant
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200 shadow-xs">
            <Award className="w-3.5 h-3.5 text-purple-600" /> ABDM / ABHA Digital Health Card Linkable
          </span>
        </div>

        {/* Main Header Text */}
        <div className="max-w-3xl text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Quality Healthcare & Teleconsultations <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">Across India</span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Book in-person clinic visits or video teleconsultations with verified, NMC-registered doctors in Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, and Pune. Integrated with ABHA for digital health records & e-prescriptions.
          </p>
        </div>

        {/* Quick Search Filtering Box */}
        <div className="mt-8 bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-slate-200/80">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Search className="w-4 h-4 text-sky-600" />
            <span>Filter Verified Doctors by Specialization, Location & Insurance</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Doctor Name Search */}
            <div className="relative">
              <label className="block text-xs font-medium text-slate-600 mb-1">Doctor Name or Keyword</label>
              <div className="relative">
                <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. Dr. Ananya / Heart"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                />
              </div>
            </div>

            {/* Specialization Filter */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Specialization</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
              >
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Location / City Filter */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">City / Location</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Health Insurance / TPA Filter */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">TPA / Health Insurance</label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <select
                  value={selectedInsurance}
                  onChange={(e) => setSelectedInsurance(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
                >
                  {insurances.map((ins) => (
                    <option key={ins} value={ins}>
                      {ins}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Quick Filter Search CTA */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Real-time Slot Sync
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Instant SMS & WhatsApp Alerts
              </span>
            </div>

            <button
              onClick={onSearch}
              className="w-full sm:w-auto px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold text-sm shadow transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Filter Doctors</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-100 shadow-xs">
            <div className="text-2xl font-black text-sky-700">100%</div>
            <div className="text-xs text-slate-600 font-medium">NMC Verified Doctors</div>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-100 shadow-xs">
            <div className="text-2xl font-black text-emerald-700">50,000+</div>
            <div className="text-xs text-slate-600 font-medium">Patient Consultations</div>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-100 shadow-xs">
            <div className="text-2xl font-black text-blue-700">4.9 / 5</div>
            <div className="text-xs text-slate-600 font-medium">Verified Patient Rating</div>
          </div>
          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-100 shadow-xs">
            <div className="text-2xl font-black text-purple-700">Instant</div>
            <div className="text-xs text-slate-600 font-medium">e-Prescriptions & ABHA</div>
          </div>
        </div>
      </div>
    </div>
  );
};
