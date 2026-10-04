"use client";

import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  Bell,
  DotsThree,
  Download,
  Pencil,
  Plus,
  Trash,
  Tray,
} from "@phosphor-icons/react";
import {
  Alert,
  Avatar,
  Badge,
  Banner,
  Breadcrumb,
  Button,
  ButtonLink,
  Card,
  Checkbox,
  CopyButton,
  Divider,
  DropdownMenu,
  EmptyState,
  FileUpload,
  Icon,
  Input,
  Textarea,
  ListItem,
  Logo,
  Modal,
  OtpInput,
  Pagination,
  PasswordInput,
  PhoneInput,
  Progress,
  Radio,
  SearchField,
  Select,
  Skeleton,
  Spinner,
  Stat,
  Steps,
  Switch,
  Table,
  TBody,
  TD,
  TH,
  THead,
  TR,
  Tabs,
  Accordion,
  Tooltip,
  colors,
} from "@kahade/ui";

function Section({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl font-bold tracking-tight text-black">{title}</h2>
      <p className="mt-1 text-sm text-neutral-500">{desc}</p>
      <Card className="mt-4 space-y-8">{children}</Card>
    </section>
  );
}

function Demo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2.5 text-xs font-semibold tracking-wide text-neutral-400 uppercase">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

const NAV: [string, string][] = [
  ["fondasi", "Fondasi"],
  ["tombol", "Tombol"],
  ["form", "Form"],
  ["navigasi", "Navigasi"],
  ["data", "Data"],
  ["feedback", "Feedback"],
  ["aksesibilitas", "Aksesibilitas"],
];

