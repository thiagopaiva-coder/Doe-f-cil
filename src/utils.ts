import { Donation } from './types';
import { INITIAL_DONATIONS } from './mockData';

// Format standard CPF: 000.000.000-00
export function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
}

// Format standard Phone: (00) 00000-0000
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

// Format currency to BRL string (R$ 1.234,56)
export function formatCurrencyBRL(value: string | number): string {
  if (typeof value === 'number') {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
  
  const digits = value.replace(/\D/g, '');
  if (!digits) return 'R$ 0,00';
  const num = parseFloat(digits) / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(num);
}

// Extract number value from BRL string or input
export function parseCurrencyBRL(value: string): number {
  const digits = value.replace(/\D/g, '');
  if (!digits) return 0;
  return parseFloat(digits) / 100;
}

// Validate CPF (basic formatting check and length verification)
export function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return false;
  
  // Basic validation (avoid obviously fake like 00000000000)
  if (/^(\d)\1{10}$/.test(digits)) return false;
  
  // Custom quick check
  let sum = 0;
  let remainder;
  
  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(digits.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(digits.substring(9, 10))) return false;
  
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(digits.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(digits.substring(10, 11))) return false;
  
  return true;
}

// Format UTC Date to readable Brazilian date string
export function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch (e) {
    return isoString;
  }
}

// LocalStorage helpers
const DONATIONS_KEY = 'doefacil_donations';
const SESSION_KEY = 'doefacil_session';

export function getStoredDonations(): Donation[] {
  const stored = localStorage.getItem(DONATIONS_KEY);
  if (!stored) {
    localStorage.setItem(DONATIONS_KEY, JSON.stringify(INITIAL_DONATIONS));
    return INITIAL_DONATIONS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_DONATIONS;
  }
}

export function saveStoredDonations(donations: Donation[]): void {
  localStorage.setItem(DONATIONS_KEY, JSON.stringify(donations));
}

export function addDonation(donation: Omit<Donation, 'id' | 'date'>): Donation {
  const donations = getStoredDonations();
  const newDonation: Donation = {
    ...donation,
    id: `don-${Date.now()}`,
    date: new Date().toISOString()
  };
  
  const updated = [newDonation, ...donations];
  saveStoredDonations(updated);
  return newDonation;
}

export function getStoredSession(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

export function setStoredSession(email: string | null): void {
  if (email) {
    localStorage.setItem(SESSION_KEY, email);
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}
