const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

const MONTHS_LONG = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const DAYS_LONG = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

// Semua tanggal di KEMUTNEWS ditampilkan dalam zona waktu WIB (Asia/Jakarta),
// terlepas dari zona waktu server yang menjalankan situs ini (Vercel berjalan
// di UTC secara default). Ini mencegah tanggal terbit "mundur satu hari"
// untuk artikel yang dipublikasikan tengah malam WIB.
function getJakartaParts(date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const map = {};
  for (const part of parts) {
    map[part.type] = part.value;
  }

  const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(map.weekday);

  return {
    year: Number(map.year),
    month: Number(map.month) - 1, // 0-indexed, biar konsisten dengan array bulan di atas
    day: Number(map.day),
    weekday: weekdayIndex,
    hour: map.hour,
    minute: map.minute,
  };
}

export function formatDate(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "";
  const p = getJakartaParts(d);
  return `${p.day} ${MONTHS[p.month]} ${p.year}`;
}

export function formatDateLong(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "";
  const p = getJakartaParts(d);
  return `${DAYS_LONG[p.weekday]}, ${p.day} ${MONTHS_LONG[p.month]} ${p.year}`;
}

export function formatDateTime(isoDate) {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "";
  const p = getJakartaParts(d);
  return `${p.day} ${MONTHS[p.month]} ${p.year}, ${p.hour}:${p.minute} WIB`;
}

export function formatReadingTime(minutes) {
  if (!minutes) return "3 menit baca";
  return `${minutes} menit baca`;
}

export function formatDuration(seconds) {
  if (!seconds) return "";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}