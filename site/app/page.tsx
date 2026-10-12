import type { ReactNode } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  ButtonLink,
  Container,
  DescriptionList,
  Eyebrow,
  IndexList,
  Kbd,
  Logo,
  LogoTile,
  PageHeader,
  Prose,
  SectionHeader,
  Skeleton,
  Stat,
  StatusDot,
  Steps,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
  TextLink,
  Toc,
  colors,
  DS_VERSION,
} from "@kahade/ui";
import { ButtonsDemo, FeedbackDemo, FormDemo, NavigationDemo } from "./demos";

const TOC = [
  { id: "prinsip", label: "Prinsip" },
  { id: "warna", label: "Warna" },
  { id: "tipografi", label: "Tipografi" },
  { id: "bentuk", label: "Radius & bayangan" },
  { id: "logo", label: "Logo" },
  { id: "kerangka", label: "Kerangka situs" },
  { id: "pola", label: "Pola halaman" },
  { id: "tombol", label: "Tombol & tautan" },
  { id: "form", label: "Form" },
  { id: "navigasi", label: "Navigasi" },
  { id: "data", label: "Data" },
  { id: "umpan-balik", label: "Umpan balik" },
];

const PRINCIPLES = [
  ["Satu perusahaan, satu sistem", "Header, footer, wadah, dan kepala halaman identik di ketujuh situs."],
  ["Tipografi memimpin", "Hierarki dari ukuran dan berat huruf. Ikon hanya bila menambah makna."],
  ["Garis, bukan kotak", "Hairline 1px dan grid 12 kolom. Daftar tujuan memakai IndexList, bukan grid kartu."],
  ["Monokrom berdisiplin", "Hitam adalah aksen. Kuning hanya di mark logo. Warna status hanya untuk status."],
  ["Jujur", "Tanpa angka karangan, tanpa link mati. Keadaan kosong dijelaskan apa adanya."],
];

const COLOR_GROUPS: { title: string; items: { token: string; hex: string; note: string; dark?: boolean; border?: boolean }[] }[] = [
  {
    title: "Teks",
    items: [
      { token: "fg", hex: colors.fg, note: "Judul, teks utama, aksi utama", dark: true },
      { token: "fg-2", hex: colors.fg2, note: "Teks badan panjang", dark: true },
      { token: "fg-muted", hex: colors.fgMuted, note: "Teks sekunder · 7,8:1", dark: true },
      { token: "fg-subtle", hex: colors.fgSubtle, note: "Meta · 5,3:1", dark: true },
    ],
  },
  {
    title: "Permukaan & garis",
    items: [
      { token: "surface", hex: colors.surface, note: "Latar utama", border: true },
      { token: "surface-2", hex: colors.surface2, note: "Seksi sekunder, footer" },
      { token: "line", hex: colors.line, note: "Hairline dekoratif" },
      { token: "line-control", hex: colors.lineControl, note: "Batas kontrol form · ≥3:1", dark: true },
    ],
  },
  {
    title: "Status & brand",
    items: [
      { token: "positive", hex: colors.positive, note: "Berhasil, operasional", dark: true },
      { token: "caution", hex: colors.caution, note: "Perhatian, gangguan", dark: true },
      { token: "critical", hex: colors.critical, note: "Gagal, tidak beroperasi", dark: true },
      { token: "brand", hex: colors.brand, note: "HANYA mark logo" },
    ],
  },
];

const TYPE_SCALE = [
  ["text-display", "Jual beli aman", "40 → 88 px · 700 · −0,035em"],
  ["text-h1", "Kepala halaman", "36 → 64 px · 700"],
  ["text-h2", "Judul seksi", "28 → 48 px · 700"],
  ["text-h3", "Sub-seksi", "20 → 24 px · 600"],
  ["text-h4", "Judul baris", "18 px · 600"],
  ["text-lead", "Paragraf pembuka yang menjelaskan halaman.", "18 → 22 px · 400"],
  ["text-body", "Teks badan untuk antarmuka dan deskripsi.", "16 px · 1,6"],
  ["text-small", "Label, keterangan, tautan footer.", "14 px"],
  ["text-caption", "Meta, tanggal, catatan kaki.", "13 px"],
];

