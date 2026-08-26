import React, { useState } from 'react';
import { Bot, Users, Send, Sliders, Plus, Edit2, Trash2, KeyRound, Play, Clock } from 'lucide-react';
import { EVENTS_DATA, INITIAL_USERS, INITIAL_TELEGRAM_CONFIG, KEYWORD_RULES } from '../Data/Data';

export default function Setting() {
  const [activeTab, setActiveTab] = useState('crawler');

  const [crawlers, setCrawlers] = useState(
    EVENTS_DATA.filter((item) => item.id !== 'minhtuan').map((comp) => ({
      id: comp.id,
      name: comp.name,
      logo: comp.logo,
      enabled: true,
      interval: '6h',
      lastRun: '13:45 - 25/08/2026',
      targetUrls: comp.targetUrls || [],
      fbFanpage: comp.fbFanpage || '',
    }))
  );

  const [users, setUsers] = useState(INITIAL_USERS);
  const [telegramConfig, setTelegramConfig] = useState(INITIAL_TELEGRAM_CONFIG);
  const [keywordRules, setKeywordRules] = useState(KEYWORD_RULES);

  return (
    <div className="flex flex-col h-full min-h-0 w-full bg-slate-50 text-slate-800 overflow-hidden font-sans">
      <div className="p-3.5 sm:p-4 lg:p-6 bg-white border-b border-slate-200 shrink-0 space-y-3 sm:space-y-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Cài đặt hệ thống</h1>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Quản trị nguồn cào dữ liệu, tài khoản và thông báo Telegram</p>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 border-b border-slate-100 pb-1 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'crawler', label: 'Cấu hình Crawler', icon: Bot },
            { id: 'users', label: 'Tài khoản nhân viên', icon: Users },
            { id: 'telegram', label: 'Thông báo Telegram', icon: Send },
            { id: 'keywords', label: 'Từ khóa phân loại', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`h-8 px-3 sm:px-3.5 rounded-lg flex items-center gap-1.5 sm:gap-2 transition cursor-pointer shrink-0 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 font-bold border border-blue-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-4">

        {activeTab === 'crawler' && (
          <div className="space-y-3 sm:space-y-4 w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-700">Danh sách Crawler ({crawlers.length})</span>
              <button className="h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-2xs">
                <Plus size={14} />
                <span className="hidden xs:inline">Thêm đối thủ</span>
              </button>
            </div>

            <div className="space-y-3 w-full">
              {crawlers.map((c) => (
                <div key={c.id} className="w-full bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-2xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <img src={c.logo} alt={c.name} className="w-8 h-8 rounded-lg object-contain border border-slate-200 p-0.5 bg-white shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">{c.name}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                          <Clock size={10} className="shrink-0" />
                          <span className="truncate">Quét {c.interval}/lần • {c.lastRun}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <button className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-medium flex items-center gap-1 transition cursor-pointer">
                        <Play size={11} /> Cào ngay
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md transition cursor-pointer">
                        <Edit2 size={13} />
                      </button>
                      <input
                        type="checkbox"
                        checked={c.enabled}
                        onChange={() => setCrawlers(crawlers.map(item => item.id === c.id ? { ...item, enabled: !item.enabled } : item))}
                        className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="text-[11px] space-y-1">
                    <div className="font-semibold text-slate-600">Link theo dõi:</div>
                    {c.targetUrls.map((url, idx) => (
                      <div key={idx} className="w-full p-2 bg-slate-50 rounded border border-slate-100 text-slate-600 font-mono text-[10px] sm:text-[11px] break-all">
                        {url}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="w-full bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-3 sm:p-3.5 border-b border-slate-100 flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-700">Danh sách tài khoản ({users.length})</span>
              <button className="h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-2xs">
                <Plus size={14} />
                <span className="hidden xs:inline">Thêm nhân viên</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {users.map((u) => (
                <div key={u.id} className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-slate-50 transition">
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 truncate">{u.name}</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-400 truncate mt-0.5">{u.email} • {u.department}</div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${u.role === 'Admin' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-slate-100 text-slate-600'}`}>
                      {u.role}
                    </span>
                    <div className="flex items-center gap-1">
                      <button title="Reset mật khẩu" className="p-1.5 text-slate-400 hover:text-orange-600 rounded cursor-pointer">
                        <KeyRound size={14} />
                      </button>
                      <button title="Sửa" className="p-1.5 text-slate-400 hover:text-blue-600 rounded cursor-pointer">
                        <Edit2 size={14} />
                      </button>
                      <button title="Xóa" className="p-1.5 text-slate-400 hover:text-rose-600 rounded cursor-pointer">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'telegram' && (
          <div className="w-full bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4 text-xs">
            <h2 className="text-sm font-bold text-slate-900">Cấu hình Bot Telegram</h2>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Bot Token:</label>
                <input
                  type="text"
                  value={telegramConfig.botToken}
                  onChange={(e) => setTelegramConfig({ ...telegramConfig, botToken: e.target.value })}
                  className="w-full h-8.5 rounded-lg border border-slate-200 px-3 font-mono text-[11px] sm:text-xs outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Chat ID / Group ID:</label>
                <input
                  type="text"
                  value={telegramConfig.chatId}
                  onChange={(e) => setTelegramConfig({ ...telegramConfig, chatId: e.target.value })}
                  className="w-full h-8.5 rounded-lg border border-slate-200 px-3 font-mono text-[11px] sm:text-xs outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 space-y-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={telegramConfig.notifyImmediately}
                    onChange={(e) => setTelegramConfig({ ...telegramConfig, notifyImmediately: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer shrink-0"
                  />
                  <span>Gửi tin nhắn tức thì khi cào được sự kiện mới</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={telegramConfig.includeImage}
                    onChange={(e) => setTelegramConfig({ ...telegramConfig, includeImage: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer shrink-0"
                  />
                  <span>Đính kèm ảnh banner vào tin nhắn</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button className="h-8.5 px-3.5 rounded-lg border border-slate-200 hover:bg-slate-50 font-semibold cursor-pointer">
                  Test thử
                </button>
                <button className="h-8.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer shadow-2xs">
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'keywords' && (
          <div className="space-y-3 w-full">
            <h2 className="text-xs font-bold text-slate-700">Luật phân loại tự động</h2>
            <div className="space-y-2.5 w-full">
              {keywordRules.map((rule, idx) => (
                <div key={idx} className="w-full bg-white rounded-xl border border-slate-200 p-3 sm:p-3.5 shadow-2xs space-y-1.5 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-800">{rule.label} ({rule.type})</span>
                    <button className="text-blue-600 hover:underline font-semibold cursor-pointer text-[11px] shrink-0">Sửa từ khóa</button>
                  </div>
                  <div className="w-full p-2 sm:p-2.5 rounded bg-slate-50 border border-slate-100 font-mono text-[10px] sm:text-[11px] text-slate-600 break-words">
                    {rule.keywords}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}