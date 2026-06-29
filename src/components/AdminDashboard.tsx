import React, { useState, useMemo } from 'react';
import { Donation } from '../types';
import { formatCurrencyBRL, formatDate } from '../utils';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Search, 
  ArrowUpDown, 
  Download, 
  RotateCcw,
  Trash2,
  Filter,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';

interface AdminDashboardProps {
  donations: Donation[];
  onResetData: () => void;
  onClearData: () => void;
}

type SortField = 'amount' | 'date' | 'name';
type SortOrder = 'asc' | 'desc';

export default function AdminDashboard({ donations, onResetData, onClearData }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [minAmountFilter, setMinAmountFilter] = useState<number | ''>('');

  // 1. Calculate Summary Stats
  const stats = useMemo(() => {
    const total = donations.reduce((sum, item) => sum + item.amount, 0);
    const count = donations.length;
    const average = count > 0 ? total / count : 0;
    return {
      total,
      count,
      average
    };
  }, [donations]);

  // 2. Handle sorting toggle
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc'); // default to descending for new field selection
    }
  };

  // 3. Filter and Sort Donations
  const filteredAndSortedDonations = useMemo(() => {
    let result = [...donations];

    // Filter by search query (name, email, phone, cpf)
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        item =>
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          item.phone.includes(query) ||
          item.cpf.includes(query)
      );
    }

    // Filter by minimum value
    if (minAmountFilter !== '') {
      result = result.filter(item => item.amount >= minAmountFilter);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'amount') {
        comparison = a.amount - b.amount;
      } else if (sortField === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [donations, searchTerm, sortField, sortOrder, minAmountFilter]);

  // 4. Export simulated CSV report
  const exportToCSV = () => {
    if (filteredAndSortedDonations.length === 0) return;
    
    // CSV Header
    const headers = ['Nome', 'E-mail', 'Telefone', 'CPF', 'Valor (R$)', 'Data/Hora'];
    const rows = filteredAndSortedDonations.map(don => [
      don.name,
      don.email,
      don.phone,
      don.cpf,
      don.amount.toFixed(2),
      formatDate(don.date)
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(row => row.map(val => `"${val}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `doefacil_doacoes_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Dashboard Sub-Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0F2A4A] tracking-tight">Painel de Arrecadação</h2>
          <p className="text-sm text-[#1E3A5F]/70">Controle financeiro em tempo real e monitoramento de doações recebidas.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            id="btn-export-csv"
            onClick={exportToCSV}
            disabled={filteredAndSortedDonations.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0F2A4A] hover:bg-[#1E3A5F] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl shadow-md transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Exportar Relatório</span>
          </button>
          
          <button
            id="btn-reset-data"
            onClick={onResetData}
            title="Restaurar dados iniciais de demonstração"
            className="flex items-center gap-2 px-3 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-[#0F2A4A] text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Resetar Demo</span>
          </button>

          <button
            id="btn-clear-data"
            onClick={onClearData}
            title="Limpar todos os registros em memória"
            className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-red-100 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Limpar Tudo</span>
          </button>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Arrecadado */}
        <div className="glass-panel rounded-3xl p-6 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A5F]/60">Total Arrecadado</span>
            <p className="text-3xl font-black text-[#16A34A]">{formatCurrencyBRL(stats.total)}</p>
          </div>
          <div className="bg-[#16A34A]/10 text-[#16A34A] p-4 rounded-2xl">
            <DollarSign className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#16A34A]/5 rounded-bl-full pointer-events-none" />
        </div>

        {/* Quantidade de Doações */}
        <div className="glass-panel rounded-3xl p-6 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A5F]/60">Qtd. de Contribuições</span>
            <p className="text-3xl font-black text-[#0F2A4A]">{stats.count}</p>
          </div>
          <div className="bg-[#0F2A4A]/10 text-[#0F2A4A] p-4 rounded-2xl">
            <Users className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#0F2A4A]/5 rounded-bl-full pointer-events-none" />
        </div>

        {/* Ticket Médio */}
        <div className="glass-panel rounded-3xl p-6 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A5F]/60">Ticket Médio</span>
            <p className="text-3xl font-black text-[#1E3A5F]">{formatCurrencyBRL(stats.average)}</p>
          </div>
          <div className="bg-sky-50 text-sky-600 p-4 rounded-2xl">
            <TrendingUp className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-sky-500/5 rounded-bl-full pointer-events-none" />
        </div>
      </div>

      {/* Search and Filters Panel */}
      <div className="glass-panel rounded-3xl p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search box */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              id="search-donations"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, e-mail, telefone ou CPF..."
              className="w-full glass-input pl-10 pr-4 py-2.5 rounded-2xl text-xs font-medium text-[#0F2A4A]"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs text-[#0F2A4A] font-semibold">
              <Filter className="w-4 h-4" />
              <span>Valor Mínimo:</span>
            </div>
            
            <div className="flex gap-2">
              {[50, 100, 500].map(amt => (
                <button
                  key={amt}
                  id={`filter-min-${amt}`}
                  onClick={() => setMinAmountFilter(minAmountFilter === amt ? '' : amt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    minAmountFilter === amt
                      ? 'bg-[#16A34A] text-white border-[#16A34A]'
                      : 'bg-white text-[#0F2A4A] border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  ≥ R$ {amt}
                </button>
              ))}
              {minAmountFilter !== '' && (
                <button
                  id="filter-clear"
                  onClick={() => setMinAmountFilter('')}
                  className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-xl text-xs font-semibold"
                >
                  Limpar Filtro
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Table / Mobile Cards */}
      <div className="glass-panel rounded-3xl overflow-hidden">
        
        {/* Desktop View Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse" id="admin-donations-table">
            <thead>
              <tr className="border-b border-[#0F2A4A]/10 bg-[#0F2A4A]/5">
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#0F2A4A]">Doador</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#0F2A4A]">CPF</th>
                <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#0F2A4A]">Contato</th>
                <th 
                  className="p-4 text-xs font-bold uppercase tracking-wider text-[#0F2A4A] cursor-pointer hover:bg-[#0F2A4A]/10 transition-colors"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center gap-1">
                    <span>Valor</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th 
                  className="p-4 text-xs font-bold uppercase tracking-wider text-[#0F2A4A] cursor-pointer hover:bg-[#0F2A4A]/10 transition-colors"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-1">
                    <span>Data</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0F2A4A]/5">
              {filteredAndSortedDonations.map((don) => (
                <tr key={don.id} className="hover:bg-white/30 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-sm text-[#0F2A4A]">{don.name}</div>
                    <div className="text-xs text-slate-400">{don.email}</div>
                  </td>
                  <td className="p-4 font-mono text-xs text-slate-500">{don.cpf}</td>
                  <td className="p-4 text-xs text-slate-500">{don.phone}</td>
                  <td className="p-4 text-sm font-bold text-[#16A34A]">{formatCurrencyBRL(don.amount)}</td>
                  <td className="p-4 text-xs text-slate-400">{formatDate(don.date)}</td>
                </tr>
              ))}

              {filteredAndSortedDonations.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-xs text-slate-400">
                    Nenhuma doação localizada para os filtros inseridos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View Cards */}
        <div className="block md:hidden p-4 space-y-4">
          <div className="text-xs font-bold text-[#0F2A4A]/60 uppercase tracking-wider mb-2">
            Registros de Doações ({filteredAndSortedDonations.length})
          </div>
          
          {filteredAndSortedDonations.map((don) => (
            <div 
              key={don.id} 
              className="bg-white/40 border border-white/60 rounded-2xl p-4 space-y-2.5 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-sm text-[#0F2A4A]">{don.name}</div>
                  <div className="text-xs text-slate-400 truncate max-w-[200px]">{don.email}</div>
                </div>
                <div className="font-black text-sm text-[#16A34A]">
                  {formatCurrencyBRL(don.amount)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#0F2A4A]/5 text-[11px] text-slate-500 font-light">
                <div>
                  <span className="font-semibold block text-[#0F2A4A]/60 text-[9px] uppercase">CPF</span>
                  <span className="font-mono">{don.cpf}</span>
                </div>
                <div>
                  <span className="font-semibold block text-[#0F2A4A]/60 text-[9px] uppercase">Telefone</span>
                  <span>{don.phone}</span>
                </div>
              </div>

              <div className="pt-1.5 flex justify-between items-center text-[10px] text-slate-400">
                <span>ID: {don.id}</span>
                <span>{formatDate(don.date)}</span>
              </div>
            </div>
          ))}

          {filteredAndSortedDonations.length === 0 && (
            <p className="text-center text-xs text-slate-400 py-6">
              Nenhuma doação localizada para os filtros inseridos.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
