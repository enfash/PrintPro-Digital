
'use client';

import React, { useState, useRef, useTransition, useEffect } from 'react';
import { useFormState, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Upload, X, MessageCircle, CheckCircle, AlertCircle, Phone, Mail, FileCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { WHATSAPP_LINK, PHONE_DISPLAY, EMAIL_DISPLAY } from '@/lib/constants';
import TermsModal from '../modals/TermsModal';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { ContactFormSchema } from '@/lib/schema';
import { submitContactForm } from '@/lib/actions';

type ContactFormData = z.infer<typeof ContactFormSchema>;

const initialFormState = {
  success: false,
  message: '',
  errors: undefined,
};

const SubmitButton = () => {
  const { pending } = useFormState(submitContactForm, initialFormState);
  return (
    <Button
      type="submit"
      size="lg"
      className="w-full"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        'Get Price'
      )}
    </Button>
  );
};

const Contact: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [formState, formAction] = useFormState(submitContactForm, initialFormState);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      jobType: 'Flex Banner',
      message: '',
      file: undefined,
      agreeToTerms: true,
    }
  });

  useEffect(() => {
    if (formState.success) {
      setIsSuccess(true);
      reset();
      setFile(null);
    } else if (formState.message && !formState.success) {
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: formState.message,
        });
    }
  }, [formState, reset, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setValue('file', selectedFile, { shouldValidate: true });
      setFile(selectedFile);
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setFile(null);
    setValue('file', undefined, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resetFormState = () => {
    setIsSuccess(false);
    reset();
  }

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                Start your order
              </h2>
              <p className="text-lg text-slate-600">
                Send us your artwork and details. We will reply fast with a price.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <Button asChild size="lg" className="w-full sm:w-auto gap-2 !bg-green-600 hover:!bg-green-700">
                  <Link href={WHATSAPP_LINK} target="_blank">
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
                  <span className="font-medium">{PHONE_DISPLAY}</span>
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

          <div className="bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
            {isSuccess && (
              <div className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center text-center p-8 z-20 animate-bounce-in">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Sent!</h3>
                <p className="text-slate-600 mb-6">
                  We have received your details. Our team will review and send you a price shortly.
                </p>
                <Button onClick={resetFormState} variant="outline">
                  Send another request
                </Button>
              </div>
            )}
            
            <form ref={formRef} action={formAction} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">Name <span className="text-red-500">*</span></label>
                  <input {...register("name")} id="name" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" placeholder="Your name" />
                  {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone <span className="text-red-500">*</span></label>
                  <input {...register("phone")} id="phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" placeholder="080..." />
                  {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email (Optional)</label>
                <input {...register("email")} id="email" type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="jobType" className="text-sm font-medium text-slate-700">Job Type <span className="text-red-500">*</span></label>
                <select {...register("jobType")} id="jobType" defaultValue="Flex Banner" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white appearance-none focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all">
                  <option>Flex Banner</option>
                  <option>Self-Adhesive Vinyl (SAV)</option>
                  <option>Window / Clear Sticker</option>
                  <option>Other</option>
                </select>
                {errors.jobType && <p className="text-xs text-red-600">{errors.jobType.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">Message <span className="text-red-500">*</span></label>
                <textarea {...register("message")} id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none" placeholder="Size, quantity, deadline, any notes..." />
                {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="file-input" className="text-sm font-medium text-slate-700">Upload artwork (Optional)</label>
                <div className="relative group">
                  <input type="file" id="file-input" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
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
                 {errors.file && <p className="text-xs text-red-600">{errors.file.message as string}</p>}
              </div>

              <div className="flex items-start gap-3 pt-2 pb-1">
                <div className="flex h-6 items-center">
                  <input {...register("agreeToTerms")} id="agreeToTerms" type="checkbox" defaultChecked={true} className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600 cursor-pointer" />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="agreeToTerms" className="text-slate-600 cursor-pointer select-none">
                    By submitting artwork, you agree to BOMedia's{' '}
                    <button type="button" onClick={() => setShowTermsModal(true)} className="text-primary-700 hover:text-primary-800 underline font-medium">Terms of Service</button>.
                  </label>
                </div>
              </div>
               {errors.agreeToTerms && <p className="text-xs text-red-600">{errors.agreeToTerms.message}</p>}

              <SubmitButton />
            </form>
          </div>
        </div>
      </div>
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
    </section>
  );
};

export default Contact;
