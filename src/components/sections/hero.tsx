
import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_LINK } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative bg-slate-50 pt-32 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 rounded-full px-4 py-1.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              <span className="text-sm font-medium text-primary-800">Open for orders in Lagos</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-none tracking-tighter mb-6">
              LARGE-FORMAT PRINTING <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-800 to-primary-600">
                FOR LAGOS BUSINESSES
              </span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              <strong>Broad Options Media (BOMedia)</strong> is your plug for sharp large-format prints in Lagos. We do Flex Banners, SAV (Stickers), Window Graphics, and Branding. Fast delivery to Lekki, Ikeja, and everywhere in Lagos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
               <Button asChild size="lg">
                 <Link href={WHATSAPP_LINK} target="_blank">
                    Get a Quote
                    <ArrowRight className="w-5 h-5" />
                 </Link>
               </Button>
               <Button asChild size="lg" variant="outline">
                <Link href="/#gallery">
                    View Our Work
                </Link>
               </Button>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-500" />
                <span>4-6hr Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-500" />
                <span>High Resolution</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-500" />
                <span>Lagos-Wide Delivery</span>
              </div>
            </div>
          </div>

          {/* Hero Image - Single Static */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://picsum.photos/seed/hero/800/600"
                alt="BOMedia large format printing samples - flex banners, SAV, window graphics"
                fill
                className="object-cover"
                data-ai-hint="printing samples"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
