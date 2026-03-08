import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  ArrowLeft,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Star,
  DollarSign,
  Headphones,
} from 'lucide-react';
import { services } from '../data/mockData';
import { serviceDetailsMap } from '../data/serviceDetails';

/* ─── Feature card data ─────────────────────────────────────────── */
const featureCards = [
  {
    Icon: ShieldCheck,
    title: 'Exclusivity',
    body:
      'You gain access to a pool of exclusive leads, untouched by competitors, allowing you to focus on converting high-potential customers into profitable projects.',
  },
  {
    Icon: TrendingUp,
    title: 'ROI-Focused',
    body:
      'Our pre-qualified leads are carefully screened to ensure you connect with genuinely interested customers, maximising your chances of converting leads into successful projects.',
  },
  {
    Icon: DollarSign,
    title: 'Fair Billing',
    body:
      'We believe in charging you only for the leads you receive and convert. Our straightforward pricing ensures complete control over your expenses with no hidden fees.',
  },
  {
    Icon: MapPin,
    title: 'Customisable Location Targeting',
    body:
      'Tailor your lead generation efforts to specific locations. Our customisable targeting feature enables you to focus on areas where there is a high demand for your services.',
  },
  {
    Icon: Headphones,
    title: 'Top-Tier Customer Service',
    body:
      'Exceptional customer service is at the core of everything we do. We are committed to your success and will go the extra mile to ensure a positive experience.',
  },
  {
    Icon: Star,
    title: 'Proven Results',
    body:
      'Our track record speaks for itself. We have helped hundreds of businesses grow through consistent, high-quality lead delivery you can depend on month after month.',
  },
];

