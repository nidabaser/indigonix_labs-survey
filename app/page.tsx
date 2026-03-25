import { SurveyForm } from '@/components/SurveyForm';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-start justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-xl">
        <SurveyForm />
      </div>
    </main>
  );
}
