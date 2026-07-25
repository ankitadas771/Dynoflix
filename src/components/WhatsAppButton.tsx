import React, { useState } from 'react';
import { MessageSquare, X, Send, Phone, Mail } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const phone = '917439735126'; // Updated WhatsApp number

  const handleSendWhatsApp = (customMsg?: string) => {
    const textToSend = customMsg || message || 'Hello Dynoflix Engineering! I would like to enquire about your services.';
    const encoded = encodeURIComponent(textToSend);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div id="whatsapp-floating-container" className="fixed bottom-6 right-6 z-50">
      {/* Quick Chat Popover */}
      {isOpen && (
        <div
          id="whatsapp-chat-popover"
          className="mb-4 w-80 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-5 text-left"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2A]">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-[#C9A96A] text-[#0B0B0B] flex items-center justify-center font-bold text-xs">
                  P
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#27C93F] border-2 border-[#1A1A1A]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#FFFFFF]">Direct WhatsApp Support</h4>
                <span className="text-[10px] font-mono text-[#27C93F]">+91 74397 35126</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8A8A8A] hover:text-[#FFFFFF] transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-[#8A8A8A] leading-relaxed">
            Hi there! 👋 Send your inquiry directly to our WhatsApp or call us at <span className="text-[#C9A96A] font-mono">+91 74397 35126</span>. Email: <span className="text-[#FFFFFF]">dynoflix.official@gmail.com</span>.
          </div>

          {/* Quick Prompts */}
          <div className="space-y-1.5 mb-3">
            {[
              'I need a Custom SaaS proposal',
              'Schedule a technical call on +91 74397 35126',
              'Send proposal details to my email',
            ].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendWhatsApp(prompt)}
                className="w-full text-left p-2 rounded-lg bg-[#0B0B0B] border border-[#222222] hover:border-[#C9A96A]/50 text-[11px] text-[#FFFFFF] transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span>{prompt}</span>
                <Send className="w-3 h-3 text-[#C9A96A] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type custom message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendWhatsApp();
              }}
              className="flex-1 bg-[#0B0B0B] border border-[#2A2A2A] rounded-lg px-3 py-1.5 text-xs text-[#FFFFFF] focus:outline-none focus:border-[#C9A96A]"
            />
            <button
              onClick={() => handleSendWhatsApp()}
              className="p-2 rounded-lg bg-[#C9A96A] text-[#0B0B0B] hover:bg-[#D4B87C] transition-colors cursor-pointer"
              title="Open WhatsApp"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Champagne Gold Circular Floating Trigger Button */}
      <button
        id="whatsapp-fab-button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#C9A96A] text-[#0B0B0B] flex items-center justify-center shadow-[0_0_25px_rgba(201,169,106,0.5)] hover:bg-[#D4B87C] hover:scale-105 transition-all duration-300 cursor-pointer relative group"
        aria-label="Contact on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#27C93F] border-2 border-[#0B0B0B]" />
        <MessageSquare className="w-6 h-6 fill-[#0B0B0B] stroke-none" />
      </button>
    </div>
  );
};
