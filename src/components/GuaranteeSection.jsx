import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const GuaranteeSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left Content */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F2937] mb-6 leading-tight"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              #1 Top-Rated Lead<br />
              Generation & Appointment setting Company<br />
              for Restoration Businessed
            </h2>
            <div className="mb-4">
              <p className="text-gray-900 font-bold text-base">We Understand the Problem.</p>
              <p className="text-gray-900 font-bold text-base">Here's Your Solution</p>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
             We specialize in helping restoration businesses grow faster by delivering high-quality leads and setting ready-to-book appointments that convert into paying clients. Our proven system ensures you spend less time chasing customers and more time focusing on restoring homes and businesses. Join the hundreds of restoration professionals who trust us to drive consistent growth and maximize revenue.
            </p>
          </motion.div>

          {/* Right - Image with Card */}
          <motion.div
            className="relative order-1 lg:order-2 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="https://inquirly.com/admin/wp-content/uploads/2022/07/image-1.jpg"
              alt="Exclusive Leads"
              className="w-full rounded-2xl shadow-xl"
            />
            {/* Floating Card */}
            <motion.div
              className="absolute -bottom-3 -left-3 sm:-bottom-6 md:left-8 bg-white rounded-xl shadow-2xl p-4 sm:p-5 max-w-[220px]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
                <span className="text-[#10B981] text-xs font-bold">+1 New Lead</span>
              </div>
              <div className="mb-2">
                <p className="text-gray-400 text-xs">Client Budget</p>
                <p className="text-gray-900 font-extrabold text-xl">$15,000</p>
              </div>
              <div className="flex items-center gap-2 bg-[#ECFDF5] rounded-lg px-3 py-2">
                <Flame size={16} className="text-[#10B981]" />
                <div>
                  <p className="text-xs font-bold text-gray-900">Fire Restoration</p>
                  <p className="text-xs text-gray-500">Miami, FL</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
