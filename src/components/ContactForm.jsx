import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, ChevronDown, Check, Monitor, UserCheck, User, Clock } from 'lucide-react';

// Inject Leaflet CSS + JS once
const ensureLeaflet = () =>
  new Promise((resolve) => {
    if (window.L) return resolve(window.L);
    if (!document.getElementById('leaflet-css')) {
      const css = document.createElement('link');
      css.id = 'leaflet-css';
      css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(css);
    }
    if (!document.getElementById('leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => resolve(window.L);
      document.head.appendChild(script);
    } else {
      // Script tag already added but may still be loading
      const check = setInterval(() => {
        if (window.L) { clearInterval(check); resolve(window.L); }
      }, 50);
    }
  });

const LeafletMap = () => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    ensureLeaflet().then((L) => {
      if (!mounted || !mapContainerRef.current || mapInstanceRef.current) return;
      const map = L.map(mapContainerRef.current, {
        center: [38.9, -77.0],
        zoom: 9,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
        touchZoom: false,
        keyboard: false,
        attributionControl: false,
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
        opacity: 1,
      }).addTo(map);

      // Add scattered orange pins across the US
      const pins = [
        [38.9, -77.0], [40.7, -74.0], [34.05, -118.24], [41.85, -87.65],
        [29.76, -95.37], [33.45, -112.07], [39.95, -75.17], [32.78, -96.8],
        [37.33, -121.89], [39.74, -104.98], [30.33, -81.66], [35.23, -80.84],
        [43.05, -76.15], [42.36, -71.06], [44.98, -93.27], [36.17, -86.78],
        [45.52, -122.68], [47.61, -122.33], [25.77, -80.19], [36.17, -115.14],
      ];
      const orangeIcon = L.divIcon({
        className: '',
        html: `<div style="width:10px;height:10px;border-radius:50%;background:#10B981;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5],
      });
      pins.forEach(([lat, lng]) => L.marker([lat, lng], { icon: orangeIcon }).addTo(map));
      mapInstanceRef.current = map;
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
};

const usStates = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
  'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
  'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming'
];

const services = [
  { id: 1, name: 'Appliance Repair' },
  { id: 2, name: 'Asbestos Removal' },
  { id: 3, name: 'Asbestos Testing' },
  { id: 4, name: 'Bathroom Remodel' },
  { id: 5, name: 'Biohazard' },
  { id: 6, name: 'Cabinets' },
  { id: 7, name: 'Chimney' },
  { id: 8, name: 'Concrete' },
  { id: 9, name: 'Deck & Patio' },
  { id: 10, name: 'Drain Cleaning' },
  { id: 11, name: 'Drywall' },
  { id: 12, name: 'Electrical' },
  { id: 13, name: 'Fencing' },
  { id: 14, name: 'Flooring' },
  { id: 15, name: 'Foundation Repair' },
  { id: 16, name: 'Garage Door' },
  { id: 17, name: 'HVAC' },
  { id: 18, name: 'Insulation' },
  { id: 19, name: 'Kitchen Remodel' },
  { id: 20, name: 'Landscaping' },
  { id: 21, name: 'Mold Removal' },
  { id: 22, name: 'Painting' },
  { id: 23, name: 'Pest Control' },
  { id: 24, name: 'Plumbing' },
  { id: 25, name: 'Roofing' },
  { id: 26, name: 'Siding' },
  { id: 27, name: 'Solar' },
  { id: 28, name: 'Tree Service' },
  { id: 29, name: 'Water Damage' },
  { id: 30, name: 'Window Replacement' },
];

const MultiSelectDropdown = ({ selectedServices, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const displayText = selectedServices.length === 0
    ? 'Select Services'
    : selectedServices.length === 1
    ? selectedServices[0]
    : `${selectedServices.length} services selected`;

  return (
    <div ref={dropdownRef} style={{ position: 'relative', width: '100%' }}>
      {/* Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          padding: '12px 40px 12px 16px',
          fontSize: '14px',
          color: selectedServices.length === 0 ? '#9ca3af' : '#111827',
          background: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: isOpen ? '0 0 0 2px #f97316' : 'none',
          outline: 'none',
          userSelect: 'none',
        }}
      >
        <span>{displayText}</span>
        <ChevronDown
          size={18}
          style={{
            color: '#6b7280',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          zIndex: 1000,
          overflow: 'hidden',
        }}>
          {/* Search */}
          <div style={{ padding: '8px', borderBottom: '1px solid #f3f4f6' }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search services..."
              style={{
                width: '100%',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onClick={e => e.stopPropagation()}
            />
          </div>

          {/* Options list */}
          <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
            {filtered.map(service => {
              const isChecked = selectedServices.includes(service.name);
              return (
                <div
                  key={service.id}
                  onClick={() => onToggle(service.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 16px',
                    cursor: 'pointer',
                    background: isChecked ? '#fff7ed' : '#fff',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => {
                    if (!isChecked) e.currentTarget.style.background = '#f9fafb';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = isChecked ? '#fff7ed' : '#fff';
                  }}
                >
                  <div style={{
                    width: '18px',
                    height: '18px',
                    border: isChecked ? '2px solid #f97316' : '2px solid #d1d5db',
                    borderRadius: '4px',
                    background: isChecked ? '#f97316' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.15s',
                  }}>
                    {isChecked && <Check size={12} color="#fff" strokeWidth={3} />}
                  </div>
                  <span style={{
                    fontSize: '14px',
                    color: '#374151',
                    fontWeight: isChecked ? '500' : '400',
                  }}>
                    {service.name}
                  </span>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ padding: '16px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
                No services found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ContactForm = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    email: '',
    numberOfEmployees: '',
  });
  const [consentAgreed, setConsentAgreed] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleService = (id) => {
    const serviceName = services.find(s => s.id === id)?.name;
    if (!serviceName) return;
    
    setSelectedServices(prev =>
      prev.includes(serviceName) 
        ? prev.filter(s => s !== serviceName) 
        : [...prev, serviceName]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.email) {
      alert('Please enter your email address');
      return;
    }

    if (!formData.companyName || !formData.city || !formData.state || !formData.phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }

    if (!consentAgreed) {
      alert('Please agree to the terms before submitting');
      return;
    }

    try {
      // Build payload - don't include empty optional fields
      const payload = {
        selectedServices: selectedServices.length > 0 ? selectedServices : [],
        companyName: formData.companyName.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        zipCode: formData.zipCode.trim(),
        phoneNumber: formData.phoneNumber.trim() || "",
        email: formData.email.trim(),
        numberOfEmployees: formData.numberOfEmployees.trim() || "",
        consentAgreed: consentAgreed,
      };

      console.log('Sending payload:', payload);

      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      console.log('Response:', data);

      if (response.ok && data.success) {
        alert('Thank you! Your inquiry has been received. We will contact you soon.');
        // Reset form
        setFormData({
          companyName: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          phoneNumber: '',
          email: '',
          numberOfEmployees: '',
        });
        setSelectedServices([]);
        setConsentAgreed(false);
      } else {
        alert(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  // Progress: count filled required fields
  const totalSteps = 7;
  const filled = [
    selectedServices.length > 0,
    formData.companyName,
    formData.address,
    formData.city,
    formData.state,
    formData.phoneNumber,
    formData.email,
  ].filter(Boolean).length;
  const progress = Math.max(15, (filled / totalSteps) * 100);

  const inputStyle = {
    width: '100%',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#111827',
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'box-shadow 0.2s, border-color 0.2s',
  };

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '500',
    color: '#374151',
    display: 'block',
    marginBottom: '6px',
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    cursor: 'pointer',
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236b7280'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '20px',
    paddingRight: '40px',
  };

  return (
    <div style={{ fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* ── Responsive CSS injected once ── */}
      <style>{`
        .cf-hero-content { padding: 60px 20px 0; }
        .cf-form-card { max-width: 680px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.12); overflow: hidden; }
        .cf-card-pad { padding: 24px 28px 20px; }
        .cf-card-pad-inner { padding: 0 28px 28px; }
        .cf-progress-pad { padding: 0 28px 20px; }
        .cf-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .cf-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .cf-cta-bar { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #f3f4f6; padding-top: 20px; gap: 16px; }
        .cf-next-btn { background: #f97316; color: #fff; border: none; border-radius: 100px; padding: 12px 36px; font-size: 15px; font-weight: 700; cursor: pointer; letter-spacing: 0.5px; transition: background 0.2s, transform 0.1s; white-space: nowrap; }
        .cf-next-btn:hover { background: #ea6c10; transform: scale(1.03); }
        .cf-prospects-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .cf-steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }

        @media (max-width: 640px) {
          .cf-hero-content { padding: 40px 16px 0; }
          .cf-form-card { border-radius: 10px; margin: 0 4px; }
          .cf-card-pad { padding: 18px 16px 14px; }
          .cf-card-pad-inner { padding: 0 16px 20px; }
          .cf-progress-pad { padding: 0 16px 16px; }
          .cf-row-2 { grid-template-columns: 1fr; gap: 12px; }
          .cf-row-3 { grid-template-columns: 1fr; gap: 12px; margin-bottom: 20px; }
          .cf-cta-bar { flex-direction: column; align-items: stretch; text-align: center; }
          .cf-next-btn { width: 100%; padding: 14px 36px; font-size: 16px; }
          .cf-prospects-grid { grid-template-columns: 1fr; gap: 32px; }
          .cf-steps-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
        }

        @media (min-width: 641px) and (max-width: 900px) {
          .cf-row-3 { grid-template-columns: 1fr 1fr; }
          .cf-row-3 > :last-child { grid-column: 1 / -1; }
          .cf-prospects-grid { grid-template-columns: 1fr; gap: 36px; }
          .cf-steps-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; }
        }
      `}</style>

      {/* ──────────────── HERO + MAP SECTION ──────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', background: '#e8f4fb' }}>
        {/* Real Leaflet map filling the entire background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <LeafletMap />
        </div>

        {/* Light gradient overlay so text is readable */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(232,244,251,0.55) 0%, rgba(232,244,251,0.70) 35%, rgba(232,244,251,0.92) 58%, rgba(232,244,251,1) 75%)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div className="cf-hero-content" style={{ position: 'relative', zIndex: 2 }}>
          {/* Hero text */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontSize: 'clamp(24px, 5vw, 52px)',
              fontWeight: '900',
              color: '#10B981',
              lineHeight: 1.15,
              margin: '0 auto 16px',
              maxWidth: '700px',
            }}>
              We have leads going unanswered<br />
              today near your location
            </h1>
            <p style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: '#374151', marginBottom: '4px' }}>
              Become part of our network and start
            </p>
            <p style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: '#374151' }}>
              growing your revenue now!
            </p>
          </div>

          {/* Form Card */}
          <div className="cf-form-card">
            {/* Services selector */}
            <div className="cf-card-pad">
              <label style={{ fontSize: '14px', fontWeight: '600', color: '#111827', display: 'block', marginBottom: '10px' }}>
                Select the leads you are interested in: <span style={{ color: '#f97316' }}>*</span>
              </label>
              <MultiSelectDropdown
                selectedServices={selectedServices}
                onToggle={toggleService}
              />
            </div>

            {/* Progress bar */}
            <div className="cf-progress-pad">
              <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #f97316, #ea6c10)',
                  borderRadius: '100px',
                  transition: 'width 0.4s ease',
                }} />
              </div>
            </div>

            {/* Company Profile */}
            <div className="cf-card-pad-inner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{
                  width: '26px', height: '26px', borderRadius: '50%',
                  background: '#10B981', color: '#fff', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: '700', flexShrink: 0,
                }}>1</div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>
                  Company Profile
                </h3>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Company + Address row */}
                <div className="cf-row-2">
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input
                      type="text" name="companyName" value={formData.companyName}
                      onChange={handleInputChange} placeholder="Insert your company name"
                      style={inputStyle}
                      onFocus={e => e.target.style.boxShadow = '0 0 0 2px rgba(249,115,22,0.3)'}
                      onBlur={e => e.target.style.boxShadow = 'none'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Address</label>
                    <input
                      type="text" name="address" value={formData.address}
                      onChange={handleInputChange} placeholder="Address"
                      style={inputStyle}
                      onFocus={e => e.target.style.boxShadow = '0 0 0 2px rgba(249,115,22,0.3)'}
                      onBlur={e => e.target.style.boxShadow = 'none'}
                    />
                  </div>
                </div>

                {/* City / State / ZIP row */}
                <div className="cf-row-3">
                  <div>
                    <label style={labelStyle}>City <span style={{ color: '#f97316' }}>*</span></label>
                    <input
                      type="text" name="city" value={formData.city}
                      onChange={handleInputChange} placeholder="City"
                      style={inputStyle}
                      onFocus={e => e.target.style.boxShadow = '0 0 0 2px rgba(249,115,22,0.3)'}
                      onBlur={e => e.target.style.boxShadow = 'none'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>State <span style={{ color: '#f97316' }}>*</span></label>
                    <select
                      name="state" value={formData.state} onChange={handleInputChange}
                      style={selectStyle}
                      onFocus={e => e.target.style.boxShadow = '0 0 0 2px rgba(249,115,22,0.3)'}
                      onBlur={e => e.target.style.boxShadow = 'none'}
                    >
                      <option value="">-- Select --</option>
                      {usStates.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>ZIP <span style={{ color: '#f97316' }}>*</span></label>
                    <input
                      type="text" name="zipCode" value={formData.zipCode}
                      onChange={handleInputChange} placeholder="ZIP"
                      style={inputStyle}
                      onFocus={e => e.target.style.boxShadow = '0 0 0 2px rgba(249,115,22,0.3)'}
                      onBlur={e => e.target.style.boxShadow = 'none'}
                    />
                  </div>
                </div>

                {/* Phone + Email row */}
                <div className="cf-row-2">
                  <div>
                    <label style={labelStyle}>Phone Number <span style={{ color: '#f97316' }}>*</span></label>
                    <input
                      type="tel" name="phoneNumber" value={formData.phoneNumber}
                      onChange={handleInputChange} placeholder="(555) 000-0000"
                      style={inputStyle}
                      required
                      onFocus={e => e.target.style.boxShadow = '0 0 0 2px rgba(249,115,22,0.3)'}
                      onBlur={e => e.target.style.boxShadow = 'none'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email <span style={{ color: '#f97316' }}>*</span></label>
                    <input
                      type="email" name="email" value={formData.email}
                      onChange={handleInputChange} placeholder="your@email.com"
                      style={inputStyle}
                      required
                      onFocus={e => e.target.style.boxShadow = '0 0 0 2px rgba(249,115,22,0.3)'}
                      onBlur={e => e.target.style.boxShadow = 'none'}
                    />
                  </div>
                </div>

                {/* Number of Employees field */}
                <div>
                  <label style={labelStyle}>How many people work at your company?</label>
                  <input
                    type="text" name="numberOfEmployees" value={formData.numberOfEmployees}
                    onChange={handleInputChange} placeholder="e.g. 5-10"
                    style={inputStyle}
                    onFocus={e => e.target.style.boxShadow = '0 0 0 2px rgba(249,115,22,0.3)'}
                    onBlur={e => e.target.style.boxShadow = 'none'}
                  />
                </div>

                {/* Consent Checkbox */}
                <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    color: '#374151',
                    lineHeight: '1.5',
                  }}>
                    <input
                      type="checkbox"
                      checked={consentAgreed}
                      onChange={(e) => setConsentAgreed(e.target.checked)}
                      style={{
                        marginTop: '2px',
                        cursor: 'pointer',
                        width: '18px',
                        height: '18px',
                      }}
                    />
                    <span>
                      You agree to receive automated promotional messages. You also agree to the Terms of Service and Privacy Policy.
                        This agreement isn't a condition of any purchase. 4 Msgs/Month.  Msg &amp; Data rates may apply. Reply STOP to end or HELP for help.
                    </span>
                  </label>
                </div>

                {/* Bottom CTA bar */}
                <div className="cf-cta-bar">
                  <div>
                    <p style={{ fontSize: '13px', color: '#374151', fontWeight: '600', margin: '0 0 4px' }}>
                      Call our Advertising Specialists
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Phone size={15} color="#f97316" />
                      <a href="tel: 6464940813" style={{ color: '#f97316', fontWeight: '700', fontSize: '15px', textDecoration: 'none' }}>
                        (646) 494-0813
                      </a>
                    </div>
                  </div>
                  <button type="submit" className="cf-next-btn">NEXT</button>
                </div>
              </form>
            </div>
          </div>

          {/* Disclaimer */}
          <p style={{
            maxWidth: '680px', margin: '16px auto 0',
            fontSize: '11px', color: '#9ca3af', textAlign: 'center',
            lineHeight: 1.6, padding: '0 16px',
          }}>
            By clicking "Send Request", I am providing my electronic signature expressly authorizing Blitz
            to contact me by email, phone or text (including an automatic dialing system or artificial/pre-recorded
            voice) at the phone number above. I understand I am not required to sign/agree to this as a condition
            of purchase.
          </p>

          <div style={{ height: '60px' }} />
        </div>
      </section>

      {/* ──────────────── WE FIND PROSPECTS SECTION ──────────────── */}
      <section style={{ padding: 'clamp(48px,7vw,80px) 20px', background: '#fff' }}>
        <div className="cf-prospects-grid">
          <div>
            <h2 style={{
              fontSize: 'clamp(26px, 4vw, 44px)',
              fontWeight: '900',
              color: '#f97316',
              lineHeight: 1.15,
              margin: 0,
            }}>
              We find prospects<br />
              looking for help in<br />
              your local area
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              'Our lead-generation services connect you with the core of your business: homeowners and business property managers eagerly looking for the exact solutions you provide.',
              'Our marketing service is simple: our leads are exclusive inquiries from zip-code or state-level targeting, delivered real-time straight to you and only you. Our internet prospects are actively looking for a solution and want answers now.',
              'You offer a solution for these prospects. Become part of our network today and start experiencing the growth and profitability you deserve.',
            ].map((text, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  border: '2px solid #10B981', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: '2px',
                }}>
                  <Check size={13} color="#10B981" strokeWidth={3} />
                </div>
                <p style={{ margin: 0, fontSize: '15px', color: '#374151', lineHeight: 1.65 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── 4-STEP PROCESS SECTION ──────────────── */}
      <section style={{ padding: 'clamp(40px,6vw,60px) 20px clamp(48px,7vw,80px)', background: '#f3f4f6' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="cf-steps-grid">
            {[
              {
                icon: <Monitor size={36} color="#10B981" />,
                title: 'Complete the Service Form',
                desc: 'Enter your contact information and describe your business needs. We just need some basic information to put you in touch with the appropriate contact.',
              },
              {
                icon: <UserCheck size={36} color="#10B981" />,
                title: 'Wait for your Qualification',
                desc: 'Shortly after, our lead generation experts will contact you to discuss your company goals and how we can help you reach them.',
              },
              {
                icon: <User size={36} color="#10B981" />,
                title: 'Onboarding',
                desc: 'We will set up your personalized account according to your specifications, goals, locations, and budget.',
              },
              {
                icon: <Clock size={36} color="#10B981" />,
                title: 'Receive your first Lead',
                desc: 'You are now eligible to receive leads! Our system will route the lead to you as soon as a user requests service in your territory.',
              },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>{step.icon}</div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111827' }}>{step.title}</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#6b7280', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ marginTop: '36px', fontSize: '13px', color: '#9ca3af', lineHeight: 1.65 }}>
            * You will also have an onboarding meeting with your account manager who will help you get started and explain everything you need to know.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;