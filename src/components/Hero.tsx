import React from 'react';
import { ArrowDown, CheckCircle, ShieldCheck, Heart, Users, Sparkles } from 'lucide-react';
import { Donation } from '../types';
import { formatCurrencyBRL } from '../utils';

interface HeroProps {
  donations: Donation[];
  onDoarClick: () => void;
}

export default function Hero({ donations, onDoarClick }: HeroProps) {
  // Compute some beautiful real-time stats based on donations!
  const totalArrecadado = donations.reduce((sum, item) => sum + item.amount, 0);
  const totalDoacoes = donations.length;
  
  return (
    <section className="relative pt-8 pb-16 md:py-20 overflow-hidden">
      {/* Abstract light background decorations */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#16A34A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-[#1E3A5F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#16A34A]/10 text-[#16A34A] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparência e Impacto Real</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F2A4A] leading-[1.1]">
              Multiplique esperança. <br />
              <span className="text-[#16A34A]">Simplifique o doar.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#1E3A5F]/85 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              O <strong className="font-semibold text-[#0F2A4A]">DoeFácil</strong> é uma plataforma moderna e translúcida projetada para unir corações solidários a causas nobres. Doações rápidas, controle rigoroso de transparência e impacto social imediato.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-doar-agora-btn"
                onClick={onDoarClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#1DB954] text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-[#16A34A]/25 hover:shadow-xl hover:shadow-[#16A34A]/35 transform active:scale-95 transition-all duration-300 cursor-pointer text-base"
              >
                <Heart className="w-5 h-5 fill-current" />
                <span>Doar Agora</span>
              </button>
              
              <button
                id="hero-como-funciona-btn"
                onClick={() => {
                  const el = document.getElementById('como-funciona');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0F2A4A]/5 hover:bg-[#0F2A4A]/10 text-[#0F2A4A] font-medium px-8 py-4 rounded-2xl transition-all duration-300 cursor-pointer text-base"
              >
                <span>Saiba como funciona</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 border-t border-[#0F2A4A]/10">
              <div className="flex items-center gap-2 text-sm text-[#1E3A5F]/70">
                <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Recibo Imediato</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#1E3A5F]/70">
                <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Processamento Seguro</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Live Stats Counter (Glassmorphism Bento Grid layout) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              
              {/* Total Raised Card */}
              <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                <div className="bg-[#16A34A]/10 text-[#16A34A] p-2.5 rounded-xl w-fit mb-4">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A5F]/60">Total Arrecadado</span>
                  <p className="text-xl sm:text-2xl font-black text-[#0F2A4A] mt-1 break-words">
                    {formatCurrencyBRL(totalArrecadado)}
                  </p>
                </div>
              </div>

              {/* Total Donations Count */}
              <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                <div className="bg-[#0F2A4A]/10 text-[#0F2A4A] p-2.5 rounded-xl w-fit mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3A5F]/60">Total de Doações</span>
                  <p className="text-3xl font-black text-[#0F2A4A] mt-1">
                    {totalDoacoes}
                  </p>
                </div>
              </div>

            </div>

            {/* Main Interactive Interactive Live Feed Glass Card */}
            <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#0F2A4A] mb-4 flex items-center justify-between">
                <span>Contribuições Recentes</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </h4>

              <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                {donations.slice(0, 3).map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between bg-white/30 border border-white/40 rounded-xl p-3 text-xs transition-colors hover:bg-white/50">
                    <div className="flex items-center gap-2">
                      <div className="bg-emerald-50 text-[#16A34A] font-bold h-7 w-7 rounded-lg flex items-center justify-center text-[10px]">
                        {item.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-[#0F2A4A]">
                          {item.name.split(' ')[0]} {item.name.split(' ').slice(-1)[0]}
                        </p>
                        <p className="text-[10px] text-[#1E3A5F]/60">Doador Solidário</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#16A34A]">{formatCurrencyBRL(item.amount)}</p>
                      <p className="text-[9px] text-[#1E3A5F]/50">Há poucos instantes</p>
                    </div>
                  </div>
                ))}
                
                {donations.length === 0 && (
                  <p className="text-[#1E3A5F]/60 text-xs text-center py-4">Nenhuma doação cadastrada ainda. Seja o primeiro!</p>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
