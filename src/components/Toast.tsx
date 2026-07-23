import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      id="toast-notification-banner"
      className={`fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl transition-all duration-300 max-w-md ${
        type === 'success'
          ? 'bg-[#0B0B0B] text-[#FFFFFF] border-[#C9A96A] shadow-[0_0_20px_rgba(201,169,106,0.3)]'
          : 'bg-[#0B0B0B] text-[#FFFFFF] border-[#FF5F56] shadow-[0_0_20px_rgba(255,95,86,0.3)]'
      }`}
    >
      {type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-[#C9A96A] shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-[#FF5F56] shrink-0" />
      )}
      <span className="text-xs font-medium text-[#FFFFFF]">{message}</span>
      <button
        onClick={onClose}
        className="ml-auto text-[#8A8A8A] hover:text-[#FFFFFF] transition-colors p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
