import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Users, 
  MessageSquare, 
  Lock, 
  ArrowRight, 
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
    <div className="w-full rounded-2xl bg-[#0B111E] border border-slate-800 shadow-2xl p-6 sm:p-8">
      {/* Engine Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold tracking-wider">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'ar' ? 'محرك رحلة الفرصة الحي' : 'THE OPPORTUNITY JOURNEY ENGINE'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {lang === 'ar' 
              ? 'كيف تتحول الفكرة الخام إلى صفقة استثمارية موثوقة'
              : 'Watch How Messy Ideas Become Investable Deals'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            {lang === 'ar'
              ? 'نظام مرئي حي ينقل فرصة العمل من مسودة مبعثرة إلى ملف محقق ومطابق مع مستثمرين وغرفة صفقة مشفرة.'
              : 'A living system that takes unstructured business concepts and visibly moves them to a verified, investable profile connected to vetted capital.'}
          </p>
        </div>

        {/* Case selector & Auto-play controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setSelectedCase('franchise')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCase === 'franchise' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Food Franchise
            </button>
            <button
              onClick={() => setSelectedCase('agritech')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCase === 'agritech' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              AgriTech
            </button>
            <button
              onClick={() => setSelectedCase('ai')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCase === 'ai' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Enterprise AI
            </button>
          </div>

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-cyan-400" /> : <Play className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{isAutoPlaying ? 'Pause Journey' : 'Auto Play'}</span>
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
              className={`text-left p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                isActive
                  ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                  : isPast
                  ? 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:border-slate-600'
                  : 'bg-slate-900/30 border-slate-800/80 text-slate-500 hover:border-slate-700'
              }`}
            >
              {/* Active step progress indicator */}
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className={`font-mono text-[11px] ${isActive ? 'text-cyan-400 font-bold' : isPast ? 'text-emerald-400' : 'text-slate-500'}`}>
                  0{stage.number}
                </span>
                {isPast ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : isActive ? (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                ) : null}
              </div>

              <div className={`text-xs font-semibold truncate ${isActive ? 'text-white' : isPast ? 'text-slate-300' : 'text-slate-400'}`}>
                {lang === 'ar' ? stage.arabicTitle : stage.title}
              </div>

              <div className="text-[11px] text-slate-500 truncate mt-0.5">
                {stage.badge}
              </div>

              {/* Bottom active line */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Dynamic Stage Canvas: Morphing Opportunity Transformation View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80">
        {/* Left Side: Explanatory Context of Current Stage (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-cyan-400 font-medium">Stage 0{activeStage.number} of 06</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-medium">{activeStage.metric}</span>
            </div>

            <h4 className="text-2xl font-bold text-white mt-1.5">
              {lang === 'ar' ? activeStage.arabicTitle : activeStage.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {lang === 'ar' ? activeStage.arabicSubtext : activeStage.subtext}
            </p>

            {/* Stage Progress Gauge */}
            <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-400">Trust & Readiness Velocity</span>
                <span className="text-cyan-400 font-bold tabular-nums">{activeStage.completeness}% Ready</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${activeStage.completeness}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/60">
                <span>Verification Authority: Vestra Trust Engine</span>
                <span className="text-slate-300">Level {currentStageIndex + 1} Cleared</span>
              </div>
            </div>
          </div>

          {/* Quick Step Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800/80 mt-6">
            <button
              onClick={() => {
                setCurrentStageIndex((prev) => (prev > 0 ? prev - 1 : JOURNEY_STAGES.length - 1));
                setIsAutoPlaying(false);
              }}
              className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800"
            >
              ← Previous Stage
            </button>
            <button
              onClick={() => {
                setCurrentStageIndex((prev) => (prev + 1) % JOURNEY_STAGES.length);
                setIsAutoPlaying(false);
              }}
              className="text-xs text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1"
            >
              <span>Next Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Side: The Morphing Live Opportunity Card (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-[#0A101D] border border-cyan-500/30 p-6 shadow-2xl transition-all duration-500">
            {/* Header Lockup of the Morphing Card */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-cyan-400 font-medium">{activeCaseData.tag}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeCaseData.location}</span>
                </div>
                <h5 className="text-lg font-bold text-white mt-1">
                  {activeCaseData.title}
                </h5>
              </div>

              <div className="px-3 py-1 rounded-md bg-cyan-950/70 border border-cyan-500/40 text-xs font-semibold text-cyan-300 tabular-nums">
                {activeStage.badge}
              </div>
            </div>

            {/* Dynamic Content Morph based on Stage */}
            <div className="py-4 min-h-[220px] flex flex-col justify-center">
              {currentStageIndex === 0 && (
                /* Stage 1: Raw Unstructured Founder Idea */
                <div className="space-y-3">
                  <div className="text-xs text-amber-400 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>Raw Input / Unstructured Founder Draft</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-dashed border-slate-700 font-mono text-xs text-slate-300 leading-relaxed">
                    "{activeCaseData.rawText}"
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Traditional directories reject this or bury it in forum noise. Vestra's structuring engine immediately formats it into an institutional prospectus.
                  </p>
                </div>
              )}

              {currentStageIndex === 1 && (
                /* Stage 2: Structured Unit Economics & Targets */
                <div className="space-y-3">
                  <div className="text-xs text-cyan-400 font-medium flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Institutional Standardized Profile</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                      <span className="text-slate-400 text-[11px] block">Target Round</span>
                      <span className="text-sm font-bold text-emerald-400 tabular-nums">{activeCaseData.structuredData.targetCapital}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                      <span className="text-slate-400 text-[11px] block">Current ARR</span>
                      <span className="text-sm font-bold text-white tabular-nums">{activeCaseData.structuredData.currentARR}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                      <span className="text-slate-400 text-[11px] block">EBITDA Margin</span>
                      <span className="text-sm font-bold text-cyan-400 tabular-nums">{activeCaseData.structuredData.ebitda}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                      <span className="text-slate-400 text-[11px] block">Sector Classification</span>
                      <span className="text-sm font-bold text-slate-200 truncate">{activeCaseData.structuredData.category}</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                    <strong className="text-slate-400 font-medium">Allocation Plan:</strong> {activeCaseData.structuredData.useOfFunds}
                  </div>
                </div>
              )}

              {currentStageIndex === 2 && (
                /* Stage 3: Document Verification Checklist */
                <div className="space-y-2.5">
                  <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Four-Point Due Diligence Verification</span>
                  </div>
                  <div className="space-y-1.5">
                    {activeCaseData.verificationDocs.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
                        <span className="text-slate-300 truncate">{doc.label}</span>
                        <span className="text-emerald-400 font-medium text-[11px] flex items-center gap-1 shrink-0">
                          <Check className="w-3 h-3" />
                          Verified
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStageIndex === 3 && (
                /* Stage 4: Algorithmic Investor Matching */
                <div className="space-y-3">
                  <div className="text-xs text-blue-400 font-medium flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Intelligent MENA Investor Matches</span>
                  </div>
                  <div className="space-y-2">
                    {activeCaseData.matches.map((match, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                        <div>
                          <div className="font-semibold text-white">{match.name}</div>
                          <div className="text-[11px] text-slate-400">Typical Ticket: {match.ticket}</div>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-500/40 text-blue-300 font-mono font-bold text-xs">
                            {match.affinity} Match
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
                  <div className="text-xs text-purple-400 font-medium flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Confidential Direct Investor Dialogue</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                        IN
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs">
                        "We reviewed your audited unit metrics for the Amman flagship. The 31% EBITDA is compelling. We'd like to syndicate a $100k lead ticket."
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 justify-end">
                      <div className="p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-cyan-200 text-xs text-right">
                        "Thank you. Cap table and expansion leases are now accessible inside the encrypted Deal Room."
                      </div>
                      <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                        FD
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStageIndex === 5 && (
                /* Stage 6: The Virtual Deal Room Unlocked */
                <div className="space-y-3">
                  <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Encrypted Virtual Deal Room #VC-2026-JO</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-emerald-300 font-medium">
                      <span>Term Sheet Status: Issued & Under Legal Review</span>
                      <span className="font-mono text-white">$150,000 Committed</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-400">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
                        <strong className="text-white block">SHA Draft</strong>
                        <span>Ready</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
                        <strong className="text-white block">Cap Table</strong>
                        <span>Simulated</span>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
                        <strong className="text-white block">Closing Target</strong>
                        <span>14 Days</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer of Card */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Security: 256-Bit Encrypted Data Room</span>
              <button
                onClick={onLaunchDealRoom}
                className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
              >
                <span>Launch Interactive Deal Room</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
