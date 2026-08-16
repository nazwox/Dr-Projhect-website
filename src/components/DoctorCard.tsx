import React from 'react';
import { Doctor } from '../types';
import { Star, MapPin, ShieldCheck, Video, Building2, Languages, Clock, CalendarCheck } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
  onSelectDoctor: (doctor: Doctor) => void;
  onBookDoctor: (doctor: Doctor, visitType: 'clinic' | 'telehealth') => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onSelectDoctor,
  onBookDoctor,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group">
      <div className="p-5">
        {/* Top Header: Image, Registration & Credentials */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={doctor.image_url}
              alt={doctor.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-sky-100 shadow-sm group-hover:scale-105 transition-transform"
            />
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5 shadow-xs whitespace-nowrap">
              <ShieldCheck className="w-3 h-3" /> NMC Verified
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-100 truncate">
                {doctor.specialization}
              </span>
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-xs font-bold text-amber-700 border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{doctor.rating}</span>
                <span className="text-[10px] text-slate-400 font-normal">({doctor.reviews_count})</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mt-1 truncate hover:text-sky-600 cursor-pointer" onClick={() => onSelectDoctor(doctor)}>
              {doctor.name}
            </h3>

            <p className="text-xs text-slate-600 font-medium truncate">{doctor.degrees}</p>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1 font-mono">
              <span className="text-[10px] bg-slate-100 px-1.5 py-0.2 rounded font-semibold text-slate-700">Reg:</span>
              <span className="truncate">{doctor.registration_no} ({doctor.registration_council})</span>
            </p>
          </div>
        </div>

        {/* Doctor Stats & Location */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            <span><strong>{doctor.experience_years} Years</strong> Exp</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 truncate">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">{doctor.city}</span>
          </div>
        </div>

        {/* Languages Spoken */}
        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-600">
          <Languages className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate font-medium">{doctor.languages.join(', ')}</span>
        </div>

        {/* TPAs / Health Insurances Accepted */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <div className="flex gap-1">
            {doctor.tpa_accepted.slice(0, 3).map((tpa) => (
              <span key={tpa} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded whitespace-nowrap">
                {tpa}
              </span>
            ))}
            {doctor.tpa_accepted.length > 3 && (
              <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                +{doctor.tpa_accepted.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Consultation Fees Comparison */}
        <div className="mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-slate-500 block font-medium">In-Clinic Visit</span>
            <span className="font-extrabold text-slate-900 text-sm">₹{doctor.fees_clinic}</span>
          </div>
          <div className="h-6 w-px bg-slate-200"></div>
          <div>
            <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-semibold">
              <Video className="w-3 h-3" /> Video Consult
            </span>
            <span className="font-extrabold text-emerald-700 text-sm">₹{doctor.fees_telehealth}</span>
          </div>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onSelectDoctor(doctor)}
          className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-center"
        >
          View Profile
        </button>

        <button
          onClick={() => onBookDoctor(doctor, 'telehealth')}
          className="flex-1 py-2 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors flex items-center justify-center gap-1"
        >
          <Video className="w-3.5 h-3.5" />
          <span>Teleconsult</span>
        </button>

        <button
          onClick={() => onBookDoctor(doctor, 'clinic')}
          className="flex-1 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-xs"
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>Clinic Visit</span>
        </button>
      </div>
    </div>
  );
};
