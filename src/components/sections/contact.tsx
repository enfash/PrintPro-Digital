'use client';

import React, { useState, useRef, useEffect, useActionState, useTransition } from 'react';
import { useFormStatus, createPortal } from 'react-dom';
import { Loader2, Upload, X, MessageCircle, CheckCircle, Phone, Mail, FileCheck, Sparkles, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/firebase/config';
import { WHATSAPP_LINK, PHONE_DISPLAY, EMAIL_DISPLAY } from '@/lib/constants';
import TermsModal from '../modals/TermsModal';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/lib/actions';
import { ACCEPTED_FILE_TYPES } from '@/lib/schema';
import { suggestOrderTemplate } from '@/ai/flows/order-reference-suggestion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";



const initialFormState = {
  success: false,
  message: '',
  errors: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" className="group w-full bg-[#2e388d] text-white hover:bg-[#434c98] transition-colors duration-300" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          Request a Quote
          <svg 
            className="ml-2 w-4 h-4 overflow-visible" 
            viewBox="0 0 14 14" 
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g fillRule="evenodd">
              <path 
                className="transition-all duration-300 ease-in-out origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100" 
                d="M0 7h7" 
              />
              <path 
                className="transition-all duration-300 ease-in-out group-hover:translate-x-[2px]" 
                d="M1 3l4 4-4 4" 
              />
            </g>
          </svg>
        </>
      )}
    </Button>
  );
}


