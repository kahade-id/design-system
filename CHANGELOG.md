# Changelog @kahade/ui

## v0.5.2 — 4 Oktober 2026
- **`CopyButton`**: kini punya state gagal — bila clipboard API + fallback sama-sama gagal, tombol menampilkan "Gagal menyalin" (merah) + pengumuman screen reader, bukan diam-diam mengklaim "Tersalin!". Warna sukses digelapkan (`green-700`→`green-800`) agar kontras lolos.
- **`EmptyState`**: prop baru `headingLevel` (1|2|3, default 3) — halaman 404 kini bisa pakai `headingLevel={1}` tanpa workaround sr-only h1 manual.
- **Placeholder** `Input`/`PhoneInput`/`SearchField`: `neutral-400`→`neutral-500` (kontras placeholder ~2.7:1 → ~4.5:1).

## v0.5.1 — 4 Oktober 2026
- **`Badge`**: varian baru `dark` (`bg-black text-white`) — untuk info yang harus menonjol secara visual (mis. kompensasi equity di kartu lowongan). Varian `neutral` yang pudar tidak cocok untuk informasi primer.

## v0.5.0 — 4 Oktober 2026

### Fitur baru
- **`ButtonLink`** — link (`<a>`) dengan visual tombol Kahade (variant/size sama persis dengan `Button` via `buttonClasses` yang dishare). Menggantikan pola `ButtonLink` lokal yang dibangun sendiri oleh 4 situs (investor, status, bantuan, karir). Catatan: `<button>` di dalam `<a>` adalah HTML invalid — untuk navigasi bertampang tombol, pakai komponen ini.
- **`Radio`**: prop `error` + `FieldError` + `aria-invalid`/`aria-describedby` — paritas dengan `Checkbox`.
- **`Modal`**: kini di-render via `createPortal` ke `document.body` — tidak lagi rusak bila parent punya `overflow: hidden` / `transform`.
- **`DropdownMenu`**: navigasi keyboard antar item menu (ArrowUp/ArrowDown/Home/End, pola WAI-APG).

### Perbaikan
- **`"use client"` dilengkapi** ke 8 komponen yang memasang/meneruskan event handler ke DOM: `Button`, `Input` (+`Textarea`), `Checkbox`, `Radio`, `Switch`, `Select`, `Pagination`, `PhoneInput`. Tanpa ini, handler seperti `onClick` yang diteruskan konsumen **hilang diam-diam** melewati batas RSC (terbukti via uji render: tombol ter-render tapi klik tidak melakukan apa-apa).
- **`Breadcrumb`**: `aria-label` Inggris → "Navigasi breadcrumb".
- `index.ts`: daftar situs di komentar diperbarui (7 situs).

## v0.4.3 — 4 Oktober 2026
- Tambah `"use client"` pada 10 komponen interaktif (Accordion, Banner, CopyButton, DropdownMenu, FileUpload, Modal, OtpInput, PasswordInput, SearchField, Tabs) agar aman dipakai dari Next.js Server Components.

## v0.4.2 — 4 Oktober 2026
- Import runtime Phosphor dipindah ke `@phosphor-icons/react/dist/ssr` (SSR-safe).

## v0.4.1 — 4 Oktober 2026
- Hapus unused import di `PhoneInput` (TS6133).

## v0.4.0 — 4 Oktober 2026
- Audit mendalam seluruh source; 14 masalah diperbaiki (bug, kontras, a11y).

## v0.3.0 — 3 Oktober 2026
- Poles visual + a11y: animasi micro-interaction, focus trap Modal, ARIA, navigasi keyboard.

## v0.2.1 — 3 Oktober 2026
- `fonts.css` tanpa CSS `@import` (font dimuat via `<link>`).

## v0.2.0 — 3 Oktober 2026
- 14 komponen baru (FileUpload, OtpInput, Steps, dsb.); situs showcase full 34 komponen.

## v0.1.0 — 3 Oktober 2026
- Rilis awal design system Kahade (@kahade/ui): fondasi komponen & token.
