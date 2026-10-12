"use client";

import { useState, type ReactNode } from "react";
import { ArrowRight, DotsThree, DownloadSimple, Pencil, ShareNetwork, Trash, X } from "@phosphor-icons/react";
import {
  Accordion,
  Button,
  ButtonLink,
  Checkbox,
  CopyButton,
  DropdownMenu,
  EmptyState,
  FileUpload,
  IconButton,
  Input,
  Modal,
  OtpInput,
  Pagination,
  PasswordInput,
  PhoneInput,
  Progress,
  Radio,
  SearchField,
  Select,
  Spinner,
  Switch,
  Tabs,
  TextLink,
  Textarea,
  Tooltip,
} from "@kahade/ui";

function Specimen({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-3 text-caption font-semibold text-fg-subtle">{label}</p>
      {children}
    </div>
  );
}

export function ButtonsDemo() {
  return (
    <div className="space-y-10">
      <Specimen label="Varian">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Nonaktif</Button>
          <Button loading>Memuat</Button>
        </div>
      </Specimen>
      <Specimen label="Ukuran · ikon">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Kecil</Button>
          <Button size="md" rightIcon={ArrowRight}>Sedang</Button>
          <Button size="lg" leftIcon={DownloadSimple}>Besar</Button>
        </div>
      </Specimen>
      <Specimen label="Di permukaan hitam">
        <div className="flex flex-wrap items-center gap-3 rounded-panel bg-black p-6">
          <Button variant="inverse">Inverse</Button>
          <Button variant="inverseSecondary">Inverse secondary</Button>
        </div>
      </Specimen>
      <Specimen label="IconButton · CopyButton · TextLink · ButtonLink">
        <div className="flex flex-wrap items-center gap-3">
          <IconButton icon={ShareNetwork} label="Bagikan" />
          <IconButton icon={Pencil} label="Ubah" variant="ghost" />
          <IconButton icon={X} label="Tutup" variant="solid" />
          <CopyButton text="halo@kahade.id" label="Salin email" />
          <ButtonLink href="#tombol" variant="secondary">Tautan bertampang tombol</ButtonLink>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-8">
          <TextLink href="#tombol">Lihat semua</TextLink>
          <TextLink href="#tombol" arrow="left">Kembali</TextLink>
          <TextLink href="https://kahade.id/" arrow="external">kahade.id</TextLink>
        </div>
      </Specimen>
    </div>
  );
}

export function FormDemo() {
  const [files, setFiles] = useState<string[]>([]);
  const [otp, setOtp] = useState<string | null>(null);
  return (
    <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
      <Input label="Nama lengkap" placeholder="Nama kamu" hint="Sesuai KTP" required />
      <Input label="Email" placeholder="nama@email.com" defaultValue="nama@" error="Format email tidak valid" />
      <PasswordInput label="Kata sandi" placeholder="Minimal 8 karakter" />
      <PhoneInput label="Nomor HP" placeholder="81234567890" />
      <Select
        label="Kategori"
        options={[
          { value: "akun", label: "Akun" },
          { value: "transaksi", label: "Transaksi" },
          { value: "penipuan", label: "Laporan penipuan" },
        ]}
        defaultValue=""
      />
      <SearchField label="Pencarian" placeholder="Cari: biaya, OTP, sengketa…" />
      <div className="md:col-span-2">
        <Textarea label="Pesan" placeholder="Ceritakan masalahmu sedetail mungkin" />
      </div>
      <div className="space-y-4">
        <Checkbox label="Saya menyetujui Syarat & Ketentuan" defaultChecked />
        <Checkbox label="Kirim kabar peluncuran" hint="Maksimal sebulan sekali" />
        <Switch label="Notifikasi transaksi" defaultChecked />
      </div>
      <fieldset className="space-y-4">
        <legend className="mb-2 text-small font-semibold text-fg">Peran</legend>
        <Radio name="peran" label="Pembeli" defaultChecked />
        <Radio name="peran" label="Penjual" />
      </fieldset>
      <div>
        <OtpInput label="Kode OTP" onComplete={setOtp} hint={otp ? `Kode ${otp} lengkap` : "6 digit dari WhatsApp"} />
      </div>
      <div>
        <FileUpload label="CV" hint="PDF, maks 5 MB" accept=".pdf" onFiles={(f) => setFiles(Array.from(f).map((x) => x.name))} />
        {files.length > 0 && <p className="mt-2 text-small text-fg-muted">{files.join(", ")}</p>}
      </div>
    </div>
  );
}

export function NavigationDemo() {
  const [tab, setTab] = useState("feed");
  const [seg, setSeg] = useState("semua");
  const [page, setPage] = useState(3);
  return (
    <div className="space-y-12">
      <Specimen label="Tabs — underline">
        <Tabs
          tabs={[
            { id: "feed", label: "Feed" },
            { id: "chat", label: "Chat" },
            { id: "perlindungan", label: "Perlindungan" },
          ]}
          activeId={tab}
          onChange={setTab}
          renderPanel={(id) => <p className="text-body text-fg-muted">Panel aktif: {id}. Panah kiri/kanan berpindah tab.</p>}
        />
      </Specimen>
      <Specimen label="Tabs — segmented">
        <Tabs
          variant="segmented"
          tabs={[
            { id: "semua", label: "Semua" },
            { id: "keamanan", label: "Keamanan" },
            { id: "fitur", label: "Fitur" },
          ]}
          activeId={seg}
          onChange={setSeg}
        />
      </Specimen>
      <Specimen label="Pagination">
        <Pagination page={page} totalPages={10} onChange={setPage} />
      </Specimen>
      <Specimen label="Accordion">
        <Accordion
          size="lg"
          items={[
            { id: "a1", title: "Apakah Kahade aman?", content: "Dana pembeli diamankan sampai barang dikonfirmasi diterima." },
            { id: "a2", title: "Berapa biaya transaksi?", content: "2,5% per transaksi, minimum Rp2.500, maksimum Rp250.000." },
          ]}
        />
      </Specimen>
    </div>
  );
}

export function FeedbackDemo() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(45);
  return (
    <div className="mt-12 space-y-12">
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Buka modal
        </Button>
        <DropdownMenu
          trigger={
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong">
              <DotsThree size={20} />
            </span>
          }
          items={[
            { label: "Ubah", icon: Pencil, onClick: () => undefined },
            { label: "Hapus", icon: Trash, onClick: () => undefined, danger: true },
          ]}
        />
        <Tooltip label="Tooltip muncul saat hover atau fokus">
          <Button variant="ghost">Arahkan ke sini</Button>
        </Tooltip>
        <Spinner />
      </div>
      <div className="max-w-md">
        <Progress value={progress} label="Kelengkapan profil" />
        <div className="mt-3 flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => setProgress((p) => Math.max(0, p - 15))}>−15</Button>
          <Button size="sm" variant="secondary" onClick={() => setProgress((p) => Math.min(100, p + 15))}>+15</Button>
        </div>
      </div>
      <div className="rounded-panel border border-line">
        <EmptyState title="Belum ada insiden" description="Tidak ada insiden layanan yang tercatat." />
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Konfirmasi barang diterima">
        <p className="text-body text-fg-muted">
          Setelah dikonfirmasi, dana diteruskan ke penjual. Pastikan barang sesuai kesepakatan.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setOpen(false)}>Batal</Button>
          <Button onClick={() => setOpen(false)}>Konfirmasi</Button>
        </div>
      </Modal>
    </div>
  );
}
