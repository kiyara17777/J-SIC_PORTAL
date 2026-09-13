export const DOMAINS = [
  "Agriculture",
  "Education",
  "Healthcare",
  "Water",
  "Sanitation",
  "Environment",
  "Rural Livelihoods",
  "Accessibility",
  "Urban Infrastructure",
  "Public Service Delivery",
  "Other",
] as const;

export type Domain = (typeof DOMAINS)[number];

export const DISTRICTS = [
  "Ranchi",
  "Gumla",
  "Dhanbad",
  "Jamshedpur (East Singhbhum)",
  "Bokaro",
  "Hazaribagh",
  "Deoghar",
  "Giridih",
  "Palamu",
  "Dumka",
  "Khunti",
  "Lohardaga",
  "Simdega",
  "Chaibasa (West Singhbhum)",
  "Sahibganj",
  "Godda",
];

export const DEPARTMENTS = [
  { id: "agri", name: "Agriculture Department", icon: "Sprout" },
  { id: "water", name: "Water Department", icon: "Droplets" },
  { id: "edu", name: "Education Department", icon: "GraduationCap" },
  { id: "health", name: "Healthcare Department", icon: "HeartPulse" },
  { id: "env", name: "Environment Department", icon: "Leaf" },
  { id: "rural", name: "Rural Development Department", icon: "Tractor" },
  { id: "urban", name: "Urban Development Department", icon: "Building2" },
  { id: "pwd", name: "Public Works Department", icon: "HardHat" },
];


export const DOMAIN_TONES: Record<string, string> = {
  Agriculture: "bg-[oklch(0.94_0.06_150)] text-[oklch(0.38_0.11_155)]",
  Education: "bg-[oklch(0.94_0.05_265)] text-[oklch(0.38_0.13_266)]",
  Healthcare: "bg-[oklch(0.95_0.05_20)] text-[oklch(0.44_0.16_22)]",
  Water: "bg-[oklch(0.94_0.05_230)] text-[oklch(0.4_0.12_232)]",
  Sanitation: "bg-[oklch(0.95_0.04_190)] text-[oklch(0.4_0.1_195)]",
  Environment: "bg-[oklch(0.94_0.06_135)] text-[oklch(0.38_0.11_140)]",
  "Rural Livelihoods": "bg-[oklch(0.95_0.06_75)] text-[oklch(0.42_0.12_60)]",
  Accessibility: "bg-[oklch(0.94_0.05_300)] text-[oklch(0.4_0.13_300)]",
  "Urban Infrastructure": "bg-[oklch(0.94_0.02_255)] text-[oklch(0.4_0.05_258)]",
  "Public Service Delivery": "bg-[oklch(0.95_0.05_330)] text-[oklch(0.42_0.13_330)]",
  Other: "bg-[oklch(0.94_0.01_255)] text-[oklch(0.45_0.03_258)]",
};

export const STAGES = [
  "Submitted",
  "Under Review",
  "Assigned",
  "Proposal Window",
  "Funded",
  "In Progress",
  "Prototype",
  "Piloted",
  "Resolved",
] as const;

export type Problem = {
  id: string;
  ref: string;
  title: string;
  domain: Domain;
  district: string;
  upvotes: number;
  daysLeft: number;
  proposals: number;
  stage: (typeof STAGES)[number];
  windowClosed: boolean;
  emailSent?: boolean;
  unfunded?: boolean;
  claim?: string;
  department: string;
};

