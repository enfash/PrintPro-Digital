
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SERVICES } from '@/lib/constants';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-16 lg:py-24 bg-white relative scroll-mt-16">
      <div className="container mx-auto max-w-[960px] px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4 inline-block relative group cursor-default">
            Large-Format Printing Services in Lagos
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
          </h2>
          <p className="text-lg text-slate-600">
            Fast, high-quality branding for shops, events, and businesses.
          </p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className={`group relative p-6 sm:p-8 bg-slate-50 rounded-2xl border border-slate-100 hover-lift flex flex-row md:flex-col items-start gap-5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-12 h-12 flex-shrink-0 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary-600 md:mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                <service.icon size={24} />
              </div>
              
              <div className="flex-grow">
                <Link href="/#contact" className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3 group-hover:text-primary-700 transition-colors block">
                  {service.title}
                </Link>
                
                <p className="text-slate-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base whitespace-pre-line">
                  {service.description}
                </p>
                
                <div className="inline-flex items-center text-xs font-semibold text-primary-700 bg-primary-50 px-3 py-1 rounded-full">
                  {service.meta}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-1">How is pricing calculated?</p>
            <p className="text-sm text-slate-500">Based on size, material, quantity, and finishing. Clear, upfront quotes — no hidden charges.</p>
            <p className="text-xs text-slate-400 mt-2">Perfect for: Marketing Agencies, Real Estate, Event Planners, and Retail Businesses.</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/#contact">Get a quote &rarr;</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
