import React, { useState, useEffect } from 'react';
import { Search, Plus, LayoutGrid, List } from 'lucide-react';
import Calendar from '../Components/Calendar';
import EventCard from '../Components/EventCard';
import EventDetail from '../Components/EventDetail';
import { COMPETITORS_DATA } from '../Data/Data';

export default function Daily() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCompetitor, setSelectedCompetitor] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');

  
  const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

  const displayCompetitors = COMPETITORS_DATA.map((comp) => {
    const dayEvents = (comp.events || []).filter((e) => e.date === selectedDateStr);
    return {
      ...comp,
      events: dayEvents,
      totalEvents: dayEvents.length,
      stats: dayEvents.reduce((acc, e) => {
        acc[e.type] = (acc[e.type] || 0) + 1;
        return acc;
      }, {}),
    };
  }).filter((comp) => comp.totalEvents > 0);

  
  useEffect(() => {
    if (selectedCompetitor) {
      const updated = displayCompetitors.find((c) => c.id === selectedCompetitor.id);
      setSelectedCompetitor(updated || displayCompetitors[0] || null);
    } else {
      setSelectedCompetitor(displayCompetitors[0] || null);
    }
  }, [selectedDateStr]);

  
  const filteredCompetitors = displayCompetitors.filter((item) => {
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchEvent = item.events.some((e) => e.title.toLowerCase().includes(q));
      if (!matchName && !matchEvent) return false;
    }
    if (activeFilter === 'all') return true;
    if (activeFilter === 'mkt') return (item.stats.ads || 0) > 0;
    if (activeFilter === 'sale') return (item.stats.promo || 0) > 0 || (item.stats.live || 0) > 0;
    if (activeFilter === 'competitor') return true;
    if (activeFilter === 'internal') return (item.stats.internal || 0) > 0 || (item.stats.release || 0) > 0;
    return true;
  });

  
  const allEventsForDay = displayCompetitors.flatMap((c) => c.events);
  const totalEventsCount = allEventsForDay.length;
  const mktEventsCount = allEventsForDay.filter((e) => e.type === 'ads').length;
  const saleEventsCount = allEventsForDay.filter((e) => e.type === 'promo' || e.type === 'live').length;
  const competitorEventsCount = allEventsForDay.length;
  const internalEventsCount = allEventsForDay.filter((e) => e.type === 'internal' || e.type === 'release').length;

  const filters = [
    { id: 'all', label: `Tất cả (${totalEventsCount})`, dot: null },
    { id: 'mkt', label: `MKT (${mktEventsCount})`, dot: 'bg-emerald-500' },
    { id: 'sale', label: `Kinh doanh (${saleEventsCount})`, dot: 'bg-blue-600' },
    { id: 'competitor', label: `Đối thủ (${competitorEventsCount})`, dot: 'bg-orange-500' },
    { id: 'internal', label: `Sự kiện nội bộ (${internalEventsCount})`, dot: 'bg-purple-600' },
  ];

  
  const getWeekdayName = (date) => {
    const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    return days[date.getDay()];
  };

  const formatDateString = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${getWeekdayName(date)}, ngày ${day}/${month}/${year}`;
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc]">
      
      <div className="flex-1 min-w-0 overflow-y-auto p-4 lg:p-5 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
            Xem theo ngày – Tất cả đối thủ trong ngày
          </h1>

          <div className="flex items-center gap-2.5">
            
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sự kiện, đối thủ..."
                className="h-9 w-52 sm:w-64 rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] shadow-2xs"
              />
            </div>

            
            <button className="h-9 px-3.5 rounded-lg bg-[#1877f2] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-blue-700 transition-colors shadow-2xs shrink-0 cursor-pointer">
              <Plus size={15} strokeWidth={2.5} />
              <span>Thêm sự kiện</span>
            </button>
          </div>
        </div>

        
        <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

        
        <div className="rounded-xl border border-slate-200 bg-white p-2 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
          
          <div className="flex flex-wrap items-center gap-1.5">
            {filters.map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`h-7 px-2.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1877f2] text-white shadow-2xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {f.dot && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isActive ? 'bg-white' : f.dot
                      }`}
                    />
                  )}
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>

          
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>Hiển thị:</span>
            <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
              <button
                onClick={() => setViewMode('table')}
                className={`h-6 px-2 rounded-md flex items-center gap-1 text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-[#1877f2] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid size={13} />
                <span>Bảng</span>
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`h-6 px-2 rounded-md flex items-center gap-1 text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'timeline'
                    ? 'bg-white text-[#1877f2] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List size={13} />
                <span>Timeline</span>
              </button>
            </div>
          </div>
        </div>

      
        <div className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
          
          <div className="px-4 py-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">
              {formatDateString(selectedDate)}
            </h2>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Tổng: {filteredCompetitors.length} đối thủ – {filteredCompetitors.reduce((sum, c) => sum + c.totalEvents, 0)} sự kiện
            </div>
          </div>

         
          <div className="grid grid-cols-[160px_1fr_150px] px-4 py-2 text-[11px] font-semibold text-slate-500 bg-slate-50/60 border-b border-slate-100">
            <div>Đối thủ</div>
            <div>Các sự kiện trong ngày (bấm vào sự kiện để xem chi tiết)</div>
            <div>Tổng quan</div>
          </div>

          
          <div className="p-3 space-y-3">
            {filteredCompetitors.length > 0 ? (
              filteredCompetitors.map((item) => (
                <EventCard
                  key={item.id}
                  data={item}
                  onOpenDetail={setSelectedCompetitor}
                />
              ))
            ) : (
              <div className="p-4 flex flex-col items-center justify-center py-12 text-center text-slate-500">
                <h3 className="text-xs font-semibold text-slate-700 mb-0.5">Không có sự kiện</h3>
                <p className="text-[11px] text-slate-400 max-w-[250px]">
                  Không tìm thấy đối thủ hoặc sự kiện nào phù hợp trong ngày này.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      
      {selectedCompetitor && (
        <EventDetail
          data={selectedCompetitor}
          onClose={() => setSelectedCompetitor(null)}
        />
      )}
    </div>
  );
}
