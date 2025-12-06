import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import Gallery from '@/components/sections/gallery';
import Testimonials from '@/components/sections/testimonials';
import FAQ from '@/components/sections/faq';
import Contact from '@/components/sections/contact';
import WhatsAppFloat from '@/components/ui/whatsapp-float';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
