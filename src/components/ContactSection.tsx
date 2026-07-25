import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, ShieldCheck, Mail, Phone, MessageSquare, Sparkles, Database } from 'lucide-react';

interface ContactSectionProps {
  initialServiceInterest?: string;
  initialDetails?: string;
  onLeadSubmitted: () => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialServiceInterest = '',
  initialDetails = '',
  onLeadSubmitted,
  showToast,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState(initialDetails);
  const [serviceInterest, setServiceInterest] = useState(initialServiceInterest || 'Custom SaaS & CRM');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<{
    name: string;
    email: string;
    company: string;
    phone: string;
    serviceInterest: string;
    details: string;
  } | null>(null);

  useEffect(() => {
    if (initialDetails) setDetails(initialDetails);
    if (initialServiceInterest) setServiceInterest(initialServiceInterest);
  }, [initialDetails, initialServiceInterest]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !details.trim()) {
      showToast('Please fill out all required fields (Name, Email, Project Details).', 'error');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || 'N/A',
      phone: phone.trim() || 'N/A',
      details: details.trim(),
      serviceInterest,
    };

    // Construct formatted text message containing all inputs with clean line breaks
    const formattedMessage =
      `*New Direct Proposal Request*\n\n` +
      `*Service Interest:* ${payload.serviceInterest}\n` +
      `*Name:* ${payload.name}\n` +
      `*Email:* ${payload.email}\n` +
      `*Company:* ${payload.company}\n` +
      `*Phone:* ${payload.phone}\n\n` +
      `*Project Details & Scope:*\n${payload.details}`;

    const whatsappUrl = `https://wa.me/917439735126?text=${encodeURIComponent(formattedMessage)}`;

