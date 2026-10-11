import React, { useState } from 'react';
import { useT } from '../lib/prefs';
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { VentureProject } from '../data/jordanVentures';
import heroImg from '../assets/images/hero_jordan_venture_1791711973387.jpg';

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
  const t = useT();
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
      image: heroImg,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-sunken/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-panel border border-sine2 shadow-2xl p-6 sm:p-8 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 end-5 p-2 rounded-xl bg-chip hover:bg-chip-hi text-dim hover:text-ink transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-14 h-14 rounded-full bg-ok/20 border border-ok/40 flex items-center justify-center text-ok mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-ink">{t("Venture Successfully Structured!")}</h3>
            <p className="text-xs sm:text-sm text-ink2 max-w-md mx-auto">
              {t("Your opportunity has been mapped onto the Jordan Venture Network with an initial 86% completeness score. Vestra verification team will review your commercial registry.")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-accent font-semibold tracking-wider">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>{t("VENTURE INTAKE ENGINE")}</span>
              </div>
              <h3 className="text-xl font-bold text-ink mt-1">{t("Submit Your Opportunity")}</h3>
              <p className="text-xs text-dim mt-1">
                {t("Move from a raw idea to an institutional profile mapped for Jordan and MENA angel syndicates.")}
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-ink2 block mb-1">{t("Company / Project Name")}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("e.g. Amman Autonomous Fleet Systems")}
                  className="w-full bg-panel2 border border-sine2 rounded-xl px-3.5 py-2.5 text-ink outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-ink2 block mb-1">{t("Sector")}</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-panel2 border border-sine2 rounded-xl px-3 py-2.5 text-ink outline-none focus:border-accent"
                  >
                    <option value="AgriTech">{t("AgriTech & Climate")}</option>
                    <option value="MedTech">{t("MedTech & Biotech")}</option>
                    <option value="Enterprise SaaS">{t("Enterprise SaaS / AI")}</option>
                    <option value="CleanTech">{t("CleanTech & Energy")}</option>
                    <option value="Logistics">{t("Logistics & Trade")}</option>
                    <option value="Culinary & Retail">{t("Culinary & Franchise")}</option>
                  </select>
                </div>

                <div>
                  <label className="text-ink2 block mb-1">{t("Jordan Governorate")}</label>
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
                    className="w-full bg-panel2 border border-sine2 rounded-xl px-3 py-2.5 text-ink outline-none focus:border-accent"
                  >
                    <option value="Amman Governorate">{t("Amman Governorate")}</option>
                    <option value="Irbid Governorate">{t("Irbid Governorate")}</option>
                    <option value="Aqaba Governorate">{t("Aqaba Governorate")}</option>
                    <option value="Jordan Valley">{t("Jordan Valley")}</option>
                    <option value="Balqa (As-Salt)">Balqa (As-Salt)</option>
                    <option value="Zarqa Governorate">{t("Zarqa Governorate")}</option>
                    <option value="Mafraq Governorate">{t("Mafraq Governorate")}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-ink2 block mb-1">{t("Target Capital (USD)")}</label>
                  <input
                    type="text"
                    required
                    value={formData.targetCapital}
                    onChange={(e) => {
                      const num = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 100000;
                      setFormData({ ...formData, targetCapital: e.target.value, capitalAmountUSD: num });
                    }}
                    placeholder="$250,000"
                    className="w-full bg-panel2 border border-sine2 rounded-xl px-3.5 py-2.5 text-ink outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="text-ink2 block mb-1">{t("Round Stage")}</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value as any })}
                    className="w-full bg-panel2 border border-sine2 rounded-xl px-3 py-2.5 text-ink outline-none focus:border-accent"
                  >
                    <option value="Pre-Seed">{t("Pre-Seed")}</option>
                    <option value="Seed">{t("Seed Round")}</option>
                    <option value="Growth">{t("Growth Expansion")}</option>
                    <option value="Series A">{t("Series A")}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-ink2 block mb-1">{t("Opportunity Brief & Traction")}</label>
                <textarea
                  rows={3}
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder={t("Summarize your current revenue, customer base in Jordan, and what the capital will accomplish...")}
                  className="w-full bg-panel2 border border-sine2 rounded-xl px-3.5 py-2.5 text-ink outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-ink2 block mb-1">{t("Founder Full Name")}</label>
                  <input
                    type="text"
                    required
                    value={formData.founderName}
                    onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                    placeholder={t("e.g. Layla Al-Khasawneh")}
                    className="w-full bg-panel2 border border-sine2 rounded-xl px-3.5 py-2.5 text-ink outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="text-ink2 block mb-1">{t("Email / Contact")}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t("founder@venture.jo")}
                    className="w-full bg-panel2 border border-sine2 rounded-xl px-3.5 py-2.5 text-ink outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-faint flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>{t("Encrypted under Jordan Data Protection Law")}</span>
              </span>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hi text-on-accent font-bold text-xs transition-colors flex items-center gap-2"
              >
                <span>{t("Pin on Jordan Map")}</span>
                <ArrowRight className="rtl:-scale-x-100 w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
