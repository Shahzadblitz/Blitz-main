import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewHeroSection = () => {
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
    <section className="py-20 lg:py-28 px-6 bg-white">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Badge */}
        <motion.div className="flex justify-center mb-10" variants={itemVariants}>
          <div className="inline-block bg-[#ECFDF5] px-4 py-2 rounded-full">
            <span className="text-sm font-bold text-[#10B981]">Pay-Per-Appointment Lead Generation</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div className="text-center mb-12 px-2" variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-6 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Get Booked Appointments.
            <br />
            <span className="text-[#10B981]">Only Pay When We Deliver.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We generate exclusive leads and book real appointments for home service businesses. No retainers. No contracts. No risk.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-16 px-2" variants={itemVariants}>
          <div className="flex items-center gap-3">
            <CheckCircle className="text-[#A4D65E] flex-shrink-0" size={24} />
            <span className="text-base md:text-lg font-semibold text-gray-800">100+ Home Service Clients</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="text-[#A4D65E] flex-shrink-0" size={24} />
            <span className="text-base md:text-lg font-semibold text-gray-800">Thousands of Jobs Booked</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 px-2" variants={itemVariants}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 text-base sm:text-lg"
            >
              Get Appointments <ArrowRight size={20} className="hidden sm:inline" />
            </Link>
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/testimonials"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-800 hover:bg-gray-50 text-gray-800 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 text-base sm:text-lg"
            >
              ▶ Watch Real Results
            </Link>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NewHeroSection;