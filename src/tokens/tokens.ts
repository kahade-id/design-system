/**
 * Token desain Kahade sebagai objek TypeScript.
 * Untuk pemakaian di luar CSS — mis. React Native, canvas, atau inline style.
 * Sumber kebenaran visual tetap tokens.css; file ini mirror nilainya.
 */

export const colors = {
  /** Kuning brand. ATURAN: HANYA untuk mark logo, bukan UI umum. */
  brand: '#FFD200',
  ink: '#000000',
  paper: '#FFFFFF',
} as const;

export const fontFamily =
  '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif';

export const radii = {
  /** Radius kartu */
  xl2: '1rem',
} as const;

export const shadows = {
  soft: '0 1px 2px rgb(0 0 0 / 0.04), 0 4px 16px rgb(0 0 0 / 0.06)',
  lift: '0 2px 4px rgb(0 0 0 / 0.05), 0 12px 32px rgb(0 0 0 / 0.10)',
} as const;
