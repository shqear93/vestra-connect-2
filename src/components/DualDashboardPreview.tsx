import React, { useState } from 'react';
import { useT } from '../lib/prefs';
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
  const t = useT();
  const [activeRole, setActiveRole] = useState<'founder' | 'investor'>('founder');

  return (
    <div className="w-full rounded-[2rem] bg-panel shadow-s3 overflow-hidden p-6 sm:p-10">
      {/* Top Header & Role Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
        <div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] leading-tight text-ink text-balance">
            {lang === 'ar' ? 'مصممة للطرفين: رواد الأعمال والمستثمرون' : 'Built for Founders & Institutional Capital'}
          </h3>
          <p className="text-sm sm:text-base text-dim mt-1">
            {lang === 'ar' 
              ? 'تابع تقدم التوثيق والمطابقات المباشرة من منظور رائد الأعمال أو استكشف الصفقات وغرف البيانات من منظور المستثمر.'
              : 'Experience the bespoke workflows engineered specifically for founders raising and angels deploying.'}
          </p>
        </div>

        {/* Role toggle button */}
        <div className="flex items-center p-1 rounded-2xl bg-panel2 shrink-0 self-start md:self-center">
          <button
            onClick={() => setActiveRole('founder')}
 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeRole === 'founder'
                ? 'bg-accent/20 text-accent-hi shadow-sm'
                : 'text-dim hover:text-ink'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{t("Founder Workspace")}</span>
          </button>
          <button
            onClick={() => setActiveRole('investor')}
 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeRole === 'investor'
                ? 'bg-accent/20 text-accent-hi shadow-sm'
                : 'text-dim hover:text-ink'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{t("Investor Portal")}</span>
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
              <div className="p-4 rounded-xl bg-panel2/60">
                <span className="text-xs text-dim block">{t("Dossier Completeness")}</span>
                <span className="text-xl font-bold text-accent tabular-nums mt-1 block">{t("94% Certified")}</span>
                <span className="text-xs text-ok flex items-center gap-1 mt-1">
                  <ShieldCheck className="w-3 h-3" />
                  {t("Level 3 Verified")}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-panel2/60">
                <span className="text-xs text-dim block">{t("Investor Matches")}</span>
                <span className="text-xl font-bold text-ink tabular-nums mt-1 block">{t("18 Matched")}</span>
                <span className="text-xs text-dim mt-1">{t("Amman & GCC Syndicates")}</span>
              </div>
              <div className="p-4 rounded-xl bg-panel2/60">
                <span className="text-xs text-dim block">{t("Active Conversations")}</span>
                <span className="text-xl font-bold text-ok tabular-nums mt-1 block">{t("4 Live Threads")}</span>
                <span className="text-xs text-accent mt-1">{t("1 Term Sheet in Review")}</span>
              </div>
              <div className="p-4 rounded-xl bg-panel2/60">
                <span className="text-xs text-dim block">{t("Deal Room Views")}</span>
                <span className="text-xl font-bold text-ink tabular-nums mt-1 block">{t("42 Due Diligence")}</span>
                <span className="text-xs text-dim mt-1">{t("NDA Cleared Only")}</span>
              </div>
            </div>

            {/* Verification Checklist & Live Syndicate Inquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Diligence Checklist */}
              <div className="lg:col-span-6 p-5 rounded-xl bg-panel2/40 space-y-3">
                <div className="flex items-center justify-between text-xs text-ink2 font-semibold pb-2">
                  <span>{t("Founder Diligence Milestones")}</span>
                  <span className="text-ok">{t("4 / 4 Completed")}</span>
                </div>

                {[
                  { name: 'Commercial Register (MIT Jordan #44192)', state: 'Verified by Legal Admin' },
                  { name: 'Bank Statement & Cash Flow Audit', state: 'Deloitte Certified' },
                  { name: 'Founder Identity & Background KYC', state: 'Cleared (Biometric & National ID)' },
                  { name: 'IP Ownership & Patent Assignments', state: 'Jordan Free Zone Registered' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-panel2 text-xs">
                    <span className="text-ink2">{t(item.name)}</span>
                    <span className="text-ok text-xs flex items-center gap-1 shrink-0 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t(item.state)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Active Investor Inquiries */}
              <div className="lg:col-span-6 p-5 rounded-xl bg-panel2/40 space-y-3">
                <div className="flex items-center justify-between text-xs text-ink2 font-semibold pb-2">
                  <span>{t("Inbound Syndicate Interests")}</span>
                  <span className="text-accent">{t("Direct Messages")}</span>
                </div>

                {[
                  { name: 'Amman Angel Network (Health syndicate)', time: '2h ago', message: 'Requested access to 2026 expansion Cap Table.' },
                  { name: 'Levant Ventures Partner', time: '5h ago', message: 'Issued soft term sheet for $100k tranche.' },
                  { name: 'Oasis Impact Fund', time: '1d ago', message: 'Approved NDA. Reviewing JFDA clinical audit.' }
                ].map((inq, i) => (
                  <div key={i} className="p-3 rounded-lg bg-panel2 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-ink">{t(inq.name)}</span>
                      <span className="text-xs text-faint">{t(inq.time)}</span>
                    </div>
                    <p className="text-ink2 text-xs">{t(inq.message)}</p>
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
              <div className="p-4 rounded-xl bg-panel2/60">
                <span className="text-xs text-dim block">{t("Curated Deal Flow")}</span>
                <span className="text-xl font-bold text-ink tabular-nums mt-1 block">{t("8 Opportunities")}</span>
                <span className="text-xs text-accent mt-1">{t("100% Vetted Across Jordan")}</span>
              </div>
              <div className="p-4 rounded-xl bg-panel2/60">
                <span className="text-xs text-dim block">{t("Total Pipeline Value")}</span>
                <span className="text-xl font-bold text-ok tabular-nums mt-1 block">{t("$3.52M USD")}</span>
                <span className="text-xs text-dim mt-1">{t("Seed to Growth")}</span>
              </div>
              <div className="p-4 rounded-xl bg-panel2/60">
                <span className="text-xs text-dim block">{t("Unlocked Deal Rooms")}</span>
                <span className="text-xl font-bold text-accent-hi tabular-nums mt-1 block">{t("3 Active Rooms")}</span>
                <span className="text-xs text-ok mt-1">{t("Full Cap Tables Accessible")}</span>
              </div>
              <div className="p-4 rounded-xl bg-panel2/60">
                <span className="text-xs text-dim block">{t("Average Risk Profile")}</span>
                <span className="text-xl font-bold text-ink2 tabular-nums mt-1 block">{t("Low to Moderate")}</span>
                <span className="text-xs text-dim mt-1">{t("Audited Financials Required")}</span>
              </div>
            </div>

            {/* Recommended Opportunities List */}
            <div className="p-5 rounded-xl bg-panel2/40 space-y-3">
              <div className="flex items-center justify-between text-xs text-ink2 font-semibold pb-2">
                <span>{t("Top Recommended Opportunities for Your Thesis")}</span>
                <span className="text-accent font-normal">{t("Ranked by Matching Affinity")}</span>
              </div>

              <div className="space-y-2">
                {JORDAN_VENTURES.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onOpenProject(p)}
 className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-panel2 cursor-pointer transition-all group"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-dim">
                        <span className="text-accent font-medium">{t(p.category)}</span>
                        <span aria-hidden="true">·</span>
                        <span>{t(p.locationName)}</span>
                      </div>
                      <div className="text-sm font-bold text-ink group-hover:text-accent-hi transition-colors mt-0.5">
                        {p.name}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="text-end">
                        <span className="text-dim block text-xs">{t("Round Size")}</span>
                        <span className="font-bold text-ok tabular-nums">{p.targetCapital}</span>
                      </div>
                      <div className="text-end">
                        <span className="text-dim block text-xs">{t("Affinity Score")}</span>
                        <span className="font-bold text-accent-hi tabular-nums">{p.completeness}% {t("Match")}</span>
                      </div>
                      <span className="p-2 rounded-lg bg-chip text-ink2 group-hover:bg-accent group-hover:text-on-accent transition-colors">
                        <ArrowUpRight className="rtl:-scale-x-100 w-4 h-4" />
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
