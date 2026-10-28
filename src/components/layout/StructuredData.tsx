import { clinic, siteUrl } from '@/data/clinic';

/**
 * JSON-LD (schema.org/Dentist). Só é renderizado quando
 * clinic.verifiedForPublication === true e os dados essenciais existem —
 * nunca publicamos dados estruturados com informações não verificadas.
 */
export function StructuredData() {
  const { address, contact } = clinic;
  const ok = clinic.verifiedForPublication && contact.phone && address.street && address.zip && siteUrl;
  if (!ok) return null;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: clinic.name,
    url: siteUrl,
    telephone: contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: clinic.city,
      addressRegion: clinic.state,
      postalCode: address.zip,
      addressCountry: 'BR',
    },
    ...(address.lat && address.lng ? { geo: { '@type': 'GeoCoordinates', latitude: address.lat, longitude: address.lng } } : {}),
    ...(clinic.hours ? { openingHours: clinic.hours.map((h) => `${h.days} ${h.hours}`) } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
