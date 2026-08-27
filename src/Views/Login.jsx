import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

const MOCK_ACCOUNT = {
  email: 'admin@minhtuanmobile.com',
  password: '123456',
};

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allowInput, setAllowInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (email === MOCK_ACCOUNT.email && password === MOCK_ACCOUNT.password) {
        onLogin?.();
      } else {
        setError('Email hoặc mật khẩu không chính xác.');
      }
    }, 500);
  };

  return (
    <div className="w-full min-h-screen bg-[#f4f7fc] text-slate-800 font-sans flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-8 sm:p-10 flex flex-col gap-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <img src="/img/mtm.jpg" alt="MTM" className="w-auto h-20 max-w-[220px] object-contain" />
          </div>
          
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Đăng nhập hệ thống</h1>
          <p className="text-xs text-slate-400">Màn khởi đầu cho luồng quản trị và cào dữ liệu</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 flex items-start gap-2">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Email</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <Mail size={16} />
              </span>
              <input
                type="email"
                name="event_hub_login_email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                readOnly={!allowInput}
                onFocus={() => setAllowInput(true)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Mật khẩu</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <Lock size={16} />
              </span>
              <input
                type="password"
                name="event_hub_login_secret"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                readOnly={!allowInput}
                onFocus={() => setAllowInput(true)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-blue-200 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Đăng nhập</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-50">
          <p className="text-[11px] text-slate-400">Hệ thống nội bộ bảo mật</p>
        </div>
      </div>
    </div>
  );
}