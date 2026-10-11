import React, { useEffect, useState } from 'react';
import { useT, usePrefs } from './lib/prefs';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  FileText,
  Lock,
  Moon,
  ShieldCheck,
  Sun,
  Users,
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
  const ar = lang === 'ar';
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<VentureProject | null>(null);
  const [selectedProjectForDealRoom, setSelectedProjectForDealRoom] = useState<VentureProject | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [activeProjects, setActiveProjects] = useState<VentureProject[]>(JORDAN_VENTURES);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Handle new venture added dynamically via intake modal
  const handleAddNewVenture = (newProj: VentureProject) => {
    setActiveProjects((prev) => [newProj, ...prev]);
    setSelectedProjectForDetail(newProj);
  };

  const handleOpenDealRoomFromAnywhere = (proj?: VentureProject) => {
    setSelectedProjectForDealRoom(proj || activeProjects[0]);
  };

  const featured = JORDAN_VENTURES[0];
  const cards = activeProjects.slice(0, 4);
  const cardSpan = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'];

  const trustItems = [
    {
      icon: ShieldCheck,
      title: t('Biometric & Commercial Verification'),
      body: t("Direct sync with the Hashemite Kingdom's Ministry of Industry & Trade (MIT) commercial registry. Real founder identity, shareholder register, and credit status verified."),
    },
    {
      icon: FileText,
      title: t('Independent Financial Audit'),
      body: t('24-month bank statement verification, certified EBITDA calculations, lease checks, and unit-level economics verified by accredited accounting partners.'),
    },
    {
      icon: Lock,
      title: t('Controlled Virtual Deal Rooms'),
      body: t('No public leak of pitch decks or cap tables. Data rooms unlock only upon mutual opt-in, investor thesis validation, and bilateral NDA execution.'),
    },
  ];

  const quotes = [
    {
      text: t('"Before Vestra Connect, pitching our Jordan Valley agritech expansion meant sending pitch decks into WhatsApp voids. Vestra structured our 14 dunums into an institutional format; we closed our $420k growth tranche in 21 days."'),
      who: t('Tariq Al-Muhtaseb'),
      role: t('Co-founder, Wadi Verdant AgriTech · Jordan Valley'),
    },
    {
      text: t('"As an angel syndicate lead in Amman, we filter 40 messy decks a month. Vestra eliminates the noise. Every deal comes with audited commercial registration, vetted cap tables, and clean risk ratings."'),
      who: t('Karim Qasrawi'),
      role: t('Syndicate Lead, Amman Angel Network · Amman'),
    },
    {
      text: t('"The interactive deal room made international co-investment from Dubai seamless. The legal documents and local compliance were already verified by the platform before we executed term sheets."'),
      who: t('Layla Al-Khatib'),
      role: t('Partner, Levant Health Ventures · Amman & GCC'),
    },
  ];

  const navLinks = [
    ['#jordan-map', t('Jordan Network')],
    ['#journey-engine', t('Journey Engine')],
    ['#marketplace', t('Vetted Deals')],
    ['#trust-system', t('Trust Engine')],
    ['#dashboards', t('Workspaces')],
  ];

  const iconBtn =
    'h-10 w-10 inline-flex items-center justify-center rounded-xl bg-panel2 text-dim hover:text-ink hover:bg-chip transition-colors';

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      {/* Top bar: wordmark, five links, theme + language + one primary action */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl transition-[background-color,box-shadow] duration-300 ${
          scrolled ? 'bg-bg/80 shadow-s1' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-8">
          <a href="#" className="text-xl font-bold tracking-tight text-ink whitespace-nowrap shrink-0 flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-accent shadow-[0_0_18px_var(--accent)]" aria-hidden="true"></span>
            <span>Vestra Connect</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-dim">
            {navLinks.map(([href, label]) => (
              <a key={href} href={href} className="hover:text-ink transition-colors whitespace-nowrap">
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleTheme}
              className={iconBtn}
              aria-label={theme === 'dark' ? t('Switch to light mode') : t('Switch to dark mode')}
              title={theme === 'dark' ? t('Switch to light mode') : t('Switch to dark mode')}
            >
              {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>
            <button
              onClick={toggleLang}
              className="h-10 px-3.5 inline-flex items-center rounded-xl bg-panel2 text-sm font-semibold text-dim hover:text-ink hover:bg-chip transition-colors"
              aria-label={t('Toggle Language')}
              title={t('Toggle Language')}
            >
              {ar ? 'English' : 'عربي'}
            </button>
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="h-10 px-5 text-sm font-semibold text-on-accent bg-accent hover:bg-accent-hi rounded-xl transition-colors shadow-s1 whitespace-nowrap"
            >
              {t('Submit Opportunity')}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO: one promise, one photograph, two floating facts that overlap it */}
        <section className="relative overflow-hidden pt-10 pb-24 sm:pt-16 lg:pb-32">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute -top-24 left-[8%] w-[520px] h-[520px] bg-glow-a rounded-full blur-[130px]"></div>
            <div className="absolute top-24 right-[6%] w-[480px] h-[480px] bg-glow-b rounded-full blur-[130px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-5 sm:px-8 relative grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
            <div className="lg:col-span-6 space-y-8">
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-[-0.035em] leading-[1.02] text-balance">
                {ar ? 'حوّل الأفكار الواعدة إلى فرص استثمارية موثوقة' : 'Turn promising ideas into trusted investment opportunities.'}
              </h1>

              <p className="text-lg sm:text-xl text-dim max-w-[34rem] leading-relaxed">
                {ar
                  ? 'تساعد Vestra Connect المؤسسين وأصحاب الأعمال والمستثمرين على الانتقال من فكرة خام إلى محادثات استثمارية جادة عبر التحقق، والملفات المنظّمة، والمطابقة الذكية، وغرف الصفقات الآمنة.'
                  : 'Vestra Connect moves founders and capital from raw, messy business ideas to verified, investable opportunities through standardized profiles, intelligent matchmaking, and bank-grade deal rooms.'}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#jordan-map"
                  className="h-12 px-6 rounded-2xl bg-accent hover:bg-accent-hi text-on-accent font-semibold text-base transition-colors shadow-s2 inline-flex items-center gap-2.5"
                >
                  <span>{ar ? 'استكشف شبكة الأردن التفاعلية' : 'Explore Jordan Live Deals'}</span>
                  <ArrowRight className="w-[18px] h-[18px] rtl:-scale-x-100" />
                </a>
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="h-12 px-6 rounded-2xl bg-panel2 hover:bg-chip text-ink font-semibold text-base transition-colors inline-flex items-center gap-2.5"
                >
                  <Briefcase className="w-[18px] h-[18px] text-accent" />
                  <span>{ar ? 'هيكلة فكرة مؤسس' : 'Structure a Founder Idea'}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative pb-16 sm:pb-12 lg:ps-6">
              <div className="relative rounded-[2rem] overflow-hidden shadow-s3 aspect-[5/4]">
                <img
                  src={heroImg}
                  alt={t('Active Amman Deal Hub')}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-overlay/50 via-transparent to-transparent"></div>
              </div>

              {/* Floating deal card, overlaps the photo's lower edge */}
              <div className="absolute bottom-0 start-4 sm:start-0 max-w-[23rem] w-[calc(100%-2rem)] rounded-3xl bg-panel/90 backdrop-blur-xl shadow-s3 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 text-sm font-semibold">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    <span>{t('Active Amman Deal Hub')}</span>
                  </div>
                  <span className="text-sm font-bold text-ok tabular-nums whitespace-nowrap" dir="auto">{t('$750k Series A')}</span>
                </div>
                <p className="text-sm text-dim mt-2 leading-relaxed">
                  {t('King Hussein Business Park & Abdali Medical District connecting capital to regional exports.')}
                </p>
              </div>

              {/* Match chip, overlaps the photo's upper edge */}
              <div className="absolute top-6 end-3 sm:-end-3 rounded-2xl bg-panel/90 backdrop-blur-xl shadow-s2 px-4 py-3 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-accent/15 text-accent inline-flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-semibold">{ar ? featured.arabicName : featured.name}</div>
                  <div className="text-sm text-ok font-semibold tabular-nums">
                    {featured.completeness}% {t('Verified')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quiet capability line: no boxes, no dividers */}
          <div className="max-w-7xl mx-auto px-5 sm:px-8 relative mt-16 flex flex-wrap gap-x-10 gap-y-3 text-sm text-dim">
            {[
              [ShieldCheck, t('Verified Founders')],
              [Users, t('Curated Investors')],
              [Lock, t('Encrypted Deal Rooms')],
              [FileText, t('Manual Admin Review')],
            ].map(([Icon, label], i) => {
              const I = Icon as typeof ShieldCheck;
              return (
                <span key={i} className="inline-flex items-center gap-2.5">
                  <I className="w-[18px] h-[18px] text-accent" />
                  <span className="font-medium text-ink2">{label as string}</span>
                </span>
              );
            })}
          </div>
        </section>

        {/* MAP */}
        <section id="jordan-map" className="py-24 lg:py-32 bg-bg2">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
            <div className="max-w-3xl">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.05] text-balance">
                {ar ? 'خريطة الأردن الذكية: نقاط المشاريع وحركة الصفقات الحية' : 'Live Jordan Opportunity & Capital Flow Network'}
              </h2>
              <p className="text-lg text-dim mt-5 leading-relaxed max-w-2xl">
                {ar
                  ? 'شاهد كيف تتوزع المشاريع الريادية في عمان، إربد، وادي الأردن، العقبة، المفرق، والسلط، وتتبع حركة رؤوس الأموال ومسارات الاستثمار بين مراكز التمويل والمشاريع الحية.'
                  : 'Explore active vetted ventures across Amman, Irbid, the Jordan Valley, Aqaba, Mafraq, and As-Salt. Watch live capital packets traverse real economic and syndication corridors.'}
              </p>
            </div>

            <JordanInteractiveMap
              onSelectProject={(p) => setSelectedProjectForDetail(p)}
              onOpenDealRoom={(p) => handleOpenDealRoomFromAnywhere(p)}
              lang={lang}
            />
          </div>
        </section>

        {/* JOURNEY */}
        <section id="journey-engine" className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <OpportunityJourneyEngine lang={lang} onLaunchDealRoom={() => handleOpenDealRoomFromAnywhere()} />
          </div>
        </section>

        {/* MARKETPLACE: asymmetric, the first card leads */}
        <section id="marketplace" className="py-24 lg:py-32 bg-bg2">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.05] text-balance">
                  {ar ? 'فرص استثمارية استثنائية جاهزة للدخول' : 'High-Conviction Investment Opportunities'}
                </h2>
                <p className="text-lg text-dim mt-5 leading-relaxed">
                  {ar
                    ? 'كل فرصة تمر عبر فحص السجل التجاري، مراجعة القوائم المالية، وفحص الهوية قبل وصولها إلى المستثمرين.'
                    : 'Every listing undergoes rigorous document verification, financial audits, and management review before opening for syndication.'}
                </p>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="h-11 px-5 rounded-xl bg-panel text-accent hover:bg-panel2 font-semibold text-sm transition-colors shadow-s1 self-start sm:self-auto inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>{t('Submit Your Opportunity')}</span>
                <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {cards.map((project, i) => (
                <article
                  key={project.id}
                  onClick={() => setSelectedProjectForDetail(project)}
                  className={`${cardSpan[i]} group cursor-pointer rounded-[1.75rem] bg-panel shadow-s2 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-s3 ${
                    i === 0 || i === 3 ? 'lg:flex-row' : ''
                  }`}
                >
                  <div className={`relative overflow-hidden shrink-0 h-56 ${i === 0 || i === 3 ? 'lg:h-auto lg:w-[46%]' : ''}`}>
                    <img
                      src={project.image}
                      alt={ar ? project.arabicName : project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-overlay/40 via-transparent to-transparent"></div>
                    <span className="absolute top-4 start-4 px-3 py-1.5 rounded-full bg-panel/85 backdrop-blur-md text-xs font-semibold text-ink">
                      {t(project.category)}
                    </span>
                  </div>

                  <div className="p-7 flex flex-col gap-4 flex-1">
                    <div>
                      <div className="text-sm text-dim">{t(project.locationName)}</div>
                      <h3 className="text-2xl font-bold tracking-tight leading-tight mt-1 group-hover:text-accent transition-colors">
                        {ar ? project.arabicName : project.name}
                      </h3>
                    </div>
                    <p className="text-base text-dim leading-relaxed line-clamp-4">
                      {ar ? project.arabicSummary : project.summary}
                    </p>
                    <p className="text-sm text-dim">
                      {project.matchedInvestorsCount} {t('Accredited Matches')} · {t('Risk')}: {t(project.riskLevel)}
                    </p>
                    <div className="mt-auto pt-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                      <div className="flex items-baseline gap-4 text-sm text-dim">
                        <span className="text-xl font-bold text-ink tabular-nums">{project.targetCapital}</span>
                        <span>{t(project.stage)}</span>
                        <span className="text-ok font-semibold tabular-nums">{project.completeness}% {t('Verified')}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDealRoomFromAnywhere(project);
                        }}
                        className="h-10 px-4 rounded-xl bg-panel2 hover:bg-accent hover:text-on-accent text-ink2 text-sm font-semibold transition-colors inline-flex items-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        <span>{t('View Deal Room')}</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST: statement on one side, three plain rows on the other. No cards. */}
        <section id="trust-system" className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-14">
            <div className="lg:col-span-5 lg:sticky lg:top-28 self-start space-y-5">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.05] text-balance">
                {ar ? 'الثقة تُبنى قبل أي تعارف أو استثمار' : 'Trust is Established Before the First Handshake'}
              </h2>
              <p className="text-lg text-dim leading-relaxed">
                {ar
                  ? 'نظام خماسي المراحل يحمي وقت المؤسس ورأس مال المستثمر من خلال التحقق القانوني، تدقيق الحسابات، وتقييم المخاطر المستقل.'
                  : 'A 5-layer verification framework that safeguards founder intellectual property while delivering institutional-grade clarity to angel syndicates and venture funds.'}
              </p>
            </div>

            <div className="lg:col-span-7 lg:ps-10 space-y-12">
              {trustItems.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-6">
                  <span className="w-14 h-14 shrink-0 rounded-2xl bg-accent/12 text-accent inline-flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </span>
                  <div className="space-y-2.5 pt-1">
                    <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
                    <p className="text-base text-dim leading-relaxed max-w-xl">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DASHBOARDS */}
        <section id="dashboards" className="py-24 lg:py-32 bg-bg2">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <DualDashboardPreview onOpenProject={(p) => setSelectedProjectForDetail(p)} lang={lang} />
          </div>
        </section>

        {/* VOICES: one lead quote, two supporting */}
        <section className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.05] text-balance max-w-3xl">
              {ar ? 'أصوات من بيئة ريادة الأعمال الأردنية' : 'Backed by Jordan’s Most Serious Builders & Angels'}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <figure className="lg:col-span-7 rounded-[2rem] bg-panel shadow-s2 p-9 sm:p-12 flex flex-col justify-between gap-10">
                <blockquote className="text-2xl sm:text-3xl font-semibold tracking-tight leading-snug text-balance">
                  {quotes[0].text}
                </blockquote>
                <figcaption>
                  <div className="font-bold text-lg">{quotes[0].who}</div>
                  <div className="text-dim text-sm mt-0.5">{quotes[0].role}</div>
                </figcaption>
              </figure>

              <div className="lg:col-span-5 flex flex-col gap-6">
                {quotes.slice(1).map((q) => (
                  <figure key={q.who} className="rounded-[1.75rem] bg-panel2 p-7 flex-1 flex flex-col justify-between gap-6">
                    <blockquote className="text-base text-ink2 leading-relaxed">{q.text}</blockquote>
                    <figcaption>
                      <div className="font-bold">{q.who}</div>
                      <div className="text-dim text-sm mt-0.5">{q.role}</div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRICING: the recommended plan is a raised surface; the others sit on the page */}
        <section className="py-24 lg:py-32 bg-bg2">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-14">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.05] text-balance max-w-3xl">
              {ar ? 'مصمم لتسهيل تدفق رؤوس الأموال' : 'Aligned Directly with Deal Completion'}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 items-stretch">
              <div className="flex flex-col gap-7 lg:py-8 lg:pe-6">
                <div>
                  <div className="text-sm font-semibold text-dim">{t('FOR ENTREPRENEURS')}</div>
                  <h3 className="text-3xl font-bold tracking-tight mt-2">{t('Venture Launch')}</h3>
                  <div className="text-4xl font-extrabold tracking-tight mt-4 tabular-nums">{t('$0 Upfront')}</div>
                  <p className="text-base text-dim mt-3 leading-relaxed">
                    {t('Free intake, structure formatting, and verification checklist. Standard 2.5% success fee only when capital closes.')}
                  </p>
                </div>
                <ul className="space-y-3 text-base text-ink2">
                  {['Opportunity Journey Engine intake', 'Jordan Network Map placement', 'Encrypted Virtual Deal Room'].map((x) => (
                    <li key={x} className="flex items-center gap-3">
                      <CheckCircle2 className="w-[18px] h-[18px] text-accent shrink-0" />
                      <span>{t(x)}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="mt-auto h-12 px-6 rounded-2xl bg-panel hover:bg-panel2 text-ink font-semibold shadow-s1 transition-colors"
                >
                  {t('Start Verification Free')}
                </button>
              </div>

              <div className="relative flex flex-col gap-7 rounded-[2rem] bg-panel shadow-s3 p-8 sm:p-10 lg:-my-6">
                <span className="absolute top-6 end-6 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold">
                  {t('RECOMMENDED')}
                </span>
                <div>
                  <div className="text-sm font-semibold text-accent">{t('FOR ACCREDITED ANGELS')}</div>
                  <h3 className="text-3xl font-bold tracking-tight mt-2">{t('Investor Syndicate')}</h3>
                  <div className="text-4xl font-extrabold tracking-tight mt-4 text-accent">{t('Verified Access')}</div>
                  <p className="text-base text-dim mt-3 leading-relaxed">
                    {t('Direct access to vetted pipeline across Jordan, automated diligence dossiers, and custom allocation slots.')}
                  </p>
                </div>
                <ul className="space-y-3 text-base text-ink2">
                  {['Full Jordan Deal Flow access', 'Direct Due Diligence Data Vaults', 'One-click syndicate term sheets', 'Monthly private investor briefings in Amman'].map((x) => (
                    <li key={x} className="flex items-center gap-3">
                      <CheckCircle2 className="w-[18px] h-[18px] text-accent shrink-0" />
                      <span>{t(x)}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleOpenDealRoomFromAnywhere()}
                  className="mt-auto h-12 px-6 rounded-2xl bg-accent hover:bg-accent-hi text-on-accent font-semibold shadow-s2 transition-colors"
                >
                  {t('Request Investor Pass')}
                </button>
              </div>

              <div className="flex flex-col gap-7 lg:py-8 lg:ps-6">
                <div>
                  <div className="text-sm font-semibold text-dim">{t('FOR INSTITUTIONS & INCUBATORS')}</div>
                  <h3 className="text-3xl font-bold tracking-tight mt-2">{t('Ecosystem Partner')}</h3>
                  <div className="text-4xl font-extrabold tracking-tight mt-4">{t('Custom API')}</div>
                  <p className="text-base text-dim mt-3 leading-relaxed">
                    {t('For sovereign funds, university tech transfer offices, and regional accelerators to manage deal flow pipelines.')}
                  </p>
                </div>
                <ul className="space-y-3 text-base text-ink2">
                  {['White-label intake engine', 'API export to portfolio ERPs', 'Dedicated compliance review officer'].map((x) => (
                    <li key={x} className="flex items-center gap-3">
                      <CheckCircle2 className="w-[18px] h-[18px] text-accent shrink-0" />
                      <span>{t(x)}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="mt-auto h-12 px-6 rounded-2xl bg-panel hover:bg-panel2 text-ink font-semibold shadow-s1 transition-colors"
                >
                  {t('Contact Institutional Team')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSE */}
        <section className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="relative overflow-hidden rounded-[2.25rem] bg-panel shadow-s3 px-8 py-14 sm:px-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="absolute -top-20 -end-20 w-[420px] h-[420px] bg-glow-b rounded-full blur-[110px] pointer-events-none" aria-hidden="true"></div>
              <h2 className="lg:col-span-7 relative text-4xl sm:text-6xl font-extrabold tracking-[-0.035em] leading-[1.02] text-balance">
                {ar ? 'ابدأ ببناء علاقات استثمارية موثوقة اليوم' : 'Start Building Trusted Investment Connections Today.'}
              </h2>
              <div className="lg:col-span-5 relative flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="h-14 px-7 rounded-2xl bg-accent hover:bg-accent-hi text-on-accent font-semibold text-base shadow-s2 transition-colors inline-flex items-center justify-center gap-2.5 whitespace-nowrap"
                >
                  <span>{ar ? 'انضم كرائد أعمال' : 'Join as Entrepreneur'}</span>
                  <ArrowRight className="w-5 h-5 rtl:-scale-x-100" />
                </button>
                <button
                  onClick={() => handleOpenDealRoomFromAnywhere()}
                  className="h-14 px-7 rounded-2xl bg-panel2 hover:bg-chip text-ink font-semibold text-base transition-colors inline-flex items-center justify-center gap-2.5 whitespace-nowrap"
                >
                  <Lock className="w-5 h-5 text-accent" />
                  <span>{ar ? 'انضم كمستثمر معتمد' : 'Join as Accredited Investor'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-sunken py-16 text-sm text-dim">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
            <div className="space-y-4">
              <div className="text-lg font-bold text-ink flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-accent"></span>
                <span>Vestra Connect</span>
              </div>
              <p className="leading-relaxed max-w-xs">
                {t('The institutional venture operating system transforming raw business ideas into verified, investable opportunities across Jordan and MENA.')}
              </p>
            </div>

            <div>
              <div className="font-semibold text-ink mb-4">{t('Ecosystem')}</div>
              <ul className="space-y-3">
                <li><a href="#jordan-map" className="hover:text-ink transition-colors">{t('Jordan Venture Map')}</a></li>
                <li><a href="#journey-engine" className="hover:text-ink transition-colors">{t('Journey Engine')}</a></li>
                <li><a href="#marketplace" className="hover:text-ink transition-colors">{t('Curated Pipeline')}</a></li>
                <li><a href="#trust-system" className="hover:text-ink transition-colors">{t('Trust Engine')}</a></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-ink mb-4">{t('Governance & Legal')}</div>
              <ul className="space-y-3">
                <li>{t('Jordan Electronic Transactions Law #15')}</li>
                <li>{t('Ministry of Industry & Trade Compliance')}</li>
                <li>{t('Bilateral NDA Standard Protocol')}</li>
                <li>{t('256-Bit Encrypted Data Rooms')}</li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-ink mb-4">{t('Amman Headquarters')}</div>
              <p className="leading-relaxed">
                {t('King Hussein Business Park (KHBP)')}<br />
                {t('Building 23, Tech Cluster')}<br />
                {t('Amman, Hashemite Kingdom of Jordan')}<br />
                <span className="text-accent mt-2 block" dir="ltr">deals@vestraconnect.jo</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-faint">
            <div>{t('© 2026 Vestra Connect MENA. All rights reserved.')}</div>
            <div>{t('Ideas Enter. Trust Is Built. Deals Move Forward.')}</div>
          </div>
        </div>
      </footer>

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
