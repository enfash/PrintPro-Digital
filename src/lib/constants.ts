import {
  Printer,
  Layers,
  Scan,
  MessageSquare,
  FileCheck,
  Truck
} from 'lucide-react';
import { NavItem, ServiceItem, TimelineStep, GalleryItem, FAQItem } from './types';

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

export const HERO_IMAGES: string[] = [
  '/images/hero/1.png',
  '/images/hero/2.png',
  '/images/hero/3.png',
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, imageUrl: '/images/gallery/1.png', caption: 'Shopfront flex banner' },
  { id: 2, imageUrl: '/images/gallery/2.png', caption: 'Window branding' },
  { id: 3, imageUrl: '/images/gallery/3.png', caption: 'Event back-drop banner' },
  { id: 4, imageUrl: '/images/gallery/4.png', caption: 'Clear sticker details' },
  { id: 5, imageUrl: '/images/gallery/5.png', caption: 'SAV Wall wrap' },
  { id: 6, imageUrl: '/images/gallery/6.png', caption: 'Roll-up banner stand' },
];

export const FAQS: FAQItem[] = [
  {
    question: 'What types of printing do you specialize in?',
    answer: 'We focus on large-format printing, which includes flex banners, self-adhesive vinyl (SAV) for branding, window graphics, wall wraps, and clear stickers. We do not print small items like business cards, flyers, or books.',
  },
  {
    question: 'Do you handle bulk orders for businesses?',
    answer: 'Yes, absolutely. We handle both one-off jobs and large-volume projects for brands, agencies, and growing businesses. We issue official invoices and can schedule production for campaigns or events.',
  },
  {
    question: 'How fast is your turnaround time?',
    answer: 'Most standard jobs are ready within 4-6 hours after artwork approval. For same-day delivery, it is best to contact us early in the morning with your print-ready files.',
  },
  {
    question: 'What areas in Lagos do you deliver to?',
    answer: 'We deliver to all locations across Lagos, including Lekki, Victoria Island, Ikeja, Yaba, and Surulere. You can also pick up your order directly from us.',
  },
  {
    question: 'What file format is best for printing?',
    answer: 'For the best quality, we recommend providing your artwork in CorelDRAW (CDR), Adobe Photoshop (PSD), Adobe Illustrator (AI), or high-resolution PDF formats. We also accept clear JPG and PNG files.',
  },
  {
    question: 'How are your print jobs priced?',
    answer: 'Our prices are based on the material type and the total size in square meters. We provide an instant quote as soon as you share the job details with us.',
  },
  {
    question: 'Do you offer installation for printed materials?',
    answer: 'Our primary service is printing. However, installation for items like SAV and window graphics can be arranged separately upon request, depending on the location and complexity of the job.',
  },
];
