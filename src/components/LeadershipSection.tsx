import React from 'react';
import { Mail, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';

export const LeadershipSection: React.FC = () => {
  const anjishnuWhatsappMessage = 
    `*Direct Leadership Inquiry*\n\n` +
    `Hello Anjishnu,\n\n` +
    `I would like to discuss a high-priority engineering project / proposal directly with leadership.`;

  const anjishnuWhatsappUrl = `https://wa.me/919088514885?text=${encodeURIComponent(anjishnuWhatsappMessage)}`;

  const ankitaWhatsappMessage =
    `*Direct AI Leadership Inquiry*\n\n` +
    `Hello Ankita,\n\n` +
    `I would like to discuss an AI architecture / machine learning engineering initiative directly with leadership.`;

  const ankitaWhatsappUrl = `https://wa.me/916295603867?text=${encodeURIComponent(ankitaWhatsappMessage)}`;

  return (
    <section id="leadership-section" className="py-24 bg-[#0B0B0B] px-4 sm:px-6 lg:px-8 relative border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFFFFF] tracking-tight mb-4">
            MEET THE <span className="text-[#C9A96A]">LEADERSHIP</span>
          </h2>
        </div>

        {/* Multi-Card Container: 1 Column on Mobile/Tablet, 2 Columns on XL Screens */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10 max-w-7xl mx-auto">
          {/* Card 1: Founder & Managing Director - Anjishnu Biswas */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-[#C9A96A]/40 transition-all duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Image Column */}
              <div className="sm:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[240px] aspect-[4/5] rounded-xl overflow-hidden border border-[#2A2A2A] shadow-xl shadow-black/60 bg-[#0B0B0B]">
                  <img
                    src="/anjishnu.jpeg"
                    alt="Anjishnu Biswas - Founder & Managing Director"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
              </div>

              {/* Detail Column */}
              <div className="sm:col-span-7 flex flex-col text-left">
                {/* Name */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] tracking-tight mb-1 uppercase">
                  ANJISHNU BISWAS
                </h3>

                {/* Title */}
                <p className="text-sm sm:text-base font-bold text-[#C9A96A] tracking-wide mb-4">
                  Founder & Managing Director
                </p>

                {/* Bio */}
                <p className="text-[#8A8A8A] text-xs sm:text-sm leading-relaxed mb-6">
                  Oversees overall company operations, drives high-level business strategy, and partners directly with enterprise clients to ensure Pulse delivers premium, high-impact SaaS and digital solutions. With a focus on strategic growth, operational authority, and client success, he leads execution across all initiatives to turn ambitious vision into scalable digital dominance.
                </p>

                {/* Contact Links & Actions */}
                <div className="space-y-4 pt-4 border-t border-[#2A2A2A] mt-auto">
                  <div className="flex flex-col gap-2">
                    <a
                      href="mailto:anjishnubiswasgogol@gmail.com"
                      className="inline-flex items-center gap-2 text-xs font-mono text-[#8A8A8A] hover:text-[#FFFFFF] transition-colors break-all"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#C9A96A] shrink-0" />
                      <span>anjishnubiswasgogol@gmail.com</span>
                    </a>

                    <a
                      href="tel:+919088514885"
                      className="inline-flex items-center gap-2 text-xs font-mono text-[#8A8A8A] hover:text-[#FFFFFF] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C9A96A] shrink-0" />
                      <span>+91 90885 14885</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <a
                      href={anjishnuWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg border-2 border-[#C9A96A] text-[#C9A96A] hover:bg-[#C9A96A] hover:text-[#0B0B0B] font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer group"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Direct WhatsApp Inquiry</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Co-founder & AI Engineer - Ankita Das */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-[#C9A96A]/40 transition-all duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Image Column */}
              <div className="sm:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[240px] aspect-[4/5] rounded-xl overflow-hidden border border-[#2A2A2A] shadow-xl shadow-black/60 bg-[#0B0B0B]">
                  <img
                    src="/ankita.png"
                    alt="Ankita Das - Co-founder & AI Engineer"
                    className="w-full h-full object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
              </div>

              {/* Detail Column */}
              <div className="sm:col-span-7 flex flex-col text-left">
                {/* Name */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] tracking-tight mb-1 uppercase">
                  ANKITA DAS
                </h3>

                {/* Title */}
                <p className="text-sm sm:text-base font-bold text-[#C9A96A] tracking-wide mb-4">
                  Co-founder & AI Engineer
                </p>

                {/* Bio */}
                <p className="text-[#8A8A8A] text-xs sm:text-sm leading-relaxed mb-6">
                  Pioneering core AI architecture, optimizing machine learning models for SaaS deployment, and driving internal product innovation from data strategy to execution. Guided by strategic machine intelligence, she partners with clients to transform raw data pipelines into competitive, scalable product dominance.
                </p>

                {/* Contact Links & Actions */}
                <div className="space-y-4 pt-4 border-t border-[#2A2A2A] mt-auto">
                  <div className="flex flex-col gap-2">
                    <a
                      href="mailto:ankitadasofficial771@gmail.com"
                      className="inline-flex items-center gap-2 text-xs font-mono text-[#8A8A8A] hover:text-[#FFFFFF] transition-colors break-all"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#C9A96A] shrink-0" />
                      <span>ankitadasofficial771@gmail.com</span>
                    </a>

                    <a
                      href="tel:+916295603867"
                      className="inline-flex items-center gap-2 text-xs font-mono text-[#8A8A8A] hover:text-[#FFFFFF] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C9A96A] shrink-0" />
                      <span>+91 62956 03867</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <a
                      href={ankitaWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg border-2 border-[#C9A96A] text-[#C9A96A] hover:bg-[#C9A96A] hover:text-[#0B0B0B] font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer group"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Direct WhatsApp Inquiry</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

