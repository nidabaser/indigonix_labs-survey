import { SurveyForm } from '@/components/SurveyForm';

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <section className="space-y-6 pt-4 sm:pt-10">
          <div className="inline-flex rounded-full border border-indigoAccent/30 bg-indigoAccent/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-indigoMint">
            QR ile etkinlik anketi
          </div>

          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
              Sunum sonrası içgörü ve talep toplamak için hızlı bir Labs arayüzü
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Agentic AI keynote’unuzun sonunda katılımcıları bu sayfaya yönlendirin. Cevaplar güvenli şekilde veritabanına yazılır,
              opsiyonel olarak local n8n üzerinden Google Sheets ve bildirim akışlarına aktarılır.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-medium text-white">Mobil öncelikli</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">QR koddan açıldığında 60–90 saniyede tamamlanacak şekilde tasarlandı.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-medium text-white">KVKK odaklı</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">Aydınlatma metni, ayrı iletişim izni ve veri minimizasyonu yaklaşımı içerir.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-medium text-white">CRM hazır</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">İleride HubSpot, Pipedrive veya başka bir CRM’e n8n ile kolayca bağlanabilir.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-indigoAccent/20 bg-indigoAccent/10 p-5 text-sm leading-7 text-slate-200">
            <p className="font-medium text-white">Önerilen akış</p>
            <p className="mt-2">
              <span className="text-indigoMint">QR</span> → <span className="text-indigoMint">labs.indigonix.ai</span> → form → Supabase → n8n → Google Sheets / bildirim.
            </p>
          </div>
        </section>

        <section>
          <SurveyForm />
        </section>
      </div>
    </main>
  );
}
