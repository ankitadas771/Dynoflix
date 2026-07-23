import React, { useState, useEffect } from 'react';
import { ShieldCheck, Database, Calendar, Menu, X, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onOpenLeadsPortal: () => void;
  onOpenScheduler: () => void;
  leadCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLeadsPortal,
  onOpenScheduler,
  leadCount,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0B0B]/90 backdrop-blur-md border-b border-[#2A2A2A] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        
         <a href="/" id="brand-logo-link" className="flex items-center cursor-pointer">
  <img 
    src="/logo.jpg" 
    alt="Pulse Agency Logo" 
    className="h-10 w-auto object-contain" 
  />
</a>
        

        {/* Desktop Navigation */}
        <nav id="desktop-nav-links" className="hidden md:flex items-center gap-8">
          <button
            id="nav-solutions-btn"
            onClick={() => scrollToSection('bento-grid-section')}
            className="text-sm font-medium text-[#8A8A8A] hover:text-[#FFFFFF] transition-colors cursor-pointer"
          >
            Solutions
          </button>
          <button
            id="nav-tech-btn"
            onClick={() => scrollToSection('tech-marquee-section')}
            className="text-sm font-medium text-[#8A8A8A] hover:text-[#FFFFFF] transition-colors cursor-pointer"
          >
            Tech Stack
          </button>
          <button
            id="nav-contact-btn"
            onClick={() => scrollToSection('lead-contact-section')}
            className="text-sm font-medium text-[#8A8A8A] hover:text-[#FFFFFF] transition-colors cursor-pointer"
          >
            Contact & Enquiries
          </button>
          <a
            href="tel:+919088514885"
            className="text-xs font-mono text-[#C9A96A] hover:text-[#FFFFFF] transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1A1A1A] border border-[#2A2A2A]"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+91 90885 14885</span>
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Database Leads Portal Button */}
          <button
            id="leads-portal-trigger-btn"
            onClick={onOpenLeadsPortal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-xs font-mono text-[#8A8A8A] hover:text-[#FFFFFF] hover:border-[#C9A96A]/50 transition-all cursor-pointer"
            title="View admin portal & database records"
          >
            <Database className="w-3.5 h-3.5 text-[#C9A96A]" />
            <span>Admin Portal</span>
            {leadCount > 0 && (
              <span className="bg-[#C9A96A] text-[#0B0B0B] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {leadCount}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <button
            id="header-leadership-btn"
            onClick={() => scrollToSection('leadership-section')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C9A96A] text-[#0B0B0B] font-semibold text-xs tracking-wide uppercase transition-all duration-300 hover:bg-[#D4B87C] hover:shadow-[0_0_20px_rgba(201,169,106,0.4)] cursor-pointer"
          >
            <span>Meet Leadership</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#8A8A8A] hover:text-[#FFFFFF] focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="md:hidden bg-[#0B0B0B] border-b border-[#2A2A2A] px-4 pt-4 pb-6 space-y-4">
          <button
            id="mobile-nav-solutions"
            onClick={() => scrollToSection('bento-grid-section')}
            className="block w-full text-left py-2 text-base font-medium text-[#FFFFFF] border-b border-[#1A1A1A]"
          >
            Solutions & Services
          </button>
          <button
            id="mobile-nav-tech"
            onClick={() => scrollToSection('tech-marquee-section')}
            className="block w-full text-left py-2 text-base font-medium text-[#8A8A8A] border-b border-[#1A1A1A]"
          >
            Technologies
          </button>
          <button
            id="mobile-nav-contact"
            onClick={() => scrollToSection('lead-contact-section')}
            className="block w-full text-left py-2 text-base font-medium text-[#C9A96A] border-b border-[#1A1A1A]"
          >
            Direct Contact & Enquiries
          </button>

          <a
            href="https://wa.me/919088514885?text=Hello!%20I%20would%20like%20to%20inquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-2 text-sm font-mono text-[#27C93F] border-b border-[#1A1A1A]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp: +91 90885 14885</span>
          </a>

          <a
            href="tel:+919088514885"
            className="flex items-center gap-2 py-2 text-sm font-mono text-[#C9A96A] border-b border-[#1A1A1A]"
          >
            <Phone className="w-4 h-4" />
            <span>Call: +91 90885 14885</span>
          </a>

          <div className="pt-2 flex flex-col gap-3">
            <button
              id="mobile-leadership-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToSection('leadership-section');
              }}
              className="w-full py-3 rounded-lg bg-[#C9A96A] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider text-center"
            >
              Meet Leadership
            </button>
            <button
              id="mobile-leads-portal-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadsPortal();
              }}
              className="w-full py-2.5 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-xs font-mono text-[#8A8A8A] flex items-center justify-center gap-2"
            >
              <Database className="w-4 h-4 text-[#C9A96A]" />
              <span>Admin Portal ({leadCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
