export type LogoTone = 'brand' | 'ink' | 'inverse';

/** Geometri resmi mark Kahade — untuk OG image (next/og), PDF, kanvas. */
export const LOGO_VIEWBOX = '0 0 417.6 512';
export const LOGO_PATHS = [
  'M164.7 248.4 C155.5 215.9 180.8 198.3 206.8 186.5 C257 163.9 336.5 149 378.6 127.8 C430.6 101.7 419.4 61.4 368.9 44 C350.5 37.6 331.7 32.4 313.4 25.9 C286.9 16.6 259.5 6.9 232.2 0 C231.3 55.4 211.7 57.7 166.8 77.2 C137.7 89.8 45.4 120.3 28.3 130.9 C-15 157.8 -7.1 197.4 41.7 213.6 C58 219.1 74.6 223.6 90.9 229 C114.7 237 140 243.8 164.7 248.4Z',
  'M252.9 263.6 C262.1 296.1 236.8 313.7 210.7 325.5 C160.5 348.1 81 363 39 384.2 C-13.1 410.3 -1.8 450.6 48.7 468 C67.1 474.4 85.8 479.6 104.2 486.1 C130.7 495.4 158.1 505.1 185.3 512 C186.2 456.6 205.8 454.3 250.7 434.8 C279.9 422.2 372.2 391.7 389.3 381.1 C432.5 354.2 424.7 314.6 375.9 298.4 C359.5 292.9 343 288.4 326.7 283 C302.9 275 277.6 268.2 252.9 263.6Z',
] as const;

export interface LogoProps {
  size?: number;
  className?: string;
  /** Teks alternatif. Kosongkan ("") bila logo dekoratif (mis. di dalam link berlabel). */
  title?: string;
  /**
   * Warna mark.
   * - `brand`  kuning #FFD200 — di atas permukaan gelap (inverse), ikon aplikasi.
   * - `ink`    hitam — header/footer di permukaan terang (default chrome situs).
   * - `inverse` putih — di atas foto/permukaan gelap bila kuning tidak cocok.
   */
  tone?: LogoTone;
}

const toneFill: Record<LogoTone, string> = {
  brand: '#FFD200',
  ink: '#000000',
  inverse: '#FFFFFF',
};

/**
 * Mark zigzag Kahade. Satu-satunya tempat kuning brand boleh muncul.
 * Jangan digambar ulang, diregangkan, atau diberi efek.
 */
export function Logo({ size = 32, className, title = 'Kahade', tone = 'brand' }: LogoProps) {
  const decorative = title === '';
  return (
    <svg
      width={(size * 417.6) / 512}
      height={size}
      viewBox={LOGO_VIEWBOX}
      fill={toneFill[tone]}
      className={className}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
    >
      {!decorative && <title>{title}</title>}
      {LOGO_PATHS.map((d) => (
        <path key={d.slice(0, 12)} d={d} />
      ))}
    </svg>
  );
}

export interface LogoTileProps {
  size?: number;
  className?: string;
  title?: string;
}

/**
 * Mark kuning di atas ubin hitam — identik dengan ikon aplikasi.
 * Untuk avatar organisasi, OG image, dan titik brand yang butuh warna.
 */
export function LogoTile({ size = 40, className = '', title = 'Kahade' }: LogoTileProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center bg-black ${className}`}
      style={{ width: size, height: size, borderRadius: size * 0.22 }}
    >
      <Logo size={size * 0.62} tone="brand" title={title} />
    </span>
  );
}
