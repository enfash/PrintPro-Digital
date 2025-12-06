
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto animate-bounce-in">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-60 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-800">Terms of Service</h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-600" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6 overflow-y-auto">
                        <p className="text-sm text-slate-500 mb-6">Last updated: July 2024</p>

                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p className="mb-6">
                                By engaging <strong>PrintPro Digital</strong> or submitting artwork for printing, you agree to the terms below.
                            </p>

                            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">Artwork & Design Responsibility</h3>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>Customers are responsible for providing <strong>correct, print-ready artwork</strong>.</li>
                                <li>All files are reviewed and a digital proof is sent for approval <strong>before printing begins</strong>.</li>
                                <li>Once a proof is approved, PrintPro Digital is <strong>not responsible</strong> for spelling errors, layout issues, or incorrect content supplied by the customer.</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">Colour Variation Disclaimer</h3>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>Printed output may vary slightly from on-screen colours due to materials, ink behaviour, and lighting.</li>
                                <li>Exact colour matching is not guaranteed unless previously discussed and agreed in writing.</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">Turnaround Time</h3>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>Production timelines begin <strong>only after artwork approval and payment confirmation</strong>.</li>
                                <li>Turnaround estimates may change based on job size, finishing, or workload.</li>
                                <li>Same-day or urgent jobs must be clearly stated beforehand.</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">Payment Terms</h3>
                            <ul className="list-disc pl-5 space-y-2 mb-4">
                                <li>Full payment is required <strong>before production starts</strong>.</li>
                                <li>Jobs will not be printed without confirmed payment and approved artwork.</li>
                            </ul>
                            
                            <p className="mt-6">
                                For questions, contact:{' '}
                                <a href="mailto:info@printpro.ng" className="text-primary-700 hover:text-primary-800 font-medium">
                                    info@printpro.ng
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 text-right">
                        <Button
                            onClick={onClose}
                        >
                            I Understand
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;
