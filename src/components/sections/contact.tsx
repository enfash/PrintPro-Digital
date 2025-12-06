
'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormValues, categories } from '@/lib/schema';
import { getSuggestedReference, handleFormSubmission, type FormState } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Loader2, Upload, File as FileIcon, X } from 'lucide-react';

const initialState: FormState = null;

export default function Contact() {
  const [formState, formAction] = useFormState(handleFormSubmission, initialState);
  const [isAiPending, startAiTransition] = useTransition();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      customerName: '',
      email: '',
      category: undefined,
      orderDescription: '',
      additionalNotes: '',
      suggestedReferenceName: '',
      file: undefined,
    },
  });

  const { watch, setValue } = form;
  const file = watch('file');

  useEffect(() => {
    if (formState?.message) {
      if (formState.issues) {
        toast({
          title: 'Oops! Something went wrong.',
          description: formState.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success!',
          description: formState.message,
        });
        form.reset();
        formRef.current?.reset();
      }
    }
  }, [formState, toast, form]);

  const handleSuggestClick = () => {
    startAiTransition(async () => {
      const { customerName, orderDescription } = form.getValues();
      const result = await getSuggestedReference({ customerName, orderDescription });
      if (result.suggestion) {
        form.setValue('suggestedReferenceName', result.suggestion);
        toast({
          title: 'Suggestion Ready!',
          description: 'An AI-powered reference name has been generated for you.',
        });
      } else if (result.error) {
        toast({
          title: 'Suggestion Failed',
          description: result.error,
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-primary-50">
      <div className="container px-4 md:px-6">
        <Card className="max-w-3xl mx-auto shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline">Request a Quote</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you with a personalized quote as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form ref={formRef} action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="customerName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl><Input placeholder="e.g., Tunde Adebayo" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="orderDescription" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Description</FormLabel>
                    <FormControl><Textarea placeholder="Describe your project, including dimensions, quantity, and materials if known." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="additionalNotes" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl><Textarea placeholder="Any other details? e.g., deadline, specific instructions..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="space-y-2">
                  <FormLabel>Artwork / File (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={(e) => setValue('file', e.target.files?.[0])}
                      name="file"
                    />
                  </FormControl>
                  {!file ? (
                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload File
                    </Button>
                  ) : (
                    <div className="flex items-center justify-between rounded-md border border-input p-2">
                      <div className="flex items-center gap-2">
                        <FileIcon className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium truncate max-w-xs">{file.name}</span>
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => setValue('file', undefined)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">Max file size: 10MB. Accepted formats: JPG, PNG, PDF, AI, PSD.</p>
                  <FormMessage>{form.formState.errors.file?.message as string}</FormMessage>
                </div>


                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h4 className="font-semibold">AI Order Reference</h4>
                          <p className="text-sm text-muted-foreground">Let our AI suggest a unique reference for your order files.</p>
                        </div>
                        <Button type="button" variant="secondary" onClick={handleSuggestClick} disabled={isAiPending}>
                          {isAiPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Sparkles className="mr-2 h-4 w-4 text-accent" />
                          )}
                          Suggest Reference
                        </Button>
                      </div>
                       <FormField control={form.control} name="suggestedReferenceName" render={({ field }) => (
                          <FormItem>
                            <FormControl><Input placeholder="Suggestion will appear here..." {...field} disabled /></FormControl>
                          </FormItem>
                        )} />
                    </div>
                  </CardContent>
                </Card>
                
                <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Request
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
