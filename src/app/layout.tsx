
import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { GoogleTagManager } from '@next/third-parties/google';
import ConsentBanner from '@/components/ConsentBanner';

export const metadata: Metadata = {
  title: 'Large Format Printing Lagos | Flex Banners & Window Graphics | BOMedia',
  description: 'Get sharp flex banners, SAV, and wall branding from Broad Options Media (BOMedia). We guarantee fast production and same-day delivery in Lagos.',
  keywords: [
    "large format printing Lagos", 
    "flex banners Nigeria", 
    "window graphics Lagos", 
    "self-adhesive vinyl Lagos", 
    "SAV printing Nigeria", 
    "clear stickers Lagos", 
    "banner printing Lagos", 
    "outdoor printing Nigeria"
  ],
  authors: [{ name: "BOMedia - Broad Options Media" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://bomedia.com.ng/",
    title: "Large Format Printing Lagos | Flex Banners & Window Graphics | BOMedia",
    description: "BOMedia provides fast, high-quality flex banners, SAV, and window graphics in Lagos. Get same-day delivery on standard jobs.",
    images: [{
      url: "https://bomedia.com.ng/images/hero/hero-banner.jpg",
      width: 1200,
      height: 630,
      alt: "BOMedia Large Format Printing Services",
    }],
    locale: "en_NG",
    siteName: "BOMedia Large Format Printing",
  },
  twitter: {
    card: "summary_large_image",
    title: "Large Format Printing Lagos | Flex Banners & Window Graphics | BOMedia",
    description: "BOMedia provides fast, high-quality flex banners, SAV, and window graphics in Lagos. Get same-day delivery on standard jobs.",
    images: ["https://bomedia.com.ng/images/hero/hero-banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="canonical" href="https://bomedia.com.ng/" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Geo Tagging */}
        <meta name="geo.region" content="NG-LA" />
        <meta name="geo.placename" content="Lagos" />
        <meta name="geo.position" content="6.5244;3.3792" />
        <meta name="ICBM" content="6.5244, 3.3792" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "BOMedia - Broad Options Media",
  "alternateName": "BOMedia",
  "image": "https://bomedia.com.ng/images/hero/hero-banner.jpg",
  "@id": "https://bomedia.com.ng",
  "url": "https://bomedia.com.ng",
  "telephone": "+234-802-224-7567",
  "email": "info@bomedia.com.ng",
  "priceRange": "₦₦",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Lagos",
    "addressLocality": "Lagos",
    "addressRegion": "Lagos State",
    "postalCode": "",
    "addressCountry": "NG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 6.5244,
    "longitude": 3.3792
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://wa.me/2348022247567",
    "https://www.instagram.com/bomedia03",
    "https://www.facebook.com/bomedia03",
    "https://share.google/MUyWuLfBGbkf4EgCq"
  ],
  "description": "BOMedia provides fast, high-quality large format printing services including flex banners, self-adhesive vinyl (SAV), window graphics, and wall branding for businesses across Lagos. Quick turnaround on standard jobs.",
  "areaServed": [
    { "@type": "City", "name": "Lagos" },
    { "@type": "Place", "name": "Lekki" },
    { "@type": "Place", "name": "Victoria Island" },
    { "@type": "Place", "name": "Ikeja" },
    { "@type": "Place", "name": "Yaba" },
    { "@type": "Place", "name": "Surulere" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Large Format Printing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Flex Banner Printing",
          "description": "Bold, durable outdoor banners for shops and events. Ready under 24 hours.",
          "provider": { "@type": "LocalBusiness", "name": "BOMedia" },
          "areaServed": { "@type": "City", "name": "Lagos" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Self-Adhesive Vinyl (SAV) Printing",
          "description": "Premium quality self-adhesive vinyl for indoor and outdoor branding.",
          "provider": { "@type": "LocalBusiness", "name": "BOMedia" },
          "areaServed": { "@type": "City", "name": "Lagos" }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Window Graphics and Wall Branding",
          "description": "Professional window decals, clear stickers, and wall branding for storefronts and offices.",
          "provider": { "@type": "LocalBusiness", "name": "BOMedia" },
          "areaServed": { "@type": "City", "name": "Lagos" }
        }
      }
    ]
  }
}
` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How fast is flex banner printing in Lagos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BOMedia offers fast turnaround times for flex banner printing in Lagos. Standard orders are ready within 24-48 hours. Urgent 'same-day' printing options may be available upon request."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer delivery across Lagos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Broad Options Media (BOMedia) delivers large format prints to all locations in Lagos, including Lekki, Victoria Island, Ikeja, Surulere, and Yaba."
      }
    },
    {
      "@type": "Question",
      "name": "What file formats do you accept for printing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We accept high-resolution JPEG, PDF, TIFF, and PNG files. For best results, please ensure your design is at least 72-150 DPI at actual size."
      }
    },
    {
      "@type": "Question",
      "name": "Can I order prints online via WhatsApp?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! You can send your artwork and order details directly to BOMedia on WhatsApp at +234 802 224 7567 for a quick quote and processing."
      }
    }
  ]
}
` }} />
      </head>
      <body className={cn("bg-slate-50 text-slate-900 antialiased selection:bg-primary-200 selection:text-primary-900", "font-body")} suppressHydrationWarning>
        <GoogleTagManager gtmId="GTM-PF8CQGCX" />
        <FirebaseErrorListener />
        {children}
        <Toaster />
        <ConsentBanner />
      </body>
    </html>
  );
}

    

    