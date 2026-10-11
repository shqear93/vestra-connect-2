import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  MessageSquare, 
  Lock, 
  FileCheck, 
  ArrowUpRight, 
  BarChart3,
  Search,
  ExternalLink
} from 'lucide-react';
import { JORDAN_VENTURES, VentureProject } from '../data/jordanVentures';

interface Props {
  onOpenProject: (p: VentureProject) => void;
  lang?: 'en' | 'ar';
}

export const DualDashboardPreview: React.FC<Props> = ({ onOpenProject, lang = 'en' }) => {
  const [activeRole, setActiveRole] = useState<'founder' | 'investor'>('founder');

  return (
    <div className="w-full rounded-2xl bg-[#0B111E] border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8">
      {/* Top Header & Role Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs text-cyan-400 font-semibold tracking-wider">
            {lang === 'ar' ? 'معاينة لوحات التحكم التفاعلية' : 'DUAL ECOSYSTEM CONTROL ROOM'}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {lang === 'ar' ? 'مصممة للطرفين: رواد الأعمال والمستثمرون' : 'Built for Founders & Institutional Capital'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {lang === 'ar' 
              ? 'تابع تقدم التوثيق والمطابقات المباشرة من منظور رائد الأعمال أو استكشف الصفقات وغرف البيانات من منظور المستثمر.'
              : 'Experience the bespoke workflows engineered specifically for founders raising and angels deploying.'}
          </p>
        </div>

        {/* Role toggle button */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shrink-0 self-start md:self-center">
          <button
            onClick={() => setActiveRole('founder')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeRole === 'founder'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Founder Workspace</span>
          </button>
          <button
            onClick={() => setActiveRole('investor')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeRole === 'investor'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Investor Portal</span>
          </button>
        </div>
      </div>

      {/* Main Terminal Viewport */}
      <div className="mt-6">
        {activeRole === 'founder' ? (
          /* Founder Dashboard View */
          <div className="space-y-6">
            {/* Top founder stat row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400 block">Dossier Completeness</span>
                <span className="text-xl font-bold text-cyan-400 font-mono mt-1 block">94% Certified</span>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                  <ShieldCheck className="w-3 h-3" />
                  Level 3 Verified
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400 block">Investor Matches</span>
                <span className="text-xl font-bold text-white font-mono mt-1 block">18 Matched</span>
                <span className="text-[11px] text-slate-400 mt-1">Amman & GCC Syndicates</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400 block">Active Conversations</span>
                <span className="text-xl font-bold text-emerald-400 font-mono mt-1 block">4 Live Threads</span>
                <span className="text-[11px] text-cyan-400 mt-1">1 Term Sheet in Review</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400 block">Deal Room Views</span>
                <span className="text-xl font-bold text-white font-mono mt-1 block">42 Due Diligence</span>
                <span className="text-[11px] text-slate-400 mt-1">NDA Cleared Only</span>
              </div>
            </div>

            {/* Verification Checklist & Live Syndicate Inquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Diligence Checklist */}
              <div className="lg:col-span-6 p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300 font-semibold pb-2 border-b border-slate-800">
                  <span>Founder Diligence Milestones</span>
                  <span className="text-emerald-400">4 / 4 Completed</span>
                </div>

                {[
                  { name: 'Commercial Register (MIT Jordan #44192)', state: 'Verified by Legal Admin' },
                  { name: 'Bank Statement & Cash Flow Audit', state: 'Deloitte Certified' },
                  { name: 'Founder Identity & Background KYC', state: 'Cleared (Biometric & National ID)' },
                  { name: 'IP Ownership & Patent Assignments', state: 'Jordan Free Zone Registered' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-slate-200">{item.name}</span>
                    <span className="text-emerald-400 text-[11px] flex items-center gap-1 shrink-0 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {item.state}
                    </span>
                  </div>
                ))}
              </div>

              {/* Active Investor Inquiries */}
              <div className="lg:col-span-6 p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300 font-semibold pb-2 border-b border-slate-800">
                  <span>Inbound Syndicate Interests</span>
                  <span className="text-cyan-400">Direct Messages</span>
                </div>

                {[
                  { name: 'Amman Angel Network (Health syndicate)', time: '2h ago', message: 'Requested access to 2026 expansion Cap Table.' },
                  { name: 'Levant Ventures Partner', time: '5h ago', message: 'Issued soft term sheet for $100k tranche.' },
                  { name: 'Oasis Impact Fund', time: '1d ago', message: 'Approved NDA. Reviewing JFDA clinical audit.' }
                ].map((inq, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{inq.name}</span>
                      <span className="text-[10px] text-slate-500">{inq.time}</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">{inq.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Investor Dashboard View */
          <div className="space-y-6">
            {/* Top investor stat row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400 block">Curated Deal Flow</span>
                <span className="text-xl font-bold text-white font-mono mt-1 block">8 Opportunities</span>
                <span className="text-[11px] text-cyan-400 mt-1">100% Vetted Across Jordan</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400 block">Total Pipeline Value</span>
                <span className="text-xl font-bold text-emerald-400 font-mono mt-1 block">$3.52M USD</span>
                <span className="text-[11px] text-slate-400 mt-1">Seed to Growth</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400 block">Unlocked Deal Rooms</span>
                <span className="text-xl font-bold text-cyan-300 font-mono mt-1 block">3 Active Rooms</span>
                <span className="text-[11px] text-emerald-400 mt-1">Full Cap Tables Accessible</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400 block">Average Risk Profile</span>
                <span className="text-xl font-bold text-slate-200 font-mono mt-1 block">Low to Moderate</span>
                <span className="text-[11px] text-slate-400 mt-1">Audited Financials Required</span>
              </div>
            </div>

            {/* Recommended Opportunities List */}
            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300 font-semibold pb-2 border-b border-slate-800">
                <span>Top Recommended Opportunities for Your Thesis</span>
                <span className="text-cyan-400 font-normal">Ranked by Matching Affinity</span>
              </div>

              <div className="space-y-2">
                {JORDAN_VENTURES.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onOpenProject(p)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all group"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="text-cyan-400 font-medium">{p.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{p.locationName}</span>
                      </div>
                      <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                        {p.name}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="text-right">
                        <span className="text-slate-400 block text-[11px]">Round Size</span>
                        <span className="font-bold text-emerald-400 font-mono">{p.targetCapital}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[11px]">Affinity Score</span>
                        <span className="font-bold text-cyan-300 font-mono">{p.completeness}% Match</span>
                      </div>
                      <span className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
