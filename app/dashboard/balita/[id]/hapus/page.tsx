"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Trash2, Baby, AlertTriangle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";
import { getBalitaList, Balita, deleteBalita } from "@/components/ui/storage";

export default function HapusBalitaPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [balita, setBalita] = useState<Balita | null>(null);
  const [alasan, setAlasan] = useState("Pindah Alamat");

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
          <p className="text-xs font-semibold text-gray-500">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans pb-10">
      <Navbar title="Hapus Data Balita" />
      <main className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6 mt-2">
        <div className="flex items-center justify-between relative h-10">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors bg-white shadow-sm z-10 active:scale-95">
            <ArrowLeft size={20} className="text-black" />
          </button>
          <h1 className="text-lg font-bold text-black absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">Hapus Balita</h1>
        </div>

        <Card className="p-5 bg-white border border-gray-100 shadow-sm rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-50 text-red-500 shrink-0">
            <Trash2 size={24} />
          </div>
          <div>
            <h5 className="text-sm font-bold text-black">{balita.name}</h5>
            <p className="text-xs text-gray-700 mt-1">{balita.age} • {balita.gender}</p>
            <p className="text-xs text-gray-700 mt-0.5">{balita.mom} • {balita.address}</p>
          </div>
        </Card>

        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-500 ml-1">Alasan Penghapusan</p>
          {["Pindah Alamat", "Usia > 60", "Permintaan wali"].map((opt) => (
            <div key={opt} onClick={() => setAlasan(opt)} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all active:scale-95 ${alasan === opt ? "border-[#1fb999] bg-[#f0fbf9]" : "border-gray-200 bg-white"}`}>
              <span className="text-sm font-medium text-black">{opt}</span>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${alasan === opt ? "border-[#1fb999]" : "border-gray-300"}`}>
                {alasan === opt && <div className="w-2.5 h-2.5 rounded-full bg-[#1fb999]"></div>}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl border border-orange-200 bg-[#fffdf0] text-orange-600">
          <AlertTriangle size={20} />
          <span className="text-xs font-bold">Data akan dihapus dari daftar aktif</span>
        </div>

        <button onClick={() => {
          deleteBalita(id);
          alert('Data balita berhasil dihapus!');
          router.push('/dashboard/balita');
        }} className="w-full bg-[#e3242b] hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors active:scale-95 shadow-md shadow-red-200 mt-4">
          Hapuskan
        </button>
      </main>
    </div>
  );
}
