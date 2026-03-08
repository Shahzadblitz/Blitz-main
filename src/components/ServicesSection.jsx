import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/mockData';
import { ChevronRight } from 'lucide-react';

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!services || services.length === 0) {
    return (
      <section className="py-6 bg-red-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-red-600 font-bold">ERROR: No services data found</p>
        </div>
      </section>
    );
  }

  const activeService = services[activeIndex];

  return (
    <section id="services" className="py-8 bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Services We Specialize In
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of lead generation services for home service industries
          </p>
        </div>
      </div>

      {/* Services Container */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Mobile: Horizontal Scrolling Tabs */}
          <div className="lg:hidden border-b border-gray-200 overflow-x-auto">
            <div className="flex gap-2 p-4">
              {services.map((service, idx) => (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                    idx === activeIndex
                      ? 'bg-[#F7941D] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {service.name}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="lg:grid lg:grid-cols-12 lg:min-h-[500px]">
            
            {/* Left Sidebar - Desktop Only */}
            <div className="hidden lg:block lg:col-span-3 border-r border-gray-200 bg-gray-50 overflow-y-auto max-h-[500px]">
              <div className="p-2">
                {services.map((service, idx) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full text-left px-4 py-3 mb-1 rounded-lg text-sm font-medium transition-all ${
                      idx === activeIndex
                        ? 'bg-white text-gray-900 font-bold shadow-sm border-l-4 border-[#F7941D]'
                        : 'text-gray-600 hover:bg-white hover:text-gray-900'
                    }`}
                  >
                    {service.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-9">
              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Image */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeService.id}
                      src={activeService.image}
                      alt={activeService.name}
                      className="w-full h-[280px] object-cover rounded-2xl shadow-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                </div>

                {/* Description */}
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeService.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-[#F7941D] mb-4">
                        {activeService.name}
                      </h3>
                      
                      <div className="mb-4">
                        <p className="text-gray-900 font-bold text-base">We Understand the Problem.</p>
                        <p className="text-gray-900 font-bold text-base">Here's Your Solution</p>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {activeService.description}
                      </p>
                      
                      <a
                        href={activeService.link || '#'}
                        className="inline-flex items-center gap-2 text-[#F7941D] font-bold text-sm hover:text-[#e67e0a] transition-colors group"
                      >
                        Read More 
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;