'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  // Get 4 placeholder images to use for the slider
  const heroImages = PlaceHolderImages.filter(img => 
    img.id === 'hero-main' || img.id.startsWith('gallery-')
  ).slice(0, 4);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000); // Crossfade every 6 seconds
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative pt-32 pb-20 lg:pt-32 lg:pb-20 overflow-hidden flex items-center justify-center min-h-[75vh] lg:min-h-[75vh] lg:max-h-[760px] bg-slate-900">
      
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        {heroImages.map((img, index) => {
          const isActive = index === currentImageIndex;
          return (
            <div 
              key={img.id} 
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}
            >
              <Image
                src={img.imageUrl}
                alt={img.description}
                fill
                priority={index === 0}
                className={`object-cover object-center transition-transform ease-linear ${isActive ? 'scale-110' : 'scale-100'}`}
                style={{ transitionDuration: '10000ms' }}
                sizes="100vw"
                data-ai-hint={img.imageHint}
              />
            </div>
          );
        })}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-900/75 z-10"></div>
      </div>

      <div className="site-container relative z-20">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-1.5 mb-8 animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-sm font-medium text-white">Premium Large-Format Printing</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white  mb-3 animate-slide-up-fade" style={{ animationDelay: '0.4s' }}>
            High-Impact Visibility <br/> for Your Brand
          </h1>

          <p className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto leading-snug animate-slide-up-fade" style={{ animationDelay: '0.6s' }}>
            <strong>Broad Option Media - BOMedia</strong> specializes in premium large-format printing and indoor/outdoor promotional branding designed to help your message stand out.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up-fade" style={{ animationDelay: '0.8s' }}>
             <Button asChild size="lg" className="group w-full sm:w-auto h-12 px-8 text-base bg-[#2e388d] text-white hover:bg-[#434c98] transition-colors duration-300">
               <Link href="/#contact" className="flex items-center">
                  Request a Quote
                  <svg 
                    className="ml-2 w-4 h-4 overflow-visible" 
                    viewBox="0 0 14 14" 
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <g fillRule="evenodd">
                      <path 
                        className="transition-all duration-300 ease-in-out origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100" 
                        d="M0 7h7" 
                      />
                      <path 
                        className="transition-all duration-300 ease-in-out group-hover:translate-x-[2px]" 
                        d="M1 3l4 4-4 4" 
                      />
                    </g>
                  </svg>
               </Link>
             </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white animate-slide-up-fade" style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-white" />
              <span>4-6hr Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-white" />
              <span>High Resolution</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-white" />
              <span>Lagos-Wide Delivery</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