/* ─── Animations ─────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeUpView = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

/* ─── Component ──────────────────────────────────────────────────── */
const ServiceDetail = () => {
  const { serviceId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  const service = services.find((s) => s.id === serviceId);
  const details = serviceDetailsMap[serviceId];

  if (!service || !details) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <motion.div {...fadeUp()} className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 px-8 rounded-full transition-all"
          >
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#111827] via-[#1F2937] to-[#065F46] text-white overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#10B981] opacity-10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#0F766E] opacity-10 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <motion.div {...fadeUp(0)}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={16} /> Back Home
            </Link>
          </motion.div>

          {/* Hero text – centred, magazine-style */}
          <div className="max-w-3xl mx-auto text-center">
            <motion.p {...fadeUp(0.1)} className="text-[#34D399] uppercase tracking-widest text-xs font-semibold mb-4">
              Lead Generation
            </motion.p>
            <motion.h1
              {...fadeUp(0.18)}
              className="text-5xl lg:text-6xl font-black leading-tight mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Get Exclusive{' '}
              <span className="text-[#34D399]">{details.fullName}</span> Leads
            </motion.h1>
            <motion.p {...fadeUp(0.26)} className="text-white/80 text-lg lg:text-xl leading-relaxed mb-10">
              {details.shortDescription}
            </motion.p>
            <motion.div {...fadeUp(0.34)} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3.5 px-10 rounded-full transition-all hover:shadow-xl"
              >
                Get Started <ArrowRight size={18} />
              </Link>
              <Link
                to="/bookacall"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/70 text-white font-semibold py-3.5 px-10 rounded-full transition-all"
              >
                Book a Free Call
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────── */}
      <section className="bg-[#ECFDF5] border-b border-[#A7F3D0]">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-3 divide-x divide-[#A7F3D0] text-center">
          {[
            { label: 'Lead Quality', value: details.keyMetrics.leadQuality },
            { label: 'Avg Lead Value', value: details.keyMetrics.avgLeadValue },
            { label: 'Intent Level', value: details.keyMetrics.conversion },
          ].map(({ label, value }, i) => (
            <motion.div key={i} {...fadeUpView(i * 0.1)} className="px-6">
              <p
                className="text-3xl lg:text-4xl font-black text-[#059669] mb-1"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {value}
              </p>
              <p className="text-gray-600 text-sm font-medium">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <motion.div {...fadeUpView()} className="max-w-3xl">
          <h2
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-5"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Learn about how <span className="text-[#10B981]">Blitz</span> can help you generate more{' '}
            <span className="text-[#10B981]">{details.fullName} leads.</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">{details.fullDescription}</p>
        </motion.div>
      </section>

      {/* ── FEATURE CARDS GRID ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-16 lg:pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Why Blitz? hero card – spans 1 col on lg, full width on md */}
          <motion.div
            {...fadeUpView(0.05)}
            className="md:col-span-1 lg:col-span-1 rounded-2xl bg-gradient-to-br from-[#1F2937] to-[#065F46] text-white p-8 flex flex-col justify-between"
          >
            <div>
              <p className="text-[#34D399] text-xs uppercase tracking-widest font-semibold mb-3">Why Blitz?</p>
              <h3
                className="text-3xl font-black mb-4 leading-snug"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Why Choose <span className="text-[#34D399]">Blitz?</span>
              </h3>
              <p className="text-white/75 leading-relaxed text-sm">
                Blitz is a proven leader in the {details.fullName.toLowerCase()} lead generation industry. We provide a
                steady stream of high-quality leads that help you grow your business with confidence.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-8 bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 px-6 rounded-full transition-all self-start text-sm"
            >
              Get Started <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Dynamic feature cards */}
          {featureCards.map(({ Icon, title, body }, i) => (
            <motion.div
              key={i}
              {...fadeUpView(0.07 + i * 0.07)}
              className="rounded-2xl border border-gray-100 bg-white p-7 flex flex-col gap-4 hover:border-[#10B981] hover:shadow-lg transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] flex items-center justify-center group-hover:bg-[#10B981] transition-colors">
                <Icon size={22} className="text-[#10B981] group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-gray-900 font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">{body}</p>
              <span className="text-[#10B981] text-sm font-semibold flex items-center gap-1 cursor-default">
                View More <ArrowRight size={14} />
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── LEAD VOLUME BANNER ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          {...fadeUpView()}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1F2937] to-[#065F46] px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#10B981] opacity-10 blur-[80px] pointer-events-none" />
          <h3
            className="text-2xl lg:text-3xl font-black text-white max-w-sm leading-snug"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Curious how many Leads we have in your Area?
          </h3>
          <Link
            to="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold py-4 px-9 rounded-full transition-all hover:shadow-xl"
          >
            Check Lead Volume in Your Area <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* ── BENEFITS CHECKLIST ────────────────────────────────────────── */}
      <section className="bg-[#F9FAFB] py-16 lg:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            {...fadeUpView()}
            className="text-3xl lg:text-4xl font-black text-gray-900 mb-10"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Why Choose Blitz for{' '}
            <span className="text-[#10B981]">{details.fullName}?</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-4">
            {details.benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                {...fadeUpView(idx * 0.06)}
                className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100 hover:border-[#10B981] hover:shadow-md transition-all"
              >
                <CheckCircle size={22} className="text-[#10B981] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 font-medium text-sm leading-relaxed">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL INTRO ─────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <motion.h2
          {...fadeUpView()}
          className="text-3xl font-black text-[#10B981] mb-4"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Customer Testimonial
        </motion.h2>
        <motion.p {...fadeUpView(0.1)} className="text-gray-600 leading-relaxed">
          At Blitz, your success is our success. Don't just take our word for it — see how we've empowered our partners
          to reach their business goals. With Blitz, you're not just gaining a service provider, but a confident partner
          dedicated to your success.
        </motion.p>
      </section>

      {/* ── CTA FOOTER STRIP ──────────────────────────────────────────── */}
      <motion.section
        {...fadeUpView()}
        className="sticky bottom-0 z-40 bg-gradient-to-r from-[#059669] to-[#0F766E] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl"
      >
        <p className="text-white font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Boost Your Business with Zero Risk
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#059669] font-bold py-3 px-8 rounded-full transition-all text-sm"
        >
          Get Leads Now <ArrowRight size={16} />
        </Link>
      </motion.section>

    </div>
  );
};

export default ServiceDetail;