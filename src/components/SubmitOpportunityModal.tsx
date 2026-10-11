import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { VentureProject } from '../data/jordanVentures';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmitNewVenture: (newProject: VentureProject) => void;
  lang?: 'en' | 'ar';
}

export const SubmitOpportunityModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmitNewVenture,
  lang = 'en'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Enterprise SaaS' as const,
    governorate: 'Amman Governorate',
    locationName: 'King Hussein Business Park, Amman',
    targetCapital: '$250,000',
    capitalAmountUSD: 250000,
    stage: 'Seed' as const,
    summary: '',
    founderName: '',
    founderRole: 'Founder & CEO',
    email: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.summary.trim()) return;

    // Coordinate mapping roughly for Jordan governorates
    const coordsMap: Record<string, { x: number; y: number }> = {
      'Amman Governorate': { x: 41, y: 36 },
      'Irbid Governorate': { x: 34, y: 19 },
      'Aqaba Governorate': { x: 19, y: 91 },
      'Balqa (As-Salt)': { x: 35, y: 32 },
      'Jordan Valley': { x: 31, y: 36 },
      'Zarqa Governorate': { x: 46, y: 31 },
      'Mafraq Governorate': { x: 55, y: 24 }
    };

    const chosenCoord = coordsMap[formData.governorate] || { x: 40, y: 37 };

    const newProj: VentureProject = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      arabicName: formData.name,
      category: formData.category,
      governorate: formData.governorate,
      locationName: formData.locationName,
      coordinates: chosenCoord,
      targetCapital: formData.targetCapital,
      capitalAmountUSD: formData.capitalAmountUSD,
      stage: formData.stage,
      completeness: 86,
      riskLevel: 'Low-Med',
      matchedInvestorsCount: 12,
      summary: formData.summary,
      arabicSummary: formData.summary,
      founder: {
        name: formData.founderName || 'Founder',
        role: formData.founderRole,
        priorBackground: 'Submitted through Vestra Connect Jordan portal'
      },
      metrics: [
        { label: 'Target Capital', value: formData.targetCapital },
        { label: 'Stage', value: formData.stage },
        { label: 'Completeness', value: '86%' },
        { label: 'Initial Status', value: 'Under Review' }
      ],
      dealRoomStatus: 'Matching',
      image: '/src/assets/images/hero_jordan_venture_1791711973387.jpg',
      keyHighlights: [
        'Structured via Vestra Intake Engine',
        'Direct access to vetted Amman and regional angel syndicates',
        'Automated document verification in progress'
      ]
    };

    onSubmitNewVenture(newProj);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0B111E] border border-slate-700 shadow-2xl p-6 sm:p-8 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Venture Successfully Structured!</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Your opportunity has been mapped onto the Jordan Venture Network with an initial 86% completeness score. Vestra verification team will review your commercial registry.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold tracking-wider">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>VENTURE INTAKE ENGINE</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">Submit Your Opportunity</h3>
              <p className="text-xs text-slate-400 mt-1">
                Move from a raw idea to an institutional profile mapped for Jordan and MENA angel syndicates.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Company / Project Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Amman Autonomous Fleet Systems"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Sector</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="AgriTech">AgriTech & Climate</option>
                    <option value="MedTech">MedTech & Biotech</option>
                    <option value="Enterprise SaaS">Enterprise SaaS / AI</option>
                    <option value="CleanTech">CleanTech & Energy</option>
                    <option value="Logistics">Logistics & Trade</option>
                    <option value="Culinary & Retail">Culinary & Franchise</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Jordan Governorate</label>
                  <select
                    value={formData.governorate}
                    onChange={(e) => {
                      const gov = e.target.value;
                      let loc = 'King Hussein Business Park, Amman';
                      if (gov === 'Irbid Governorate') loc = 'Yarmouk Tech Park, Irbid';
                      if (gov === 'Aqaba Governorate') loc = 'ASEZA Free Zone, Aqaba';
                      if (gov === 'Jordan Valley') loc = 'Deir Alla, Jordan Valley';
                      if (gov === 'Balqa (As-Salt)') loc = 'As-Salt Historic District';
                      if (gov === 'Mafraq Governorate') loc = 'Mafraq Solar Corridor';
                      if (gov === 'Zarqa Governorate') loc = 'Zarqa Free Industrial Zone';

                      setFormData({ ...formData, governorate: gov, locationName: loc });
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="Amman Governorate">Amman Governorate</option>
                    <option value="Irbid Governorate">Irbid Governorate</option>
                    <option value="Aqaba Governorate">Aqaba Governorate</option>
                    <option value="Jordan Valley">Jordan Valley</option>
                    <option value="Balqa (As-Salt)">Balqa (As-Salt)</option>
                    <option value="Zarqa Governorate">Zarqa Governorate</option>
                    <option value="Mafraq Governorate">Mafraq Governorate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Target Capital (USD)</label>
                  <input
                    type="text"
                    required
                    value={formData.targetCapital}
                    onChange={(e) => {
                      const num = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 100000;
                      setFormData({ ...formData, targetCapital: e.target.value, capitalAmountUSD: num });
                    }}
                    placeholder="$250,000"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Round Stage</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="Pre-Seed">Pre-Seed</option>
                    <option value="Seed">Seed Round</option>
                    <option value="Growth">Growth Expansion</option>
                    <option value="Series A">Series A</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Opportunity Brief & Traction</label>
                <textarea
                  rows={3}
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Summarize your current revenue, customer base in Jordan, and what the capital will accomplish..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Founder Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.founderName}
                    onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                    placeholder="e.g. Layla Al-Khasawneh"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Email / Contact</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="founder@venture.jo"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Encrypted under Jordan Data Protection Law</span>
              </span>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2"
              >
                <span>Pin on Jordan Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
