"use client";

export default function NewsletterCTA() {
  return (
    <section className="bg-ink py-16 text-cream md:py-20">
      <div className="container-editorial max-w-2xl text-center">
        <p className="eyebrow mb-3">Satu Keluarga, Banyak Cerita</p>
        <h2 className="font-display text-3xl font-bold leading-tight text-cream md:text-4xl">
          Jadi Bagian dari Setiap Cerita KEMUT
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/60">
          Dapatkan kabar terbaru, agenda kegiatan, dan cerita hangat dari keluarga besar KEMUT
          langsung ke email kamu.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="Alamat email kamu"
            className="w-full rounded-card border border-cream/20 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-card bg-gold px-6 py-3 text-xs font-bold uppercase tracking-wide text-ink transition hover:bg-gold-bright"
          >
            Bergabung
          </button>
        </form>
      </div>
    </section>
  );
}
