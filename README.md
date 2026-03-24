# Indigonix Labs Event Survey

QR kodla açılan, keynote sonu anket ve opsiyonel lead toplama uygulaması.

Bu proje şu akış için tasarlandı:

**QR → labs.indigonix.ai → Next.js form → Supabase DB → local n8n → Google Sheets / e-posta bildirimi**

## İçerik

- Mobil uyumlu 3 adımlı anket arayüzü
- KVKK aydınlatma metni sayfası taslağı
- Next.js API route ile sunucu tarafı kayıt
- Supabase SQL şeması
- n8n workflow JSON örneği
- Vercel + GitHub ile hızlı yayın akışı

---

## 1) Kullanılan teknoloji

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase
- n8n (local veya server)

---

## 2) Kurulum

### Gerekenler

- Node.js 20+
- npm veya pnpm
- GitHub hesabı
- Vercel hesabı
- Supabase hesabı
- İsteğe bağlı: local n8n

### Projeyi başlat

```bash
npm install
npm run dev
```

Tarayıcıda aç:

```bash
http://localhost:3000
```

---

## 3) Supabase kurulumu

### 3.1 Yeni proje oluştur

Supabase üzerinde yeni bir project aç.

### 3.2 SQL çalıştır

Supabase SQL Editor içine `supabase/schema.sql` dosyasının içeriğini yapıştır ve çalıştır.

Bu tabloyu oluşturur:

- `survey_responses`

### 3.3 Environment değerlerini al

Supabase Project Settings içinden şunları kopyala:

- Project URL
- anon public key
- service role key

---

## 4) Environment variables

`.env.example` dosyasını `.env.local` olarak kopyala.

```bash
cp .env.example .env.local
```

Sonra doldur:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
N8N_WEBHOOK_URL=
N8N_WEBHOOK_SECRET=
MIN_FORM_FILL_MS=2500
```

### Notlar

- `SUPABASE_SERVICE_ROLE_KEY` sadece server tarafında kullanılır.
- Bu anahtarı kesinlikle client tarafına koyma.
- `N8N_WEBHOOK_URL` boş bırakılırsa uygulama çalışır; sadece n8n bildirimi göndermez.

---

## 5) Çalışma mantığı

Form gönderildiğinde:

1. `/api/submit` endpoint’i çağrılır
2. Zod ile validasyon yapılır
3. Honeypot alanı kontrol edilir
4. Çok hızlı gönderimler bot ihtimaline karşı reddedilir
5. Veri Supabase tablosuna yazılır
6. `N8N_WEBHOOK_URL` varsa n8n’e ek payload gönderilir

---

## 6) n8n local kurulum

### En kolay yol: Docker

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```

Sonra paneli aç:

```bash
http://localhost:5678
```

### Workflow import

- `n8n-workflow.json` dosyasını import et
- Webhook node’un URL’sini al
- Bu URL’yi `.env.local` içindeki `N8N_WEBHOOK_URL` alanına yaz
- Google Sheets ve SMTP credential’larını kendi hesabınla bağla

### Önemli not

İlk aşamada local n8n yeterlidir. Ama production’da 7/24 çalışan akışlar için n8n’i kalıcı bir server veya VPS üstüne taşımak daha doğru olur.

---

## 7) Google Sheets görünümü

n8n workflow içindeki Google Sheets node’unu kendi sheet’inle eşleştir.

Önerilen kolonlar:

- submitted_at
- rating
- key_insight
- ai_maturity
- desired_use_case
- biggest_challenge
- contact_opt_in
- name
- email
- phone
- company

Böylece DB ana kaynak olur, Sheets operasyonel liste olarak kullanılır.

---

## 8) GitHub'a yükleme

```bash
git init
git add .
git commit -m "Initial survey app"
```

GitHub’da yeni repo açtıktan sonra:

```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

---

## 9) Vercel deployment

### 9.1 Import project

- Vercel dashboard → Add New Project
- GitHub repo’nu seç
- Framework: Next.js olarak otomatik algılanır

### 9.2 Environment variables gir

Vercel Project Settings → Environment Variables kısmına `.env.local` içindeki tüm değerleri ekle.

Özellikle:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `N8N_WEBHOOK_URL`
- `N8N_WEBHOOK_SECRET`
- `MIN_FORM_FILL_MS`

Production URL’n hazır olduktan sonra:

- `NEXT_PUBLIC_APP_URL=https://labs.indigonix.ai` olarak güncelle
- yeniden deploy et

