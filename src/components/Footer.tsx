import React from 'react';
import { Heart, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F2A4A] text-white border-t border-white/10 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-white/10">
          
          {/* Column 1: Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <div className="bg-[#1DB954] text-white p-1.5 rounded-lg">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <span>Doe<span className="text-[#1DB954]">Fácil</span></span>
            </div>
            <p className="text-sm text-slate-300 font-light max-w-sm">
              Simplificando o processo de arrecadação financeira para conectar causas nobres com pessoas generosas. Segurança, transparência e impacto garantidos.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Atalhos</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button
                  id="footer-link-como-funciona"
                  onClick={() => {
                    const el = document.getElementById('como-funciona');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#1DB954] transition-colors"
                >
                  Como Funciona
                </button>
              </li>
              <li>
                <button
                  id="footer-link-transparencia"
                  onClick={() => {
                    const el = document.getElementById('transparencia');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#1DB954] transition-colors"
                >
                  Transparência
                </button>
              </li>
              <li>
                <button
                  id="footer-link-depoimentos"
                  onClick={() => {
                    const el = document.getElementById('depoimentos');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#1DB954] transition-colors"
                >
                  Depoimentos
                </button>
              </li>
              <li>
                <button
                  id="footer-link-doar"
                  onClick={() => {
                    const el = document.getElementById('doar-agora');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#1DB954] transition-colors"
                >
                  Doar Agora
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Contato</h4>
            <ul className="space-y-2 text-sm text-slate-300 font-light">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1DB954]" />
                <a href="mailto:contato@doefacil.com.br" className="hover:text-[#1DB954] transition-colors">contato@doefacil.com.br</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1DB954]" />
                <span>(11) 4004-3322</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1DB954] shrink-0" />
                <span>Av. Paulista, 1000 - Bela Vista, São Paulo - SP</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-light">
          <p>© {currentYear} DoeFácil. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Desenvolvido para demonstração e prototipagem</span>
            <ExternalLink className="w-3 h-3" />
          </p>
        </div>
      </div>
    </footer>
  );
}
