import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navLinks, services } from '../data/mockData';
import { serviceDetailsMap } from '../data/serviceDetails';
import { ChevronDown, Phone, Menu, X, Search } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const leaveTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const handleAboutEnter = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setAboutOpen(true);
  };

  const handleAboutLeave = () => {
    leaveTimerRef.current = setTimeout(() => setAboutOpen(false), 150);
  };

  // Filter services based on search
  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#1F2937] text-white text-xs md:text-sm py-2 md:py-2.5 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">
          <span className="font-medium tracking-wide text-center md:text-left text-xs md:text-sm">Your #1 Solution for Home Services Lead Generation</span>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-white/90 hover:text-white cursor-pointer transition-colors">Partner Support</span>
            <a href="tel:8553877272" className="flex items-center gap-2 font-bold hover:text-white/90 transition-colors">
              <Phone size={14} fill="white" />
              (646) 494-0813
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-2 md:py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-0 shrink-0">
            <img src="/Logo1.png" alt="Blitz Logo" className="h-16 md:h-20 w-36 md:w-48 object-contain" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-7 ml-8 lg:ml-12">
            {navLinks.map((link) => {
              if (link.label === 'Services') {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className={`flex items-center gap-1 text-[15px] font-medium transition-colors hover:text-[#10B981] ${
                        link.active ? 'text-[#10B981]' : 'text-gray-700'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`mt-0.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* ── SERVICES MEGA DROPDOWN ── */}
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="absolute left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-2xl z-[999] border border-gray-200"
                        style={{ width: '850px', maxWidth: '90vw', top: 'calc(100% + 12px)' }}
                      >
                        {/* Search Bar */}
                        <div className="px-6 pt-5 pb-4 border-b border-gray-100">
                          <div className="relative">
                            <Search
                              size={16}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search for services..."
                              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] transition-all"
                            />
                          </div>
                        </div>

                        {/* Services Grid — 5 columns with PNG logos */}
                        <div className="px-6 py-5 max-h-[65vh] overflow-y-auto">
                          {filteredServices.length > 0 ? (
                            <div className="grid grid-cols-5 gap-x-4 gap-y-3">
                              {filteredServices.map((service) => {
                                const details = serviceDetailsMap[service.id];
                                return (
                                  <Link
                                    key={service.id}
                                    to={`/service/${service.id}`}
                                    className="group/item flex flex-col items-center gap-2 px-2 py-3 rounded-lg hover:bg-[#F0FDF4] transition-all duration-150"
                                    onClick={() => setServicesOpen(false)}
                                  >
                                    {/* Logo Image Circle */}
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#ECFDF5] transition-all duration-150 overflow-hidden border border-gray-200 group-hover/item:border-[#10B981]">
                                      <img
                                        src={`/${details.logo}.png`}
                                        alt={service.name}
                                        className="w-full h-full object-cover scale-[3.5]"
                                      />
                                    </div>
                                    {/* Service Name */}
                                    <span className="text-[12px] font-medium text-gray-700 group-hover/item:text-[#10B981] text-center leading-tight transition-colors duration-150">
                                      {service.name}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-center text-gray-500 py-8">
                              <p className="text-sm">No services found</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              }

              if (link.label === 'About Us') {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={handleAboutEnter}
                    onMouseLeave={handleAboutLeave}
                  >
                    <button
                      onClick={() => setAboutOpen(!aboutOpen)}
                      className={`flex items-center gap-1 text-[15px] font-medium transition-colors hover:text-[#F7941D] ${
                        link.active ? 'text-[#F7941D]' : 'text-gray-700'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`mt-0.5 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* About Us Dropdown */}
                    {aboutOpen && (
                      <div
                        onMouseEnter={handleAboutEnter}
                        onMouseLeave={handleAboutLeave}
                        className="absolute top-full left-0 mt-3 bg-white rounded-2xl shadow-2xl z-[999] border border-gray-100 overflow-hidden w-48"
                      >
                        <Link
                          to="/testimonials"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-[#EBF3FE] transition-colors duration-150 text-gray-700 hover:text-[#1565C0] font-medium text-sm"
                          onClick={() => setAboutOpen(false)}
                        >
                          ⭐ Testimonials
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              // Home link should use React Router Link
              if (link.label === 'Home') {
                return (
                  <Link
                    key={link.label}
                    to="/"
                    className={`flex items-center gap-1 text-[15px] font-medium transition-colors hover:text-[#F7941D] ${
                      link.active ? 'text-[#F7941D]' : 'text-gray-700'
                    }`}
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown size={14} className="mt-0.5" />}
                  </Link>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-1 text-[15px] font-medium transition-colors hover:text-[#F7941D] ${
                    link.active ? 'text-[#F7941D]' : 'text-gray-700'
                  }`}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={14} className="mt-0.5" />}
                </a>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              to="/contact"
              className="text-[15px] font-medium text-gray-700 hover:text-[#10B981] transition-colors"
            >
              Contact
            </Link>
            <a
              href="/bookacall"
              className="text-[15px] font-medium text-[#10B981] hover:text-[#059669] border border-[#10B981] hover:bg-[#ECFDF5] px-5 py-2 rounded-full transition-all duration-300"
            >
              Book a Call
            </a>
            <Link
              to="/contact"
              className="bg-[#10B981] hover:bg-[#059669] text-white font-bold text-sm px-7 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1 text-gray-700 hover:text-[#10B981] transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg px-4 md:px-6 py-3 space-y-2 md:space-y-3 max-h-[calc(100vh-120px)] overflow-y-auto">
            {navLinks.map((link) => {
              if (link.label === 'Services') {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className={`w-full text-left flex items-center justify-between py-2 text-sm md:text-[15px] font-medium ${
                        link.active ? 'text-[#F7941D]' : 'text-gray-700'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {mobileServicesOpen && (
                      <>
                        {/* Mobile search */}
                        <div className="px-0 py-2">
                          <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search services..."
                              className="w-full pl-9 pr-3 py-1.5 md:py-2 bg-gray-50 rounded-lg text-xs md:text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F7941D]/40"
                            />
                          </div>
                        </div>

                        <div className="pl-2 space-y-1 pt-1 border-l-2 border-[#10B981]">
                          {filteredServices.map((service) => {
                            const details = serviceDetailsMap[service.id];
                            return (
                              <Link
                                key={service.id}
                                to={`/service/${service.id}`}
                                className="flex items-center gap-2 py-1.5 md:py-2 px-2 text-xs md:text-sm text-gray-600 hover:text-[#10B981] hover:bg-[#ECFDF5] rounded-md transition-colors"
                                onClick={() => {
                                  setMobileOpen(false);
                                  setMobileServicesOpen(false);
                                }}
                              >
                                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 border border-gray-200 overflow-hidden">
                                  <img
                                    src={`/${details.logo}.png`}
                                    alt={service.name}
                                    className="w-full h-full object-cover scale-[3.5]"
                                  />
                                </div>
                                {service.name}
                              </Link>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                );
              }

              if (link.label === 'About Us') {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                      className={`w-full text-left flex items-center justify-between py-2 text-sm md:text-[15px] font-medium ${
                        link.active ? 'text-[#10B981]' : 'text-gray-700'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {mobileAboutOpen && (
                      <div className="pl-2 space-y-0.5 pt-1 border-l-2 border-[#10B981]">
                        <Link
                          to="/testimonials"
                          className="flex items-center gap-2 py-1 md:py-1.5 px-2 text-xs md:text-sm text-gray-600 hover:text-[#10B981] hover:bg-[#ECFDF5] rounded-md transition-colors font-medium"
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileAboutOpen(false);
                          }}
                        >
                          ⭐ Testimonials
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`block py-2 text-sm md:text-[15px] font-medium ${
                    link.active ? 'text-[#10B981]' : 'text-gray-700'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
            <Link
              to="/contact"
              className="block py-2 text-sm md:text-[15px] font-medium text-gray-700"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t">
              <a
                href="/bookacall"
                className="inline-block border border-[#10B981] text-[#10B981] font-bold text-xs md:text-sm px-4 md:px-5 py-2 rounded-full text-center hover:bg-[#ECFDF5] transition-all"
              >
                Book a Call
              </a>
              <Link
                to="/contact"
                className="inline-block bg-[#10B981] text-white font-bold text-xs md:text-sm px-6 md:px-7 py-2.5 rounded-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
              <a href="tel:8553877272" className="flex items-center justify-center gap-2 text-[#10B981] font-bold text-xs md:text-sm">
                <Phone size={14} /> (646) 494-0813
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

// Returns contextual SVG path data based on service name keywords
function getServiceSVGPath(name) {
  const n = name.toLowerCase();

  if (n.includes('appliance'))
    return <><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>;
  if (n.includes('asbestos') || n.includes('biohazard') || n.includes('mold'))
    return <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>;
  if (n.includes('bathroom') || n.includes('plumb'))
    return <><path d="M7 21v-4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"/><rect x="2" y="7" width="20" height="8" rx="2"/><path d="M12 7V3"/></>;
  if (n.includes('cabinet'))
    return <><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="3" x2="12" y2="21"/></>;
  if (n.includes('chimney'))
    return <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>;
  if (n.includes('concrete') || n.includes('foundation'))
    return <><rect x="3" y="3" width="18" height="6" rx="1"/><rect x="3" y="12" width="18" height="9" rx="1"/><path d="M3 9v3"/><path d="M21 9v3"/></>;
  if (n.includes('deck'))
    return <><path d="M5 9l4-4 4 4 4-4 4 4"/><path d="M3 14h18"/><path d="M3 18h18"/></>;
  if (n.includes('door'))
    return <><path d="M13 4H3v16h10"/><line x1="9" y1="12" x2="13" y2="12"/><rect x="13" y="4" width="8" height="16" rx="1"/></>;
  if (n.includes('electric'))
    return <><polyline points="13 2 13 9 20 9"/><polygon points="22 12 13 2 2 12 4 12 4 21 10 21 10 15 14 15 14 21 20 21 20 12 22 12"/></>;
  if (n.includes('garage'))
    return <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><line x1="9" y1="22" x2="9" y2="12"/><line x1="15" y1="22" x2="15" y2="12"/><line x1="9" y1="12" x2="15" y2="12"/></>;
  if (n.includes('gutter') || n.includes('water'))
    return <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>;
  if (n.includes('hvac'))
    return <><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 6v6l4 2"/></>;
  if (n.includes('fenc'))
    return <><line x1="4" y1="4" x2="4" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="20" y1="4" x2="20" y2="20"/><line x1="2" y1="8" x2="22" y2="8"/><line x1="2" y1="16" x2="22" y2="16"/></>;
  if (n.includes('fire'))
    return <><path d="M12 22c4 0 8-3 8-9 0-5-4-9-8-12C8 4 4 8 4 13c0 6 4 9 8 9z"/><path d="M12 22c2 0 4-1.5 4-4.5 0-2.5-2-4.5-4-6-2 1.5-4 3.5-4 6 0 3 2 4.5 4 4.5z"/></>;
  if (n.includes('floor'))
    return <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>;
  if (n.includes('landscape'))
    return <><path d="M3 18l9-9 9 9"/><path d="M12 9V3"/><circle cx="12" cy="3" r="2"/></>;
  if (n.includes('locksmith') || n.includes('lock'))
    return <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>;
  if (n.includes('paint'))
    return <><circle cx="13.5" cy="6.5" r="4"/><path d="M13.5 10.5L5 19a2 2 0 0 0 3 3l8.5-8.5"/><path d="M14 7l3 3"/></>;
  if (n.includes('pest'))
    return <><path d="M8 2l4 4 4-4"/><path d="M12 6v12"/><path d="M6 10c0 2 2 4 6 4s6-2 6-4"/><path d="M4 14l2-2"/><path d="M20 14l-2-2"/></>;
  if (n.includes('roof'))
    return <><polyline points="3 10 12 3 21 10"/><path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9"/><path d="M10 21v-6h4v6"/></>;
  if (n.includes('snow'))
    return <><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>;
  if (n.includes('siding'))
    return <><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18"/><path d="M3 15h18"/></>;
  if (n.includes('stairlift') || n.includes('stair'))
    return <><polyline points="4 20 4 8 12 3 20 8 20 20"/><line x1="4" y1="14" x2="20" y2="14"/><line x1="4" y1="20" x2="20" y2="20"/></>;
  if (n.includes('tree'))
    return <><path d="M12 22V12"/><path d="M12 12l-4-4"/><path d="M12 12l4-4"/><path d="M5 10a7 7 0 0 1 14 0c0 5-7 8-7 8S5 15 5 10z"/></>;
  if (n.includes('filtration'))
    return <><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></>;
  if (n.includes('waterproof'))
    return <><path d="M12 22a7 7 0 0 0 7-7c0-5-7-13-7-13S5 10 5 15a7 7 0 0 0 7 7z"/></>;
  if (n.includes('window'))
    return <><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="12" y1="3" x2="12" y2="21"/></>;

  // fallback shield
  return <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>;
}

export default Navbar;