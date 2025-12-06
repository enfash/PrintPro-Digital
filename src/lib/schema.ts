import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg", 
  "image/jpg", 
  "image/png", 
  "image/webp", 
  "application/pdf", 
  "application/postscript", // .ai
  "image/vnd.adobe.photoshop" // .psd
];

export const categories = ["Flex & SAV Banners", "Window Graphics", "3D Signage & Lettering", "Other"] as const;

export const contactFormSchema = z.object({
  customerName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Please select a service category." }),
  }),
  orderDescription: z.string().min(10, { message: "Description must be at least 10 characters." }),
  additionalNotes: z.string().optional(),
  file: z
    .any()
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
    .refine(
      (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
      "Accepted formats: JPG, PNG, PDF, AI, PSD."
    ),
  suggestedReferenceName: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
