import React, { useState, useEffect } from 'react';
import { Appointment, Prescription, AbhaProfile } from '../types';
import { Calendar, FileText, Video, ShieldCheck, Download, Search, RefreshCw, UserCheck, AlertCircle } from 'lucide-react';

interface PatientPortalProps {
  onOpenTeleconsult: (appt: Appointment) => void;
}

export const PatientPortal: React.FC<PatientPortalProps> = ({ onOpenTeleconsult }) => {
  const [searchPhone, setSearchPhone] = useState('9876543210');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [abhaProfile, setAbhaProfile] = useState<AbhaProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'appointments' | 'prescriptions' | 'abha'>('appointments');

  const fetchPatientData = async () => {
    if (!searchPhone) return;
    setLoading(true);
    try {
      const [apptRes, rxRes, abhaRes] = await Promise.all([
        fetch(`/api/appointments?phone=${encodeURIComponent(searchPhone)}`),
        fetch(`/api/prescriptions`),
        fetch(`/api/abha`),
      ]);

      if (apptRes.ok) {
        const appts = await apptRes.json();
        setAppointments(appts);
      }
      if (rxRes.ok) {
        const rxs = await rxRes.json();
        setPrescriptions(rxs);
      }
      if (abhaRes.ok) {
        const abhas = await abhaRes.json();
        if (Array.isArray(abhas) && abhas.length > 0) {
          setAbhaProfile(abhas[0]);
        }
      }
    } catch (err) {
      console.error('Portal fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 max-w-5xl mx-auto my-8">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> ABDM Linked Patient Portal
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Patient Appointments & e-Health Vault</h2>
        </div>

        {/* Mobile Filter Input */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="tel"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              placeholder="Search by Mobile No."
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
          <button
            onClick={fetchPatientData}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Fetch Records</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 my-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`py-2.5 px-4 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'appointments'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Appointments ({appointments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`py-2.5 px-4 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'prescriptions'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Digital e-Prescriptions ({prescriptions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('abha')}
          className={`py-2.5 px-4 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'abha'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>ABHA Health Card</span>
        </button>
      </div>

      {/* Tab 1: Appointments List */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-200">
              No appointments found for mobile {searchPhone}. Book a consultation above to get started!
            </div>
          ) : (
            appointments.map((appt) => (
              <div
                key={appt.id || appt.booking_reference}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-sky-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sky-700 text-xs bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      Ref: {appt.booking_reference}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        appt.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : appt.status === 'In Consult'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{appt.doctor_name}</h4>
                  <p className="text-xs text-slate-600 font-medium">
                    {appt.specialization} • {appt.visit_type === 'telehealth' ? 'Video Teleconsult' : 'In-Clinic Visit'}
                  </p>
                  <p className="text-xs text-slate-500">
                    Scheduled: <strong>{appt.appointment_date}</strong> at <strong>{appt.time_slot}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  {appt.visit_type === 'telehealth' && (
                    <button
                      onClick={() => onOpenTeleconsult(appt)}
                      className="flex-1 md:flex-initial px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1.5"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Teleconsult Video Room</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Digital e-Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-4">
          {prescriptions.map((rx) => (
            <div key={rx.rx_number} className="p-5 bg-sky-50/50 rounded-2xl border border-sky-100 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono bg-sky-100 text-sky-900 font-bold px-2 py-0.5 rounded">
                    {rx.rx_number}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">Prescribed by {rx.doctor_name}</h4>
                  <p className="text-xs text-slate-500">NMC Registration: {rx.doctor_reg}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-600">{rx.date}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 uppercase">Diagnosis: </span>
                <span className="text-xs text-slate-800 font-medium">{rx.diagnosis}</span>
              </div>

              {/* Medicines Table */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2">Medicine Name</th>
                      <th className="p-2">Dosage</th>
                      <th className="p-2">Duration</th>
                      <th className="p-2">Instructions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {rx.medicines.map((m, idx) => (
                      <tr key={idx}>
                        <td className="p-2 font-bold text-slate-900">{m.name}</td>
                        <td className="p-2">{m.dosage}</td>
                        <td className="p-2">{m.duration}</td>
                        <td className="p-2">{m.instructions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-xs text-slate-600 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                <strong>Doctor's Advice:</strong> {rx.advice}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: ABHA Digital Health Card */}
      {activeTab === 'abha' && abhaProfile && (
        <div className="max-w-md mx-auto p-6 bg-gradient-to-tr from-sky-900 via-blue-900 to-indigo-950 text-white rounded-2xl shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-xs">
                ABHA
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-wide">Ayushman Bharat Digital Health Card</h4>
                <p className="text-[10px] text-sky-200">Government of India • ABDM Compliant</p>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-xs">
            <div>
              <span className="text-[10px] text-sky-300 uppercase font-bold block">ABHA Number</span>
              <span className="text-lg font-mono font-extrabold tracking-widest text-emerald-300">
                {abhaProfile.abha_number}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <div>
                <span className="text-[10px] text-sky-300 uppercase block">Full Name</span>
                <span className="font-bold">{abhaProfile.full_name}</span>
              </div>
              <div>
                <span className="text-[10px] text-sky-300 uppercase block">ABHA Address</span>
                <span className="font-mono text-[11px] text-sky-200">{abhaProfile.abha_address}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-[11px]">
              <div>
                <span className="text-[9px] text-sky-300 block">Gender</span>
                <span>{abhaProfile.gender}</span>
              </div>
              <div>
                <span className="text-[9px] text-sky-300 block">DOB</span>
                <span>{abhaProfile.dob}</span>
              </div>
              <div>
                <span className="text-[9px] text-sky-300 block">Blood Group</span>
                <span className="font-bold text-rose-300">{abhaProfile.blood_group}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
