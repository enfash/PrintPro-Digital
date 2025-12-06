import React from 'react';
import { TIMELINE_STEPS } from '@/lib/constants';
import { ChevronRight, ArrowDown } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-slate-50 scroll-mt-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A simple, 3-step process to get your prints delivered fast.
            </p>
        </div>

        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-slate-200"></div>
          
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
            {TIMELINE_STEPS.map((step, index) => (
              <div key={step.id} className="relative flex md:flex-col md:items-center md:text-center">
                {/* Mobile Connecting Line */}
                {index !== TIMELINE_STEPS.length - 1 && (
                  <div className="md:hidden absolute left-8 top-16 bottom-0 w-0.5 bg-slate-200"></div>
                )}

                <div className="flex-shrink-0 mb-4 md:mb-0">
                  <div className="relative z-10 w-16 h-16 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center text-primary-600 shadow-md">
                      {React.createElement(step.icon, { className: "w-8 h-8" })}
                  </div>
                </div>
                
                <div className="md:mt-6 pl-8 md:pl-0">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
