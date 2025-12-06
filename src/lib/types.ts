import type { LucideIcon } from 'lucide-react';

export interface NavItem {
    label: string;
    href: string;
}

export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    meta: string;
    icon: LucideIcon;
}

export interface TimelineStep {
    id: number;
    title: string;
    description: string;
    icon: LucideIcon;
}

export interface GalleryItem {
    id: number;
    imageUrl: string;
    caption: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

// This interface is no longer used in contact.tsx
// but kept for potential future reference or other components.
export interface ContactFormData {
    name: string;
    phone: string;
    email: string;
    jobType: 'Flex Banner' | 'Self-Adhesive Vinyl (SAV)' | 'Window / Clear Sticker' | 'Other';
    message: string;
    file: File | null;
}