function Block({ id, index, title, description, children }: { id: string; index: string; title: string; description?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-14 first-of-type:border-t-0 first-of-type:pt-0 sm:py-20">
      <SectionHeader index={index} title={title} size="h3" description={description} />
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Specimen({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-3 text-caption font-semibold text-fg-subtle">{label}</p>
      {children}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-xl">
        <Container className="flex h-16 items-center gap-3">
          <a href="https://kahade.id/" aria-label="Kahade — ke kahade.id" className="-m-2 inline-flex min-h-11 items-center p-2">
            <Logo size={26} tone="ink" title="" />
          </a>
          <span aria-hidden="true" className="h-5 w-px bg-line-strong" />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">Design System</span>
          <Badge variant="outline" className="ml-1">v{DS_VERSION}</Badge>
          <div className="ml-auto">
            <TextLink href="https://github.com/kahade-id/design-system" arrow="external">
              GitHub
            </TextLink>
          </div>
        </Container>
      </header>

      <main id="konten-utama" tabIndex={-1} className="outline-none">
        <PageHeader
          size="display"
          eyebrow="@kahade/ui"
          title="Kahade Design Language"
          lede="Token, komponen, dan pola halaman yang membuat tujuh situs Kahade terasa satu perusahaan. Monokrom, tipografi memimpin, garis alih-alih kotak."
          actions={
            <>
              <ButtonLink href="#warna">Mulai dari fondasi</ButtonLink>
              <ButtonLink href="#kerangka" variant="secondary">
                Lihat kerangka situs
              </ButtonLink>
            </>
          }
          meta={[
            { label: "Versi", value: DS_VERSION },
            { label: "Situs pengguna", value: "7" },
            { label: "Font", value: "Plus Jakarta Sans" },
            { label: "Ikon", value: "Phosphor (regular)" },
          ]}
        />

        <Container className="py-14 sm:py-20">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28">
                <Toc items={TOC} title="Isi" />
              </div>
            </aside>
            <div className="min-w-0 lg:col-span-9">
              <Toc items={TOC} title="Isi" variant="disclosure" className="mb-12 lg:hidden" />

              <Block id="prinsip" index="01" title="Prinsip">
                <ol className="border-t border-line">
                  {PRINCIPLES.map(([t, d], i) => (
                    <li key={t} className="grid gap-2 border-b border-line py-5 sm:grid-cols-12 sm:gap-6">
                      <span className="text-small tabular-nums text-fg-subtle sm:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-h4 text-fg sm:col-span-4">{t}</p>
                      <p className="text-body text-fg-muted sm:col-span-7">{d}</p>
                    </li>
                  ))}
                </ol>
              </Block>

              <Block id="warna" index="02" title="Warna" description="Monokrom dengan token semantik. Pakai nama token, bukan hex.">
                <div className="space-y-10">
                  {COLOR_GROUPS.map((g) => (
                    <Specimen key={g.title} label={g.title}>
                      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-line bg-line md:grid-cols-4">
                        {g.items.map((c) => (
                          <div key={c.token} className="bg-surface">
                            <div
                              className={`flex h-24 items-end p-3 text-caption font-semibold tabular-nums ${c.dark ? "text-white" : "text-black"} ${c.border ? "border-b border-line" : ""}`}
                              style={{ backgroundColor: c.hex }}
                            >
                              {c.hex}
                            </div>
                            <div className="p-3">
                              <p className="text-small font-semibold text-fg">{c.token}</p>
                              <p className="mt-0.5 text-caption text-fg-muted">{c.note}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Specimen>
                  ))}
                </div>
              </Block>

              <Block id="tipografi" index="03" title="Tipografi" description="Plus Jakarta Sans. Skala fluid — tiap token membawa line-height, tracking, dan berat.">
                <div className="border-t border-line">
                  {TYPE_SCALE.map(([cls, sample, spec]) => (
                    <div key={cls} className="grid gap-2 border-b border-line py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6">
                      <div className="sm:col-span-3">
                        <p className="text-small font-semibold text-fg">{cls}</p>
                        <p className="text-caption text-fg-subtle">{spec}</p>
                      </div>
                      <p className={`${cls} min-w-0 truncate text-fg sm:col-span-9`}>{sample}</p>
                    </div>
                  ))}
                </div>
              </Block>

              <Block id="bentuk" index="04" title="Radius & bayangan" description="Empat radius, dua bayangan. Tidak lebih.">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["rounded-tag", "6px — kbd, label"],
                    ["rounded-control", "12px — input, menu"],
                    ["rounded-panel", "20px — panel, gambar"],
                    ["rounded-full", "pil — tombol, avatar"],
                  ].map(([cls, note]) => (
                    <Specimen key={cls} label={cls}>
                      <div className={`h-24 border border-line-strong bg-surface-2 ${cls}`} />
                      <p className="mt-2 text-caption text-fg-muted">{note}</p>
                    </Specimen>
                  ))}
                </div>
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  {[
                    ["shadow-soft", "Panel yang sedikit terangkat"],
                    ["shadow-lift", "Lapisan melayang: menu, modal, mockup"],
                  ].map(([cls, note]) => (
                    <Specimen key={cls} label={cls}>
                      <div className={`h-28 rounded-panel border border-line bg-surface ${cls}`} />
                      <p className="mt-2 text-caption text-fg-muted">{note}</p>
                    </Specimen>
                  ))}
                </div>
              </Block>

              <Block id="logo" index="05" title="Logo" description="Mark tanpa wordmark. Hitam di terang, kuning di gelap, ubin untuk ikon aplikasi.">
                <div className="grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-3">
                  <div className="flex h-40 items-center justify-center bg-surface"><Logo size={64} tone="ink" title="Mark hitam" /></div>
                  <div className="flex h-40 items-center justify-center bg-black"><Logo size={64} tone="brand" title="Mark kuning" /></div>
                  <div className="flex h-40 items-center justify-center bg-surface-2"><LogoTile size={72} title="Ikon aplikasi" /></div>
                </div>
              </Block>

              <Block id="kerangka" index="06" title="Kerangka situs" description="SiteHeader dan SiteFooter bersumber dari peta ecosystem.ts — tautan lintas situs selalu konsisten.">
                <Prose className="max-w-reading">
                  <p>
                    Setiap situs membungkus <code>SiteHeader</code> dalam komponen client kecil (untuk
                    <code>usePathname</code> dan <code>next/link</code>), lalu memasang <code>SiteFooter</code> di
                    layout. Mark selalu menuju kahade.id; label produk menuju beranda situs. Lihat
                    <code>docs/DESIGN-LANGUAGE.md</code>.
                  </p>
                </Prose>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <Specimen label="Header — situs dalam">
                    <div className="flex h-16 items-center gap-3 rounded-control border border-line px-5">
                      <Logo size={24} tone="ink" title="" />
                      <span aria-hidden="true" className="h-5 w-px bg-line-strong" />
                      <span className="text-[15px] font-semibold">Bantuan</span>
                      <span className="ml-6 hidden text-[15px] font-medium text-fg-muted sm:inline">FAQ</span>
                      <span className="ml-5 hidden text-[15px] font-medium text-fg sm:inline">Kontak</span>
                    </div>
                  </Specimen>
                  <Specimen label="Header — situs utama">
                    <div className="flex h-16 items-center gap-3 rounded-control border border-line px-5">
                      <Logo size={24} tone="ink" title="" />
                      <span className="ml-auto inline-flex h-9 items-center rounded-full bg-fg px-4 text-[14px] font-semibold text-white">Unduh aplikasi</span>
                    </div>
                  </Specimen>
                </div>
              </Block>

              <Block id="pola" index="07" title="Pola halaman" description="Pengganti grid kartu: indeks berhairline, pasangan istilah–keterangan, daftar isi, dan prose.">
                <div className="space-y-12">
                  <Specimen label="Breadcrumb · Eyebrow">
                    <Breadcrumb items={[{ label: "Legal", href: "#pola" }, { label: "Syarat & Ketentuan" }]} />
                    <Eyebrow index="02" className="mt-6">Keamanan</Eyebrow>
                  </Specimen>
                  <Specimen label="IndexList">
                    <IndexList
                      items={[
                        { href: "#pola", index: "01", title: "Syarat & Ketentuan", description: "Aturan penggunaan aplikasi Kahade.", meta: "Versi 1.0" },
                        { href: "#pola", index: "02", title: "Kebijakan Privasi", description: "Data yang kami kumpulkan dan hak Anda.", meta: "Versi 1.0" },
                        { href: "https://bantuan.kahade.id/", index: "03", title: "Pusat bantuan", description: "Tautan ke situs lain memakai panah serong.", external: true },
                      ]}
                    />
                  </Specimen>
                  <Specimen label="DescriptionList">
                    <DescriptionList
                      items={[
                        { term: "Unduh & buat akun", detail: "Gratis." },
                        { term: "Posting produk", detail: "Gratis. Unggah sebanyak yang kamu mau." },
                        { term: "Biaya layanan transaksi", detail: "Ditampilkan sebelum kamu membayar." },
                      ]}
                    />
                  </Specimen>
                  <Specimen label="Prose">
                    <Prose className="max-w-reading">
                      <h2>Posisi Kahade sebagai platform</h2>
                      <p>
                        Kahade adalah <strong>platform</strong> yang mempertemukan pembeli dan penjual. Tipografi
                        baca 17–18px, line-height 1,75, lebar maksimum 680px.
                      </p>
                      <ul>
                        <li>Daftar memakai penanda abu redup.</li>
                        <li>Tautan bergaris bawah tipis yang menebal saat hover.</li>
                      </ul>
                    </Prose>
                  </Specimen>
                </div>
              </Block>

              <Block id="tombol" index="08" title="Tombol & tautan">
                <ButtonsDemo />
              </Block>

              <Block id="form" index="09" title="Form" description="Tinggi 48px, batas kontrol ≥3:1, fokus hitam, pesan galat dengan ikon.">
                <FormDemo />
              </Block>

              <Block id="navigasi" index="10" title="Navigasi">
                <NavigationDemo />
              </Block>

              <Block id="data" index="11" title="Data">
                <div className="space-y-12">
                  <Specimen label="Stat — hanya angka yang bersumber">
                    <div className="grid gap-8 sm:grid-cols-3">
                      <Stat label="Biaya transaksi" value="2,5%" hint="Min Rp2.500 · maks Rp250.000" />
                      <Stat label="Launch publik" value="8 Des 2026" />
                      <Stat label="Versi dokumen" value="1.0" />
                    </div>
                  </Specimen>
                  <Specimen label="Table">
                    <div className="overflow-x-auto">
                      <Table>
                        <THead>
                          <TR><TH>Layanan</TH><TH>Status</TH><TH>Diperbarui</TH></TR>
                        </THead>
                        <TBody>
                          <TR><TD className="font-semibold text-fg">API</TD><TD><Badge variant="success">Operasional</Badge></TD><TD>4 Oktober 2026</TD></TR>
                          <TR><TD className="font-semibold text-fg">Aplikasi Mobile</TD><TD><Badge variant="warning">Gangguan</Badge></TD><TD>4 Oktober 2026</TD></TR>
                          <TR><TD className="font-semibold text-fg">OTP WhatsApp</TD><TD><Badge variant="danger">Tidak beroperasi</Badge></TD><TD>4 Oktober 2026</TD></TR>
                        </TBody>
                      </Table>
                    </div>
                  </Specimen>
                  <div className="grid gap-12 md:grid-cols-2">
                    <Specimen label="Steps">
                      <Steps
                        current={2}
                        steps={[
                          { label: "Dana diamankan", description: "Aman di Kahade" },
                          { label: "Barang dikirim", description: "Resi tercatat" },
                          { label: "Konfirmasi terima", description: "Menunggu pembeli" },
                          { label: "Dana cair" },
                        ]}
                      />
                    </Specimen>
                    <Specimen label="Badge · StatusDot · Avatar · Kbd">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge>Netral</Badge>
                        <Badge variant="outline">Garis</Badge>
                        <Badge variant="dark">Tegas</Badge>
                        <Badge variant="success">Berhasil</Badge>
                        <Badge variant="warning">Perhatian</Badge>
                        <Badge variant="danger">Gagal</Badge>
                      </div>
                      <div className="mt-5 flex items-center gap-4 text-small text-fg-muted">
                        <span className="flex items-center gap-2"><StatusDot tone="positive" />Operasional</span>
                        <span className="flex items-center gap-2"><StatusDot tone="caution" />Gangguan</span>
                        <span className="flex items-center gap-2"><StatusDot tone="critical" />Tidak beroperasi</span>
                      </div>
                      <div className="mt-5 flex items-center gap-3">
                        <Avatar name="Muhammad Agung" size="sm" />
                        <Avatar name="Kahade" />
                        <Avatar name="Toko Contoh" size="lg" />
                        <span className="ml-3 text-small text-fg-muted">Tekan <Kbd>Esc</Kbd> untuk menutup</span>
                      </div>
                    </Specimen>
                  </div>
                  <Specimen label="Skeleton">
                    <div className="max-w-md space-y-3">
                      <Skeleton height="h-5" width="w-2/3" />
                      <Skeleton />
                      <Skeleton width="w-5/6" />
                    </div>
                  </Specimen>
                </div>
              </Block>

              <Block id="umpan-balik" index="12" title="Umpan balik">
                <div className="space-y-4">
                  <Alert title="Catatan tinjauan hukum">Dokumen ini akan ditinjau ulang sebelum peluncuran.</Alert>
                  <Alert variant="success" title="Lamaran terkirim">Kami akan menghubungimu lewat email.</Alert>
                  <Alert variant="warning" title="Sesi hampir berakhir">Simpan perubahanmu.</Alert>
                  <Alert variant="danger" title="Gagal mengirim">Periksa koneksi lalu coba lagi.</Alert>
                </div>
                <FeedbackDemo />
              </Block>
            </div>
          </div>
        </Container>
      </main>

      <footer className="border-t border-line bg-surface-2">
        <Container className="flex flex-col gap-2 py-8 text-caption text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PT Kawal Hak Dengan Aman · @kahade/ui v{DS_VERSION}</p>
          <TextLink href="https://kahade.id/" arrow="external" className="text-caption!">kahade.id</TextLink>
        </Container>
      </footer>
    </>
  );
}

