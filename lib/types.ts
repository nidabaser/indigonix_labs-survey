export type SurveyPayload = {
  rating: number;
  keyInsight: string;
  aiMaturity: 'none' | 'pilot' | 'team' | 'enterprise';
  desiredUseCase: 'operations' | 'sales' | 'sdlc' | 'cx' | 'decision';
  biggestChallenge: string;
  contactOptIn: boolean;
  privacyAccepted: boolean;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string; // honeypot
  startedAt: number;
};
