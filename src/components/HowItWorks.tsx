import React from 'react';
import { MousePointerClick, FileText, Gift, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <MousePointerClick className="w-6 h-6 text-[#16A34A]" />,
      title: '1. Selecione o Valor',
      description: 'Escolha um dos nossos valores de sugestão rápida ou digite a quantia que seu coração desejar doar (mínimo de R$ 5,00).'
    },
    {
      icon: <FileText className="w-6 h-6 text-[#16A34A]" />,
      title: '2. Preencha seus Dados',
      description: 'Insira seu nome, e-mail, telefone e CPF com total segurança em nosso formulário simplificado.'
    },
    {
      icon: <Gift className="w-6 h-6 text-[#16A34A]" />,
      title: '3. Transforme Vidas',
      description: 'Ao confirmar a doação, a transação é processada instantaneamente e um recibo de doação é gerado automaticamente.'
    }
  ];

  return (
    <section id="como-funciona" className="py-16 border-t border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-[#0F2A4A] tracking-tight sm:text-4xl">
            Simples, Rápido e <span className="text-[#16A34A]">Seguro</span>
          </h2>
          <p className="mt-3 text-lg text-[#1E3A5F]/75">
            Doar na nossa plataforma leva menos de um minuto. Entenda o processo em três passos rápidos.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="glass-panel rounded-3xl p-6 sm:p-8 hover:translate-y-[-4px] transition-all duration-300 relative group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#16A34A]/5 rounded-bl-3xl group-hover:bg-[#16A34A]/10 transition-colors duration-300" />
              
              <div className="bg-[#16A34A]/10 rounded-2xl p-4 w-fit mb-6 shadow-sm shadow-[#16A34A]/5">
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-[#0F2A4A] mb-3">
                {step.title}
              </h3>
              
              <p className="text-sm text-[#1E3A5F]/85 leading-relaxed font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
