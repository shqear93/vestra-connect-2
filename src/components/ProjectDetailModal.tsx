import React from 'react';
import { useT } from '../lib/prefs';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  TrendingUp, 
  Lock, 
  ExternalLink, 
  CheckCircle2, 
  Building2, 
  DollarSign, 
  FileText 
} from 'lucide-react';
import { VentureProject } from '../data/jordanVentures';

interface Props {
  project: VentureProject | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenDealRoom: (p: VentureProject) => void;
  lang?: 'en' | 'ar';
}

export const ProjectDetailModal: React.FC<Props> = ({
  project,
  isOpen,
  onClose,
  onOpenDealRoom,
  lang = 'en'
}) => {
  const t = useT();
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-sunken/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-panel shadow-2xl overflow-hidden my-8">
        {/* Cover Photo */}
        <div className="relative h-56 sm:h-64 w-full">
          <img
            src={project.image}
            alt={project.name}
 className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B111E] via-[#0B111E]/40 to-transparent"></div>

          <button
            onClick={onClose}
 className="absolute top-4 end-4 p-2 rounded-xl bg-panel2/80 hover:bg-chip text-ink2 hover:text-ink transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 start-6 end-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-ink2">
                <span className="text-accent font-semibold">{t(project.category)}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-dim" />
                  {t(project.locationName)}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-ink mt-1">
                {lang === 'ar' ? project.arabicName : project.name}
              </h2>
            </div>

            <div className="text-start sm:text-end shrink-0">
              <span className="text-xs text-dim block">{t("Round Target")}</span>
              <span className="text-2xl font-bold text-ok tabular-nums">
                {project.targetCapital}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Executive Overview */}
          <div>
            <h4 className="text-sm font-semibold text-dim mb-3">{t("Executive Summary")}</h4>
            <p className="text-sm sm:text-base text-ink2 leading-relaxed">
              {lang === 'ar' ? project.arabicSummary : project.summary}
            </p>
          </div>

          {/* Performance & Financial Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, i) => (
              <div key={i} className="p-3 rounded-xl bg-panel2">
                <div className="text-xs text-dim">{t(m.label)}</div>
                <div className="text-base font-bold text-ink tabular-nums mt-0.5">{t(m.value)}</div>
              </div>
            ))}
          </div>

          {/* Founder Dossier */}
          <div className="p-4 rounded-xl bg-panel2/60 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center text-accent-hi font-bold shrink-0">
              {project.founder.name.charAt(0)}
            </div>
            <div>
              <h5 className="text-sm font-bold text-ink">{project.founder.name}</h5>
              <div className="text-xs text-accent">{t(project.founder.role)}</div>
              <p className="text-sm text-ink2 mt-1">{t(project.founder.priorBackground)}</p>
            </div>
          </div>

          {/* Key Vetted Highlights */}
          <div>
            <h4 className="text-sm font-semibold text-dim mb-3">{t("Verified Due Diligence Highlights")}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {project.keyHighlights.map((hl, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-panel2 text-ink2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-ok shrink-0" />
                  <span>{t(hl)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verification badges */}
          <div className="p-4 rounded-xl bg-panel2/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-ok">
              <ShieldCheck className="w-4 h-4" />
              <span>{t("Identity, Commercial Registry & Bank Records Cleared")}</span>
            </div>
            <div className="text-dim tabular-nums">
              {t("Risk Profile")}: <strong className="text-ink">{t(project.riskLevel)}</strong> · {t("Completeness")}: <strong className="text-accent">{project.completeness}%</strong>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-6 bg-panel2/60 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
 className="px-4 py-2 rounded-xl bg-chip hover:bg-chip-hi text-ink2 text-xs transition-colors"
          >
            {t("Back to Map")}
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenDealRoom(project);
            }}
 className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hi text-on-accent font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-accent/20"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{t("Enter Virtual Deal Room")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
