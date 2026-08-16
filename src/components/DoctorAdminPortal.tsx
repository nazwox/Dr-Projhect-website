import React, { useState, useEffect } from 'react';
import { Appointment, Doctor } from '../types';
import { CheckCircle2, Clock, FileText, UserCheck, Stethoscope, RefreshCw } from 'lucide-react';

interface DoctorAdminPortalProps {
  doctorsList: Doctor[];
}

export const DoctorAdminPortal: React.FC<DoctorAdminPortalProps> = ({ doctorsList }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number>(doctorsList[0]?.id || 1);

  const fetchAdminAppts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/appointments');
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    } catch (err) {
      console.error('Error fetching admin appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminAppts();
  }, []);

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/appointments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        fetchAdminAppts();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-amber-200 shadow-md p-6 max-w-5xl mx-auto my-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-md">
            Doctor / Practice Management Console
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-1">Incoming Consultation Desk</h2>
        </div>

        <button
          onClick={fetchAdminAppts}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Appointments</span>
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {appointments.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm bg-amber-50/50 rounded-xl border border-dashed border-amber-200">
            No incoming bookings right now. Use the "Book Appointment" button above to test real-time booking!
          </div>
        ) : (
          appointments.map((appt) => (
            <div
              key={appt.id || appt.booking_reference}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded border">
                    {appt.booking_reference}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                    {appt.visit_type}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900">
                  Patient: {appt.patient_name} ({appt.patient_age} yrs, {appt.patient_gender})
                </h4>

                <p className="text-xs text-slate-600">
                  Mobile: <strong>{appt.patient_phone}</strong> • Doctor: <strong>{appt.doctor_name}</strong>
                </p>

                <p className="text-xs text-slate-500">
                  Scheduled Slot: <strong>{appt.appointment_date}</strong> @ <strong>{appt.time_slot}</strong>
                </p>

                {appt.symptoms && (
                  <p className="text-xs text-slate-700 bg-white p-2 rounded border border-slate-200">
                    <strong>Symptoms:</strong> {appt.symptoms}
                  </p>
                )}
              </div>

              {/* Status Manager Controls */}
              <div className="flex items-center gap-2">
                <select
                  value={appt.status}
                  onChange={(e) => appt.id && handleUpdateStatus(appt.id, e.target.value)}
                  className="p-2 text-xs font-bold bg-white border border-slate-300 rounded-xl text-slate-800"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Consult">In Consult</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
