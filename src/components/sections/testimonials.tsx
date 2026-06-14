'use client';

import { Star } from 'lucide-react';

// Replace with real customer testimonials before going live
const testimonials = [
  {
    quote: "The quality of the banners we received was outstanding. BOMedia is now our go-to for all our event branding in Lagos. Fast, reliable, and professional.",
    name: "Tunde Adebayo",
    title: "Events Manager, NXTGen Lagos",
    initials: "TA",
  },
  {
    quote: "Impressed by their attention to detail on our window graphics. The colors are so vibrant and the installation was flawless. Highly recommended!",
    name: "Aisha Okoro",
    title: "Owner, Sisi's Boutique",
    initials: "AO",
  },
  {
    quote: "Working with the BOMedia team was a breeze. They understood our vision for the wall branding and delivered beyond our expectations. Great communication.",
    name: "Emeka Nwosu",
    title: "Marketing Lead, TechCabal",
    initials: "EN",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-white scroll-mt-16">
      <div className="container mx-auto max-w-[960px] px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4 inline-block relative group cursor-default">
            What our clients say
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
          </h2>
          <p className="text-lg text-slate-600">Lagos businesses that trust BOMedia for their branding.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col gap-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
