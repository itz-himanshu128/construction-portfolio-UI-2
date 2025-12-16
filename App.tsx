import React, { useState } from 'react';
import { Page } from './types';
import * as CONSTANTS from './constants';
import { generateProjectBrief } from './services/geminiService';

// --- Shared Components ---

const Button: React.FC<{ 
  onClick?: () => void; 
  variant?: 'primary' | 'outline' | 'dark'; 
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, variant = 'primary', children, className = '' }) => {
  const baseStyle = "px-8 py-3 font-semibold text-sm tracking-widest transition-all duration-300 uppercase inline-block";
  const variants = {
    primary: "bg-vanguard-gold text-white hover:bg-yellow-700 shadow-md",
    outline: "border-2 border-white text-white hover:bg-white hover:text-vanguard-blue",
    dark: "bg-vanguard-blue text-white hover:bg-slate-800"
  };
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionTitle: React.FC<{ title: string; subtitle?: string; dark?: boolean; centered?: boolean }> = ({ title, subtitle, dark = false, centered = false }) => (
  <div className={`mb-12 ${dark ? 'text-white' : 'text-vanguard-blue'} ${centered ? 'text-center flex flex-col items-center' : ''}`}>
    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">{title}</h2>
    <div className={`w-24 h-1 ${dark ? 'bg-vanguard-gold' : 'bg-vanguard-gold'} mb-6`}></div>
    {subtitle && <p className="text-lg md:text-xl max-w-2xl opacity-90">{subtitle}</p>}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white shadow-lg p-8 border-t-4 border-vanguard-gold ${className}`}>
    {children}
  </div>
);

// --- Layout Components ---

const Navbar: React.FC<{ currentPage: Page; navigate: (p: Page) => void }> = ({ currentPage, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', page: Page.HOME },
    { label: 'About', page: Page.ABOUT },
    { label: 'Services', page: Page.SERVICES },
    { label: 'Projects', page: Page.PROJECTS },
    { label: 'Careers', page: Page.CAREERS },
    { label: 'Contact', page: Page.CONTACT },
  ];

  return (
    <nav className="bg-vanguard-blue text-white sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div 
          className="text-2xl font-serif font-bold tracking-tighter cursor-pointer flex items-center gap-2"
          onClick={() => navigate(Page.HOME)}
        >
          <i className="fas fa-layer-group text-vanguard-gold"></i>
          <span>VANGUARD</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={() => navigate(item.page)}
              className={`text-sm uppercase tracking-wide hover:text-vanguard-gold transition-colors ${currentPage === item.page ? 'text-vanguard-gold font-bold' : 'text-slate-300'}`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => navigate(Page.INTERNAL_AI)}
            className="text-xs bg-slate-800 px-3 py-1 rounded text-slate-400 hover:text-white border border-slate-700"
          >
            <i className="fas fa-lock mr-1"></i> Employee Portal
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <div className="flex flex-col p-4 space-y-4">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => { navigate(item.page); setIsOpen(false); }}
                className={`text-left text-sm uppercase tracking-wide ${currentPage === item.page ? 'text-vanguard-gold' : 'text-slate-300'}`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => { navigate(Page.INTERNAL_AI); setIsOpen(false); }}
              className="text-left text-xs text-slate-500 pt-4 border-t border-slate-700"
            >
              Internal Systems Access
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC<{ navigate: (p: Page) => void }> = ({ navigate }) => (
  <footer className="bg-vanguard-blue text-slate-400 py-16 border-t border-slate-800">
    <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
      <div>
        <div className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-2">
          <i className="fas fa-layer-group text-vanguard-gold"></i>
          <span>VANGUARD</span>
        </div>
        <p className="text-sm leading-relaxed mb-6">
          Constructing the infrastructure of a modern world. Precision, integrity, and safety in every beam we set.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-vanguard-gold"><i className="fab fa-linkedin text-xl"></i></a>
          <a href="#" className="hover:text-vanguard-gold"><i className="fab fa-twitter text-xl"></i></a>
          <a href="#" className="hover:text-vanguard-gold"><i className="fab fa-instagram text-xl"></i></a>
        </div>
      </div>
      
      <div>
        <h4 className="text-white uppercase tracking-widest font-bold mb-6 text-sm">Navigation</h4>
        <ul className="space-y-3 text-sm">
          <li><button onClick={() => navigate(Page.HOME)} className="hover:text-white">Home</button></li>
          <li><button onClick={() => navigate(Page.ABOUT)} className="hover:text-white">About Us</button></li>
          <li><button onClick={() => navigate(Page.PROJECTS)} className="hover:text-white">Projects</button></li>
          <li><button onClick={() => navigate(Page.CAREERS)} className="hover:text-white">Careers</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white uppercase tracking-widest font-bold mb-6 text-sm">Contact</h4>
        <address className="not-italic text-sm leading-loose whitespace-pre-line">
          {CONSTANTS.CONTACT_OFFICE}
        </address>
        <p className="mt-4 text-sm text-vanguard-gold font-bold">+1 (312) 555-0199</p>
      </div>

      <div>
        <h4 className="text-white uppercase tracking-widest font-bold mb-6 text-sm">Certifications</h4>
        <div className="flex gap-4 opacity-50">
           <i className="fas fa-certificate text-3xl"></i>
           <i className="fas fa-award text-3xl"></i>
           <i className="fas fa-hard-hat text-3xl"></i>
        </div>
        <p className="mt-4 text-xs">ISO 9001:2015 Certified<br/>LEED Platinum Partner</p>
      </div>
    </div>
    <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-xs">
      &copy; {new Date().getFullYear()} {CONSTANTS.COMPANY_NAME}. All Rights Reserved.
    </div>
  </footer>
);

// --- Page Components ---

const HomePage: React.FC<{ navigate: (p: Page) => void }> = ({ navigate }) => (
  <div className="animate-fade-in">
    {/* Hero Section */}
    <div className="relative h-[85vh] bg-slate-900 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-vanguard-blue via-vanguard-blue/80 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-white">
        <div className="max-w-3xl">
          <div className="inline-block bg-vanguard-gold px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6">Global Infrastructure Leader</div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">{CONSTANTS.HERO_HEADLINE}</h1>
          <p className="text-xl text-slate-200 mb-10 leading-relaxed max-w-2xl">{CONSTANTS.HERO_SUBHEADLINE}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => navigate(Page.PROJECTS)}>View Our Projects</Button>
            <Button variant="outline" onClick={() => navigate(Page.CONTACT)}>Contact Us</Button>
          </div>
        </div>
      </div>
    </div>

    {/* Introduction */}
    <div className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle title="Engineering the Future" subtitle="40 Years of Uncompromising Excellence" />
            <p className="text-slate-600 leading-relaxed text-lg mb-8">{CONSTANTS.INTRO_TEXT}</p>
            <button onClick={() => navigate(Page.ABOUT)} className="text-vanguard-gold font-bold uppercase tracking-wide text-sm hover:text-vanguard-blue transition-colors">
              Read Our Story <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {CONSTANTS.KEY_STATS.map((stat, idx) => (
              <div key={idx} className="bg-vanguard-light p-8 text-center border-b-4 border-vanguard-blue hover:border-vanguard-gold transition-colors duration-300">
                <div className="text-4xl font-serif font-bold text-vanguard-blue mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-wide text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Services Highlights */}
    <div className="py-24 bg-vanguard-light">
      <div className="container mx-auto px-6">
        <SectionTitle title="Core Capabilities" centered />
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {CONSTANTS.SERVICE_HIGHLIGHTS.map((service, idx) => (
            <Card key={idx} className="hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-vanguard-blue text-white rounded-full flex items-center justify-center text-2xl mb-6">
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-vanguard-blue">{service.title}</h3>
              <p className="text-slate-600 mb-6">{service.description}</p>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="dark" onClick={() => navigate(Page.SERVICES)}>Explore All Services</Button>
        </div>
      </div>
    </div>

    {/* CTA */}
    <div className="py-24 bg-vanguard-blue text-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-serif font-bold mb-6">Ready to Build the Extraordinary?</h2>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">From concept to commissioning, we bring world-class expertise to your most ambitious projects.</p>
        <Button onClick={() => navigate(Page.CONTACT)}>Start a Conversation</Button>
      </div>
    </div>
  </div>
);

const AboutPage: React.FC = () => (
  <div className="animate-fade-in">
    <div className="bg-vanguard-blue text-white py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-serif font-bold mb-6">About Vanguard</h1>
        <p className="text-xl text-slate-300 max-w-2xl">A legacy built on trust, precision, and steel.</p>
      </div>
    </div>

    <div className="py-20 bg-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <SectionTitle title="Our Story" />
          <p className="text-lg text-slate-600 leading-relaxed mb-6">{CONSTANTS.COMPANY_STORY}</p>
          <div className="bg-vanguard-light p-6 border-l-4 border-vanguard-gold mt-8">
            <h3 className="font-bold text-vanguard-blue mb-2">Our Mission</h3>
            <p className="italic text-slate-600">{CONSTANTS.MISSION}</p>
          </div>
        </div>
        <div className="relative h-full min-h-[400px]">
          <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Construction Site" className="absolute inset-0 w-full h-full object-cover shadow-xl" />
        </div>
      </div>
    </div>

    <div className="py-20 bg-vanguard-light">
      <div className="container mx-auto px-6">
        <SectionTitle title="Leadership" centered />
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mt-12">
          {CONSTANTS.LEADERSHIP.map((leader, idx) => (
            <div key={idx} className="flex gap-6 items-start bg-white p-6 shadow-sm">
              <div className="w-20 h-20 bg-slate-300 flex-shrink-0 overflow-hidden rounded-full">
                 <img src={`https://i.pravatar.cc/150?u=${idx + 30}`} alt={leader.name} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-vanguard-blue">{leader.name}</h3>
                <p className="text-vanguard-gold text-sm font-bold uppercase tracking-wide mb-3">{leader.role}</p>
                <p className="text-slate-600 text-sm">{leader.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <i className="fas fa-hard-hat text-5xl text-vanguard-gold mb-6"></i>
        <h2 className="text-3xl font-serif font-bold text-vanguard-blue mb-6">Uncompromising Safety</h2>
        <p className="text-lg text-slate-600 leading-relaxed">{CONSTANTS.SAFETY_COMMITMENT}</p>
      </div>
    </div>
  </div>
);

const ServicesPage: React.FC = () => (
  <div className="animate-fade-in">
    <div className="bg-vanguard-gray text-white py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-serif font-bold mb-6">Our Capabilities</h1>
        <p className="text-xl text-slate-300 max-w-2xl">End-to-end solutions for the built environment.</p>
      </div>
    </div>

    <div className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {CONSTANTS.ALL_SERVICES.map((service, idx) => (
            <div key={idx} className="flex gap-6 group">
              <div className="w-20 h-20 bg-vanguard-light flex-shrink-0 flex items-center justify-center text-3xl text-vanguard-blue group-hover:bg-vanguard-blue group-hover:text-vanguard-gold transition-colors duration-300">
                <i className={`fas ${service.icon}`}></i>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-vanguard-blue mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Capabilities CTA */}
    <div className="bg-vanguard-blue py-16 px-6 text-center text-white">
      <h3 className="text-2xl font-bold mb-4">Need a specialized solution?</h3>
      <p className="mb-8 text-slate-400">Our engineering teams excel at solving bespoke challenges.</p>
      <Button variant="primary">Request Consultation</Button>
    </div>
  </div>
);

const ProjectsPage: React.FC = () => (
  <div className="animate-fade-in">
    <div className="bg-slate-800 text-white py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-serif font-bold mb-6">Major Projects</h1>
        <p className="text-xl text-slate-300 max-w-2xl">A showcase of engineering excellence across the globe.</p>
      </div>
    </div>

    <div className="py-24 bg-vanguard-light">
      <div className="container mx-auto px-6 space-y-24">
        {CONSTANTS.CASE_STUDIES.map((project, idx) => (
          <div key={idx} className="grid md:grid-cols-2 gap-12 items-center bg-white shadow-xl overflow-hidden">
             <div className={`h-96 overflow-hidden ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
               <img src={project.image} alt={project.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
             </div>
             <div className="p-12">
               <div className="text-sm text-vanguard-gold font-bold uppercase tracking-widest mb-2">{project.location}</div>
               <h3 className="text-3xl font-serif font-bold text-vanguard-blue mb-6 flex items-center">
                  <i className={`fas ${project.icon} mr-4 text-vanguard-gold text-2xl`}></i>
                  {project.title}
               </h3>
               <p className="text-slate-600 mb-6 italic text-lg">"{project.overview}"</p>
               
               <div className="space-y-4 text-sm">
                 <div>
                   <span className="font-bold text-vanguard-blue uppercase block text-xs tracking-wide mb-1">Challenge</span>
                   <span className="text-slate-600">{project.challenge}</span>
                 </div>
                 <div>
                   <span className="font-bold text-vanguard-blue uppercase block text-xs tracking-wide mb-1">Solution</span>
                   <span className="text-slate-600">{project.solution}</span>
                 </div>
                 <div className="bg-vanguard-light p-4 border-l-2 border-green-500">
                   <span className="font-bold text-green-700 uppercase block text-xs tracking-wide mb-1">Impact</span>
                   <span className="text-slate-700">{project.impact}</span>
                 </div>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CareersPage: React.FC = () => (
  <div className="animate-fade-in">
    <div className="relative py-32 bg-slate-900 text-center text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="relative z-10 container mx-auto px-6">
        <h1 className="text-5xl font-serif font-bold mb-6">Build Your Legacy</h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed">{CONSTANTS.CAREERS_INTRO}</p>
      </div>
    </div>

    <div className="py-24 bg-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <SectionTitle title="Why Vanguard?" />
          <ul className="space-y-4">
            {CONSTANTS.BENEFITS.map((benefit, idx) => (
              <li key={idx} className="flex items-center text-lg text-slate-700">
                <i className="fas fa-check text-vanguard-gold mr-4"></i> {benefit}
              </li>
            ))}
          </ul>
          <div className="mt-12 p-6 bg-vanguard-light">
             <h4 className="font-bold text-vanguard-blue mb-2">Hiring Philosophy</h4>
             <p className="text-slate-600 italic">"{CONSTANTS.HIRING_PHILOSOPHY}"</p>
          </div>
        </div>
        <div className="bg-slate-100 p-8 border border-slate-200">
          <h3 className="text-2xl font-serif font-bold text-vanguard-blue mb-6">Open Positions</h3>
          <div className="space-y-4">
            {['Senior Civil Engineer', 'Project Manager - Industrial', 'Safety Compliance Officer', 'Site Superintendent'].map((job, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <span className="font-bold text-slate-700">{job}</span>
                <span className="text-vanguard-gold text-sm font-bold">APPLY <i className="fas fa-chevron-right ml-1"></i></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage: React.FC = () => (
  <div className="animate-fade-in">
    <div className="bg-vanguard-blue text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-serif font-bold mb-6">Contact Us</h1>
        <p className="text-xl text-slate-300">Partner with Vanguard on your next milestone.</p>
      </div>
    </div>

    <div className="py-24 bg-vanguard-light">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto bg-white shadow-2xl">
          <div className="p-12 bg-vanguard-blue text-white">
            <h3 className="text-2xl font-serif font-bold mb-8">Corporate Headquarters</h3>
            <address className="not-italic mb-10 text-slate-300 leading-loose whitespace-pre-line text-lg">
              {CONSTANTS.CONTACT_OFFICE}
            </address>
            <div className="space-y-4 text-slate-300">
              <div className="flex items-center"><i className="fas fa-phone mr-4 text-vanguard-gold"></i> +1 (312) 555-0199</div>
              <div className="flex items-center"><i className="fas fa-envelope mr-4 text-vanguard-gold"></i> info@vanguard-infra.com</div>
            </div>

            <h4 className="mt-12 mb-4 font-bold uppercase tracking-widest text-sm text-vanguard-gold">Global Presence</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
              {CONSTANTS.REGIONAL_OFFICES.map(office => <div key={office}>{office}</div>)}
            </div>
          </div>
          
          <div className="p-12">
            <h3 className="text-2xl font-serif font-bold text-vanguard-blue mb-6">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Full Name</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-300 p-3 focus:outline-none focus:border-vanguard-gold transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Email Address</label>
                <input type="email" className="w-full bg-slate-50 border border-slate-300 p-3 focus:outline-none focus:border-vanguard-gold transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Inquiry</label>
                <textarea rows={4} className="w-full bg-slate-50 border border-slate-300 p-3 focus:outline-none focus:border-vanguard-gold transition-colors"></textarea>
              </div>
              <Button onClick={() => alert("Thank you. Our corporate relations team will respond shortly.")}>Submit Inquiry</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const InternalAITool: React.FC = () => {
  const [projectType, setProjectType] = useState('');
  const [location, setLocation] = useState('');
  const [scale, setScale] = useState('');
  const [brief, setBrief] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!projectType || !location || !scale) return;
    setLoading(true);
    setBrief('');
    const result = await generateProjectBrief(projectType, location, scale);
    setBrief(result);
    setLoading(false);
  };

  return (
    <div className="animate-fade-in min-h-screen bg-slate-100">
      <div className="bg-slate-900 text-white py-12 px-6 border-b-4 border-vanguard-gold">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-vanguard-gold text-slate-900 px-2 py-1 text-xs font-bold uppercase rounded">Internal Only</div>
            <div className="text-slate-400 text-xs uppercase tracking-widest">Vanguard Project Scoping AI v2.1</div>
          </div>
          <h1 className="text-3xl font-serif font-bold">Project Opportunity Assessor</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <h3 className="font-bold text-vanguard-blue mb-6 border-b pb-2">Input Parameters</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Project Type</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-300 p-3 focus:outline-none focus:border-vanguard-gold"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                >
                  <option value="">Select Type...</option>
                  <option value="Suspension Bridge">Suspension Bridge</option>
                  <option value="Hydroelectric Dam">Hydroelectric Dam</option>
                  <option value="Skyscraper (60+ stories)">Skyscraper (60+ stories)</option>
                  <option value="Airport Terminal">Airport Terminal</option>
                  <option value="Data Center Complex">Data Center Complex</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Location</label>
                <input 
                  type="text" 
                  placeholder="e.g. Dubai Waterfront, UAE"
                  className="w-full bg-slate-50 border border-slate-300 p-3 focus:outline-none focus:border-vanguard-gold"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Scale / Budget Estimate</label>
                <input 
                  type="text" 
                  placeholder="e.g. $450M, 4 Years"
                  className="w-full bg-slate-50 border border-slate-300 p-3 focus:outline-none focus:border-vanguard-gold"
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                />
              </div>
              <Button onClick={handleGenerate} className="w-full flex justify-center items-center">
                {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : 'Generate Assessment'}
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {brief ? (
            <div className="bg-white p-8 shadow-lg border border-slate-200">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-vanguard-blue">AI-Generated Risk & Opportunity Brief</h2>
                <button className="text-vanguard-gold text-sm hover:underline" onClick={() => window.print()}><i className="fas fa-print mr-1"></i> Print / PDF</button>
              </div>
              <div className="prose prose-slate max-w-none whitespace-pre-wrap font-sans text-slate-700 leading-relaxed">
                {brief}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 italic">
                Disclaimer: AI-generated assessments are preliminary. Full engineering survey required before bid submission.
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded p-12 text-center text-slate-400 h-full flex flex-col justify-center items-center min-h-[400px]">
              <i className="fas fa-robot text-4xl mb-4 text-slate-300"></i>
              <p>Enter project details on the left to generate a preliminary executive brief.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME: return <HomePage navigate={setCurrentPage} />;
      case Page.ABOUT: return <AboutPage />;
      case Page.SERVICES: return <ServicesPage />;
      case Page.PROJECTS: return <ProjectsPage />;
      case Page.CAREERS: return <CareersPage />;
      case Page.CONTACT: return <ContactPage />;
      case Page.INTERNAL_AI: return <InternalAITool />;
      default: return <HomePage navigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar currentPage={currentPage} navigate={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer navigate={setCurrentPage} />
    </div>
  );
};

export default App;