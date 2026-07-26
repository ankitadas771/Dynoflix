import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { BentoGrid } from './components/BentoGrid';
import { ServiceModal } from './components/ServiceModal';
import { ContactSection } from './components/ContactSection';
import { LeadershipSection } from './components/LeadershipSection';
import { WhatsAppButton } from './components/WhatsAppButton';
import { LeadsAdminModal } from './components/LeadsAdminModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ServiceItem } from './types';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [leadsPortalOpen, setLeadsPortalOpen] = useState(false);
  const [leadCount, setLeadCount] = useState(0);

  // Form pre-population states
  const [contactServiceInterest, setContactServiceInterest] = useState('Custom SaaS & CRM');
  const [contactDetails, setContactDetails] = useState('');

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const fetchLeadCount = async () => {
    try {
      const res = await fetch('/api/leads');
      const json = await res.json();
      if (json.success && json.data) {
        setLeadCount(json.data.length);
      }
    } catch (err) {
      console.error('Failed to fetch lead count:', err);
    }
  };

  useEffect(() => {
    fetchLeadCount();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestProposalForService = (serviceTitle: string) => {
    setContactServiceInterest(serviceTitle);
    scrollToSection('lead-contact-section');
    showToast(`Inquiry topic set to ${serviceTitle}. Complete form below.`, 'success');
  };

  return (
    <>
      <Helmet>
        <title>Dynoflix | Official Site</title>
        <meta name="description" content="Dynoflix delivers high-performance software solutions. We build custom SaaS platforms, scalable CRMs, and modern web apps tailored to your business." />
        <link rel="canonical" href="https://dynoflix.vercel.app/" />
      </Helmet>
    <div className="min-h-screen bg-[#0B0B0B] text-[#FFFFFF] font-sans selection:bg-[#C9A96A] selection:text-[#0B0B0B] relative">
      {/* Toast Banner */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Main Navbar */}
      <Navbar
        onOpenLeadsPortal={() => setLeadsPortalOpen(true)}
        onOpenScheduler={() => scrollToSection('leadership-section')}
        leadCount={leadCount}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onViewSolutions={() => scrollToSection('bento-grid-section')}
          onOpenScheduler={() => scrollToSection('leadership-section')}
          onOpenContact={() => scrollToSection('lead-contact-section')}
        />

        {/* 2. Tech Stack Marquee */}
        <TechMarquee />

        {/* 3. Services Bento Grid */}
        <BentoGrid
          onSelectService={(service) => setSelectedService(service)}
          onRequestProposal={handleRequestProposalForService}
        />

        {/* 4. Lead Capture & Contact Engine */}
        <ContactSection
          initialServiceInterest={contactServiceInterest}
          initialDetails={contactDetails}
          onLeadSubmitted={() => {
            fetchLeadCount();
          }}
          showToast={showToast}
        />

        {/* 5. Meet The Leadership Section */}
        <LeadershipSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenLeadsPortal={() => setLeadsPortalOpen(true)}
        leadCount={leadCount}
      />

      {/* Floating WhatsApp Button (Fixed Bottom-Right) */}
      <WhatsAppButton />

      {/* Bento Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onRequestProposal={handleRequestProposalForService}
      />

      {/* Admin Leads Database Modal */}
      <LeadsAdminModal
        isOpen={leadsPortalOpen}
        onClose={() => setLeadsPortalOpen(false)}
        showToast={showToast}
        onUpdateCount={(newCount) => setLeadCount(newCount)}
      />
    </div>
  
    </>
  );
}
