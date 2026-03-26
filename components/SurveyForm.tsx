'use client';

import { useMemo, useState } from 'react';
import type { SurveyPayload } from '@/lib/types';

const ratingLabels: Record<number, string> = {
  1: 'En düşük',
  2: 'Düşük',
  3: 'Orta',
  4: 'Yüksek',
  5: 'En yüksek',
};

const maturityOptions = [
  { value: 'none', label: 'Hiç yok' },
  { value: 'pilot', label: 'Deneme / pilot aşamasında' },
  { value: 'team', label: 'Belirli ekiplerde kullanılıyor' },
  { value: 'enterprise', label: 'Kurum genelinde yaygın' },
] as const;

const useCaseOptions = [
  { value: 'operations', label: 'Operasyon otomasyonu' },
  { value: 'sales', label: 'Satış / teklif süreçleri' },
  { value: 'sdlc', label: 'Yazılım geliştirme (SDLC)' },
  { value: 'cx', label: 'Müşteri deneyimi' },
  { value: 'decision', label: 'Karar destek sistemleri' },
] as const;

const keyInsightCategoryOptions = [
  { value: 'orchestration', label: 'Ajan orkestrasyonu ve görev dağılımı' },
  { value: 'memory', label: 'Uzun süreli bellek ve bağlam yönetimi' },
  { value: 'tools', label: 'Araç entegrasyonu ve API kullanımı' },
  { value: 'rag', label: 'Retrieval-Augmented Generation (RAG)' },
  { value: 'workflow', label: 'Çok adımlı iş akışı tasarımı' },
  { value: 'safety', label: 'Güvenlik ve insan denetimi (Human-in-the-loop)' },
  { value: 'frameworks', label: 'Framework karşılaştırması (LangGraph, AutoGen, CrewAI...)' },
] as const;

const biggestChallengeOptions = [
  { value: 'data', label: 'Veri' },
  { value: 'security', label: 'Güvenlik' },
  { value: 'roi', label: 'ROI' },
  { value: 'infrastructure', label: 'Altyapı' },
  { value: 'governance', label: 'Governance' },
] as const;

function makeEmptyPayload(): SurveyPayload {
  return {
    rating: 5,
    keyInsight: '',
    keyInsightCategory: 'orchestration',
    aiMaturity: 'pilot',
    desiredUseCase: 'operations',
    biggestChallenge: 'data',
    contactOptIn: false,
    privacyAccepted: false,
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    ratingNote: '',
    aiMaturityNote: '',
    desiredUseCaseNote: '',
    biggestChallengeNote: '',
    startedAt: Date.now(),
  };
}

