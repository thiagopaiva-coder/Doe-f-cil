import React, { useState } from 'react';
import { Mail, Lock, LogIn, Sparkles, AlertCircle } from 'lucide-react';

interface LoginCardProps {
  onLoginSuccess: (email: string) => void;
}

export default function LoginCard({ onLoginSuccess }: LoginCardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    // Simulate network latency for high-fidelity interactive experience
    setTimeout(() => {
      setLoading(false);
      // Valid credential: admin@doefacil.com / 123456
      if (email.trim().toLowerCase() === 'admin@doefacil.com' && password === '123456') {
        onLoginSuccess(email.trim());
      } else {
        setError('E-mail ou senha incorretos. Use o atalho abaixo para testar!');
      }
    }, 600);
  };

  const fillAdminCredentials = () => {
    setEmail('admin@doefacil.com');
    setPassword('123456');
    setError('');
  };

  return (
    <div className="max-w-md w-full mx-auto px-4 py-8 relative">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#16A34A]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#1E3A5F]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Main Glassmorphism Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#0F2A4A]/5 text-[#0F2A4A] mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#0F2A4A]">Acesso Restrito</h2>
          <p className="text-xs text-[#1E3A5F]/70 mt-1">
            Entre para acessar o painel administrativo do DoeFácil
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-600 rounded-xl p-3 text-xs mb-4 font-medium animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A4A] mb-1">
              E-mail corporativo
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0F2A4A]/40">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="exemplo@doefacil.com"
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm text-[#0F2A4A] placeholder-[#0F2A4A]/30"
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A4A] mb-1">
              Senha de Acesso
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0F2A4A]/40">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="******"
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm text-[#0F2A4A] placeholder-[#0F2A4A]/30"
              />
            </div>
          </div>

          <button
            type="submit"
            id="btn-login-entrar"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#1DB954] text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-[#16A34A]/20 transition-all duration-200 cursor-pointer text-sm"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Autenticando...
              </span>
            ) : (
              <>
                <span>Entrar no Painel</span>
                <LogIn className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Auto-fill shortcuts Card */}
      <div className="glass-panel mt-6 rounded-2xl p-4 border border-white/50 text-center relative overflow-hidden">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F2A4A] mb-3 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#16A34A] fill-[#16A34A]/20" />
          Atalhos de Demonstração
        </h4>
        <p className="text-[11px] text-[#1E3A5F]/70 mb-3">
          Clique no botão abaixo para preencher os dados de teste corporativo de Administrador instantaneamente.
        </p>
        <button
          id="btn-shortcut-admin"
          onClick={fillAdminCredentials}
          className="w-full py-2.5 px-4 bg-white/70 border border-slate-200 hover:border-[#16A34A]/40 hover:bg-[#16A34A]/5 rounded-xl text-xs font-semibold text-[#0F2A4A] flex items-center justify-between transition-all duration-300 shadow-sm"
        >
          <div className="flex flex-col items-start">
            <span className="font-bold text-[#16A34A]">Administrador Geral</span>
            <span className="text-[10px] text-slate-400 font-normal">admin@doefacil.com | 123456</span>
          </div>
          <span className="text-[10px] text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded-full uppercase tracking-wide">
            Preencher
          </span>
        </button>
      </div>
    </div>
  );
}
