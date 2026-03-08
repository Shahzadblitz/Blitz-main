import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation Controls */}
        <motion.div className="flex items-center justify-end mb-10" initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
          <div className="hidden md:flex items-center gap-2">
            <motion.button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${canScrollLeft ? 'border-gray-300 hover:border-[#10B981] hover:text-[#10B981]' : 'border-gray-200 text-gray-300 cursor-not-allowed'}`}
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${canScrollRight ? 'border-gray-300 hover:border-[#10B981] hover:text-[#10B981]' : 'border-gray-200 text-gray-300 cursor-not-allowed'}`}
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[].map((review, idx) => (
            <motion.div
              key={idx}
              className="min-w-[310px] max-w-[310px] snap-start bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-[#FBBC05] fill-[#FBBC05]" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                {review.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
