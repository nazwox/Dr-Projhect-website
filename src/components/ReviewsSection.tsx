import React, { useState } from 'react';
import { Review } from '../types';
import { Star, ShieldCheck, ThumbsUp, MessageSquarePlus, Filter, CheckCircle2 } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: Review[];
  doctorsList: any[];
  onAddReview: (newRev: any) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, doctorsList, onAddReview }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number>(doctorsList[0]?.id || 1);
  const [patientName, setPatientName] = useState('');
  const [rating, setRating] = useState(5);
  const [punctualityRating, setPunctualityRating] = useState(5);
  const [hygieneRating, setHygieneRating] = useState(5);
  const [bedsideRating, setBedsideRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const doc = doctorsList.find((d) => d.id === Number(selectedDoctorId));

    const payload = {
      doctor_id: Number(selectedDoctorId),
      doctor_name: doc ? doc.name : 'Specialist Doctor',
      patient_name: patientName || 'Verified Patient',
      rating,
      punctuality_rating: punctualityRating,
      hygiene_rating: hygieneRating,
      bedside_manner_rating: bedsideRating,
      comment,
    };

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        onAddReview(data);
        setShowForm(false);
        setComment('');
      }
    } catch (err) {
      console.error('Error posting review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="reviews" className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header & Overall Rating Card */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              100% Verified Feedback
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Verified Patient Reviews & Experiences</h2>
            <p className="text-sm text-slate-600 mt-1">
              Ethical patient testimonials adhering strictly to NMC Code of Medical Ethics.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
            <div className="text-center">
              <div className="text-3xl font-black text-slate-900">4.9 / 5</div>
              <div className="flex justify-center text-amber-400 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-[10px] text-slate-500 font-medium mt-1">Based on 1,280+ consultations</p>
            </div>

            <div className="h-10 w-px bg-slate-200"></div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Patient Review</span>
            </button>
          </div>
        </div>

        {/* Review Submission Form Modal / Box */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-2xl border border-sky-200 shadow-lg space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Share Your Consultation Experience</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Select Doctor</label>
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(Number(e.target.value))}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {doctorsList.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.specialization})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanshu Mehta"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            {/* Rating Stars Criteria */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Overall Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full p-2 text-xs bg-slate-50 border rounded-lg"
                >
                  <option value={5}>5 ★ Excellent</option>
                  <option value={4}>4 ★ Good</option>
                  <option value={3}>3 ★ Average</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Punctuality</label>
                <select
                  value={punctualityRating}
                  onChange={(e) => setPunctualityRating(Number(e.target.value))}
                  className="w-full p-2 text-xs bg-slate-50 border rounded-lg"
                >
                  <option value={5}>5 ★ On Time</option>
                  <option value={4}>4 ★ Slight Delay</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Clinic Hygiene</label>
                <select
                  value={hygieneRating}
                  onChange={(e) => setHygieneRating(Number(e.target.value))}
                  className="w-full p-2 text-xs bg-slate-50 border rounded-lg"
                >
                  <option value={5}>5 ★ Spotless</option>
                  <option value={4}>4 ★ Clean</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Bedside Manner</label>
                <select
                  value={bedsideRating}
                  onChange={(e) => setBedsideRating(Number(e.target.value))}
                  className="w-full p-2 text-xs bg-slate-50 border rounded-lg"
                >
                  <option value={5}>5 ★ Empathetic & Clear</option>
                  <option value={4}>4 ★ Helpful</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Your Honest Feedback</label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Describe doctor punctuality, diagnosis clarity, and overall experience..."
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow"
              >
                {submitting ? 'Submitting...' : 'Post Verified Review'}
              </button>
            </div>
          </form>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div key={rev.id || idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{rev.patient_name}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Patient
                  </span>
                </div>

                <div className="flex items-center gap-1 my-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[11px] text-slate-400 font-medium ml-1">({rev.date})</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal">"{rev.comment}"</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Doctor: <strong>{rev.doctor_name}</strong></span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Punctual
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
