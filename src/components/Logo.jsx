import Link from "next/link";

export default function Logo({ dark = false, compact = false }) {
  return (
    <Link href="/" className="group inline-flex flex-col leading-none">
      <span
        className={`font-display font-bold tracking-tight ${
          compact ? "text-2xl" : "text-3xl md:text-[34px]"
        } ${dark ? "text-cream" : "text-ink"}`}
      >
        KEMUT
        <span className="text-gold">NEWS</span>
      </span>
      <span className="mt-1 h-[2px] w-10 bg-gold transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
