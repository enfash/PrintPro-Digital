import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {config} from 'dotenv';

config({path: '.env.local'});

const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

export const ai = genkit({
  plugins: [googleAI({apiKey})],
  model: 'googleai/gemini-2.5-flash',
});
