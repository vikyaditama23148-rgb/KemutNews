// Menyisipkan data terstruktur (JSON-LD) ke HTML server-side.
// Karakter "<" di-escape supaya teks dari database (judul, dll) tidak bisa
// menutup tag <script> secara tidak sengaja.
export default function JsonLd({ data }) {
  if (!data) return null;
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}