const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MEI", "JUN",
  "JUL", "AGU", "SEP", "OKT", "NOV", "DES",
];

export default function AgendaCard({ item }) {
  const d = new Date(item.event_date);
  const day = Number.isNaN(d.getTime()) ? "--" : String(d.getDate()).padStart(2, "0");
  const month = Number.isNaN(d.getTime()) ? "" : MONTHS[d.getMonth()];

  return (
    <div className="group flex gap-5 border-b border-cream-line py-6 first:pt-0 last:border-b-0">
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-card border border-gold/40 bg-ink text-cream">
        <span className="font-display text-xl font-bold leading-none text-gold">{day}</span>
        <span className="mt-1 text-[10px] font-semibold tracking-wide">{month}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg font-bold leading-snug text-ink group-hover:text-gold-deep">
          {item.title}
        </h3>
        <p className="mt-1.5 text-sm text-stone">
          {item.event_time} · {item.location}
        </p>
        {item.description && (
          <p className="mt-2 text-sm leading-relaxed text-stone-light">{item.description}</p>
        )}
        <button className="mt-3 text-xs font-semibold uppercase tracking-wide text-gold-deep transition hover:text-gold">
          Lihat Detail
        </button>
      </div>
    </div>
  );
}
