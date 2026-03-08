import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, CheckCircle2, ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react';

const PromotionalModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage > 30 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShown]);

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setClosing(false);
    }, 250);
  };

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes backdropOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translate(-50%, -46%) scale(0.96); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes modalOut {
          from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          to   { opacity: 0; transform: translate(-50%, -54%) scale(0.96); }
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
          50%       { box-shadow: 0 0 0 10px rgba(16,185,129,0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .promo-backdrop {
          animation: ${closing ? 'backdropOut' : 'backdropIn'} 0.25s ease forwards;
        }
        .promo-modal {
          animation: ${closing ? 'modalOut' : 'modalIn'} 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards;
          font-family: 'Montserrat', sans-serif;
        }
        .promo-modal h1, .promo-modal h2, .promo-modal h3, .promo-modal .sora {
          font-family: 'Montserrat', sans-serif;
        }
        .discount-badge {
          animation: badgePulse 2.4s ease-in-out infinite;
        }
        .shimmer-btn {
          background: linear-gradient(
            90deg,
            #10B981 0%, #34D399 40%, #10B981 60%, #059669 100%
          );
          background-size: 200% auto;
          animation: shimmer 2.5s linear infinite;
        }
        .stat-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="promo-backdrop fixed inset-0 z-40"
        style={{ background: 'rgba(10,20,60,0.72)', backdropFilter: 'blur(4px)' }}
        onClick={closeModal}
      />

      {/* Modal */}
      <div
        className="promo-modal fixed z-50 w-full"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          maxWidth: '780px',
          padding: '0 12px',
          maxHeight: '95vh',
          overflowY: 'auto',
        }}
      >
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden">
          {/* Close button — always visible top-right */}
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-colors z-30"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
            <X size={15} />
          </button>

          <div className="flex flex-col md:flex-row">

            {/* ── LEFT / TOP PANEL (blue) ── */}
            <div
              className="relative md:w-[42%] overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #1F2937 0%, #1F2937 45%, #0F766E 100%)',
              }}
            >
              {/* Decorative circles */}
              <div
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }}
              />
              <div
                className="absolute bottom-0 -left-8 w-40 h-40 rounded-full opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }}
              />

              {/* Mobile: compact horizontal layout */}
              <div className="md:hidden relative z-10 px-5 py-5 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div
                    className="discount-badge inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold mb-2"
                    style={{ background: 'rgba(16,185,129,0.18)', border: '1px solid rgba(16,185,129,0.5)', color: '#34D399' }}
                  >
                    <Zap size={10} fill="#34D399" /> LIMITED TIME
                  </div>
                  <h2
                    className="sora text-white font-extrabold leading-tight"
                    style={{ fontSize: '1.25rem', letterSpacing: '-0.02em' }}
                  >
                    Get <span style={{ color: '#34D399' }}>20% Off</span> Your First Month
                  </h2>
                </div>
                {/* Compact stats — 2 pills on mobile */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {[
                    { value: '50K+', label: 'Leads/mo' },
                    { value: '98%', label: 'Delivery' },
                  ].map((s) => (
                    <div key={s.label} className="stat-card rounded-lg px-2.5 py-1.5 text-center">
                      <div className="sora text-white font-bold text-sm leading-none">{s.value}</div>
                      <div className="text-blue-200 text-[10px] mt-0.5" style={{ opacity: 0.75 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop: full vertical layout */}
              <div className="hidden md:flex relative z-10 p-8 flex-col justify-between" style={{ minHeight: '420px' }}>
                <div>
                  <div
                    className="discount-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
                    style={{ background: 'rgba(16,185,129,0.18)', border: '1px solid rgba(16,185,129,0.5)', color: '#34D399' }}
                  >
                    <Zap size={12} fill="#34D399" /> LIMITED TIME OFFER
                  </div>
                  <h2
                    className="sora text-white font-extrabold leading-tight mb-3"
                    style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}
                  >
                    Get <span style={{ color: '#34D399' }}>6 Qualified leads</span> Only Pay for 5
                  </h2>
                  <p className="text-blue-200 text-sm leading-relaxed" style={{ opacity: 0.85 }}>
                    Join 2,400+ home service pros already growing with exclusive, real-time leads.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-8">
                  {[
                    { value: '50K+', label: 'Monthly Leads' },
                    { value: '$200', label: 'Appointment Cost' },
                    { value: '98%', label: 'Delivery Rate' },
                    { value: '$80', label: 'Avg. Cost/Lead' },
                  ].map((s) => (
                    <div key={s.label} className="stat-card rounded-xl px-3 py-2.5 text-center">
                      <div className="sora text-white font-bold text-lg leading-none">{s.value}</div>
                      <div className="text-blue-200 text-xs mt-0.5" style={{ opacity: 0.75 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT / BOTTOM PANEL (white) ── */}
            <div className="md:w-[58%] bg-white flex flex-col justify-between p-5 md:p-8">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: '#10B981' }}>
                  Exclusive Partner Offer
                </p>
                <h3
                  className="sora text-gray-900 font-extrabold leading-snug mb-4"
                  style={{ fontSize: '1.1rem', letterSpacing: '-0.01em' }}
                >
                  Why contractors choose Blitz
                </h3>

                {/* Benefits list */}
                <div className="space-y-2 mb-5">
                  {[
                    {
                      icon: <Shield size={14} />,
                      title: '100% Exclusive Leads',
                      desc: 'Every lead goes to you and only you — no shared pipeline.',
                    },
                    {
                      icon: <Zap size={14} />,
                      title: 'Real-Time Delivery',
                      desc: 'Leads hit your inbox the moment a homeowner submits.',
                    },
                    {
                      icon: <TrendingUp size={14} />,
                      title: 'Flexible, Scalable Pricing',
                      desc: 'Start small and scale up. No long-term contracts.',
                    },
                    {
                      icon: <CheckCircle2 size={14} />,
                      title: 'Verified Homeowners Only',
                      desc: 'Every lead is validated before it reaches you.',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 p-2.5 md:p-3 rounded-xl"
                      style={{ background: '#F8FAFF' }}
                    >
                      <div
                        className="w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: '#ECFDF5', color: '#10B981' }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-semibold text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div>
                <Link
                  to="/contact"
                  onClick={closeModal}
                  className="shimmer-btn flex items-center justify-center gap-2 w-full text-white font-bold py-3 md:py-3.5 rounded-xl text-sm tracking-wide transition-transform active:scale-[0.98]"
                  style={{ boxShadow: '0 8px 24px rgba(247,148,29,0.35)' }}
                >
                   Get Started now
                  <ArrowRight size={15} />
                </Link>
                <p className="text-center text-xs text-gray-400 mt-2.5">
                  New partners only · No credit card required · Offer expires soon
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionalModal;