# @kahade/ui — Design System Kahade

Komponen & token UI bersama untuk semua web Kahade (karir, legal, landing, admin).
Gaya: Apple-clean, monokrom — kuning `#FFD200` **hanya** untuk mark logo.

## Install

```bash
npm install github:kahade-id/design-system#v0.1.0
```

## Setup

**1. `next.config.ts`** — transpile package (dikirim sebagai source, tanpa build step):

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@kahade/ui'],
};

export default nextConfig;
```

**2. CSS global** (mis. `app/globals.css`) — urutan import penting:

```css
@import "tailwindcss";
@import "@kahade/ui/tokens.css";
@import "@kahade/ui/styles/fonts.css";
@import "@kahade/ui/styles/base.css";
```

**3. Pakai komponen:**

```tsx
import { Button, Input, Card, Logo } from '@kahade/ui';
import { ArrowRight } from '@phosphor-icons/react';

export default function Contoh() {
  return (
    <Card>
      <Logo size={28} />
      <Input label="Nama lengkap" placeholder="Nama kamu" />
      <Button rightIcon={ArrowRight}>Kirim</Button>
    </Card>
  );
}
```

Token Tailwind yang tersedia: `font-sans`, `text-ink`, `bg-paper`, `bg-brand`,
`text-brand`, `rounded-xl2`, `shadow-soft`, `shadow-lift`
(netral memakai bawaan Tailwind `neutral-*`).

## Daftar komponen

| Komponen | Props utama |
|---|---|
| `Button` | `variant`: primary/secondary/ghost/danger · `size`: sm/md/lg · `loading` · `leftIcon`/`rightIcon` (Phosphor) |
| `Input` / `Textarea` | `label`, `hint`, `error`, semua props native |
| `Select` | `label`, `hint`, `error`, `options: {value,label}[]`, `placeholder` |
| `Checkbox` / `Radio` / `Switch` | `label`, `hint` (label bisa diklik) |
| `Badge` | `variant`: neutral/success/warning/danger/brand |
| `Card` | `className` (padding default `p-6`) |
| `Alert` | `variant`: info/success/warning/danger · `title` |
| `Modal` | `open`, `onClose`, `title` (ESC & klik overlay menutup) |
| `Tabs` | `tabs: {id,label}[]`, `activeId`, `onChange` |
| `Accordion` | `items: {id,title,content,defaultOpen?}[]` |
| `Table`, `THead`, `TBody`, `TR`, `TH`, `TD` | presentasional |
| `Pagination` | `page`, `totalPages`, `onChange` |
| `EmptyState` | `icon`, `title`, `description`, `action` |
| `Skeleton` | `width`, `height`, `circle` · `Spinner`: `size`, `label` |
| `Avatar` | `src?`, `name` (initials fallback), `size`: sm/md/lg |
| `Tooltip` | `label` (CSS-only, posisi atas) |
| `Logo` | `size` (mark zigzag #FFD200) |
| `Icon` | `icon` (komponen Phosphor), `size`, `weight` |

Token non-CSS (untuk React Native / kanvas):

```ts
import { colors, fontFamily, radii, shadows } from '@kahade/ui';
```

## Aturan brand

1. **Kuning `#FFD200` HANYA untuk mark logo** (`Logo`, `bg-brand` untuk aksen logo). Jangan pakai untuk tombol, link, atau UI umum.
2. **Ikon Phosphor** — selalu via wrapper `Icon`, `weight="regular"` default. Jangan pasang `className` langsung di ikon Phosphor.
3. **Bahasa UI Indonesia** — semua label, pesan error, dan teks komponen berbahasa Indonesia.
4. **Jangan pakai `bg-*` generik di dalam komponen** — komponen ini memakai literal Tailwind agar konsisten.
5. Fokus jelas: semua elemen interaktif punya `focus-visible` ring.
