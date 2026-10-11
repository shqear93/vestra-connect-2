import React, { useState, useEffect, useMemo } from 'react';
import { useT } from '../lib/prefs';
import { JORDAN_VENTURES, JORDAN_CAPITAL_CORRIDORS, VentureProject } from '../data/jordanVentures';
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

  // Convert percentage coordinates (x,y in 0-100) to SVG coordinate box (400 x 420)
  const getSvgCoords = (coords: { x: number; y: number }) => {
    return {
      x: (coords.x / 100) * 360 + 20,
      y: (coords.y / 100) * 380 + 20
    };
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
        <div className="lg:col-span-7 relative flex items-center justify-center p-4 sm:p-6 min-h-[540px] rounded-3xl bg-radial from-panel2 via-sunken to-sunken overflow-hidden select-none">
          
          {/* Subtle Cartographic Coordinate Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60"></div>
          
          {/* Ambient luminous glow in center */}
          <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-glow-a rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-glow-b rounded-full blur-3xl pointer-events-none"></div>

          {/* Interactive SVG Canvas */}
          <svg
            viewBox="0 0 400 420"
 style={{ direction: 'ltr' }} className="w-full max-w-[640px] h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.25)] z-10"
          >
            <defs>
              {/* Linear gradient for Jordan terrain */}
              <linearGradient id="jordanTerrain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--panel-2)" />
                <stop offset="60%" stopColor="var(--panel)" />
                <stop offset="100%" stopColor="var(--sunken)" />
              </linearGradient>

              {/* Glowing stroke for active corridors */}
              <linearGradient id="capitalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="50%" stopColor="var(--info)" />
                <stop offset="100%" stopColor="var(--accent-hi)" />
              </linearGradient>

              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Accurate stylized Jordan National Boundary Vector */}
            {/* Jordan has a distinctive panhandle in the northeast, Syrian border to north, Dead Sea/Jordan Valley to west, Aqaba at tip south, and eastern borders with Saudi Arabia */}
            <path
              d="M 125 45 
                 L 220 40 
                 L 275 35 
                 L 350 48 
                 L 380 95 
                 L 310 140 
                 L 280 200 
                 L 240 270 
                 L 190 340 
                 L 90 395 
                 L 70 375 
                 L 95 320 
                 L 105 260 
                 L 115 195 
                 L 110 145 
                 L 115 105 
                 L 125 45 Z"
              fill="url(#jordanTerrain)"
              stroke="var(--line-2)"
              strokeWidth="1.5"
              strokeLinejoin="round"
 className="transition-colors duration-300"
            />

            {/* Dead Sea Water Feature (West of Amman / Madaba) */}
            <path
              d="M 112 165 C 114 185, 114 205, 110 225 C 107 215, 107 185, 112 165 Z"
              fill="var(--accent)"
              fillOpacity="0.3"
              stroke="var(--accent)"
              strokeWidth="1"
            />
            <text x="62" y="200" fill="var(--faint)" fontSize="8" fontFamily="sans-serif" className="select-none">{t("Dead Sea")}</text>

            {/* Gulf of Aqaba Water Feature at Southern tip */}
            <path
              d="M 70 375 L 90 395 L 65 410 L 50 385 Z"
              fill="var(--accent)"
              fillOpacity="0.25"
            />
            <text x="62" y="396" fill="var(--accent)" fontSize="8" fontFamily="sans-serif" className="select-none">{t("Gulf of Aqaba")}</text>

            {/* Regional Governorate Reference Guides & Internal Hairlines */}
            <path d="M 125 45 L 140 120 L 160 145 L 240 270" stroke="var(--line-2)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" fill="none" />
            <path d="M 160 145 L 110 145" stroke="var(--line-2)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" fill="none" />
            <path d="M 160 145 L 310 140" stroke="var(--line-2)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" fill="none" />

            {/* City Regional Labels */}
            <text x="180" y="180" fill="var(--dim)" fontSize="10" fontWeight="600" letterSpacing="0.5">{t("AMMAN")}</text>
            <text x="152" y="84" fill="var(--faint)" fontSize="9">{t("IRBID")}</text>
            <text x="198" y="132" fill="var(--faint)" fontSize="9">{t("ZARQA")}</text>
            <text x="100" y="369" fill="var(--accent)" fontSize="9" fontWeight="600">{t("AQABA")}</text>
            <text x="230" y="108" fill="var(--faint)" fontSize="9">{t("MAFRAQ")}</text>
            <text x="70" y="136" fill="var(--faint)" fontSize="9" textAnchor="start">{t("AS-SALT")}</text>

            {/* Animated Capital & Deal Corridors */}
            {JORDAN_CAPITAL_CORRIDORS.map((corridor) => {
              const isActive = activeCorridorId === 'all' || activeCorridorId === corridor.id;
              return (
                <g key={corridor.id} className="transition-opacity duration-300">
                  {/* Subtle background route */}
                  <path
                    d={corridor.pathD}
                    fill="none"
                    stroke="var(--line-2)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity={isActive ? 0.7 : 0.2}
                  />

                  {/* Luminous flowing animated trajectory */}
                  {isActive && (
                    <path
                      d={corridor.pathD}
                      fill="none"
                      stroke="url(#capitalGradient)"
                      strokeWidth="2.5"
                      strokeDasharray="8 12"
 className="animate-dash-flow"
                      filter="url(#glowFilter)"
                      opacity="0.85"
                    />
                  )}
                </g>
              );
            })}

            {/* Moving Deal Flow Courier / Voyager Orb that travels across the network */}
            {isPlayingMotion && (
              <g>
                {/* Calculate position along main corridor (Amman to Aqaba or Jordan Valley to Amman) */}
                {/* SVG path: M 160 148 C 145 220, 95 300, 76 364 */}
                {(() => {
                  // Parametric Bezier formula for Amman to Aqaba corridor
                  const u = travelerProgress;
                  // Bezier P0=(160,148), P1=(145,220), P2=(95,300), P3=(76,364)
                  const cx = Math.pow(1 - u, 3) * 160 + 3 * Math.pow(1 - u, 2) * u * 145 + 3 * (1 - u) * Math.pow(u, 2) * 95 + Math.pow(u, 3) * 76;
                  const cy = Math.pow(1 - u, 3) * 148 + 3 * Math.pow(1 - u, 2) * u * 220 + 3 * (1 - u) * Math.pow(u, 2) * 300 + Math.pow(u, 3) * 364;

                  return (
                    <g transform={`translate(${cx}, ${cy})`}>
                      {/* Pulse ring around the moving deal packet */}
                      <circle r="12" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.6" className="animate-ping" />
                      <circle r="7" fill="var(--accent)" opacity="0.3" />
                      <circle r="4" fill="var(--accent)" filter="url(#glowFilter)" />
                      <circle r="2" fill="var(--ink)" />

                      {/* Moving label tooltip */}
                      <g transform="translate(10, -8)">
                        <rect x="0" y="0" width="124" height="15" rx="3" fill="var(--panel)" stroke="var(--accent)" strokeWidth="0.8" opacity="0.95" />
                        <text x="5" y="10" fill="var(--accent)" fontSize="8" fontWeight="600" fontFamily="sans-serif">
                          {t("DEAL IN FLIGHT $600k")}
                        </text>
                      </g>
                    </g>
                  );
                })()}

                {/* Second traveling packet along Jordan Valley -> Amman */}
                {(() => {
                  const t2 = (travelerProgress + 0.5) % 1;
                  // Path: M 124 144 C 138 140, 155 142, 168 136
                  const cx2 = (1 - t2) * 124 + t2 * 168;
                  const cy2 = (1 - t2) * 144 + t2 * 136;

                  return (
                    <g transform={`translate(${cx2}, ${cy2})`}>
                      <circle r="3" fill="var(--ok)" filter="url(#glowFilter)" />
                      <circle r="1.5" fill="var(--ink)" />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* Interactive Venture Project Nodes on the Map */}
            {filteredProjects.map((project) => {
              const svgPt = getSvgCoords(project.coordinates);
              const isSelected = project.id === selectedProjectId;

              return (
                <g
                  key={project.id}
                  onClick={() => handleSelect(project)}
 className="cursor-pointer group"
                  transform={`translate(${svgPt.x}, ${svgPt.y})`}
                >
                  {/* Outer pulsating radar wave for selected project */}
                  {isSelected && (
                    <>
                      <circle r="18" fill="none" stroke="var(--accent)" strokeWidth="1.2" opacity="0.4" className="animate-radar" />
                      <circle r="26" fill="none" stroke="var(--info)" strokeWidth="0.8" opacity="0.2" className="animate-radar" style={{ animationDelay: '1s' }} />
                    </>
                  )}

                  {/* Node aura */}
                  <circle
                    r={isSelected ? 10 : 7}
                    fill={isSelected ? '#0284C7' : '#1E293B'}
                    fillOpacity={isSelected ? 0.4 : 0.8}
                    stroke={isSelected ? '#38BDF8' : '#475569'}
                    strokeWidth={isSelected ? 2 : 1}
 className="transition-all duration-200 group-hover:stroke-accent group-hover:scale-125"
                  />

                  {/* Core glowing center point */}
                  <circle
                    r={isSelected ? 4 : 3}
                    fill={isSelected ? '#38BDF8' : '#94A3B8'}
 className="transition-colors duration-200 group-hover:fill-accent-hi"
                  />

                  {/* Micro label above node on hover or when selected */}
                  {(isSelected) && (
                    <g transform="translate(0, -34)">
                      <rect
                        x="-48"
                        y="-12"
                        width="96"
                        height="18"
                        rx="4"
                        fill="var(--panel)"
                        stroke="var(--accent)"
                        strokeWidth="1"
 className="shadow-xl"
                      />
                      <text
                        x="0"
                        y="0"
                        textAnchor="middle"
                        fill="var(--ink)"
                        fontSize="8.5"
                        fontWeight="600"
                        fontFamily="sans-serif"
                      >
                        {project.targetCapital} · {t(project.stage)}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Map Controls Floating Bar at bottom of viewport */}
          <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between p-2.5 rounded-xl bg-panel2/90 backdrop-blur-md text-xs text-ink2 z-20">
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
