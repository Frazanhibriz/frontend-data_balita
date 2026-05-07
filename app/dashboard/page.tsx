import Navbar from "@/components/layout/Navbar";
import { 
  Calendar, 
  Search, 
  Plus, 
  PencilLine, 
  CheckSquare, 
  Baby,
  User,
  ChevronRight
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-black">
      <Navbar />

      <main className="p-8 space-y-6">
        
        {/* HERO SECTION */}
        <div className="bg-teal-600 rounded-2xl p-10 text-white shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-teal-100 text-sm opacity-90 text-[20px]">Halo, Kader 👋</p>
              <h2 className="text-xl font-bold text-[20px]">Posyandu Sidorejo Kidul</h2>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-medium">
              <Calendar size={20} />
              April 2026
            </div>
          </div>

          <div className="relative z-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama balita" 
              className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-800 focus:outline-none shadow-inner bg-white placeholder:text-gray-400"
            />
          </div>

          {/* Decorative background circle */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <p className="text-xs text-gray-500 font-medium">Total balita</p>
            </div>
            <h3 className="text-2xl font-bold">58</h3>
          </div>
          
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
              <p className="text-xs text-gray-500 font-medium">Hadir Bulan Ini</p>
            </div>
            <h3 className="text-2xl font-bold">32</h3>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <p className="text-xs text-gray-500 font-medium">Belum Hadir</p>
            </div>
            <h3 className="text-2xl font-bold">16</h3>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h4 className="text-sm font-bold mb-4">Aksi Cepat</h4>
          <div className="grid grid-cols-3 gap-3 justify-items-center">
            <button className="flex flex-col items-center gap-2 w-full">
              <div className="w-20 h-20 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mx-auto">
                <Plus size={30} />
              </div>
              <p className="text-[12px] font-medium text-center leading-tight">Tambah<br/>Balita</p>
            </button>
            <button className="flex flex-col items-center gap-2 w-full">
              <div className="w-20 h-20 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mx-auto">
                <PencilLine size={30} />
              </div>
              <p className="text-[12px] font-medium text-center leading-tight">Input<br/>Pengukuran</p>
            </button>
            <button className="flex flex-col items-center gap-2 w-full">
              <div className="w-20 h-20 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mx-auto">
                <CheckSquare size={30} />
              </div>
              <p className="text-[12px] font-medium text-center leading-tight">Absen<br/>Bulanan</p>
            </button>
          </div>
        </div>

        {/* LIST SECTION */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h4 className="text-sm font-bold">Belum diukur bulan ini</h4>
            <span className="text-xs text-gray-400">3 balita</span>
          </div>

          <div className="space-y-3">
            {[
              { name: "Bagas Pratama", age: "8 bln", mom: "Ibu Rina", address: "RT 01 / RW 02", color: "bg-blue-50 text-blue-500" },
              { name: "Elina Rahma", age: "5 bln", mom: "Ibu Dewi", address: "RT 03 / RW 02", color: "bg-pink-50 text-pink-500" },
              { name: "Fajar Nugraha", age: "18 bln", mom: "Ibu Maya", address: "RT 05 / RW 02", color: "bg-blue-50 text-blue-500" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.color}`}>
                    <Baby size={24} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold">{item.name}</h5>
                    <p className="text-[10px] text-gray-400">
                      {item.age} • {item.mom} • {item.address}
                    </p>
                  </div>
                </div>
                <div className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-[10px] font-bold">
                  Belum diukur
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}