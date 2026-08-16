import React, { useState } from 'react';
import { AbhaProfile } from '../types';
import { Shield, Sparkles, CheckCircle2, QrCode, UserCheck, ArrowRight, RefreshCw } from 'lucide-react';

export const AbhaSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('1994-05-12');
  const [createdAbha, setCreatedAbha] = useState<AbhaProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateAbha = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobile) return;
    setLoading(true);

    try {
      const res = await fetch('/api/abha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          mobile,
          gender,
          dob,
          blood_group: 'B+',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setCreatedAbha(data);
      }
    } catch (err) {
      console.error('Error generating ABHA:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="abha" className="py-12 bg-gradient-to-br from-slate-900 via-blue-950 to-sky-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Info Side */}
          <div className="space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" /> Ayushman Bharat Digital Mission (ABDM)
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Create & Link Your National <span className="text-orange-400">ABHA Health ID</span>
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              ABHA (Ayushman Bharat Health Account) is a 14-digit unique health identifier under the National Health Authority. Seamlessly store, share, and access your e-prescriptions, lab reports, and doctor notes across all Indian hospitals & clinics.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant e-Prescription synchronization from AarogyaCare consultations</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Encrypted & Consent-driven medical record sharing (DPDP Act 2023)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Recognized at all AIIMS, Fortis, Max, Apollo, and Government Health Centers</span>
              </div>
            </div>
          </div>

          {/* Interactive Generator Box */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl">
            {!createdAbha ? (
              <form onSubmit={handleCreateAbha} className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-sky-400" /> Create / Verify Instant ABHA ID
                </h3>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name (As per Aadhaar)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyanshu Mehta"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 text-xs bg-white/10 border border-white/20 text-white rounded-xl placeholder-slate-400 focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Aadhaar Mobile No.</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white/10 border border-white/20 text-white rounded-xl placeholder-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full p-2.5 text-xs bg-slate-900 border border-white/20 text-white rounded-xl"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                  <span>Generate Official ABHA Health Card</span>
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-slate-900 to-sky-950 rounded-xl border border-sky-400/40 text-left space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[10px] bg-orange-500 font-bold px-2 py-0.5 rounded text-white">
                      OFFICIAL ABHA CARD
                    </span>
                    <span className="text-xs font-mono text-emerald-400">ABDM VERIFIED</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">ABHA Number</span>
                    <div className="text-xl font-mono font-black text-amber-300">{createdAbha.abha_number}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Name</span>
                      <span className="font-bold text-white">{createdAbha.full_name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">ABHA Address</span>
                      <span className="font-mono text-sky-200">{createdAbha.abha_address}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCreatedAbha(null)}
                  className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl"
                >
                  Create Another Card
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
