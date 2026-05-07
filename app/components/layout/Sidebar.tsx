"use client";

import { 
  Home, 
  Baby, 
  ClipboardCheck, 
  BarChart3, 
  LogOut, 
  X,
  Heart
} from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 w-[300px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center text-white">
              <Image 
              src="/icons/logo-original.png" 
              alt="Mitra Posyandu Logo" 
              width={300} 
              height={300} 
              className="rounded-xl"
              priority
              />
                            
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Mitra Posyandu</h2>
              <p className="text-xs text-gray-500 font-medium">Posyandu Sidorejo Kidul</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Menu Section */}
        <div className="flex-1 p-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Menu</p>
          
          <div className="space-y-2">
            {/* Beranda - Active */}
            <div className="bg-teal-50/50 rounded-xl p-3 flex items-center justify-between group cursor-pointer relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="text-teal-600">
                  <Home size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-teal-600">Beranda</h4>
                  <p className="text-[10px] text-gray-400">Ringkasan harian</p>
                </div>
              </div>
              <div className="w-1.5 h-6 bg-teal-600 rounded-full"></div>
            </div>

            {/* Balita */}
            <div className="hover:bg-gray-50 rounded-xl p-3 flex items-center gap-4 cursor-pointer transition-colors">
              <div className="text-gray-400">
                <Baby size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">Balita</h4>
                <p className="text-[10px] text-gray-400">Daftar & data balita</p>
              </div>
            </div>

            {/* Absen */}
            <div className="hover:bg-gray-50 rounded-xl p-3 flex items-center gap-4 cursor-pointer transition-colors">
              <div className="text-gray-400">
                <ClipboardCheck size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">Absen</h4>
                <p className="text-[10px] text-gray-400">Kehadiran bulanan</p>
              </div>
            </div>

            {/* Laporan */}
            <div className="hover:bg-gray-50 rounded-xl p-3 flex items-center gap-4 cursor-pointer transition-colors">
              <div className="text-gray-400">
                <BarChart3 size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800">Laporan</h4>
                <p className="text-[10px] text-gray-400">Statistik Posyandu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t space-y-6">
          <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
              K
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-bold text-gray-800 truncate">Bu Kader</h4>
              <p className="text-[10px] text-gray-400 truncate">kader@posyandu.id</p>
            </div>
          </div>

          <button className="flex items-center justify-center gap-3 w-full text-rose-500 font-bold text-sm hover:bg-rose-50 p-3 rounded-xl transition-colors group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            Keluar
          </button>
        </div>
      </div>
    </>
  );
}
