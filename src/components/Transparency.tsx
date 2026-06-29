import React from 'react';
import { ShieldCheck, PieChart, CheckCircle2, TrendingUp } from 'lucide-react';

export default function Transparency() {
  const categories = [
    { name: 'Apoio Direto a Famílias & Projetos', percent: 85, color: 'bg-[#16A34A]', text: '85%' },
    { name: 'Administração & Infraestrutura Digital', percent: 10, color: 'bg-[#1E3A5F]', text: '10%' },
    { name: 'Fundo de Emergência Solidário', percent: 5, color: 'bg-[#1DB954]', text: '5%' }
  ];

  return (
    <section id="transparencia" className="py-16 border-t border-white/40 bg-gradient-to-b from-transparent to-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Graph built cleanly with Tailwind and CSS */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <PieChart className="w-40 h-40" />
              </div>

              <h3 className="text-xl font-bold text-[#0F2A4A] mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#16A34A]" />
                Destinação de Cada Centavo
              </h3>
              <p className="text-[#1E3A5F]/75 text-sm mb-6">
                Veja de forma transparente como distribuímos os fundos arrecadados para maximizar o impacto social:
              </p>

              {/* Stacked Progress Bars */}
              <div className="space-y-6">
                {categories.map((cat, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#0F2A4A]">{cat.name}</span>
                      <span className="font-bold text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded-full">{cat.text}</span>
                    </div>
                    <div className="w-full bg-[#0F2A4A]/5 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full ${cat.color} rounded-full transition-all duration-1000 ease-out`} 
                        style={{ width: `${cat.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/40 flex items-center gap-3 text-xs text-[#1E3A5F]/70">
                <TrendingUp className="w-5 h-5 text-[#16A34A] shrink-0" />
                <span>Auditoria financeira pública e atualização em tempo real para os administradores.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Explanatory Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#0F2A4A]/5 text-[#0F2A4A] px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <span>Auditoria Aberta</span>
            </div>
            
            <h2 className="text-3xl font-extrabold text-[#0F2A4A] tracking-tight sm:text-4xl">
              Nossa prioridade número um é a sua <span className="text-[#16A34A]">confiança</span>
            </h2>
            
            <p className="text-base text-[#1E3A5F]/85 leading-relaxed font-light">
              Acreditamos que a caridade exige o mais alto nível de integridade. Cada transação é rastreada, cada recibo é catalogado, e fornecemos um painel de controle administrativo completo para auditar os valores recebidos e calcular as estatísticas de arrecadação em tempo real.
            </p>

            <ul className="space-y-4">
              {[
                'Prestação de contas automatizada e sem burocracia.',
                'Acesso imediato para administradores visualizarem todos os doadores.',
                'Processamento confiável garantido por criptografia TLS.',
                'Zero taxas ocultas ou descontos indevidos sobre o valor doado.'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#1E3A5F]/80">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
