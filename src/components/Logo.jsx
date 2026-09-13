import Link from "next/link";

export default function Logo({ compact = false }) {
  return (
    <Link href="/" className="flex flex-col leading-none">
      <span
        className={`font-headline font-black uppercase tracking-tight text-brand-ink ${
          compact ? "text-2xl" : "text-[28px] md:text-[34px]"
        }`}
      >
        KEMUT<span className="text-brand-primary">NEWS</span>
      </span>
      {!compact && (
        <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-brand-inkVariant">
          Harian Digital • Lugas • Terverifikasi
        </span>
      )}
    </Link>
  );
}