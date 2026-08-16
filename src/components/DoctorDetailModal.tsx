import React from 'react';
import { Doctor } from '../types';
import { X, Star, ShieldCheck, MapPin, Languages, Building2, Calendar, Clock, Video, CheckCircle } from 'lucide-react';

interface DoctorDetailModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBook: (doctor: Doctor, visitType: 'clinic' | 'telehealth') => void;
}

export const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({ doctor, onClose, onBook }) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full p-2 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner */}
        <div className="bg-gradient-to-r from-sky-700 to-blue-800 text-white p-6 rounded-t-2xl relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <img
              src={doctor.image_url}
              alt={doctor.name}
              className="w-28 h-28 rounded-2xl object-cover border-4 border-white/20 shadow-md shrink-0"
            />
            <div className="text-center sm:text-left flex-1">
              <span className="bg-sky-500/30 text-sky-100 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-sky-300/30">
                {doctor.specialization}
              </span>
              <h2 className="text-2xl font-bold mt-1">{doctor.name}</h2>
              <p className="text-sky-100 text-sm font-medium">{doctor.degrees}</p>
              
              <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-sky-100">
                <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Reg: {doctor.registration_no}
                </span>
                <span className="bg-white/10 px-2.5 py-1 rounded">
                  {doctor.registration_council}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Key Stats Row */}
          <div className="grid grid-cols-3 gap-3 text-center p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Experience</span>
              <span className="text-lg font-extrabold text-slate-800">{doctor.experience_years}+ Years</span>
            </div>
            <div className="border-x border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Rating</span>
              <span className="text-lg font-extrabold text-amber-600 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" /> {doctor.rating}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Location</span>
              <span className="text-sm font-extrabold text-slate-800 truncate block">{doctor.city}</span>
            </div>
          </div>

          {/* About Doctor */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">About the Specialist</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">{doctor.about}</p>
          </div>

          {/* Clinic Address & Available Slots Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-sky-50/60 rounded-xl border border-sky-100">
              <h5 className="text-xs font-bold text-sky-900 flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-4 h-4 text-sky-600" /> Clinic Location
              </h5>
              <p className="text-xs text-slate-700 leading-snug">{doctor.clinic_address}</p>
              <span className="text-[11px] text-sky-700 font-semibold mt-2 inline-block">
                Schedule: {doctor.available_days}
              </span>
            </div>

            <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <h5 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-1.5">
                <Clock className="w-4 h-4 text-emerald-600" /> Available Consultation Slots
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {doctor.available_slots.map((slot) => (
                  <span key={slot} className="text-[10px] font-semibold bg-white text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Languages & Insurance TPAs */}
          <div className="space-y-3">
            <div>
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Languages className="w-3.5 h-3.5" /> Spoken Languages
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {doctor.languages.map((lang) => (
                  <span key={lang} className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> Accepted Insurance & TPA Partners
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {doctor.tpa_accepted.map((tpa) => (
                  <span key={tpa} className="text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" /> {tpa}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onBook(doctor, 'telehealth');
              }}
              className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Video className="w-4 h-4" />
              <span>Book Teleconsultation (₹{doctor.fees_telehealth})</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onBook(doctor, 'clinic');
              }}
              className="flex-1 py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Clinic Visit (₹{doctor.fees_clinic})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