export const PROBLEMS: Problem[] = [
  {
    id: "p1",
    ref: "JSIC-2026-0847",
    title: "Tomato crop pest damage across smallholder farms",
    domain: "Agriculture",
    district: "Gumla",
    upvotes: 14,
    daysLeft: 4,
    proposals: 4,
    stage: "In Progress",
    windowClosed: true,
    emailSent: true,
    claim: "Prototype",
    department: "agri",
  },
  {
    id: "p2",
    ref: "JSIC-2026-0812",
    title: "Handpumps running dry in summer months",
    domain: "Water",
    district: "Palamu",
    upvotes: 27,
    daysLeft: 0,
    proposals: 5,
    stage: "Funded",
    windowClosed: true,
    emailSent: true,
    department: "water",
  },
  {
    id: "p3",
    ref: "JSIC-2026-0798",
    title: "No ramp access at block-level primary health centre",
    domain: "Accessibility",
    district: "Ranchi",
    upvotes: 9,
    daysLeft: 6,
    proposals: 2,
    stage: "Proposal Window",
    windowClosed: false,
    department: "health",
  },
  {
    id: "p4",
    ref: "JSIC-2026-0776",
    title: "Coal dust affecting school attendance",
    domain: "Environment",
    district: "Dhanbad",
    upvotes: 31,
    daysLeft: 2,
    proposals: 3,
    stage: "Assigned",
    windowClosed: false,
    claim: "Piloted",
    department: "edu",
    unfunded: true,
  },
  {
    id: "p5",
    ref: "JSIC-2026-0755",
    title: "Lac cultivation yield loss for tribal SHGs",
    domain: "Rural Livelihoods",
    district: "Khunti",
    upvotes: 5,
    daysLeft: 9,
    proposals: 1,
    stage: "Under Review",
    windowClosed: false,
    department: "rural",
  },
  {
    id: "p6",
    ref: "JSIC-2026-0741",
    title: "Waterlogging at municipal ward market",
    domain: "Urban Infrastructure",
    district: "Jamshedpur (East Singhbhum)",
    upvotes: 18,
    daysLeft: 1,
    proposals: 4,
    stage: "Proposal Window",
    windowClosed: false,
    claim: "Prototype",
    department: "urban",
  },
];

export const PROPOSALS = [
  {
    id: "pr1",
    university: "Birsa Agricultural University",
    summary:
      "IoT pheromone traps plus a Hindi/Nagpuri SMS advisory that warns farmers 6 days before a pest outbreak window.",
    funding: "₹ 8,50,000",
    timeline: "7 months · Pilot on 40 farms",
    stage: "Prototype",
    needs: ["Funding", "Manufacturing", "Testing Site"],
  },
  {
    id: "pr2",
    university: "BIT Sindri",
    summary:
      "Low-cost solar sprayer with a bio-pesticide dosing cartridge, manufactured through a local SHG cluster.",
    funding: "₹ 6,20,000",
    timeline: "9 months · Pilot on 25 farms",
    stage: "Idea",
    needs: ["Funding", "Manufacturing", "Mentorship"],
  },
  {
    id: "pr3",
    university: "NIT Jamshedpur",
    summary:
      "Drone-based multispectral scouting service run as a village-level entrepreneur model with revenue sharing.",
    funding: "₹ 12,00,000",
    timeline: "12 months · 3 blocks",
    stage: "Pilot-ready",
    needs: ["Funding", "Testing Site"],
  },
  {
    id: "pr4",
    university: "Central University of Jharkhand",
    summary:
      "Community pest-surveillance app with agri-extension worker verification and a weekly outbreak dashboard.",
    funding: "₹ 4,80,000",
    timeline: "6 months · 2 blocks",
    stage: "Prototype",
    needs: ["Funding", "Mentorship"],
  },
];

export const CATEGORY_CHART = [
  { name: "Agriculture", value: 312 },
  { name: "Water", value: 248 },
  { name: "Education", value: 186 },
  { name: "Healthcare", value: 154 },
  { name: "Sanitation", value: 121 },
  { name: "Environment", value: 98 },
  { name: "Urban Infra", value: 74 },
];

export const STATUS_CHART = [
  { name: "Submitted", value: 420 },
  { name: "In Progress", value: 268 },
  { name: "Piloted", value: 132 },
  { name: "Resolved", value: 67 },
];

export const DISTRICT_HEAT = [
  { name: "Ranchi", count: 184 },
  { name: "Dhanbad", count: 141 },
  { name: "Gumla", count: 96 },
  { name: "Palamu", count: 88 },
  { name: "Khunti", count: 54 },
  { name: "Simdega", count: 31 },
  { name: "Dumka", count: 47 },
  { name: "Bokaro", count: 112 },
  { name: "Hazaribagh", count: 73 },
];

