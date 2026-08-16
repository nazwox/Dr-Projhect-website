import React from 'react';
import { ShieldCheck, Stethoscope, Lock, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white">AarogyaCare India</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Empowering 1.4 billion Indians with seamless, NMC-compliant doctor appointment scheduling, teleconsultations, and ABDM/ABHA health card integration.
            </p>
            <p className="text-[11px] text-slate-500 font-mono">GSTIN: 27AAACA12341ZN</p>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#doctors" className="hover:text-white transition-colors">Find Doctors</a></li>
              <li><a href="#telemedicine" className="hover:text-white transition-colors">Teleconsultations</a></li>
              <li><a href="#abha" className="hover:text-white transition-colors">ABHA Health Card</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Verified Reviews</a></li>
            </ul>
          </div>

          {/* Medical Compliance */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Statutory Compliance</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> NMC Telemedicine Guidelines 2020
              </li>
              <li className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-sky-400" /> Digital Personal Data Protection (DPDP) 2023
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Ayushman Bharat ABDM Compliant
              </li>
            </ul>
          </div>

          {/* Emergency & Clinic Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Emergency Contact</h4>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-center gap-2 text-rose-400 font-bold">
                <Phone className="w-4 h-4" /> Medical Hotline: 108 / 112
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" /> support@aarogyacare.in
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" /> New Delhi, Mumbai, Bengaluru, Hyderabad
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Medical Disclaimer */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-200 block mb-1">MANDATORY MEDICAL & LEGAL DISCLAIMER:</strong>
          AarogyaCare is a digital health technology platform connecting patients with NMC-registered medical practitioners across India. Online teleconsultations are not intended to replace in-person casualty or emergency room care. In case of acute medical emergencies, chest pain, major trauma, or severe shortness of breath, please immediately call 108 or visit your nearest emergency room.
        </div>

        <div className="pt-4 border-t border-slate-800 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} AarogyaCare Digital Health India. All rights reserved. Compliant with Indian Medical Council (Professional Conduct, Etiquette and Ethics) Regulations.
        </div>
      </div>
    </footer>
  );
};
