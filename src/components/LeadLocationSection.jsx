import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usStates } from '../data/mockData';
import { MapPin, MoreVertical } from 'lucide-react';
import CountUp from 'react-countup';
import { ComposableMap, Geographies, Geography, Annotation } from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Fake lead notification data
const leadNotifications = [
  { id: 1, name: 'Justin Thompson',  avatar: 'JT', color: '#90CAF9', isNew: false },
  { id: 2, name: 'Catalina Garetto', avatar: 'CG', color: '#F7941D', isNew: true  },
];

const LeadLocationSection = () => {
  const [selectedState, setSelectedState] = useState('');
  const [hoveredState, setHoveredState] = useState('');
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const stateAbbreviations = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR',
    'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE',
    'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID',
    'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS',
    'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS',
    'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
    'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
    'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK',
    'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
    'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
    'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV',
    'Wisconsin': 'WI', 'Wyoming': 'WY', 'District of Columbia': 'DC',
  };

  const stateCentroids = {
    'Alabama': [-86.9023, 32.8067], 'Alaska': [-152.4044, 61.3707],
    'Arizona': [-111.4312, 34.0489], 'Arkansas': [-92.3731, 34.9697],
    'California': [-119.4179, 36.7783], 'Colorado': [-105.7821, 39.5501],
    'Connecticut': [-72.7554, 41.5978], 'Delaware': [-75.5071, 38.9108],
    'Florida': [-81.5158, 27.6648], 'Georgia': [-83.5007, 32.1656],
    'Hawaii': [-157.5311, 20.7967], 'Idaho': [-114.7420, 44.0682],
    'Illinois': [-89.3985, 40.6331], 'Indiana': [-86.1349, 40.2672],
    'Iowa': [-93.0977, 41.8780], 'Kansas': [-98.4842, 39.0119],
    'Kentucky': [-84.2700, 37.8393], 'Louisiana': [-91.9623, 30.9843],
    'Maine': [-69.4455, 45.2538], 'Maryland': [-76.6413, 39.0458],
    'Massachusetts': [-71.3824, 42.4072], 'Michigan': [-85.6024, 44.3148],
    'Minnesota': [-94.6859, 46.7296], 'Mississippi': [-89.3985, 32.3547],
    'Missouri': [-91.8318, 37.9643], 'Montana': [-110.3626, 46.8797],
    'Nebraska': [-99.9018, 41.4925], 'Nevada': [-116.4194, 38.8026],
    'New Hampshire': [-71.5724, 43.1939], 'New Jersey': [-74.4057, 40.0583],
    'New Mexico': [-105.8701, 34.5199], 'New York': [-75.5268, 43.2994],
    'North Carolina': [-79.0193, 35.7596], 'North Dakota': [-101.0020, 47.5515],
    'Ohio': [-82.9071, 40.4173], 'Oklahoma': [-97.5164, 35.4676],
    'Oregon': [-120.5542, 43.8041], 'Pennsylvania': [-77.1945, 41.2033],
    'Rhode Island': [-71.4774, 41.5801], 'South Carolina': [-81.1637, 33.8361],
    'South Dakota': [-99.9018, 43.9695], 'Tennessee': [-86.5804, 35.5175],
    'Texas': [-99.9018, 31.9686], 'Utah': [-111.0937, 39.3210],
    'Vermont': [-72.5778, 44.5588], 'Virginia': [-78.6569, 37.4316],
    'Washington': [-120.7401, 47.7511], 'West Virginia': [-80.4549, 38.5976],
    'Wisconsin': [-89.6165, 43.7844], 'Wyoming': [-107.2903, 43.0760],
    'District of Columbia': [-77.0369, 38.9072],
  };

  const getStateCode = (stateName) => stateAbbreviations[stateName] || '';

  const handleStateClick = (geo) => setSelectedState(geo.properties.name);

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div className="bg-[#1F2937] rounded-2xl md:rounded-3xl overflow-hidden px-4 md:px-8 lg:px-14 py-8 md:py-14" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>

          {/* Title */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center mb-8 md:mb-12 px-2"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Receive Leads in {selectedState || 'your location'} today!
          </motion.h2>

          {/* Map + Card grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6 md:gap-8 items-center">

            {/* Left — Location Selector + Map */}
            <motion.div className="w-full" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={18} className="text-white flex-shrink-0" />
                <span className="text-white text-xs md:text-sm font-medium">
                  {selectedState || 'Your location'}
                </span>
              </div>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-white/10 backdrop-blur border border-white/30 text-white rounded-lg px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] appearance-none cursor-pointer mb-4 md:mb-6"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'white\'%3e%3cpath d=\'M7 10l5 5 5-5z\'/%3e%3c/svg%3e")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '20px',
                  paddingRight: '32px'
                }}
              >
                <option value="" className="text-gray-900">- Select -</option>
                {usStates.map((state) => (
                  <option key={state} value={state} className="text-gray-900">{state}</option>
                ))}
              </select>

              {/* Map - Updated with better visibility */}
              <div className="relative mb-4 md:mb-6 bg-[#1F2937] rounded-lg overflow-hidden p-4 md:p-8">
                <div className="w-full" style={{ aspectRatio: '5/3' }}>
                  <ComposableMap
                    projection="geoAlbersUsa"
                    projectionConfig={{ 
                      scale: 1300,
                    }}
                    width={800}
                    height={550}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map((geo) => {
                          const stateName = geo.properties.name;
                          const stateCode = getStateCode(stateName);
                          const isSelected = selectedState === stateName;
                          const isHovered = hoveredState === stateName;
                          const centroid = stateCentroids[stateName];
                          return (
                            <g key={geo.rsmKey}>
                              <Geography
                                geography={geo}
                                fill={isSelected ? '#10B981' : isHovered ? '#34D399' : '#059669'}
                                stroke="#047857"
                                strokeWidth={0.8}
                                style={{
                                  default: { outline: 'none' },
                                  hover: { outline: 'none', cursor: 'pointer' },
                                  pressed: { outline: 'none' },
                                }}
                                onMouseEnter={() => setHoveredState(stateName)}
                                onMouseLeave={() => setHoveredState('')}
                                onClick={() => handleStateClick(geo)}
                                className="transition-all duration-200"
                              />
                              {centroid && stateCode && (
                                <Annotation subject={centroid} dx={0} dy={0}>
                                  <text
                                    x={0} y={0}
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    fill="#FFFFFF"
                                    fontSize={11}
                                    fontWeight="700"
                                    style={{ fontFamily: 'Montserrat, sans-serif', pointerEvents: 'none', userSelect: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
                                  >
                                    {stateCode}
                                  </text>
                                </Annotation>
                              )}
                            </g>
                          );
                        })
                      }
                    </Geographies>
                  </ComposableMap>
                </div>
              </div>

              <div className="mt-6 md:mt-8">
                <Link
                  to="/contact"
                  className="inline-block w-full md:w-auto text-center bg-[#10B981] hover:bg-[#059669] text-white font-bold px-8 md:px-10 py-2.5 md:py-3.5 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 text-xs md:text-sm tracking-wider"
                >
                  GET LEADS NOW
                </Link>
              </div>
            </motion.div>

            {/* Right — Pricing Card */}
            <motion.div className="rounded-2xl p-5 md:p-6 shadow-xl" style={{ background: 'linear-gradient(to bottom, #FFFFFF, #F0FDF4)', border: '2px solid #ECFDF5' }} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
              <p className="text-[#1F2937] text-xs font-medium mb-1">Average Lead</p>
              <p className="text-[#10B981] text-xs font-semibold mb-4">Per Client*</p>

              {/* Price Display */}
              <div className="flex items-center justify-center mb-5">
                <div className="relative w-20 md:w-24 h-20 md:h-24">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" className="text-[#10B981]">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#DBEAFE" strokeWidth="5" />
                    <circle
                      cx="50" cy="50" r="40"
                      fill="none" stroke="#10B981" strokeWidth="5"
                      strokeDasharray="200 252" strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-2xl md:text-2xl font-extrabold text-[#10B981]">$75</div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-4">
                <p className="text-[#1F2937] font-semibold text-sm">Mold Removal Leads</p>
              </div>

              {/* Carousel Dots */}
              <div className="flex justify-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>

              <div className="text-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="inline-block bg-[#10B981] hover:bg-[#059669] text-white font-bold px-8 py-2.5 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 text-xs tracking-wider w-full"
                  >
                    GET LEADS NOW
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* ── BOTTOM STATS BAR ── */}
          <motion.div
            ref={statsRef}
            className="mt-6 md:mt-10 rounded-xl md:rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Left — Lead notification cards */}
            <div className="p-4 md:p-6 lg:p-8 flex flex-col justify-center gap-2 md:gap-3 md:border-r border-white/10">
              {leadNotifications.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center gap-2 md:gap-3 bg-white rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 shadow-md relative"
                >
                  {/* Avatar */}
                  <div
                    className="w-8 md:w-9 h-8 md:h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: lead.color }}
                  >
                    {lead.avatar}
                  </div>

                  {/* Name */}
                  <span className="text-gray-800 text-xs md:text-sm font-semibold flex-1 truncate">{lead.name}</span>

                  {/* New badge */}
                  {lead.isNew && (
                    <span
                      className="text-[8px] md:text-[10px] font-bold text-white px-1.5 md:px-2 py-0.5 rounded-full absolute -top-2 left-8 md:left-10 whitespace-nowrap"
                      style={{ background: '#1976D2' }}
                    >
                      +1 New
                    </span>
                  )}

                  {/* Three dots */}
                  <MoreVertical size={14} className="text-gray-400 flex-shrink-0 md:block hidden" />
                </div>
              ))}
            </div>

            {/* Right — 3 stats */}
            <div className="p-4 md:p-6 lg:p-8 grid grid-cols-3 gap-2 md:gap-4 items-center">
              {[
                {
                  value: 8.5,
                  suffix: 'x',
                  label: 'Average Return On Investment',
                  decimals: 1,
                },
                {
                  value: 10,
                  suffix: '',
                  label: 'Average Leads per Month',
                  decimals: 0,
                },
                {
                  value: 60,
                  suffix: '%',
                  label: 'Average conversion rate',
                  decimals: 0,
                },
              ].map((stat, i) => (
                <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}>
                  <div className="text-white font-extrabold leading-none mb-1 md:mb-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                    {statsVisible ? (
                      <CountUp
                        end={stat.value}
                        duration={2}
                        decimals={stat.decimals}
                        suffix={stat.suffix}
                      />
                    ) : (
                      `0${stat.suffix}`
                    )}
                  </div>
                  <p className="text-blue-200 text-[10px] md:text-xs leading-snug" style={{ opacity: 0.85 }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footnote */}
          <p className="text-blue-200 text-[10px] md:text-xs text-center mt-3 md:mt-4 px-2" style={{ opacity: 0.65 }}>
            * More competitive areas of the country command higher lead prices
          </p>

        </motion.div>
      </div>
    </section>
  );
};

export default LeadLocationSection;