const NEUTRALS: [string, string][] = [
  ["50", "bg-neutral-50"],
  ["100", "bg-neutral-100"],
  ["200", "bg-neutral-200"],
  ["300", "bg-neutral-300"],
  ["400", "bg-neutral-400"],
  ["500", "bg-neutral-500"],
  ["600", "bg-neutral-600"],
  ["700", "bg-neutral-700"],
  ["800", "bg-neutral-800"],
  ["900", "bg-neutral-900"],
];

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState("satu");
  const [page, setPage] = useState(3);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(45);
  const [switchOn, setSwitchOn] = useState(true);
  const [otpCode, setOtpCode] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-white">
      <Banner
        variant="info"
        message="Showcase @kahade/ui v0.3.0 — untuk audit visual komponen"
        dismissible
      />
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-3.5">
          <Logo size={30} />
          <div>
            <h1 className="text-base font-bold tracking-tight text-black">
              Kahade Design System
            </h1>
            <p className="text-xs text-neutral-500">Galeri komponen @kahade/ui</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="neutral">v0.3.0</Badge>
            <a
              href="https://github.com/kahade-id/design-system"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-neutral-300 px-3.5 py-1.5 text-xs font-semibold text-black transition hover:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              GitHub
            </a>
          </div>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-5 pb-2.5">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-neutral-500 transition hover:bg-neutral-100 hover:text-black"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl space-y-14 px-5 py-10">
        {/* ══════════ FONDASI ══════════ */}
        <div id="fondasi" className="scroll-mt-32">
          <h2 className="text-xl font-bold tracking-tight text-black">Fondasi</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Token desain: warna, tipografi, dan logo.
          </p>
          <Card className="mt-4 space-y-8">
            <Demo label="Warna brand">
              <div className="flex items-center gap-2">
                <span
                  className="h-12 w-12 rounded-xl border border-neutral-200 bg-brand"
                  title={colors.brand}
                />
                <div>
                  <p className="text-sm font-semibold text-black">brand</p>
                  <p className="font-mono text-xs text-neutral-500">{colors.brand}</p>
                  <p className="text-[11px] text-neutral-400">Hanya untuk logo</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-12 w-12 rounded-xl bg-black" />
                <div>
                  <p className="text-sm font-semibold text-black">ink</p>
                  <p className="font-mono text-xs text-neutral-500">{colors.ink}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-12 w-12 rounded-xl border border-neutral-200 bg-white" />
                <div>
                  <p className="text-sm font-semibold text-black">paper</p>
                  <p className="font-mono text-xs text-neutral-500">{colors.paper}</p>
                </div>
              </div>
            </Demo>
            <Demo label="Skala neutral">
              <div className="flex gap-1.5">
                {NEUTRALS.map(([name, cls]) => (
                  <div key={name} className="text-center">
                    <span className={`block h-10 w-10 rounded-lg ${cls}`} title={`neutral-${name}`} />
                    <span className="mt-1 block text-[10px] text-neutral-400">{name}</span>
                  </div>
                ))}
              </div>
            </Demo>
            <Demo label="Tipografi — Plus Jakarta Sans">
              <div className="w-full space-y-2">
                <p className="text-3xl font-extrabold tracking-tight text-black">Heading 800</p>
                <p className="text-xl font-bold text-black">Judul 700</p>
                <p className="text-base font-semibold text-black">Subjudul 600</p>
                <p className="text-sm font-medium text-neutral-700">Body 500 — Kahade adalah aplikasi jual-beli pengguna ke pengguna yang tampilannya seperti media sosial.</p>
                <p className="text-xs text-neutral-500">Caption 400 — ABCDEFG abcdefg 0123456789</p>
              </div>
            </Demo>
            <Demo label="Logo">
              <div className="flex items-end gap-6">
                <Logo size={24} />
                <Logo size={40} />
                <Logo size={56} />
              </div>
              <p className="w-full text-xs text-neutral-400">
                Mark zigzag #FFD200 — kuning hanya untuk logo.
              </p>
            </Demo>
          </Card>
        </div>

        {/* ══════════ TOMBOL ══════════ */}
        <Section
          id="tombol"
          title="Tombol"
          desc="Aksi utama. Variant primary selalu hitam — bukan kuning."
        >
          <Demo label="Variant">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </Demo>
          <Demo label="Ukuran">
            <Button size="sm">Kecil</Button>
            <Button size="md">Sedang</Button>
            <Button size="lg">Besar</Button>
          </Demo>
          <Demo label="Status">
            <Button loading>Memuat</Button>
            <Button disabled>Nonaktif</Button>
            <Button leftIcon={Plus}>Dengan ikon</Button>
            <Button rightIcon={ArrowRight}>Lanjut</Button>
          </Demo>
          <Demo label="CopyButton — klik untuk salin">
            <CopyButton text="https://karir.kahade.id" />
            <CopyButton text="kode-referral-123" label="Salin kode" />
          </Demo>
          <Demo label="ButtonLink — navigasi bertampang tombol (me-render <a>)">
            <ButtonLink href="#tombol">Primary</ButtonLink>
            <ButtonLink href="#tombol" variant="secondary">
              Secondary
            </ButtonLink>
            <ButtonLink href="#tombol" variant="ghost" size="sm">
              Ghost kecil
            </ButtonLink>
          </Demo>
        </Section>

        {/* ══════════ FORM ══════════ */}
        <Section id="form" title="Form" desc="Input & kontrol formulir.">
          <Demo label="Input">
            <div className="w-full max-w-sm">
              <Input label="Nama lengkap" placeholder="Nama kamu" hint="Sesuai KTP" />
            </div>
            <div className="w-full max-w-sm">
              <Input label="Email" placeholder="nama@email.com" error="Format email tidak valid" />
            </div>
            <div className="w-full max-w-sm">
              <Input label="Nonaktif" placeholder="Tidak bisa diisi" disabled />
            </div>
          </Demo>
          <Demo label="Textarea & Select">
            <div className="w-full max-w-sm">
              <Textarea label="Alamat" placeholder="Jalan, kota…" rows={3} />
            </div>
            <div className="w-full max-w-sm">
              <Select
                label="Kota"
                placeholder="Pilih kota"
                options={[
                  { value: "jkt", label: "Jakarta" },
                  { value: "bdg", label: "Bandung" },
                  { value: "sby", label: "Surabaya" },
                ]}
              />
            </div>
          </Demo>
          <Demo label="SearchField">
            <div className="w-full max-w-sm">
              <SearchField
                label="Pencarian"
                placeholder="Cari lowongan…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {search && (
              <p className="w-full text-xs text-neutral-500">Mencari: “{search}”</p>
            )}
          </Demo>
          <Demo label="PasswordInput & PhoneInput">
            <div className="w-full max-w-sm">
              <PasswordInput label="Kata sandi" placeholder="••••••••" hint="Minimal 8 karakter" />
            </div>
            <div className="w-full max-w-sm">
              <PhoneInput label="Nomor HP" placeholder="81234567890" />
            </div>
          </Demo>
          <Demo label="OtpInput — ketik / paste 6 digit">
            <div className="w-full">
              <OtpInput length={6} onComplete={(code) => setOtpCode(code)} autoFocus={false} />
              {otpCode && (
                <p className="mt-2 text-xs font-semibold text-green-700">
                  Kode lengkap: {otpCode}
                </p>
              )}
            </div>
          </Demo>
          <Demo label="FileUpload — seret atau klik">
            <div className="w-full max-w-md">
              <FileUpload
                hint="PDF, maks 5 MB"
                accept="application/pdf"
                onFiles={(fl) => setFiles(Array.from(fl).map((f) => f.name))}
              />
              {files.length > 0 && (
                <p className="mt-2 text-xs text-neutral-600">
                  Dipilih: {files.join(", ")}
                </p>
              )}
            </div>
          </Demo>
          <Demo label="Checkbox / Radio / Switch">
            <div className="flex w-full flex-col gap-3">
              <Checkbox label="Saya menyetujui syarat & ketentuan" defaultChecked />
              <Checkbox label="Kirim notifikasi email" hint="Opsional" />
              <div className="flex gap-6">
                <Radio name="r1" label="Pria" defaultChecked />
                <Radio name="r1" label="Wanita" />
              </div>
              <Switch
                label="Aktifkan notifikasi"
                checked={switchOn}
                onChange={(e) => setSwitchOn(e.target.checked)}
              />
            </div>
          </Demo>
        </Section>

        {/* ══════════ NAVIGASI ══════════ */}
        <Section id="navigasi" title="Navigasi" desc="Berpindah antar halaman & langkah.">
          <Demo label="Tabs — coba panah kiri/kanan">
            <div className="w-full">
              <Tabs
                tabs={[
                  { id: "satu", label: "Tab Satu" },
                  { id: "dua", label: "Tab Dua" },
                  { id: "tiga", label: "Tab Tiga" },
                ]}
                activeId={tab}
                onChange={setTab}
                renderPanel={(id) => (
                  <p className="text-sm text-neutral-600">
                    Konten panel untuk <strong className="text-black">{id}</strong> — terhubung
                    via aria-controls/tabpanel.
                  </p>
                )}
              />
            </div>
          </Demo>
          <Demo label="Breadcrumb">
            <Breadcrumb
              items={[
                { label: "Beranda", href: "#" },
                { label: "Karier", href: "#" },
                { label: "Co-Founder / COO" },
              ]}
            />
          </Demo>
          <Demo label="Pagination">
            <Pagination page={page} totalPages={10} onChange={setPage} />
            <p className="w-full text-xs text-neutral-500">Halaman aktif: {page}</p>
          </Demo>
          <Demo label="Steps">
            <div className="w-full max-w-md">
              <Steps
                current={step}
                steps={[
                  { label: "Isi data", description: "Lengkapi profil kamu" },
                  { label: "Upload CV", description: "Format PDF, maks 5 MB" },
                  { label: "Verifikasi", description: "Jawab soal verifikasi" },
                  { label: "Selesai" },
                ]}
              />
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => setStep((s) => Math.max(0, s - 1))}>
                  Mundur
                </Button>
                <Button size="sm" onClick={() => setStep((s) => Math.min(4, s + 1))}>
                  Maju
                </Button>
              </div>
            </div>
          </Demo>
          <Demo label="DropdownMenu">
            <DropdownMenu
              trigger={
                <Button variant="secondary" size="sm" leftIcon={DotsThree}>
                  Menu
                </Button>
              }
              items={[
                { label: "Ubah", icon: Pencil, onClick: () => alert("Ubah diklik") },
                { label: "Unduh", icon: Download, onClick: () => alert("Unduh diklik") },
                { label: "Hapus", icon: Trash, danger: true, onClick: () => alert("Hapus diklik") },
              ]}
            />
          </Demo>
        </Section>

        {/* ══════════ DATA ══════════ */}
        <Section id="data" title="Data" desc="Tampilkan informasi terstruktur.">
          <Demo label="Card interaktif — arahkan kursor">
            <Card interactive className="max-w-xs !p-5">
              <p className="text-sm font-bold text-black">Kartu bisa diklik</p>
              <p className="mt-1 text-xs text-neutral-500">
                Hover: terangkat + shadow. Props <code className="font-mono">interactive</code>.
              </p>
            </Card>
          </Demo>
          <Demo label="Table">
            <div className="w-full overflow-x-auto">
              <Table>
                <THead>
                  <TR>
                    <TH>Nama</TH>
                    <TH>Posisi</TH>
                    <TH>Status</TH>
                    <TH>Lokasi</TH>
                  </TR>
                </THead>
                <TBody>
                  <TR>
                    <TD>Budi Santoso</TD>
                    <TD>Backend Developer</TD>
                    <TD><Badge variant="success">Diterima</Badge></TD>
                    <TD>Remote</TD>
                  </TR>
                  <TR>
                    <TD>Siti Rahma</TD>
                    <TD>UI/UX Designer</TD>
                    <TD><Badge variant="warning">Wawancara</Badge></TD>
                    <TD>Jakarta</TD>
                  </TR>
                  <TR>
                    <TD>Andi Pratama</TD>
                    <TD>QA Engineer</TD>
                    <TD><Badge variant="neutral">Baru</Badge></TD>
                    <TD>Bandung</TD>
                  </TR>
                </TBody>
              </Table>
            </div>
          </Demo>
          <Demo label="ListItem">
            <div className="w-full max-w-md divide-y divide-neutral-100 rounded-2xl border border-neutral-200">
              <ListItem
                title="Co-Founder / COO"
                description="Remote · Penuh waktu"
                trailing={<Badge variant="brand">15%</Badge>}
                onClick={() => alert("Item diklik")}
              />
              <ListItem
                title="Growth Lead"
                description="Remote · Penuh waktu"
                trailing={<Badge variant="neutral">2–3%</Badge>}
                onClick={() => alert("Item diklik")}
              />
              <ListItem title="Tanpa aksi" description="Baris statis tanpa onClick" />
            </div>
          </Demo>
          <Demo label="Stat">
            <div className="grid w-full gap-3 sm:grid-cols-3">
              <Stat label="Pelamar" value="128" delta={{ value: "+12 minggu ini", up: true }} />
              <Stat label="Lowongan aktif" value="9" />
              <Stat label="Ditolak" value="23" delta={{ value: "-4 minggu ini", up: false }} />
            </div>
          </Demo>
          <Demo label="Avatar">
            <Avatar name="Budi Santoso" size="sm" />
            <Avatar name="Budi Santoso" size="md" />
            <Avatar name="Siti Rahma" size="lg" />
          </Demo>
          <Demo label="Badge">
            <Badge variant="neutral">Netral</Badge>
            <Badge variant="success">Sukses</Badge>
            <Badge variant="warning">Peringatan</Badge>
            <Badge variant="danger">Bahaya</Badge>
            <Badge variant="brand">Brand</Badge>
          </Demo>
        </Section>

        {/* ══════════ FEEDBACK ══════════ */}
        <Section id="feedback" title="Feedback" desc="Umpan balik & status ke pengguna.">
          <Demo label="Alert">
            <div className="w-full space-y-3">
              <Alert variant="info" title="Info">Lamaran kamu sedang ditinjau tim kami.</Alert>
              <Alert variant="success" title="Berhasil">CV berhasil diunggah.</Alert>
              <Alert variant="warning" title="Perhatian">Sesi verifikasi hampir kedaluwarsa.</Alert>
              <Alert variant="danger" title="Gagal">Jawaban verifikasi salah, coba lagi.</Alert>
            </div>
          </Demo>
          <Demo label="Banner">
            <div className="w-full space-y-3 overflow-hidden rounded-2xl">
              <Banner
                variant="info"
                message="Pendaftaran batch 2 dibuka minggu depan"
                action={{ label: "Daftar", onClick: () => alert("Aksi diklik") }}
              />
              <Banner variant="brand" message="Kahade lolos seleksi akselerator 🎉" />
            </div>
          </Demo>
          <Demo label="Modal">
            <Button onClick={() => setModalOpen(true)}>Buka modal</Button>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Hapus lamaran?">
              <p className="text-sm text-neutral-600">
                Data lamaran dan CV akan dihapus permanen dan tidak bisa dikembalikan.
              </p>
              <div className="mt-5 flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setModalOpen(false)}>Batal</Button>
                <Button variant="danger" onClick={() => setModalOpen(false)}>Ya, hapus</Button>
              </div>
            </Modal>
          </Demo>
          <Demo label="Tooltip — arahkan kursor">
            <Tooltip label="Ini tooltip">
              <Button variant="secondary" size="sm">Arahkan aku</Button>
            </Tooltip>
          </Demo>
          <Demo label="Progress">
            <div className="w-full max-w-md">
              <Progress value={progress} label="Kelengkapan profil" />
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="mt-3 w-full accent-black"
                aria-label="Ubah progres"
              />
              <div className="mt-2">
                <Progress value={30} size="sm" />
              </div>
            </div>
          </Demo>
          <Demo label="Skeleton & Spinner">
            <div className="w-full max-w-sm space-y-2">
              <Skeleton width="w-3/5" height="h-4" />
              <Skeleton width="w-full" height="h-4" />
              <Skeleton width="w-2/5" height="h-4" />
            </div>
            <Spinner />
            <Spinner size={32} label="Memuat data…" />
          </Demo>
          <Demo label="EmptyState">
            <div className="w-full max-w-md">
              <EmptyState
                icon={Tray}
                title="Belum ada lamaran"
                description="Lowongan yang kamu lamar akan muncul di sini."
                action={<Button size="sm">Lihat lowongan</Button>}
              />
            </div>
          </Demo>
          <Demo label="Divider">
            <div className="w-full space-y-4">
              <Divider />
              <Divider label="atau lanjutkan dengan" />
              <div className="flex h-16 items-center gap-4">
                <span className="text-xs text-neutral-400">Kiri</span>
                <Divider orientation="vertical" />
                <span className="text-xs text-neutral-400">Kanan</span>
              </div>
            </div>
          </Demo>
          <Demo label="Accordion">
            <div className="w-full max-w-xl">
              <Accordion
                items={[
                  {
                    id: "a1",
                    title: "Apakah ada gaji?",
                    content: "Tim awal tanpa gaji — sebagai gantinya saham/equity dengan skema vesting transparan.",
                  },
                  {
                    id: "a2",
                    title: "Di mana lokasi kerja?",
                    content: "Remote (Indonesia). Beberapa posisi boleh hybrid dari Jakarta.",
                    defaultOpen: true,
                  },
                  {
                    id: "a3",
                    title: "Bagaimana data saya dilindungi?",
                    content: "Sesuai Kebijakan Privasi dan UU PDP. Data pelamar yang ditolak dihapus otomatis maksimal 90 hari.",
                  },
                ]}
              />
            </div>
          </Demo>
          <Demo label="Ikon — wrapper Phosphor">
            <div className="flex items-center gap-4 text-neutral-500">
              <Icon icon={Bell} size={20} />
              <Icon icon={Pencil} size={20} />
              <Icon icon={Trash} size={20} />
              <Icon icon={Download} size={20} />
            </div>
            <p className="w-full text-xs text-neutral-400">
              Selalu via wrapper <code className="font-mono">Icon</code>, weight regular default.
            </p>
          </Demo>
        </Section>

        <Section
          id="aksesibilitas"
          title="Aksesibilitas"
          desc="Semua komponen bisa dioperasikan penuh dengan keyboard. Coba: Tab untuk berpindah, Enter/Space untuk aktivasi, panah kiri/kanan di Tabs, ESC untuk menutup Modal & DropdownMenu."
        >
          <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
            <li>
              <strong className="text-black">Modal</strong> — focus trap: Tab berputar di dalam
              dialog, fokus kembali ke tombol pemicu saat ditutup. Coba buka modal di section
              Feedback lalu tekan Tab berulang.
            </li>
            <li>
              <strong className="text-black">Tabs</strong> — panah kiri/kanan, Home, End untuk
              pindah tab; roving tabindex (hanya tab aktif yang terjangkau Tab).
            </li>
            <li>
              <strong className="text-black">Form</strong> — label terasosiasi, hint & error
              terbaca screen reader via <code className="font-mono">aria-describedby</code>,
              error memakai <code className="font-mono">role="alert"</code>.
            </li>
            <li>
              <strong className="text-black">Switch</strong> — <code className="font-mono">role="switch"</code>;
              {" "}<strong className="text-black">OtpInput</strong> — tiap kotak berlabel
              "Digit ke-N"; <strong className="text-black">CopyButton</strong> mengumumkan
              "Tersalin!" via live region.
            </li>
            <li>
              <strong className="text-black">Animasi</strong> — semua ≤200ms dan otomatis
              dimatikan bila pengguna mengaktifkan{" "}
              <code className="font-mono">prefers-reduced-motion</code>.
            </li>
          </ul>
        </Section>
      </main>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-6">
          <Logo size={22} />
          <p className="text-xs text-neutral-400">
            @kahade/ui v0.3.0 — Design System Kahade · PT Kawal Hak Dengan Aman
          </p>
        </div>
      </footer>
    </div>
  );
}
