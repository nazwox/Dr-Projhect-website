import React, { useState } from 'react';
import { Doctor, Appointment } from '../types';
import { X, Calendar, Clock, Video, Building, User, Phone, Mail, FileText, ShieldCheck, CheckCircle2, AlertCircle, Download, QrCode } from 'lucide-react';

interface BookingModalProps {
  doctor: Doctor | null;
  doctorsList: Doctor[];
  defaultVisitType?: 'clinic' | 'telehealth';
  onClose: () => void;
  onBookingSuccess: (appt: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  doctor: initialDoctor,
  doctorsList,
  defaultVisitType = 'telehealth',
  onClose,
  onBookingSuccess,
}) => {
  const [selectedDoc, setSelectedDoc] = useState<Doctor | null>(initialDoctor || doctorsList[0] || null);
  const [visitType, setVisitType] = useState<'clinic' | 'telehealth'>(defaultVisitType);
  
  // Tomorrow's date default
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(tomorrowStr);
  const [selectedSlot, setSelectedSlot] = useState<string>(selectedDoc?.available_slots[0] || '10:00 AM');

  // Patient Info
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientAge, setPatientAge] = useState('32');
  const [patientGender, setPatientGender] = useState('Male');
  const [abhaId, setAbhaId] = useState('');
  const [symptoms, setSymptoms] = useState('');
  
  // Mandatory NMC Consent
  const [nmcConsent, setNmcConsent] = useState(false);
  
  // Wizard state & submit status
  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedAppt, setConfirmedAppt] = useState<Appointment | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!selectedDoc) return null;

  const currentFee = visitType === 'telehealth' ? selectedDoc.fees_telehealth : selectedDoc.fees_clinic;

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!patientName.trim()) {
      setErrorMessage('Please enter the patient full name.');
      return;
    }
    if (!patientPhone.trim() || patientPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!nmcConsent) {
      setErrorMessage('Mandatory NMC Telemedicine Consent is required to confirm booking.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        doctor_id: selectedDoc.id,
        doctor_name: selectedDoc.name,
        specialization: selectedDoc.specialization,
        visit_type: visitType,
        appointment_date: selectedDate,
        time_slot: selectedSlot,
        patient_name: patientName,
        patient_phone: patientPhone,
        patient_email: patientEmail,
        patient_age: Number(patientAge),
        patient_gender: patientGender,
        abha_id: abhaId,
        symptoms: symptoms,
        nmc_consent: nmcConsent,
        amount_paid: currentFee,
      };

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to create appointment');
      const data: Appointment = await res.json();
      setConfirmedAppt(data);
      onBookingSuccess(data);
      setStep(4); // Confirmation step
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while confirming booking.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 relative overflow-hidden my-6">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-sky-800 to-blue-900 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-xs bg-sky-500/30 text-sky-200 px-2.5 py-0.5 rounded font-semibold border border-sky-400/30">
              NMC Telemedicine Guidelines 2020 Compliant
            </span>
            <h3 className="text-xl font-bold mt-1">Book Medical Appointment</h3>
          </div>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step < 4 && (
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-sky-700' : 'text-slate-400'}`}>
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">1</span>
              <span>Doctor & Visit</span>
            </div>
            <div className="w-8 h-px bg-slate-300"></div>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-sky-700' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
              <span>Date & Time Slot</span>
            </div>
            <div className="w-8 h-px bg-slate-300"></div>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-sky-700' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
              <span>Patient Details & Consent</span>
            </div>
          </div>
        )}

        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: Select Doctor & Visit Mode */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Specialist
                </label>
                <select
                  value={selectedDoc.id}
                  onChange={(e) => {
                    const found = doctorsList.find((d) => d.id === Number(e.target.value));
                    if (found) {
                      setSelectedDoc(found);
                      setSelectedSlot(found.available_slots[0] || '10:00 AM');
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:ring-2 focus:ring-sky-500"
                >
                  {doctorsList.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialization} ({d.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor Summary Card */}
              <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-xl flex items-center gap-3">
                <img
                  src={selectedDoc.image_url}
                  alt={selectedDoc.name}
                  className="w-16 h-16 rounded-xl object-cover border border-white shadow-xs"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{selectedDoc.name}</h4>
                  <p className="text-xs text-slate-600">{selectedDoc.degrees}</p>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">NMC Reg: {selectedDoc.registration_no}</p>
                </div>
              </div>

              {/* Visit Type Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Visit Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setVisitType('telehealth')}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                      visitType === 'telehealth'
                        ? 'border-emerald-600 bg-emerald-50/80 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Video className={`w-5 h-5 ${visitType === 'telehealth' ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        ₹{selectedDoc.fees_telehealth}
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="text-sm font-bold text-slate-900">Video Teleconsult</div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Encrypted video session + Digital e-Prescription</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitType('clinic')}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                      visitType === 'clinic'
                        ? 'border-sky-600 bg-sky-50/80 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Building className={`w-5 h-5 ${visitType === 'clinic' ? 'text-sky-600' : 'text-slate-400'}`} />
                      <span className="text-xs font-black text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                        ₹{selectedDoc.fees_clinic}
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="text-sm font-bold text-slate-900">In-Person Clinic Visit</div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Visit clinic address in {selectedDoc.city}</p>
                    </div>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow transition-colors"
              >
                Proceed to Select Date & Time Slot
              </button>
            </div>
          )}

          {/* STEP 2: Date & Available Slots */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sky-600" /> Select Appointment Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-sky-600" /> Real-time Slot Availability Grid ({selectedDate})
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {selectedDoc.available_slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all ${
                        selectedSlot === slot
                          ? 'bg-sky-600 text-white border-sky-600 shadow'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow transition-colors"
                >
                  Proceed to Patient Details
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Information & NMC Consent */}
          {step === 3 && (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Patient Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Mobile Number (+91) *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Age</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Gender</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">ABHA ID (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 91-4821-..."
                    value={abhaId}
                    onChange={(e) => setAbhaId(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Symptoms or Reason for Visit</label>
                <textarea
                  rows={2}
                  placeholder="e.g. High fever for 2 days, mild chest tightness..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500"
                ></textarea>
              </div>

              {/* Mandatory NMC Telemedicine Consent Box */}
              <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl space-y-2">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 leading-snug">
                    <strong className="block font-bold">Mandatory Telemedicine & Clinical Consent (NMC 2020)</strong>
                    I hereby consent to teleconsultation/clinic appointment with Dr. {selectedDoc.name}. I understand that online consultation is not a substitute for emergency in-person casualty care.
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-1 border-t border-amber-200/60">
                  <input
                    type="checkbox"
                    checked={nmcConsent}
                    onChange={(e) => setNmcConsent(e.target.checked)}
                    className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500"
                  />
                  <span className="text-xs font-bold text-slate-900">
                    I explicitly agree & give digital consent as per NMC Guidelines. *
                  </span>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? 'Confirming Appointment...' : `Confirm & Pay ₹${currentFee}`}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Instant Confirmation Ticket */}
          {step === 4 && confirmedAppt && (
            <div className="text-center space-y-5 py-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Appointment Confirmed
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  Reference: <span className="text-sky-700 font-mono">{confirmedAppt.booking_reference}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  A confirmation SMS & WhatsApp message has been dispatched to <strong>{confirmedAppt.patient_phone}</strong>.
                </p>
              </div>

              {/* Printable Ticket Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div>
                    <span className="text-slate-400 uppercase font-bold text-[10px]">Specialist</span>
                    <div className="font-bold text-slate-900 text-sm">{confirmedAppt.doctor_name}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 uppercase font-bold text-[10px]">Visit Type</span>
                    <div className="font-bold text-emerald-700 uppercase">{confirmedAppt.visit_type}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-slate-400 uppercase font-bold text-[10px]">Date & Slot</span>
                    <div className="font-bold text-slate-800">{confirmedAppt.appointment_date} @ {confirmedAppt.time_slot}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase font-bold text-[10px]">Patient</span>
                    <div className="font-bold text-slate-800">{confirmedAppt.patient_name} ({confirmedAppt.patient_age} yrs)</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
