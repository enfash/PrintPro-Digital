'use client';

import React, { useState, useRef, useEffect, useActionState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2, Upload, X, MessageCircle, CheckCircle, Phone, Mail, FileCheck, Sparkles, HelpCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WHATSAPP_LINK, PHONE_DISPLAY, EMAIL_DISPLAY } from '@/lib/constants';
import TermsModal from '../modals/TermsModal';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/lib/actions';
import { ACCEPTED_FILE_TYPES } from '@/lib/schema';
import { suggestOrderTemplate } from '@/ai/flows/order-reference-suggestion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const initialFormState = {
  success: false,
  message: '',
  errors: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        'Request a Quote'
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
    <section id="contact" className="py-16 lg:py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4 inline-block relative group cursor-default">
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
              <div className="pt-6 border-t border-slate-100 space-y-4">
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

      if (selectedFile.size > MAX_FILE_SIZE) {
        const largeFileWhatsappLink = `https://wa.me/2348022247567?text=${encodeURIComponent(`Hi BOMedia, I'm trying to send a large file (${(selectedFile.size / 1024 / 1024).toFixed(1)}MB) for my order.`)}`;
        
        toast({
          variant: "default",
          title: "File size notice",
          description: (
            <div className="flex flex-col gap-2 text-foreground">
                <p>
                  Uploads are limited to <strong>25MB</strong>. Please send larger files via <a href={largeFileWhatsappLink} target="_blank" rel="noopener noreferrer" className="text-primary-600 underline font-medium">WhatsApp</a> or WeTransfer, then share the link in the message box.
                </p>
                <p className="text-xs text-slate-500">You can still submit your request.</p>
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

      if (!ACCEPTED_FILE_TYPES.includes(selectedFile.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a JPG, PNG, PDF, AI, PSD, or CDR file.",
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let isValid = true;
    let firstInvalidField: HTMLElement | null = null;
    
    const fieldsToValidate = [
      { ref: nameRef, condition: !nameRef.current?.value },
      { ref: phoneRef, condition: !phoneRef.current?.value },
      { ref: jobTypeRef, condition: !jobTypeRef.current?.value },
      { ref: messageRef, condition: !messageRef.current?.value || messageRef.current.value.length < 10 }
    ];

    fieldsToValidate.forEach(field => {
      if (field.condition) {
        isValid = false;
        shakeField(field.ref.current);
        if (!firstInvalidField) {
            firstInvalidField = field.ref.current;
        }
      }
    });
    
    if (!isValid) {
      e.preventDefault(); // Prevent form submission
      firstInvalidField?.focus();
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
              <select ref={jobTypeRef} name="jobType" id="jobType" defaultValue="" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white appearance-none focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all">
                <option value="" disabled>Select a job type</option>
                <option>Flex Banner</option>
                <option>Self-Adhesive Vinyl (SAV)</option>
                <option>Window / Clear Sticker</option>
                <option>Other</option>
              </select>
              {state.errors?.jobType && <p className="text-xs text-red-600">{state.errors.jobType[0]}</p>}
            </div>

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
            </div>

            <div className="flex items-start gap-3 pt-2 pb-1">
              <div className="flex h-6 items-center">
                <input name="agreeToTerms" id="agreeToTerms" type="checkbox" defaultChecked={true} className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600 cursor-pointer" />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="agreeToTerms" className="text-slate-600 cursor-pointer select-none">
                  By submitting artwork, you agree to BOMedia's{' '}
                  <button type="button" onClick={() => setShowTermsModal(true)} className="text-primary-700 hover:text-primary-800 underline font-medium">Terms of Service</button>.
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
      </div>
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
    </TooltipProvider>
  );
}

export default Contact;
