'use client';
import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { WHATSAPP_LINK } from '@/lib/constants';

const WhatsAppFloat: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    // Start above the consent banner height; drop to normal position once consent is recorded
    const [bottomClass, setBottomClass] = useState('bottom-32');

    useEffect(() => {
        if (localStorage.getItem('cookie_consent') !== null) {
            setBottomClass('bottom-20');
        }

        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
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
            className={`fixed ${bottomClass} right-6 z-40 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition-[transform,opacity,colors] duration-300 transform hover:scale-110 whatsapp-float-btn ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
                }`}
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={24} />
            <span className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-20"></span>
        </Link>
    );
};

export default WhatsAppFloat;