const Contact: React.FC = () => {
  // We use a key to force re-mounting the form, which is the cleanest way to reset it
  const [formKey, setFormKey] = useState(Date.now());

  const handleTrackedClick = (location: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'whatsapp_click', {
        location: location,
        page: window.location.pathname,
      });
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-18 bg-white scroll-mt-16">
      <div className="site-container px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-2 inline-block relative group cursor-default">
                Start your order
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </h2>
              <p className="text-lg text-slate-600">
                Send us your artwork and details. We will reply fast with a price.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <Button asChild size="lg" className="w-full sm:w-auto gap-2 !bg-green-600 hover:!bg-green-700">
                  <Link 
                    href={WHATSAPP_LINK} 
                    target="_blank"
                    onClick={() => handleTrackedClick('contact_whatsapp')}
                  >
                    <MessageCircle size={20} />
                    Chat on WhatsApp
                  </Link>
                </Button>
                <p className="text-xs text-slate-500 mt-2 text-center sm:text-left">Available 9am–6pm, Mon–Sat</p>
              </div>
              <div className="pt-6 border-t border-slate-100 space-y-6">
                

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-slate-700">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary-600">
                      <Phone size={20} />
                  </div>
                  <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`} className="font-medium hover:text-primary-600 transition-colors">
                    {PHONE_DISPLAY}
                  </a>
                </div>
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary-600">
                    <Mail size={20} />
                  </div>
                  <a href={`mailto:${EMAIL_DISPLAY}`} className="font-medium hover:text-primary-600 transition-colors">
                    {EMAIL_DISPLAY}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
          
          <ContactForm key={formKey} onReset={() => setFormKey(Date.now())} />

        </div>
      </div>
    </section>
  );
};

const ContactForm: React.FC<{ onReset: () => void }> = ({ onReset }) => {
  const [state, formAction] = useActionState(submitContactForm, initialFormState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Create refs for all required fields
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const jobTypeRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Client-side Firebase Storage upload state
  const [mounted, setMounted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [bytesUploaded, setBytesUploaded] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  const [uploadedFileDetails, setUploadedFileDetails] = useState<{ path: string; name: string; size: string } | null>(null);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== 'undefined') {
      const handleSearchParams = () => {
        const params = new URLSearchParams(window.location.search);
        const service = params.get('service');
        if (service) {
          let matchedJob = '';
          let messagePrefill = '';
          
          if (service === 'Flex Banners' || service === 'Flex Banner') {
            matchedJob = 'Flex Banner';
          } else if (service === 'Roll-ups' || service === 'Roll-up') {
            matchedJob = 'Other';
            messagePrefill = 'Hi BOMedia, I would like to get a quote for Roll-up banners. ';
          } else if (service === 'Stickers & Vinyl' || service === 'SAV') {
            matchedJob = 'Self-Adhesive Vinyl (SAV)';
          } else if (service === 'Vehicle Branding') {
            matchedJob = 'Other';
            messagePrefill = 'Hi BOMedia, I would like to get a quote for Vehicle Branding. ';
          } else if (service === 'Wall & Office Graphics') {
            matchedJob = 'Other';
            messagePrefill = 'Hi BOMedia, I would like to get a quote for Wall & Office Graphics. ';
          }
          
          if (matchedJob) {
            setSelectedJob(matchedJob);
            if (jobTypeRef.current) {
              jobTypeRef.current.value = matchedJob;
            }
            if (messagePrefill && messageRef.current && !messageRef.current.value) {
              messageRef.current.value = messagePrefill;
            }
          }
        }
      };
      
      setTimeout(handleSearchParams, 50);
      window.addEventListener('popstate', handleSearchParams);
      window.addEventListener('hashchange', handleSearchParams);
      return () => {
        window.removeEventListener('popstate', handleSearchParams);
        window.removeEventListener('hashchange', handleSearchParams);
      };
    }
  }, []);

  // Added state for cost calculation
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [unit, setUnit] = useState<'ft' | 'in'>('ft');
  const [qty, setQty] = useState<string>('1');

  // Calculation Logic
  const materialPrices: Record<string, number> = {
    'Flex Banner': 250,
    'Self-Adhesive Vinyl (SAV)': 300,
  };

  const calculateCost = () => {
    if (selectedJob === 'Window / Clear Sticker' || selectedJob === 'Other') return null; // On request only
    if (!materialPrices[selectedJob]) return null;

    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const q = parseInt(qty) || 1;

    if (w <= 0 || h <= 0 || q <= 0) return 0;

    let sqft = w * h;
    if (unit === 'in') {
      sqft = sqft / 144;
    }

    return sqft * materialPrices[selectedJob] * q;
  };

  const rawTotal = calculateCost();
  const isCalculated = rawTotal !== null && rawTotal > 0;
  const finalTotal = isCalculated && rawTotal! < 5000 ? 5000 : rawTotal;


  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Request Sent!',
        description: 'We have received your details. Our team will review and send you a price shortly.',
      });
      // Do not reset form here, the success UI is shown instead
    } else if (state.message && !state.success && !state.errors) {
      // This will now only show for server-side errors, not validation errors.
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: state.message,
      });
    }
  }, [state, toast]);

  const getJobTypeFolder = (jobType: string): string => {
    switch (jobType) {
      case 'Flex Banner': return 'flex-banner';
      case 'Self-Adhesive Vinyl (SAV)': return 'sav';
      case 'Window / Clear Sticker': return 'window-clear-sticker';
      default: return 'other';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

      setUploadedFileDetails(null);
      if (fileInputRef.current) {
        fileInputRef.current.disabled = false;
      }

      if (selectedFile.size > MAX_FILE_SIZE) {
        const largeFileWhatsappLink = `https://wa.me/2348022247567?text=${encodeURIComponent(`Hi BOMedia, I'm trying to send a large file (${(selectedFile.size / 1024 / 1024).toFixed(1)}MB) for my order.`)}`;
        
        toast({
          variant: "default",
          title: "File exceeds 25MB limit",
          description: (
            <div className="flex flex-col gap-2 text-foreground">
                <p className="text-sm">
                  Uploads are limited to <strong>25MB</strong>. For larger files, please submit this request and send your artwork separately via:
                </p>
                <ul className="list-disc pl-4 text-xs space-y-1">
                  <li>📧 Email: <a href="mailto:info@bomedia.com.ng" className="text-primary-600 underline font-medium">info@bomedia.com.ng</a></li>
                  <li>🔗 <a href="https://wetransfer.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline font-medium">WeTransfer</a> (share the link in the message box)</li>
                  <li>💬 <a href={largeFileWhatsappLink} target="_blank" rel="noopener noreferrer" className="text-primary-600 underline font-medium">WhatsApp</a></li>
                </ul>
                <p className="text-xs text-slate-500 mt-1">We cleared the file field so you can proceed with submitting details.</p>
            </div>
          ),
          duration: 10000,
        });

        // Clear the file input but allow the form to be submitted.
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setFile(null);
        return;
      }

      const fileExt = selectedFile.name.split('.').pop()?.toLowerCase();
      const isAcceptedType = ACCEPTED_FILE_TYPES.includes(selectedFile.type) || (fileExt && ['tiff', 'tif', 'eps', 'ai', 'psd', 'cdr'].includes(fileExt));

      if (!isAcceptedType) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a JPG, PNG, PDF, AI, PSD, CDR, EPS, or TIFF file.",
        });
        // Clear the input value
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const shakeField = (el: HTMLElement | null) => {
    if (!el) return;
    el.classList.add('animate-shake');
    setTimeout(() => {
      el.classList.remove('animate-shake');
    }, 500);
  };

  const handleSuggestion = () => {
    const jobTypeEl = jobTypeRef.current;
    if (!jobTypeEl || !jobTypeEl.value) {
      shakeField(jobTypeEl);
      if (jobTypeEl) jobTypeEl.focus();
      return;
    }
    
    startTransition(async () => {
      const jobType = jobTypeEl.value;
      const customerDraft = messageRef.current?.value || '';
      
      try {
        const result = await suggestOrderTemplate({ jobType, customerDraft });
        if (messageRef.current) {
          messageRef.current.value = result.suggestedTemplate;
          // Focus and place cursor at the end
          messageRef.current.focus();
          messageRef.current.setSelectionRange(result.suggestedTemplate.length, result.suggestedTemplate.length);
        }
      } catch (error) {
        console.error("AI suggestion failed:", error);
        toast({
          variant: "destructive",
          title: "Suggestion Failed",
          description: "Could not generate a message template at this time.",
        });
      }
    });
  };

  const clearFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setFile(null);
    setUploadedFileDetails(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.disabled = false;
    }
  };

  useEffect(() => {
    if (uploadedFileDetails && formRef.current) {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.disabled = true;
      }
      formRef.current.requestSubmit();
    }
  }, [uploadedFileDetails]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 1. Validation
    let isValid = true;
    let firstInvalidField: HTMLElement | null = null;
    
    const fieldsToValidate = [
      { ref: nameRef, condition: !nameRef.current?.value },
      { ref: phoneRef, condition: !phoneRef.current?.value },
      { ref: jobTypeRef, condition: !jobTypeRef.current?.value },
      { ref: messageRef, condition: !messageRef.current?.value || messageRef.current.value.length < 10 }
    ];

    for (const field of fieldsToValidate) {
      if (field.condition) {
        isValid = false;
        shakeField(field.ref.current);
        if (!firstInvalidField) {
            firstInvalidField = field.ref.current;
        }
      }
    }
    
    if (!isValid) {
      e.preventDefault(); // Prevent form submission
      firstInvalidField?.focus();
      return;
    }

    // 2. Client-side Upload Interception (if file is present and not uploaded yet)
    if (file && !uploadedFileDetails) {
      e.preventDefault(); // Intercept HTML form submission

      setUploading(true);
      setUploadProgress(0);
      setBytesUploaded(0);
      setTotalBytes(file.size);

      try {
        const jobTypeFolder = getJobTypeFolder(selectedJob);
        // Cryptographically random 6-char hex reference ID
        const refId = Array.from(crypto.getRandomValues(new Uint8Array(3)))
          .map(b => b.toString(16).padStart(2, '0').toUpperCase())
          .join('');
        const filePath = `submissions/${jobTypeFolder}/${refId}-${file.name}`;
        const storageRef = ref(storage, filePath);

        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setUploadProgress(progress);
              setBytesUploaded(snapshot.bytesTransferred);
            },
            (error) => {
              console.error('Firebase upload error:', error);
              reject(error);
            },
            () => {
              resolve();
            }
          );
        });

        setUploadedFileDetails({
          path: filePath,
          name: file.name,
          size: file.size.toString(),
        });
      } catch (error) {
        setUploading(false);
        toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: 'Failed to upload your design file. Please try again or submit without a file.',
        });
      }
    }
  };

  return (
    <TooltipProvider>
      <div className="bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-center min-h-[660px]">
        {state.success ? (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Request sent</h3>
            <p className="text-slate-600 mb-6 max-w-sm">
                We’ll review your details and get back to you shortly.
            </p>
            <Button onClick={onReset} variant="outline">
                Send another request
            </Button>
          </div>
        ) : (
          <form ref={formRef} action={formAction} onSubmit={handleFormSubmit} className="space-y-4">
            <input type="hidden" name="uploadedFilePath" value={uploadedFileDetails?.path || ''} />
            <input type="hidden" name="uploadedFileName" value={uploadedFileDetails?.name || ''} />
            <input type="hidden" name="uploadedFileSize" value={uploadedFileDetails?.size || ''} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-medium text-slate-700">Name <span className="text-red-500">*</span></label>
                <input ref={nameRef} name="name" id="name" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" placeholder="Your name" />
                {state.errors?.name && <p className="text-xs text-red-600">{state.errors.name[0]}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone <span className="text-red-500">*</span></label>
                <input ref={phoneRef} name="phone" id="phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" placeholder="080..." />
                {state.errors?.phone && <p className="text-xs text-red-600">{state.errors.phone[0]}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">Email (Optional)</label>
              <input name="email" id="email" type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
              {state.errors?.email && <p className="text-xs text-red-600">{state.errors.email[0]}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="jobType" className="text-sm font-medium text-slate-700">Job Type <span className="text-red-500">*</span></label>
              <div className="relative">
                <select 
                  ref={jobTypeRef} 
                  name="jobType" 
                  id="jobType" 
                  defaultValue="" 
                  onChange={(e) => setSelectedJob(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-200 bg-white appearance-none focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="" disabled>Select a job type</option>
                  <option>Flex Banner</option>
                  <option>Self-Adhesive Vinyl (SAV)</option>
                  <option>Window / Clear Sticker</option>
                  <option>Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {state.errors?.jobType && <p className="text-xs text-red-600">{state.errors.jobType[0]}</p>}
            </div>

            {selectedJob && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">Dimensions & Quantity <span className="text-xs font-normal text-slate-500 ml-1">(Optional)</span></span>
                  <div className="flex items-center bg-slate-200 p-0.5 rounded-md">
                    <button type="button" onClick={() => setUnit('ft')} className={`px-3 py-1 rounded text-xs font-medium transition-all ${unit === 'ft' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>ft</button>
                    <button type="button" onClick={() => setUnit('in')} className={`px-3 py-1 rounded text-xs font-medium transition-all ${unit === 'in' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>in</button>
                  </div>
                  <input type="hidden" name="unit" value={unit} />
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-medium">Width ({unit})</label>
                    <input type="number" min="0" step="any" name="width" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g. 10" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-medium">Height ({unit})</label>
                    <input type="number" min="0" step="any" name="height" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g. 8" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-500 font-medium">Quantity</label>
                    <input type="number" min="1" name="qty" value={qty} onChange={(e) => setQty(e.target.value)} className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 outline-none" placeholder="1" />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 mt-3 flex items-center justify-between">
                  <span className="text-sm text-slate-600 font-medium">Estimated Cost:</span>
                  {rawTotal === null ? (
                    <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">On Request Only</span>
                  ) : (
                    <div className="text-right">
                      <span className="text-lg font-bold text-slate-900">₦{finalTotal?.toLocaleString(undefined, { maximumFractionDigits: 0 }) || 0}</span>
                      {isCalculated && rawTotal! < 5000 && (
                        <div className="text-[10px] text-slate-500 mt-0.5 max-w-[200px] leading-tight text-right">
                          Note: Minimum print order is ₦5,000 to cover production costs.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                 <label htmlFor="message" className="text-sm font-medium text-slate-700">Message <span className="text-red-500">*</span></label>
                 <div className="flex items-center gap-1">
                   <Button type="button" variant="ghost" size="sm" onClick={handleSuggestion} disabled={isPending} className="text-xs text-primary-600 hover:text-primary-700 h-auto px-2 py-1">
                     {isPending ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Sparkles className="mr-1 h-3 w-3" />}
                     Help me write this
                   </Button>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-3 w-3 text-slate-400 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs text-center" side="top">
                            <p className="text-xs">Refines your message using AI based on your selected job type. No personal data is used.</p>
                        </TooltipContent>
                    </Tooltip>
                 </div>
              </div>
              <textarea ref={messageRef} name="message" id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none" placeholder="Size, quantity, deadline, any notes..." />
              {state.errors?.message && <p className="text-xs text-red-600">{state.errors.message[0]}</p>}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="file-input" className="text-sm font-medium text-slate-700">Upload artwork (Optional, 25MB Max)</label>
              <div className="relative group">
                <input type="file" id="file-input" name="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                <label htmlFor="file-input" className={`flex items-center justify-center w-full px-4 py-4 border-2 border-dashed rounded-xl cursor-pointer bg-white transition-all ${file ? 'border-primary-500 bg-primary-50/50 text-primary-700' : 'border-slate-300 text-slate-500 hover:border-primary-400 hover:bg-slate-50'}`}>
                  {file ? (
                    <div className="flex items-center w-full justify-between">
                      <div className="flex items-center overflow-hidden">
                        <FileCheck className="mr-2 h-5 w-5 flex-shrink-0" />
                        <span className="truncate font-medium">{file.name}</span>
                        <span className="ml-2 text-xs opacity-70 flex-shrink-0">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <button onClick={clearFile} className="p-1 hover:bg-white rounded-full transition-colors ml-2"><X size={16} /></button>
                    </div>
                  ) : (
                    <><Upload className="mr-2 h-5 w-5" /><span className="truncate">Choose a file to upload</span></>
                  )}
                </label>
              </div>
              {state.errors?.file && <p className="text-xs text-red-600">{state.errors.file[0]}</p>}

              {file && (
                <div className="mt-3 p-4 bg-slate-100/80 rounded-xl border border-slate-200/60 backdrop-blur-sm space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                    Artwork Pre-flight Checklist
                  </div>
                  <p className="text-xs text-slate-500 leading-normal mb-1">
                    Please confirm that your file meets these settings for the best print quality:
                  </p>
                  <div className="grid grid-cols-1 gap-2 text-xs text-slate-700">
                    <label className="flex items-start gap-2 cursor-pointer select-none">
                      <input type="checkbox" defaultChecked className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                      <span>🎨 <strong>CMYK Color Mode:</strong> Prevent color shifts by exporting in CMYK rather than RGB.</span>
                    </label>
                    <label className="flex items-start gap-2 cursor-pointer select-none">
                      <input type="checkbox" defaultChecked className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                      <span>🔤 <strong>Convert Text to Outlines/Curves:</strong> Prevents missing font issues.</span>
                    </label>
                    <label className="flex items-start gap-2 cursor-pointer select-none">
                      <input type="checkbox" defaultChecked className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                      <span>📐 <strong>Resolution (150+ DPI) & Scale:</strong> Keeps your print crisp and clear.</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-start gap-3 pt-2 pb-1">
              <div className="flex h-6 items-center">
                <input name="agreeToTerms" id="agreeToTerms" type="checkbox" defaultChecked={true} className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600 cursor-pointer" />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="agreeToTerms" className="text-slate-600 cursor-pointer select-none">
                  By submitting artwork, you agree to BOMedia's{' '}
                  <Button type="button" variant="link" onClick={() => setShowTermsModal(true)} className="p-0 h-auto text-primary-700 hover:text-primary-800 font-medium">Terms of Service</Button>.
                </label>
              </div>
            </div>
            {state.errors?.agreeToTerms && <p className="text-xs text-red-600">{state.errors.agreeToTerms[0]}</p>}

            <SubmitButton />

            <p className="text-xs text-slate-500 text-center pt-2">
              We’ll review your details and respond shortly. See our <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.
            </p>
          </form>
        )}

        {uploading && mounted && createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md transition-all duration-300">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-sm w-full mx-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 animate-pulse">
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Uploading Artwork...</h4>
                  <p className="text-xs text-slate-500">Please keep this tab open.</p>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#2e388d] rounded-full transition-all duration-300 ease-out" 
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>{uploadProgress}%</span>
                  <span>
                    {(bytesUploaded / 1024 / 1024).toFixed(1)} MB of {(totalBytes / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
    </TooltipProvider>
  );
}

export default Contact;
