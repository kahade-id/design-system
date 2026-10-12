# @kahade/ui — Kahade Design Language

Token, komponen, dan kerangka situs bersama untuk semua web Kahade:
kahade.id, bantuan, artikel, karir, legal, status, dan investor.

- **Bahasa desain:** [`docs/DESIGN-LANGUAGE.md`](docs/DESIGN-LANGUAGE.md) — wajib dibaca sebelum mengubah UI.
- **Audit yang melatarbelakangi v1:** [`docs/AUDIT-2026-10.md`](docs/AUDIT-2026-10.md)
- **Riwayat rilis:** [`CHANGELOG.md`](CHANGELOG.md)
- **Showcase visual:** `site/` (Next.js)

## Install

```bash
npm install github:kahade-id/design-system#v1.0.0
```

Paket dikirim sebagai source TypeScript (tanpa build step).

## Setup (Next.js 16 + Tailwind v4)

**1. `next.config.ts`**

```ts
const nextConfig: NextConfig = {
  transpilePackages: ["@kahade/ui"],
};
```

**2. `app/globals.css`** — urutan penting:

```css
@import "tailwindcss";
@import "@kahade/ui/tokens.css";
@import "@kahade/ui/styles/base.css";

/* WAJIB: Tailwind v4 tidak men-scan node_modules */
@source "../node_modules/@kahade/ui/src";
```

**3. Font Plus Jakarta Sans** — `next/font/google` dengan `variable: "--font-sans"`,
dipasang di `<html>` (bukan `<body>`):

```tsx
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
<html lang="id" className={jakarta.variable}>
```

**4. Kerangka situs** — header (wrapper client) + footer:

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
      nav={[{ href: "/faq", label: "FAQ" }, { href: "/kontak", label: "Kontak" }]}
      pathname={usePathname()}
      linkAs={Link}
    />
  );
}
```

```tsx
// app/layout.tsx
<html lang="id" data-scroll-behavior="smooth">
  <body>
    <a href="#konten-utama" className="kh-skip-link">Lewati ke konten utama</a>
    <Header />
    <main id="konten-utama" tabIndex={-1} className="outline-none">{children}</main>
    <SiteFooter site="bantuan" linkAs={Link} />
  </body>
</html>
```

## Isi paket

| Kelompok | Ekspor |
|---|---|
| Kerangka | `SiteHeader`, `SiteFooter`, `SITES`, `FOOTER_COLUMNS`, `COMPANY`, `localizeHref` |
| Layout & pola | `Container`, `Section`, `PageHeader`, `SectionHeader`, `Eyebrow`, `IndexList`, `DescriptionList`, `Prose`, `Toc`, `TextLink`, `Reveal` |
| Aksi | `Button`, `ButtonLink`, `IconButton`, `CopyButton`, `buttonClasses` |
| Form | `Input`, `Textarea`, `Select`, `SearchField`, `PasswordInput`, `PhoneInput`, `OtpInput`, `FileUpload`, `Checkbox`, `Radio`, `Switch` |
| Navigasi | `Tabs`, `Accordion`, `Breadcrumb`, `Pagination`, `DropdownMenu` |
| Data | `Table` (+`THead/TBody/TR/TH/TD`), `Stat`, `Steps`, `Badge`, `StatusDot`, `Avatar`, `Kbd`, `Progress`, `Skeleton`, `Spinner`, `ListItem`, `Divider` |
| Umpan balik | `Alert`, `Banner`, `Modal`, `Tooltip`, `EmptyState` |
| Brand | `Logo` (`tone`), `LogoTile`, `LOGO_PATHS`, `LOGO_VIEWBOX` |
| Token TS | `colors`, `radii`, `shadows`, `layout`, `fontFamily`, `GOOGLE_FONTS_URL`, `DS_VERSION` |

## Aturan singkat

1. Kuning `#FFD200` hanya untuk mark logo. Hitam adalah aksen.
2. Pakai token (`text-fg-muted`, `rounded-panel`, `max-w-page`), bukan hex atau `neutral-*`.
3. Daftar tujuan memakai `IndexList`, bukan grid kartu ber-ikon.
4. Ikon Phosphor `regular` lewat `Icon`. Tanpa emoji.
5. Target sentuh ≥44px, fokus terlihat, kontras AA, seluruh teks Bahasa Indonesia.

## Rilis

1. Ubah `src/`, perbarui `CHANGELOG.md`, `package.json` `version`, dan `src/version.ts`.
2. Commit, buat tag `vX.Y.Z`, push tag.
3. Di tiap situs: `npm install github:kahade-id/design-system#vX.Y.Z`.

## Showcase

```bash
cd site && npm install && npm run dev   # http://localhost:3000
```

Deploy Vercel: Root Directory = `site`.
