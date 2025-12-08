
'use client';

import React from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const GALLERY_ITEMS = PlaceHolderImages.filter(img => img.id.startsWith('gallery-')).map(item => ({
  id: item.id,
  imageUrl: item.imageUrl,
  caption: item.description,
  altText: `An example of BOMedia's work: ${item.description}`,
  hint: item.imageHint
}));


const Gallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(2); // The focused item index relative to the visible window (0-3)
  const [startIndex, setStartIndex] = React.useState(0); // The starting index of the visible slice

  const visibleItems = [];
  const totalItems = GALLERY_ITEMS.length;
  for (let i = 0; i < 4; i++) {
    visibleItems.push(GALLERY_ITEMS[(startIndex + i) % totalItems]);
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % totalItems);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-white relative scroll-mt-16">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
              Recent prints
            </h2>
            <p className="text-lg text-slate-600">Some of our work around Lagos.</p>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-4">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full hover:bg-slate-100 border border-slate-200 text-slate-600 transition-colors"
              aria-label="Previous"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full hover:bg-slate-100 border border-slate-200 text-slate-600 transition-colors"
              aria-label="Next"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full items-center justify-center gap-3">
          {visibleItems.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={`${item.id}-${startIndex}`}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl w-full h-[min(28rem,50vh)] transition-[width] duration-500 ease-in-out ${isActive ? 'md:w-[46%]' : 'md:w-[18%]'
                  }`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.altText}
                  fill
                  data-ai-hint={item.hint}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></div>

                <div className={`absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                  <p className="text-white font-medium text-lg leading-tight">{item.caption}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
