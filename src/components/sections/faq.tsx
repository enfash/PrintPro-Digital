'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { FAQS, CORPORATE_FAQS, WHATSAPP_LINK, WHATSAPP_CORPORATE_LINK } from '@/lib/constants';
import Link from 'next/link';
import { Button } from '../ui/button';

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({
  question,
  answer,
  isOpen,
  onClick
}) => {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        className="flex w-full items-center justify-between py-6 text-left focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-slate-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-primary-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
      >
        <p className="text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'corporate'>('general');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const currentFAQs = activeTab === 'general' ? FAQS : CORPORATE_FAQS;

  const handleTabChange = (tab: 'general' | 'corporate') => {
    setActiveTab(tab);
    setOpenIndex(0); // Reset to first item when switching tabs
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-slate-50 scroll-mt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center text-slate-900 sm:text-4xl mb-12">
          Frequently asked questions
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-slate-200 p-1">
            <button
              onClick={() => handleTabChange('general')}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === 'general'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              General
            </button>
            <button
              onClick={() => handleTabChange('corporate')}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === 'corporate'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              Corporate Clients
            </button>
          </div>
        </div>

        {/* Corporate Tab Intro */}
        {activeTab === 'corporate' && (
          <p className="text-center text-slate-600 mb-6 text-sm">
            This section is for businesses, agencies, and organisations with bulk or repeat printing needs.
          </p>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-6 sm:px-8">
          {currentFAQs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Corporate CTA */}
        {activeTab === 'corporate' && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Have a corporate or bulk order?
            </h3>
            <p className="text-slate-600 mb-6">
              Speak with us directly on WhatsApp for scheduling and quotations.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto gap-2 !bg-green-600 hover:!bg-green-700">
               <Link
                href={WHATSAPP_CORPORATE_LINK}
                target="_blank"
                rel="noopener noreferrer"
               >
                <MessageCircle size={20} />
                Contact Us on WhatsApp
              </Link>
            </Button>
            <p className="text-xs text-slate-500 mt-3">Available during business hours (9am–6pm, Mon–Sat)</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQ;
