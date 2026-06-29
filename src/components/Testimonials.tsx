import React from 'react';
import { Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Regina Vasconcellos',
      role: 'Doadora Recorrente',
      text: 'Fazer doações pelo DoeFácil mudou minha perspectiva sobre caridade. O site é incrivelmente bonito, rápido e transparente. Eu consigo fazer tudo em menos de um minuto no celular.',
      stars: 5,
      gradient: 'from-[#16A34A]/20 to-[#1DB954]/20'
    },
    {
      name: 'Cláudio Albuquerque',
      role: 'Empresário & Apoiador',
      text: 'O que mais me chamou atenção foi o design e a facilidade de navegação. É gratificante apoiar um projeto que valoriza tanto a experiência do doador quanto o controle rigoroso da transparência.',
      stars: 5,
      gradient: 'from-[#0F2A4A]/20 to-[#1E3A5F]/20'
    },
    {
      name: 'Tereza d\'Ávila',
      role: 'Voluntária de Projetos Sociais',
      text: 'Como voluntária, vejo o impacto dessas doações na ponta. Essa plataforma simplificou a arrecadação de forma espetacular. O painel administrativo ajuda muito na organização!',
      stars: 5,
      gradient: 'from-emerald-100 to-[#16A34A]/10'
    }
  ];

  return (
    <section id="depoimentos" className="py-16 border-t border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-[#0F2A4A] tracking-tight sm:text-4xl">
            Quem Ajuda, <span className="text-[#16A34A]">Aprova</span>
          </h2>
          <p className="mt-3 text-lg text-[#1E3A5F]/75">
            Histórias reais de pessoas que transformam o mundo conosco diariamente.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <div 
              key={index} 
              className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300 relative group"
            >
              <div className="absolute top-6 right-6 text-[#16A34A]/10 group-hover:text-[#16A34A]/20 transition-colors duration-300">
                <Quote className="w-12 h-12" />
              </div>

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-[#1E3A5F]/90 italic leading-relaxed font-light mb-6">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#0F2A4A]/5">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${rev.gradient} text-[#0F2A4A] font-bold flex items-center justify-center text-xs shadow-sm`}>
                  {rev.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0F2A4A]">{rev.name}</h4>
                  <p className="text-[11px] text-[#1E3A5F]/60 font-medium">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
