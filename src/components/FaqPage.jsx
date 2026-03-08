import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Filter, Calendar, CheckCircle, ChevronDown } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Send,
    title: 'We Run Your Ads',
    description: 'Targeted Meta campaigns reach homeowners actively looking for your services.',
    details: 'Our expert team runs precisely targeted Meta advertising campaigns designed to reach homeowners and business owners actively searching for services like yours. We use advanced audience segmentation, custom pixels, and conversion tracking to ensure your ads reach the right people at the right time. Every campaign is optimized for maximum ROI, with daily monitoring and adjustments to improve performance continuously.'
  },
  {
    number: '02',
    icon: Filter,
    title: 'Leads Are Filtered',
    description: 'We qualify every lead. Wrong fit? They never reach you.',
    details: 'Not all leads are created equal. Our proprietary lead qualification process ensures that only high-quality, interested prospects reach your calendar. We apply intelligent filtering based on factors like intent signals, location relevance, budget indicators, and past interaction patterns. This pre-qualification saves you valuable time and resources by eliminating unqualified inquiries before they reach your team.'
  },
  {
    number: '03',
    icon: Calendar,
    title: 'Appointments Get Booked',
    description: 'Real prospects land directly on your calendar. Ready to buy.',
    details: 'Once a qualified prospect shows intent, we handle the appointment booking process seamlessly. Using our integrated appointment system, we schedule serious buyers directly into your calendar with all relevant information pre-populated. No more playing phone tag—prospects who book appointments with us are genuinely interested and ready to move forward with your services.'
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'You Close The Job',
    description: 'Show up, give your quote, and win the work. Simple as that.',
    details: 'Your job is to do what you do best—deliver exceptional service and close the deal. With pre-qualified leads already booked and ready to talk, you can focus on consultations, quotes, and conversions. We handle the lead generation and qualification; you handle the closing. That\'s the Blitz advantage: qualified leads ready to become customers.'
  }
];

const FaqSection = () => {
  const [expandedStep, setExpandedStep] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            How We Help Your <span className="text-[#10B981]">Business Grow</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Our proven 4-step process turns curious homeowners into booked appointments and paying customers. Here's exactly how we do it.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-[#10B981]/30 transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              {/* Header - Clickable */}
              <motion.button
                onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                className="w-full text-left px-6 lg:px-8 py-6 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon Container */}
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-[#ECFDF5] flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <step.icon size={28} className="text-[#10B981]" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[#10B981] font-black text-sm tracking-wider">
                          STEP {step.number}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Chevron */}
                  <motion.div
                    animate={{ rotate: expandedStep === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <ChevronDown size={24} className="text-gray-400" />
                  </motion.div>
                </div>
              </motion.button>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedStep === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-gray-100 px-6 lg:px-8 py-6 bg-gradient-to-r from-[#ECFDF5]/30 to-transparent">
                      <p className="text-gray-700 leading-relaxed text-lg mb-4">
                        {step.details}
                      </p>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="text-[#10B981] font-semibold flex items-center gap-2">
                          <CheckCircle size={18} />
                          This is what sets Blitz apart from traditional agencies
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Why This Process */}
        <motion.div
          className="mt-20 bg-gradient-to-br from-[#ECFDF5] to-white rounded-2xl border border-[#10B981]/20 p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Why This Process Works
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Higher Quality Leads</h3>
                <p className="text-gray-600">Pre-qualified leads mean fewer follow-ups and higher conversion rates.</p>
              </div>
            </motion.div>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Your Time Matters</h3>
                <p className="text-gray-600">Let us handle lead generation and qualification while you focus on closing.</p>
              </div>
            </motion.div>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Scalable Growth</h3>
                <p className="text-gray-600">As your business grows, we grow with you. No cap on potential.</p>
              </div>
            </motion.div>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Transparent Reporting</h3>
                <p className="text-gray-600">See exactly where your money is going and what results you're getting.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-[#10B981] hover:bg-[#059669] text-white font-bold py-4 px-10 rounded-full transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
          >
            Book a Call Today
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default FaqSection;
