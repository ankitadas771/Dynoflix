import React from 'react';
import { Database, ShieldCheck, ArrowUpRight, Phone, Mail, MessageSquare } from 'lucide-react';

interface FooterProps {
  onOpenLeadsPortal: () => void;
  leadCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLeadsPortal,
  leadCount,
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#0B0B0B] border-t border-[#1A1A1A] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1A1A1A]">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#C9A96A] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#C9A96A]" />
            </div>
            <span className="font-bold text-xl tracking-wider text-[#FFFFFF]">Dynoflix</span>
          </div>
          <p className="text-xs text-[#8A8A8A] max-w-sm leading-relaxed">
            Engineering-driven digital agency & SaaS development studio specializing in enterprise software, multi-tenant architectures, native apps, and growth engines.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenLeadsPortal}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-xs font-mono text-[#C9A96A] hover:border-[#C9A96A] transition-colors cursor-pointer"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Admin Database Portal ({leadCount} Records)</span>
            </button>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-mono uppercase text-[#FFFFFF] font-bold">Core Capabilities</h4>
          <ul className="space-y-2 text-xs text-[#8A8A8A]">
            <li>
              <button onClick={() => scrollToSection('bento-grid-section')} className="hover:text-[#FFFFFF] transition-colors cursor-pointer">
                Custom SaaS & CRM
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('bento-grid-section')} className="hover:text-[#FFFFFF] transition-colors cursor-pointer">
                Custom Software Development
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('bento-grid-section')} className="hover:text-[#FFFFFF] transition-colors cursor-pointer">
                Native Mobile Applications
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('bento-grid-section')} className="hover:text-[#FFFFFF] transition-colors cursor-pointer">
                Premium UI/UX Design
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('bento-grid-section')} className="hover:text-[#FFFFFF] transition-colors cursor-pointer">
                Growth Engineering (SEO)
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('bento-grid-section')} className="hover:text-[#FFFFFF] transition-colors cursor-pointer">
                Performance & Brand Marketing
              </button>
            </li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-mono uppercase text-[#FFFFFF] font-bold">Direct Channels</h4>
          <p className="text-xs text-[#8A8A8A]">
            For all project inquiries, technical consultations, or proposal requests:
          </p>
          <div className="flex flex-col gap-2.5 pt-1 text-xs">
            <a
              href="https://wa.me/919088514885?text=Hello!%20I%20would%20like%20to%20enquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#27C93F] font-mono hover:underline"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-[#27C93F] stroke-none" />
              <span>WhatsApp: +91 74397 35126</span>
            </a>

            <a
              href="tel:+917439735126"
              className="flex items-center gap-2 text-[#C9A96A] font-mono hover:underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Calls: +91 74397 35126</span>
            </a>

            <a
              href="mailto:dynoflix.official@gmail.com"
              className="flex items-center gap-2 text-[#FFFFFF] hover:text-[#C9A96A] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#C9A96A]" />
              <span>dynoflix.official@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8A8A8A] gap-4">
        <div>© {new Date().getFullYear()} Dynoflix Digital Agency Inc. All rights reserved.</div>
        <div className="flex items-center gap-4 font-mono text-[10px]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96A]" />
            SOC2 Type II Certified
          </span>
          <span>•</span>
          
        </div>
      </div>
    </footer>
  );
};
