
'use client'

import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    quote: "The quality of the banners we received was outstanding. PrintPro Digital is now our go-to for all our event branding in Lagos. Fast, reliable, and professional.",
    name: "Tunde Adebayo",
    title: "Events Manager, NXTGen Lagos",
    avatarId: "avatar-1",
  },
  {
    quote: "I was impressed by their attention to detail on our window graphics. The colors are so vibrant and the installation was flawless. Highly recommended!",
    name: "Aisha Okoro",
    title: "Owner, Sisi's Boutique",
    avatarId: "avatar-2",
  },
  {
    quote: "Working with the PrintPro team was a breeze. They understood our vision for the 3D signage and delivered beyond our expectations. Great communication throughout.",
    name: "Emeka Nwosu",
    title: "Marketing Lead, TechCabal",
    avatarId: "avatar-3",
  },
];

export default function Testimonials() {
  const getAvatar = (id: string) => PlaceHolderImages.find(img => img.id === id);

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Client Feedback</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Why Our Clients Trust Us</h2>
          </div>
        </div>
        <Carousel 
          className="w-full max-w-4xl mx-auto mt-12"
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const avatar = getAvatar(testimonial.avatarId);
              return (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="shadow-sm border-none bg-muted/50">
                      <CardContent className="flex flex-col items-center justify-center p-6 md:p-10 space-y-4 text-center">
                        <p className="text-lg font-medium italic">"{testimonial.quote}"</p>
                        <div className="flex items-center gap-3 pt-4">
                          {avatar && (
                            <Image
                              src={avatar.imageUrl}
                              alt={`Avatar of ${testimonial.name}`}
                              data-ai-hint={avatar.imageHint}
                              width={48}
                              height={48}
                              className="rounded-full"
                            />
                          )}
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
