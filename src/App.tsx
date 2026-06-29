/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DonationForm from './components/DonationForm';
import HowItWorks from './components/HowItWorks';
import Transparency from './components/Transparency';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LoginCard from './components/LoginCard';
import AdminDashboard from './components/AdminDashboard';
import SuccessModal from './components/SuccessModal';

import { Donation } from './types';
import { 
  getStoredDonations, 
  addDonation, 
  getStoredSession, 
  setStoredSession,
  saveStoredDonations
} from './utils';
import { INITIAL_DONATIONS } from './mockData';

import { Heart, Sparkles, ShieldCheck } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  
  // Success modal state
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successDonationData, setSuccessDonationData] = useState<{
    name: string;
    email: string;
    amount: number;
    phone: string;
    cpf: string;
  } | null>(null);

  // Load initial data
  useEffect(() => {
    // Load donations
    const stored = getStoredDonations();
    setDonations(stored);

    // Load session
    const sessionEmail = getStoredSession();
    if (sessionEmail === 'admin@doefacil.com') {
      setIsLoggedIn(true);
      setCurrentUserEmail(sessionEmail);
    }
  }, []);

  // Handle donor adding a donation
  const handleDonationSuccess = (formData: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
    amount: number;
  }) => {
    const newDonation = addDonation(formData);
    
    // Update state
    setDonations(prev => [newDonation, ...prev]);
    
    // Set success modal details
    setSuccessDonationData({
      name: formData.name,
      email: formData.email,
      amount: formData.amount,
      phone: formData.phone,
      cpf: formData.cpf,
    });
    setSuccessModalOpen(true);
  };

  // Handle admin login
  const handleLoginSuccess = (email: string) => {
    setStoredSession(email);
    setIsLoggedIn(true);
    setCurrentUserEmail(email);
    setView('dashboard');
  };

  // Handle admin logout
  const handleLogout = () => {
    setStoredSession(null);
    setIsLoggedIn(false);
    setCurrentUserEmail(null);
    setView('landing');
  };

  // Handle resetting mock data (demo support)
  const handleResetData = () => {
    saveStoredDonations(INITIAL_DONATIONS);
    setDonations(INITIAL_DONATIONS);
  };

  // Handle clearing all data (demo support)
  const handleClearData = () => {
    saveStoredDonations([]);
    setDonations([]);
  };

  // Trigger smooth scroll to donation form
  const handleDoarClick = () => {
    setView('landing');
    setTimeout(() => {
      const formElement = document.getElementById('doar-agora');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6] text-[#0F2A4A] selection:bg-[#16A34A]/20 selection:text-[#16A34A]">
      {/* Dynamic Header */}
      <Header 
        currentView={view} 
        onNavigate={(newView) => {
          // Guard dashboard view with auth check
          if (newView === 'dashboard' && !isLoggedIn) {
            setView('login');
          } else {
            setView(newView);
          }
        }} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {view === 'landing' && (
          <div className="animate-in fade-in duration-300">
            {/* Hero Section */}
            <Hero donations={donations} onDoarClick={handleDoarClick} />

            {/* Donation Form and Support Panel */}
            <section id="doar-agora" className="py-16 bg-gradient-to-b from-white/30 to-[#F3F4F6]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left Column: Form Info */}
                  <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                    <div className="inline-flex items-center gap-2 bg-[#16A34A]/10 text-[#16A34A] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                      <Heart className="w-3 h-3 fill-current" />
                      <span>Ajude Conosco</span>
                    </div>
                    
                    <h2 className="text-3xl font-extrabold text-[#0F2A4A] tracking-tight">
                      Sua doação faz a <br />
                      <span className="text-[#16A34A]">diferença hoje</span>
                    </h2>
                    
                    <p className="text-sm sm:text-base text-[#1E3A5F]/85 leading-relaxed font-light">
                      Cada contribuição financeira para a nossa plataforma é processada de forma auditável e transparente. O DoeFácil assegura que os recursos sejam aplicados com celeridade e respeito às necessidades de quem mais precisa.
                    </p>

                    <div className="bg-white/50 border border-white/80 rounded-2xl p-4 space-y-3 shadow-sm">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F2A4A]">Garantias DoeFácil</h4>
                      <ul className="space-y-2 text-xs text-[#1E3A5F]/85">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#16A34A] rounded-full" />
                          <span>Comprovante gerado instantaneamente na tela</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#16A34A] rounded-full" />
                          <span>Acesso público a relatórios gerais de transações</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#16A34A] rounded-full" />
                          <span>Cancelamento simplificado caso mude de ideia</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Donation Form Card */}
                  <div className="lg:col-span-7">
                    <DonationForm onSuccess={handleDonationSuccess} />
                  </div>

                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <HowItWorks />

            {/* Transparency Section */}
            <Transparency />

            {/* Testimonials Section */}
            <Testimonials />
          </div>
        )}

        {view === 'login' && (
          <div className="py-12 sm:py-20 animate-in fade-in zoom-in-95 duration-200">
            <LoginCard onLoginSuccess={handleLoginSuccess} />
          </div>
        )}

        {view === 'dashboard' && (
          <AdminDashboard 
            donations={donations} 
            onResetData={handleResetData}
            onClearData={handleClearData}
          />
        )}
      </main>

      {/* Dynamic Footer */}
      <Footer />

      {/* Success Modal */}
      <SuccessModal 
        isOpen={successModalOpen} 
        onClose={() => setSuccessModalOpen(false)} 
        donationDetails={successDonationData} 
      />
    </div>
  );
}

