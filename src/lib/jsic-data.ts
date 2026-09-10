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
  },
  {
    id: "pr2",
    university: "BIT Sindri",
    summary:
      "Low-cost solar sprayer with a bio-pesticide dosing cartridge, manufactured through a local SHG cluster.",
    funding: "₹ 6,20,000",
    timeline: "9 months · Pilot on 25 farms",
    stage: "Idea",
  },
  {
    id: "pr3",
    university: "NIT Jamshedpur",
    summary:
      "Drone-based multispectral scouting service run as a village-level entrepreneur model with revenue sharing.",
    funding: "₹ 12,00,000",
    timeline: "12 months · 3 blocks",
    stage: "Pilot-ready",
  },
  {
    id: "pr4",
    university: "Central University of Jharkhand",
    summary:
      "Community pest-surveillance app with agri-extension worker verification and a weekly outbreak dashboard.",
    funding: "₹ 4,80,000",
    timeline: "6 months · 2 blocks",
    stage: "Prototype",
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
