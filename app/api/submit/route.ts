import { NextResponse } from 'next/server';
import { surveySchema } from '@/lib/validation';
import { getServiceSupabase } from '@/lib/supabase';

const MIN_FORM_FILL_MS = Number(process.env.MIN_FORM_FILL_MS || '2500');

function mapUseCase(value: string) {
  switch (value) {
    case 'operations':
      return 'Operasyon otomasyonu';
    case 'sales':
      return 'Satış / teklif süreçleri';
    case 'sdlc':
      return 'Yazılım geliştirme (SDLC)';
    case 'cx':
      return 'Müşteri deneyimi';
    case 'decision':
      return 'Karar destek sistemleri';
    default:
      return value;
  }
}

function mapMaturity(value: string) {
  switch (value) {
    case 'none':
      return 'Hiç yok';
    case 'pilot':
      return 'Deneme / pilot aşamasında';
    case 'team':
      return 'Belirli ekiplerde kullanılıyor';
    case 'enterprise':
      return 'Kurum genelinde yaygın';
    default:
      return value;
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = surveySchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Form doğrulaması başarısız.' },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (data.website) {
      return NextResponse.json({ ok: true });
    }

    if (Date.now() - data.startedAt < MIN_FORM_FILL_MS) {
      return NextResponse.json(
        { error: 'Form çok hızlı gönderildi. Lütfen tekrar deneyin.' },
        { status: 400 }
      );
    }

    const supabase = getServiceSupabase();

    const insertPayload = {
      rating: data.rating,
      key_insight: data.keyInsight,
      ai_maturity: mapMaturity(data.aiMaturity),
      desired_use_case: mapUseCase(data.desiredUseCase),
      biggest_challenge: data.biggestChallenge,
      contact_opt_in: data.contactOptIn,
      privacy_accepted: data.privacyAccepted,
      name: data.name || null,
      email: data.email || null,
      phone: data.phone || null,
      company: data.company || null,
      source: 'labs.indigonix.ai',
      submitted_at: new Date().toISOString(),
    };

    const { data: inserted, error } = await supabase
      .from('survey_responses')
      .insert(insertPayload)
      .select('id, submitted_at')
      .single();

    if (error) {
      throw error;
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.N8N_WEBHOOK_SECRET
            ? { 'x-webhook-secret': process.env.N8N_WEBHOOK_SECRET }
            : {}),
        },
        body: JSON.stringify({
          id: inserted.id,
          ...insertPayload,
        }),
      }).catch(() => null);
    }

    return NextResponse.json({ ok: true, id: inserted.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Yanıt kaydedilemedi. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    );
  }
}
