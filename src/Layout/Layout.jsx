import React from 'react';
import Sidebar from '../Components/Sidebar';

export default function Layout({ currentView, onNavigate, children }) {
  return (
    <div className="flex h-screen w-full overflow-hidden font-sans bg-[#f8fafc]">
      <Sidebar currentView={currentView} onNavigate={onNavigate} />
      <main className="flex-1 min-w-0 h-full overflow-hidden">
        {children}
      </main>
    </div>
  );
}
