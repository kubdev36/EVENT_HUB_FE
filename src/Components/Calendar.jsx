import React, { useMemo } from 'react';
import { DayPicker } from 'react-day-picker';
import { vi } from 'date-fns/locale';
import { format } from 'date-fns'; 
import 'react-day-picker/dist/style.css';
import { COMPETITORS_DATA } from '../Data/Data';

const LEGENDS = [
  { label: 'MKT', color: 'bg-emerald-500' },
  { label: 'Kinh doanh', color: 'bg-blue-600' },
  { label: 'Đối thủ', color: 'bg-orange-500' },
  { label: 'Sự kiện nội bộ', color: 'bg-purple-600' },
  { label: 'Nhiều sự kiện', color: 'bg-red-500' },
];

const TYPE_DOT_COLOR = {
  ads: 'bg-emerald-500',
  live: 'bg-blue-600',
  promo: 'bg-orange-500',
  release: 'bg-purple-600',
  internal: 'bg-purple-600',
};

const ALL_EVENTS = COMPETITORS_DATA.flatMap((c) => c.events || []);

export default function Calendar({ selectedDate, onSelectDate }) {
  const eventMap = useMemo(() => {
    return ALL_EVENTS.reduce((acc, ev) => {
      acc[ev.date] = acc[ev.date] ? [...acc[ev.date], ev] : [ev];
      return acc;
    }, {});
  }, []);

  return (
    <div className="flex flex-col lg:flex-row rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden select-none">
  
      <div className="flex-1 p-3">
        <DayPicker
          mode="single"
          required
          selected={selectedDate}
          onSelect={(date) => date && onSelectDate(date)}
          locale={vi}
          weekStartsOn={1}
          components={{
            DayButton: (props) => {
              const { day, modifiers, ...buttonProps } = props;
              const date = day.date;
              const dateStr = format(date, 'yyyy-MM-dd');
              const events = eventMap[dateStr] || [];
              const dotColor =
                events.length > 1
                  ? 'bg-red-500'
                  : events.length === 1
                  ? TYPE_DOT_COLOR[events[0].type] || 'bg-slate-400'
                  : null;

              return (
                <button
                  {...buttonProps}
                  className={`${buttonProps.className || ''} flex flex-col items-center justify-center relative w-full h-full`}
                >
                  <span>{date.getDate()}</span>
                  {dotColor && (
                    <span className={`w-1 h-1 rounded-full ${dotColor} absolute bottom-1`} />
                  )}
                </button>
              );
            },
          }}
        />
      </div>

     
      <div className="w-full lg:w-[150px] border-t lg:border-t-0 lg:border-l border-slate-200 p-3.5 bg-slate-50/40 flex flex-col justify-center">
        <div className="text-xs font-bold text-slate-800 mb-2">Chú thích</div>
        <div className="space-y-1.5 text-[11px] text-slate-600 font-medium">
          {LEGENDS.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full shrink-0 ${item.color}`} />
              <span className="truncate">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}