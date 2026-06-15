
import { z } from 'zod';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
export const ACCEPTED_FILE_TYPES = [
  "image/jpeg", 
  "image/jpg", 
  "image/png", 
  "image/webp", 
  "application/pdf", 
  "application/postscript", // .ai, .eps
  "image/vnd.adobe.photoshop", // .psd
  "application/x-coreldraw", // .cdr
  "image/tiff", // .tiff, .tif
  "image/x-eps",
  "application/eps"
];
const ACCEPTED_FILE_TYPES_STRING = ".jpg, .png, .webp, .pdf, .ai, .psd, .cdr, .eps, and .tiff";


export const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email." }).optional().or(z.literal('')),
  jobType: z.enum(['Flex Banner', 'Self-Adhesive Vinyl (SAV)', 'Window / Clear Sticker', 'Other']),
  width: z.string().optional(),
  height: z.string().optional(),
  unit: z.enum(['ft', 'in']).optional(),
  qty: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  file: z
    .any()
    // A file is optional, so if it's falsy or has a size of 0, we're good.
    .refine((file) => !file || file.size === 0 || file.size <= MAX_FILE_SIZE, `Max file size is 25MB.`)
    // If a file is provided, it must be of an accepted type.
    .refine(
      (file) => !file || file.size === 0 || ACCEPTED_FILE_TYPES.includes(file.type) || (file.name && /\.(tiff|tif|eps)$/i.test(file.name)),
      `Only ${ACCEPTED_FILE_TYPES_STRING} files are accepted.`
    ).optional(),
  uploadedFilePath: z.string().optional(),
  uploadedFileName: z.string().optional(),
  uploadedFileSize: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms of service."
  }),
});
