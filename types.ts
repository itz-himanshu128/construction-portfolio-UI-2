export enum Page {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  SERVICES = 'SERVICES',
  PROJECTS = 'PROJECTS',
  CAREERS = 'CAREERS',
  CONTACT = 'CONTACT',
  INTERNAL_AI = 'INTERNAL_AI'
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface ProjectCaseStudy {
  title: string;
  location: string;
  image: string;
  overview: string;
  challenge: string;
  solution: string;
  impact: string;
  icon: string;
}

export interface LeadershipProfile {
  name: string;
  role: string;
  bio: string;
}

export interface Stat {
  value: string;
  label: string;
}