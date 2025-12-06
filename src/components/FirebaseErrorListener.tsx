
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = async (error: FirestorePermissionError) => {
      // In a real app, you might send this to a logging service
      console.error('Firestore Permission Error:', error.toJSON());

      if (process.env.NODE_ENV === 'development') {
        // Throw the error to be caught by the Next.js development overlay
        // This provides the best developer experience for debugging security rules
        const richError = await error.build();
        throw richError;
      } else {
        // In production, show a generic toast to the user
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'You do not have permission to perform this action.',
        });
      }
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, [toast]);

  // This component doesn't render anything itself
  return null;
}
