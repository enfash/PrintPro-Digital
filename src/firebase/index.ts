
import { app } from './config';

export * from './config';
export * from './errors';
export * from './error-emitter';

// Helper function to retrieve the initialized firebase app instance.
export function getFirebase() {
    return app;
}
