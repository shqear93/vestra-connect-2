import React, { useState, useEffect } from 'react';
import { useT } from '../lib/prefs';
import { 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Users, 
  MessageSquare, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  Play, 
  Pause, 
  RotateCcw,
  Building,
  Check,
  Briefcase
} from 'lucide-react';
import { JOURNEY_STAGES } from '../data/jordanVentures';

interface Props {
  lang?: 'en' | 'ar';
  onLaunchDealRoom?: () => void;
}

export const OpportunityJourneyEngine: React.FC<Props> = ({ lang = 'en', onLaunchDealRoom }) => {
  const t = useT();
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [selectedCase, setSelectedCase] = useState<'franchise' | 'agritech' | 'ai'>('franchise');

  // Auto-play stepper cycle
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentStageIndex((prev) => (prev + 1) % JOURNEY_STAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const activeStage = JOURNEY_STAGES[currentStageIndex];

  const caseStudies = {
    franchise: {
      tag: 'Culinary Franchise',
      title: 'Beit Al-Qamar Heritage Expansion',
      location: 'As-Salt & West Amman',
      rawText: 'Looking for $150k expansion capital. We have 1 packed flagship in As-Salt with 400 daily guests and want to open 2 modern outlets in Abdali and Dabouq. Great margins, need cash for fitouts and central kitchen.',
      structuredData: {
        category: 'Gastronomy & Franchise',
        targetCapital: '$150,000 for 18% Equity',
        currentARR: '$480,000',
        ebitda: '31%',
        useOfFunds: '70% Fitouts, 20% Equipment, 10% Reserve'
      },
      verificationDocs: [
        { label: 'Commercial Registry (Jordan MIT #44192)', verified: true },
        { label: '24-Month Audited Financial Statements', verified: true },
        { label: 'Signed Letters of Intent for Abdali Lease', verified: true },
        { label: 'Founder Identity & Credit Cleared', verified: true }
      ],
      matches: [
        { name: 'Amman Hospitality Syndicate', affinity: '94%', ticket: '$100k' },
        { name: 'Levant Seed Food & Beverage Angel', affinity: '88%', ticket: '$50k' },
        { name: 'MENA Retail Opportunities Fund', affinity: '81%', ticket: '$150k' }
      ]
    },
    agritech: {
      tag: 'AgriTech Climate',
      title: 'Wadi Verdant Hydroponics',
      location: 'Deir Alla, Jordan Valley',
      rawText: 'We run a 14-dunum precision hydroponic greenhouse in Jordan Valley. Saves 78% water. Want $420k to scale solar thermal shading and expand strawberry exports to Qatar and Dubai.',
      structuredData: {
        category: 'AgriTech & Climate Solutions',
        targetCapital: '$420,000 Growth Round',
        currentARR: '$840,000',
        ebitda: '36%',
        useOfFunds: '60% Solar-Thermal Canopy, 30% Cold Storage, 10% Working Capital'
      },
      verificationDocs: [
        { label: 'Ministry of Agriculture Land Lease & Water Quota', verified: true },
        { label: 'Deloitte Amman 2025 Financial Review', verified: true },
        { label: 'Export Invoices & Gulf Customs Clearances', verified: true },
        { label: 'Patented Thermal Canopy Utility Model', verified: true }
      ],
      matches: [
        { name: 'Jordan Climate Innovations Fund', affinity: '96%', ticket: '$250k' },
        { name: 'Arab Sustainable AgTech Syndicate', affinity: '91%', ticket: '$200k' },
        { name: 'GCC Impact Investors Network', affinity: '84%', ticket: '$150k' }
      ]
    },
    ai: {
      tag: 'Enterprise SaaS',
      title: 'Nexura Arabic Dialect AI',
      location: 'King Hussein Business Park, Amman',
      rawText: 'B2B enterprise conversational AI that understands Levantine Arabic. We have 3 pilot banks in Jordan and want $350k seed to expand sales into Riyadh and Abu Dhabi.',
      structuredData: {
        category: 'Enterprise SaaS / AI',
        targetCapital: '$350,000 Seed Round',
        currentARR: '$310,000',
        ebitda: '22%',
        useOfFunds: '65% ML Engineering & GPUs, 25% Enterprise Sales, 10% IP'
      },
      verificationDocs: [
        { label: 'Int@j Jordan Tech Cluster Certified', verified: true },
        { label: 'Jordan Central Bank Fintech Regulatory Sandbox Waiver', verified: true },
        { label: 'AWS Sovereign Middle East Cloud Architecture Review', verified: true },
        { label: '3 Enterprise Bank Master Service Agreements', verified: true }
      ],
      matches: [
        { name: 'Oasis500 Venture Network', affinity: '95%', ticket: '$150k' },
        { name: 'Amman Tech Angels Club', affinity: '90%', ticket: '$100k' },
        { name: 'Regional Fintech Syndicate', affinity: '86%', ticket: '$150k' }
      ]
    }
  };

  const activeCaseData = caseStudies[selectedCase];

  return (
    <div className="w-full rounded-[2rem] bg-panel shadow-s3 p-6 sm:p-10">
      {/* Engine Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
        <div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] leading-tight text-ink text-balance">
            {lang === 'ar' 
              ? 'كيف تتحول الفكرة الخام إلى صفقة استثمارية موثوقة'
              : 'Watch How Messy Ideas Become Investable Deals'}
          </h3>
          <p className="text-sm sm:text-base text-dim mt-1 max-w-xl">
            {lang === 'ar'
              ? 'نظام مرئي حي ينقل فرصة العمل من مسودة مبعثرة إلى ملف محقق ومطابق مع مستثمرين وغرفة صفقة مشفرة.'
              : 'A living system that takes unstructured business concepts and visibly moves them to a verified, investable profile connected to vetted capital.'}
          </p>
        </div>

        {/* Case selector & Auto-play controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex items-center p-1 rounded-2xl bg-panel2">
            <button
              onClick={() => setSelectedCase('franchise')}
 className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCase === 'franchise' ? 'bg-panel text-accent shadow-s1' : 'text-dim hover:text-ink'
              }`}
            >
              {t("Food Franchise")}
            </button>
            <button
              onClick={() => setSelectedCase('agritech')}
 className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCase === 'agritech' ? 'bg-panel text-accent shadow-s1' : 'text-dim hover:text-ink'
              }`}
            >
              {t("AgriTech")}
            </button>
            <button
              onClick={() => setSelectedCase('ai')}
 className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCase === 'ai' ? 'bg-panel text-accent shadow-s1' : 'text-dim hover:text-ink'
              }`}
            >
              {t("Enterprise AI")}
            </button>
          </div>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
 className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-chip hover:bg-chip-hi text-xs font-medium text-ink2 transition-colors"
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-accent" /> : <Play className="w-3.5 h-3.5 text-accent" />}
            <span>{isAutoPlaying ? t('Pause Journey') : t('Auto Play')}</span>
          </button>
        </div>
      </div>

      {/* 6-Step Horizontal Progress Bar & Scrubber */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 my-6">
        {JOURNEY_STAGES.map((stage, idx) => {
          const isActive = idx === currentStageIndex;
          const isPast = idx < currentStageIndex;

          return (
            <button
              key={stage.id}
              onClick={() => {
                setCurrentStageIndex(idx);
                setIsAutoPlaying(false);
              }}
 className={`text-start p-3 rounded-xl transition-all cursor-pointer relative overflow-hidden ${
                isActive
                  ? 'bg-panel2 shadow-lg shadow-accent/20 '
                  : isPast
                  ? 'bg-panel2/60 text-ink2 '
                  : 'bg-panel2/30 text-faint '
              }`}
            >
              {/* Active step progress indicator */}
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className={`tabular-nums text-xs ${isActive ? 'text-accent font-bold' : isPast ? 'text-ok' : 'text-faint'}`}>
                  0{stage.number}
                </span>
                {isPast ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-ok" />
                ) : isActive ? (
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                ) : null}
              </div>

              <div className={`text-xs font-semibold truncate ${isActive ? 'text-ink' : isPast ? 'text-ink2' : 'text-dim'}`}>
                {lang === 'ar' ? stage.arabicTitle : stage.title}
              </div>

              <div className="text-xs text-faint truncate mt-0.5">
                {t(stage.badge)}
              </div>

              {/* Bottom active line */}
              {isActive && (
                <div className="absolute bottom-0 start-0 end-0 h-0.5 bg-gradient-to-r from-info to-accent"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Dynamic Stage Canvas: Morphing Opportunity Transformation View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-3xl bg-panel2/70">
        {/* Left Side: Explanatory Context of Current Stage (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>

            <h4 className="text-3xl font-bold tracking-tight text-ink">
              {lang === 'ar' ? activeStage.arabicTitle : activeStage.title}
            </h4>
            <div className="flex items-center gap-2 text-sm text-dim mt-2">
              <span className="text-accent font-medium">{t("Stage")} {activeStage.number} {t("of")} 6</span>
              <span aria-hidden="true">·</span>
              <span className="text-ok font-medium">{t(activeStage.metric)}</span>
            </div>
            <p className="text-sm sm:text-base text-ink2 mt-2 leading-relaxed">
              {lang === 'ar' ? activeStage.arabicSubtext : activeStage.subtext}
            </p>

            {/* Stage Progress Gauge */}
            <div className="mt-6 p-4 rounded-xl bg-panel2/60">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-dim">{t("Trust & Readiness Velocity")}</span>
                <span className="text-accent font-bold tabular-nums">{activeStage.completeness}% {t("Ready")}</span>
              </div>
              <div className="w-full h-2 bg-chip rounded-full overflow-hidden">
                <div
 className="h-full bg-gradient-to-r from-info via-accent to-ok rounded-full transition-all duration-700"
                  style={{ width: `${activeStage.completeness}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs text-dim mt-3 pt-2">
                <span>{t("Verification Authority: Vestra Trust Engine")}</span>
                <span className="text-ink2">{t("Level")} {currentStageIndex + 1} {t("Cleared")}</span>
              </div>
            </div>
          </div>

          {/* Quick Step Navigation */}
          <div className="flex items-center justify-between pt-6 mt-6">
            <button
              onClick={() => {
                setCurrentStageIndex((prev) => (prev > 0 ? prev - 1 : JOURNEY_STAGES.length - 1));
                setIsAutoPlaying(false);
              }}
 className="inline-flex items-center gap-1.5 text-sm text-dim hover:text-ink px-4 py-2 rounded-xl bg-panel2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:-scale-x-100" />
              <span>{t("Previous Stage")}</span>
            </button>
            <button
              onClick={() => {
                setCurrentStageIndex((prev) => (prev + 1) % JOURNEY_STAGES.length);
                setIsAutoPlaying(false);
              }}
 className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hi px-4 py-2 rounded-xl bg-panel2 transition-colors"
            >
              <span>{t("Next Stage")}</span>
              <ArrowRight className="rtl:-scale-x-100 w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Side: The Morphing Live Opportunity Card (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="relative rounded-3xl bg-panel p-6 sm:p-7 shadow-s2 transition-all duration-500">
            {/* Header Lockup of the Morphing Card */}
            <div className="flex items-start justify-between gap-3 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-dim">
                  <span className="text-accent font-medium">{t(activeCaseData.tag)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{t(activeCaseData.location)}</span>
                </div>
                <h5 className="text-lg font-bold text-ink mt-1">
                  {t(activeCaseData.title)}
                </h5>
              </div>

              <div className="px-3 py-1 rounded-md bg-accent/10 text-xs font-semibold text-accent-hi tabular-nums">
                {t(activeStage.badge)}
              </div>
            </div>

            {/* Dynamic Content Morph based on Stage */}
            <div className="py-4 min-h-[220px] flex flex-col justify-center">
              {currentStageIndex === 0 && (
                /* Stage 1: Raw Unstructured Founder Idea */
                <div className="space-y-3">
                  <div className="text-xs text-warn font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-warn"></span>
                    <span>{t("Raw Input / Unstructured Founder Draft")}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-sunken/80 tabular-nums text-xs text-ink2 leading-relaxed">
                    {t(activeCaseData.rawText)}
                  </div>
                  <p className="text-sm text-dim">
                    {t("Traditional directories reject this or bury it in forum noise. Vestra's structuring engine immediately formats it into an institutional prospectus.")}
                  </p>
                </div>
              )}

              {currentStageIndex === 1 && (
                /* Stage 2: Structured Unit Economics & Targets */
                <div className="space-y-3">
                  <div className="text-xs text-accent font-medium flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{t("Institutional Standardized Profile")}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-sunken/80">
                      <span className="text-dim text-xs block">{t("Target Round")}</span>
                      <span className="text-sm font-bold text-ok tabular-nums">{t(activeCaseData.structuredData.targetCapital)}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-sunken/80">
                      <span className="text-dim text-xs block">{t("Current ARR")}</span>
                      <span className="text-sm font-bold text-ink tabular-nums">{t(activeCaseData.structuredData.currentARR)}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-sunken/80">
                      <span className="text-dim text-xs block">{t("EBITDA Margin")}</span>
                      <span className="text-sm font-bold text-accent tabular-nums">{t(activeCaseData.structuredData.ebitda)}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-sunken/80">
                      <span className="text-dim text-xs block">{t("Sector Classification")}</span>
                      <span className="text-sm font-bold text-ink2 truncate">{t(activeCaseData.structuredData.category)}</span>
                    </div>
                  </div>
                  <div className="text-xs text-ink2 bg-sunken/60 p-2.5 rounded-lg">
                    <strong className="text-dim font-medium">{t("Allocation Plan:")}</strong> {t(activeCaseData.structuredData.useOfFunds)}
                  </div>
                </div>
              )}

              {currentStageIndex === 2 && (
                /* Stage 3: Document Verification Checklist */
                <div className="space-y-2.5">
                  <div className="text-xs text-ok font-medium flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t("Four-Point Due Diligence Verification")}</span>
                  </div>
                  <div className="space-y-1.5">
                    {activeCaseData.verificationDocs.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-sunken/70 text-xs">
                        <span className="text-ink2 truncate">{t(doc.label)}</span>
                        <span className="text-ok font-medium text-xs flex items-center gap-1 shrink-0">
                          <Check className="w-3 h-3" />
                          {t("Verified")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStageIndex === 3 && (
                /* Stage 4: Algorithmic Investor Matching */
                <div className="space-y-3">
                  <div className="text-xs text-info font-medium flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{t("Intelligent MENA Investor Matches")}</span>
                  </div>
                  <div className="space-y-2">
                    {activeCaseData.matches.map((match, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-sunken/80 text-xs">
                        <div>
                          <div className="font-semibold text-ink">{t(match.name)}</div>
                          <div className="text-xs text-dim">{t("Typical Ticket:")} {t(match.ticket)}</div>
                        </div>
                        <div className="text-end">
                          <span className="px-2 py-0.5 rounded bg-info/10 text-info tabular-nums font-bold text-xs">
                            {match.affinity} {t("Match")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStageIndex === 4 && (
                /* Stage 5: Encrypted Discussion Channel */
                <div className="space-y-3">
                  <div className="text-xs text-violet font-medium flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t("Confidential Direct Investor Dialogue")}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-sunken space-y-2.5 text-xs">
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-info flex items-center justify-center text-xs font-bold text-on-accent shrink-0">
                        IN
                      </div>
                      <div className="p-2.5 rounded-lg bg-panel2 text-ink2 text-xs">
                        {t("\"We reviewed your audited unit metrics for the Amman flagship. The 31% EBITDA is compelling. We'd like to syndicate a $100k lead ticket.\"")}
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 justify-end">
                      <div className="p-2.5 rounded-lg bg-accent/10 text-accent-hi text-xs text-end">
                        {t("\"Thank you. Cap table and expansion leases are now accessible inside the encrypted Deal Room.\"")}
                      </div>
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-on-accent shrink-0">
                        FD
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStageIndex === 5 && (
                /* Stage 6: The Virtual Deal Room Unlocked */
                <div className="space-y-3">
                  <div className="text-xs text-ok font-medium flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>{t("Encrypted Virtual Deal Room #VC-2026-JO")}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-sunken space-y-2 text-xs">
                    <div className="flex items-center justify-between text-ok font-medium">
                      <span>{t("Term Sheet Status: Issued & Under Legal Review")}</span>
                      <span className="tabular-nums text-ink">{t("$150,000 Committed")}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 text-xs text-dim">
                      <div className="p-2 rounded bg-panel2 text-center">
                        <strong className="text-ink block">{t("SHA Draft")}</strong>
                        <span>{t("Ready")}</span>
                      </div>
                      <div className="p-2 rounded bg-panel2 text-center">
                        <strong className="text-ink block">{t("Cap Table")}</strong>
                        <span>{t("Simulated")}</span>
                      </div>
                      <div className="p-2 rounded bg-panel2 text-center">
                        <strong className="text-ink block">{t("Closing Target")}</strong>
                        <span>{t("14 Days")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer of Card */}
            <div className="pt-3 flex items-center justify-between text-xs text-dim">
              <span>{t("Security: 256-Bit Encrypted Data Room")}</span>
              <button
                onClick={onLaunchDealRoom}
 className="text-accent hover:text-accent-hi font-medium flex items-center gap-1"
              >
                <span>{t("Launch Interactive Deal Room")}</span>
                <ArrowRight className="rtl:-scale-x-100 w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
