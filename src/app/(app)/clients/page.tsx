'use client';
import { useState } from 'react';
import { CLIENTS, fmt, STATUS_LABELS, STATUS_COLORS } from '@/lib/data';
import { Search, Plus, Phone, Mail, Tag, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ClientsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);

  const filtered = CLIENTS.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.segment.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalMRR = CLIENTS.filter(c => c.status === 'ACTIVE').reduce((s, c) => s + c.monthlyFee, 0);

  return (
    <div className="p-6 space-y-5 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Clientes</h1>
          <p className="text-sm text-slate-500">{CLIENTS.filter(c=>c.status==='ACTIVE').length} ativos · MRR: {fmt.currency(totalMRR)}</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus size={15} /> Novo Cliente
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Buscar cliente..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="input w-auto" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="ALL">Todos os status</option>
          <option value="ACTIVE">Ativo</option>
          <option value="PAUSED">Pausado</option>
          <option value="INACTIVE">Inativo</option>
        </select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Clientes', value: CLIENTS.length, color: 'text-slate-700' },
          { label: 'Ativos', value: CLIENTS.filter(c=>c.status==='ACTIVE').length, color: 'text-green-600' },
          { label: 'Pausados', value: CLIENTS.filter(c=>c.status==='PAUSED').length, color: 'text-yellow-600' },
          { label: 'MRR Total', value: fmt.currency(totalMRR), color: 'text-blue-600' },
        ].map(s => (
          <div key={s.label} className="card p-4">
            <p className="text-xs text-slate-500 mb-1">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Cliente', 'Segmento', 'Contato', 'Mensalidade', 'Integrações', 'Status', 'Ações'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {c.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.address.split('—')[1]?.trim()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="badge bg-slate-100 text-slate-600">{c.segment}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-xs text-slate-500"><Mail size={11}/>{c.email}</div>
                      <div className="flex items-center gap-1 text-xs text-slate-500"><Phone size={11}/>{c.phone}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-slate-700">{fmt.currency(c.monthlyFee)}/mês</p>
                    <p className="text-xs text-slate-400">Setup: {fmt.currency(c.setupFee)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`flex items-center gap-1 text-xs ${c.metaConnected ? 'text-blue-600' : 'text-slate-300'}`}>
                        {c.metaConnected ? <CheckCircle size={13}/> : <XCircle size={13}/>} Meta
                      </span>
                      <span className={`flex items-center gap-1 text-xs ${c.googleConnected ? 'text-green-600' : 'text-slate-300'}`}>
                        {c.googleConnected ? <CheckCircle size={13}/> : <XCircle size={13}/>} Google
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${STATUS_COLORS[c.status]}`}>{STATUS_LABELS[c.status]}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/clients/${c.id}`} className="btn-secondary text-xs py-1 px-2">
                      <ExternalLink size={12}/> Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-sm">Nenhum cliente encontrado.</div>
        )}
      </div>

      {/* Add Client Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-semibold text-slate-800">Novo Cliente</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="label">Nome da empresa *</label><input className="input" placeholder="Ex: Clínica Dra. Silva" /></div>
                <div><label className="label">E-mail</label><input className="input" type="email" /></div>
                <div><label className="label">Telefone</label><input className="input" placeholder="(11) 99999-9999" /></div>
                <div><label className="label">Segmento</label>
                  <select className="input">
                    {['Saúde','Alimentação','Imóveis','Fitness','Tecnologia','Educação','Beleza','Outros'].map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div><label className="label">Mensalidade (R$)</label><input className="input" type="number" placeholder="0,00" /></div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-xs text-yellow-700">
                💡 Em modo demonstração, novos clientes não são salvos. Conecte a API para persistir dados.
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={() => setShowModal(false)}>Salvar Cliente</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
