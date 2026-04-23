/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import NetworkInfrastructure from './pages/NetworkInfrastructure';
import SoftwareEcosystems from './pages/SoftwareEcosystems';
import IoTEdegeComputing from './pages/IoTEdegeComputing';
import OurStory from './pages/OurStory.tsx';
import Hero from './components/Hero';
import OurClients from './components/OurClients';
import { HashScrollAfterRoute } from './components/HashScrollAfterRoute';
import GlassButton from './components/GlassButton';
import { useSectionNav } from './hooks/useSectionNav';
import { 
  Network, 
  Code2, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X,
  ChevronDown,
  Building2,
  ShieldCheck,
  Globe,
  Zap,
  Users,
  BarChart3,
  Server
} from 'lucide-react';

const OFFICE_ADDRESS_LINES = [
  'Unit 5, P11 Building, Park View, The Villages,',
  'Prince Balagtas Ave, Clark Freeport,',
  'Mabalacat City, 2010 Pampanga',
] as const;

const OFFICE_MAP_LAT = 15.1993921;
const OFFICE_MAP_LNG = 120.5243076;

const OFFICE_MAP_EMBED_URL = `https://www.google.com/maps?q=${OFFICE_MAP_LAT},${OFFICE_MAP_LNG}&z=18&output=embed`;

