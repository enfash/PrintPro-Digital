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
export const EMAIL_DISPLAY = "info@bomedia.ng";

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
    question: 'What do you print?',
    answer: 'We focus on large-format printing: flex banners, self-adhesive vinyl (SAV), window graphics, wall branding, and clear stickers. We do not print business cards, flyers, books.',
  },
  {
    question: 'How much does a banner cost in Lagos?',
    answer: 'Banner pricing depends on size (measured in square feet), material type, and finishing such as eyelets or lamination. We price per square foot and provide quick quotes once details are shared.',
  },
  {
    question: 'Can I get same-day printing in Lagos?',
    answer: 'Most standard jobs are ready within 4-6 hours after artwork approval. For same-day delivery, contact us early in the morning with your requirements.',
  },
  {
    question: 'Do you deliver to Lekki, Victoria Island, or Ikeja?',
    answer: 'Yes. We deliver across Lagos including Lekki, Victoria Island, Ikeja, Yaba, and Surulere. You can also pick up your order from our location.',
  },
  {
    question: 'What file formats do you accept?',
    answer: 'We accept CDR, PSD, AI, PDF, and high-resolution JPG or PNG files. All artwork should be clear, correctly sized, and print-ready.',
  },
  {
    question: 'What size banners can you print?',
    answer: 'We print large format materials in custom sizes up to several meters wide. Share your exact dimensions and we will confirm if we can handle it.',
  },
  {
    question: 'How long does printing take?',
    answer: 'Most standard jobs are ready within 4-6 hours after artwork approval. Large quantities or complex jobs may take longer.',
  },
  {
    question: 'Do you offer installation?',
    answer: 'We handle printing. Installation can be arranged separately on request, depending on location and job type.',
  },
];

export const CORPORATE_FAQS: FAQItem[] = [
  {
    question: 'Do you handle bulk or repeat corporate jobs?',
    answer: 'Yes. We work with businesses that require bulk printing, repeat orders, and consistent branding across multiple locations.',
  },
  {
    question: 'Can you match previous prints or brand colours?',
    answer: 'Yes. We keep records of past jobs and follow brand guidelines to ensure consistency across reprints.',
  },
  {
    question: 'Do you issue invoices and receipts?',
    answer: 'Yes. Official invoices and payment receipts are issued for all corporate jobs, making it suitable for internal accounting and procurement processes.',
  },
  {
    question: 'What is your turnaround time for bulk orders?',
    answer: 'Turnaround depends on volume and finishing. Timelines are confirmed upfront before production begins, ensuring alignment with your campaign or event schedule.',
  },
  {
    question: 'Can we schedule printing for events or campaigns?',
    answer: 'Yes. Advance scheduling is available for time-sensitive campaigns and events.',
  },
  {
    question: 'Do you work with agencies and resellers?',
    answer: 'Yes. We partner with agencies, designers, and resellers under agreed terms.',
  },
];
