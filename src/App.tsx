import React, { useState } from 'react';
import { useT, usePrefs } from './lib/prefs';
import { 
  Building2, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  Sun,
  Moon,
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
import heroImg from './assets/images/hero_jordan_venture_1791711973387.jpg';

export default function App() {
  const t = useT();
  const { lang, theme, toggleLang, toggleTheme } = usePrefs();
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
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      
      {/* 
        SECTION 1: TOP BAR CONTRACT 
        [Brand title, one line] — [4–5 nav links, 1–2 word labels, single-line] — [1 primary action]
      */}
      <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur-md border-b border-sine/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="text-lg sm:text-xl font-bold tracking-tight text-ink whitespace-nowrap shrink-0 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent"></span>
            <span>{t("Vestra Connect")}</span>
          </a>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-ink2">
            <a href="#jordan-map" className="hover:text-accent transition-colors whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'خريطة الأردن' : 'Jordan Network'}
            </a>
            <a href="#journey-engine" className="hover:text-accent transition-colors whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'محرك الرحلة' : 'Journey Engine'}
            </a>
            <a href="#marketplace" className="hover:text-accent transition-colors whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'الفرص الموثقة' : 'Vetted Deals'}
            </a>
            <a href="#trust-system" className="hover:text-accent transition-colors whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'نظام الثقة' : 'Trust Engine'}
            </a>
            <a href="#dashboards" className="hover:text-accent transition-colors whitespace-nowrap shrink-0">
              {lang === 'ar' ? 'لوحات التحكم' : 'Workspaces'}
            </a>
          </nav>

          {/* Zone 3: 1 primary action & language toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-panel2 border border-line2 text-dim hover:text-ink transition-colors"
              aria-label={theme === 'dark' ? t('Switch to light mode') : t('Switch to dark mode')}
              title={theme === 'dark' ? t('Switch to light mode') : t('Switch to dark mode')}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleLang}
              className="h-9 px-3 text-sm font-semibold rounded-xl bg-panel2 border border-line2 text-dim hover:text-ink transition-colors"
              aria-label={t('Toggle Language')}
              title={t('Toggle Language')}
            >
              {lang === 'en' ? 'عربي' : 'English'}
            </button>

            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-on-accent bg-accent hover:bg-accent-hi rounded-xl transition-all shadow-md shadow-accent/20 whitespace-nowrap shrink-0"
            >
              {lang === 'ar' ? 'قدّم فرصة استثمارية' : 'Submit Opportunity'}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN VIEWPORT */}
      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden border-b border-sine/80">
          {/* Subtle architectural ambient backdrop */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-30 overflow-hidden">
            <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-glow-a rounded-full blur-[120px]"></div>
            <div className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-glow-b rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Proposition and Action */}
              <div className="lg:col-span-7 space-y-6">
                {/* Quiet 1-line text kicker */}
                <div className="flex items-center gap-2 text-xs text-accent font-semibold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  <span>{lang === 'ar' ? 'منصة الصفقات والاستثمار الأولى في الأردن والشرق الأوسط' : 'JORDAN & MENA VENTURE DEAL NETWORK'}</span>
                </div>

                {/* Primary Hero Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight leading-[1.1] text-balance">
                  {lang === 'ar' 
                    ? 'حوّل الأفكار الواعدة إلى فرص استثمارية موثوقة'
                    : 'Turn Promising Ideas into Trusted Investment Opportunities.'}
                </h1>

                {/* Subtitle / Value Proposition */}
                <p className="text-base sm:text-lg text-ink2 max-w-2xl leading-relaxed">
                  {lang === 'ar'
                    ? 'تساعد Vestra Connect المؤسسين وأصحاب الأعمال والمستثمرين على الانتقال من فكرة خام إلى محادثات استثمارية جادة عبر التحقق، والملفات المنظّمة، والمطابقة الذكية، وغرف الصفقات الآمنة.'
                    : 'Vestra Connect moves founders and capital from raw, messy business ideas to verified, investable opportunities through standardized profiles, intelligent matchmaking, and bank-grade deal rooms.'}
                </p>

                {/* Single Primary Decision Block */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#jordan-map"
                    className="px-5 py-3 rounded-xl bg-accent hover:bg-accent-hi text-on-accent font-bold text-sm transition-all shadow-lg shadow-accent/20 flex items-center gap-2"
                  >
                    <span>{lang === 'ar' ? 'استكشف شبكة الأردن التفاعلية' : 'Explore Jordan Live Deals'}</span>
                    <ArrowRight className="rtl:-scale-x-100 w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="px-5 py-3 rounded-xl bg-panel2 hover:bg-chip text-ink2 border border-sine2 font-semibold text-sm transition-colors flex items-center gap-2"
                  >
                    <Briefcase className="w-4 h-4 text-accent" />
                    <span>{lang === 'ar' ? 'هيكلة فكرة مؤسس' : 'Structure a Founder Idea'}</span>
                  </button>
                </div>

                {/* Proof Adjacency: 4-Metric Proof Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-sine/80">
                  <div>
                    <span className="text-xs text-dim block">{lang === 'ar' ? 'رأس المال المدار' : 'Total Deal Flow'}</span>
                    <span className="text-xl sm:text-2xl font-bold text-ink font-mono mt-0.5 block">$14.2M</span>
                    <span className="text-xs text-faint">{lang === 'ar' ? 'عبر 8 محافظات' : 'Across 8 Governorates'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-dim block">{lang === 'ar' ? 'المشاريع المحققة' : 'Vetted Ventures'}</span>
                    <span className="text-xl sm:text-2xl font-bold text-accent font-mono mt-0.5 block">{t("18 Live")}</span>
                    <span className="text-xs text-faint">{lang === 'ar' ? 'تدقيق Deloitte وJFDA' : 'Deloitte & MIT Audited'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-dim block">{lang === 'ar' ? 'شبكة المستثمرين' : 'Accredited Angels'}</span>
                    <span className="text-xl sm:text-2xl font-bold text-ink font-mono mt-0.5 block">140+</span>
                    <span className="text-xs text-faint">{lang === 'ar' ? 'عمان ودول الخليج' : 'Amman & GCC Funds'}</span>
                  </div>
                  <div>
                    <span className="text-xs text-dim block">{lang === 'ar' ? 'معدل التوثيق' : 'Due Diligence'}</span>
                    <span className="text-xl sm:text-2xl font-bold text-ok font-mono mt-0.5 block">100%</span>
                    <span className="text-xs text-faint">{lang === 'ar' ? 'فحص يدوي كامل' : 'Zero Unvetted Listings'}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Impact Visual Asset (Amman Skyline with Luminous Deal Anchor) */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-sine2/80 shadow-2xl group">
                  <div className="aspect-[16/10] w-full">
                    <img
                      src={heroImg}
                      alt="Amman Modern Venture Architecture and Skyline"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-overlay via-overlay/30 to-transparent"></div>

                  {/* High-Impact Focal Overlay Card */}
                  <div className="absolute bottom-4 start-4 end-4 p-4 rounded-xl bg-panel2/90 backdrop-blur-md border border-sine2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                        <span className="font-semibold text-ink">{t("Active Amman Deal Hub")}</span>
                      </div>
                      <span className="text-ok font-bold" dir="auto">{t("$750k Series A")}</span>
                    </div>
                    <div className="text-xs text-ink2 mt-1">
                      {t("King Hussein Business Park & Abdali Medical District connecting capital to regional exports.")}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* TRUST SIGNALS BANNER */}
        <section className="py-6 border-b border-sine bg-sunken/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-6 text-xs text-dim">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span className="text-ink2 font-medium">{lang === 'ar' ? 'مؤسسون موثقون' : 'Verified Founders'}</span>
                <span className="text-faint">·</span>
                <span>{lang === 'ar' ? 'فحص السجل التجاري الأردني' : 'Jordan MIT Registered'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                <span className="text-ink2 font-medium">{lang === 'ar' ? 'مستثمرون مختارون' : 'Curated Investors'}</span>
                <span className="text-faint">·</span>
                <span>{lang === 'ar' ? 'مطابقة حسب شهية المخاطرة' : 'Thesis-Driven Matching'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-accent" />
                <span className="text-ink2 font-medium">{lang === 'ar' ? 'غرف صفقات مشفرة' : 'Encrypted Deal Rooms'}</span>
                <span className="text-faint">·</span>
                <span>{lang === 'ar' ? 'حماية بيانات 256-Bit' : 'Bank-Grade Access Control'}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" />
                <span className="text-ink2 font-medium">{lang === 'ar' ? 'مراجعة يدوية وإشراف' : 'Manual Admin Review'}</span>
                <span className="text-faint">·</span>
                <span>{lang === 'ar' ? 'منع العشوائية والإعلانات' : 'No Unvetted Directory Clutter'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 
          CORE HIGHLIGHT SECTION: 
          INTERACTIVE JORDAN OPPORTUNITY MAP WITH MOVING CAPITAL PACKETS 
        */}
        <section id="jordan-map" className="py-24 lg:py-32 border-b border-sine bg-gradient-to-b from-bg via-bg2 to-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-2xl">
              <div className="text-xs text-accent font-semibold tracking-wider">
                {lang === 'ar' ? 'الشبكة الجغرافية التفاعلية' : 'NATIONAL VENTURE TOPOLOGY'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2 tracking-tight text-balance">
                {lang === 'ar' 
                  ? 'خريطة الأردن الذكية: نقاط المشاريع وحركة الصفقات الحية' 
                  : 'Live Jordan Opportunity & Capital Flow Network'}
              </h2>
              <p className="text-sm sm:text-base text-ink2 mt-3 leading-relaxed max-w-2xl">
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
        <section id="journey-engine" className="py-24 lg:py-32 border-b border-sine bg-bg">
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
        <section id="marketplace" className="py-24 lg:py-32 border-b border-sine bg-sunken/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-xs text-accent font-semibold tracking-wider">
                  {lang === 'ar' ? 'سوق الفرص المختارة' : 'CURATED VENTURE PIPELINE'}
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2 tracking-tight text-balance">
                  {lang === 'ar' ? 'فرص استثمارية استثنائية جاهزة للدخول' : 'High-Conviction Investment Opportunities'}
                </h2>
                <p className="text-sm sm:text-base text-dim mt-2 max-w-xl">
                  {lang === 'ar'
                    ? 'كل فرصة تمر عبر فحص السجل التجاري، مراجعة القوائم المالية، وفحص الهوية قبل وصولها إلى المستثمرين.'
                    : 'Every listing undergoes rigorous document verification, financial audits, and management review before opening for syndication.'}
                </p>
              </div>

              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="text-xs text-accent hover:text-accent-hi font-semibold flex items-center gap-1 self-start sm:self-auto"
              >
                <span>{lang === 'ar' ? 'عرض كافة الفرص المتاحة' : 'Submit Your Venture to Pipeline'}</span>
                <ChevronRight className="rtl:-scale-x-100 w-4 h-4" />
              </button>
            </div>

            {/* Grid of 4 Curated Opportunity Cards with Real Imagery */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {activeProjects.slice(0, 4).map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl bg-panel border border-sine hover:border-accent/50 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent"></div>
                      
                      <div className="absolute top-3 start-3 px-2 py-1 rounded bg-panel2/80 backdrop-blur-md text-xs font-medium text-accent-hi border border-sine2">
                        {t(project.category)}
                      </div>

                      <div className="absolute top-3 end-3 px-2 py-1 rounded bg-panel2/80 backdrop-blur-md text-xs font-mono text-ok border border-sine2">
                        {project.targetCapital}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-3">
                      <div>
                        <div className="text-xs text-dim flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-faint" />
                          <span className="truncate">{t(project.locationName)}</span>
                        </div>
                        <h4 className="text-base font-bold text-ink group-hover:text-accent-hi transition-colors mt-1">
                          {lang === 'ar' ? project.arabicName : project.name}
                        </h4>
                      </div>

                      <p className="text-xs text-ink2 line-clamp-2 leading-relaxed">
                        {lang === 'ar' ? project.arabicSummary : project.summary}
                      </p>

                      {/* Clean Unboxed Metadata with · separator (Zero-Pill discipline) */}
                      <div className="flex items-center gap-2 text-xs text-dim pt-2 border-t border-sine/80">
                        <span>{t(project.stage)}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-ok font-medium">{project.completeness}% {t("Verified")}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.matchedInvestorsCount} {t("Matches")}</span>
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
                      className="w-full py-2 px-3 rounded-xl bg-panel2 hover:bg-accent text-ink2 hover:text-on-accent text-xs font-semibold border border-sine hover:border-accent transition-all flex items-center justify-center gap-1.5"
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
        <section id="trust-system" className="py-24 lg:py-32 border-b border-sine bg-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl">
              <div className="text-xs text-accent font-semibold tracking-wider">
                {lang === 'ar' ? 'هندسة الموثوقية' : 'THE TRUST ENGINE'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2 tracking-tight text-balance">
                {lang === 'ar' ? 'الثقة تُبنى قبل أي تعارف أو استثمار' : 'Trust is Established Before the First Handshake'}
              </h2>
              <p className="text-sm sm:text-base text-ink2 mt-3 leading-relaxed max-w-2xl">
                {lang === 'ar'
                  ? 'نظام خماسي المراحل يحمي وقت المؤسس ورأس مال المستثمر من خلال التحقق القانوني، تدقيق الحسابات، وتقييم المخاطر المستقل.'
                  : 'A 5-layer verification framework that safeguards founder intellectual property while delivering institutional-grade clarity to angel syndicates and venture funds.'}
              </p>
            </div>

            {/* Asymmetric Bento-Grid for Capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl bg-panel border border-sine space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-ink">{t("01. Biometric & Commercial Verification")}</h4>
                <p className="text-xs text-ink2 leading-relaxed">
                  {t("Direct sync with the Hashemite Kingdom's Ministry of Industry & Trade (MIT) commercial registry. Real founder identity, shareholder register, and credit status verified.")}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-panel border border-sine space-y-3">
                <div className="w-10 h-10 rounded-xl bg-info/10 border border-info/30 flex items-center justify-center text-info">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-ink">{t("02. Independent Financial Audit")}</h4>
                <p className="text-xs text-ink2 leading-relaxed">
                  {t("24-month bank statement verification, certified EBITDA calculations, lease checks, and unit-level economics verified by accredited accounting partners.")}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-panel border border-sine space-y-3">
                <div className="w-10 h-10 rounded-xl bg-violet/10 border border-violet/30 flex items-center justify-center text-violet">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-ink">{t("03. Controlled Virtual Deal Rooms")}</h4>
                <p className="text-xs text-ink2 leading-relaxed">
                  {t("No public leak of pitch decks or cap tables. Data rooms unlock only upon mutual opt-in, investor thesis validation, and bilateral NDA execution.")}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 
          DUAL DASHBOARDS PREVIEW SECTION (PDF page 4 item 11)
        */}
        <section id="dashboards" className="py-24 lg:py-32 border-b border-sine bg-sunken/40">
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
        <section className="py-24 lg:py-32 border-b border-sine bg-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-2xl">
              <div className="text-xs text-accent font-semibold tracking-wider">
                {lang === 'ar' ? 'شهادات رواد الأعمال والمستثمرين' : 'ECOSYSTEM PROOF'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2 tracking-tight text-balance">
                {lang === 'ar' ? 'أصوات من بيئة ريادة الأعمال الأردنية' : 'Backed by Jordan’s Most Serious Builders & Angels'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl bg-panel border border-sine space-y-4">
                <p className="text-sm text-ink2 leading-relaxed italic">
                  "Before Vestra Connect, pitching our Jordan Valley agritech expansion meant sending pitch decks into WhatsApp voids. Vestra structured our 14 dunums into an institutional format; we closed our $420k growth tranche in 21 days."
                </p>
                <div className="pt-3 border-t border-sine text-xs">
                  <div className="font-bold text-ink">{t("Tariq Al-Muhtaseb")}</div>
                  <div className="text-dim text-xs">{t("Co-founder, Wadi Verdant AgriTech · Jordan Valley")}</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-panel border border-sine space-y-4">
                <p className="text-sm text-ink2 leading-relaxed italic">
                  {t("\"As an angel syndicate lead in Amman, we filter 40 messy decks a month. Vestra eliminates the noise. Every deal comes with audited commercial registration, vetted cap tables, and clean risk ratings.\"")}
                </p>
                <div className="pt-3 border-t border-sine text-xs">
                  <div className="font-bold text-ink">{t("Karim Qasrawi")}</div>
                  <div className="text-dim text-xs">{t("Syndicate Lead, Amman Angel Network · Amman")}</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-panel border border-sine space-y-4">
                <p className="text-sm text-ink2 leading-relaxed italic">
                  {t("\"The interactive deal room made international co-investment from Dubai seamless. The legal documents and local compliance were already verified by the platform before we executed term sheets.\"")}
                </p>
                <div className="pt-3 border-t border-sine text-xs">
                  <div className="font-bold text-ink">{t("Layla Al-Khatib")}</div>
                  <div className="text-dim text-xs">{t("Partner, Levant Health Ventures · Amman & GCC")}</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 
          PRICING / ACCESS TIERS (PDF page 4 item 13)
        */}
        <section className="py-24 lg:py-32 border-b border-sine bg-sunken/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs text-accent font-semibold tracking-wider">
                {lang === 'ar' ? 'نموذج الوصول والاشتراك' : 'TRANSPARENT PLATFORM ACCESS'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-ink mt-2 tracking-tight text-balance">
                {lang === 'ar' ? 'مصمم لتسهيل تدفق رؤوس الأموال' : 'Aligned Directly with Deal Completion'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Entrepreneur Tier */}
              <div className="p-6 rounded-2xl bg-panel border border-sine flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs text-dim font-semibold">{t("FOR ENTREPRENEURS")}</div>
                  <h4 className="text-xl font-bold text-ink mt-1">{t("Venture Launch")}</h4>
                  <div className="text-3xl font-extrabold text-ink mt-3 font-mono">{t("$0 Upfront")}</div>
                  <p className="text-xs text-dim mt-2">
                    {t("Free intake, structure formatting, and verification checklist. Standard 2.5% success fee only when capital closes.")}
                  </p>

                  <div className="space-y-2 mt-6 text-xs text-ink2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      <span>{t("Opportunity Journey Engine intake")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      <span>{t("Jordan Network Map placement")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      <span>{t("Encrypted Virtual Deal Room")}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-chip hover:bg-chip-hi text-ink text-xs font-semibold border border-sine2 transition-colors"
                >
                  {t("Start Verification Free")}
                </button>
              </div>

              {/* Accredited Investor Tier (Featured) */}
              <div className="p-6 rounded-2xl bg-panel border border-accent/50 shadow-2xl shadow-accent/20 relative flex flex-col justify-between space-y-6">
                <div className="absolute top-4 end-4 px-2 py-0.5 rounded bg-accent/10 text-accent-hi border border-accent/40 text-xs font-bold">
                  RECOMMENDED
                </div>

                <div>
                  <div className="text-xs text-accent font-semibold">{t("FOR ACCREDITED ANGELS")}</div>
                  <h4 className="text-xl font-bold text-ink mt-1">{t("Investor Syndicate")}</h4>
                  <div className="text-3xl font-extrabold text-accent-hi mt-3 font-mono">{t("Verified Access")}</div>
                  <p className="text-xs text-dim mt-2">
                    {t("Direct access to vetted pipeline across Jordan, automated diligence dossiers, and custom allocation slots.")}
                  </p>

                  <div className="space-y-2 mt-6 text-xs text-ink2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      <span>{t("Full Jordan Deal Flow access")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      <span>{t("Direct Due Diligence Data Vaults")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      <span>{t("One-click syndicate term sheets")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      <span>{t("Monthly private investor briefings in Amman")}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenDealRoomFromAnywhere()}
                  className="w-full py-2.5 rounded-xl bg-accent hover:bg-accent-hi text-on-accent text-xs font-bold transition-all shadow-md shadow-accent/20"
                >
                  {t("Request Investor Pass")}
                </button>
              </div>

              {/* Partner / Advisory Tier */}
              <div className="p-6 rounded-2xl bg-panel border border-sine flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs text-dim font-semibold">{t("FOR INSTITUTIONS & INCUBATORS")}</div>
                  <h4 className="text-xl font-bold text-ink mt-1">{t("Ecosystem Partner")}</h4>
                  <div className="text-3xl font-extrabold text-ink mt-3 font-mono">{t("Custom API")}</div>
                  <p className="text-xs text-dim mt-2">
                    {t("For sovereign funds, university tech transfer offices, and regional accelerators to manage deal flow pipelines.")}
                  </p>

                  <div className="space-y-2 mt-6 text-xs text-ink2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      <span>{t("White-label intake engine")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      <span>{t("API export to portfolio ERPs")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      <span>{t("Dedicated compliance review officer")}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-chip hover:bg-chip-hi text-ink text-xs font-semibold border border-sine2 transition-colors"
                >
                  {t("Contact Institutional Team")}
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* 
          FINAL CONVERSION ACTION (PDF page 4 item 14)
        */}
        <section className="py-24 lg:py-32 bg-gradient-to-t from-sunken to-bg">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-ink tracking-tight text-balance">
              {lang === 'ar'
                ? 'ابدأ ببناء علاقات استثمارية موثوقة اليوم'
                : 'Start Building Trusted Investment Connections Today.'}
            </h2>

            <p className="text-sm text-ink2 max-w-xl mx-auto leading-relaxed">
              {lang === 'ar'
                ? 'انضم إلى رواد الأعمال والمستثمرين في الأردن الذين تجاوزوا فوضى القوائم العشوائية إلى منصة صفقات حقيقية محققة.'
                : 'Whether you are a founder raising seed capital or an accredited investor looking for verified deal flow across Jordan, Vestra Connect is your institutional bridge.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-hi text-on-accent font-bold text-sm transition-all shadow-lg shadow-accent/20 flex items-center gap-2"
              >
                <span>{lang === 'ar' ? 'انضم كرائد أعمال' : 'Join as Entrepreneur'}</span>
                <ArrowRight className="rtl:-scale-x-100 w-4 h-4" />
              </button>

              <button
                onClick={() => handleOpenDealRoomFromAnywhere()}
                className="px-6 py-3 rounded-xl bg-panel2 hover:bg-chip text-ink2 border border-sine2 font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-accent" />
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
      <footer className="border-t border-sine bg-sunken py-12 text-xs text-dim">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-sine/80">
            
            <div className="space-y-3">
              <div className="text-base font-bold text-ink flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                <span>{t("Vestra Connect")}</span>
              </div>
              <p className="text-dim text-xs leading-relaxed">
                {t("The institutional venture operating system transforming raw business ideas into verified, investable opportunities across Jordan and MENA.")}
              </p>
            </div>

            <div>
              <div className="font-semibold text-ink mb-3">{t("Ecosystem")}</div>
              <ul className="space-y-2">
                <li><a href="#jordan-map" className="hover:text-ink2 transition-colors">{t("Jordan Venture Map")}</a></li>
                <li><a href="#journey-engine" className="hover:text-ink2 transition-colors">{t("Journey Engine")}</a></li>
                <li><a href="#marketplace" className="hover:text-ink2 transition-colors">{t("Curated Pipeline")}</a></li>
                <li><a href="#trust-system" className="hover:text-ink2 transition-colors">{t("Trust Engine")}</a></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-ink mb-3">{t("Governance & Legal")}</div>
              <ul className="space-y-2">
                <li><span className="text-faint">{t("Jordan Electronic Transactions Law #15")}</span></li>
                <li><span className="text-faint">{t("Ministry of Industry & Trade Compliance")}</span></li>
                <li><span className="text-faint">{t("Bilateral NDA Standard Protocol")}</span></li>
                <li><span className="text-faint">{t("256-Bit Encrypted Data Rooms")}</span></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-ink mb-3">{t("Amman Headquarters")}</div>
              <p className="text-dim leading-relaxed">
                {t("King Hussein Business Park (KHBP)")}<br />
                {t("Building 23, Tech Cluster")}<br />
                {t("Amman, Hashemite Kingdom of Jordan")}<br />
                <span className="text-accent font-mono mt-1 block">{t("deals@vestraconnect.jo")}</span>
              </p>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-faint">
            <div>
              {t("© 2026 Vestra Connect MENA. All rights reserved.")}
            </div>
            <div className="flex items-center gap-4">
              <span>{t("Ideas Enter. Trust Is Built. Deals Move Forward.")}</span>
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
