import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const PayPerAppointmentComparison = () => {
  const features = [
    'Pay only for booked appointments',
    'No monthly fees or retainers',
    'Cancel anytime—no contracts',
    'We only get paid when you do',
    'Pre-qualified, appointment-ready leads',
    'Full transparency and reporting'
  ];

  const traditionalNegatives = [
    'Monthly retainers—pay regardless of results',
    'Pay for leads that never answer',
    'Locked into long-term contracts',
    'No accountability for performance',
    'Generic leads, not qualified appointments',
    'Inflated costs with no guarantees'
  ];

  return (
    <section className="py-16 lg:py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-12 px-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Why Pay-Per-Appointment Works
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Traditional agencies profit whether you win or lose. We only win when you do.
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ staggerChildren: 0.1 }} viewport={{ once: true }}>
          {/* Traditional Agencies */}
          <motion.div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-red-100" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
              <X size={28} className="text-red-500 flex-shrink-0" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-left">Traditional Agencies</h3>
            </div>

            <ul className="space-y-2.5">
              {traditionalNegatives.map((item, idx) => (
                <motion.li key={idx} className="flex items-start gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} viewport={{ once: true }}>
                  <X size={18} className="text-red-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-base md:text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Up Arrow Model (Our Model) */}
          <motion.div className="bg-gradient-to-br from-[#ECFDF5] to-[#F0FDF4] rounded-2xl p-6 md:p-8 shadow-lg border-2 border-[#10B981]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
              <Check size={28} className="text-[#059669] flex-shrink-0" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-left">Blitz Model</h3>
            </div>

            <ul className="space-y-2.5">
              {features.map((item, idx) => (
                <motion.li key={idx} className="flex items-start gap-3" initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} viewport={{ once: true }}>
                  <Check size={18} className="text-[#10B981] flex-shrink-0 mt-1" />
                  <span className="text-gray-900 text-base md:text-lg font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div className="text-center mt-8 px-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }}>
          <p className="text-gray-700 text-base md:text-lg mb-6">Ready to see the difference?</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full transition-all duration-300 text-base sm:text-lg">
            Start Getting Booked Appointments Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PayPerAppointmentComparison;