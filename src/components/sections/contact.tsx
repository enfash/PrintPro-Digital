
'use client';

import React, { useState, useRef } from 'react';
import { Loader2, Upload, X, MessageCircle, CheckCircle, AlertCircle, Phone, Mail, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WHATSAPP_LINK, PHONE_DISPLAY, EMAIL_DISPLAY } from '@/lib/constants';
import TermsModal from '../modals/TermsModal';
import { ContactFormData } from '@/lib/types';
import Link from 'next/link';
import { db, storage } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    jobType: 'Flex Banner',
    message: '',
    file: null
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(true); // Prechecked
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Ref to clear file input after submission
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const maxSize = 25 * 1024 * 1024; // 25MB in bytes

      if (selectedFile.size > maxSize) {
        // File is too large
        setStatus('error');
        setErrorMessage(`File is too large (${(selectedFile.size / 1024 / 1024).toFixed(1)}MB). Maximum size is 25MB. Please use WhatsApp to send larger files.`);
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear the input
        }
        return;
      }

      setFormData(prev => ({ ...prev, file: selectedFile }));
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, file: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeToTerms) {
      setErrorMessage('Please agree to the Terms of Service');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    // Prepare data for Firestore and email
    const submissionData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      jobType: formData.jobType,
      message: formData.message,
      fileName: formData.file?.name || 'N/A',
      fileSize: formData.file?.size || 0,
      submittedAt: new Date(),
    };

    // We will attempt both Firestore write and email sending
    // 1. Add form data to Firestore
    addDoc(collection(db, 'submissions'), submissionData)
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        // Continue to file upload and email sending even if firestore write succeeds
      })
      .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: 'submissions',
          operation: 'create',
          requestResourceData: submissionData,
        });
        errorEmitter.emit('permission-error', permissionError);
        // We can still try to send the email
      });

    // 2. Upload file to Firebase Storage if it exists
    if (formData.file) {
      const fileRef = ref(storage, `uploads/${Date.now()}_${formData.file.name}`);
      await uploadBytes(fileRef, formData.file).catch(err => console.error("File upload failed:", err));
    }
    
    // 3. Use the existing API route to send emails
    const formDataForApi = new FormData();
    formDataForApi.append('name', formData.name);
    formDataForApi.append('phone', formData.phone);
    formDataForApi.append('email', formData.email);
    formDataForApi.append('jobType', formData.jobType);
    formDataForApi.append('message', formData.message);
    if (formData.file) {
      formDataForApi.append('file', formData.file);
    }
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: formDataForApi,
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.details || 'Failed to send email.');
        }

        setStatus('success');
        setFormData({ name: '', phone: '', email: '', jobType: 'Flex Banner', message: '', file: null });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
        console.error('Email sending error:', error);
        setStatus('error');
        let message = 'Failed to send message. Please try WhatsApp instead.';
        if (error instanceof Error) {
            message = error.message;
        }
        setErrorMessage(message);
        setTimeout(() => setStatus('idle'), 5000);
    }
  };

  // Alias for getFirebase, required by errors.ts
  const getFirebase = () => require('@/lib/firebase').default;


  return (
    <section id="contact" className="py-16 lg:py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left Side: Info */}
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

          {/* Right Side: Form */}
          <div className="bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-sm relative overflow-hidden">

            {/* Success Overlay */}
            {status === 'success' && (
              <div className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center text-center p-8 z-20 animate-bounce-in">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Sent!</h3>
                <p className="text-slate-600 mb-6">
                  We have received your details. Our team will review and send you a price shortly.
                </p>
                <Button
                  onClick={() => setStatus('idle')}
                  variant="outline"
                >
                  Send another request
                </Button>
              </div>
            )}

            {/* Error Overlay */}
            {status === 'error' && (
              <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center text-center p-8 z-20 animate-bounce-in">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h3>
                <p className="text-slate-600 mb-6 max-w-xs mx-auto">
                  {errorMessage || 'Unable to send your request at this time.'}
                </p>
                <div className="flex gap-3">
                  <Button onClick={() => setStatus('idle')} variant="secondary">
                    Try Again
                  </Button>
                   <Button asChild variant="default" className="!bg-green-600 hover:!bg-green-700">
                    <Link href={WHATSAPP_LINK} target="_blank">
                      Use WhatsApp
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="080..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email (Optional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="jobType" className="text-sm font-medium text-slate-700">Job Type <span className="text-red-500">*</span></label>
                <select
                  id="jobType"
                  name="jobType"
                  required
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white appearance-none focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="Flex Banner">Flex Banner</option>
                  <option value="Self-Adhesive Vinyl (SAV)">Self-Adhesive Vinyl (SAV)</option>
                  <option value="Window / Clear Sticker">Window / Clear Sticker</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">Message <span className="text-red-500">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Size, quantity, deadline, any notes..."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="file" className="text-sm font-medium text-slate-700">Upload artwork (Optional)</label>
                <div className="relative group">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="file"
                    className={`flex items-center justify-center w-full px-4 py-4 border-2 border-dashed rounded-xl cursor-pointer bg-white transition-all ${formData.file
                      ? 'border-primary-500 bg-primary-50/50 text-primary-700'
                      : 'border-slate-300 text-slate-500 hover:border-primary-400 hover:bg-slate-50'
                      }`}
                  >
                    {formData.file ? (
                      <div className="flex items-center w-full justify-between">
                        <div className="flex items-center overflow-hidden">
                          <FileCheck className="mr-2 h-5 w-5 flex-shrink-0" />
                          <span className="truncate font-medium">{formData.file.name}</span>
                          <span className="ml-2 text-xs opacity-70 flex-shrink-0">
                            ({(formData.file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          onClick={clearFile}
                          className="p-1 hover:bg-white rounded-full transition-colors ml-2"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mr-2 h-5 w-5" />
                        <span className="truncate">Choose a file to upload</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Terms Acknowledgment - Single prechecked checkbox */}
              <div className="flex items-start gap-3 pt-4 pb-2 border-t border-slate-200">
                <div className="flex h-6 items-center">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    required
                    className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600 cursor-pointer"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="agreeToTerms" className="text-slate-600 cursor-pointer select-none">
                    By submitting artwork, you agree to BOMedia's{' '}
                    <button
                      type="button"
                      onClick={() => setShowTermsModal(true)}
                      className="text-primary-700 hover:text-primary-800 underline font-medium"
                    >
                      Terms of Service
                    </button>.
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </div>
                ) : (
                  'Get Price'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
    </section>
  );
};

export default Contact;
