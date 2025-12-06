import { UploadCloud, PencilRuler, Rocket, Layers, Image, Palmtree } from 'lucide-react';

export const WHATSAPP_NUMBER = "2348012345678";
export const GREETING_MESSAGE = "Hello BOMedia, I'm interested in your printing services.";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(GREETING_MESSAGE)}`;

export const PHONE_DISPLAY = "0801 234 5678";
export const EMAIL_DISPLAY = "info@bomedia.ng";


export const NAV_LINKS = [
  { href: '/#services', label: 'Services' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#gallery', label: 'Our Work' },
  { href: '/#faq', label: 'FAQs' },
  { href: '/#contact', label: 'Contact' },
];

export const TIMELINE_STEPS = [
  {
    id: 1,
    icon: UploadCloud,
    title: '1. Send Your Artwork',
    description: 'Use our contact form or WhatsApp to upload your design file and tell us what you need—size, quantity, and finish.',
  },
  {
    id: 2,
    icon: PencilRuler,
    title: '2. Review & Approve',
    description: 'We will review your artwork, send you a digital proof and a final price. Once you approve and pay, we start printing.',
  },
  {
    id: 3,
    icon: Rocket,
    title: '3. Receive Your Prints',
    description: 'We print and finish your job with high-quality materials. We then deliver it to your doorstep anywhere in Lagos.',
  },
];


export const FAQS = [
  {
    question: "What's the turnaround time for most jobs?",
    answer:
      "For most standard jobs like flex banners and SAVs, we offer a 4-6 hour turnaround time after artwork approval and payment confirmation. Complex jobs or large quantities might take longer, but we always confirm the timeline with you before starting.",
  },
  {
    question: 'How do I submit my artwork?',
    answer:
      'You can upload your artwork directly through the contact form on our website. If your file is larger than 25MB, please use the WhatsApp button to send it to us directly. We accept files in formats like PDF, AI, PSD, and high-resolution JPEG.',
  },
  {
    question: 'Can you deliver to my office?',
    answer:
      'Yes, we deliver across Lagos State. Whether you are in Lekki, Ikeja, VI, or Surulere, we can get your prints to you. Delivery fees may apply depending on your location, which we will confirm with your quote.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We require full payment before printing begins. We accept direct bank transfers. We will provide payment details with your invoice.',
  },
];

export const CORPORATE_FAQS = [
  {
    question: 'Do you offer discounts for bulk orders?',
    answer:
      'Absolutely. We provide special pricing and discounts for bulk orders and corporate clients with recurring printing needs. Please contact us via the corporate WhatsApp link to discuss your requirements and get a custom quote.',
  },
  {
    question: 'Can you handle branding for a fleet of vehicles?',
    answer:
      'Yes, we specialize in fleet branding. We can produce and install high-quality vehicle wraps and graphics for multiple vehicles, ensuring brand consistency and a professional look across your entire fleet.',
  },
  {
    question: 'What is the process for setting up a corporate account?',
    answer:
      "To set up a corporate account, please get in touch with us through the corporate contact channels. We'll discuss your typical printing volume, and design needs to create a streamlined ordering process and pricing structure for your business.",
  },
  {
    question: 'Can you work with our design agency?',
    answer:
      "Of course. We frequently collaborate with design and marketing agencies to bring their creative visions to life for their clients. We can work directly with your agency to ensure artwork is print-ready and meets all specifications.",
  },
];

export const WHATSAPP_CORPORATE_GREETING = "Hello BOMedia, I'd like to make a corporate/bulk order inquiry.";
export const WHATSAPP_CORPORATE_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_CORPORATE_GREETING)}`;
    
export const SERVICES = [
  {
    id: 1,
    icon: Layers,
    title: 'Flex & SAV Banners',
    description: 'Durable, high-resolution flex and self-adhesive vinyl (SAV) banners for indoor and outdoor advertising.',
    meta: 'Events, Billboards, Signage'
  },
  {
    id: 2,
    icon: Image,
    title: 'Window Graphics',
    description: 'Transform your storefront with custom window decals and graphics that attract customers and enhance your brand.',
    meta: 'Shops, Offices, Restaurants'
  },
  {
    id: 3,
    icon: Palmtree,
    title: '3D Signage & Lettering',
    description: 'Make a bold statement with custom 3D signs and lettering that add depth and professionalism to your space.',
    meta: 'Corporate, Retail, Hospitality'
  },
];
