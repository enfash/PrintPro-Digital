'use client';
 
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
 
function gtag(...args: any[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}
 
export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
 
  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    
    // Set default to granted immediately unless they explicitly declined previously
    if (consent !== 'denied') {
      gtag('consent', 'default', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'wait_for_update': 500,
      });
      if (consent === null) {
        // Automatically save as granted
        localStorage.setItem('cookie_consent', 'granted');
        setShowBanner(true);
      }
    } else {
      gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'wait_for_update': 500,
      });
    }
  }, []);

  // Global Click Tracking
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest('a, button, [role="button"]');
      
      if (clickable) {
        const text = clickable.textContent?.trim() || '';
        const href = clickable.getAttribute('href') || '';
        const id = clickable.id || '';
        const className = clickable.className || '';
        
        gtag('event', 'click', {
          event_category: 'engagement',
          event_label: text || id || href || 'unknown',
          click_text: text,
          click_url: href,
          element_id: id,
          element_class: className,
          page_path: window.location.pathname
        });
      }
    };

    document.addEventListener('click', handleGlobalClick, { passive: true });
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);
 
  const handleAccept = () => {
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'analytics_storage': 'granted',
    });
    localStorage.setItem('cookie_consent', 'granted');
    setShowBanner(false);
  };
 
  const handleDecline = () => {
    gtag('consent', 'update', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
    });
    localStorage.setItem('cookie_consent', 'denied');
    setShowBanner(false);
  };
 
  if (!showBanner) {
    return null;
  }
 
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 text-white shadow-2xl animate-slide-up-fast">
      <div className="site-container py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-300 text-center md:text-left">
          We use cookies to improve your experience and for analytics. By continuing to browse, you agree to our{' '}
          <Link href="/privacy-policy" className="underline hover:text-white">
            Privacy Policy
          </Link>.
        </p>
        <div className="flex-shrink-0 flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleDecline} className="bg-transparent text-white border-slate-600 hover:bg-slate-800 hover:text-white">
            Decline
          </Button>
          <Button size="sm" onClick={handleAccept} className="bg-white text-slate-900 hover:bg-slate-200">
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}
