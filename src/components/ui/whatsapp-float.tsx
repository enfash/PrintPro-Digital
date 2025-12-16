'use client';
import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { WHATSAPP_LINK } from '@/lib/constants';

declare global {
    interface Window {
      gtag: (...args: any[]) => void;
    }
}

const WhatsAppFloat: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling 300px
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        // Set initial state
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
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
        <Link
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleTrackedClick('whatsapp_float')}
            className={`fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
                }`}
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={24} />

            {/* Pulse animation ring */}
            <span className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-20"></span>
        </Link>
    );
};

export default WhatsAppFloat;
