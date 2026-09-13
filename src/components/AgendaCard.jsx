const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MEI", "JUN",
  "JUL", "AGU", "SEP", "OKT", "NOV", "DES",
];

export default function AgendaCard({ item }) {
  const d = new Date(item.event_date);
  const day = Number.isNaN(d.getTime()) ? "--" : String(d.getDate()).padStart(2, "0");
  const month = Number.isNaN(d.getTime()) ? "" : MONTHS[d.getMonth()];

  return (
    <div className="group flex gap-4 bg-brand-surfaceLowest p-4 shadow-sm">
      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center bg-brand-ink text-white">
        <span className="font-headline text-lg font-bold leading-none text-brand-primaryContainer">{day}</span>
        <span className="mt-1 text-[9px] font-bold tracking-wide">{month}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-headline text-[16px] font-bold leading-snug text-brand-ink group-hover:text-brand-primary">
          {item.title}
        </h3>
        <p className="mt-1 text-[12px] font-semibold text-brand-secondary">
          {item.event_time} · {item.location}
        </p>
        {item.description && (
          <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-brand-secondary/80">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}