/**
 * Peta ekosistem web Kahade — SATU sumber kebenaran untuk semua tautan
 * lintas-situs (header, footer, menu seluler). Ubah di sini, rilis DS,
 * maka ke-7 situs ikut konsisten.
 *
 * Hanya berisi rute yang benar-benar ada. Dilarang menambah URL karangan.
 */

export type KahadeSite =
  | 'home'
  | 'bantuan'
  | 'artikel'
  | 'karir'
  | 'legal'
  | 'status'
  | 'investor';

export interface EcosystemLink {
  label: string;
  href: string;
}

export interface KahadeSiteInfo {
  /** Label produk di samping mark (kosong untuk situs utama). */
  label: string;
  /** Origin situs, tanpa garis miring penutup. */
  origin: string;
  /** Deskripsi satu baris (menu seluler, footer). */
  description: string;
}

export const SITES: Record<KahadeSite, KahadeSiteInfo> = {
  home: {
    label: '',
    origin: 'https://kahade.id',
    description: 'Aplikasi social commerce dengan transaksi terlindungi',
  },
  bantuan: {
    label: 'Bantuan',
    origin: 'https://bantuan.kahade.id',
    description: 'Panduan, FAQ, dan kontak layanan pelanggan',
  },
  artikel: {
    label: 'Artikel',
    origin: 'https://artikel.kahade.id',
    description: 'Cerita, panduan, dan kabar dari Kahade',
  },
  karir: {
    label: 'Karir',
    origin: 'https://karir.kahade.id',
    description: 'Lowongan dan cara bergabung dengan tim',
  },
  legal: {
    label: 'Legal',
    origin: 'https://legal.kahade.id',
    description: 'Dokumen resmi, kebijakan, dan ketentuan',
  },
  status: {
    label: 'Status',
    origin: 'https://status.kahade.id',
    description: 'Kondisi operasional layanan Kahade',
  },
  investor: {
    label: 'Investor',
    origin: 'https://investor.kahade.id',
    description: 'Informasi pendanaan dan whitepaper',
  },
};

const H = SITES.home.origin;
const B = SITES.bantuan.origin;
const L = SITES.legal.origin;

/** Kolom footer global — identik di semua situs. */
export const FOOTER_COLUMNS: { title: string; links: EcosystemLink[] }[] = [
  {
    title: 'Produk',
    links: [
      { label: 'Aplikasi Kahade', href: `${H}/` },
      { label: 'Cara kerja', href: `${H}/#cara-kerja` },
      { label: 'Biaya', href: `${H}/biaya` },
      { label: 'Keamanan', href: `${H}/keamanan` },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { label: 'Tentang', href: `${H}/tentang` },
      { label: 'Karir', href: `${SITES.karir.origin}/` },
      { label: 'Investor', href: `${SITES.investor.origin}/` },
      { label: 'Artikel', href: `${SITES.artikel.origin}/` },
      { label: 'Press', href: `${H}/press` },
    ],
  },
  {
    title: 'Dukungan',
    links: [
      { label: 'Pusat bantuan', href: `${B}/` },
      { label: 'Pertanyaan umum', href: `${B}/faq` },
      { label: 'Hubungi kami', href: `${B}/kontak` },
      { label: 'Status layanan', href: `${SITES.status.origin}/` },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Syarat & Ketentuan', href: `${L}/syarat-ketentuan` },
      { label: 'Kebijakan Privasi', href: `${L}/privasi` },
      { label: 'Kebijakan Transaksi', href: `${L}/transaksi` },
      { label: 'Pedoman Komunitas', href: `${L}/pedoman-komunitas` },
      { label: 'Semua dokumen', href: `${L}/` },
    ],
  },
];

/** Badan hukum penyelenggara. */
export const COMPANY = {
  name: 'PT Kawal Hak Dengan Aman',
  brand: 'Kahade',
  country: 'Indonesia',
} as const;

/**
 * Ubah URL absolut milik situs `current` menjadi path relatif
 * (agar navigasi internal tetap di origin yang sama & bisa di-prefetch).
 */
export function localizeHref(href: string, current: KahadeSite): string {
  const origin = SITES[current].origin;
  if (href === origin) return '/';
  if (href.startsWith(`${origin}/`)) return href.slice(origin.length);
  return href;
}
