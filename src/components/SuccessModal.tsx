import React from 'react';
import { Check, ShieldCheck, Calendar, DollarSign, X } from 'lucide-react';
import { formatCurrencyBRL } from '../utils';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  donationDetails: {
    name: string;
    email: string;
    amount: number;
    phone: string;
    cpf: string;
  } | null;
}

export default function SuccessModal({ isOpen, onClose, donationDetails }: SuccessModalProps) {
  if (!isOpen || !donationDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0F2A4A]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-emerald-100">
        
        {/* Accent Top Bar */}
        <div className="bg-[#16A34A] h-2 w-full" />

        {/* Close Button */}
        <button
          id="btn-close-modal"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 text-center">
          
          {/* Animated Success Circle Icon */}
          <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-[#16A34A] mb-4 border-2 border-emerald-100">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <h3 className="text-2xl font-bold text-[#0F2A4A] mb-2">
            Doação Confirmada!
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Muito obrigado, <strong className="text-[#0F2A4A] font-semibold">{donationDetails.name.split(' ')[0]}</strong>! Sua contribuição fará uma diferença real hoje.
          </p>

          {/* Details Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-3 mb-6">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200/60">
              <span className="text-slate-400">Doador</span>
              <span className="font-semibold text-[#0F2A4A] truncate max-w-[200px]">{donationDetails.name}</span>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200/60">
              <span className="text-slate-400">CPF do Doador</span>
              <span className="font-mono font-medium text-[#0F2A4A]">{donationDetails.cpf}</span>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200/60">
              <span className="text-slate-400">E-mail</span>
              <span className="font-semibold text-[#0F2A4A] truncate max-w-[200px]">{donationDetails.email}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-[#0F2A4A]">Valor da Doação</span>
              <span className="text-[#16A34A] text-lg">{formatCurrencyBRL(donationDetails.amount)}</span>
            </div>
          </div>

          {/* Security badge */}
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 text-xs text-[#16A34A] font-medium text-left mb-6">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Transação processada com sucesso. O comprovante foi enviado para o seu e-mail.</span>
          </div>

          {/* Close button */}
          <button
            id="btn-modal-concluido"
            onClick={onClose}
            className="w-full bg-[#16A34A] hover:bg-[#1DB954] text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-[#16A34A]/20 transition-all duration-200 cursor-pointer text-sm"
          >
            Concluir e Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
