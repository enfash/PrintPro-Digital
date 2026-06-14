
'use client';

import React, { useState } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import ImagePreviewModal from '../modals/ImagePreviewModal';

const GALLERY_ITEMS = PlaceHolderImages.filter(img => img.id.startsWith('gallery-')).map(item => ({
  id: item.id,
  imageUrl: item.imageUrl,
  caption: item.description,
  altText: `An example of BOMedia's work: ${item.description}`,
  hint: item.imageHint
}));


const Gallery: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(2);
  const [startIndex, setStartIndex] = React.useState(0);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [previewImage, setPreviewImage] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  const totalItems = GALLERY_ITEMS.length;

  const visibleItems = [];
  for (let i = 0; i < 4; i++) {
    visibleItems.push(GALLERY_ITEMS[(startIndex + i) % totalItems]);
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % totalItems);
    setActiveIndex(0);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + totalItems) % totalItems);
    setActiveIndex(0);
  };

  const mobileVisibleItems = showAllMobile ? GALLERY_ITEMS : GALLERY_ITEMS.slice(0, 6);

  return (
    <>
      <section id="gallery" className="py-16 lg:py-24 bg-white relative scroll-mt-16">
        <div className="container mx-auto max-w-[960px] px-6">
          <div className="mb-12 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4 inline-block relative group cursor-default">
                Recent prints
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </h2>
              <p className="text-lg text-slate-600">Some of our work around Lagos.</p>
            </div>

            <div className="hidden md:flex gap-4">
              <Button
                onClick={handlePrev}
                variant="outline"
                size="icon"
                className="rounded-full"
                aria-label="Previous"
              >
                <ArrowLeft size={20} />
              </Button>
              <Button
                onClick={handleNext}
                variant="outline"
                size="icon"
                className="rounded-full"
                aria-label="Next"
              >
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-[1200px] px-6">
          {/* Desktop Slider */}
          <div className="hidden md:flex flex-col md:flex-row w-full items-center justify-center gap-3">
            {visibleItems.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={`${item.id}-${startIndex}`}
                  className={`group relative cursor-pointer overflow-hidden rounded-3xl w-full h-[min(28rem,50vh)] transition-[width] duration-500 ease-in-out ${isActive ? 'md:w-[46%]' : 'md:w-[18%]'
                    }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setPreviewImage(item)}
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

          {/* Mobile Grid */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-4">
              {mobileVisibleItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-[4/5]"
                  onClick={() => setPreviewImage(item)}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.altText}
                    fill
                    data-ai-hint={item.hint}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="50vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <p className="text-white font-semibold text-sm leading-tight">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>

            {!showAllMobile && GALLERY_ITEMS.length > 6 && (
              <div className="mt-8 text-center">
                <Button
                  onClick={() => setShowAllMobile(true)}
                  variant="outline"
                  size="lg"
                >
                  Show more work
                </Button>
              </div>
            )}
          </div>

        </div>
      </section>
      <ImagePreviewModal
        isOpen={!!previewImage}
        onClose={() => setPreviewImage(null)}
        imageUrl={previewImage?.imageUrl || ''}
        caption={previewImage?.caption || ''}
        altText={previewImage?.altText || ''}
      />
    </>
  );
};

export default Gallery;
