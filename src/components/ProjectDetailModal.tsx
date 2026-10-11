import React from 'react';
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
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#0B111E] border border-slate-700 shadow-2xl overflow-hidden my-8">
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
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="text-cyan-400 font-semibold">{project.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {project.locationName}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mt-1">
                {lang === 'ar' ? project.arabicName : project.name}
              </h2>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-xs text-slate-400 block">Round Target</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">
                {project.targetCapital}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Executive Overview */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Executive Summary</h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {lang === 'ar' ? project.arabicSummary : project.summary}
            </p>
          </div>

          {/* Performance & Financial Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[11px] text-slate-400">{m.label}</div>
                <div className="text-base font-bold text-white tabular-nums mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Founder Dossier */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold shrink-0">
              {project.founder.name.charAt(0)}
            </div>
            <div>
              <h5 className="text-sm font-bold text-white">{project.founder.name}</h5>
              <div className="text-xs text-cyan-400">{project.founder.role}</div>
              <p className="text-xs text-slate-300 mt-1">{project.founder.priorBackground}</p>
            </div>
          </div>

          {/* Key Vetted Highlights */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Verified Due Diligence Highlights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {project.keyHighlights.map((hl, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verification badges */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Identity, Commercial Registry & Bank Records Cleared</span>
            </div>
            <div className="text-slate-400 font-mono">
              Risk Profile: <strong className="text-white">{project.riskLevel}</strong> · Completeness: <strong className="text-cyan-400">{project.completeness}%</strong>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
          >
            Back to Map
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenDealRoom(project);
            }}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-950"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Enter Virtual Deal Room</span>
          </button>
        </div>
      </div>
    </div>
  );
};
