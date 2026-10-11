# Kahade Design Language v1

Satu bahasa desain untuk tujuh situs Kahade. Dokumen ini adalah brief wajib
untuk siapa pun yang mengubah UI di repo mana pun.

## Prinsip

1. **Satu perusahaan, satu sistem.** Header (`SiteHeader`), footer
   (`SiteFooter`), wadah (`Container`), dan kepala halaman (`PageHeader`)
   identik di semua situs. Jangan membuat header/footer lokal.
2. **Tipografi memimpin, bukan dekorasi.** Hierarki dibangun dari ukuran dan
   berat huruf. Ikon hanya bila menambah makna (aksi, status, arah) — bukan
   hiasan di setiap kartu.
3. **Garis, bukan kotak.** Pisahkan konten dengan hairline 1px dan grid 12
   kolom. Daftar tujuan memakai `IndexList`, bukan grid kartu ber-ikon.
   `Card` hanya untuk panel yang memang berdiri sendiri (form, ringkasan).
4. **Monokrom berdisiplin.** Hitam adalah aksen. Kuning `#FFD200` HANYA di
   mark logo. Hijau/amber/merah HANYA untuk makna status.
5. **Jujur.** Tanpa angka/testimoni/logo karangan, tanpa superlatif tak
   terbukti, tanpa link mati. Keadaan kosong dijelaskan apa adanya.

## Token (lihat `src/tokens/tokens.css`)

| Kelompok | Utility | Catatan |
|---|---|---|
| Teks | `text-fg` `text-fg-2` `text-fg-muted` `text-fg-subtle` | subtle ≥4.8:1 di putih & mist |
| Permukaan | `bg-surface` `bg-surface-2` `bg-surface-3` `bg-surface-inverse` | surface-2 = #F3F4F6 |
| Garis | `border-line` `border-line-strong` `border-line-control` | control ≥3:1 untuk input |
| Status | `text-positive` `bg-positive-soft` `caution` `critical` | hanya status |
| Tipe | `text-display` `text-h1` `text-h2` `text-h3` `text-h4` `text-lead` `text-body-lg` `text-body` `text-small` `text-caption` `text-eyebrow` | fluid, membawa line-height/tracking/weight |
| Radius | `rounded-tag` (6) `rounded-control` (12) `rounded-panel` (20) `rounded-full` | hanya 4 nilai |
| Bayangan | `shadow-soft` `shadow-lift` | lift hanya untuk lapisan melayang |
| Layout | `max-w-page` (1200) `max-w-narrow` (860) `max-w-reading` (680) | |

Jangan menulis hex (`text-[#525252]`), `neutral-*`, `rounded-2xl`,
`text-sm/xs`, atau `max-w-6xl` di situs. Pakai token.

## Pola halaman

```
SiteHeader (sticky 64px)
PageHeader          ← eyebrow · judul · lede · aksi · strip meta
Section (divider)   ← SectionHeader + konten (IndexList / DescriptionList / grid)
Section tone=muted  ← konten sekunder
section inverse     ← satu ajakan penutup (opsional)
SiteFooter
```

- **Beranda situs**: `PageHeader size="display"`.
- **Halaman dalam**: `PageHeader size="h1"` (atau `h2` untuk dokumen), dengan
  `Breadcrumb`.
- **Kelompok daftar**: grid 12 kolom — judul kelompok kiri (4 kolom, menempel),
  `IndexList` kanan (8 kolom).
- **Dokumen panjang**: `Toc` sidebar menempel (desktop) + `Toc variant="disclosure"`
  (mobile), isi dalam `Prose` dengan `max-w-reading`.
- **Ajakan penutup**: strip hitam penuh, judul `text-h3` putih, tombol
  `variant="inverse"` + `inverseSecondary`.

## Komponen

Kerangka: `SiteHeader`, `SiteFooter`, `Container`, `Section`.
Pola: `PageHeader`, `SectionHeader`, `Eyebrow`, `IndexList`,
`DescriptionList`, `Prose`, `Toc`, `TextLink`, `Reveal`, `StatusDot`, `Kbd`.
Dasar: `Button`/`ButtonLink` (pil; primary, secondary, ghost, danger, inverse,
inverseSecondary), `Badge`, `Alert`, `Accordion`, `Tabs` (underline,
segmented), form (`Input`, `Textarea`, `Select`, `SearchField`, `Checkbox`,
`Radio`, `Switch`, `PhoneInput`, `PasswordInput`, `OtpInput`, `FileUpload`),
`Table`, `Steps`, `Modal`, `DropdownMenu`, `Pagination`, `EmptyState`,
`Skeleton`, `Spinner`, `Avatar`, `Tooltip`, `CopyButton`, `Logo`, `LogoTile`.

### Kerangka situs (wajib)

```tsx
// components/site/Header.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@kahade/ui";

export function Header() {
  return (
    <SiteHeader
      site="bantuan"
      nav={[{ href: "/faq", label: "FAQ" }]}
      cta={{ label: "Hubungi kami", href: "/kontak" }}
      pathname={usePathname()}
      linkAs={Link}
    />
  );
}

// app/layout.tsx
<a href="#konten-utama" className="kh-skip-link">Lewati ke konten utama</a>
<Header />
<main id="konten-utama" tabIndex={-1} className="outline-none">{children}</main>
<SiteFooter site="bantuan" linkAs={Link} />
```

Tautan lintas situs bersumber dari `src/ecosystem.ts`. Menambah situs/rute
baru = ubah file itu, rilis DS.

## Logo

- Mark hitam (`tone="ink"`) di permukaan terang — header, footer.
- Mark kuning (`tone="brand"`) di permukaan hitam.
- `LogoTile` (mark kuning di ubin hitam) = ikon aplikasi, favicon, OG image.
- Tanpa wordmark. Label produk ("Bantuan", "Karir") adalah teks UI di
  samping mark, dipisah garis vertikal.

## Motion

Reveal sekali (opacity + translateY 16px, 700ms, stagger 60–80ms) via
`Reveal`. Hanya transform/opacity. Tanpa animasi berulang, parallax, atau
auto-play. `prefers-reduced-motion` mematikan semuanya (di `base.css`).
Jangan pakai `Reveal` pada judul hero (elemen LCP).

## Aksesibilitas

- Target sentuh ≥44px (nav, footer, tombol md/lg, IndexList).
- Fokus: ring/outline hitam 2px, offset 2px.
- Kontras teks ≥4.5:1; batas kontrol form ≥3:1.
- Satu `h1` per halaman; heading berurutan.
- Bahasa: `lang="id"`, seluruh teks UI Bahasa Indonesia.
