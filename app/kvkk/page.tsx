export default function KvkkPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-indigoLine bg-indigoCard/90 p-8 shadow-glow">
        <p className="text-xs uppercase tracking-[0.22em] text-indigoMint">Aydınlatma Metni Taslağı</p>
        <h1 className="mt-2 text-3xl font-semibold">KVKK bilgilendirmesi</h1>

        <div className="mt-6 space-y-6 text-sm leading-7 text-slate-300">
          <section>
            <h2 className="text-lg font-medium text-white">1. Veri sorumlusu</h2>
            <p>
              Bu sayfa üzerinden toplanan veriler, etkinlik sonrası içerik geliştirme ve talep eden kişilerle iletişime geçme amacıyla
              Indigonix tarafından işlenir. Buradaki metin bir taslaktır; şirket unvanı, iletişim bilgileri ve resmi saklama süresi
              bilgileri yayına çıkmadan önce hukuk danışmanınızla netleştirilmelidir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white">2. İşlenen veriler</h2>
            <p>
              Anket cevapları, opsiyonel iletişim bilgileri ve gönderim zaman bilgisi işlenebilir. İsim, e-posta, telefon ve şirket adı zorunlu değildir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white">3. İşleme amaçları</h2>
            <p>
              Etkinlik içeriğini geliştirmek, toplu analiz yapmak, ilgi alanlarını anlamak ve açık rıza / iletişim onayı veren kişilerle
              demo, workshop veya benzeri görüşmeler için iletişime geçmek.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white">4. Aktarım ve saklama</h2>
            <p>
              Veriler Supabase veritabanında saklanabilir; operasyonel görünüm için Google Sheets gibi sistemlere aktarılabilir.
              Bu aktarım yalnızca yetkili kişilerce ve belirtilen amaçlarla sınırlı tutulmalıdır. Saklama süresi, işleme amacı ile sınırlı olmalı;
              ihtiyaç bitince veri silinmeli veya anonimleştirilmelidir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white">5. İlgili kişi hakları</h2>
            <p>
              Katılımcılar kendi verilerine ilişkin erişim, düzeltme, silme ve itiraz haklarını ilgili mevzuat kapsamındaki usullerle kullanabilir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white">Önemli not</h2>
            <p>
              Bu metin hukuki danışmanlık yerine geçmez. Canlı kullanıma almadan önce şirketinize uygun nihai metni bir hukuk uzmanıyla gözden geçirmeniz gerekir.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
