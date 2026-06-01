"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Baby, ChevronDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";
import { getBalitaList, saveBalitaList, Balita, Pengukuran } from "@/components/ui/storage";

export default function UkurBalitaPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [balita, setBalita] = useState<Balita | null>(null);

  // Form states
  const [tinggi, setTinggi] = useState("");
  const [berat, setBerat] = useState("");
  const [lingkarKepala, setLingkarKepala] = useState("");
  const [lingkarLengan, setLingkarLengan] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Juni");

  useEffect(() => {
    const list = getBalitaList();
    const found = list.find((b) => b.id === id);
    setBalita(found || null);
  }, [id]);

  if (!balita) {
    return (
      <div className="min-h-screen bg-gray-50 text-black font-sans flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-semibold text-gray-500">Memuat data balita...</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (!tinggi || !berat || !lingkarKepala || !lingkarLengan) {
      alert("Harap isi semua data pengukuran!");
      return;
    }

    const list = getBalitaList();
    const index = list.findIndex(b => b.id === id);
    if (index === -1) return;

    // Map month string to standard abbreviation in database
    const monthMap: Record<string, string> = {
      "April": "Apr",
      "Mei": "Mei",
      "Juni": "Jun"
    };
    const dbMonth = monthMap[selectedMonth] || "Jun";
    const dbYear = new Date().getFullYear().toString(); // e.g. "2026"

    const newMeasurement: Pengukuran = {
      bulan: dbMonth,
      tahun: dbYear,
      beratBadan: parseFloat(berat),
      tinggiBadan: parseFloat(tinggi),
      lingkarKepala: parseFloat(lingkarKepala),
      lingkarLengan: parseFloat(lingkarLengan)
    };

    const currentBalita = list[index];
    const existingHistory = currentBalita.riwayatPengukuran || [];
    
    // Check if measurement for this month & year already exists
    const existingIndex = existingHistory.findIndex(p => p.bulan === dbMonth && p.tahun === dbYear);
    
    let updatedHistory = [...existingHistory];
    if (existingIndex !== -1) {
      // Overwrite existing record
      updatedHistory[existingIndex] = newMeasurement;
    } else {
      // Append new record
      updatedHistory.push(newMeasurement);
    }

    // Update balita in list
    list[index] = {
      ...currentBalita,
      status: "Sudah diukur",
      riwayatPengukuran: updatedHistory
    };

    saveBalitaList(list);
    alert('Pengukuran berhasil disimpan!');
    router.back();
  };

  const InputWithSuffix = ({ 
    label, 
    suffix, 
    value, 
    onChange, 
    sublabel = "" 
  }: { 
    label: string, 
    suffix: string, 
    value: string, 
    onChange: (val: string) => void, 
    sublabel?: string 
  }) => (
    <div className="space-y-1">
      <div className="flex justify-between items-end">
        <label className="text-xs font-bold text-black">{label}</label>
        {sublabel && <span className="text-[9px] text-gray-400">{sublabel}</span>}
      </div>
      <div className="relative">
        <input 
          type="number" 
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.0"
          className="w-full border border-gray-200 rounded-xl p-3.5 pr-12 text-sm text-black font-bold focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white shadow-sm placeholder:text-gray-300" 
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">{suffix}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans pb-10">
      <Navbar title="Input Pengukuran" />
      
      <main className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6 mt-2">
        <div className="flex items-center justify-between relative h-10">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors bg-white shadow-sm z-10 active:scale-95">
            <ArrowLeft size={20} className="text-black" />
          </button>
          <h1 className="text-lg font-bold text-black absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">Input Pengukuran</h1>
        </div>

        <Card className="p-5 bg-white border border-gray-100 shadow-sm rounded-xl flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${balita.color} shrink-0`}>
            <Baby size={24} />
          </div>
          <div>
            <h5 className="text-sm font-bold text-black">{balita.name}</h5>
            <p className="text-xs text-gray-700 mt-1">{balita.age} • {balita.gender}</p>
            <p className="text-xs text-gray-700 mt-0.5">{balita.mom} • {balita.address}</p>
          </div>
        </Card>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 ml-1">Bulan Pengukuran</label>
          <div className="relative">
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 rounded-xl p-4 text-sm text-black font-bold focus:outline-none focus:ring-1 focus:ring-teal-500 shadow-sm cursor-pointer"
            >
              <option value="April">April</option>
              <option value="Mei">Mei</option>
              <option value="Juni">Juni</option>
            </select>
            <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-black pointer-events-none" />
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <p className="text-xs font-bold text-gray-500 ml-1">Data Pengukuran</p>
          <InputWithSuffix label="Panjang / Tinggi" suffix="cm" value={tinggi} onChange={setTinggi} />
          <InputWithSuffix label="Berat" suffix="kg" value={berat} onChange={setBerat} />
          <InputWithSuffix label="Lingkar Kepala" suffix="cm" value={lingkarKepala} onChange={setLingkarKepala} />
          <InputWithSuffix label="Lingkar Lengan Atas" suffix="cm" value={lingkarLengan} onChange={setLingkarLengan} sublabel="Untuk balita usia > 6 bulan" />
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-[#1fb999] hover:bg-teal-600 text-white font-bold py-4 rounded-xl transition-colors active:scale-95 shadow-md shadow-teal-100 mt-6 cursor-pointer"
        >
          Simpan Pengukuran
        </button>
      </main>
    </div>
  );
}
