import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Users, 
  ChevronRight, 
  Globe2, 
  Layers, 
  Compass, 
  Zap, 
  Briefcase,
  Sliders,
  DollarSign
} from 'lucide-react';
import { JORDAN_VENTURES, VentureProject } from './data/jordanVentures';
import { JordanInteractiveMap } from './components/JordanInteractiveMap';
import { OpportunityJourneyEngine } from './components/OpportunityJourneyEngine';
import { DualDashboardPreview } from './components/DualDashboardPreview';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { DealRoomModal } from './components/DealRoomModal';
import { SubmitOpportunityModal } from './components/SubmitOpportunityModal';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<VentureProject | null>(null);
  const [selectedProjectForDealRoom, setSelectedProjectForDealRoom] = useState<VentureProject | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [activeProjects, setActiveProjects] = useState<VentureProject[]>(JORDAN_VENTURES);

  // Handle new venture added dynamically via intake modal
  const handleAddNewVenture = (newProj: VentureProject) => {
    setActiveProjects(prev => [newProj, ...prev]);
    setSelectedProjectForDetail(newProj);
  };

  const handleOpenDealRoomFromAnywhere = (proj?: VentureProject) => {
    const target = proj || activeProjects[0];
    setSelectedProjectForDealRoom(target);
  };

  return (
    <div className={`min-h-screen bg-[#080C14] text-slate-100 flex flex-col ${lang === 'ar' ? 'font-sans' : 'font-sans'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* 
        SECTION 1: TOP BAR CONTRACT 
        [Brand title, one line] — [4–5 nav links, 1–2 word labels, single-line] — [1 primary action]
      */}
      <header className="sticky top-0 z-40 bg-[#080C14]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span>Vestra Connect</span>
          </a>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
            <a href="#jordan-map" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'خريطة الأردن' : 'Jordan Network'}
            </a>
            <a href="#journey-engine" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'محرك الرحلة' : 'Journey Engine'}
            </a>
            <a href="#marketplace" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'الفرص الموثقة' : 'Vetted Deals'}
            </a>
            <a href="#trust-system" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'نظام الثقة' : 'Trust Engine'}
            </a>
            <a href="#dashboards" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'لوحات التحكم' : 'Workspaces'}
            </a>
          </nav>

          {/* Zone 3: 1 primary action & language toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Toggle Language"
            >
              {lang === 'en' ? 'عربي' : 'English'}
            </button>

            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-950 whitespace-nowrap shrink-0"
            >
              {lang === 'ar' ? 'قدّم فرصة استثمارية' : 'Submit Opportunity'}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN VIEWPORT */}
      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden border-b border-slate-800/80">
          {/* Subtle architectural ambient backdrop */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-30 overflow-hidden">
            <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px]"></div>
            <div className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-cyan-500/15 rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Proposition and Action */}
              <div className="lg:col-span-7 space-y-6">
                {/* Quiet 1-line text kicker */}
                <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>{lang === 'ar' ? 'منصة الصفقات والاستثمار الأولى في الأردن والشرق الأوسط' : 'JORDAN & MENA VENTURE DEAL NETWORK'}</span>
                </div>

                {/* Primary Hero Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
                  {lang === 'ar' 
                    ? 'حوّل الأفكار الواعدة إلى فرص استثمارية موثوقة'
                    : 'Turn Promising Ideas into Trusted Investment Opportunities.'}
                </h1>

                {/* Subtitle / Value Proposition */}
                <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  {lang === 'ar'
                    ? 'تساعد Vestra Connect المؤسسين وأصحاب الأعمال والمستثمرين على الانتقال من فكرة خام إلى محادثات استثمارية جادة عبر التحقق، والملفات المنظّمة، والمطابقة الذكية، وغرف الصفقات الآمنة.'
                    : 'Vestra Connect moves founders and capital from raw, messy business ideas to verified, investable opportunities through standardized profiles, intelligent matchmaking, and bank-grade deal rooms.'}
                </p>

                {/* Single Primary Decision Block */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#jordan-map"
                    className="px-5 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-950 flex items-center gap-2"
                  >
                    <span>{lang === 'ar' ? 'استكشف شبكة الأردن التفاعلية' : 'Explore Jordan Live Deals'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2"
                  >
                    <Briefcase className="w-4 h-4 text-cyan-400" />
                    <span>{lang === 'ar' ? 'هيكلة فكرة مؤسس' : 'Structure a Founder Idea'}</span>
                  </button>
                </div>

                {/* Proof Adjacency: 4-Metric Proof Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
                  <div>
                    <span className="text-xs text-slate-400 block">{lang === 'ar' ? 'رأس المال المدار' : 'Total Deal Flow'}</span>
                    <span className="text-xl sm:text-2xl font-bold text-white font-mono mt-0.5 block">$14.2M</span>
                    <span className="text-[11px] text-slate-500">{lang === 'ar' ? 'عبر 8 محافظات' : 'Across 8 Governorates'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">{lang === 'ar' ? 'المشاريع المحققة' : 'Vetted Ventures'}</span>
                    <span className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono mt-0.5 block">18 Live</span>
                    <span className="text-[11px] text-slate-500">{lang === 'ar' ? 'تدقيق Deloitte وJFDA' : 'Deloitte & MIT Audited'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">{lang === 'ar' ? 'شبكة المستثمرين' : 'Accredited Angels'}</span>
                    <span className="text-xl sm:text-2xl font-bold text-white font-mono mt-0.5 block">140+</span>
                    <span className="text-[11px] text-slate-500">{lang === 'ar' ? 'عمان ودول الخليج' : 'Amman & GCC Funds'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">{lang === 'ar' ? 'معدل التوثيق' : 'Due Diligence'}</span>
                    <span className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono mt-0.5 block">100%</span>
                    <span className="text-[11px] text-slate-500">{lang === 'ar' ? 'فحص يدوي كامل' : 'Zero Unvetted Listings'}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Impact Visual Asset (Amman Skyline with Luminous Deal Anchor) */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl group">
                  <div className="aspect-[16/10] w-full">
                    <img
                      src="/src/assets/images/hero_jordan_venture_1791711973387.jpg"
                      alt="Amman Modern Venture Architecture and Skyline"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                  {/* High-Impact Focal Overlay Card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="font-semibold text-white">Active Amman Deal Hub</span>
                      </div>
                      <span className="text-emerald-400 font-mono font-bold">$750k Series A</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-1">
                      King Hussein Business Park & Abdali Medical District connecting capital to regional exports.
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* TRUST SIGNALS BANNER */}
        <section className="py-6 border-b border-slate-800 bg-slate-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-300 font-medium">{lang === 'ar' ? 'مؤسسون موثقون' : 'Verified Founders'}</span>
                <span className="text-slate-600">·</span>
                <span>{lang === 'ar' ? 'فحص السجل التجاري الأردني' : 'Jordan MIT Registered'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-300 font-medium">{lang === 'ar' ? 'مستثمرون مختارون' : 'Curated Investors'}</span>
                <span className="text-slate-600">·</span>
                <span>{lang === 'ar' ? 'مطابقة حسب شهية المخاطرة' : 'Thesis-Driven Matching'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-300 font-medium">{lang === 'ar' ? 'غرف صفقات مشفرة' : 'Encrypted Deal Rooms'}</span>
                <span className="text-slate-600">·</span>
                <span>{lang === 'ar' ? 'حماية بيانات 256-Bit' : 'Bank-Grade Access Control'}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-300 font-medium">{lang === 'ar' ? 'مراجعة يدوية وإشراف' : 'Manual Admin Review'}</span>
                <span className="text-slate-600">·</span>
                <span>{lang === 'ar' ? 'منع العشوائية والإعلانات' : 'No Unvetted Directory Clutter'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 
          CORE HIGHLIGHT SECTION: 
          INTERACTIVE JORDAN OPPORTUNITY MAP WITH MOVING CAPITAL PACKETS 
        */}
        <section id="jordan-map" className="py-20 border-b border-slate-800 bg-gradient-to-b from-[#080C14] via-[#090F1C] to-[#080C14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-2xl">
              <div className="text-xs text-cyan-400 font-semibold tracking-wider">
                {lang === 'ar' ? 'الشبكة الجغرافية التفاعلية' : 'NATIONAL VENTURE TOPOLOGY'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {lang === 'ar' 
                  ? 'خريطة الأردن الذكية: نقاط المشاريع وحركة الصفقات الحية' 
                  : 'Live Jordan Opportunity & Capital Flow Network'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {lang === 'ar'
                  ? 'شاهد كيف تتوزع المشاريع الريادية في عمان، إربد، وادي الأردن، العقبة، المفرق، والسلط، وتتبع حركة رؤوس الأموال ومسارات الاستثمار بين مراكز التمويل والمشاريع الحية.'
                  : 'Explore active vetted ventures across Amman, Irbid, the Jordan Valley, Aqaba, Mafraq, and As-Salt. Watch live capital packets traverse real economic and syndication corridors.'}
              </p>
            </div>

            {/* The interactive Jordan map component */}
            <JordanInteractiveMap
              onSelectProject={(p) => setSelectedProjectForDetail(p)}
              onOpenDealRoom={(p) => handleOpenDealRoomFromAnywhere(p)}
              lang={lang}
            />
          </div>
        </section>

        {/* 
          SIGNATURE CONCEPT SECTION: 
          THE OPPORTUNITY JOURNEY ENGINE (PDF page 3)
        */}
        <section id="journey-engine" className="py-20 border-b border-slate-800 bg-[#080C14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <OpportunityJourneyEngine
              lang={lang}
              onLaunchDealRoom={() => handleOpenDealRoomFromAnywhere()}
            />
          </div>
        </section>

        {/* 
          MARKETPLACE PREVIEW SECTION:
          CURATED OPPORTUNITY SHOWCASE CARDS (PDF page 4 item 07)
        */}
        <section id="marketplace" className="py-20 border-b border-slate-800 bg-slate-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-xs text-cyan-400 font-semibold tracking-wider">
                  {lang === 'ar' ? 'سوق الفرص المختارة' : 'CURATED VENTURE PIPELINE'}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  {lang === 'ar' ? 'فرص استثمارية استثنائية جاهزة للدخول' : 'High-Conviction Investment Opportunities'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                  {lang === 'ar'
                    ? 'كل فرصة تمر عبر فحص السجل التجاري، مراجعة القوائم المالية، وفحص الهوية قبل وصولها إلى المستثمرين.'
                    : 'Every listing undergoes rigorous document verification, financial audits, and management review before opening for syndication.'}
                </p>
              </div>

              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 self-start sm:self-auto"
              >
                <span>{lang === 'ar' ? 'عرض كافة الفرص المتاحة' : 'Submit Your Venture to Pipeline'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Grid of 4 Curated Opportunity Cards with Real Imagery */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {activeProjects.slice(0, 4).map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl bg-[#0B111E] border border-slate-800 hover:border-cyan-500/50 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedProjectForDetail(project)}
                >
                  <div>
                    {/* Visual Card Media */}
                    <div className="relative h-44 w-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B111E] via-transparent to-transparent"></div>
                      
                      <div className="absolute top-3 left-3 px-2 py-1 rounded bg-slate-900/80 backdrop-blur-md text-[11px] font-medium text-cyan-300 border border-slate-700">
                        {project.category}
                      </div>

                      <div className="absolute top-3 right-3 px-2 py-1 rounded bg-slate-900/80 backdrop-blur-md text-[11px] font-mono text-emerald-400 border border-slate-700">
                        {project.targetCapital}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-3">
                      <div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span className="truncate">{project.locationName}</span>
                        </div>
                        <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mt-1">
                          {lang === 'ar' ? project.arabicName : project.name}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {lang === 'ar' ? project.arabicSummary : project.summary}
                      </p>

                      {/* Clean Unboxed Metadata with · separator (Zero-Pill discipline) */}
                      <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                        <span>{project.stage}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-400 font-medium">{project.completeness}% Verified</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.matchedInvestorsCount} Matches</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Action */}
                  <div className="p-4 pt-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDealRoomFromAnywhere(project);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 text-xs font-semibold border border-slate-800 hover:border-cyan-400 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Lock className="w-3 h-3" />
                      <span>{lang === 'ar' ? 'معاينة غرفة الصفقة' : 'View Deal Room'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 
          THE TRUST ENGINE SECTION (PDF page 4 item 08)
        */}
        <section id="trust-system" className="py-20 border-b border-slate-800 bg-[#080C14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl">
              <div className="text-xs text-cyan-400 font-semibold tracking-wider">
                {lang === 'ar' ? 'هندسة الموثوقية' : 'THE TRUST ENGINE'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {lang === 'ar' ? 'الثقة تُبنى قبل أي تعارف أو استثمار' : 'Trust is Established Before the First Handshake'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {lang === 'ar'
                  ? 'نظام خماسي المراحل يحمي وقت المؤسس ورأس مال المستثمر من خلال التحقق القانوني، تدقيق الحسابات، وتقييم المخاطر المستقل.'
                  : 'A 5-layer verification framework that safeguards founder intellectual property while delivering institutional-grade clarity to angel syndicates and venture funds.'}
              </p>
            </div>

            {/* Asymmetric Bento-Grid for Capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl bg-[#0B111E] border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">01. Biometric & Commercial Verification</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Direct sync with the Hashemite Kingdom's Ministry of Industry & Trade (MIT) commercial registry. Real founder identity, shareholder register, and credit status verified.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B111E] border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">02. Independent Financial Audit</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  24-month bank statement verification, certified EBITDA calculations, lease checks, and unit-level economics verified by accredited accounting partners.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B111E] border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">03. Controlled Virtual Deal Rooms</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  No public leak of pitch decks or cap tables. Data rooms unlock only upon mutual opt-in, investor thesis validation, and bilateral NDA execution.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 
          DUAL DASHBOARDS PREVIEW SECTION (PDF page 4 item 11)
        */}
        <section id="dashboards" className="py-20 border-b border-slate-800 bg-slate-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DualDashboardPreview
              onOpenProject={(p) => setSelectedProjectForDetail(p)}
              lang={lang}
            />
          </div>
        </section>

        {/* 
          ECOSYSTEM CREDIBILITY & TESTIMONIALS (PDF page 4 item 12)
        */}
        <section className="py-20 border-b border-slate-800 bg-[#080C14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-2xl">
              <div className="text-xs text-cyan-400 font-semibold tracking-wider">
                {lang === 'ar' ? 'شهادات رواد الأعمال والمستثمرين' : 'ECOSYSTEM PROOF'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {lang === 'ar' ? 'أصوات من بيئة ريادة الأعمال الأردنية' : 'Backed by Jordan’s Most Serious Builders & Angels'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl bg-[#0B111E] border border-slate-800 space-y-4">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "Before Vestra Connect, pitching our Jordan Valley agritech expansion meant sending pitch decks into WhatsApp voids. Vestra structured our 14 dunums into an institutional format; we closed our $420k growth tranche in 21 days."
                </p>
                <div className="pt-3 border-t border-slate-800 text-xs">
                  <div className="font-bold text-white">Tariq Al-Muhtaseb</div>
                  <div className="text-slate-400 text-[11px]">Co-founder, Wadi Verdant AgriTech · Jordan Valley</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B111E] border border-slate-800 space-y-4">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "As an angel syndicate lead in Amman, we filter 40 messy decks a month. Vestra eliminates the noise. Every deal comes with audited commercial registration, vetted cap tables, and clean risk ratings."
                </p>
                <div className="pt-3 border-t border-slate-800 text-xs">
                  <div className="font-bold text-white">Karim Qasrawi</div>
                  <div className="text-slate-400 text-[11px]">Syndicate Lead, Amman Angel Network · Amman</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B111E] border border-slate-800 space-y-4">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "The interactive deal room made international co-investment from Dubai seamless. The legal documents and local compliance were already verified by the platform before we executed term sheets."
                </p>
                <div className="pt-3 border-t border-slate-800 text-xs">
                  <div className="font-bold text-white">Layla Al-Khatib</div>
                  <div className="text-slate-400 text-[11px]">Partner, Levant Health Ventures · Amman & GCC</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 
          PRICING / ACCESS TIERS (PDF page 4 item 13)
        */}
        <section className="py-20 border-b border-slate-800 bg-slate-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs text-cyan-400 font-semibold tracking-wider">
                {lang === 'ar' ? 'نموذج الوصول والاشتراك' : 'TRANSPARENT PLATFORM ACCESS'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {lang === 'ar' ? 'مصمم لتسهيل تدفق رؤوس الأموال' : 'Aligned Directly with Deal Completion'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Entrepreneur Tier */}
              <div className="p-6 rounded-2xl bg-[#0B111E] border border-slate-800 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs text-slate-400 font-semibold">FOR ENTREPRENEURS</div>
                  <h4 className="text-xl font-bold text-white mt-1">Venture Launch</h4>
                  <div className="text-3xl font-extrabold text-white mt-3 font-mono">$0 Upfront</div>
                  <p className="text-xs text-slate-400 mt-2">
                    Free intake, structure formatting, and verification checklist. Standard 2.5% success fee only when capital closes.
                  </p>

                  <div className="space-y-2 mt-6 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Opportunity Journey Engine intake</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Jordan Network Map placement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Encrypted Virtual Deal Room</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
                >
                  Start Verification Free
                </button>
              </div>

              {/* Accredited Investor Tier (Featured) */}
              <div className="p-6 rounded-2xl bg-[#0B111E] border border-cyan-500/50 shadow-2xl shadow-cyan-950/40 relative flex flex-col justify-between space-y-6">
                <div className="absolute top-4 right-4 px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold">
                  RECOMMENDED
                </div>

                <div>
                  <div className="text-xs text-cyan-400 font-semibold">FOR ACCREDITED ANGELS</div>
                  <h4 className="text-xl font-bold text-white mt-1">Investor Syndicate</h4>
                  <div className="text-3xl font-extrabold text-cyan-300 mt-3 font-mono">Verified Access</div>
                  <p className="text-xs text-slate-400 mt-2">
                    Direct access to vetted pipeline across Jordan, automated diligence dossiers, and custom allocation slots.
                  </p>

                  <div className="space-y-2 mt-6 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Full Jordan Deal Flow access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Direct Due Diligence Data Vaults</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>One-click syndicate term sheets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Monthly private investor briefings in Amman</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenDealRoomFromAnywhere()}
                  className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-950"
                >
                  Request Investor Pass
                </button>
              </div>

              {/* Partner / Advisory Tier */}
              <div className="p-6 rounded-2xl bg-[#0B111E] border border-slate-800 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs text-slate-400 font-semibold">FOR INSTITUTIONS & INCUBATORS</div>
                  <h4 className="text-xl font-bold text-white mt-1">Ecosystem Partner</h4>
                  <div className="text-3xl font-extrabold text-white mt-3 font-mono">Custom API</div>
                  <p className="text-xs text-slate-400 mt-2">
                    For sovereign funds, university tech transfer offices, and regional accelerators to manage deal flow pipelines.
                  </p>

                  <div className="space-y-2 mt-6 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>White-label intake engine</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>API export to portfolio ERPs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Dedicated compliance review officer</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
                >
                  Contact Institutional Team
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* 
          FINAL CONVERSION ACTION (PDF page 4 item 14)
        */}
        <section className="py-20 bg-gradient-to-t from-slate-950 to-[#080C14]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              {lang === 'ar'
                ? 'ابدأ ببناء علاقات استثمارية موثوقة اليوم'
                : 'Start Building Trusted Investment Connections Today.'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              {lang === 'ar'
                ? 'انضم إلى رواد الأعمال والمستثمرين في الأردن الذين تجاوزوا فوضى القوائم العشوائية إلى منصة صفقات حقيقية محققة.'
                : 'Whether you are a founder raising seed capital or an accredited investor looking for verified deal flow across Jordan, Vestra Connect is your institutional bridge.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-950 flex items-center gap-2"
              >
                <span>{lang === 'ar' ? 'انضم كرائد أعمال' : 'Join as Entrepreneur'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleOpenDealRoomFromAnywhere()}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'ar' ? 'انضم كمستثمر معتمد' : 'Join as Accredited Investor'}</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* 
        QUIET FOOTER (Section 1.B / 2.A)
        Wordmark, navigation mirror, legal notices, contact info
      */}
      <footer className="border-t border-slate-800 bg-[#060A10] py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
            
            <div className="space-y-3">
              <div className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>Vestra Connect</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                The institutional venture operating system transforming raw business ideas into verified, investable opportunities across Jordan and MENA.
              </p>
            </div>

            <div>
              <div className="font-semibold text-white mb-3">Ecosystem</div>
              <ul className="space-y-2">
                <li><a href="#jordan-map" className="hover:text-slate-200 transition-colors">Jordan Venture Map</a></li>
                <li><a href="#journey-engine" className="hover:text-slate-200 transition-colors">Journey Engine</a></li>
                <li><a href="#marketplace" className="hover:text-slate-200 transition-colors">Curated Pipeline</a></li>
                <li><a href="#trust-system" className="hover:text-slate-200 transition-colors">Trust Engine</a></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white mb-3">Governance & Legal</div>
              <ul className="space-y-2">
                <li><span className="text-slate-500">Jordan Electronic Transactions Law #15</span></li>
                <li><span className="text-slate-500">Ministry of Industry & Trade Compliance</span></li>
                <li><span className="text-slate-500">Bilateral NDA Standard Protocol</span></li>
                <li><span className="text-slate-500">256-Bit Encrypted Data Rooms</span></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white mb-3">Amman Headquarters</div>
              <p className="text-slate-400 leading-relaxed">
                King Hussein Business Park (KHBP)<br />
                Building 23, Tech Cluster<br />
                Amman, Hashemite Kingdom of Jordan<br />
                <span className="text-cyan-400 font-mono mt-1 block">deals@vestraconnect.jo</span>
              </p>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © 2026 Vestra Connect MENA. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Ideas Enter. Trust Is Built. Deals Move Forward.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE MODALS */}
      <ProjectDetailModal
        project={selectedProjectForDetail}
        isOpen={!!selectedProjectForDetail}
        onClose={() => setSelectedProjectForDetail(null)}
        onOpenDealRoom={(p) => handleOpenDealRoomFromAnywhere(p)}
        lang={lang}
      />

      {selectedProjectForDealRoom && (
        <DealRoomModal
          project={selectedProjectForDealRoom}
          isOpen={!!selectedProjectForDealRoom}
          onClose={() => setSelectedProjectForDealRoom(null)}
          lang={lang}
        />
      )}

      <SubmitOpportunityModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitNewVenture={handleAddNewVenture}
        lang={lang}
      />

    </div>
  );
}
