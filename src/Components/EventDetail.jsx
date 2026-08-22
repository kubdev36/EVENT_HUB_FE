import React, { useState } from 'react';
import { X, Clock, FileEdit } from 'lucide-react';
import { CATEGORY_STYLES } from '../Data/Data';

export default function EventDetail({ data, onClose }) {
  const [activeTab, setActiveTab] = useState('events');

  if (!data) return null;

  const getWeekdayName = (date) => {
    const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    return days[date.getDay()];
  };

  const formatDateString = (date) => {
    if (!date) return '13/08/2026 (Thứ 5)';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year} (${getWeekdayName(date)})`;
  };

  const getEventDate = () => {
    const dateStr = data.events?.[0]?.date;
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const formattedDate = formatDateString(getEventDate());

  return (
    <div className="w-[380px] xl:w-[420px] shrink-0 bg-white border-l border-slate-200 h-screen flex flex-col justify-between shadow-lg z-30 select-none overflow-hidden">
     
      <div>
        <div className="h-14 px-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">{data.name}</h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-orange-50 text-orange-600 border border-orange-200">
              {data.tag || 'Đối thủ'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
          <img
            src={data.logo}
            alt={data.name}
            className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0 shadow-xs"
          />
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900">{data.name}</div>
            <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
              <Clock size={11} className="text-slate-400" />
              <span>{formattedDate} – {data.totalEvents} sự kiện</span>
            </div>
          </div>
        </div>

        
        <div className="px-4 border-b border-slate-200 flex items-center gap-4 text-xs font-medium bg-slate-50/50">
          {[
            { id: 'overview', label: 'Tổng quan' },
            { id: 'events', label: `Các sự kiện (${data.totalEvents})` },
            { id: 'media', label: 'Ảnh & Tài liệu' },
            { id: 'notes', label: 'Ghi chú' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2.5 border-b-2 transition-colors relative ${
                activeTab === tab.id
                  ? 'border-[#1877f2] text-[#1877f2] font-semibold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

    
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {data.events.map((event) => {
          const style = CATEGORY_STYLES[event.type] || CATEGORY_STYLES.release;
          return (
            <div key={event.id} className="relative pl-5 border-l-2 border-slate-200">
              
              <span
                className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full ring-4 ring-white ${style.dot}`}
              />

              
              <div className="flex items-center gap-2 mb-1">
                <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                  <Clock size={12} className="text-slate-400" />
                  <span>{event.time}</span>
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold ${style.pill}`}
                >
                  {style.label}
                </span>
              </div>

             
              <div className="flex items-start justify-between gap-2">
                <div className="text-xs font-bold text-slate-900 leading-snug flex-1">
                  {event.fullTitle || event.title}
                </div>
                {event.url && (
                  <button 
                    onClick={() => window.open(event.url, '_blank')}
                    className="text-[10px] font-semibold text-[#1877f2] hover:text-blue-800 flex items-center gap-0.5 shrink-0 cursor-pointer"
                  >
                    Chi tiết 
                  </button>
                )}
              </div>

              
              {event.desc && (
                <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {event.desc}
                </div>
              )}

              
              <div 
                onClick={() => event.url && window.open(event.url, '_blank')}
                title="Bấm để xem trang sự kiện của hãng"
                className="mt-2.5 rounded-lg overflow-hidden border border-slate-200/80 shadow-xs cursor-pointer hover:border-[#1877f2] hover:shadow-xs transition-all h-32 select-none"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

             
              {event.thumbs && event.thumbs.length > 0 && (
                <div className="mt-2 grid grid-cols-5 gap-1.5 select-none">
                  {event.thumbs.map((thumbUrl, idx) => (
                    <div
                      key={idx}
                      className="h-8 rounded overflow-hidden border border-slate-200 bg-slate-100"
                    >
                      <img
                        src={thumbUrl}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                  {event.extraThumbs > 0 && (
                    <div className="h-8 rounded border border-slate-200 bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                      +{event.extraThumbs}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      
      <div className="p-3 border-t border-slate-200 bg-white">
        <button className="w-full h-9 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors">
          <FileEdit size={14} className="text-slate-500" />
          <span>Xem ghi chú về đối thủ này</span>
        </button>
      </div>
    </div>
  );
}
