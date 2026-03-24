import { z } from 'zod';

export const surveySchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  keyInsight: z.string().trim().min(2).max(1000),
  aiMaturity: z.enum(['none', 'pilot', 'team', 'enterprise']),
  desiredUseCase: z.enum(['operations', 'sales', 'sdlc', 'cx', 'decision']),
  biggestChallenge: z.string().trim().min(2).max(1000),
  contactOptIn: z.boolean().default(false),
  privacyAccepted: z.boolean().refine((value) => value === true, {
    message: 'Aydınlatma metnini okuduğunuzu onaylamanız gerekir.',
  }),
  name: z.string().trim().max(120).optional().or(z.literal('')),
  email: z.string().trim().email().max(180).optional().or(z.literal('')),
  phone: z.string().trim().max(30).optional().or(z.literal('')),
  company: z.string().trim().max(180).optional().or(z.literal('')),
  website: z.string().optional().or(z.literal('')), // honeypot: dolu gelirse route.ts reddeder
  startedAt: z.coerce.number().int(),
});

export type SurveyInput = z.infer<typeof surveySchema>;
