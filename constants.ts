import { ServiceItem, ProjectCaseStudy, LeadershipProfile, Stat } from './types';

export const COMPANY_NAME = "Vanguard Infrastructure";

// --- Home Page Copy ---
export const HERO_HEADLINE = "Building the Foundations of Tomorrow.";
export const HERO_SUBHEADLINE = "We engineer progress. From critical infrastructure to skyline-defining structures, Vanguard delivers precision, scale, and permanence.";

export const INTRO_TEXT = "Vanguard Infrastructure is a premier construction and engineering firm dedicated to complex, large-scale development. For over four decades, we have partnered with governments and private enterprises to build the physical backbone of the economy. We don't just pour concrete; we execute visionary projects with mathematical precision and unwavering safety standards.";

export const KEY_STATS: Stat[] = [
  { value: "42", label: "Years of Excellence" },
  { value: "$20B+", label: "Project Value Delivered" },
  { value: "3,500+", label: "Skilled Workforce" },
  { value: "12", label: "Global Regional Hubs" }
];

export const SERVICE_HIGHLIGHTS: ServiceItem[] = [
  {
    title: "Civil Infrastructure",
    description: "Highways, bridges, and mass transit systems engineered for durability and high-capacity endurance.",
    icon: "fa-road"
  },
  {
    title: "Industrial Complexes",
    description: "End-to-end construction of manufacturing plants, logistics hubs, and energy facilities.",
    icon: "fa-industry"
  },
  {
    title: "High-Rise Development",
    description: "Iconic commercial and residential towers that redefine city skylines.",
    icon: "fa-building"
  }
];

// --- About Us Copy ---
export const COMPANY_STORY = "Founded in 1982, Vanguard began with a singular mandate: to bridge the gap between architectural ambition and engineering reality. What started as a regional bridge-building outfit has evolved into a multi-national infrastructure powerhouse. We have navigated economic shifts and technological revolutions, yet our core tenet remains unchanged—delivery on promise.";

export const MISSION = "To execute the world's most challenging construction projects with safety, integrity, and sustainable innovation.";
export const VISION = "To be the global benchmark for infrastructure reliability and construction excellence.";
export const VALUES = ["Safety Above All", "Engineering Integrity", "Sustainable Legacy", "Collaborative Precision"];

export const LEADERSHIP: LeadershipProfile[] = [
  { name: "Robert Sterling", role: "Chief Executive Officer", bio: "40 years in heavy civil engineering. Former infrastructure advisor to the State Board." },
  { name: "Elena Corves", role: "VP of Operations", bio: "Spearheaded the $4B Coastal Resilience Project. Expert in lean construction methodologies." }
];

export const SAFETY_COMMITMENT = "Safety is not a department; it is our culture. We operate under a 'Zero Harm' philosophy, leveraging predictive analytics and rigorous training to ensure every worker returns home safely, every day.";

// --- Services Copy ---
export const ALL_SERVICES: ServiceItem[] = [
  {
    title: "Heavy Civil Infrastructure",
    description: "We execute large-scale earthworks, bridges, and tunnels. Our teams manage complex logistics in challenging environments to connect communities.",
    icon: "fa-archway"
  },
  {
    title: "Commercial & Vertical",
    description: "From Class-A office towers to mixed-use developments, we deliver vertical structures that balance aesthetic intent with structural efficiency.",
    icon: "fa-city"
  },
  {
    title: "Industrial & Energy",
    description: "Turnkey solutions for power plants, refineries, and automated manufacturing facilities. We handle specialized MEP and heavy rigging requirements.",
    icon: "fa-bolt"
  },
  {
    title: "Government & Defense",
    description: "Secure, compliant construction for federal and state agencies. We hold top-tier clearances and extensive experience in hardened facility construction.",
    icon: "fa-shield-alt"
  }
];

// --- Projects Copy ---
export const CASE_STUDIES: ProjectCaseStudy[] = [
  {
    title: "The Meridian Bridge",
    location: "Pacific Northwest Corridor",
    image: "https://picsum.photos/800/600?random=1",
    overview: "A 2.4-mile cable-stayed bridge connecting major logistics hubs.",
    challenge: "Constructing in a high-seismic zone with strict environmental protections for local marine life.",
    solution: "Implemented proprietary seismic dampeners and used barge-based cantilever construction to minimize seabed disruption.",
    impact: "Reduced regional freight transit time by 40% and awarded the National Engineering Excellence Medal.",
    icon: "fa-bridge"
  },
  {
    title: "Apex Tech Campus",
    location: "Austin, Texas",
    image: "https://picsum.photos/800/600?random=2",
    overview: "A 2-million sq. ft. net-zero carbon office complex for a global tech giant.",
    challenge: "Aggressive 18-month timeline with LEED Platinum requirements.",
    solution: "Utilized modular pre-fabrication for 60% of the structural components and integrated geothermal cooling systems.",
    impact: "Delivered 2 months ahead of schedule; the facility generates 105% of its own energy needs.",
    icon: "fa-building"
  },
  {
    title: "Portos Logistics Hub",
    location: "Rotterdam, Netherlands",
    image: "https://picsum.photos/800/600?random=3",
    overview: "Automated container terminal and warehousing facility.",
    challenge: "Integrating construction with ongoing port operations without disrupting supply chains.",
    solution: "Phased construction schedule synchronized with shipping tides and automated guided vehicle (AGV) pathing implementation.",
    impact: "Increased port throughput capacity by 2.5M TEU annually.",
    icon: "fa-ship"
  }
];

// --- Careers Copy ---
export const CAREERS_INTRO = "Build a legacy, not just a career. At Vanguard, you work on projects that define generations. We demand excellence, and in return, we provide a platform for unparalleled professional growth.";
export const BENEFITS = [
  "Comprehensive Health & Wellness",
  "Performance-Based Equity",
  "Global Mobility Opportunities",
  "Advanced Technical Training"
];
export const HIRING_PHILOSOPHY = "We hire for aptitude and integrity. Skills can be honed; character is foundational.";

// --- Contact Copy ---
export const CONTACT_OFFICE = "Global Headquarters\n4000 Construction Blvd, Suite 100\nChicago, IL 60601";
export const REGIONAL_OFFICES = ["London, UK", "Dubai, UAE", "Singapore", "Sydney, AU"];