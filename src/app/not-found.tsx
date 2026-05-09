
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 – Page Not Found | Broad Options Media',
  description: 'The page you are looking for isn’t available, but we can still help you with fast, high-quality large-format printing in Lagos.',
};

// Pre-filled WhatsApp message for the 404 page CTA
const WHATSAPP_404_PREFILL = "https://wa.me/2348022247567?text=" + encodeURIComponent(
`Hello BOMedia, I landed on a page that wasn’t available.
I’m looking to print: ______
Quantity: ______
Timeline: ______`
);

const serviceLinks = [
    { name: 'Flex Banners & Roll-ups', href: '/#services' },
    { name: 'Stickers & Vinyl', href: '/#services' },
    { name: 'Vehicle Branding', href: '/#gallery' },
    { name: 'Wall & Office Graphics', href: '/#gallery' },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 flex items-center justify-center text-center py-20 px-4">
        <div className="w-full max-w-3xl animate-bounce-in">
          
          {/* 404 Code */}
          <h1 className="text-8xl md:text-9xl font-black text-slate-200/80 tracking-tighter select-none animate-subtle-pulse">
            404
          </h1>

          {/* Headline */}
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            This page isn’t available - but we can still help you print.
          </h2>
          
          {/* Subtext */}
          <p className="mt-4 text-slate-600 max-w-xl mx-auto text-lg">
            Large-format printing, banners, stickers, and branded materials -
            <br className="hidden sm:block" />
            <span className="font-medium text-slate-700">produced fast and delivered across Lagos.</span>
          </p>

          {/* Primary CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto !bg-green-600 hover:!bg-green-700" id="cta-whatsapp" aria-label="Get a quote on WhatsApp">
              <Link href={WHATSAPP_404_PREFILL} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} />
                Get a Quote on WhatsApp
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto" id="cta-browse">
              <Link href="/#services">
                See What We Print
              </Link>
            </Button>
          </div>
          
          {/* Tertiary Link */}
          <div className="mt-6">
            <Button asChild variant="link" className="text-slate-500">
              <Link href="/">
                ← Back to Home
              </Link>
            </Button>
          </div>

          {/* Divider and Popular Services */}
          <div className="mt-16 pt-12 border-t border-slate-200">
             <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Or jump to a popular service</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                 {serviceLinks.map((service) => (
                     <Link key={service.name} href={service.href} className="group">
                         <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-3 h-full flex items-center justify-center transition-all duration-200 hover:border-primary-300 hover:shadow-md hover:-translate-y-1">
                             <p className="font-medium text-slate-800 text-sm">{service.name}</p>
                         </div>
                     </Link>
                 ))}
             </div>
             <p className="mt-8 text-sm text-slate-500">
                <em>Not sure what you’re looking for?</em> Tell us what you need and we’ll guide you.
             </p>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
