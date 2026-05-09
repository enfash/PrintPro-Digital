'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function gtag(...args: any[]) {
  window.dataLayer.push(arguments);
}

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'wait_for_update': 500,
    });

    const consent = localStorage.getItem('cookie_consent');
    if (consent === null) {
      setShowBanner(true);
    } else if (consent === 'granted') {
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
      });
    }
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
    localStorage.setItem('cookie_consent', 'denied');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 text-white shadow-2xl animate-slide-up-fast">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-300 text-center md:text-left">
          We use cookies to improve your experience and for analytics. By using our site, you agree to our{' '}
          <Link href="/privacy-policy" className="underline hover:text-white">
            Privacy Policy
          </Link>.
        </p>
        <div className="flex-shrink-0 flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleDecline} className="bg-transparent text-white border-slate-600 hover:bg-slate-800 hover:text-white">
            Decline
          </Button>
          <Button size="sm" onClick={handleAccept} className="bg-white text-slate-900 hover:bg-slate-200">
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
