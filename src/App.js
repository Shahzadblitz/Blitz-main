import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import HeroSection from "./components/HeroSection"; // Commented out - using new hero section
import NewHeroSection from "./components/NewHeroSection";
import HowItWorks from "./components/HowItWorks";
import ServicesSection from "./components/ServicesSection";
import LeadLocationSection from "./components/LeadLocationSection";
import GuaranteeSection from "./components/GuaranteeSection";
import GrowingBusiness from "./components/GrowingBusiness";
import Testimonials from "./components/Testimonials";
import TestimonialsPage from "./components/TestimonialsPage";
import ContactForm from "./components/ContactForm";
import BookACall from "./components/BookACall";
import PayPerAppointmentComparison from "./components/PayPerAppointmentComparison";
import PromotionalModal from "./components/PromotionalModal";
import FaqPage from "./components/FaqPage";
import ServiceDetail from "./components/ServiceDetail";
import Footer from "./components/Footer";

function App() {
  // Load Calendly widget script globally when app initializes
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <NewHeroSection />
              <LeadLocationSection />
              <HowItWorks />
              <PayPerAppointmentComparison />
              <ServicesSection />
              <GuaranteeSection />
              <GrowingBusiness />
              <Testimonials />
              <PromotionalModal />
              <Footer />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div className="App">
              <ContactForm />
              <Footer />
            </div>
          }
        />
        <Route
          path="/testimonials"
          element={
            <div className="App">
              <TestimonialsPage />
              <Footer />
            </div>
          }
        />
        <Route
          path="/bookacall"
          element={
            <div className="App">
              <BookACall />
              <Footer />
            </div>
          }
        />
        <Route
          path="/faq"
          element={
            <div className="App">
              <FaqPage />
              <Footer />
            </div>
          }
        />
        <Route
          path="/service/:serviceId"
          element={
            <div className="App">
              <ServiceDetail />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