export const TOP_UNIVERSITIES = [
  { name: "Birsa Agricultural University", completed: 14, funded: "₹ 1.2 Cr", rate: "82%" },
  { name: "NIT Jamshedpur", completed: 11, funded: "₹ 96 L", rate: "78%" },
  { name: "BIT Sindri", completed: 9, funded: "₹ 71 L", rate: "74%" },
  { name: "Central University of Jharkhand", completed: 7, funded: "₹ 54 L", rate: "69%" },
  { name: "XISS Ranchi", completed: 5, funded: "₹ 38 L", rate: "63%" },
];

export type DeptProblem = {
  ref: string;
  title: string;
  domain: string;
  district: string;
  upvotes: number;
  stage: string;
  claim?: string;
};

export type DeptData = {
  total: number;
  verified: number;
  pending: number;
  resolutionRate: string;
  funding: string;
  categories: { name: string; value: number }[];
  status: { name: string; value: number }[];
  heat: { name: string; count: number }[];
  problems: DeptProblem[];
  unfunded: { title: string; district: string; domain: string; upvotes: number; note: string };
  universities: { name: string; completed: number; funded: string; rate: string }[];
};

export const DEPT_DATA: Record<string, DeptData> = {
  agri: {
    total: 312,
    verified: 268,
    pending: 44,
    resolutionRate: "71%",
    funding: "₹ 4.86 Cr",
    categories: [
      { name: "Pest & disease", value: 118 },
      { name: "Irrigation", value: 74 },
      { name: "Seed quality", value: 46 },
      { name: "Cold storage", value: 38 },
      { name: "Market access", value: 24 },
      { name: "Soil health", value: 12 },
    ],
    status: [
      { name: "Submitted", value: 118 },
      { name: "In Progress", value: 96 },
      { name: "Piloted", value: 62 },
      { name: "Resolved", value: 36 },
    ],
    heat: [
      { name: "Gumla", count: 96 },
      { name: "Ranchi", count: 71 },
      { name: "Khunti", count: 54 },
      { name: "Palamu", count: 44 },
      { name: "Simdega", count: 31 },
      { name: "Lohardaga", count: 16 },
    ],
    problems: [
      {
        ref: "JSIC-2026-0847",
        title: "Tomato crop pest damage across smallholder farms",
        domain: "Agriculture",
        district: "Gumla",
        upvotes: 14,
        stage: "In Progress",
        claim: "Prototype",
      },
      {
        ref: "JSIC-2026-0755",
        title: "Lac cultivation yield loss for tribal SHGs",
        domain: "Rural Livelihoods",
        district: "Khunti",
        upvotes: 5,
        stage: "Under Review",
      },
      {
        ref: "JSIC-2026-0721",
        title: "Vegetable spoilage before reaching mandi",
        domain: "Agriculture",
        district: "Ranchi",
        upvotes: 21,
        stage: "Funded",
        claim: "Piloted",
      },
      {
        ref: "JSIC-2026-0688",
        title: "Uneven lift-irrigation supply in upland plots",
        domain: "Agriculture",
        district: "Simdega",
        upvotes: 8,
        stage: "Assigned",
      },
    ],
    unfunded: {
      title: "Millet processing unit for upland farmers",
      district: "Palamu",
      domain: "Agriculture",
      upvotes: 24,
      note: "Assigned 31 days ago, no funder has come forward yet.",
    },
    universities: [
      { name: "Birsa Agricultural University", completed: 14, funded: "₹ 1.2 Cr", rate: "82%" },
      { name: "BIT Sindri", completed: 9, funded: "₹ 71 L", rate: "74%" },
      { name: "Central University of Jharkhand", completed: 7, funded: "₹ 54 L", rate: "69%" },
      { name: "Ranchi University", completed: 4, funded: "₹ 29 L", rate: "61%" },
    ],
  },
  water: {
    total: 248,
    verified: 201,
    pending: 47,
    resolutionRate: "64%",
    funding: "₹ 3.42 Cr",
    categories: [
      { name: "Handpumps", value: 92 },
      { name: "Groundwater", value: 61 },
      { name: "Piped supply", value: 44 },
      { name: "Water quality", value: 31 },
      { name: "Rainwater", value: 20 },
    ],
    status: [
      { name: "Submitted", value: 104 },
      { name: "In Progress", value: 78 },
      { name: "Piloted", value: 42 },
      { name: "Resolved", value: 24 },
    ],
    heat: [
      { name: "Palamu", count: 88 },
      { name: "Garhwa", count: 52 },
      { name: "Chatra", count: 38 },
      { name: "Dumka", count: 33 },
      { name: "Godda", count: 22 },
      { name: "Ranchi", count: 15 },
    ],
    problems: [
      {
        ref: "JSIC-2026-0812",
        title: "Handpumps running dry in summer months",
        domain: "Water",
        district: "Palamu",
        upvotes: 27,
        stage: "Funded",
        claim: "Prototype",
      },
      {
        ref: "JSIC-2026-0790",
        title: "Fluoride contamination in village wells",
        domain: "Water",
        district: "Garhwa",
        upvotes: 19,
        stage: "In Progress",
      },
      {
        ref: "JSIC-2026-0744",
        title: "Check-dam silting reduces storage",
        domain: "Water",
        district: "Chatra",
        upvotes: 6,
        stage: "Proposal Window",
      },
      {
        ref: "JSIC-2026-0702",
        title: "Piped scheme taps dry at tail-end hamlets",
        domain: "Public Service Delivery",
        district: "Dumka",
        upvotes: 12,
        stage: "Assigned",
        claim: "Piloted",
      },
    ],
    unfunded: {
      title: "Spring-shed revival for hill hamlets",
      district: "Dumka",
      domain: "Water",
      upvotes: 29,
      note: "Proposal window closed 3 weeks ago with no funding commitment.",
    },
    universities: [
      { name: "NIT Jamshedpur", completed: 11, funded: "₹ 96 L", rate: "78%" },
      { name: "BIT Sindri", completed: 8, funded: "₹ 63 L", rate: "72%" },
      { name: "Central University of Jharkhand", completed: 5, funded: "₹ 41 L", rate: "66%" },
      { name: "Vinoba Bhave University", completed: 3, funded: "₹ 22 L", rate: "58%" },
    ],
  },
  edu: {
    total: 186,
    verified: 149,
    pending: 37,
    resolutionRate: "68%",
    funding: "₹ 2.14 Cr",
    categories: [
      { name: "Attendance", value: 62 },
      { name: "Learning material", value: 41 },
      { name: "School infra", value: 34 },
      { name: "Digital access", value: 28 },
      { name: "Teacher support", value: 21 },
    ],
    status: [
      { name: "Submitted", value: 78 },
      { name: "In Progress", value: 54 },
      { name: "Piloted", value: 33 },
      { name: "Resolved", value: 21 },
    ],
    heat: [
      { name: "Dhanbad", count: 61 },
      { name: "Ranchi", count: 44 },
      { name: "Giridih", count: 27 },
      { name: "Bokaro", count: 24 },
      { name: "Deoghar", count: 18 },
      { name: "Sahibganj", count: 12 },
    ],
    problems: [
      {
        ref: "JSIC-2026-0776",
        title: "Coal dust affecting school attendance",
        domain: "Education",
        district: "Dhanbad",
        upvotes: 31,
        stage: "Assigned",
        claim: "Piloted",
      },
      {
        ref: "JSIC-2026-0731",
        title: "No local-language reading material in primary grades",
        domain: "Education",
        district: "Giridih",
        upvotes: 9,
        stage: "Proposal Window",
      },
      {
        ref: "JSIC-2026-0699",
        title: "Science lab equipment unusable in 14 schools",
        domain: "Education",
        district: "Bokaro",
        upvotes: 17,
        stage: "In Progress",
        claim: "Prototype",
      },
      {
        ref: "JSIC-2026-0654",
        title: "Girls dropping out after class 8 in two blocks",
        domain: "Education",
        district: "Sahibganj",
        upvotes: 4,
        stage: "Under Review",
      },
    ],
    unfunded: {
      title: "Solar-powered smart classrooms for remote schools",
      district: "Giridih",
      domain: "Education",
      upvotes: 22,
      note: "Two proposals shortlisted, funding still open.",
    },
    universities: [
      { name: "Central University of Jharkhand", completed: 9, funded: "₹ 61 L", rate: "76%" },
      { name: "XISS Ranchi", completed: 6, funded: "₹ 44 L", rate: "70%" },
      { name: "Ranchi University", completed: 5, funded: "₹ 33 L", rate: "64%" },
      { name: "Sido Kanhu Murmu University", completed: 3, funded: "₹ 19 L", rate: "57%" },
    ],
  },
  health: {
    total: 154,
    verified: 121,
    pending: 33,
    resolutionRate: "62%",
    funding: "₹ 1.98 Cr",
    categories: [
      { name: "PHC facilities", value: 48 },
      { name: "Accessibility", value: 34 },
      { name: "Maternal care", value: 29 },
      { name: "Diagnostics", value: 25 },
      { name: "Ambulance reach", value: 18 },
    ],
    status: [
      { name: "Submitted", value: 64 },
      { name: "In Progress", value: 45 },
      { name: "Piloted", value: 28 },
      { name: "Resolved", value: 17 },
    ],
    heat: [
      { name: "Ranchi", count: 42 },
      { name: "Chaibasa", count: 31 },
      { name: "Dumka", count: 26 },
      { name: "Palamu", count: 22 },
      { name: "Latehar", count: 19 },
      { name: "Koderma", count: 14 },
    ],
    problems: [
      {
        ref: "JSIC-2026-0798",
        title: "No ramp access at block-level primary health centre",
        domain: "Accessibility",
        district: "Ranchi",
        upvotes: 9,
        stage: "Proposal Window",
        claim: "Prototype",
      },
      {
        ref: "JSIC-2026-0762",
        title: "Cold chain failure for routine immunisation",
        domain: "Healthcare",
        district: "Latehar",
        upvotes: 23,
        stage: "In Progress",
      },
      {
        ref: "JSIC-2026-0717",
        title: "Ambulance cannot reach 6 forest hamlets in monsoon",
        domain: "Healthcare",
        district: "Chaibasa",
        upvotes: 18,
        stage: "Funded",
        claim: "Piloted",
      },
      {
        ref: "JSIC-2026-0671",
        title: "Anaemia screening backlog at sub-centres",
        domain: "Healthcare",
        district: "Dumka",
        upvotes: 5,
        stage: "Assigned",
      },
    ],
    unfunded: {
      title: "Tele-consultation kiosks for forest-fringe villages",
      district: "Latehar",
      domain: "Healthcare",
      upvotes: 26,
      note: "High report volume but no CSR partner assigned yet.",
    },
    universities: [
      { name: "RIMS Ranchi", completed: 8, funded: "₹ 58 L", rate: "75%" },
      { name: "NIT Jamshedpur", completed: 5, funded: "₹ 37 L", rate: "68%" },
      { name: "Central University of Jharkhand", completed: 4, funded: "₹ 26 L", rate: "63%" },
      { name: "XISS Ranchi", completed: 2, funded: "₹ 14 L", rate: "55%" },
    ],
  },
  env: {
    total: 98,
    verified: 74,
    pending: 24,
    resolutionRate: "59%",
    funding: "₹ 1.21 Cr",
    categories: [
      { name: "Air quality", value: 34 },
      { name: "Mine overburden", value: 22 },
      { name: "Forest fires", value: 17 },
      { name: "Plastic waste", value: 15 },
      { name: "River pollution", value: 10 },
    ],
    status: [
      { name: "Submitted", value: 41 },
      { name: "In Progress", value: 29 },
      { name: "Piloted", value: 17 },
      { name: "Resolved", value: 11 },
    ],
    heat: [
      { name: "Dhanbad", count: 38 },
      { name: "Bokaro", count: 24 },
      { name: "Ramgarh", count: 14 },
      { name: "Hazaribagh", count: 11 },
      { name: "Ranchi", count: 7 },
      { name: "Chatra", count: 4 },
    ],
    problems: [
      {
        ref: "JSIC-2026-0781",
        title: "Coal dust plumes over residential wards",
        domain: "Environment",
        district: "Dhanbad",
        upvotes: 34,
        stage: "In Progress",
        claim: "Prototype",
      },
      {
        ref: "JSIC-2026-0748",
        title: "Overburden dump slope erosion into farmland",
        domain: "Environment",
        district: "Ramgarh",
        upvotes: 11,
        stage: "Proposal Window",
      },
      {
        ref: "JSIC-2026-0709",
        title: "Recurring sal forest fires in summer",
        domain: "Environment",
        district: "Hazaribagh",
        upvotes: 7,
        stage: "Assigned",
        claim: "Piloted",
      },
      {
        ref: "JSIC-2026-0662",
        title: "Plastic choking the Damodar tributary",
        domain: "Environment",
        district: "Bokaro",
        upvotes: 16,
        stage: "Funded",
      },
    ],
    unfunded: {
      title: "Community air-quality sensor network",
      district: "Dhanbad",
      domain: "Environment",
      upvotes: 31,
      note: "Assigned 34 days ago, no funder has come forward yet.",
    },
    universities: [
      { name: "BIT Sindri", completed: 7, funded: "₹ 49 L", rate: "72%" },
      { name: "ISM Dhanbad", completed: 6, funded: "₹ 45 L", rate: "70%" },
      { name: "NIT Jamshedpur", completed: 4, funded: "₹ 28 L", rate: "64%" },
      { name: "Vinoba Bhave University", completed: 2, funded: "₹ 12 L", rate: "54%" },
    ],
  },
  rural: {
    total: 143,
    verified: 112,
    pending: 31,
    resolutionRate: "66%",
    funding: "₹ 2.37 Cr",
    categories: [
      { name: "SHG livelihoods", value: 47 },
      { name: "Rural roads", value: 33 },
      { name: "Skill training", value: 26 },
      { name: "Forest produce", value: 22 },
      { name: "Housing", value: 15 },
    ],
    status: [
      { name: "Submitted", value: 58 },
      { name: "In Progress", value: 41 },
      { name: "Piloted", value: 27 },
      { name: "Resolved", value: 17 },
    ],
    heat: [
      { name: "Khunti", count: 39 },
      { name: "Simdega", count: 28 },
      { name: "Gumla", count: 25 },
      { name: "Dumka", count: 21 },
      { name: "Latehar", count: 17 },
      { name: "Godda", count: 13 },
    ],
    problems: [
      {
        ref: "JSIC-2026-0757",
        title: "Lac cultivation yield loss for tribal SHGs",
        domain: "Rural Livelihoods",
        district: "Khunti",
        upvotes: 13,
        stage: "In Progress",
        claim: "Prototype",
      },
      {
        ref: "JSIC-2026-0726",
        title: "Tasar silk reeling units idle for want of repair",
        domain: "Rural Livelihoods",
        district: "Simdega",
        upvotes: 8,
        stage: "Proposal Window",
      },
      {
        ref: "JSIC-2026-0684",
        title: "Mahua collection has no local processing",
        domain: "Rural Livelihoods",
        district: "Gumla",
        upvotes: 20,
        stage: "Funded",
        claim: "Piloted",
      },
      {
        ref: "JSIC-2026-0641",
        title: "Village road washes out every monsoon",
        domain: "Urban Infrastructure",
        district: "Latehar",
        upvotes: 4,
        stage: "Under Review",
      },
    ],
    unfunded: {
      title: "Bamboo craft cluster tooling upgrade",
      district: "Simdega",
      domain: "Rural Livelihoods",
      upvotes: 18,
      note: "Shortlisted twice, still awaiting a funding partner.",
    },
    universities: [
      { name: "Birsa Agricultural University", completed: 10, funded: "₹ 74 L", rate: "79%" },
      { name: "XISS Ranchi", completed: 7, funded: "₹ 52 L", rate: "71%" },
      { name: "Central University of Jharkhand", completed: 5, funded: "₹ 34 L", rate: "65%" },
      { name: "Nilamber-Pitamber University", completed: 3, funded: "₹ 18 L", rate: "58%" },
    ],
  },
  urban: {
    total: 121,
    verified: 93,
    pending: 28,
    resolutionRate: "61%",
    funding: "₹ 1.76 Cr",
    categories: [
      { name: "Drainage", value: 41 },
      { name: "Solid waste", value: 29 },
      { name: "Street lighting", value: 21 },
      { name: "Market infra", value: 18 },
      { name: "Public transport", value: 12 },
    ],
    status: [
      { name: "Submitted", value: 52 },
      { name: "In Progress", value: 34 },
      { name: "Piloted", value: 21 },
      { name: "Resolved", value: 14 },
    ],
    heat: [
      { name: "Ranchi", count: 44 },
      { name: "Jamshedpur", count: 31 },
      { name: "Dhanbad", count: 22 },
      { name: "Bokaro", count: 13 },
      { name: "Deoghar", count: 8 },
      { name: "Hazaribagh", count: 6 },
    ],
    problems: [
      {
        ref: "JSIC-2026-0741",
        title: "Waterlogging at municipal ward market",
        domain: "Urban Infrastructure",
        district: "Jamshedpur (East Singhbhum)",
        upvotes: 18,
        stage: "Proposal Window",
        claim: "Prototype",
      },
      {
        ref: "JSIC-2026-0713",
        title: "Ward-level waste segregation not happening",
        domain: "Sanitation",
        district: "Ranchi",
        upvotes: 26,
        stage: "In Progress",
      },
      {
        ref: "JSIC-2026-0677",
        title: "Unlit stretch near bus terminal unsafe at night",
        domain: "Urban Infrastructure",
        district: "Dhanbad",
        upvotes: 9,
        stage: "Assigned",
        claim: "Piloted",
      },
      {
        ref: "JSIC-2026-0632",
        title: "Storm drains blocked by construction debris",
        domain: "Urban Infrastructure",
        district: "Bokaro",
        upvotes: 5,
        stage: "Under Review",
      },
    ],
    unfunded: {
      title: "Decentralised wet-waste composting for two wards",
      district: "Ranchi",
      domain: "Sanitation",
      upvotes: 21,
      note: "Ready for funding, no partner matched yet.",
    },
    universities: [
      { name: "NIT Jamshedpur", completed: 9, funded: "₹ 68 L", rate: "77%" },
      { name: "BIT Sindri", completed: 6, funded: "₹ 43 L", rate: "69%" },
      { name: "Ranchi University", completed: 3, funded: "₹ 21 L", rate: "60%" },
      { name: "XISS Ranchi", completed: 2, funded: "₹ 13 L", rate: "56%" },
    ],
  },
  pwd: {
    total: 87,
    verified: 66,
    pending: 21,
    resolutionRate: "57%",
    funding: "₹ 1.34 Cr",
    categories: [
      { name: "Road surface", value: 32 },
      { name: "Bridges & culverts", value: 21 },
      { name: "Public buildings", value: 16 },
      { name: "Accessibility works", value: 11 },
      { name: "Drainage works", value: 7 },
    ],
    status: [
      { name: "Submitted", value: 37 },
      { name: "In Progress", value: 26 },
      { name: "Piloted", value: 15 },
      { name: "Resolved", value: 9 },
    ],
    heat: [
      { name: "Palamu", count: 26 },
      { name: "Latehar", count: 19 },
      { name: "Chatra", count: 14 },
      { name: "Gumla", count: 12 },
      { name: "Godda", count: 9 },
      { name: "Pakur", count: 7 },
    ],
    problems: [
      {
        ref: "JSIC-2026-0769",
        title: "Culvert collapse cuts off two panchayats",
        domain: "Urban Infrastructure",
        district: "Latehar",
        upvotes: 22,
        stage: "In Progress",
        claim: "Prototype",
      },
      {
        ref: "JSIC-2026-0735",
        title: "Repeated potholes on block approach road",
        domain: "Urban Infrastructure",
        district: "Palamu",
        upvotes: 11,
        stage: "Proposal Window",
      },
      {
        ref: "JSIC-2026-0691",
        title: "Panchayat bhavan roof leaking through monsoon",
        domain: "Public Service Delivery",
        district: "Chatra",
        upvotes: 4,
        stage: "Assigned",
        claim: "Piloted",
      },
      {
        ref: "JSIC-2026-0648",
        title: "No ramps at three block offices",
        domain: "Accessibility",
        district: "Gumla",
        upvotes: 16,
        stage: "Funded",
      },
    ],
    unfunded: {
      title: "Low-cost cold-mix pothole repair programme",
      district: "Palamu",
      domain: "Urban Infrastructure",
      upvotes: 19,
      note: "Awaiting a funding partner after window closure.",
    },
    universities: [
      { name: "BIT Sindri", completed: 8, funded: "₹ 56 L", rate: "73%" },
      { name: "NIT Jamshedpur", completed: 6, funded: "₹ 41 L", rate: "68%" },
      { name: "ISM Dhanbad", completed: 4, funded: "₹ 27 L", rate: "62%" },
      { name: "Ranchi University", completed: 2, funded: "₹ 11 L", rate: "53%" },
    ],
  },
};


