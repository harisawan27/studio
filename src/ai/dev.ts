import { config } from 'dotenv';
config();

import '@/ai/flows/generate-explanations-from-upload.ts';
import '@/ai/flows/generate-practice-questions-from-upload.ts';
import '@/ai/flows/summarize-uploaded-content.ts';
import '@/ai/flows/generate-revision-prompts.ts';