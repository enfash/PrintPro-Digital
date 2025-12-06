
export * from './config';
export * from './errors';
export * from './error-emitter';

// This is a placeholder. In a real app, you would have a more robust
// way of getting the initialized firebase app instance.
export function getFirebase() {
    // Note: This is a simplified example. In a real app, you would
    // likely use a React Context or a singleton pattern to manage the
    // Firebase app instance.
    const { app } = require('@/lib/firebase');
    return app;
}