---

## 10) Domain bağlama

Vercel içinde bu projeye `labs.indigonix.ai` domain’ini bağla.

Adımlar:

1. Vercel Project → Settings → Domains
2. `labs.indigonix.ai` ekle
3. DNS tarafında gerekli CNAME / A kayıtlarını Vercel’in verdiği şekilde tanımla

---

## 11) QR kod üretimi

QR kodun hedefi şu olsun:

```text
https://labs.indigonix.ai
```

Etkinlik slaydında kısa bir CTA kullan:

> Sunuma 60 saniyelik katkınızı bırakın.
> QR’ı okutun, görüşünüzü paylaşın.

İstersen daha sonra bu repo içine özel bir QR üretim scripti de ekleyebilirsin.

---

## 12) KVKK, etik ve güvenlik önerileri

Bu repo içinde bir **taslak** KVKK sayfası var. Yayına almadan önce hukuk danışmanı ile nihai hale getirmeniz gerekir.

### Minimum checklist

- Aydınlatma metni yayınla
- İletişim iznini ayrı checkbox olarak tut
- Veri minimizasyonu uygula
- İletişim alanlarını opsiyonel bırak
- Saklama süresi belirle
- Silme / anonimleştirme süreci tanımla
- Vercel + HTTPS kullan
- Supabase erişimlerini sınırla
- Service role key’i sadece server-side kullan
- n8n arayüzünü public açık bırakma
- Google Sheets erişimini sınırlı tut

### Ek güvenlik iyileştirmeleri

İstersen sonraki sürümde şunları ekleyebilirsin:

- Cloudflare Turnstile
- rate limiting (Upstash Redis vb.)
- audit logging
- admin dashboard
- CRM entegrasyonu

---

## 13) Event sonrası CRM geçişi

Bu yapı CRM kararı verilmeden önce veri toplamak için tasarlandı.

Event başarılı olursa:

- Supabase’ten export al
- n8n ile HubSpot / Pipedrive / Zoho entegrasyonu ekle
- sadece `contact_opt_in = true` olan kayıtları CRM’e gönder

---

## 14) Dosya yapısı

```text
app/
  api/submit/route.ts
  kvkk/page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  SurveyForm.tsx
lib/
  supabase.ts
  types.ts
  validation.ts
supabase/
  schema.sql
n8n-workflow.json
.env.example
README.md
```

---

## 15) Geliştirme önerileri

Bir sonraki sürümde şunları ekleyebilirsin:

1. admin panel
2. filtreleme ve export ekranı
3. QR kampanya parametreleri (`?event=kamu-yz-2026`)
4. çok dilli destek
5. CRM entegrasyonu
6. analytics dashboard

---

## 16) Sık yapılan hatalar

### Form kayıt olmuyor

Kontrol et:
- Supabase env değişkenleri doğru mu?
- SQL tablo oluşturuldu mu?
- Vercel env’ler production ortamına eklendi mi?

### n8n bildirim gitmiyor

Kontrol et:
- `N8N_WEBHOOK_URL` doğru mu?
- workflow active mi?
- local n8n internete açık mı, yoksa sadece local mi?

### Local n8n Vercel’den tetiklenmiyor

Bu normal olabilir. Çünkü local makinendeki `localhost` adresi Vercel tarafından erişilemez.

Çözüm seçenekleri:
- geçici test için ngrok / Cloudflare Tunnel kullan
- ya da n8n’i public erişilebilir bir server’a taşı

Bu yüzden production’da local n8n yerine erişilebilir bir endpoint daha sağlıklı olur.

---

## 17) Canlıya çıkmadan önce son kontrol listesi

- [ ] Supabase tablo oluşturuldu
- [ ] Env değerleri doldu
- [ ] Vercel deploy başarılı
- [ ] Domain bağlandı
- [ ] Form submit test edildi
- [ ] KVKK metni güncellendi
- [ ] n8n webhook test edildi
- [ ] Google Sheets append test edildi
- [ ] E-posta bildirimi test edildi
- [ ] QR kod test edildi
- [ ] Mobil test yapıldı

---

## 18) Kısa karar özeti

Bu mimaride:

- **Supabase = ana kayıt sistemi**
- **n8n = otomasyon katmanı**
- **Google Sheets = operasyonel görünüm**
- **Vercel = hızlı deployment**

Bu sayede önce hızlıca veri toplamaya başlar, event başarılı olursa daha sonra CRM entegrasyonuna geçersin.
