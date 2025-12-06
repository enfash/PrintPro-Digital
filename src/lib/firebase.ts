
// This file is deprecated. Please use src/firebase/config.ts instead.
import { app, db, storage } from '@/firebase/config';

export { app, db, storage };

export default app;

// This is a simplified and potentially problematic way to get the app instance.
// It's here to satisfy the dependency in errors.ts for now.
// A proper solution would involve a shared context or singleton.
export const getFirebase = () => {
  return app;
};
