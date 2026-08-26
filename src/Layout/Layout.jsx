import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '../Components/Sidebar';

export default function Layout({ currentView, onNavigate, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh min-h-0 w-full overflow-hidden font-sans bg-[#f8fafc]">
      <Sidebar
        currentView={currentView}
        onNavigate={onNavigate}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
        <div className="lg:hidden h-14 px-4 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
              title="Mở menu"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <img
                src="/img/mtm.jpg"
                alt="Logo"
                className="w-7 h-7 rounded-md object-contain border border-slate-100 shadow-2xs"
              />
              <span className="text-sm font-bold text-slate-900">Event Hub</span>
            </div>
          </div>
        </div>

        <main className="flex-1 min-w-0 min-h-0 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}