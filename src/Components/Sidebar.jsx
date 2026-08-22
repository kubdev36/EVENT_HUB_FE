import React from 'react';
import { 
  Home, 
  Calendar, 
  CalendarDays, 
  Megaphone, 
  Store, 
  Users, 
  Building2, 
  Image as ImageIcon, 
  FileText, 
  Settings, 
  Plus, 
  ChevronDown,
  Check
} from 'lucide-react';
import { COMPETITORS_DATA } from '../Data/Data';

const MENU_ITEMS = [
  { id: 'overview', label: 'Tổng quan', icon: Home },
  { id: 'month', label: 'Lịch tháng', icon: Calendar },
  { id: 'daily', label: 'Xem theo ngày', icon: CalendarDays },
  { id: 'marketing', label: 'MKT', icon: Megaphone },
  { id: 'sale', label: 'Kinh doanh', icon: Store },
  { id: 'competitors', label: 'Đối thủ', icon: Users },
  { id: 'private-events', label: 'Sự kiện nội bộ', icon: Building2 },
  { id: 'media-library', label: 'Thư viện ảnh', icon: ImageIcon },
  { id: 'reports', label: 'Báo cáo', icon: FileText },
  { id: 'setting', label: 'Cài đặt', icon: Settings },
];

const QUICK_FILTERS = [
  { id: 'all', label: 'Tất cả', color: 'bg-blue-600 border-blue-600' },
  { id: 'mkt', label: 'MKT', color: 'bg-emerald-500 border-emerald-500' },
  { id: 'sale', label: 'Kinh doanh', color: 'bg-cyan-500 border-cyan-500' },
  { id: 'competitor', label: 'Đối thủ', color: 'bg-orange-500 border-orange-500' },
  { id: 'internal', label: 'Sự kiện nội bộ', color: 'bg-purple-600 border-purple-600' },
];

export default function Sidebar({ currentView = 'daily', onNavigate }) {
  const [checkedFilters, setCheckedFilters] = React.useState({
    all: true,
    mkt: true,
    sale: true,
    competitor: true,
    internal: true,
  });

  const toggleFilter = (id) => {
    setCheckedFilters(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="w-[240px] shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between h-screen overflow-y-auto select-none">
      <div>
     
        <div className="h-16 px-4 flex items-center gap-3 border-b border-slate-100">
          <img src="/img/mtm.jpg" alt="" className="w-10 h-10" />
          <div>
            <div className="text-[14px] font-bold text-slate-900 leading-tight">Event Hub</div>
            <div className="text-[10px] font-medium text-slate-400 leading-tight">Intelligence Center</div>
          </div>
        </div>

        
        <div className="p-3">
          <nav className="space-y-0.5">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate?.(item.id)}
                  className={`w-full h-9 rounded-lg px-3 flex items-center gap-3 text-[13px] font-medium transition-all ${
                    active
                      ? 'bg-[#1877f2] text-white shadow-sm font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon size={16} className={active ? 'text-white' : 'text-slate-500'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 px-1">
              Bộ lọc nhanh
            </div>
            <div className="space-y-1.5 px-1">
              {QUICK_FILTERS.map((item) => {
                const isChecked = checkedFilters[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleFilter(item.id)}
                    className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 py-0.5 hover:text-slate-900"
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded flex items-center justify-center text-white border transition-colors ${
                        isChecked ? item.color : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check size={10} strokeWidth={3} />}
                    </div>
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

       
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 px-1">
              Đối thủ nổi bật
            </div>
            <div className="space-y-1">
              {COMPETITORS_DATA.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2.5 px-1 py-1 rounded-md hover:bg-slate-50 cursor-pointer text-xs font-medium text-slate-700"
                >
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="w-4 h-4 rounded object-cover border border-slate-100"
                  />
                  <span className="truncate">{item.name}</span>
                </div>
              ))}
              <button className="w-full text-left flex items-center gap-1.5 px-1 py-1.5 text-xs font-semibold text-[#1877f2] hover:text-blue-700 mt-1">
                <Plus size={14} />
                <span>Thêm đối thủ</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      
    </aside>
  );
}
