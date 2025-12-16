
'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '@/lib/constants';

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
        <div className="prose prose-slate max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-slate-50 scroll-mt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center text-slate-900 sm:text-4xl mb-12">
          Frequently Asked Questions
        </h2>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-6 sm:px-8">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
            <p className="text-slate-600">
                Have another question?{' '}
                <a href="/#contact" className="font-medium text-primary-600 hover:text-primary-700">
                    Contact us
                </a>
            </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
