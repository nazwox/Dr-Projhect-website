import React, { useState } from 'react';
import { Appointment } from '../types';
import { X, Mic, MicOff, Video, VideoOff, FileText, Send, CheckCircle2, ShieldCheck, Stethoscope } from 'lucide-react';

interface TeleconsultRoomProps {
  appointment: Appointment;
  onClose: () => void;
}

export const TeleconsultRoom: React.FC<TeleconsultRoomProps> = ({ appointment, onClose }) => {
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [doctorNotes, setDoctorNotes] = useState('');
  const [rxSent, setRxSent] = useState(false);

  const handleIssueRx = async () => {
    try {
      const payload = {
        appointment_id: appointment.id,
        patient_name: appointment.patient_name,
        patient_abha: appointment.abha_id,
        doctor_name: appointment.doctor_name,
        doctor_reg: 'NMC/2020/TELE',
        diagnosis: doctorNotes || 'Mild Viral Rhinitis & Fatigue',
        medicines: [
          { name: 'Tab Paracetamol 650mg', dosage: '1-0-1', duration: '3 days', instructions: 'After food' },
          { name: 'Tab Cetirizine 10mg', dosage: '0-0-1', duration: '5 days', instructions: 'At bedtime' },
        ],
        advice: 'Drink warm water and rest well. Reconsult if fever persists beyond 3 days.',
      };

      await fetch('/api/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setRxSent(true);
    } catch (err) {
      console.error('Error generating rx:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col text-white">
      {/* Teleconsult Top Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm">Encrypted Video Consultation</h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono border border-emerald-500/30">
                NMC Compliant
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Dr. {appointment.doctor_name} with Patient: {appointment.patient_name}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
        >
          End Call & Exit
        </button>
      </div>

      {/* Main Video & Notes Split View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 overflow-hidden">
        {/* Main Feed */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl relative flex items-center justify-center overflow-hidden border border-slate-800">
          {/* Main Feed Simulation */}
          <div className="text-center space-y-3">
            <div className="w-28 h-28 rounded-full bg-sky-900 border-4 border-sky-500 flex items-center justify-center text-4xl font-extrabold mx-auto shadow-2xl">
              <Stethoscope className="w-12 h-12 text-sky-400" />
            </div>
            <h4 className="text-lg font-bold">{appointment.doctor_name}</h4>
            <p className="text-xs text-emerald-400 font-medium">Video Feed Active • HD 1080p</p>
          </div>

          {/* Picture-in-Picture (Patient Self Preview) */}
          <div className="absolute bottom-4 right-4 w-36 h-28 bg-slate-800 rounded-xl border-2 border-slate-700 p-2 flex items-center justify-center text-xs text-slate-400 font-medium shadow-lg">
            <span>Patient Video</span>
          </div>

          {/* Floating Call Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-700">
            <button
              onClick={() => setMicOn(!micOn)}
              className={`p-3 rounded-xl transition-colors ${micOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-600 text-white'}`}
            >
              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setVideoOn(!videoOn)}
              className={`p-3 rounded-xl transition-colors ${videoOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-600 text-white'}`}
            >
              {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Doctor Clinical Notes & E-Prescription Sidebar */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-3">
              <FileText className="w-4 h-4" /> Live Clinical Notes & Diagnosis
            </div>

            <textarea
              rows={5}
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              placeholder="Type clinical observations, symptoms reported, or diagnosis..."
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />

            {rxSent && (
              <div className="mt-3 p-3 bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>e-Prescription successfully signed & dispatched to Patient Vault & WhatsApp!</span>
              </div>
            )}
          </div>

          <button
            onClick={handleIssueRx}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Generate & Issue Instant e-Prescription</span>
          </button>
        </div>
      </div>
    </div>
  );
};
