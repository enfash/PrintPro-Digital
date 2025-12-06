import React from 'react';
import { Facebook, Instagram, Mail, MapPin, Printer } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand Section */}
          <div className="text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <Printer className="h-8 w-8 text-primary-500" />
              <h3 className="text-xl font-bold text-white">BOMedia</h3>
            </div>
            <p className="text-sm">Large-format printing for Lagos businesses.</p>
            <p className="text-xs text-slate-500 mt-2">BN7243402</p>
          </div>

          {/* Service Areas */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-3">Service Areas</h4>
            <p className="text-sm leading-relaxed">
              We deliver printed materials across Lagos, including Lekki, Victoria Island, Ikeja, Yaba, Surulere, and nearby areas.
            </p>
          </div>

          {/* Connect With Us */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-3">Connect With Us</h4>
            <div className="space-y-2 text-sm">
              <a
                href="https://www.facebook.com/bomedia03"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
              <a
                href="https://www.instagram.com/bomedia03"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              <a
                href="mailto:info@bomedia.ng"
                className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@bomedia.ng
              </a>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4" />
                Lagos, Nigeria
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <div className="space-y-2 text-sm">
              <Link href="/privacy-policy" className="block hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="block hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-6 text-center text-sm">
          &copy; {currentYear} BOMedia. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
