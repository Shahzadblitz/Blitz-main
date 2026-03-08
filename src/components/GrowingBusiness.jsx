import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const GrowingBusiness = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left - Image with Stats */}
          <motion.div className="relative" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <img
              src="https://inquirly.com/admin/wp-content/uploads/2022/07/image-2.jpg"
              alt="Growing Your Business"
              className="w-full rounded-2xl shadow-xl"
            />
            {/* Stats overlay card */}
            <motion.div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-auto md:bottom-8 md:left-1/2 md:-translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 text-center max-w-xs mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}>
              <p className="text-gray-500 text-xs font-medium mb-1">Total Generated Leads</p>
              <p className="text-[#1F2937] font-extrabold text-3xl mb-3">
                <CountUp end={248535} duration={3} separator="," enableScrollSpy scrollSpyOnce />
              </p>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-[#10B981] font-extrabold text-xl">
                  $<CountUp end={2000} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />+
                </p>
                <p className="text-gray-500 text-xs">Renovation Contracts Signed Monthly</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-[#10B981] mb-4 leading-tight"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Turning Restoration Leads Into Real Revenue<br />Jobs Worth $50K to $80K and Counting
            </h2>
            <p className="text-gray-900 font-bold text-base mb-4">
              We don’t just generate leads—we deliver ready-to-book clients for restoration businesses who are actively looking for your services.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
Every lead is carefully verified to ensure you’re speaking with homeowners or decision-makers who are ready to act.            </p>
            <p className="text-gray-400 text-sm">
              Our system is designed to maximize your time and revenue, connecting you with clients for high-value restoration jobs while you focus on what you do best: restoring homes and businesses. Partner with us and join the growing list of restoration professionals who have scaled their business faster and smarter
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GrowingBusiness;
