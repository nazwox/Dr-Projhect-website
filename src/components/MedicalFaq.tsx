import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'How does interactive doctor booking work on AarogyaCare?',
    answer: 'You can filter doctors by specialization, city (Delhi, Mumbai, Bengaluru, etc.), and health insurance/TPA coverage. Choose between an In-Person Clinic Visit or an Encrypted Video Teleconsultation, select a time slot, complete mandatory NMC digital consent, and receive instant booking confirmation via SMS/WhatsApp.',
  },
  {
    question: 'Are digital e-prescriptions generated valid across pharmacies in India?',
    answer: 'Yes! As per the NMC Telemedicine Guidelines 2020 and the IT Act 2000, e-prescriptions issued by registered medical practitioners with clear State Council/MCI Registration numbers are legally valid across all retail pharmacies and e-pharmacies across India.',
  },
  {
    question: 'What is ABHA (Ayushman Bharat Health Account) and how is it integrated?',
    answer: 'ABHA is a 14-digit digital health account backed by the National Health Authority (NHA). AarogyaCare links your consultation e-prescriptions and medical history directly to your ABHA vault so you can share health records securely with any hospital in India under DPDP Act 2023 guidelines.',
  },
  {
    question: 'What payment modes are accepted for clinic and video consults?',
    answer: 'We accept all popular Indian payment methods including UPI (GPay, PhonePe, Paytm, BHIM), Net Banking, Credit/Debit Cards, and Cash at Clinic for in-person appointments.',
  },
  {
    question: 'What is the appointment cancellation or rescheduling policy?',
    answer: 'You can reschedule or cancel your consultation up to 2 hours prior to the scheduled time slot directly through your Patient Portal without any fee penalty.',
  },
];

export const MedicalFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div id="faq" className="py-12 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 px-3 py-1 rounded-full">
            Patient Guide & Help
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-600 mt-1">
            Everything you need to know about Indian healthcare laws, ABHA linking, and teleconsultations.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-slate-900 text-sm flex items-center justify-between gap-3 hover:bg-slate-100/80 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-sky-600 shrink-0" />
                    {item.question}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
