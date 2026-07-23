import React from 'react';
import { ArrowRight, Sparkles, MessageSquare, Phone, ShieldCheck, Zap, Activity } from 'lucide-react';

interface HeroProps {
  onViewSolutions: () => void;
  onOpenScheduler: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onViewSolutions,
  onOpenScheduler,
  onOpenContact,
}) => {
  return (
    <section
      id="hero-section"
      className="relative min-h-[90vh] bg-[#0B0B0B] pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden"
    >
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C9A96A]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#C9A96A]/3 blur-[100px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a15_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Main Headline */}
          <h1
            id="hero-main-headline"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FFFFFF] tracking-tight leading-[1.1] mb-6"
          >
            Engineering Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#E2C889] to-[#C9A96A]">
              Digital Growth
            </span>
          </h1>

          {/* Subheadline */}
          <p
            id="hero-subheadline"
            className="text-base sm:text-lg text-[#8A8A8A] max-w-2xl font-normal leading-relaxed mb-8"
          >
            Pulse builds enterprise-grade SaaS platforms, native mobile applications,
            and custom growth engines engineered for high performance, conversion, and operational speed.
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            {/* Primary Champagne Gold CTA */}
            <button
              id="hero-primary-cta-btn"
              onClick={onViewSolutions}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C9A96A] text-[#0B0B0B] font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#D4B87C] hover:shadow-[0_0_30px_rgba(201,169,106,0.4)] flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>View Our Solutions</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Direct WhatsApp CTA */}
            <a
              id="hero-whatsapp-btn"
              href="https://wa.me/919088514885?text=Hello!%20I%20would%20like%20to%20enquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#1A1A1A] border border-[#27C93F]/40 text-[#27C93F] font-semibold text-sm transition-all duration-300 hover:border-[#27C93F] hover:bg-[#27C93F]/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-[#27C93F] stroke-none" />
              <span>WhatsApp +91 90885 14885</span>
            </a>

            {/* Direct Call CTA */}
            <a
              id="hero-call-btn"
              href="tel:+919088514885"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-[#FFFFFF] font-semibold text-sm transition-all duration-300 hover:border-[#C9A96A]/60 hover:bg-[#222222] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#C9A96A]" />
              <span>Call +91 90885 14885</span>
            </a>
          </div>

          {/* Metrics summary bar */}
         
        </div>

        {/* Right Column: Interactive Engineering Dashboard Card */}
        <div className="lg:col-span-5 relative">
          <div
            id="hero-[#1A1A1A]-card"
            className="rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] p-6 shadow-2xl relative overflow-hidden group hover:border-[#C9A96A]/40 transition-all duration-500"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2A2A2A]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
                <span className="ml-2 font-mono text-xs text-[#8A8A8A]">pulse-core-v4.2.0</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#27C93F]/10 text-[#27C93F] text-[10px] font-mono border border-[#27C93F]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] animate-ping" />
                LIVE NODE
              </div>
            </div>

            {/* Simulated Architecture Display */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#FFFFFF]">
                    <Zap className="w-4 h-4 text-[#C9A96A]" />
                    <span>Real-Time SaaS Processing</span>
                  </div>
                  <span className="font-mono text-xs text-[#C9A96A]">42ms lat</span>
                </div>
                <div className="w-full bg-[#1A1A1A] h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#C9A96A] to-[#E2C889] h-full w-[88%] rounded-full animate-pulse" />
                </div>
                <div className="flex justify-between items-center mt-2 text-[11px] text-[#8A8A8A] font-mono">
                  <span>14,200 req/sec</span>
                  <span>Auto-scaled Cloud Run</span>
                </div>
              </div>

              {/* Direct Inquiry Contact Badge */}
              <div className="p-4 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#C9A96A]/10 border border-[#C9A96A]/30 flex items-center justify-center text-[#C9A96A]">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#FFFFFF]">Direct Lead Enquiries</div>
                    <div className="text-[11px] font-mono text-[#8A8A8A]">anjishnubiswasgogol@gmail.com</div>
                  </div>
                </div>
                <button
                  onClick={onOpenScheduler}
                  className="px-3 py-1.5 rounded-lg bg-[#C9A96A]/20 hover:bg-[#C9A96A]/30 border border-[#C9A96A]/40 text-[#C9A96A] text-xs font-mono font-medium transition-colors cursor-pointer"
                >
                  Schedule Call
                </button>
              </div>

              {/* Security Badge */}
              <div className="p-3 rounded-lg bg-[#111111] border border-[#222222] flex items-center justify-between text-xs text-[#8A8A8A]">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C9A96A]" />
                  Protected & Instant WhatsApp Sync
                </span>
                <span className="font-mono text-[10px] text-[#27C93F]">+91 90885 14885</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
