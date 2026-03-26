export type SurveyPayload = {
  rating: number;
  ratingNote?: string;
  keyInsight: string;
  keyInsightCategory:
    | 'orchestration'
    | 'memory'
    | 'tools'
    | 'rag'
    | 'workflow'
    | 'safety'
    | 'frameworks';
  aiMaturity: 'none' | 'pilot' | 'team' | 'enterprise';
  aiMaturityNote?: string;
  desiredUseCase: 'operations' | 'sales' | 'sdlc' | 'cx' | 'decision';
  desiredUseCaseNote?: string;
  biggestChallenge: 'data' | 'security' | 'roi' | 'infrastructure' | 'governance';
  biggestChallengeNote?: string;
  contactOptIn: boolean;
  privacyAccepted: boolean;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string; // honeypot
  startedAt: number;
};
