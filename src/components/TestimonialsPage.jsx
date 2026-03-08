import React, { useState, useEffect } from 'react';
import { Star, Quote, ArrowRight, Play } from 'lucide-react';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const testimonials = [
  {
    id: 1,
    name: 'Gaby Moyano',
    handle: '@gabymoyanosales',
    title: 'Sales Professional',
    rating: 5,
    headline: 'From Disappointed to 10+ Car Sales in One Month!',
    content: "I was very, very disappointed about my job until I found Shahzad. Thanks to his lead generation program, I sold more than 10 cars in my first month! He's been there helping me since day one. I highly recommend him!",
    attribution: '— Gaby, Sales Professional',
    initial: 'GM',
    color: '#10B981',
    videoUrl: 'https://drive.google.com/file/d/17UkB-VEQqKi0PmgnzSB_uZ0qTlSqz9gQ/preview',
  },
  {
    id: 2,
    name: 'The Moving Guys',
    handle: '@themovingguys',
    title: 'Moving Company',
    rating: 5,
    headline: 'Our Leads Shot Up! 📈',
    content: 'Working with Blitz Digital Media really helped us in connecting to the rest of the world. With their Lead Connector, our leads shot up, and I recommend Blitz Digital Media for each and every business. Blitz, you really helped us!',
    attribution: '— The Moving Guys',
    initial: 'TM',
    color: '#059669',
    videoUrl: 'https://drive.google.com/file/d/1Bv4qbJoaH2wuI83-CFy5CQREHCbhFvRF/preview',
  },
  {
    id: 3,
    name: 'Kitchen Remodel Client',
    handle: '@kitchenremodel',
    title: 'Construction Company',
    rating: 5,
    headline: 'From Inconsistent Referrals to High-Conversion Automation',
    content: 'After struggling with wasted downtime, Blitz Digital Media transformed our business by delivering a high-quality, automated lead generation system that turned just 10 inquiries into a major kitchen remodel project.',
    attribution: '— Kitchen Remodel Client',
    initial: 'KC',
    color: '#0d9488',
    videoUrl: 'https://drive.google.com/file/d/19iklSFaPqt_H5rHxOAO0ZKVOx_GfGTIp/preview',
  },
  {
    id: 4,
    name: 'Home Services Partner',
    handle: '@homeservices',
    title: 'Home Services',
    rating: 5,
    headline: 'From Idle Days to a Full Pipeline',
    content: "Before Blitz Digital Media, we relied entirely on inconsistent word-of-mouth referrals that left our crew with too much downtime and wasted days. Blitz transformed our business with an automated system that prioritizes quality over quantity; while other agencies might require 300 leads to land a couple of jobs, Blitz delivered a major kitchen remodel contract from just our first ten leads. Their affordable, results-driven approach has finally allowed us to operate at our full capacity.",
    attribution: '— Home Services Partner',
    initial: 'HS',
    color: '#7c3aed',
    videoUrl: 'https://drive.google.com/file/d/1F4ycGZLe8b4CdBs7cNFtYVMrCu4L7fEX/preview',
  },
  {
    id: 5,
    name: 'Aliz Renovation',
    handle: '@alizrenovation',
    title: 'Renovation Company',
    rating: 5,
    headline: 'From Wasted Days to Full-Capacity Operations',
    content: 'Blitz Digital Media took us from inconsistent "wasted days" to booking a full kitchen remodel from our first 10 leads by delivering high-quality automation that finally keeps our crew working at full capacity.',
    attribution: '— Aliz, Renovation Company',
    initial: 'AR',
    color: '#059669',
    videoUrl: 'https://drive.google.com/file/d/1Yozro2CUya2wbcgnUzsYwPIDm_IjzcL-/preview',
  },
  {
    id: 6,
    name: 'Smith Solar Advantage',
    handle: '@smithsolar',
    title: 'Solar Installation Company',
    rating: 5,
    headline: 'From First Lead to Full-Town Solar Opportunity',
    content: 'Blitz Media just generated a lead that connected us directly with a town\'s mayor — and what started as a single conversation has now opened the door to a full-town solar installation opportunity. It was our first time meeting with a mayor to discuss powering an entire community, and the potential impact is massive. Super excited and grateful for the opportunity to work on something this big.',
    attribution: '— Smith, Solar Advantage',
    initial: 'SS',
    color: '#0891b2',
    videoUrl: 'https://drive.google.com/file/d/1V4wP5PSVe93sV7y0jBGpnQ9kktD2JEzV/preview',
  },
];

