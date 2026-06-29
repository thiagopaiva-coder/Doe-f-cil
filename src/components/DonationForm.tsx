import React, { useState } from 'react';
import { formatCPF, formatPhone, formatCurrencyBRL, parseCurrencyBRL, isValidCPF } from '../utils';
import { Landmark, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface DonationFormProps {
  onSuccess: (donationData: { name: string; email: string; phone: string; cpf: string; amount: number }) => void;
}

export default function DonationForm({ onSuccess }: DonationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [amountInput, setAmountInput] = useState(''); // Raw digits or formatted string
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  // Errors state
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    cpf?: string;
    amount?: string;
  }>({});

  const presetValues = [20, 50, 100, 200];

  const handlePresetSelect = (value: number) => {
    setSelectedPreset(value);
    setAmountInput(formatCurrencyBRL(value));
    setErrors(prev => ({ ...prev, amount: undefined }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPreset(null);
    const value = e.target.value;
    const formatted = formatCurrencyBRL(value);
    setAmountInput(formatted);
    setErrors(prev => ({ ...prev, amount: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    
    // Name validation (first and last name)
    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = 'Nome completo é obrigatório.';
    } else if (trimmedName.split(/\s+/).length < 2) {
      newErrors.name = 'Por favor, insira seu nome completo (nome e sobrenome).';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'E-mail inválido.';
    }

    // Phone validation
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phone) {
      newErrors.phone = 'Telefone é obrigatório.';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Telefone incompleto.';
    }

    // CPF validation
    const cleanCpf = cpf.replace(/\D/g, '');
    if (!cpf) {
      newErrors.cpf = 'CPF é obrigatório.';
    } else if (cleanCpf.length !== 11) {
      newErrors.cpf = 'CPF deve conter 11 dígitos.';
    } else if (!isValidCPF(cpf)) {
      newErrors.cpf = 'CPF inválido.';
    }

    // Amount validation
    const amountNum = parseCurrencyBRL(amountInput);
    if (!amountInput || amountNum <= 0) {
      newErrors.amount = 'Selecione ou digite um valor para doação.';
    } else if (amountNum < 5.00) {
      newErrors.amount = 'O valor mínimo de doação é R$ 5,00.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const amountNum = parseCurrencyBRL(amountInput);
      onSuccess({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        cpf: cpf.trim(),
        amount: amountNum,
      });

      // Clear form
      setName('');
      setEmail('');
      setPhone('');
      setCpf('');
      setAmountInput('');
      setSelectedPreset(null);
      setErrors({});
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300">
      {/* Decorative gradient glowing effect in the card */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#16A34A]/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#1E3A5F]/5 rounded-full blur-2xl pointer-events-none" />

      <h3 className="text-xl font-bold text-[#0F2A4A] mb-2 flex items-center gap-2">
        <Heart className="w-5 h-5 text-[#16A34A] fill-[#16A34A]" />
        Faça sua Doação
      </h3>
      <p className="text-[#1E3A5F]/75 text-sm mb-6">
        Preencha os campos abaixo de forma rápida e segura. Cada contribuição transforma vidas.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" id="doacao-form-form">
        {/* Step 1: Amount selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A4A] mb-2">
            Valor da Doação (R$) *
          </label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {presetValues.map((val) => (
              <button
                key={val}
                type="button"
                id={`preset-${val}`}
                onClick={() => handlePresetSelect(val)}
                className={`py-2 rounded-xl font-medium text-sm border transition-all duration-200 ${
                  selectedPreset === val
                    ? 'bg-[#16A34A] text-white border-[#16A34A] shadow-md shadow-[#16A34A]/20'
                    : 'bg-white/50 border-[#0F2A4A]/10 text-[#0F2A4A] hover:bg-[#16A34A]/5 hover:border-[#16A34A]/30'
                }`}
              >
                {formatCurrencyBRL(val).replace(',00', '')}
              </button>
            ))}
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#0F2A4A]/40">
              R$
            </span>
            <input
              type="text"
              id="input-valor"
              value={amountInput}
              onChange={handleAmountChange}
              placeholder="Outro valor (mínimo R$ 5,00)"
              className={`w-full glass-input pl-11 pr-4 py-3 rounded-2xl text-base font-medium text-[#0F2A4A] placeholder-[#0F2A4A]/40 ${
                errors.amount ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
              }`}
            />
          </div>
          {errors.amount && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.amount}</p>
          )}
        </div>

        {/* Step 2: Personal details */}
        <div className="space-y-4 pt-2 border-t border-white/40">
          <div>
            <label htmlFor="form-nome" className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A4A] mb-1">
              Nome Completo *
            </label>
            <input
              type="text"
              id="form-nome"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors(prev => ({ ...prev, name: undefined }));
              }}
              placeholder="Digite seu nome completo"
              className={`w-full glass-input px-4 py-2.5 rounded-xl text-sm text-[#0F2A4A] placeholder-[#0F2A4A]/40 ${
                errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="form-email" className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A4A] mb-1">
              E-mail *
            </label>
            <input
              type="email"
              id="form-email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors(prev => ({ ...prev, email: undefined }));
              }}
              placeholder="seu-email@dominio.com"
              className={`w-full glass-input px-4 py-2.5 rounded-xl text-sm text-[#0F2A4A] placeholder-[#0F2A4A]/40 ${
                errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="form-telefone" className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A4A] mb-1">
                Telefone *
              </label>
              <input
                type="tel"
                id="form-telefone"
                value={phone}
                onChange={(e) => {
                  setPhone(formatPhone(e.target.value));
                  setErrors(prev => ({ ...prev, phone: undefined }));
                }}
                placeholder="(00) 00000-0000"
                maxLength={15}
                className={`w-full glass-input px-4 py-2.5 rounded-xl text-sm text-[#0F2A4A] placeholder-[#0F2A4A]/40 ${
                  errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="form-cpf" className="block text-xs font-semibold uppercase tracking-wider text-[#0F2A4A] mb-1">
                CPF *
              </label>
              <input
                type="text"
                id="form-cpf"
                value={cpf}
                onChange={(e) => {
                  setCpf(formatCPF(e.target.value));
                  setErrors(prev => ({ ...prev, cpf: undefined }));
                }}
                placeholder="000.000.000-00"
                maxLength={14}
                className={`w-full glass-input px-4 py-2.5 rounded-xl text-sm text-[#0F2A4A] placeholder-[#0F2A4A]/40 ${
                  errors.cpf ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''
                }`}
              />
              {errors.cpf && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.cpf}</p>
              )}
            </div>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 text-xs text-[#16A34A] font-medium">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Ambiente seguro. Seus dados estão protegidos por criptografia de ponta a ponta.</span>
        </div>

        {/* Confirm button */}
        <button
          type="submit"
          id="btn-confirmar-doacao"
          className="w-full flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#1DB954] text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-[#16A34A]/20 hover:shadow-xl hover:shadow-[#16A34A]/30 transform active:scale-[0.98] transition-all duration-300 cursor-pointer"
        >
          <span>Confirmar Doação</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
