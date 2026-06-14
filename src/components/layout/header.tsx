
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import CostCalculator from '@/components/calculator/CostCalculator';
import { NAV_LINKS, WHATSAPP_LINK } from '@/lib/constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine visibility based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 70) {
        // Scrolling down and past the header height
        setIsVisible(false);
      } else {
        // Scrolling up or at the very top
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
      setIsScrolled(currentScrollY > 20);

      // Clear the previous timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set a new timeout to show the header when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        setIsVisible(true);
      }, 800);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const handleTrackedClick = (location: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'whatsapp_click', {
        location: location,
        page: window.location.pathname,
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 h-[70px] flex items-center ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="w-full mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-2 z-50">
            <Image
              src="/logos/bomedia-logo.svg"
              alt="BOMedia - Broad Options Media Logo"
              width={130}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex justify-center items-center gap-8">
          {NAV_LINKS.map((link) => {
            if (link.label === 'Calculator') {
              return (
                <Dialog key={link.label}>
                  <DialogTrigger className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors cursor-pointer">
                    {link.label}
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] md:max-w-4xl p-0 border-0 bg-transparent shadow-none [&>button]:hidden">
                    <DialogTitle className="sr-only">Print Cost Calculator</DialogTitle>
                    <CostCalculator />
                  </DialogContent>
                </Dialog>
              );
            }
            return (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex gap-2 !border-green-600 !text-green-700 hover:!bg-green-50">
            <Link
              href={WHATSAPP_LINK}
              target="_blank"
              onClick={() => handleTrackedClick('header_whatsapp_quote')}
            >
              <MessageCircle size={16} />
              WhatsApp Quote
            </Link>
          </Button>

          <button
            className="md:hidden z-50 p-2 text-slate-600 hover:text-slate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-24 px-6 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6 text-lg font-medium bg-white">
          {NAV_LINKS.map((link) => {
            if (link.label === 'Calculator') {
              return (
                <Dialog key={link.label}>
                  <DialogTrigger className="text-left text-slate-800 hover:text-primary-600 border-b border-slate-100 pb-4 w-full cursor-pointer">
                    {link.label}
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] md:max-w-4xl p-0 border-0 bg-transparent shadow-none [&>button]:hidden">
                    <DialogTitle className="sr-only">Print Cost Calculator</DialogTitle>
                    <CostCalculator />
                  </DialogContent>
                </Dialog>
              );
            }
            return (
              <Link
                key={link.label}
                href={link.href}
                className="text-slate-800 hover:text-primary-600 border-b border-slate-100 pb-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <Button asChild className="mt-4 gap-2 w-full !bg-green-600 hover:!bg-green-700">
            <Link
              href={WHATSAPP_LINK}
              target="_blank"
              onClick={() => {
                handleTrackedClick('header_whatsapp_quote_mobile');
                setIsMobileMenuOpen(false);
              }}
            >
              <MessageCircle size={18} />
              WhatsApp Quote
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
