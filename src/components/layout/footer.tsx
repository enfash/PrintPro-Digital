
import React from 'react';
import { Facebook, Instagram, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full">
      {/* Top Contact Bar */}
      <div className="bg-slate-50 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8cc63f] via-[#00a2e8] to-[#2e388d]" />
        <div className="container mx-auto max-w-[960px] px-6 py-6 mt-1">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
            
            {/* Left Side: Avatars & Text */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center md:text-left">
              <div className="flex -space-x-3">
                <img src="avatar/avatar-contact.png" alt="Team" className="w-10 h-10 rounded-full border-2 border-white object-cover grayscale opacity-90" />
              </div>
              <span className="font-bold text-slate-800 text-xl">Feel free to contact us</span>
            </div>

            {/* Right Side: Contact Links */}
            <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-3 text-slate-800 font-bold text-base">
             
              <span className="hidden lg:inline text-slate-300 font-normal">|</span>
              <a href="tel:+2348022247567" className="hover:text-[#2e388d] transition-colors">+2348022247567</a>
              <span className="hidden lg:inline text-slate-300 font-normal">|</span>
              <a href="mailto:info@bomedia.com.ng" className="hover:text-[#2e388d] transition-colors">info@bomedia.com.ng</a>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto max-w-[960px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand Section */}
          <div className="md:col-span-2 pr-4">
             <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 flex-shrink-0">
                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 40 40">
                  <rect style={{fill: '#2e388d'}} x="0" y="0" width="40" height="40" rx="4.48" ry="4.48"/>
                  <g>
                    <path style={{fill: '#fff'}} d="M20.07,19.24c-.26-.14-.51-.29-.79-.45.09-.19.14-.31.2-.42.66-1.24.69-2.56.36-3.87-.6-2.38-2.82-3.9-5.03-3.91-2.59,0-5.19-.01-7.78,0-.16,0-.32.06-.55.1,0,6.23,0,12.42,0,18.65.31.04.5.1.7.1,3.41,0,6.82.02,10.23,0,1.26-.01,2.45-.4,3.41-1.2,2.97-2.45,2.59-7.12-.77-8.97h0ZM9.36,13.31c.25-.02.48-.06.7-.06,1.5,0,3,0,4.49,0,1.92.01,3.17,1.59,2.73,3.43-.21.88-1.34,1.86-2.32,1.89-1.83.04-3.67.01-5.6.01v-5.27h0ZM19.97,24.32c-.07,1.08-1.08,2.22-2.16,2.24-2.79.05-5.58.02-8.45.02v-5.19c.23-.03.45-.08.68-.08,2.28,0,4.57-.01,6.85,0,.44,0,.89.03,1.31.14,1.17.3,1.86,1.46,1.77,2.87h0Z"/>
                    <path style={{fill: '#fff'}} d="M33.51,15.93c.16-2.85-2.39-5.36-5.26-5.36-2.7,0-5.4,2.16-5.39,5.38.01,3.39,2.88,5.33,5.31,5.36,2.76.04,5.54-2.42,5.34-5.39h0ZM25.67,15.91c-.11-1.62,1.45-2.68,2.57-2.61,1.46.09,2.57,1.18,2.58,2.66,0,1.39-1.28,2.63-2.63,2.61-1.41-.02-2.52-1.2-2.52-2.66Z"/>
                    <polygon style={{fill: '#fff'}} points="25.24 24.09 24.81 23.26 24.51 23.26 24.51 24.72 24.79 24.72 24.79 23.75 25.17 24.47 25.32 24.47 25.7 23.75 25.7 24.72 25.98 24.72 25.98 23.26 25.68 23.26 25.24 24.09"/>
                    <polygon style={{fill: '#fff'}} points="26.87 24.09 27.49 24.09 27.49 23.86 26.87 23.86 26.87 23.51 27.58 23.51 27.58 23.26 26.59 23.26 26.59 24.72 27.6 24.72 27.6 24.47 26.87 24.47 26.87 24.09"/>
                    <path style={{fill: '#fff'}} d="M29.19,23.47c-.06-.07-.14-.12-.22-.16-.09-.04-.19-.06-.31-.06h-.53v1.45h.53c.11,0,.21-.02,.3-.05s.16-.08,.23-.15.11-.14,.14-.23c.03-.09.05-.19,.05-.3,0-.1-.01-.19-.04-.28-.03-.09-.08-.16-.14-.23h0ZM29.06,24.18c-.02.06-.05.11-.08.15-.04.04-.08.08-.14.1-.05.02-.12.04-.19.04h-.25v-.96h.25c.07,0,.13.01,.18.03.05.02,.1.06,.14.1.04.04,.06.09,.08.15s.03.12,.03.19,0,.13-.03.19h0Z"/>
                    <rect style={{fill: '#fff'}} x="29.9" y="23.26" width=".28" height="1.45"/>
                    <path style={{fill: '#fff'}} d="M31.21,23.26l-.56,1.45h.29l.13-.36h.51l.14.36h.29l-.55-1.45h-.25,0ZM31.13,24.15l.21-.57.2.57h-.41,0Z"/>
                  </g>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Broad Options Media</h3>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              We help Lagos brands and organisations produce high-quality large-format prints with fast turnaround and consistent results.
            </p>
            <div className="mb-4">
              <h4 className="text-white font-semibold text-sm mb-1">Service Areas</h4>
              <p className="text-sm leading-relaxed text-slate-400">
                Lagos: Lekki, Victoria Island, Ikeja, Yaba, Surulere, and nearby areas.
              </p>
            </div>
            <p className="text-xs text-slate-500">BN7243402</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="/#services" className="block hover:text-white transition-colors">What we print</Link>
              <Link href="/cost-calculator" className="block hover:text-white transition-colors">Calculator</Link>
              <Link href="/#how-it-works" className="block hover:text-white transition-colors">How it works</Link>
              <Link href="/#gallery" className="block hover:text-white transition-colors">Gallery</Link>
              <Link href="/#faq" className="block hover:text-white transition-colors">FAQ</Link>
            </div>
          </div>



          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <div className="space-y-2 text-sm">
              <Link href="/privacy-policy" className="block hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="block hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>

        </div>

        {/* Copyright & Social */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="text-left">
            &copy; {currentYear} BOMedia. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/bomedia03"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/bomedia03"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.tiktok.com/@bomedia03"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;

    