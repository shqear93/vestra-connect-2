import heroImg from '../assets/images/hero_jordan_venture_1791711973387.jpg';
import greentechImg from '../assets/images/project_greentech_jordan_1791711986775.jpg';
import medtechImg from '../assets/images/project_medtech_amman_1791711997656.jpg';
import dealroomImg from '../assets/images/dealroom_executive_jordan_1791712008953.jpg';

export interface VentureProject {
  id: string;
  name: string;
  arabicName: string;
  category: 'AgriTech' | 'MedTech' | 'Enterprise SaaS' | 'CleanTech' | 'Logistics' | 'Culinary & Retail';
  governorate: string;
  locationName: string;
  coordinates: { x: number; y: number }; // Percentage on Jordan Map (0-100)
  targetCapital: string;
  capitalAmountUSD: number;
  stage: 'Pre-Seed' | 'Seed' | 'Growth' | 'Series A' | 'Pre-Series A';
  completeness: number; // e.g. 88%
  riskLevel: 'Low' | 'Low-Med' | 'Medium';
  matchedInvestorsCount: number;
  summary: string;
  arabicSummary: string;
  founder: {
    name: string;
    role: string;
    priorBackground: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
  dealRoomStatus: 'Active Discussions' | 'Term Sheet Issued' | 'Diligence Stage' | 'Matching';
  image: string;
  keyHighlights: string[];
}

export interface CapitalRoute {
  id: string;
  name: string;
  from: string;
  to: string;
  pathD: string; // SVG path data
  dealTitle: string;
  volume: string;
  duration: number; // Animation duration in seconds
}

export const JORDAN_VENTURES: VentureProject[] = [
  {
    id: 'greentech-jordan-valley',
    name: 'Wadi Verdant Smart AgriTech',
    arabicName: 'وادي فردانت للزراعة الذكية',
    category: 'AgriTech',
    governorate: 'Jordan Valley (Al-Balqa)',
    locationName: 'Deir Alla, Jordan Valley',
    coordinates: { x: 31, y: 36 },
    targetCapital: '$420,000',
    capitalAmountUSD: 420000,
    stage: 'Growth',
    completeness: 92,
    riskLevel: 'Low',
    matchedInvestorsCount: 18,
    summary: 'Automated desert greenhouse hydroponics and sensor-guided drip systems saving 78% irrigation water while quadrupling berry and leafy greens yield.',
    arabicSummary: 'بيوت زراعية ذكية بنظام الزراعة المائية وأجهزة استشعار تقلل استهلاك المياه بنسبة 78٪ وتضاعف إنتاج المحاصيل التصديرية.',
    founder: {
      name: 'Tariq Al-Muhtaseb',
      role: 'Co-founder & Agronomist',
      priorBackground: 'Ex-Regional Lead at NARC with 12 years in arid-zone precision agriculture.'
    },
    metrics: [
      { label: 'Annual Run-rate', value: '$840k ARR' },
      { label: 'Water Efficiency', value: '+78%' },
      { label: 'Export Contracts', value: '4 Gulf Retailers' },
      { label: 'Gross Margin', value: '54%' }
    ],
    dealRoomStatus: 'Term Sheet Issued',
    image: greentechImg,
    keyHighlights: [
      'Operational across 14 dunums in Deir Alla',
      'Exclusive distribution agreement with GCC premium supermarkets',
      'Patented climate-adaptive solar shade thermal canopy',
      'Audited by Deloitte Amman (FY2025)'
    ]
  },
  {
    id: 'medtech-amman',
    name: 'Al-Shefa Robotic Diagnostics',
    arabicName: 'الشفاء للتشخيص الطبي المتقدم',
    category: 'MedTech',
    governorate: 'Amman Governorate',
    locationName: 'Abdali Medical District, Amman',
    coordinates: { x: 42, y: 34 },
    targetCapital: '$750,000',
    capitalAmountUSD: 750000,
    stage: 'Series A',
    completeness: 96,
    riskLevel: 'Low-Med',
    matchedInvestorsCount: 14,
    summary: 'Next-generation AI histopathology and automated cellular image analysis cutting oncology biopsy turnaround time from 9 days to 4 hours.',
    arabicSummary: 'حلول تشخيص الأورام الخلوية المدعومة بالذكاء الاصطناعي تقلل زمن فحص الخزعات من 9 أيام إلى 4 ساعات بدقة موثقة مخبرياً.',
    founder: {
      name: 'Dr. Reem Al-Khatib',
      role: 'Chief Medical Officer & Co-founder',
      priorBackground: 'Fellow at King Hussein Cancer Center, Postdoc at Imperial College London.'
    },
    metrics: [
      { label: 'Hospitals Deployed', value: '9 Tier-1 Centers' },
      { label: 'Diagnostic Accuracy', value: '99.4%' },
      { label: 'Turnaround Time', value: '4.2 Hours' },
      { label: 'Monthly Scans', value: '18,500+' }
    ],
    dealRoomStatus: 'Diligence Stage',
    image: medtechImg,
    keyHighlights: [
      'Jordan FDA (JFDA) accredited & CE Mark registered',
      'Over 65,000 clinical samples processed without false negatives',
      'Lead syndicate backed by Amman Angel Network & regional healthcare fund',
      'Complete intellectual property portfolio held in Amman Free Zone'
    ]
  },
  {
    id: 'nexura-saas-amman',
    name: 'Nexura Arabic Enterprise Intelligence',
    arabicName: 'نيكسورا لذكاء الأعمال والخدمات السحابية',
    category: 'Enterprise SaaS',
    governorate: 'Amman Governorate',
    locationName: 'King Hussein Business Park (KHBP)',
    coordinates: { x: 40, y: 37 },
    targetCapital: '$350,000',
    capitalAmountUSD: 350000,
    stage: 'Seed',
    completeness: 89,
    riskLevel: 'Low',
    matchedInvestorsCount: 16,
    summary: 'Localized dialect-aware conversational AI engine for enterprise banking and telecom customer resolution across Jordan and the Levant.',
    arabicSummary: 'محرك ذكاء اصطناعي محادثاتي يفهم اللهجات العربية المحكية لخدمة عملاء البنوك والاتصالات في الأردن والشرق الأوسط.',
    founder: {
      name: 'Zaid Haddad',
      role: 'Founder & CEO',
      priorBackground: 'Former Senior Systems Architect at Careem & Oracle MENA.'
    },
    metrics: [
      { label: 'Annual Recurring Rev', value: '$310k' },
      { label: 'Customer Resolution', value: '88% Automated' },
      { label: 'Net Retention Rate', value: '132%' },
      { label: 'Dialect Precision', value: '98.1%' }
    ],
    dealRoomStatus: 'Active Discussions',
    image: heroImg,
    keyHighlights: [
      'Serving 3 Jordanian commercial banks and 2 regional telecom operators',
      'Zero latency on-premise sovereign cloud deployments',
      'Expanding into Saudi Arabia and UAE markets Q3',
      'Winner of Jordan ICT Innovation Prize'
    ]
  },
  {
    id: 'redsea-logistics-aqaba',
    name: 'RedSea Maritime Smart Corridors',
    arabicName: 'ممرات البحر الأحمر اللوجستية الذكية',
    category: 'Logistics',
    governorate: 'Aqaba Governorate',
    locationName: 'ASEZA Port Zone, Aqaba',
    coordinates: { x: 19, y: 91 },
    targetCapital: '$600,000',
    capitalAmountUSD: 600000,
    stage: 'Pre-Series A',
    completeness: 86,
    riskLevel: 'Medium',
    matchedInvestorsCount: 11,
    summary: 'Real-time multi-modal container tracking and customs telemetry platform connecting Aqaba Port to Amman inland dry ports and GCC trucking lanes.',
    arabicSummary: 'منصة تتبع ومزامنة الحاويات والجمارك عبر إنترنت الأشياء تربط ميناء العقبة بالموانئ البرية في عمان وممرات الشحن الإقليمية.',
    founder: {
      name: 'Omar Naboulsi',
      role: 'Managing Director',
      priorBackground: '15 years in Red Sea supply-chain shipping and customs clearance operations.'
    },
    metrics: [
      { label: 'Truck Fleet Connected', value: '1,200 Trucks' },
      { label: 'Customs Delay Cut', value: '-62%' },
      { label: 'Monthly Freight', value: '42,000 Tons' },
      { label: 'Port Partners', value: 'ASEZA & APM' }
    ],
    dealRoomStatus: 'Active Discussions',
    image: dealroomImg,
    keyHighlights: [
      'Integrated with Aqaba Special Economic Zone Authority APIs',
      'Real-time GPS + thermal container sensor network',
      'Strategic corridor positioning for Jordan-Iraq-GCC trade flows',
      'High cash flow positivity since Month 8'
    ]
  },
  {
    id: 'heliogrid-clean-mafraq',
    name: 'HelioGrid Clean Storage & Microgrids',
    arabicName: 'هيليوجريد لتخزين الطاقة المتجددة',
    category: 'CleanTech',
    governorate: 'Mafraq Governorate',
    locationName: 'Mafraq Solar Corridor',
    coordinates: { x: 55, y: 24 },
    targetCapital: '$520,000',
    capitalAmountUSD: 520000,
    stage: 'Seed',
    completeness: 90,
    riskLevel: 'Medium',
    matchedInvestorsCount: 13,
    summary: 'Containerized iron-flow battery storage and telemetry units enabling 24/7 off-peak industrial solar usage without lithium fire degradation.',
    arabicSummary: 'أنظمة تخزين طاقة شمسية تعتمد على بطاريات التدفق غير القابلة للاشتعال للمصانع والمنشآت الكبرى في منطقة المفرق الصناعية.',
    founder: {
      name: 'Salma Al-Bashir',
      role: 'Chief Technology Officer',
      priorBackground: 'Doctorate in Renewable Materials from Jordan University of Science & Technology.'
    },
    metrics: [
      { label: 'Storage Capacity', value: '4.8 MWh Live' },
      { label: 'Degradation Rate', value: '0.2%/yr' },
      { label: 'Industrial Clients', value: '7 Plants' },
      { label: 'IRR Projection', value: '24.6%' }
    ],
    dealRoomStatus: 'Matching',
    image: greentechImg,
    keyHighlights: [
      'Jordanian intellectual property in electrolyte stability',
      '25-year design lifespan with zero rare-earth toxic materials',
      'Supported by Ministry of Energy commercial sandbox exemption',
      'Syndicate participation from clean-tech sovereign funds'
    ]
  },
  {
    id: 'bionerve-irbid',
    name: 'BionicNerve Sensor Robotics',
    arabicName: 'بايونك نيرف للأطراف الذكية والمستشعرات',
    category: 'MedTech',
    governorate: 'Irbid Governorate',
    locationName: 'Yarmouk Tech Park, Irbid',
    coordinates: { x: 34, y: 19 },
    targetCapital: '$220,000',
    capitalAmountUSD: 220000,
    stage: 'Seed',
    completeness: 88,
    riskLevel: 'Low-Med',
    matchedInvestorsCount: 8,
    summary: 'Affordable 3D-printed bionic upper limb prosthetics with myoelectric sensor learning, costing 80% less than imported German alternatives.',
    arabicSummary: 'أطراف صناعية ذكية ثلاثية الأبعاد مزودة بمستشعرات عضلية كهربائية توفر حركة دقيقة بتكلفة تقل بنسبة 80٪ عن الأجهزة المستوردة.',
    founder: {
      name: 'Eng. Hani Qudah',
      role: 'Hardware Lead & Founder',
      priorBackground: 'Mechatronics engineering alumnus from JUST, national robotics champion.'
    },
    metrics: [
      { label: 'Patients Fitted', value: '142 Patients' },
      { label: 'Cost vs German Eq.', value: '-82%' },
      { label: 'Grip Modes', value: '14 Presets' },
      { label: 'Rehab Centers', value: '6 Partner Clinics' }
    ],
    dealRoomStatus: 'Active Discussions',
    image: medtechImg,
    keyHighlights: [
      'Clinical trial completed in Royal Medical Services partnership',
      'Patient calibration via smartphone Bluetooth app',
      'Scalable additive manufacturing facility in Irbid Industrial Estate',
      'Grant-backed R&D now commercializing into pan-Arab exports'
    ]
  },
  {
    id: 'heritage-culinary-salt',
    name: 'Beit Al-Qamar Artisan Heritage',
    arabicName: 'بيت القمر للضيافة والتراث المعتمد',
    category: 'Culinary & Retail',
    governorate: 'Balqa (As-Salt)',
    locationName: 'Historic As-Salt Old City',
    coordinates: { x: 35, y: 32 },
    targetCapital: '$180,000',
    capitalAmountUSD: 180000,
    stage: 'Growth',
    completeness: 84,
    riskLevel: 'Low',
    matchedInvestorsCount: 15,
    summary: 'UNESCO World Heritage culinary franchise and vacuum-sealed artisan Jordan gastronomy brand expanding across Amman, Dead Sea & Gulf outlets.',
    arabicSummary: 'سلسلة مطاعم وتعبئة أطعمة تراثية حاصلة على تصنيف اليونسكو تتوسع من مدينة السلط إلى عمان ومراكز التسوق الإقليمية.',
    founder: {
      name: 'Lina Al-Fayez',
      role: 'Creative Director & Founder',
      priorBackground: 'Hospitality entrepreneur with 10 years curating authentic Jordanian culinary spaces.'
    },
    metrics: [
      { label: 'Monthly Visitors', value: '14,200' },
      { label: 'Franchise Locations', value: '3 Active, 4 Pipeline' },
      { label: 'Same-Store Growth', value: '+38% YoY' },
      { label: 'EBITDA Margin', value: '31%' }
    ],
    dealRoomStatus: 'Term Sheet Issued',
    image: dealroomImg,
    keyHighlights: [
      'Anchor location in UNESCO-recognized As-Salt architectural district',
      'Franchise agreement signed for 2 prime locations in West Amman',
      'Direct sourcing agreements with 40+ local female agricultural cooperatives',
      'Zero debt, immediate cash yield profile for angel syndicates'
    ]
  },
  {
    id: 'zarqa-mecatronic',
    name: 'Zarqa IndusRobotics Line Automation',
    arabicName: 'الزرقاء للروبوتات والأتمتة الصناعية',
    category: 'Enterprise SaaS',
    governorate: 'Zarqa Governorate',
    locationName: 'Zarqa Industrial Free Zone',
    coordinates: { x: 46, y: 31 },
    targetCapital: '$480,000',
    capitalAmountUSD: 480000,
    stage: 'Seed',
    completeness: 87,
    riskLevel: 'Medium',
    matchedInvestorsCount: 10,
    summary: 'Retrofit industrial computer vision sensors that upgrade existing legacy textile and plastics machinery with predictive downtime alerts.',
    arabicSummary: 'أنظمة رؤية حاسوبية ذكية تُركب على خطوط الإنتاج القائمة في مصانع البلاستيك والغزل لتفادي الأعطال المفاجئة ورفع الكفاءة.',
    founder: {
      name: 'Bashar Nazzal',
      role: 'Systems Architect',
      priorBackground: 'Industrial automation contractor for Saudi ARAMCO & SABIC vendors.'
    },
    metrics: [
      { label: 'Machine Downtime Cut', value: '-43%' },
      { label: 'Active Sensors', value: '450 In Field' },
      { label: 'Client Payback Period', value: '3.4 Months' },
      { label: 'Factories Contracted', value: '12 Facilities' }
    ],
    dealRoomStatus: 'Active Discussions',
    image: heroImg,
    keyHighlights: [
      'Turnkey hardware + cloud SaaS telemetry subscription',
      'Installed in Zarqa Free Zone manufacturing plants',
      'Rapid deployment: installation takes less than 2 hours per line',
      'Pre-negotiated distributor partner in Riyadh and Dammam'
    ]
  }
];

export const JORDAN_CAPITAL_CORRIDORS: CapitalRoute[] = [
  {
    id: 'corridor-amman-aqaba',
    name: 'Amman VC Syndicate → Aqaba Maritime Hub',
    from: 'Amman KHBP',
    to: 'Aqaba Port',
    // SVG curved path connecting Amman (x:40, y:37) to Aqaba (x:19, y:91)
    pathD: 'M 160 148 C 145 220, 95 300, 76 364',
    dealTitle: 'RedSea Logistics Pre-Series A ($600k)',
    volume: '$600,000',
    duration: 3.5
  },
  {
    id: 'corridor-valley-amman',
    name: 'Jordan Valley AgriTech → Amman Capital Pool',
    from: 'Deir Alla Valley',
    to: 'Abdali District',
    pathD: 'M 124 144 C 138 140, 155 142, 168 136',
    dealTitle: 'Wadi Verdant Growth Round ($420k)',
    volume: '$420,000',
    duration: 2.8
  },
  {
    id: 'corridor-irbid-amman',
    name: 'Irbid Tech Cluster → Amman Angel Syndicate',
    from: 'Yarmouk Hub',
    to: 'Amman KHBP',
    pathD: 'M 136 76 C 142 105, 154 125, 160 148',
    dealTitle: 'BionicNerve Seed Syndication ($220k)',
    volume: '$220,000',
    duration: 3.2
  },
  {
    id: 'corridor-amman-mafraq',
    name: 'Amman Clean Fund → Mafraq HelioGrid Corridor',
    from: 'Amman Finance',
    to: 'Mafraq Solar Grid',
    pathD: 'M 160 148 C 180 130, 205 110, 220 96',
    dealTitle: 'HelioGrid Clean Energy Deployment ($520k)',
    volume: '$520,000',
    duration: 4.0
  }
];

export const JOURNEY_STAGES = [
  {
    number: 1,
    id: 'raw-idea',
    title: 'Raw Idea',
    arabicTitle: 'فكرة أولية خام',
    subtext: 'Rough unstructured note, pitch draft, or voice concept.',
    arabicSubtext: 'ملاحظة أولية أو مسودة غير منظمة بلا هيكل مالي.',
    badge: 'Draft Mode',
    completeness: 20,
    metric: 'Input Phase',
    exampleCard: {
      title: 'Local specialty coffee & food franchise expansion',
      founder: 'Sami K., Amman',
      state: 'Raw Text',
      description: 'Looking for roughly $120k-$150k to open 2 more branches in Abdali and Dabouq. Great footfall, need cash for fitouts.'
    }
  },
  {
    number: 2,
    id: 'structured-profile',
    title: 'Structured Profile',
    arabicTitle: 'ملف مؤسساتي منظّم',
    subtext: 'Standardized unit economics, target capital, governance and timeline.',
    arabicSubtext: 'تنظيم القطاع، المرحلة، رأس المال المطلوب، ونموذج العمل المتسق.',
    badge: '84% Completeness',
    completeness: 60,
    metric: 'Standardized',
    exampleCard: {
      title: 'Specialty Artisan Cafe & Bakery Brand',
      founder: 'Sami Khoury (Sole Founder)',
      state: 'Standardized Profile',
      description: 'Category: F&B Franchise · Stage: Early Growth · Target: $150,000 for 18% equity · EBITDA: 28% across flagship unit.'
    }
  },
  {
    number: 3,
    id: 'verification',
    title: 'Verification',
    arabicTitle: 'التحقق والمصادقة',
    subtext: 'Identity verification, commercial register, bank records and manual review.',
    arabicSubtext: 'مراجعة السجل التجاري، هوية المؤسس، والمستندات المصرفية من قبل فريق الإدارة.',
    badge: 'Founder & Docs Verified',
    completeness: 85,
    metric: 'Audit Cleared',
    exampleCard: {
      title: 'Verified Commercial Profile',
      founder: 'Verified Identity ✓ · Ministry of Industry & Trade Reg #44192',
      state: 'Level 2 Cleared',
      description: 'Bank statements verified. Lease agreements for target retail sites reviewed. 3 past years financial records uploaded.'
    }
  },
  {
    number: 4,
    id: 'investor-match',
    title: 'Investor Matching',
    arabicTitle: 'مطابقة المستثمرين الذكية',
    subtext: 'Algorithmic affinity scoring matching sector, ticket size, and risk appetite.',
    arabicSubtext: 'توزيع الفرصة على مستثمرين معتمدين بناءً على القطاع وحجم التذكرة الاستثمارية.',
    badge: 'Matched with 14 Investors',
    completeness: 92,
    metric: '92% Top Affinity',
    exampleCard: {
      title: 'Investor Match Queue',
      founder: '14 Target Angels & Syndicates in Amman & GCC',
      state: 'Active Matches',
      description: 'Matched with Amman Hospitality Angels (94%), Levant Food Fund (89%), and 12 accredited private angels.'
    }
  },
  {
    number: 5,
    id: 'secure-conversation',
    title: 'Secure Conversation',
    arabicTitle: 'محادثة آمنة ومشفرة',
    subtext: 'Direct messaging begins only upon mutual opt-in and NDA protocol.',
    arabicSubtext: 'فتح قناة مراسلة مباشرة بعد تأكيد الاهتمام المتبادل والتوقيع الرقمي للسرية.',
    badge: '3 Active Inquiries',
    completeness: 95,
    metric: 'Direct Engagement',
    exampleCard: {
      title: 'Confidential Discussion Thread',
      founder: 'Engaged with Lead Angel (Amman Private Office)',
      state: 'Live Dialogue',
      description: 'Investor inquiry: "Reviewing your unit economics per square meter. Requesting breakdown of equipment amortization."'
    }
  },
  {
    number: 6,
    id: 'deal-room',
    title: 'Encrypted Deal Room',
    arabicTitle: 'غرفة الصفقة الآمنة',
    subtext: 'Full virtual data room: term sheets, cap table simulator, and closing checklists.',
    arabicSubtext: 'غرفة استثمار متكاملة: مسودة الشروط، جدول الحصص، المستندات القانونية، والخطوات التالية.',
    badge: 'Deal Room Ready',
    completeness: 100,
    metric: 'Closing Phase',
    exampleCard: {
      title: 'Virtual Deal Room #VC-2026-JO',
      founder: 'Syndicate Lead + 2 Co-Investors',
      state: 'Term Sheet Issued',
      description: '$150,000 committed · SHA & Articles of Association drafted · Target closing date: End of Month.'
    }
  }
];
