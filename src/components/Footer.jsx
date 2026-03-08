import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { footerLinks } from '../data/mockData';
import { Phone, Facebook, Linkedin, ArrowUp, Instagram } from 'lucide-react';

const CTABanner = () => (
  <section className="py-8">
    <div className="max-w-6xl mx-auto px-6">
      <motion.div className="relative bg-[#1F2937] rounded-2xl overflow-hidden px-10 py-10 md:py-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=60)' }}
        />
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Ready to grow your<br />home service business?
          </h2>
          <motion.div className="text-right" whileHover={{ scale: 1.05 }}>
            <p className="text-white/80 text-sm mb-3">Call our Advertising Specialists</p>
            <motion.a
              href="tel:8553877272"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 text-sm"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={16} />
              (646) 494-0813
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <CTABanner />
      <footer className="bg-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top row */}
          <motion.div className="flex items-center justify-between mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <a href="/" className="flex items-center">
                <img src="/Logo1.png" alt="Blitz Logo" className="h-16 md:h-20 w-36 md:w-48 object-contain" />

            </a>
            <motion.button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-[#10B981] hover:bg-[#059669] text-white flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp size={20} />
            </motion.button>
          </motion.div>

          <div className="border-t border-gray-100 pt-8">
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ staggerChildren: 0.1 }} viewport={{ once: true }}>
              {/* Description */}
              <motion.div className="lg:col-span-1" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Blitz is your premier lead provider for home service companies in the United States. We focus on generating high-quality, exclusive client leads for damage restoration, roofing, plumbing, and bathroom remodeling companies.
                </p>
              </motion.div>

              {/* Links Column 1 */}
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
                {footerLinks.col1.map((link) => {
                  const isInternal = link.href.startsWith('/');
                  const Component = isInternal ? Link : 'a';
                  return (
                    <motion.div key={link.label} whileHover={{ x: 5 }}>
                      <Component
                        to={isInternal ? link.href : undefined}
                        href={isInternal ? undefined : link.href}
                        className="block text-gray-600 text-sm py-1.5 hover:text-[#10B981] transition-colors"
                      >
                        {link.label}
                      </Component>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Links Column 2 */}
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
                {footerLinks.col2.map((link) => {
                  const isInternal = link.href.startsWith('/');
                  const Component = isInternal ? Link : 'a';
                  return (
                    <motion.div key={link.label} whileHover={{ x: 5 }}>
                      <Component
                        to={isInternal ? link.href : undefined}
                        href={isInternal ? undefined : link.href}
                        className="block text-gray-600 text-sm py-1.5 hover:text-[#10B981] transition-colors"
                      >
                        {link.label}
                      </Component>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Address + Social */}
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
                <p className="text-gray-600 text-sm">473 Mundet Place 2</p>
                <p className="text-gray-600 text-sm">Hillside</p>
                <p className="text-gray-900 text-sm font-bold mt-1">New Jersey,07205</p>
                <p className="text-gray-600 text-sm mt-2">(646) 494-0813</p>
                <div className="flex items-center gap-3 mt-4">
                  <motion.a href="https://www.facebook.com/profile.php?id=61574413683181" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-[#10B981] transition-colors" whileHover={{ scale: 1.2 }}>
                    <Facebook size={16} />
                  </motion.a>
                  <motion.a href="https://www.instagram.com/blitzdigitalmedia/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-[#10B981] transition-colors" whileHover={{ scale: 1.2 }}>
                    <Instagram size={16} />
                  </motion.a>
                  <motion.a href="https://www.linkedin.com/company/107052351/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-[#10B981] transition-colors" whileHover={{ scale: 1.2 }}>
                    <Linkedin size={16} />
                  </motion.a>
                </div>
              
              </motion.div>

              {/* Badges */}
              <motion.div className="flex flex-col items-center gap-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center w-32">
                  <svg width="40" height="40" viewBox="0 0 48 48" className="mx-auto mb-2">
                    <circle cx="24" cy="24" r="20" fill="#4285F4" />
                    <text x="24" y="29" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">G</text>
                  </svg>
                  <p className="text-xs text-gray-500">Google Partner</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-100 mt-10 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2020-2026 All Rights Reserved. Blitz Inc.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
