export interface Pengukuran {
  bulan: string;       // e.g. "Jan", "Feb", "Mar", "Apr", "Mei", "Jun"
  tahun: string;       // e.g. "2026"
  beratBadan: number;  // kg
  tinggiBadan: number; // cm
  lingkarKepala: number; // cm
  lingkarLengan: number; // cm
}

export interface Balita {
  id: string;
  name: string;
  age: string; // e.g. "8 bln"
  gender: string; // e.g. "Laki laki" or "Perempuan"
  mom: string;
  address: string;
  color: string;
  status: "Sudah diukur" | "Belum diukur";
  absenStatus: "hadir" | "tidak";
  riwayatPengukuran: Pengukuran[];
}

const DEFAULT_BALITA: Balita[] = [
  { 
    id: "1", 
    name: "Bagas Pratama", 
    age: "8 bln", 
    gender: "Laki laki", 
    mom: "Ibu Rina", 
    address: "RT 01 / RW 02", 
    color: "bg-[#e5f5fd] text-sky-500",
    status: "Sudah diukur",
    absenStatus: "tidak",
    riwayatPengukuran: [
      { bulan: "Jan", tahun: "2026", beratBadan: 7.2, tinggiBadan: 65.0, lingkarKepala: 42.1, lingkarLengan: 12.5 },
      { bulan: "Feb", tahun: "2026", beratBadan: 7.8, tinggiBadan: 67.5, lingkarKepala: 42.8, lingkarLengan: 12.9 },
      { bulan: "Mar", tahun: "2026", beratBadan: 8.4, tinggiBadan: 70.1, lingkarKepala: 43.6, lingkarLengan: 13.2 },
      { bulan: "Apr", tahun: "2026", beratBadan: 8.9, tinggiBadan: 72.4, lingkarKepala: 44.2, lingkarLengan: 13.5 },
      { bulan: "Mei", tahun: "2026", beratBadan: 9.3, tinggiBadan: 74.8, lingkarKepala: 44.9, lingkarLengan: 13.8 },
      { bulan: "Jun", tahun: "2026", beratBadan: 9.6, tinggiBadan: 77.0, lingkarKepala: 45.6, lingkarLengan: 14.2 }
    ]
  },
  { 
    id: "2", 
    name: "Aisyah Putri", 
    age: "14 bln", 
    gender: "Perempuan", 
    mom: "Ibu Siti", 
    address: "RT 03 / RW 02", 
    color: "bg-[#fce5f1] text-pink-500",
    status: "Sudah diukur",
    absenStatus: "hadir",
    riwayatPengukuran: [
      { bulan: "Jan", tahun: "2026", beratBadan: 8.5, tinggiBadan: 73.0, lingkarKepala: 43.0, lingkarLengan: 13.0 },
      { bulan: "Feb", tahun: "2026", beratBadan: 8.9, tinggiBadan: 74.2, lingkarKepala: 43.5, lingkarLengan: 13.2 },
      { bulan: "Mar", tahun: "2026", beratBadan: 9.2, tinggiBadan: 75.5, lingkarKepala: 44.0, lingkarLengan: 13.4 },
      { bulan: "Apr", tahun: "2026", beratBadan: 9.5, tinggiBadan: 76.8, lingkarKepala: 44.5, lingkarLengan: 13.7 },
      { bulan: "Mei", tahun: "2026", beratBadan: 9.8, tinggiBadan: 78.0, lingkarKepala: 45.0, lingkarLengan: 13.9 },
      { bulan: "Jun", tahun: "2026", beratBadan: 10.1, tinggiBadan: 79.2, lingkarKepala: 45.5, lingkarLengan: 14.1 }
    ]
  },
  { 
    id: "3", 
    name: "Cinta Lestari", 
    age: "22 bln", 
    gender: "Perempuan", 
    mom: "Ibu Wati", 
    address: "RT 04 / RW 02", 
    color: "bg-[#fce5f1] text-pink-500",
    status: "Belum diukur",
    absenStatus: "tidak",
    riwayatPengukuran: [
      { bulan: "Jan", tahun: "2026", beratBadan: 10.2, tinggiBadan: 81.0, lingkarKepala: 45.0, lingkarLengan: 14.0 },
      { bulan: "Feb", tahun: "2026", beratBadan: 10.5, tinggiBadan: 82.2, lingkarKepala: 45.3, lingkarLengan: 14.2 },
      { bulan: "Mar", tahun: "2026", beratBadan: 10.8, tinggiBadan: 83.5, lingkarKepala: 45.6, lingkarLengan: 14.4 },
      { bulan: "Apr", tahun: "2026", beratBadan: 11.0, tinggiBadan: 84.8, lingkarKepala: 45.9, lingkarLengan: 14.6 },
      { bulan: "Mei", tahun: "2026", beratBadan: 11.3, tinggiBadan: 86.0, lingkarKepala: 46.2, lingkarLengan: 14.8 }
      // June 2026 is intentionally missing to let the user measure this child!
    ]
  }
];

const STORAGE_KEY = "posyandu_balita_data_v1";

export function getBalitaList(): Balita[] {
  if (typeof window === "undefined") {
    return DEFAULT_BALITA;
  }
  
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_BALITA));
    return DEFAULT_BALITA;
  }
  
  try {
    const list = JSON.parse(raw) as Balita[];
    // Migrasi data lama jika tidak memiliki riwayatPengukuran
    let changed = false;
    const migrated = list.map((b) => {
      if (!b.riwayatPengukuran) {
        b.riwayatPengukuran = DEFAULT_BALITA.find((def) => def.id === b.id)?.riwayatPengukuran || [];
        changed = true;
      }
      return b;
    });
    if (changed) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    }
    return migrated;
  } catch (e) {
    return DEFAULT_BALITA;
  }
}

export function saveBalitaList(list: Balita[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
}

export function addBalita(balita: Omit<Balita, "id" | "color" | "status" | "absenStatus" | "riwayatPengukuran">): Balita {
  const list = getBalitaList();
  const newId = (Math.max(...list.map(b => parseInt(b.id) || 0), 0) + 1).toString();
  
  const color = balita.gender.toLowerCase().includes("perempuan") 
    ? "bg-[#fce5f1] text-pink-500" 
    : "bg-[#e5f5fd] text-sky-500";
    
  const newBalita: Balita = {
    ...balita,
    id: newId,
    color,
    status: "Belum diukur",
    absenStatus: "tidak",
    riwayatPengukuran: []
  };
  
  list.push(newBalita);
  saveBalitaList(list);
  return newBalita;
}

export function updateBalita(id: string, updatedFields: Partial<Balita>) {
  const list = getBalitaList();
  const index = list.findIndex(b => b.id === id);
  if (index !== -1) {
    list[index] = { ...list[index], ...updatedFields };
    saveBalitaList(list);
  }
}

export function deleteBalita(id: string) {
  const list = getBalitaList();
  const filtered = list.filter(b => b.id !== id);
  saveBalitaList(filtered);
}
