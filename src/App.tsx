import React, { useState, useEffect } from 'react';
import { Doctor, Appointment, Review } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DoctorCard } from './components/DoctorCard';
import { DoctorDetailModal } from './components/DoctorDetailModal';
import { BookingModal } from './components/BookingModal';
import { PatientPortal } from './components/PatientPortal';
import { TeleconsultRoom } from './components/TeleconsultRoom';
import { ReviewsSection } from './components/ReviewsSection';
import { AbhaSection } from './components/AbhaSection';
import { DoctorAdminPortal } from './components/DoctorAdminPortal';
import { MedicalFaq } from './components/MedicalFaq';
import { Footer } from './components/Footer';

const SPECIALTIES_LIST = [
  'All Specializations',
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Neurology',
  'Gynecology & Obstetrics',
  'General Medicine',
  'Psychiatry',
  'ENT (Ear, Nose, Throat)',
  'Ophthalmology',
];

const CITIES_LIST = [
  'All Cities',
  'New Delhi / NCR',
  'Mumbai',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Pune',
];

const INSURANCES_LIST = [
  'All Insurances / TPAs',
  'Star Health',
  'Niva Bupa (Max Bupa)',
  'HDFC ERGO',
  'Care Health Insurance',
  'Ayushman Bharat PM-JAY',
  'ICICI Lombard',
];

export function App() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  // Search Filters
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specializations');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedInsurance, setSelectedInsurance] = useState('All Insurances / TPAs');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & Active State
  const [detailDoctor, setDetailDoctor] = useState<Doctor | null>(null);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [bookingVisitType, setBookingVisitType] = useState<'clinic' | 'telehealth'>('telehealth');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // Teleconsultation Active Session
  const [activeTeleconsultAppt, setActiveTeleconsultAppt] = useState<Appointment | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchDoctors = async () => {
    setLoadingDocs(true);
    try {
      const params = new URLSearchParams();
      if (selectedSpecialty !== 'All Specializations') params.append('specialization', selectedSpecialty);
      if (selectedCity !== 'All Cities') params.append('city', selectedCity);
      if (selectedInsurance !== 'All Insurances / TPAs') params.append('tpa', selectedInsurance);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`/api/doctors?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setDoctors(data);
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
    } finally {
      setLoadingDocs(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchReviews();
  }, []);

  const handleBookClick = (doc: Doctor, visitType: 'clinic' | 'telehealth') => {
    setBookingDoctor(doc);
    setBookingVisitType(visitType);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (appt: Appointment) => {
    showToast(`Appointment confirmed! Reference: ${appt.booking_reference}. SMS & WhatsApp alert sent.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      {/* Toast Alert Popup */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-sky-400 flex items-center gap-3 animate-bounce">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Header
        onOpenBooking={() => {
          setBookingDoctor(doctors[0] || null);
          setIsBookingOpen(true);
        }}
        onOpenPortal={() => setIsPortalOpen(!isPortalOpen)}
        portalActive={isPortalOpen}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
      />

      {/* Main Body */}
      <main className="flex-1">
        {/* Hero & Quick Filter Section */}
        <Hero
          specialties={SPECIALTIES_LIST}
          cities={CITIES_LIST}
          insurances={INSURANCES_LIST}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedInsurance={selectedInsurance}
          setSelectedInsurance={setSelectedInsurance}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={fetchDoctors}
        />

        {/* Doctor Admin Management Console Mode */}
        {isAdminMode && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <DoctorAdminPortal doctorsList={doctors} />
          </div>
        )}

        {/* Patient Portal Container */}
        {isPortalOpen && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <PatientPortal onOpenTeleconsult={(appt) => setActiveTeleconsultAppt(appt)} />
          </div>
        )}

        {/* Doctor Directory Listing */}
        <section id="doctors" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-100">
                NMC Verified Specialists ({doctors.length})
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Available Doctors & Teleconsultants
              </h2>
            </div>
          </div>

          {loadingDocs ? (
            <div className="py-16 text-center text-slate-500 space-y-3">
              <div className="w-10 h-10 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm font-semibold">Fetching Verified Doctor Profiles & Live Slot Grid...</p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="py-12 p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
              No doctors found matching your exact filter criteria. Try resetting specialty or city.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doc) => (
                <DoctorCard
                  key={doc.id}
                  doctor={doc}
                  onSelectDoctor={(d) => setDetailDoctor(d)}
                  onBookDoctor={(d, type) => handleBookClick(d, type)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ABHA / ABDM Integration Section */}
        <AbhaSection />

        {/* Verified Patient Reviews */}
        <ReviewsSection
          reviews={reviews}
          doctorsList={doctors}
          onAddReview={(newRev) => setReviews([newRev, ...reviews])}
        />

        {/* FAQs */}
        <MedicalFaq />
      </main>

      {/* Doctor Detailed Info Modal */}
      {detailDoctor && (
        <DoctorDetailModal
          doctor={detailDoctor}
          onClose={() => setDetailDoctor(null)}
          onBook={(doc, type) => handleBookClick(doc, type)}
        />
      )}

      {/* Appointment Booking Wizard Modal */}
      {isBookingOpen && (
        <BookingModal
          doctor={bookingDoctor}
          doctorsList={doctors}
          defaultVisitType={bookingVisitType}
          onClose={() => setIsBookingOpen(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Live Video Teleconsultation Room */}
      {activeTeleconsultAppt && (
        <TeleconsultRoom
          appointment={activeTeleconsultAppt}
          onClose={() => setActiveTeleconsultAppt(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
