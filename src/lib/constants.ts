
import {
  Printer,
  Layers,
  Scan,
  MessageSquare,
  FileCheck,
  Truck
} from 'lucide-react';
import { NavItem, ServiceItem, TimelineStep, FAQItem } from './types';

export const WHATSAPP_LINK = "https://wa.me/2348022247567?text=Hi%20BOMedia%2C%20I%20need%20a%20quote%20for%20large%20format%20printing.";
export const WHATSAPP_CORPORATE_LINK = "https://wa.me/2348022247567?text=Hi%20BOMedia%2C%20I%20have%20a%20corporate/bulk%20printing%20order.%20I'd%20like%20to%20discuss%20scheduling%20and%20quotations%20for%20my%20business.";
export const PHONE_DISPLAY = "+234 802 224 7567";
export const EMAIL_DISPLAY = "info@bomedia.com.ng";

export const NAV_LINKS: NavItem[] = [
  { label: 'What we print', href: '/#services' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'flex',
    title: 'Flex Banners',
    description: 'Large-format banners for campaigns, events, and outdoor visibility. Roll-ups, X-banners, snapper frames, teardrop flags, and backdrops.',
    meta: 'Ready under 24 hrs',
    icon: Printer,
  },
  {
    id: 'sav',
    title: 'Self-Adhesive Vinyl (SAV)',
    description: 'Professional self-adhesive vinyl for interior, exterior, and campaign branding. Wall graphics, window vinyl, vehicle branding, and surface wraps.',
    meta: 'Perfect for branding spaces',
    icon: Layers,
  },
  {
    id: 'stickers',
    title: 'Window & Clear Vinyl / Stickers',
    description: 'Precision-printed clear vinyl for storefronts, offices, and glass branding. Logo decals, window graphics, frosted effects, and visibility control.',
    meta: 'Professional finish, clear look',
    icon: Scan,
  },
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 1,
    title: 'Send details',
    description: 'Send us your design and size on WhatsApp or use the form.',
    icon: MessageSquare,
  },
  {
    id: 2,
    title: 'Get price & approve',
    description: 'We tell you the price instantly. You confirm before we print.',
    icon: FileCheck,
  },
  {
    id: 3,
    title: 'We print & deliver',
    description: 'We print and deliver to your doorstep (Lagos wide) within 24-48 hours.',
    icon: Truck,
  },
];

const gtag = (location: string) => `gtag('event','whatsapp_click',{location:'${location}',page:window.location.pathname})`;

export const FAQS: FAQItem[] = [
  {
    question: 'What do you print?',
    answer: `We specialise in <strong>large-format printing</strong>, including flex banners, self-adhesive vinyl (SAV), window graphics, wall branding, and clear stickers. Our focus is on <strong>high-impact visual prints for brands, businesses, and agencies</strong>, rather than small paper items like business cards or flyers.
    <br/><br/>
    <a href="${WHATSAPP_LINK}" onclick="${gtag('faq_service_fit')}" target="_blank" rel="noopener noreferrer" style="color: #4659cd; font-weight: 500;">
      👉 Not sure if your job fits? <strong>Chat with us on WhatsApp</strong> for quick confirmation.
    </a>`,
  },
  {
    question: 'How much does a banner cost in Lagos?',
    answer: `Pricing depends on <strong>size, material, finishing, and quantity</strong>. Once we understand your needs, we’ll send you a <strong>clear, upfront quote</strong>.
    <br/><br/>
    <a href="${WHATSAPP_LINK}" onclick="${gtag('faq_price_quote')}" target="_blank" rel="noopener noreferrer" style="color: #4659cd; font-weight: 500;">
      💬 <strong>Send your banner size on WhatsApp</strong> and get a fast quote.
    </a>`,
  },
  {
    question: 'Can I get same-day printing in Lagos?',
    answer: `Yes — <strong>same-day printing is available</strong> for select jobs, depending on size, material, and production queue. If timing is critical, let us know early.
    <br/><br/>
    <a href="${WHATSAPP_LINK}" onclick="${gtag('faq_sameday_availability')}" target="_blank" rel="noopener noreferrer" style="color: #4659cd; font-weight: 500;">
      ⚡ <strong>Message us on WhatsApp now</strong> to confirm availability today.
    </a>`,
  },
  {
    question: 'Do you deliver to Lekki, Victoria Island, or Ikeja?',
    answer: `Yes. We deliver across <strong>Lagos</strong>, including Lekki, Victoria Island, Ikeja, and nearby areas. Delivery cost and timeline are confirmed with your order.
    <br/><br/>
    <a href="${WHATSAPP_LINK}" onclick="${gtag('faq_delivery_location')}" target="_blank" rel="noopener noreferrer" style="color: #4659cd; font-weight: 500;">
      📍 <strong>Send your location on WhatsApp</strong> to confirm delivery details.
    </a>`,
  },
  {
    question: 'What file formats do you accept?',
    answer: `We accept <strong>PDF, AI, PSD, and high-resolution JPG/PNG</strong> files. If you’re unsure whether your file is print-ready, we can check it for you.
    <br/><br/>
    <a href="${WHATSAPP_LINK}" onclick="${gtag('faq_file_check')}" target="_blank" rel="noopener noreferrer" style="color: #4659cd; font-weight: 500;">
      📎 <strong>Share your design on WhatsApp</strong> for a quick file check.
    </a>`,
  },
  {
    question: 'What banner sizes can you print?',
    answer: `We print <strong>custom sizes</strong>, from small promotional banners to <strong>large-scale formats</strong>. We’ll recommend the best size based on where it will be used.
    <br/><br/>
    <a href="${WHATSAPP_LINK}" onclick="${gtag('faq_size_advice')}" target="_blank" rel="noopener noreferrer" style="color: #4659cd; font-weight: 500;">
      📐 <strong>Tell us where the banner will be used on WhatsApp</strong> and we’ll advise.
    </a>`,
  },
  {
    question: 'How long does printing take?',
    answer: `Most projects are completed within <strong>24–72 hours</strong>, depending on size and finishing. Urgent jobs can often be prioritised.
    <br/><br/>
    <a href="${WHATSAPP_LINK}" onclick="${gtag('faq_turnaround')}" target="_blank" rel="noopener noreferrer" style="color: #4659cd; font-weight: 500;">
      ⏱️ <strong>Message us on WhatsApp</strong> with your deadline to confirm turnaround.
    </a>`,
  },
  {
    question: 'Do you offer installation?',
    answer: `Yes. We offer <strong>professional installation</strong> for wall branding, window graphics, and large-format applications within Lagos.
    <br/><br/>
    <a href="${WHATSAPP_LINK}" onclick="${gtag('faq_installation_quote')}" target="_blank" rel="noopener noreferrer" style="color: #4659cd; font-weight: 500;">
      🛠️ <strong>Chat with us on WhatsApp</strong> to include installation in your quote.
    </a>`,
  },
];