const stats = [
  { value: '500+',  label: 'Satisfied Clients' },
  { value: '50K+',  label: 'Monthly Leads Generated' },
  { value: '4.8★',  label: 'Average Rating' },
  { value: '10K+',  label: 'Qualified Leads Delivered' },
];

/* ─────────────────────────────────────────
   VIDEO CARD — autoplay iframe on scroll
───────────────────────────────────────── */
const TestimonialCard = ({ t, index }) => {
  const [expanded, setExpanded] = useState(false);

  const maxLen = 160;
  const isLong = t.content.length > maxLen;
  const displayText = isLong && !expanded ? t.content.slice(0, maxLen) + '…' : t.content;
  const isTextPlaceholder = t.textPlaceholder;

  return (
    <div
      className="testimonial-card"
      style={{
        background: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        border: '1px solid #eef0f4',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        animationDelay: `${index * 80}ms`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.11), 0 0 0 2px ${t.color}25`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)';
      }}
    >
      {/* ── VIDEO IFRAME ── */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          background: '#000',
          overflow: 'hidden',
        }}
      >
        <iframe
          src={t.videoUrl}
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          allow="autoplay; fullscreen"
          allowFullScreen
          title={t.name}
        />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 3, background: t.color, zIndex: 2,
        }} />
      </div>

      {/* ── TEXT BODY ── */}
      <div style={{ padding: '20px 22px 22px' }}>
        {/* Stars */}
        <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
          {[...Array(t.rating)].map((_, i) => (
            <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
          ))}
        </div>

        {/* Handle badge */}
        {!isTextPlaceholder && t.handle && (
          <span style={{
            display: 'inline-block', fontSize: 11, fontWeight: 600,
            color: t.color, background: `${t.color}12`,
            padding: '2px 8px', borderRadius: 100,
            marginBottom: 8, fontFamily: "'Montserrat', sans-serif",
          }}>
            {t.handle}
          </span>
        )}

        {/* Headline */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 8 }}>
          <Quote size={15} color={isTextPlaceholder ? '#d1d5db' : t.color}
            style={{ flexShrink: 0, marginTop: 2, opacity: 0.6 }}
          />
          <h3 style={{
            margin: 0, fontSize: 14, fontWeight: 700,
            color: isTextPlaceholder ? '#d1d5db' : '#111827',
            lineHeight: 1.4, fontFamily: "'Montserrat', sans-serif",
            fontStyle: isTextPlaceholder ? 'italic' : 'normal',
          }}>
            {isTextPlaceholder ? 'Testimonial coming soon…' : t.headline}
          </h3>
        </div>

        {/* Content */}
        <p style={{
          margin: '0 0 6px', fontSize: 13,
          color: isTextPlaceholder ? '#d1d5db' : '#6b7280',
          lineHeight: 1.65, fontFamily: "'Montserrat', sans-serif",
          fontStyle: isTextPlaceholder ? 'italic' : 'normal',
        }}>
          {isTextPlaceholder
            ? 'We\'ll be sharing this client\'s story soon. Check back shortly.'
            : displayText}
          {!isTextPlaceholder && isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: 'none', border: 'none', color: t.color,
                cursor: 'pointer', fontSize: 13, fontWeight: 600,
                padding: '0 0 0 4px',
              }}
            >
              {expanded ? ' Show less' : ' Read more'}
            </button>
          )}
        </p>

        {/* Attribution line */}
        {!isTextPlaceholder && (
          <p style={{
            margin: '0 0 14px', fontSize: 12, color: t.color,
            fontWeight: 600, fontFamily: "'Montserrat', sans-serif",
          }}>
            {t.attribution}
          </p>
        )}

        {/* Author row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          paddingTop: 14, borderTop: `1px solid ${t.color}18`,
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: isTextPlaceholder ? '#f3f4f6' : `${t.color}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 800,
            color: isTextPlaceholder ? '#d1d5db' : t.color,
            flexShrink: 0, fontFamily: "'Montserrat', sans-serif",
          }}>
            {t.initial}
          </div>
          <div>
            <p style={{
              margin: 0, fontSize: 13, fontWeight: 700,
              color: isTextPlaceholder ? '#d1d5db' : '#111827',
              fontFamily: "'Montserrat', sans-serif",
            }}>
              {isTextPlaceholder ? '— Coming Soon' : t.name}
            </p>
            <p style={{
              margin: 0, fontSize: 11,
              color: '#d1d5db',
              fontWeight: 500, fontFamily: "'Montserrat', sans-serif",
            }}>
              {isTextPlaceholder ? 'Testimonial will be updated' : t.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
const TestimonialsPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", minHeight: '100vh', background: '#f6f8fc' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .testimonial-card {
          animation: fadeUp 0.5s ease both;
        }
        .hero-bg {
          background: linear-gradient(135deg, #1F2937 0%, #1F2937 55%, #0F766E 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-bg::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .stat-item {
          transition: transform 0.2s ease;
        }
        .stat-item:hover {
          transform: translateY(-4px);
        }
        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #10B981;
          color: #fff;
          padding: 15px 40px;
          border-radius: 100px;
          font-weight: 800;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.3s;
          box-shadow: 0 6px 20px rgba(16,185,129,0.35);
          font-family: 'Montserrat', sans-serif;
        }
        .cta-primary:hover {
          background: #059669;
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(16,185,129,0.45);
        }
        .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #fff;
          padding: 15px 40px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.3s;
          border: 2px solid rgba(255,255,255,0.4);
          font-family: 'Montserrat', sans-serif;
        }
        .cta-secondary:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.7);
          transform: translateY(-3px);
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-bg" style={{ padding: '88px 20px 80px', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(16,185,129,0.2)',
            border: '1px solid rgba(16,185,129,0.5)',
            color: '#34D399',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
            padding: '5px 14px', borderRadius: 100,
            marginBottom: 20, fontFamily: "'Montserrat', sans-serif",
            textTransform: 'uppercase',
          }}>
            Real Clients · Real Results
          </div>
          <h1 style={{
            fontSize: 'clamp(32px, 5.5vw, 58px)',
            fontWeight: 900, margin: '0 0 20px', lineHeight: 1.15,
            letterSpacing: '-0.02em',
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Hear It Directly From<br />
            <span style={{ color: '#34D399' }}>Our Partners</span>
          </h1>
          <p style={{
            fontSize: 17, opacity: 0.88, lineHeight: 1.7,
            maxWidth: 600, margin: '0 auto 36px',
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Hundreds of contractors, franchises, and local pros trust Blitz Digital Media to grow their pipeline. Here's what they have to say.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" className="cta-primary">
              Start Getting Leads <ArrowRight size={16} />
            </a>
            <a href="/bookacall" className="cta-secondary">
              Book a Free Call
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background: '#fff', borderBottom: '1px solid #eef0f4' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-item"
              style={{
                textAlign: 'center', padding: '28px 16px',
                borderRight: i < stats.length - 1 ? '1px solid #eef0f4' : 'none',
              }}
            >
              <p style={{ margin: '0 0 4px', fontSize: 30, fontWeight: 900, color: '#10B981', fontFamily: "'Montserrat', sans-serif" }}>
                {s.value}
              </p>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Montserrat', sans-serif" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS GRID ── */}
      <section style={{ padding: '72px 20px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p style={{
            fontSize: 11, fontWeight: 700, color: '#10B981',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            margin: '0 0 10px', fontFamily: "'Montserrat', sans-serif",
          }}>
            Video + Written Reviews
          </p>
          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 40px)',
            fontWeight: 900, color: '#111827',
            margin: '0 0 14px', letterSpacing: '-0.02em',
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Stories That Speak for Themselves
          </h2>
          <p style={{ fontSize: 15, color: '#6b7280', maxWidth: 520, margin: '0 auto', fontFamily: "'Montserrat', sans-serif", lineHeight: 1.7 }}>
            Watch real clients share their experience and read what they had to say — all in one place.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 28,
        }}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} />
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #1F2937 0%, #1F2937 55%, #0F766E 100%)',
        textAlign: 'center', color: '#fff',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 660, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: 'clamp(26px, 4vw, 42px)',
            fontWeight: 900, margin: '0 0 16px', letterSpacing: '-0.02em',
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Ready to Become Our Next Success Story?
          </h2>
          <p style={{ fontSize: 16, opacity: 0.88, marginBottom: 36, lineHeight: 1.7, fontFamily: "'Montserrat', sans-serif" }}>
            Join hundreds of home service businesses already generating quality leads and growing their revenue with Blitz.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" className="cta-primary">
              Get Started Today <ArrowRight size={16} />
            </a>
            <a href="/bookacall" className="cta-secondary">
              Book a Call
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TestimonialsPage;