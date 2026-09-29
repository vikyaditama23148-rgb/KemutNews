import Image from "next/image";
import Link from "next/link";
import { getArticlesByAuthorName } from "@/lib/data";
import NewsCard from "@/components/NewsCard";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kemut-news.vercel.app";
const AUTHOR_NAME = "Viky Aditama";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Viky Aditama — Pimpinan Redaksi",
  description:
    "Profil Viky Aditama, Pimpinan Redaksi KEMUTNEWS, beserta kumpulan artikel yang ditulisnya untuk media informasi keluarga besar KEMUT.",
  alternates: { canonical: `${SITE_URL}/redaksi/pimpinan-redaksi` },
};

export default async function PimpinanRedaksiPage() {
  const articles = await getArticlesByAuthorName(AUTHOR_NAME);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    jobTitle: "Pimpinan Redaksi",
    worksFor: {
      "@type": "Organization",
      name: "KEMUTNEWS",
      url: SITE_URL,
    },
    url: `${SITE_URL}/redaksi/pimpinan-redaksi`,
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
      <nav className="mb-6 text-xs text-brand-secondary">
        <Link href="/" className="hover:text-brand-primary">
          Beranda
        </Link>
        <span className="mx-1.5">/</span>
        <Link href="/redaksi" className="hover:text-brand-primary">
          Redaksi
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-brand-ink">Pimpinan Redaksi</span>
      </nav>

      <div className="grid gap-0 bg-brand-surfaceLowest shadow-sm md:grid-cols-[320px_1fr]">
        <div className="relative aspect-[4/5] overflow-hidden bg-brand-surfaceHigh md:aspect-auto">
          <Image
            src="https://rkwuogwvahvrcpeakpdi.supabase.co/storage/v1/object/public/kemutnews-media/tokoh/1789125107351-1000788557.jpg"
            alt={`${AUTHOR_NAME} — Pimpinan Redaksi KEMUTNEWS`}
            fill
            sizes="(min-width: 768px) 320px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="p-6 md:p-10">
          <span className="inline-block bg-brand-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            Pimpinan Redaksi
          </span>
          <h1 className="mt-3 font-headline text-[32px] font-black leading-tight text-brand-ink md:text-[42px]">
            {AUTHOR_NAME}
          </h1>
          <p className="mt-3 max-w-xl text-[16px] italic leading-relaxed text-brand-secondary">
            Bertanggung jawab penuh atas arah editorial, standar jurnalistik, dan kualitas setiap
            kabar yang dipublikasikan KEMUTNEWS.
          </p>

          <div className="prose-kemut mt-6 max-w-2xl border-t border-brand-outlineVariant/40 pt-6">
            <p>
              Sebagai Pimpinan Redaksi, {AUTHOR_NAME} memimpin arah pemberitaan KEMUTNEWS sejak
              platform ini didirikan — memastikan setiap kabar, kegiatan, dan cerita keluarga
              besar KEMUT terdokumentasikan dengan akurat, hangat, dan bertanggung jawab.
            </p>
            <p>
              Di bawah kepemimpinannya, redaksi KEMUTNEWS berkomitmen menjaga independensi
              editorial, mendorong regenerasi kontributor dari kalangan muda KEMUT, serta terus
              memperkuat peran KEMUTNEWS sebagai ruang dokumentasi dan silaturahmi digital bagi
              seluruh anggota keluarga besar KEMUT.
            </p>
          </div>
        </div>
      </div>

      {/* Artikel yang ditulis langsung oleh Viky Aditama */}
      <section className="mt-12">
        <div className="mb-6 flex items-center gap-2 border-b border-brand-outlineVariant/40 pb-3">
          <span className="h-2.5 w-2.5 bg-brand-primary" />
          <h2 className="font-headline text-lg font-bold uppercase tracking-tight text-brand-ink">
            Artikel oleh {AUTHOR_NAME}
          </h2>
        </div>

        {articles.length === 0 ? (
          <p className="py-8 text-center text-sm text-brand-secondary">
            Belum ada artikel yang ditulis atas nama {AUTHOR_NAME}. Artikel akan otomatis muncul
            di sini begitu kolom &ldquo;Nama Penulis&rdquo; di Admin Panel diisi persis{" "}
            &ldquo;{AUTHOR_NAME}&rdquo;.
          </p>
        ) : (
          <div className="grid gap-px bg-brand-outlineVariant/30 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </section>

      {/* Structured data — membantu Google memahami identitas penulis/redaksi */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}