export interface ProjectItem {
  id: string;
  title: string;
  slogan?: string;
  category: string;
  role?: string;
  statusBadge: string;
  description: string;
  detailedPoints: string[];
  highlights: string[];
  image: string;
  tags: string[];
  externalLink?: string;
  featured: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: {
    name: string;
    level?: string;
    note?: string;
  }[];
  authenticNote?: string;
}

export interface IdeaItem {
  id: string;
  title: string;
  category: 'Digital Culture' | 'Tech Systems' | 'Creator Tools' | 'Innovation & Impact';
  status: 'CONCEPT' | 'IN DEVELOPMENT' | 'PROTOTYPE' | 'COMPLETED';
  shortDescription: string;
  fullNotes: string;
  potentialImpact: string;
  techStackOrMethod: string[];
}

export interface AchievementItem {
  id: string;
  metric: string;
  label: string;
  sublabel: string;
  verificationStatus: 'verified' | 'reported_pending_audit';
  verificationNote: string;
  badge?: string;
}

export const PERSONAL_BRAND = {
  name: 'Bedis Jaballah',
  location: 'Djerba / Tunisia',
  education: 'IT Student at ISET Djerba',
  headline: 'IT Student · Creative Innovator · Entrepreneur · Digital Creator',
  heroIntroduction: "HELLO, I'M",
  statement: "I don't just follow ideas. I imagine them, develop them, and turn them into reality.",
  bio: "Exploring the intersection of technology, creativity, and entrepreneurship. Building ideas, solving problems, and creating meaningful digital experiences.",
  avatar: '/src/assets/images/bedis_jaballah_portrait.jpg',
  extendedBio: [
    "I'm Bedis Jaballah, an IT student at ISET Djerba with a strong interest in technology, creative design, digital media, and entrepreneurship.",
    "I enjoy understanding how things work, solving technical problems, exploring new technologies, and transforming ideas into real projects.",
    "My interests go beyond programming. I work across digital design, content creation, video editing, photography, technical troubleshooting, and innovative project development.",
    "I believe creativity becomes more powerful when combined with technical knowledge and the ability to execute."
  ],
  contacts: {
    email: 'bedisjaballah9@gmail.com',
    emailMailto: 'mailto:bedisjaballah9@gmail.com',
    instagram: 'https://www.instagram.com/bedis.jh/',
    tiktok: 'https://www.tiktok.com/@bedis.jaballah',
  },
  pillars: [
    { title: 'Technology', desc: 'Hardware diagnostics, OS optimization, programming fundamentals, and computer systems.' },
    { title: 'Creativity', desc: 'Visual storytelling, brand aesthetics, video editing, and dynamic motion design.' },
    { title: 'Problem Solving', desc: 'Root-cause analysis, software troubleshooting, and workflow tuning.' },
    { title: 'Innovation', desc: 'Transforming local cultural assets and digital tools into forward-thinking concepts.' },
    { title: 'Entrepreneurship', desc: 'Business concept development, pitch strategy, and impactful community ventures.' },
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'it-tech',
    title: 'IT & Technical Diagnostics',
    subtitle: 'System optimization, diagnostics, and computer systems',
    skills: [
      { name: 'Windows Troubleshooting', note: 'Advanced diagnostics & recovery' },
      { name: 'PC Optimization & Performance Tuning', note: 'Latency reduction & thermal airflow' },
      { name: 'Hardware & Software Diagnostics', note: 'Component stress testing & bug triage' },
      { name: 'Software & Driver Installation', note: 'Clean installs & firmware alignment' },
      { name: 'Windows Configuration & Maintenance', note: 'Policy & registry hygiene' },
      { name: 'Gaming Performance Optimization', note: 'Frame pacing & GPU tuning' },
      { name: 'Programming Fundamentals', note: 'Logic structures & algorithmic thinking' },
      { name: 'Web Development', note: 'Frontend UI & interactive applications' },
      { name: 'Databases', note: 'Relational data modeling & SQL' },
      { name: 'Software Engineering', note: 'Architecture & maintainability' },
      { name: 'Computer Systems', note: 'OS architecture & hardware synergy' },
    ],
  },
  {
    id: 'creative-design',
    title: 'Creative Design & Motion',
    subtitle: 'Visual identity, graphic direction, and narrative motion',
    skills: [
      { name: 'Canva', level: 'Mastered', note: 'High-impact pitch decks & social assets' },
      { name: 'CapCut', level: 'Mastered', note: 'High-retention mobile video editing & pacing' },
      { name: 'Video Editing', note: 'Cuts, transitions, sound design & dynamic pacing' },
      { name: 'Graphic Design', note: 'Composition, balance, and modern aesthetic layout' },
      { name: 'Branding & Visual Identity', note: 'Cohesive color systems & typographic rules' },
      { name: 'Social Media Design', note: 'Platform-optimized visual packaging' },
      { name: 'Visual Storytelling', note: 'Translating concepts into memorable sequences' },
    ],
  },
  {
    id: 'photo-video',
    title: 'Photography & Videography',
    subtitle: 'Mobile-first visual capture and creative lens framing',
    authenticNote: 'Captured and produced entirely with smartphone technology. Focused on authentic framing, mobile agility, and creative composition rather than bulky studio gear.',
    skills: [
      { name: 'Smartphone Photography', note: 'Composition, natural lighting & angles' },
      { name: 'Mobile Videography', note: 'Stabilization techniques & dynamic movement' },
      { name: 'Creative Framing & Composition', note: 'Rule of thirds, leading lines & depth' },
      { name: 'Photo Editing', note: 'Color grading, contrast & clarity balance' },
      { name: 'Reels & Promotional Videos', note: 'High-retention short-form edits' },
      { name: 'Mobile Content Creation', note: 'On-the-go production & rapid publishing' },
    ],
  },
  {
    id: 'innovation-entrepreneurship',
    title: 'Innovation & Entrepreneurship',
    subtitle: 'From initial conceptual sparks to structured startup models',
    skills: [
      { name: 'Creative Thinking', note: 'Cross-domain pattern matching' },
      { name: 'Problem Solving', note: 'Identifying real user friction points' },
      { name: 'Idea Development', note: 'Concept refinement & roadmap structuring' },
      { name: 'Business Model Development', note: 'Value propositions & revenue pathways' },
      { name: 'Startup Concepts', note: 'Innova Live tourism model' },
      { name: 'Project Management', note: 'Milestone tracking & task delegation' },
      { name: 'Pitching & Presentation', note: 'Clear storytelling for audiences & panels' },
      { name: 'Innovative Solutions', note: 'Blending local culture with technology' },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'innova-live',
    title: 'Innova Live',
    slogan: "Don't visit Tunisia. Enter its story.",
    category: 'Cultural Tourism & Tech Concept',
    statusBadge: 'CONCEPT & PROTOTYPE DESIGN',
    description: 'Innova Live is a tourism startup concept that transforms visiting Tunisia and Djerba into an immersive, living narrative combining cultural heritage, artificial intelligence, interactive games, and authentic local experiences.',
    detailedPoints: [
      'Connects international and local travelers directly with artisan families, historic storytellers, and island guilds in Djerba.',
      'Integrates interactive cultural quests and location-based missions rather than passive guided tours.',
      'Designed to direct economic benefit directly to local artisans, traditional craftspeople, and culinary guardians.',
      'Clearly structured as an entrepreneurial concept and prototype blueprint ready for incubator presentation.'
    ],
    highlights: [
      'Tourism Technology',
      'Smart Cultural Companion',
      'Interactive Quests',
      'Local Economic Impact',
      'Djerba Heritage Preservation',
      'Startup Pitch Ready'
    ],
    image: '/src/assets/images/innova_live_tunisia_1793959195981.jpg',
    tags: ['Startup Concept', 'Tourism Tech', 'Interactive Guidance', 'Cultural Heritage'],
    featured: true,
  },
  {
    id: 'enactus-iset-djerba',
    title: 'Enactus ISET Djerba',
    role: 'Media Manager',
    category: 'Media Management & Visual Communication',
    statusBadge: 'ACTIVE LEADERSHIP ROLE',
    description: 'Serving as Media Manager for Enactus ISET Djerba, driving overall creative direction, visual communication, digital campaign design, and event coverage for social innovation initiatives.',
    detailedPoints: [
      'Leading visual identity and social media content creation across multiple digital channels.',
      'Producing promotional reels, event recap videos, and participant highlights using mobile videography workflows.',
      'Coordinating media coverage for hackathons, community entrepreneurship challenges, and youth forums.',
      'Crafting compelling storytelling that amplifies the social and economic impact of student initiatives.'
    ],
    highlights: [
      'Media Management',
      'Content Creation',
      'Visual Communication',
      'Social Media Strategy',
      'Smartphone Videography',
      'Creative Campaigns'
    ],
    image: '/src/assets/images/enactus_media_management_1793959195984.jpg',
    tags: ['Media Management', 'Visual Storytelling', 'Social Impact', 'Videography'],
    featured: true,
  },
  {
    id: 'personal-it-diagnostics',
    title: 'Personal IT Diagnostics & Optimization',
    category: 'Systems & Technical Diagnostics',
    statusBadge: 'HANDS-ON TECHNICAL PRACTICE',
    description: 'A focused suite of technical experiments, operating system diagnostic procedures, and hardware performance tuning workflows developed through real-world PC troubleshooting.',
    detailedPoints: [
      'Advanced Windows OS troubleshooting: resolution of driver conflicts, registry integrity checks, and crash dump analysis.',
      'Hardware benchmarking: thermal pacing, power limits, and memory timings tuning for peak stability.',
      'Gaming optimization: reducing input latency, unparking cores, and tailoring background service priority.',
      'Routine diagnostic methodology built on systematic root-cause isolation rather than guesswork.'
    ],
    highlights: [
      'Windows Troubleshooting',
      'PC Hardware Diagnostics',
      'Latency Optimization',
      'Driver Hygiene',
      'Benchmarking Workflows'
    ],
    image: '/src/assets/images/personal_it_diagnostics_1793959196155.jpg',
    tags: ['IT Diagnostics', 'Hardware Tuning', 'System Optimization', 'Troubleshooting'],
    featured: false,
  },
  {
    id: 'digital-content-creation',
    title: 'Digital Content Creation & Storytelling',
    category: 'Creative Media & Gaming',
    statusBadge: 'CREATOR EXPERIMENTS',
    description: 'Exploring dynamic video editing, gaming content creation, and digital narrative pacing with a distinctive mobile creator identity and high-retention editing techniques.',
    detailedPoints: [
      'Mastering CapCut and Canva to produce rapid-cadence, rhythm-synced gaming highlights and visual reels.',
      'Experimenting with sound effects, jump cuts, kinetic captions, and visual emphasis to maintain audience attention.',
      'Analyzing viewer retention analytics and engagement patterns to iterate on narrative structure.',
      'Crafting an authentic digital creator persona that bridges technical curiosity with entertaining media.'
    ],
    highlights: [
      'CapCut Video Editing',
      'Gaming Storytelling',
      'Kinetic Text & Pacing',
      'Social Content Production',
      'Audience Engagement'
    ],
    image: '/src/assets/images/digital_content_creator_1793959198027.jpg',
    tags: ['Video Editing', 'CapCut Mastered', 'Gaming Media', 'Social Content'],
    featured: false,
  },
];

export const IDEAS_LAB: IdeaItem[] = [
  {
    id: 'idea-01',
    title: 'Djerba Heritage AR Discovery Portal',
    category: 'Digital Culture',
    status: 'IN DEVELOPMENT',
    shortDescription: 'Augmented reality mobile experience overlaying historic Djerba architectural timelines over physical village landmarks.',
    fullNotes: 'Utilizing geolocation anchors and smartphone cameras so tourists can point their phone at ancient gates or pottery kilns in Guellala and see 3D historical reconstructions and artisan narration.',
    potentialImpact: 'Elevates cultural awareness and turns heritage preservation into an engaging youth-friendly adventure.',
    techStackOrMethod: ['WebXR / AR.js', 'Mobile Vision', 'Local Audio Narration', 'Heritage Archives'],
  },
  {
    id: 'idea-02',
    title: 'Zero-Latency Windows Diagnostic Script Kit',
    category: 'Tech Systems',
    status: 'PROTOTYPE',
    shortDescription: 'Automated PowerShell diagnostics tool that benchmarks latency, tests memory health, and audits bloatware in 60 seconds.',
    fullNotes: 'A lightweight modular script pack designed for quick troubleshooting during on-site PC consultations. Eliminates manual clickwork by generating a clean diagnostic checklist report.',
    potentialImpact: 'Saves 30+ minutes per PC diagnostic session and standardizes troubleshooting rigor.',
    techStackOrMethod: ['PowerShell', 'Windows WMI/CIM', 'Event Viewer Parsing', 'Hardware Sensors'],
  },
  {
    id: 'idea-03',
    title: 'Micro-Creator Rapid Asset Compiler',
    category: 'Creator Tools',
    status: 'CONCEPT',
    shortDescription: 'Workflow tool for smartphone creators to batch-format vertical video captions, sound cues, and cover typography.',
    fullNotes: 'A template and prompt framework designed specifically for creators using CapCut and Canva on mobile, optimizing asset export dimensions and text safe zones across TikTok and Instagram Reels.',
    potentialImpact: 'Drastically reduces the friction between raw smartphone footage and published polished media.',
    techStackOrMethod: ['Mobile Workflows', 'CapCut Presets', 'Canva Layout Engine', 'Safe Zone Grids'],
  },
  {
    id: 'idea-04',
    title: 'Innova Local Artisan Micro-Payout Ledger',
    category: 'Innovation & Impact',
    status: 'CONCEPT',
    shortDescription: 'Transparent revenue-sharing model ensuring tourist tip allocations go directly to local craftspeople and families.',
    fullNotes: 'Concept blueprint within the Innova Live startup ecosystem. Enables verified visitors to scan QR codes at weaving or pottery stalls to support the artisan family directly without intermediary leakages.',
    potentialImpact: 'Empowers traditional craft communities in southern Tunisia to sustain their heritage through direct economic dignity.',
    techStackOrMethod: ['Mobile QR Gateways', 'Direct Settlement Blueprints', 'Artisan Registry', 'Impact Reporting'],
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'views-stat',
    metric: '13.3M+',
    label: 'Video Views',
    sublabel: 'Cumulative views reported across short-form video releases',
    verificationStatus: 'reported_pending_audit',
    verificationNote: 'Previously reported achievement across short-form creator platforms — undergoing verified current audit.',
    badge: 'Creator Reach',
  },
  {
    id: 'innova-stat',
    metric: '01',
    label: 'Innova Live Project',
    sublabel: 'Original cultural tourism & tech experience startup concept',
    verificationStatus: 'verified',
    verificationNote: 'Active startup concept & prototype blueprint, designed for Tunisian cultural discovery.',
    badge: 'Startup Concept',
  },
  {
    id: 'enactus-stat',
    metric: '01',
    label: 'Enactus Media Manager',
    sublabel: 'Leading visual communication & digital production at ISET Djerba',
    verificationStatus: 'verified',
    verificationNote: 'Official appointed media manager role coordinating campaigns and coverage.',
    badge: 'Leadership Role',
  },
  {
    id: 'iset-stat',
    metric: 'IT',
    label: 'Student at ISET Djerba',
    sublabel: 'Higher Institute of Technological Studies of Djerba',
    verificationStatus: 'verified',
    verificationNote: 'Academic pursuit in Information Technology, computer systems, and software fundamentals.',
    badge: 'Education',
  },
];
