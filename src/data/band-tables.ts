/**
 * Official IELTS raw-score-to-band conversion tables.
 * Source: publicly available IELTS band score descriptors.
 *
 * Each table maps a raw score (0–40) to a band score (1.0–9.0).
 */

export function listeningBand(raw: number): string {
  if (raw >= 39) return '9.0';
  if (raw >= 37) return '8.5';
  if (raw >= 35) return '8.0';
  if (raw >= 32) return '7.5';
  if (raw >= 30) return '7.0';
  if (raw >= 26) return '6.5';
  if (raw >= 23) return '6.0';
  if (raw >= 18) return '5.5';
  if (raw >= 16) return '5.0';
  if (raw >= 13) return '4.5';
  if (raw >= 10) return '4.0';
  if (raw >= 6) return '3.5';
  if (raw >= 4) return '3.0';
  return '2.5';
}

export function readingAcademicBand(raw: number): string {
  if (raw >= 39) return '9.0';
  if (raw >= 37) return '8.5';
  if (raw >= 35) return '8.0';
  if (raw >= 33) return '7.5';
  if (raw >= 30) return '7.0';
  if (raw >= 27) return '6.5';
  if (raw >= 23) return '6.0';
  if (raw >= 19) return '5.5';
  if (raw >= 15) return '5.0';
  if (raw >= 13) return '4.5';
  if (raw >= 10) return '4.0';
  if (raw >= 6) return '3.5';
  if (raw >= 4) return '3.0';
  return '2.5';
}

export function readingGTBand(raw: number): string {
  if (raw >= 40) return '9.0';
  if (raw >= 39) return '8.5';
  if (raw >= 37) return '8.0';
  if (raw >= 36) return '7.5';
  if (raw >= 34) return '7.0';
  if (raw >= 32) return '6.5';
  if (raw >= 30) return '6.0';
  if (raw >= 27) return '5.5';
  if (raw >= 23) return '5.0';
  if (raw >= 19) return '4.5';
  if (raw >= 15) return '4.0';
  if (raw >= 12) return '3.5';
  if (raw >= 8) return '3.0';
  return '2.5';
}
