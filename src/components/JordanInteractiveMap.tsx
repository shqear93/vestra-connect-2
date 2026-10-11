import React, { useState, useEffect, useMemo } from 'react';
import { useT } from '../lib/prefs';
import { JORDAN_VENTURES, JORDAN_CAPITAL_CORRIDORS, VentureProject } from '../data/jordanVentures';
import { GEO_WIDTH, GEO_HEIGHT, GOVERNORATES, DEAD_SEA_PATH, GULF_OF_AQABA_PATH, CITIES, project } from '../data/jordanGeo';
import { 
  Building2, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight, 
  Play, 
  Pause, 
  Compass, 
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';

interface Props {
  onSelectProject?: (project: VentureProject) => void;
  onOpenDealRoom?: (project: VentureProject) => void;
  lang?: 'en' | 'ar';
}

export const JordanInteractiveMap: React.FC<Props> = ({
  onSelectProject,
  onOpenDealRoom,
  lang = 'en'
}) => {
  const t = useT();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('greentech-jordan-valley');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isPlayingMotion, setIsPlayingMotion] = useState<boolean>(true);
  const [motionSpeed, setMotionSpeed] = useState<number>(1);
  const [activeCorridorId, setActiveCorridorId] = useState<string>('all');
  const [travelerProgress, setTravelerProgress] = useState<number>(0);
  const [activeFilterGovernorate, setActiveFilterGovernorate] = useState<string>('all');

  const selectedProject = useMemo(() => {
    return JORDAN_VENTURES.find(p => p.id === selectedProjectId) || JORDAN_VENTURES[0];
  }, [selectedProjectId]);

  const categories = ['All', 'AgriTech', 'MedTech', 'Enterprise SaaS', 'CleanTech', 'Logistics', 'Culinary & Retail'];

  const filteredProjects = useMemo(() => {
    return JORDAN_VENTURES.filter(project => {
      const matchCat = activeCategory === 'All' || project.category === activeCategory;
      const matchGov = activeFilterGovernorate === 'all' || project.governorate.toLowerCase().includes(activeFilterGovernorate.toLowerCase());
      return matchCat && matchGov;
    });
  }, [activeCategory, activeFilterGovernorate]);

  // Motion engine for traveling capital deal packets
  useEffect(() => {
    if (!isPlayingMotion) return;
    const interval = setInterval(() => {
      setTravelerProgress(prev => (prev + 0.008 * motionSpeed) % 1);
    }, 20);
    return () => clearInterval(interval);
  }, [isPlayingMotion, motionSpeed]);

  // Handle project click
  const handleSelect = (project: VentureProject) => {
    setSelectedProjectId(project.id);
    if (onSelectProject) onSelectProject(project);
  };

  // Quadratic curve between two real places, bowed sideways so routes read as arcs.
  const routeGeometry = (from: [number, number], to: [number, number]) => {
    const a = project(from[0], from[1]);
    const b = project(to[0], to[1]);
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const bow = len * 0.16;
    const c = { x: mx - (dy / len) * bow, y: my + (dx / len) * bow };
    const at = (u: number) => ({
      x: (1 - u) * (1 - u) * a.x + 2 * (1 - u) * u * c.x + u * u * b.x,
      y: (1 - u) * (1 - u) * a.y + 2 * (1 - u) * u * c.y + u * u * b.y,
    });
    return { d: `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${c.x.toFixed(1)} ${c.y.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`, at };
  };

  return (
    <div className="relative w-full rounded-[2rem] bg-panel shadow-s3 overflow-hidden">
      {/* Header: title, quiet live status, segmented sector filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 p-6 sm:p-8 pb-5 sm:pb-6">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
            {lang === 'ar' ? 'خريطة توزيع الفرص وتدفق رؤوس الأموال' : 'Dynamic Opportunity & Capital Route Map'}
          </h3>
          <p className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-dim">
            <span className="flex h-2 w-2 relative" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span>{lang === 'ar' ? '8 مشاريع نشطة موثقة' : '8 vetted opportunities'}</span>
            <span>$3.52M {lang === 'ar' ? 'رأس مال معروض' : 'in active flow'}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 rounded-2xl bg-panel2 self-start lg:self-auto lg:max-w-[560px]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-panel text-accent shadow-s1'
                  : 'text-dim hover:text-ink'
              }`}
            >
              {t(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Visual Canvas + Right Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 p-4 sm:p-6 pt-0 sm:pt-0">
        {/* Map Visualization Viewport (cols 1-7) */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center gap-4 p-4 sm:p-6 min-h-[600px] rounded-3xl bg-radial from-panel2 via-sunken to-sunken overflow-hidden select-none">
          
          {/* Subtle Cartographic Coordinate Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60"></div>
          
          {/* Ambient luminous glow in center */}
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-glow-a rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-glow-b rounded-full blur-3xl pointer-events-none"></div>

          {/* Interactive SVG Canvas */}
          <svg
            viewBox={`0 0 ${GEO_WIDTH} ${GEO_HEIGHT}`}
            style={{ direction: 'ltr' }}
            className="w-full max-w-[600px] h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.25)] z-10"
            role="img"
            aria-label={t('Dynamic Opportunity & Capital Route Map')}
          >
            <defs>
              <linearGradient id="jordanTerrain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--panel-2)" />
                <stop offset="100%" stopColor="var(--panel)" />
              </linearGradient>
              <linearGradient id="capitalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="50%" stopColor="var(--info)" />
                <stop offset="100%" stopColor="var(--accent-hi)" />
              </linearGradient>
              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="borderGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Real national outline: glow underlay, then governorate fills whose hairlines show the 12 governorates */}
            <g filter="url(#borderGlow)" opacity="0.55">
              {GOVERNORATES.map((g) => (
                <path key={g.name} d={g.d} fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinejoin="round" />
              ))}
            </g>
            {GOVERNORATES.map((g) => (
              <path key={g.name} d={g.d} fill="url(#jordanTerrain)" stroke="var(--line-2)" strokeWidth="0.7" strokeLinejoin="round" />
            ))}

            {/* Water: Dead Sea and the head of the Gulf of Aqaba */}
            <path d={DEAD_SEA_PATH} fill="var(--accent)" fillOpacity="0.28" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="0.8" />
            <path d={GULF_OF_AQABA_PATH} fill="var(--accent)" fillOpacity="0.22" />
            <text x={project(35.40, 31.45).x - 10} y={project(35.40, 31.45).y} textAnchor="end" fill="var(--faint)" fontSize="9" className="select-none">{t('Dead Sea')}</text>
            <text x={project(34.86, 29.17).x} y={project(34.86, 29.17).y + 12} textAnchor="start" fill="var(--accent)" fontSize="9" className="select-none">{t('Gulf of Aqaba')}</text>

            {/* Reference cities */}
            {CITIES.map((c) => {
              const p = project(c.lonLat[0], c.lonLat[1]);
              return (
                <g key={c.id} className="select-none" pointerEvents="none">
                  <circle cx={p.x} cy={p.y} r="1.8" fill="var(--faint)" />
                  <text
                    x={p.x + c.dx}
                    y={p.y + c.dy}
                    textAnchor={c.anchor}
                    fill={c.strong ? 'var(--ink-2)' : 'var(--faint)'}
                    fontSize={c.strong ? 10 : 9}
                    fontWeight={c.strong ? 600 : 500}
                  >
                    {t(c.label)}
                  </text>
                </g>
              );
            })}

            {/* Capital corridors between real places */}
            {JORDAN_CAPITAL_CORRIDORS.map((corridor) => {
              const isActive = activeCorridorId === 'all' || activeCorridorId === corridor.id;
              const geo = routeGeometry(corridor.fromLonLat, corridor.toLonLat);
              return (
                <g key={corridor.id} className="transition-opacity duration-300">
                  <path d={geo.d} fill="none" stroke="var(--line-2)" strokeWidth="1.6" strokeDasharray="3 4" opacity={isActive ? 0.8 : 0.2} />
                  {isActive && (
                    <path
                      d={geo.d}
                      fill="none"
                      stroke="url(#capitalGradient)"
                      strokeWidth="2"
                      strokeDasharray="7 10"
                      className="animate-dash-flow"
                      filter="url(#glowFilter)"
                      opacity="0.9"
                    />
                  )}
                </g>
              );
            })}

            {/* Deal packets travelling along two corridors */}
            {isPlayingMotion && (() => {
              const main = routeGeometry(JORDAN_CAPITAL_CORRIDORS[0].fromLonLat, JORDAN_CAPITAL_CORRIDORS[0].toLonLat).at(travelerProgress);
              const second = routeGeometry(JORDAN_CAPITAL_CORRIDORS[1].fromLonLat, JORDAN_CAPITAL_CORRIDORS[1].toLonLat).at((travelerProgress + 0.5) % 1);
              return (
                <g>
                  <g transform={`translate(${main.x}, ${main.y})`}>
                    <circle r="10" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5" className="animate-radar" />
                    <circle r="5" fill="var(--accent)" opacity="0.3" />
                    <circle r="3" fill="var(--accent)" filter="url(#glowFilter)" />
                    <circle r="1.4" fill="var(--ink)" />
                    <g transform="translate(9, -7)">
                      <rect x="0" y="0" width="118" height="15" rx="4" fill="var(--panel)" opacity="0.95" />
                      <text x="6" y="10.5" fill="var(--accent)" fontSize="8" fontWeight="600">{t('DEAL IN FLIGHT $600k')}</text>
                    </g>
                  </g>
                  <g transform={`translate(${second.x}, ${second.y})`}>
                    <circle r="2.6" fill="var(--ok)" filter="url(#glowFilter)" />
                    <circle r="1.1" fill="var(--ink)" />
                  </g>
                </g>
              );
            })()}

            {/* Venture nodes at their real coordinates */}
            {filteredProjects.map((project_) => {
              const svgPt = project(project_.lonLat[0], project_.lonLat[1]);
              const isSelected = project_.id === selectedProjectId;
              return (
                <g
                  key={project_.id}
                  onClick={() => handleSelect(project_)}
                  className="cursor-pointer group"
                  transform={`translate(${svgPt.x}, ${svgPt.y})`}
                >
                  {isSelected && (
                    <>
                      <circle r="15" fill="none" stroke="var(--accent)" strokeWidth="1.2" opacity="0.4" className="animate-radar" />
                      <circle r="22" fill="none" stroke="var(--info)" strokeWidth="0.8" opacity="0.25" className="animate-radar" style={{ animationDelay: '1s' }} />
                    </>
                  )}
                  <circle
                    r={isSelected ? 7 : 5.5}
                    fill={isSelected ? 'var(--accent)' : 'var(--panel-2)'}
                    fillOpacity={isSelected ? 0.4 : 1}
                    stroke={isSelected ? 'var(--accent)' : 'var(--faint)'}
                    strokeWidth={isSelected ? 1.8 : 1}
                    className="transition-all duration-200 group-hover:stroke-accent"
                  />
                  <circle r={isSelected ? 3 : 2.2} fill={isSelected ? 'var(--accent)' : 'var(--dim)'} className="transition-colors duration-200 group-hover:fill-accent-hi" />
                  <title>{lang === 'ar' ? project_.arabicName : project_.name}</title>
                </g>
              );
            })}
          </svg>

          {/* Map Controls Floating Bar at bottom of viewport */}
          <div className="relative w-full flex items-center justify-between p-2.5 rounded-xl bg-panel2/90 backdrop-blur-md text-xs text-ink2 z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingMotion(!isPlayingMotion)}
 className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-chip hover:bg-chip-hi text-ink2 transition-colors"
                title={isPlayingMotion ? 'Pause capital flow' : 'Play capital flow'}
              >
                {isPlayingMotion ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-accent" />
                    <span>{t("Pause Flow")}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-accent" />
                    <span>{t("Resume Flow")}</span>
                  </>
                )}
              </button>

              <div className="hidden sm:flex items-center gap-1 text-dim">
                <span className="text-xs">{t("Speed:")}</span>
                {[1, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setMotionSpeed(spd)}
 className={`px-2 py-0.5 rounded text-xs ${
                      motionSpeed === spd ? 'bg-panel text-accent shadow-s1' : 'hover:text-ink'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-dim">
              <span className="inline-block w-2 h-2 rounded-full bg-accent"></span>
              <span>{t("Live Capital Packets")}</span>
              <span className="hidden md:inline text-faint">·</span>
              <span className="hidden md:inline">{t("Click any pin to inspect")}</span>
            </div>
          </div>
        </div>

        {/* Selected Project Inspector Panel (cols 8-12) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-panel2 flex flex-col justify-between">
          <div>
            {/* Top Header & Verification */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-dim">
                  <span className="text-accent font-medium">{t(selectedProject.category)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{t(selectedProject.locationName)}</span>
                </div>
                <h4 className="text-xl font-bold text-ink mt-1 leading-snug">
                  {lang === 'ar' ? selectedProject.arabicName : selectedProject.name}
                </h4>
              </div>

              <div className="text-end shrink-0">
                <div className="text-xs text-dim">{t("Target Capital")}</div>
                <div className="text-lg font-bold text-ok tabular-nums">
                  {selectedProject.targetCapital}
                </div>
              </div>
            </div>

            {/* Project Image Preview with subtle badge */}
            <div className="relative mt-4 h-40 rounded-xl overflow-hidden group">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-overlay via-overlay/40 to-transparent"></div>
              
              <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-ok bg-panel2/80 backdrop-blur-md px-2.5 py-1 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-ok" />
                  <span>{t("Audited Dossier ✓")}</span>
                </div>
                <div className="text-ink2 bg-panel2/80 backdrop-blur-md px-2 py-1 rounded-md tabular-nums">
                  {t(selectedProject.stage)} {t("Round")}
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <p className="mt-4 text-xs text-ink2 leading-relaxed">
              {lang === 'ar' ? selectedProject.arabicSummary : selectedProject.summary}
            </p>

            {/* Four Concrete Financial & Performance Metrics */}
            <div className="grid grid-cols-2 gap-2.5 mt-4">
              {selectedProject.metrics.map((metric, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-chip/40">
                  <div className="text-xs text-dim">{t(metric.label)}</div>
                  <div className="text-sm font-semibold text-ink tabular-nums mt-0.5">{t(metric.value)}</div>
                </div>
              ))}
            </div>

            {/* Due Diligence & Matching Status */}
            <div className="mt-4 p-3 rounded-xl bg-chip/30">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-dim">{t("Profile Completeness")}</span>
                <span className="font-semibold text-accent tabular-nums">{selectedProject.completeness}% {t("Verified")}</span>
              </div>
              <div className="w-full h-1.5 bg-chip rounded-full overflow-hidden">
                <div
 className="h-full bg-gradient-to-r from-info to-accent rounded-full transition-all duration-500"
                  style={{ width: `${selectedProject.completeness}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-dim pt-2">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-accent" />
                  <span>{selectedProject.matchedInvestorsCount} {t("Accredited Matches")}</span>
                </div>
                <span className="text-ink2 font-medium">{t("Risk")}: {t(selectedProject.riskLevel)}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-5 pt-4 flex items-center gap-3">
            <button
              onClick={() => onOpenDealRoom && onOpenDealRoom(selectedProject)}
 className="flex-1 py-2.5 px-4 rounded-xl bg-accent hover:bg-accent-hi text-on-accent font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'دخول غرفة الصفقة الافتراضية' : 'Enter Deal Room Simulation'}</span>
            </button>
            <button
              onClick={() => onSelectProject && onSelectProject(selectedProject)}
 className="py-2.5 px-3 rounded-xl bg-chip hover:bg-chip-hi text-ink2 text-xs transition-colors flex items-center gap-1.5"
              title={t("Full Opportunity Dossier")}
            >
              <span>{lang === 'ar' ? 'التفاصيل' : 'Dossier'}</span>
              <ChevronRight className="rtl:-scale-x-100 w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
