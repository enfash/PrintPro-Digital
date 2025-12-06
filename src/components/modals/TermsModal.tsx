
'use client';
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-bounce-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Terms of Service</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-4 text-slate-600">
          <h3 className="font-semibold text-slate-700">1. Artwork & Proofs</h3>
          <p>
            By submitting your artwork, you confirm you have the legal rights to use the images, logos, and text. We will send a digital proof for your approval before printing. It is your responsibility to check for errors in spelling, grammar, and design.
          </p>

          <h3 className="font-semibold text-slate-700">2. Printing & Color Matching</h3>
          <p>
            We strive for accurate color reproduction, but due to the nature of digital printing, minor variations in color may occur between the digital proof and the final printed product. We are not liable for such variations.
          </p>

          <h3 className="font-semibold text-slate-700">3. Payment & Turnaround</h3>
          <p>
            Full payment is required before any printing begins. Our standard turnaround time is communicated upon order confirmation but is an estimate and not a guarantee.
          </p>
        </div>

        <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl text-right">
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;

    