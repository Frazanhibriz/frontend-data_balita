import { Balita, Pengukuran, Absensi, BerandaStats } from "@/types";

// Helper for local storage
const STORAGE_KEY = "posyandu_v2_mock_db";

function getDB(): { balita: Balita[], absensi: Absensi[] } {
  if (typeof window === "undefined") return { balita: [], absensi: [] };
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);

  const initData = {
    balita: [
      {
        id: "1",
        nama: "Bagas Pratama",
        jenisKelamin: "LAKI_LAKI",
        tglLahir: new Date(new Date().setMonth(new Date().getMonth() - 8)).toISOString(),
        anakKe: 1,
        rt: "1",
        rw: "2",
        nik: "1234567890123456",
        nikWali: "1234567890123456",
        namaWali: "Ibu Rina",
        noWhatsapp: "08123456789",
        alamat: "Jl. Sidorejo",
        panjangLahir: 50,
        beratLahir: 3.2,
        lingkarKepalaLahir: 34,
        usiaKehamilan: 38,
        createdAt: new Date().toISOString(),
        pengukuran: [
           { id: "p1", bulan: 1, tahun: 2026, beratBadan: 7.2, tinggiBadan: 65, lingkarKepala: 42.1, lingkarLengan: 12.5, createdAt: new Date().toISOString() },
           { id: "p2", bulan: 2, tahun: 2026, beratBadan: 7.8, tinggiBadan: 67.5, lingkarKepala: 42.8, lingkarLengan: 12.9, createdAt: new Date().toISOString() },
        ]
      },
      {
        id: "2",
        nama: "Aisyah Putri",
        jenisKelamin: "PEREMPUAN",
        tglLahir: new Date(new Date().setMonth(new Date().getMonth() - 14)).toISOString(),
        anakKe: 2,
        rt: "3",
        rw: "2",
        nik: "9876543210987654",
        nikWali: "9876543210987654",
        namaWali: "Ibu Siti",
        noWhatsapp: "08987654321",
        alamat: "Jl. Sidorejo",
        panjangLahir: 48,
        beratLahir: 2.9,
        lingkarKepalaLahir: 33,
        usiaKehamilan: 39,
        createdAt: new Date().toISOString(),
        pengukuran: [
           { id: "p3", bulan: 1, tahun: 2026, beratBadan: 8.5, tinggiBadan: 73.0, lingkarKepala: 43.0, lingkarLengan: 13.0, createdAt: new Date().toISOString() },
           { id: "p4", bulan: 2, tahun: 2026, beratBadan: 8.9, tinggiBadan: 74.2, lingkarKepala: 43.5, lingkarLengan: 13.2, createdAt: new Date().toISOString() },
        ]
      }
    ] as Balita[],
    absensi: [
      { id: "a1", balitaId: "1", isHadir: true, bulan: 2, tahun: 2026, createdAt: new Date().toISOString() },
      { id: "a2", balitaId: "2", isHadir: false, bulan: 2, tahun: 2026, createdAt: new Date().toISOString() },
    ] as Absensi[]
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initData));
  return initData;
}

function saveDB(db: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  }
}

export function getAuthToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp('(^| )posyandu_session=([^;]+)'));
  if (match) return match[2];
  return null;
}

// Authentication
export async function login(identifier: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> {
  // Mock login success
  if (typeof document !== "undefined") {
    document.cookie = `posyandu_session=mock_token;path=/;SameSite=Lax`;
  }
  return { success: true, token: "mock_token" };
}

export async function logout(): Promise<void> {
  if (typeof document !== "undefined") {
    document.cookie = `posyandu_session=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
  }
}

// Dashboard
export async function getDashboardStats(): Promise<BerandaStats> {
  const db = getDB();
  return {
    totalBalita: db.balita.length,
    hadirBulanIni: db.absensi.filter(a => a.isHadir).length,
    belumHadir: db.balita.length - db.absensi.filter(a => a.isHadir).length,
    belumDiukur: db.balita.length - db.balita.filter(b => b.pengukuran && b.pengukuran.length > 0).length,
  };
}

// Balita
export async function getBalitaList(): Promise<Balita[]> {
  return getDB().balita;
}

export async function getBalitaById(id: string): Promise<Balita | null> {
  return getDB().balita.find(b => b.id === id) || null;
}

export async function createBalita(balita: any): Promise<Balita> {
  const db = getDB();
  const newBalita: Balita = {
    ...balita,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    pengukuran: []
  };
  db.balita.push(newBalita);
  saveDB(db);
  return newBalita;
}

export async function updateBalita(id: string, updatedFields: Partial<Balita>): Promise<void> {
  const db = getDB();
  const idx = db.balita.findIndex(b => b.id === id);
  if (idx !== -1) {
    db.balita[idx] = { ...db.balita[idx], ...updatedFields };
    saveDB(db);
  }
}

export async function deleteBalita(id: string, alasan: string): Promise<void> {
  const db = getDB();
  db.balita = db.balita.filter(b => b.id !== id);
  saveDB(db);
}

// Pengukuran
export async function addPengukuran(id: string, pengukuran: Partial<Pengukuran>): Promise<void> {
  const db = getDB();
  const idx = db.balita.findIndex(b => b.id === id);
  if (idx !== -1) {
    if (!db.balita[idx].pengukuran) db.balita[idx].pengukuran = [];
    db.balita[idx].pengukuran!.push({
      ...pengukuran,
      id: String(Date.now()),
      createdAt: new Date().toISOString()
    } as Pengukuran);
    saveDB(db);
  }
}

// Absensi
export async function getAbsensiList(bulan?: number, tahun?: number): Promise<Absensi[]> {
  const db = getDB();
  return db.absensi.filter(a => {
    if (bulan && a.bulan !== bulan) return false;
    if (tahun && a.tahun !== tahun) return false;
    return true;
  });
}

export async function bulkUpdateAbsensi(absensiUpdates: { balitaId: string; isHadir: boolean; bulan: number; tahun: number }[]): Promise<void> {
  const db = getDB();
  for (const update of absensiUpdates) {
    const existing = db.absensi.find(a => a.balitaId === update.balitaId && a.bulan === update.bulan && a.tahun === update.tahun);
    if (existing) {
      existing.isHadir = update.isHadir;
    } else {
      db.absensi.push({
        id: String(Date.now()) + Math.random(),
        balitaId: update.balitaId,
        bulan: update.bulan,
        tahun: update.tahun,
        isHadir: update.isHadir,
        createdAt: new Date().toISOString()
      });
    }
  }
  saveDB(db);
}
