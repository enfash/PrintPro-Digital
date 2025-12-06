
import { Printer, Twitter, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Printer className="h-8 w-8 text-accent" />
              <h3 className="text-2xl font-bold font-headline">PrintPro Digital</h3>
            </div>
            <p className="max-w-md text-primary-100/80">
              Your trusted partner for high-quality large format printing in Lagos, Nigeria. We deliver vibrant and durable prints that make your brand stand out.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary-100/90">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="#gallery" className="hover:text-accent transition-colors">Our Work</Link></li>
              <li><Link href="#contact" className="hover:text-accent transition-colors">Get a Quote</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary-100/90">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Twitter /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Instagram /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Facebook /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-700 pt-6 text-center text-sm text-primary-100/60">
          <p>&copy; {new Date().getFullYear()} PrintPro Digital. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
