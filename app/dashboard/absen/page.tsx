"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown, Baby, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";
import { getBalitaList, Balita, updateBalita } from "@/components/ui/storage";

export default function AbsenBalitaPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [absenData, setAbsenData] = useState<Balita[]>([]);

  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
  
  const currentYear = new Date().getFullYear();
  const startYear = 2015;
  const years = [];
  for (let y = currentYear; y >= startYear; y--) {
    years.push(y);
  }

  const currentMonthName = months[new Date().getMonth()];
  const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  useEffect(() => {
    setAbsenData(getBalitaList());
  }, []);

  const handleStatusChange = (id: string, newStatus: "hadir" | "tidak") => {
    updateBalita(id, { absenStatus: newStatus });
    setAbsenData(getBalitaList());
  };

  const filteredData = absenData.filter(item => {
    if (filter === "Sudah hadir" && item.absenStatus !== "hadir") return false;
    if (filter === "Belum hadir" && item.absenStatus !== "tidak") return false;
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans pb-10">
      <Navbar title="Absen Balita" />
      <main className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6 mt-2">
        
        <div className="flex items-center justify-between relative h-10 mb-4">
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors bg-white shadow-sm z-10 active:scale-95">
            <ArrowLeft size={20} className="text-black" />
          </button>
          <h1 className="text-lg font-bold text-black absolute left-1/2 -translate-x-1/2 w-full text-center pointer-events-none">Absen Balita</h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-500 ml-1">Bulan</label>
            <div className="relative">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 rounded-xl p-3.5 text-sm font-bold text-black focus:outline-none focus:ring-1 focus:ring-teal-500 shadow-sm cursor-pointer"
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-500 ml-1">Tahun</label>
            <div className="relative">
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 rounded-xl p-3.5 text-sm font-bold text-black focus:outline-none focus:ring-1 focus:ring-teal-500 shadow-sm cursor-pointer"
              >
                {years.map((y) => (
                  <option key={y} value={y.toString()}>{y}</option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Info Pilihan Absen */}
        <div className="bg-[#f0fbf9] border border-teal-100 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-[#0d9488] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">i</div>
          <div>
            <p className="text-xs text-teal-900 font-bold leading-relaxed">
              Informasi Pilihan Absen
            </p>
            <p className="text-[11px] text-teal-700 font-semibold leading-relaxed mt-0.5">
              Pilihan bulan mencakup dari Jan - Des. Pilihan tahun berkisar dari minimal tahun 2015 hingga maksimal tahun ini ({currentYear}).
            </p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
          <input 
            type="text"
            placeholder="Cari nama balita" 
            className="pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-white w-full focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm shadow-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["Semua", "Sudah hadir", "Belum hadir"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 active:scale-95 border ${
                filter === tab 
                  ? "bg-[#1fb999] text-white border-[#1fb999] shadow-sm shadow-teal-100" 
                  : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredData.length > 0 ? (
            filteredData.map((balita) => (
              <Card key={balita.id} className="p-4 flex flex-wrap sm:flex-nowrap items-center justify-between bg-white border border-gray-100 shadow-sm rounded-xl gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${balita.color} shrink-0`}>
                    <Baby size={20} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-black">{balita.name}</h5>
                    <p className="text-[11px] text-gray-500 mt-0.5">{balita.age} • {balita.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-auto w-full sm:w-auto mt-2 sm:mt-0">
                  <button 
                    onClick={() => handleStatusChange(balita.id, "hadir")}
                    className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                      balita.absenStatus === "hadir" 
                        ? "bg-[#22c55e] text-white shadow-sm shadow-green-100" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Hadir
                  </button>
                  <button 
                    onClick={() => handleStatusChange(balita.id, "tidak")}
                    className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                      balita.absenStatus === "tidak" 
                        ? "bg-[#ffe4e6] text-[#e11d48] shadow-sm shadow-rose-100" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Tidak
                  </button>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-center py-6 text-xs text-gray-400 font-medium font-sans">Belum ada data balita atau tidak ditemukan...</p>
          )}
        </div>

      </main>
    </div>
  );
}
