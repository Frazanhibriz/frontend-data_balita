"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Baby, ChevronDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";
import { getBalitaList, Balita, updateBalita } from "@/components/ui/storage";

export default function EditBalitaPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [balita, setBalita] = useState<Balita | null>(null);

  // Bind fields to state
  const [name, setName] = useState("");
  const [mom, setMom] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [nikBayi, setNikBayi] = useState("");
  const [nikWali, setNikWali] = useState("");
  const [pjLahir, setPjLahir] = useState("12");
  const [bbLahir, setBbLahir] = useState("12");
  const [lkLahir, setLkLahir] = useState("12");
  const [llaLahir, setLlaLahir] = useState("12");

  useEffect(() => {
    const list = getBalitaList();
    const found = list.find((b) => b.id === id);
    if (found) {
      setBalita(found);
      setName(found.name);
      setMom(found.mom);
      setAddress(found.address);
      setGender(found.gender);
    }
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
      <Navbar title="Edit Data Balita" />
      <main className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6 mt-2">
        <div className="flex items-center justify-between relative h-10">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors bg-white shadow-sm z-10 active:scale-95">
            <ArrowLeft size={20} className="text-black" />
          </button>
          <h1 className="text-lg font-bold text-black absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">Edit Data Balita</h1>
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

        <div className="space-y-4 pt-2">
          <p className="text-xs font-bold text-gray-500 ml-1">Data Utama Balita</p>
          <div className="space-y-1">
            <label className="text-xs font-bold text-black">Nama Balita</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full border border-gray-200 rounded-xl p-3.5 text-sm text-black font-bold focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white shadow-sm" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-black">Nama Wali / Ibu</label>
            <input 
              type="text" 
              value={mom} 
              onChange={(e) => setMom(e.target.value)} 
              className="w-full border border-gray-200 rounded-xl p-3.5 text-sm text-black font-bold focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white shadow-sm" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-black">Alamat / RT / RW</label>
            <input 
              type="text" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              className="w-full border border-gray-200 rounded-xl p-3.5 text-sm text-black font-bold focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white shadow-sm" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-black">Jenis Kelamin</label>
            <div className="relative">
              <select 
                value={gender} 
                onChange={(e) => setGender(e.target.value)} 
                className="w-full appearance-none bg-white border border-gray-200 rounded-xl p-3.5 text-sm font-bold text-black focus:outline-none focus:ring-1 focus:ring-teal-500 shadow-sm cursor-pointer"
              >
                <option value="Laki laki">Laki laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-black pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-500 ml-1">Identitas Tambahan</p>
          <div className="space-y-1">
            <label className="text-xs font-bold text-black">NIK bayi / balita</label>
            <input 
              type="number" 
              placeholder="16 digit NIK" 
              value={nikBayi}
              onChange={(e) => setNikBayi(e.target.value)}
              className="w-full border border-gray-200 rounded-xl p-3.5 text-sm text-black font-bold focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white shadow-sm" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-black">NIK Wali</label>
            <input 
              type="number" 
              placeholder="16 digit NIK" 
              value={nikWali}
              onChange={(e) => setNikWali(e.target.value)}
              className="w-full border border-gray-200 rounded-xl p-3.5 text-sm text-black font-bold focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white shadow-sm" 
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-500 ml-1">Data Pengukuran Terbaru</p>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-black">Panjang / Tinggi (cm)</label>
            <input 
              type="number" 
              value={pjLahir} 
              onChange={(e) => setPjLahir(e.target.value)} 
              className="w-full border border-gray-200 rounded-xl p-3.5 text-sm text-black font-bold focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white shadow-sm" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-black">Berat (kg)</label>
            <input 
              type="number" 
              value={bbLahir} 
              onChange={(e) => setBbLahir(e.target.value)} 
              className="w-full border border-gray-200 rounded-xl p-3.5 text-sm text-black font-bold focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white shadow-sm" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-black">Lingkar Kepala (cm)</label>
            <input 
              type="number" 
              value={lkLahir} 
              onChange={(e) => setLkLahir(e.target.value)} 
              className="w-full border border-gray-200 rounded-xl p-3.5 text-sm text-black font-bold focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white shadow-sm" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-black">Lingkar Lengan Atas (cm)</label>
            <input 
              type="number" 
              value={llaLahir} 
              onChange={(e) => setLlaLahir(e.target.value)} 
              className="w-full border border-gray-200 rounded-xl p-3.5 text-sm text-black font-bold focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white shadow-sm" 
            />
          </div>
        </div>

        <button onClick={() => {
          const color = gender.toLowerCase().includes("perempuan") 
            ? "bg-[#fce5f1] text-pink-500" 
            : "bg-[#e5f5fd] text-sky-500";
            
          updateBalita(id, {
            name,
            mom,
            address,
            gender,
            color,
            status: "Sudah diukur" // Once edited/measured, update the status
          });
          alert('Data balita berhasil diedit!');
          router.back();
        }} className="w-full bg-[#1fb999] hover:bg-teal-600 text-white font-bold py-4 rounded-xl transition-colors active:scale-95 shadow-md shadow-teal-100 mt-6">
          Simpan Perubahan & Pengukuran
        </button>
      </main>
    </div>
  );
}