/** Consolidated view across every department. */
export const CONSOLIDATED_ID = "all";

function mergeSeries(pick: (d: DeptData) => { name: string; value: number }[]) {
  const map = new Map<string, number>();
  for (const d of Object.values(DEPT_DATA)) {
    for (const row of pick(d)) map.set(row.name, (map.get(row.name) ?? 0) + row.value);
  }
  return [...map.entries()].map(([name, value]) => ({ name, value }));
}

function parseCrore(text: string): number {
  const n = Number(text.replace(/[^0-9.]/g, ""));
  if (Number.isNaN(n)) return 0;
  return text.includes("L") ? n / 100 : n;
}

export function buildConsolidatedData(): DeptData {
  const all = Object.values(DEPT_DATA);

  const total = all.reduce((s, d) => s + d.total, 0);
  const verified = all.reduce((s, d) => s + d.verified, 0);
  const pending = all.reduce((s, d) => s + d.pending, 0);
  const fundingCr = all.reduce((s, d) => s + parseCrore(d.funding), 0);

  const heatMap = new Map<string, number>();
  for (const d of all) {
    for (const h of d.heat) heatMap.set(h.name, (heatMap.get(h.name) ?? 0) + h.count);
  }
  const heat = [...heatMap.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const uniMap = new Map<string, { completed: number; fundedCr: number; rate: number; n: number }>();
  for (const d of all) {
    for (const u of d.universities) {
      const prev = uniMap.get(u.name) ?? { completed: 0, fundedCr: 0, rate: 0, n: 0 };
      uniMap.set(u.name, {
        completed: prev.completed + u.completed,
        fundedCr: prev.fundedCr + parseCrore(u.funded),
        rate: prev.rate + Number(u.rate.replace("%", "")),
        n: prev.n + 1,
      });
    }
  }
  const universities = [...uniMap.entries()]
    .map(([name, v]) => ({
      name,
      completed: v.completed,
      funded: `₹ ${v.fundedCr.toFixed(2)} Cr`,
      rate: `${Math.round(v.rate / Math.max(v.n, 1))}%`,
    }))
    .sort((a, b) => b.completed - a.completed)
    .slice(0, 6);

  const categories = mergeSeries((d) => d.categories)
    .sort((a, b) => b.value - a.value)
    .slice(0, 7);

  const problems = all
    .flatMap((d) => d.problems.filter((p) => p.claim).slice(0, 1))
    .concat(all.flatMap((d) => d.problems.filter((p) => !p.claim).slice(0, 1)))
    .slice(0, 10);

  const worstUnfunded = all
    .map((d) => d.unfunded)
    .sort((a, b) => b.upvotes - a.upvotes)[0]!;

  return {
    total,
    verified,
    pending,
    resolutionRate: `${Math.round((verified / Math.max(total, 1)) * 100)}%`,
    funding: `₹ ${fundingCr.toFixed(2)} Cr`,
    categories,
    status: mergeSeries((d) => d.status),
    heat,
    problems,
    unfunded: worstUnfunded,
    universities,
  };
}