export function SurveyForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<SurveyPayload>(makeEmptyPayload);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const progress = useMemo(() => {
    if (success) return 100;
    return step === 1 ? 33 : step === 2 ? 66 : 100;
  }, [step, success]);

  function update<K extends keyof SurveyPayload>(key: K, value: SurveyPayload[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function validateStep(currentStep: number) {
    if (currentStep === 1) {
      if (!form.privacyAccepted) {
        setError('Devam etmek için aydınlatma metnini okuduğunuzu onaylayın.');
        return false;
      }
    }

    if (currentStep === 3) {
      if (form.contactOptIn) {
        const hasContact = !!(form.name?.trim() || form.email?.trim() || form.phone?.trim());
        if (!hasContact) {
          setError('İletişim iznini seçtiniz; lütfen en az bir iletişim bilgisi (ad, e-posta veya telefon) girin.');
          return false;
        }
      }
    }

    setError(null);
    return true;
  }

  async function handleSubmit() {
    if (!validateStep(3)) return;
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Gönderim sırasında bir hata oluştu.');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-3xl border border-indigoLine bg-indigoCard/90 p-8 shadow-glow">
        <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full rounded-full bg-indigoAccent" />
        </div>
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigoAccent/20 text-3xl">✓</div>
          <h2 className="text-2xl font-semibold">Teşekkürler</h2>
          <p className="text-sm leading-6 text-slate-300">
            Yanıtınız başarıyla kaydedildi. Etkinlik içeriğini geliştirmek ve talep eden katılımcılarla iletişime geçmek için kullanılacaktır.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-indigoLine bg-indigoCard/90 p-6 shadow-glow sm:p-8">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-slate-400">
          <span>INDIGONIX LABS SURVEY</span>
          <span>%{progress}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-indigoAccent transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-indigoMint">1 / 3</p>
            <h2 className="mt-2 text-2xl font-semibold">Kısa bilgilendirme</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Bu form, etkinlik içeriğini geliştirmek ve dileyen katılımcılarla iletişime geçmek amacıyla hazırlanmıştır.
              İletişim alanları opsiyoneldir.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
            <p className="font-medium text-white">Kişisel veri kullanımı</p>
            <p className="mt-2">
              Anket yanıtları hizmet geliştirme, toplu analiz ve talep eden kişilerle iletişim kurma amacıyla işlenir.
              Detaylar için <a href="/kvkk" className="text-indigoMint underline underline-offset-4">aydınlatma metnini</a> inceleyebilirsiniz.
            </p>
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
              checked={form.privacyAccepted}
              onChange={(e) => update('privacyAccepted', e.target.checked)}
            />
            <span>Aydınlatma metnini okudum ve verilerimin belirtilen amaçlarla işlenebileceğini anladım.</span>
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-indigoMint">2 / 3</p>
            <h2 className="mt-2 text-2xl font-semibold">Anket soruları</h2>
          </div>

          {/* Soru 1 — Puanlama */}
          <div>
            <label className="mb-3 block text-sm font-medium">Bu sunumu ne kadar faydalı buldunuz?</label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => update('rating', value)}
                  className={`flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-sm font-medium transition ${
                    form.rating === value
                      ? 'border-indigoAccent bg-indigoAccent/20 text-white'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-indigoAccent/40'
                  }`}
                >
                  <span className="text-base font-semibold">{value}</span>
                  <span className="text-[10px] leading-tight text-slate-400">{ratingLabels[value]}</span>
                </button>
              ))}
            </div>
            <textarea
            rows={2}
            value={form.ratingNote ?? ''}
            onChange={(e) => update('ratingNote', e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500"
            placeholder="Kısa bir not bırakabilirsiniz (Opsiyonel)"
          />
          </div>

          {/* Soru 2 — En değerli öğrenim (dropdown + textarea) */}
          <div>
            <label className="mb-3 block text-sm font-medium">Bugün öğrendiğiniz en değerli şey neydi?</label>
            <select
              value={form.keyInsightCategory}
              onChange={(e) => update('keyInsightCategory', e.target.value as SurveyPayload['keyInsightCategory'])}
              className="mb-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
            >
              {keyInsightCategoryOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-900">
                  {option.label}
                </option>
              ))}
            </select>
            <textarea
              rows={3}
              value={form.keyInsight}
              onChange={(e) => update('keyInsight', e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500"
              placeholder="Kısa bir not bırakabilirsiniz (Opsiyonel)"
            />
          </div>

          {/* Soru 3 — AI Olgunluk */}
          <div>
            <label className="mb-3 block text-sm font-medium">Kurumunuzda AI kullanımı hangi seviyede?</label>
            <div className="grid gap-3">
              {maturityOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                  <input
                    type="radio"
                    name="aiMaturity"
                    checked={form.aiMaturity === option.value}
                    onChange={() => update('aiMaturity', option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            <textarea
            rows={2}
            value={form.aiMaturityNote ?? ''}
            onChange={(e) => update('aiMaturityNote', e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500"
            placeholder="Kısa bir not bırakabilirsiniz (Opsiyonel)"
          />
          </div>

          {/* Soru 4 — Kullanım alanı */}
          <div>
            <label className="mb-3 block text-sm font-medium">Agentic AI'yi en çok hangi alanda kullanmak isterdiniz?</label>
            <select
              value={form.desiredUseCase}
              onChange={(e) => update('desiredUseCase', e.target.value as SurveyPayload['desiredUseCase'])}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
            >
              {useCaseOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-900">
                  {option.label}
                </option>
              ))}
            </select>
            <textarea
            rows={2}
            value={form.desiredUseCaseNote ?? ''}
            onChange={(e) => update('desiredUseCaseNote', e.target.value)}
            className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500"
            placeholder="Kısa bir not bırakabilirsiniz (Opsiyonel)"
          />
          </div>

          {/* Soru 5 — En büyük engel (dropdown) */}
          <div>
            <label className="mb-3 block text-sm font-medium">Sizin için en büyük engel nedir?</label>
            <select
              value={form.biggestChallenge}
              onChange={(e) => update('biggestChallenge', e.target.value as SurveyPayload['biggestChallenge'])}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
            >
              {biggestChallengeOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-900">
                  {option.label}
                </option>
              ))}
            </select>
            <textarea
            rows={2}
            value={form.biggestChallengeNote ?? ''}
            onChange={(e) => update('biggestChallengeNote', e.target.value)}
            className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500"
            placeholder="Kısa bir not bırakabilirsiniz (Opsiyonel)"
          />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-indigoMint">3 / 3</p>
            <h2 className="mt-2 text-2xl font-semibold">İletişim bilgileri (opsiyonel)</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Demo, workshop veya pilot görüşmesi için size geri dönüş yapmamızı isterseniz iletişim bilgilerinizi bırakabilirsiniz.
            </p>
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
              checked={form.contactOptIn}
              onChange={(e) => update('contactOptIn', e.target.checked)}
            />
            <span>Benimle iletişime geçilmesini kabul ediyorum.</span>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500"
              placeholder="Ad Soyad"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500"
              placeholder="E-posta"
            />
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500"
              placeholder="0(5xx)xxxx"
            />
            <input
              type="text"
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500"
              placeholder="Kurum / Şirket"
            />
          </div>

          <input
            type="text"
            value={form.website}
            onChange={(e) => update('website', e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
        </div>
      )}

      {error && <p className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            setError(null);
            setStep((current) => Math.max(1, current - 1));
          }}
          disabled={step === 1 || submitting}
          className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Geri
        </button>

        {step < 3 ? (
          <button
            type="button"
            onClick={() => {
              if (validateStep(step)) setStep((current) => current + 1);
            }}
            className="rounded-2xl bg-indigoAccent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Devam et
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-2xl bg-indigoAccent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Gönderiliyor...' : 'Yanıtı gönder'}
          </button>
        )}
      </div>
    </div>
  );
}
