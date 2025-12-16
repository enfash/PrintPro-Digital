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
    description: 'Bold banners for shop signs, churches, and events.',
    meta: 'Ready under 24 hrs',
    icon: Printer,
  },
  {
    id: 'sav',
    title: 'Self-Adhesive Vinyl (SAV)',
    description: 'Sharp stickers for walls, glass, and cars.',
    meta: 'Perfect for branding spaces',
    icon: Layers,
  },
  {
    id: 'stickers',
    title: 'Window & Clear Stickers',
    description: 'Clean branding that sits perfectly on glass.',
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

export const FAQS: FAQItem[] = [
  {
    question: 'What do you print?',
    answer: 'We specialise in large-format printing, including flex banners, self-adhesive vinyl (SAV), window graphics, wall branding, and clear stickers. Our focus is on high-impact visual prints for brands, businesses, and agencies, rather than small paper items like business cards or flyers.',
  },
  {
    question: 'How much does a banner cost in Lagos?',
    answer: 'Pricing depends on size, material, finishing, and quantity. We keep our rates competitive and transparent — once we know your requirements, we’ll give you a clear quote with no surprises.<br/><br/>📩 <a href="/#contact" class="font-medium text-primary-600 hover:underline">Send your size and use-case to get an instant quote.</a>',
  },
  {
    question: 'Can I get same-day printing in Lagos?',
    answer: 'Yes — same-day printing is available for select jobs, depending on size, material, and production queue. If timing is critical, let us know upfront and we’ll confirm feasibility immediately.',
  },
  {
    question: 'Do you deliver to Lekki, Victoria Island, or Ikeja?',
    answer: 'Yes. We deliver across Lagos, including Lekki, Victoria Island, Ikeja, and surrounding areas. Delivery timelines and costs depend on location and job size, and will be confirmed with your quote.',
  },
  {
    question: 'What file formats do you accept?',
    answer: 'We accept PDF, AI, PSD, and high-resolution JPG/PNG files. For best results, files should be print-ready. If you’re unsure, we can quickly review your design before production.',
  },
  {
    question: 'What banner sizes can you print?',
    answer: 'We print custom sizes based on your needs, from small promotional banners to very large-scale formats. Tell us where the banner will be used, and we’ll recommend the right size and material.',
  },
  {
    question: 'How long does printing take?',
    answer: 'Turnaround depends on job size and finishing, but most projects are completed within 24–72 hours. Urgent jobs can often be prioritised — just let us know your deadline.',
  },
  {
    question: 'Do you offer installation?',
    answer: 'Yes. We offer professional installation for wall branding, window graphics, and other large-format applications within Lagos. Installation can be included as part of your quote.',
  },
];
