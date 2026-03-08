import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, Filter, Calendar, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Send,
    title: 'We Run Your Ads',
    description: 'Targeted Meta campaigns reach homeowners actively looking for your services.'
  },
  {
    number: '02',
    icon: Filter,
    title: 'Leads Are Filtered',
    description: 'We qualify every lead. Wrong fit? They never reach you.'
  },
  {
    number: '03',
    icon: Calendar,
    title: 'Appointments Get Booked',
    description: 'Real prospects land directly on your calendar. Ready to buy.'
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'You Close The Job',
    description: 'Show up, give your quote, and win the work. Simple as that.'
  }
];

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div className="text-center mb-16 px-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            A Smarter Way to Get Jobs
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            We handle the marketing. You focus on what you do best—delivering great work.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, idx) => (
            <motion.div key={idx} className="text-center" variants={itemVariants}>
              {/* Step Number */}
              <div className="text-[#10B981] font-black text-xs sm:text-sm mb-4 tracking-wider">
                STEP {step.number}
              </div>

              {/* Icon */}
              <motion.div className="w-14 sm:w-16 h-14 sm:h-16 mx-auto mb-6 rounded-2xl bg-[#ECFDF5] flex items-center justify-center" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                <step.icon size={28} className="text-[#10B981] sm:block" />
              </motion.div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div className="text-center pt-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="inline-block bg-[#10B981] hover:bg-[#059669] text-white font-bold py-4 px-10 rounded-full transition-all duration-300 text-lg"
            >
              Get Started Today
            </Link>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
