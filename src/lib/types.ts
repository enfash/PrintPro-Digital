
export interface ContactFormData {
    name: string;
    phone: string;
    email: string;
    jobType: 'Flex Banner' | 'Self-Adhesive Vinyl (SAV)' | 'Window / Clear Sticker' | 'Other';
    message: string;
    file: File | null;
}

    