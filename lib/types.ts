export type SurveyPayload = {
  rating: number;
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
  desiredUseCase: 'operations' | 'sales' | 'sdlc' | 'cx' | 'decision';
  biggestChallenge: 'data' | 'security' | 'roi' | 'infrastructure' | 'governance';
  contactOptIn: boolean;
  privacyAccepted: boolean;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string; // honeypot
  startedAt: number;
};
