import React, { useState } from 'react';
import { Heart, LogIn, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentView: 'landing' | 'login' | 'dashboard';
  onNavigate: (view: 'landing' | 'login' | 'dashboard') => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function Header({ currentView, onNavigate, isLoggedIn, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      onNavigate('landing');
      // Let navigation complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0F2A4A] border-b border-white/10 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            id="header-logo-btn"
            onClick={() => onNavigate('landing')} 
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity uppercase"
          >
            <div className="w-8 h-8 bg-[#1DB954] text-white rounded-lg flex items-center justify-center shadow-md shadow-[#1DB954]/20">
              <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
                <Heart className="w-2.5 h-2.5 text-[#1DB954] fill-current" />
              </div>
            </div>
            <span>Doe<span className="text-[#1DB954]">Fácil</span></span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-white/85 font-medium text-sm">
            {currentView === 'landing' && (
              <>
                <button 
                  id="nav-como-funciona"
                  onClick={() => scrollToSection('como-funciona')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Como Funciona
                </button>
                <button 
                  id="nav-transparencia"
                  onClick={() => scrollToSection('transparencia')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Transparência
                </button>
                <button 
                  id="nav-depoimentos"
                  onClick={() => scrollToSection('depoimentos')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Depoimentos
                </button>
                <button 
                  id="nav-doar"
                  onClick={() => scrollToSection('doar-agora')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Doar
                </button>
              </>
            )}
            {currentView !== 'landing' && (
              <button 
                id="nav-inicio"
                onClick={() => onNavigate('landing')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Início
              </button>
            )}
            
            {currentView === 'dashboard' && (
              <span className="font-bold text-white border-b-2 border-[#1DB954] pb-1">
                Painel Admin
              </span>
            )}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="text-right leading-none">
                  <p className="text-white text-xs font-semibold">Admin Root</p>
                  <p className="text-white/50 text-[10px]">admin@doefacil.com</p>
                </div>
                {currentView !== 'dashboard' && (
                  <button
                    id="header-admin-btn"
                    onClick={() => onNavigate('dashboard')}
                    className="h-9 px-4 bg-white/10 text-white rounded-md text-xs font-bold hover:bg-white/20 transition-all uppercase tracking-wider cursor-pointer"
                  >
                    Painel Admin
                  </button>
                )}
                <button
                  id="header-logout-btn"
                  onClick={onLogout}
                  className="h-9 px-4 bg-[#16A34A] text-white rounded-md text-xs font-bold hover:bg-[#15803d] transition-colors uppercase tracking-wider cursor-pointer"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                id="header-login-btn"
                onClick={() => onNavigate('login')}
                className="h-9 px-4 bg-[#16A34A] text-white rounded-md text-xs font-bold hover:bg-[#15803d] transition-colors uppercase tracking-wider cursor-pointer"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-white hover:bg-white/10 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F2A4A] border-t border-white/10 px-4 pt-2 pb-4 space-y-2 animate-in fade-in slide-in-from-top-5 duration-200">
          {currentView === 'landing' && (
            <>
              <button
                id="mobile-nav-como-funciona"
                onClick={() => scrollToSection('como-funciona')}
                className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-white/80 hover:bg-white/10 hover:text-white"
              >
                Como Funciona
              </button>
              <button
                id="mobile-nav-transparencia"
                onClick={() => scrollToSection('transparencia')}
                className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-white/80 hover:bg-white/10 hover:text-white"
              >
                Transparência
              </button>
              <button
                id="mobile-nav-depoimentos"
                onClick={() => scrollToSection('depoimentos')}
                className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-white/80 hover:bg-white/10 hover:text-white"
              >
                Depoimentos
              </button>
              <button
                id="mobile-nav-doar"
                onClick={() => scrollToSection('doar-agora')}
                className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-white/80 hover:bg-white/10 hover:text-white"
              >
                Doar
              </button>
            </>
          )}
          {currentView !== 'landing' && (
            <button
              id="mobile-nav-inicio"
              onClick={() => { setMobileMenuOpen(false); onNavigate('landing'); }}
              className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-white/80 hover:bg-white/10 hover:text-white"
            >
              Início
            </button>
          )}
          
          <div className="pt-2 border-t border-white/10">
            {isLoggedIn ? (
              <div className="space-y-2 text-white">
                <div className="px-3 py-1">
                  <p className="text-xs font-semibold">Admin Root</p>
                  <p className="text-white/50 text-[10px]">admin@doefacil.com</p>
                </div>
                <button
                  id="mobile-nav-admin"
                  onClick={() => { setMobileMenuOpen(false); onNavigate('dashboard'); }}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-base font-medium bg-white/10 text-white hover:bg-white/20"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Painel Admin
                </button>
                <button
                  id="mobile-nav-logout"
                  onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-base font-medium bg-[#16A34A] text-white hover:bg-[#15803d]"
                >
                  <LogOut className="w-5 h-5" />
                  Sair
                </button>
              </div>
            ) : (
              <button
                id="mobile-nav-login"
                onClick={() => { setMobileMenuOpen(false); onNavigate('login'); }}
                className="flex items-center justify-center gap-2 w-full text-center px-4 py-2.5 rounded-lg text-base font-medium bg-[#16A34A] text-white hover:bg-[#15803d] shadow-md shadow-[#16A34A]/20"
              >
                <LogIn className="w-5 h-5" />
                Login Administrador
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
