import React from 'react';
import { ServiceItem } from '../types';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestProposal: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onRequestProposal,
}) => {
  if (!service) return null;

  return (
    <div
      id="service-modal-overlay"
      className="fixed inset-0 z-50 bg-[#0B0B0B]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="service-modal-card"
        className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-service-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#0B0B0B] text-[#8A8A8A] hover:text-[#FFFFFF] border border-[#222222] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Subtitle */}
        <div className="mb-6 pr-10">
          <span className="text-xs font-mono text-[#C9A96A] uppercase tracking-widest bg-[#C9A96A]/10 px-2.5 py-1 rounded border border-[#C9A96A]/20">
            {service.subtitle}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] mt-3">{service.title}</h2>
        </div>

        {/* Description */}
        <p className="text-sm text-[#8A8A8A] leading-relaxed mb-6">{service.description}</p>

        {/* Features & Deliverables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="p-4 rounded-xl bg-[#0B0B0B] border border-[#222222]">
            <h4 className="text-xs font-mono uppercase text-[#C9A96A] mb-3 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Key Architecture
            </h4>
            <ul className="space-y-2">
              {service.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#8A8A8A]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96A] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0B0B] border border-[#222222]">
            <h4 className="text-xs font-mono uppercase text-[#C9A96A] mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Deliverables
            </h4>
            <ul className="space-y-2">
              {service.deliverables.map((del, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#8A8A8A]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96A] shrink-0 mt-0.5" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Case Study Banner */}
        <div className="p-4 rounded-xl bg-[#0B0B0B] border border-[#C9A96A]/30 mb-6 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-[#8A8A8A] uppercase">
              Client Proven Result: {service.caseStudySnippet.client}
            </div>
            <div className="text-xs text-[#FFFFFF] mt-0.5 font-medium">
              {service.caseStudySnippet.summary}
            </div>
          </div>
          <div className="text-right pl-4">
            <span className="text-sm sm:text-base font-mono font-bold text-[#C9A96A]">
              {service.caseStudySnippet.metric}
            </span>
          </div>
        </div>

        {/* Tech Stack List */}
        <div className="mb-8">
          <div className="text-xs font-mono text-[#8A8A8A] mb-2">Primary Tech Stack:</div>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs font-mono text-[#FFFFFF] bg-[#0B0B0B] px-3 py-1 rounded-md border border-[#2A2A2A]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[#2A2A2A]">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg bg-[#0B0B0B] text-[#8A8A8A] text-xs font-medium hover:text-[#FFFFFF] transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onRequestProposal(service.title);
            }}
            className="px-6 py-2.5 rounded-lg bg-[#C9A96A] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider hover:bg-[#D4B87C] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Request Proposal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
