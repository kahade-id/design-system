/**
 * Token desain Kahade sebagai objek TypeScript.
 * Untuk pemakaian di luar CSS — mis. React Native, canvas, OG image (next/og),
 * atau inline style. Sumber kebenaran visual tetap tokens.css; file ini
 * mirror nilainya.
 */

export const colors = {
  /** Kuning brand. ATURAN: HANYA untuk mark logo, bukan UI umum. */
  brand: '#FFD200',
  fg: '#000000',
  fg2: '#262626',
  fgMuted: '#525252',
  fgSubtle: '#6B6B6B',
  fgInverse: '#FFFFFF',
  surface: '#FFFFFF',
  surface2: '#F3F4F6',
  surface3: '#E9EAEE',
  surfaceInverse: '#000000',
  line: '#E5E7EB',
  lineStrong: '#D1D5DB',
  lineControl: '#8A8A8A',
  positive: '#15803D',
  positiveSoft: '#ECFDF3',
  caution: '#B45309',
  cautionSoft: '#FFFBEB',
  critical: '#B91C1C',
  criticalSoft: '#FEF2F2',
  /** Alias v0 */
  ink: '#000000',
  /** Alias v0 */
  paper: '#FFFFFF',
} as const;

export const fontFamily =
  '"Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';

/** URL Google Fonts resmi (dimuat via <link>, lihat README). */
export const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap';

export const radii = {
  tag: '6px',
  control: '12px',
  panel: '20px',
  full: '9999px',
  /** Alias v0 */
  xl2: '1rem',
} as const;

export const shadows = {
  soft: '0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px -12px rgb(0 0 0 / 0.12)',
  lift: '0 2px 6px rgb(0 0 0 / 0.04), 0 24px 48px -20px rgb(0 0 0 / 0.22)',
} as const;

export const layout = {
  page: 1200,
  reading: 680,
  narrow: 860,
} as const;