interface FAQItemProps {
  question: string;
  answer: string;
  key?: number;
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

function hashFromHref(href: string): string {
  const i = href.indexOf('#');
  return i >= 0 ? href.slice(i) : '#';
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/solutions/infrastructure" element={<NetworkInfrastructure />} />
          <Route path="/solutions/software" element={<SoftwareEcosystems />} />
          <Route path="/solutions/iot" element={<IoTEdegeComputing />} />
          <Route path="/our-story" element={<OurStory />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 sm:px-6 py-5 flex items-center justify-between text-left group"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-indigo-400' : 'text-white'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-indigo-600 text-white rotate-180' : 'bg-white/5 text-slate-400 group-hover:bg-white/10'}`}>
          <ChevronDown size={16} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 sm:px-6 pb-5 text-slate-400 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const solutionsCloseTimer = React.useRef<number | null>(null);
  const location = useLocation();
  const goToSection = useSectionNav();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (solutionsCloseTimer.current) {
        window.clearTimeout(solutionsCloseTimer.current);
        solutionsCloseTimer.current = null;
      }
    };
  }, []);

  const openSolutions = () => {
    if (solutionsCloseTimer.current) {
      window.clearTimeout(solutionsCloseTimer.current);
      solutionsCloseTimer.current = null;
    }
    setIsSolutionsOpen(true);
  };

  const scheduleCloseSolutions = () => {
    if (solutionsCloseTimer.current) window.clearTimeout(solutionsCloseTimer.current);
    solutionsCloseTimer.current = window.setTimeout(() => {
      setIsSolutionsOpen(false);
      solutionsCloseTimer.current = null;
    }, 120);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { 
      name: 'Solutions', 
      href: '#',
      dropdown: [
        { 
          name: 'Network Infrastructure', 
          href: '/solutions/infrastructure',
          icon: Network,
          desc: 'High-performance connectivity'
        },
        { 
          name: 'Software Ecosystems', 
          href: '/solutions/software',
          icon: Code2,
          desc: 'Custom algorithmic solutions'
        },
        { 
          name: 'IoT & Edge Computing', 
          href: '/solutions/iot',
          icon: Cpu,
          desc: 'Real-time intelligence'
        },
      ]
    },
    { name: 'About', href: '/#about' },
    { name: 'Clients', href: '/#clients' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contact', href: '/#contact' },
  ];

  const isHome = location.pathname === '/';

  const goHomeTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname !== '/') return;
    e.preventDefault();
    if (window.location.hash) {
      window.history.replaceState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${isScrolled || !isHome ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link to="/" onClick={goHomeTop} className="flex items-center gap-3">
          <img
            src="/company/3core.png"
            alt="3CORE"
            className="h-9 sm:h-10 w-auto object-contain scale-150 sm:scale-155 origin-left"
            draggable={false}
          />
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group"
              onMouseEnter={() => link.dropdown && openSolutions()}
              onMouseLeave={() => link.dropdown && scheduleCloseSolutions()}
            >
              {link.dropdown ? (
                <button className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors py-2">
                  {link.name}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                link.href.startsWith('/#') ? (
                  <a 
                    href={link.href}
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
                    onClick={(e) => {
                      e.preventDefault();
                      goToSection(hashFromHref(link.href));
                    }}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    to={link.href} 
                    onClick={link.href === '/' ? goHomeTop : undefined}
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
                  >
                    {link.name}
                  </Link>
                )
              )}

              {link.dropdown && (
                <AnimatePresence>
                  {isSolutionsOpen && (
                    <>
                      <div
                        className="absolute top-full left-0 h-4 w-72"
                        aria-hidden
                        onMouseEnter={openSolutions}
                        onMouseLeave={scheduleCloseSolutions}
                      />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-[22rem] mt-1.5 rounded-[1.75rem] shadow-2xl shadow-black/40"
                      onMouseEnter={openSolutions}
                      onMouseLeave={scheduleCloseSolutions}
                    >
                      <div className="rounded-[1.72rem] bg-slate-950 p-3">
                        <div className="px-3 pt-2 pb-3">
                          <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-400">
                            Solutions
                          </div>
                        </div>
                        <div className="grid gap-2">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 group/item hover:shadow-lg hover:shadow-indigo-500/10"
                          >
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 flex items-center justify-center text-indigo-300 group-hover/item:text-white group-hover/item:from-indigo-500/30 group-hover/item:to-indigo-500/10 transition-all duration-300">
                              <sub.icon size={24} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white group-hover/item:text-indigo-300 transition-colors">
                                {sub.name}
                              </div>
                              <div className="text-xs text-slate-400 mt-1 leading-snug">
                                {sub.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                        </div>
                      </div>
                    </motion.div>
                    </>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <GlassButton
            to="/#contact"
            className="py-3 px-6 text-sm"
            onClick={(e) => {
              e.preventDefault();
              goToSection('#contact');
            }}
          >
            Get Started
          </GlassButton>
        </div>

        <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 p-6 lg:hidden shadow-xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{link.name}</div>
                      <div className="grid gap-4">
                        {link.dropdown.map((sub) => (
                          <Link 
                            key={sub.name}
                            to={sub.href}
                            className="flex items-center gap-4 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                              <sub.icon size={20} />
                            </div>
                            <span className="text-white font-medium">{sub.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    link.href.startsWith('/#') ? (
                      <a 
                        href={link.href}
                        className="text-lg font-medium text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          goToSection(hashFromHref(link.href));
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        to={link.href} 
                        className="text-lg font-medium text-white"
                        onClick={(e) => {
                          if (link.href === '/') goHomeTop(e);
                          else setIsMobileMenuOpen(false);
                        }}
                      >
                        {link.name}
                      </Link>
                    )
                  )}
                </div>
              ))}
              <GlassButton 
                to="/#contact" 
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  goToSection('#contact');
                  setIsMobileMenuOpen(false);
                }}
              >
                Get Started
              </GlassButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Home = () => {
  const [solutionInterest, setSolutionInterest] = useState<string>('Network Infrastructure');
  const [isSolutionMenuOpen, setIsSolutionMenuOpen] = useState(false);
  const solutionMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isSolutionMenuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = solutionMenuRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setIsSolutionMenuOpen(false);
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [isSolutionMenuOpen]);

  return (
    <>
      <Hero />

      {/* Solutions Grid */}
      <section id="solutions" className="py-20 sm:py-24 lg:py-40 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="section-label">Our Solutions</span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 text-white">
              Integrated Technology for Modern Business
            </h2>
            <p className="text-lg text-slate-400">
              We provide end-to-end solutions that bridge the gap between complex hardware and intelligent software.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Network,
                title: "Network Infrastructure",
                desc: "High-performance architectures designed for zero-latency operations and global connectivity.",
                color: "bg-blue-500",
                link: "/solutions/infrastructure"
              },
              {
                icon: Code2,
                title: "Software Ecosystems",
                desc: "Custom-built algorithmic solutions that automate complex business logic and drive efficiency.",
                color: "bg-indigo-500",
                link: "/solutions/software"
              },
              {
                icon: Cpu,
                title: "IoT & Edge Computing",
                desc: "End-to-end sensor networks providing granular visibility and predictive maintenance.",
                color: "bg-emerald-500",
                link: "/solutions/iot"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="corporate-card p-6 sm:p-8 lg:p-10"
              >
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-500/10`}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 gradient-text">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-8">
                  {item.desc}
                </p>
                <GlassButton to={item.link} className="!px-6 !py-3 !text-sm">
                  Learn more 
                </GlassButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <OurClients />

      {/* Why Choose Us Section */}
      <section className="py-20 sm:py-24 lg:py-40 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-indigo-600 font-semibold text-sm tracking-wider uppercase mb-4 block">Why 3CORE</span>
              <h2 className="text-4xl lg:text-5xl font-display font-bold mb-8 text-slate-900">
                The Standard for Enterprise Reliability.
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Global Scale", desc: "Our infrastructure supports multi-region deployments with consistent performance." },
                  { title: "Security First", desc: "Enterprise-grade security protocols integrated at every layer of the stack." },
                  { title: "Expert Support", desc: "Dedicated technical architects available for strategic consultation and support." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle2 className="text-indigo-600" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{feature.title}</h4>
                      <p className="text-slate-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-6 md:mt-12">
                <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-slate-200 shadow-sm">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">99.9%</div>
                  <div className="text-sm text-slate-600 font-medium uppercase tracking-wider">Uptime SLA</div>
                </div>
                <div className="bg-indigo-600 p-6 sm:p-8 rounded-3xl text-white shadow-xl shadow-indigo-500/25">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-sm text-white/80 font-medium uppercase tracking-wider">Monitoring</div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl text-white border-slate-800 shadow-lg">
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Data Sovereignty</div>
                </div>
                <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-slate-200 shadow-sm">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">10ms</div>
                  <div className="text-sm text-slate-600 font-medium uppercase tracking-wider">Avg. Latency</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-24 lg:py-40 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
                <img 
                  src="/company/office.png" 
                  alt="3CORE Office" 
                  className="w-full aspect-square object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-slate-900 p-8 rounded-3xl shadow-2xl border border-white/10 max-w-xs hidden md:block backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400">
                    <ShieldCheck size={24} />
                  </div>
                  <span className="font-bold text-white">Security-First Operations</span>
                </div>
                <p className="text-sm text-slate-400">We implement practical security controls to help protect systems, data, and day-to-day operations.</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="section-label">About the Company</span>
              <h2 className="text-4xl lg:text-5xl font-display font-bold mb-8 leading-tight text-white">
                Your trusted partner for integrated IT solutions
              </h2>
              <p className="text-base sm:text-lg text-slate-300 mb-10 leading-relaxed">
                3CORE LeadersTech is your trusted partner for integrated IT solutions that bring reliability, expertise, and continuity throughout your entire IT journey.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-8 mb-10">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-2">20+</div>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Years founder IT experience</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-2">100+</div>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Projects delivered &amp; managed</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-2">50+</div>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Clients served</div>
                </div>
              </div>

              <GlassButton to="/our-story">Our Story</GlassButton>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-24 lg:py-40 bg-white text-slate-900 relative overflow-hidden border-t border-slate-100">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-500/[0.06] blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <span className="text-indigo-600 font-semibold text-sm tracking-wider uppercase mb-4 block">Contact Us</span>
              <h2 className="text-4xl lg:text-6xl font-display font-bold mb-8 text-slate-900">
                Ready to Transform Your Infrastructure?
              </h2>
              <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                Schedule a consultation with our technical architects to discuss your project requirements.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: Mail, label: 'Email', value: 'info@3core21.com' },
                  { icon: Phone, label: 'Phone', value: '(045) 499 5167' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 uppercase tracking-wider">{item.label}</div>
                      <div className="text-lg font-medium text-slate-900">{item.value}</div>
                    </div>
                  </div>
                ))}

                <div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 shrink-0 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                      <MapPin size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-slate-500 uppercase tracking-wider mb-1">Office</div>
                      <div className="text-lg font-medium leading-relaxed text-slate-900">
                        {OFFICE_ADDRESS_LINES.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm aspect-[16/10] min-h-[220px]">
                    <iframe
                      title="3CORE office location"
                      src={OFFICE_MAP_EMBED_URL}
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 text-white shadow-2xl shadow-slate-900/30 overflow-hidden bg-slate-950">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-transparent to-cyan-500/10" aria-hidden />
              <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" aria-hidden />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" aria-hidden />

              <div className="relative">
                <div className="mb-8">
                  <div className="text-xs font-semibold tracking-[0.22em] uppercase text-slate-400">
                    Request a consultation
                  </div>
                  <div className="mt-2 text-2xl font-display font-bold text-white">
                    Tell us what you need
                  </div>
                  <div className="mt-2 text-sm text-slate-400">
                    We’ll reply within 1 business day.
                  </div>
                </div>

              <form className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-slate-400 mb-2.5">
                      Full Name
                    </label>
                    <input type="text" className="w-full bg-white/[0.06] rounded-2xl px-5 py-4 outline-none transition-all text-white placeholder:text-slate-500 ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500/40 focus:bg-white/[0.08]" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-slate-400 mb-2.5">
                      Work Email
                    </label>
                    <input type="email" className="w-full bg-white/[0.06] rounded-2xl px-5 py-4 outline-none transition-all text-white placeholder:text-slate-500 ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500/40 focus:bg-white/[0.08]" placeholder="john@company.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-slate-400 mb-2.5">
                    Solution Interest
                  </label>
                  <div ref={solutionMenuRef} className="relative">
                    <button
                      type="button"
                      className="w-full bg-white/[0.06] rounded-2xl pl-5 pr-12 py-4 outline-none transition-all text-white ring-1 ring-white/10 hover:bg-white/[0.07] focus:ring-2 focus:ring-indigo-500/40 focus:bg-white/[0.08] text-left"
                      aria-haspopup="listbox"
                      aria-expanded={isSolutionMenuOpen}
                      onClick={() => setIsSolutionMenuOpen((v) => !v)}
                    >
                      {solutionInterest}
                    </button>
                    <div className={`pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400 transition-transform ${isSolutionMenuOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown size={18} />
                    </div>

                    <AnimatePresence>
                      {isSolutionMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.14 }}
                          className="absolute z-20 mt-2 w-full rounded-2xl bg-slate-950 shadow-2xl shadow-black/40 overflow-hidden ring-1 ring-white/10"
                          role="listbox"
                          aria-label="Solution interest options"
                        >
                          {[
                            'Network Infrastructure',
                            'Software Ecosystems',
                            'IoT & Edge Computing',
                          ].map((opt) => {
                            const selected = opt === solutionInterest;
                            return (
                              <button
                                key={opt}
                                type="button"
                                role="option"
                                aria-selected={selected}
                                className={`w-full px-5 py-3 text-left text-sm transition-colors ${
                                  selected
                                    ? 'bg-indigo-500/15 text-white'
                                    : 'text-slate-200 hover:bg-white/[0.06]'
                                }`}
                                onClick={() => {
                                  setSolutionInterest(opt);
                                  setIsSolutionMenuOpen(false);
                                }}
                              >
                                <div className="font-medium">{opt}</div>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-slate-400 mb-2.5">
                    Message
                  </label>
                  <textarea rows={5} className="w-full bg-white/[0.06] rounded-2xl px-5 py-4 outline-none transition-all text-white placeholder:text-slate-500 ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500/40 focus:bg-white/[0.08] resize-none" placeholder="Tell us about your project..."></textarea>
                </div>
                <div className="pt-2">
                  <GlassButton type="submit" className="w-full py-5 justify-center">
                    Send Message
                  </GlassButton>
                  <div className="mt-3 text-xs text-slate-400 text-center">
                    By submitting, you agree to be contacted by our team.
                  </div>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 sm:py-24 lg:py-40 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <span className="section-label">FAQ</span>
            <h2 className="text-4xl font-display font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="grid gap-3">
            {[
              {
                question: "What industries do you specialize in?",
                answer: "We specialize in providing IT solutions for various sectors including manufacturing, healthcare, logistics, and retail. Our expertise in IoT and custom software allows us to adapt to almost any industry requirement."
              },
              {
                question: "How long does a typical project take?",
                answer: "Project timelines vary based on complexity. A standard custom ERP or specialized system typically takes between 3 to 6 months from initial discovery to final deployment."
              },
              {
                question: "Do you provide 24/7 monitoring?",
                answer: "Yes, our Network Infrastructure service includes options for 24/7 proactive monitoring and rapid-response technical support to ensure your business stays connected around the clock."
              },
              {
                question: "Can you integrate with our existing systems?",
                answer: "Absolutely. One of our core strengths is integration, where we connect new smart sensors and software with your legacy systems to provide a unified data dashboard."
              }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const Footer = () => {
  const goToSection = useSectionNav();
  return (
    <footer className="bg-slate-950 pt-20 sm:pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-8">
              <img
                src="/company/3core.png"
                alt="3CORE"
                className="h-9 sm:h-10 w-auto object-contain scale-150 sm:scale-175 origin-left"
                draggable={false}
              />
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Architecting resilient digital ecosystems through precision engineering and intelligent automation for global corporations.
            </p>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-8 text-white">Solutions</h4>
            <ul className="space-y-4">
              <li><Link to="/solutions/infrastructure" className="text-slate-400 hover:text-indigo-400 transition-colors">Infrastructure</Link></li>
              <li><Link to="/solutions/software" className="text-slate-400 hover:text-indigo-400 transition-colors">Software</Link></li>
              <li><Link to="/solutions/iot" className="text-slate-400 hover:text-indigo-400 transition-colors">IoT & Edge</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Security</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-8 text-white">Company</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="/#about"
                  className="text-slate-400 hover:text-indigo-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection('#about');
                  }}
                >
                  About Us
                </a>
              </li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">News</a></li>
              <li>
                <a
                  href="/#contact"
                  className="text-slate-400 hover:text-indigo-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection('#contact');
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-bold mb-8 text-white">Subscribe to Insights</h4>
            <p className="text-sm text-slate-400 mb-6">Get the latest technical insights delivered to your inbox.</p>
            <div className="flex gap-2">
              <input type="email" className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:border-indigo-600 outline-none transition-all text-white" placeholder="Email address" />
              <GlassButton className="!p-3 !rounded-full">
                <ArrowRight size={20} />
              </GlassButton>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-500">
            © 2026 3CORE LeadersTech. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <HashScrollAfterRoute />
      <div className="min-h-screen selection:bg-indigo-100 selection:text-indigo-700">
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </Router>
  );
}
