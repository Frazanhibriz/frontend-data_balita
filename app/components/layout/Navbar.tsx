"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={open} onClose={() => setOpen(false)} />
      
      <nav className="bg-white shadow-sm sticky top-0 z-30">
        
        <div className="flex items-center justify-between px-4 py-3">
          
          {/* LEFT: Menu + Title */}
          <div className="flex items-center gap-3">
            
            {/* Menu Button */}
            <button
              onClick={() => setOpen(true)}
              className="p-1 -ml-1 text-black hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>

            {/* Title */}
            <h1 className="font-bold text-xl text-black">
              Beranda
            </h1>

          </div>

          {/* RIGHT: Avatar */}
          <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold">
            K
          </div>

        </div>

      </nav>
    </>
  );
}