    try {
      // Save lead submission to Admin Portal local database
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setLastSubmittedData(payload);
      setSubmittedSuccess(true);
      showToast('Proposal captured! Redirecting to WhatsApp...', 'success');
      onLeadSubmitted();

      // Redirect user directly to WhatsApp
      window.open(whatsappUrl, '_blank') || (window.location.href = whatsappUrl);
    } catch (err) {
      console.error('Error saving lead to database:', err);
      setLastSubmittedData(payload);
      setSubmittedSuccess(true);
      // Even if database save encounters a network issue, still fulfill the WhatsApp redirect
      window.open(whatsappUrl, '_blank') || (window.location.href = whatsappUrl);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppUrl = () => {
    if (!lastSubmittedData) return 'https://wa.me/917439735126';
    const text =
      `*New Direct Proposal Request*\n\n` +
      `*Service Interest:* ${lastSubmittedData.serviceInterest}\n` +
      `*Name:* ${lastSubmittedData.name}\n` +
      `*Email:* ${lastSubmittedData.email}\n` +
      `*Company:* ${lastSubmittedData.company || 'N/A'}\n` +
      `*Phone:* ${lastSubmittedData.phone || 'N/A'}\n\n` +
      `*Project Details & Scope:*\n${lastSubmittedData.details}`;
    return `https://wa.me/917439735126?text=${encodeURIComponent(text)}`;
  };

  const generateEmailMailtoUrl = () => {
    if (!lastSubmittedData) return 'mailto:anjishnubiswasgogol@gmail.com';
    const subject = `New Lead Enquiry: ${lastSubmittedData.serviceInterest} - ${lastSubmittedData.name}`;
    const body = `Hello Dynoflix Agency,\n\nHere are the enquiry details:\n\n` +
      `Name: ${lastSubmittedData.name}\n` +
      `Email: ${lastSubmittedData.email}\n` +
      `Company: ${lastSubmittedData.company || 'N/A'}\n` +
      `Phone: ${lastSubmittedData.phone || 'N/A'}\n` +
      `Service Interest: ${lastSubmittedData.serviceInterest}\n` +
      `Details:\n${lastSubmittedData.details}\n\n` +
      `Sent via Dynoflix Digital Agency Web Portal.`;
    return `mailto:dynoflix.official@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="lead-contact-section" className="py-24 bg-[#0B0B0B] px-4 sm:px-6 lg:px-8 relative border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Information & Direct Contact Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFFFFF] tracking-tight mb-6">
                Let's Build Something <br />
                <span className="text-[#C9A96A]">Extraordinary</span>
              </h2>
              <p className="text-base text-[#8A8A8A] leading-relaxed mb-8">
                Share your project requirements, timeline, and scope. All enquiries are delivered directly to <span className="text-[#FFFFFF] font-semibold">dynoflix.official@gmail.com</span> and sent to WhatsApp / Calls at <span className="text-[#C9A96A] font-mono font-semibold">+91 74397 35126</span>.
              </p>

              {/* Direct Contacts Info */}
              <div className="space-y-4 mb-8">
                {/* Direct Email Card */}
                <a
                  href="mailto:dynoflix.official@gmail.com"
                  className="flex items-center gap-3 p-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#C9A96A]/60 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0B0B0B] border border-[#222222] flex items-center justify-center text-[#C9A96A] group-hover:border-[#C9A96A]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#8A8A8A] uppercase">Direct Email Recipient</div>
                    <div className="text-sm font-semibold text-[#FFFFFF] group-hover:text-[#C9A96A] transition-colors">
                      dynoflix.official@gmail.com
                    </div>
                  </div>
                </a>

                {/* Direct Phone Call Card */}
                <a
                  href="tel:+919088514885"
                  className="flex items-center gap-3 p-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#C9A96A]/60 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0B0B0B] border border-[#222222] flex items-center justify-center text-[#C9A96A] group-hover:border-[#C9A96A]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#8A8A8A] uppercase">Direct Call Number</div>
                    <div className="text-sm font-semibold text-[#FFFFFF] group-hover:text-[#C9A96A] transition-colors font-mono">
                      +91 74397 35126
                    </div>
                  </div>
                </a>

                {/* Direct WhatsApp Card */}
                <a
                  href="https://wa.me/917439735126?text=Hello!%20I%20would%20like%20to%20send%20an%20enquiry%20regarding%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-[#1A1A1A] border border-[#27C93F]/30 hover:border-[#27C93F] transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0B0B0B] border border-[#222222] flex items-center justify-center text-[#27C93F]">
                    <MessageSquare className="w-5 h-5 fill-[#27C93F] stroke-none" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#27C93F] uppercase font-bold">WhatsApp Direct Line</div>
                    <div className="text-sm font-semibold text-[#FFFFFF] group-hover:text-[#27C93F] transition-colors font-mono">
                      +91 74397 35126
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* NDA / Security Statement */}
            <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] text-xs text-[#8A8A8A] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#C9A96A] shrink-0" />
              <span>
                All enquiries are directly forwarded to our founder and engineering leads via email and WhatsApp.
              </span>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="lg:col-span-7 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 sm:p-10 shadow-2xl relative">
            {submittedSuccess && lastSubmittedData ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#C9A96A]/20 border border-[#C9A96A] flex items-center justify-center text-[#C9A96A] animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#FFFFFF]">Enquiry Received!</h3>
                <p className="text-sm text-[#8A8A8A] max-w-md">
                  Thank you, <span className="text-[#FFFFFF] font-semibold">{lastSubmittedData.name}</span>. Your enquiry has been saved.
                </p>

                {/* Direct Action Buttons for Email & WhatsApp */}
                <div className="w-full space-y-3 pt-2 max-w-md">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#27C93F] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider hover:bg-[#2edb47] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(39,201,63,0.3)]"
                  >
                    <MessageSquare className="w-4 h-4 fill-[#0B0B0B] stroke-none" />
                    <span>Send Enquiry to WhatsApp (+91 74397 35126)</span>
                  </a>

                  <a
                    href={generateEmailMailtoUrl()}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#C9A96A] text-[#0B0B0B] font-bold text-xs uppercase tracking-wider hover:bg-[#D4B87C] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email to dynoflix.official@gmail.com</span>
                  </a>

                  <a
                    href="tel:+917439735126"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#0B0B0B] border border-[#2A2A2A] text-[#FFFFFF] font-bold text-xs uppercase tracking-wider hover:border-[#C9A96A] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-[#C9A96A]" />
                    <span>Call +91 74397 35126</span>
                  </a>
                </div>

                <button
                  onClick={() => {
                    setSubmittedSuccess(false);
                    setName('');
                    setEmail('');
                    setCompany('');
                    setPhone('');
                    setDetails('');
                  }}
                  className="mt-4 px-6 py-2 rounded-lg text-xs font-mono text-[#8A8A8A] hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2A]">
                  <h3 className="text-lg font-bold text-[#FFFFFF]">Direct Proposal Request</h3>
                  <span className="text-xs font-mono text-[#8A8A8A]">
                    <span className="text-[#FF5F56]">*</span> Required fields
                  </span>
                </div>

                {/* Service Interest Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase text-[#8A8A8A] mb-2">
                    Primary Service Interest
                  </label>
                  <select
                    value={serviceInterest}
                    onChange={(e) => setServiceInterest(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-[#FFFFFF] focus:outline-none focus:border-[#C9A96A]"
                  >
                    <option value="Custom SaaS & CRM">Custom SaaS & CRM</option>
                    <option value="Custom Software Development">Custom Software Development</option>
                    <option value="Native Mobile Applications">Native Mobile Applications</option>
                    <option value="Premium UI/UX Design">Premium UI/UX Design</option>
                    <option value="Growth Engineering (SEO)">Growth Engineering (SEO)</option>
                    <option value="Performance & Brand Marketing">Performance & Brand Marketing</option>
                    <option value="General Technical Consultation">General Technical Consultation</option>
                  </select>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#8A8A8A] mb-2">
                      Your Name <span className="text-[#FF5F56]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="w-full bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-[#FFFFFF] placeholder-[#555555] focus:outline-none focus:border-[#C9A96A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#8A8A8A] mb-2">
                      Your Email <span className="text-[#FF5F56]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="m.vance@company.com"
                      className="w-full bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-[#FFFFFF] placeholder-[#555555] focus:outline-none focus:border-[#C9A96A]"
                    />
                  </div>
                </div>

                {/* Company & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#8A8A8A] mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Nexus Corp"
                      className="w-full bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-[#FFFFFF] placeholder-[#555555] focus:outline-none focus:border-[#C9A96A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#8A8A8A] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 74397 35126"
                      className="w-full bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg px-4 py-3 text-sm text-[#FFFFFF] placeholder-[#555555] focus:outline-none focus:border-[#C9A96A]"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-xs font-mono uppercase text-[#8A8A8A] mb-2">
                    Project Details & Scope <span className="text-[#FF5F56]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Tell us about your project goals, technical expectations, or requirements..."
                    className="w-full bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg p-3.5 text-sm text-[#FFFFFF] placeholder-[#555555] focus:outline-none focus:border-[#C9A96A]"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#C9A96A] text-[#0B0B0B] font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#D4B87C] hover:shadow-[0_0_25px_rgba(201,169,106,0.3)] flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Enquiry Proposal'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
