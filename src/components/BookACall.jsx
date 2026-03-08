import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const BookACall = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif", minHeight: '100vh', background: '#f9fafb' }}>
      <style>{`
        .bac-hero {
          background: linear-gradient(135deg, #1F2937 0%, #1F2937 55%, #0F766E 100%);
          padding: 60px 20px 120px;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .bac-hero::before {
          content: '';
          position: absolute;
          top: -80px;
          right: -80px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .bac-container {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .bac-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 900;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
          font-family: 'Montserrat', sans-serif;
        }

        .bac-subtitle {
          font-size: 17px;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .bac-content {
          max-width: 1100px;
          margin: -80px auto 0;
          padding: 0 20px 80px;
          position: relative;
          z-index: 10;
        }

        .calendly-wrapper {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          overflow: hidden;
        }

        .calendly-inline-widget {
          min-width: 320px;
          height: 800px;
        }

        /* Hide Calendly branding and improve appearance */
        .calendly-inline-widget iframe {
          border: none !important;
        }

        @media (max-width: 768px) {
          .bac-hero {
            padding: 40px 20px 80px;
          }

          .bac-content {
            margin: -60px auto 0;
          }

          .calendly-inline-widget {
            height: 900px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <motion.section className="bac-hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <motion.div className="bac-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <h1 className="bac-title">Book a Call</h1>
          <p className="bac-subtitle">
            Schedule a no-pressure introduction call to see if we're a good fit and get your questions answered.
          </p>
        </motion.div>
      </motion.section>

      {/* Calendly Embed Section */}
      <motion.section className="bac-content" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <motion.div className="calendly-wrapper" whileHover={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} transition={{ duration: 0.3 }}>
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/marketing-blitzdigitalmedia/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=1565C0"
          ></div>
        </motion.div>
      </motion.section>

      {/* FAQ Section */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px 80px', textAlign: 'center' }}>
        <h2 style={{
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 900,
          color: '#111827',
          margin: '0 0 40px',
          letterSpacing: '-0.02em',
          fontFamily: 'Montserrat, sans-serif',
        }}>
          Frequently Asked Questions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {[
            {
              q: 'How long is the call?',
              a: 'Our introduction calls are 30 minutes long, perfect for discussing your needs and exploring how we can help grow your business.',
            },
            {
              q: 'Is there any obligation?',
              a: 'No pressure at all! This is a no-obligation introduction call. We simply want to understand your business and see if we\'re a good fit.',
            },
            {
              q: 'What should I prepare?',
              a: 'Just be ready to discuss your business, current marketing efforts, and growth goals. Have any questions ready that you\'d like answered.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#fff',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                textAlign: 'left',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
              }}
            >
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#111827',
                margin: '0 0 12px',
              }}>
                {item.q}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: 0,
                lineHeight: 1.6,
              }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BookACall;