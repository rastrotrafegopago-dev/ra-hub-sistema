'use client';
import { CLIENTS, CAMPAIGNS, TRANSACTIONS, fmt, STATUS_COLORS, STATUS_LABELS } from '@/lib/data';
import { ArrowLeft, Phone, Mail, MapPin, Target, DollarSign, BarChart3, Globe, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const client = CLIENTS.find(c => c.id === id);
  if (!client) return <div className="p-6 text-slate-500">Cliente não encontrado.</div>;

  const campaigns = CAMPAIGNS.filter(c => c.clientId === id);
  const transactions = TRANSACTIONS.filter(t => t.clientId === id);

  const modules = [
    { href: `/traffic?clientId=${id}`,   label: 'Tráfego Pago', icon: Target,    color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { href: `/financial?clientId=${id}`, label: 'Financeiro',   icon: DollarSign, color: 'bg-green-50 text-green-600 border-green-200' },
    { href: `/crm`,                      label: 'CRM / Leads',  icon: BarChart3,  color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { href: `/gmb`,                      label: 'Google Meu Negócio', icon: MapPin, color: 'bg-red-50 text-red-600 border-red-200' },
    { href: `/social`,                   label: 'Social Media', icon: Globe,      color: 'bg-pink-50 text-pink-600 border-pink-200' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <Link href="/clients" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft size={15}/> Voltar a Clientes
      </Link>

      {/* Header */}
      <div className="card p-6 flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0">
          {client.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-slate-900">{client.name}</h1>
            <span className={`badge ${STATUS_COLORS[client.status]}`}>{STATUS_LABELS[client.status]}</span>
          </div>
          <p className="text-sm text-slate-500 mt-1">{client.segment} · Cliente desde {new Date(client.startDate).toLocaleDateString('pt-BR', {month:'long',year:'numeric'})}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">
            <span className="flex items-center gap-1.5"><Mail size={13}/>{client.email}</span>
            <span className="flex items-center gap-1.5"><Phone size={13}/>{client.phone}</span>
            <span className="flex items-center gap-1.5"><MapPin size={13}/>{client.address}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Mensalidade</p>
          <p className="text-2xl font-bold text-blue-600">{fmt.currency(client.monthlyFee)}</p>
          <p className="text-xs text-slate-400 mt-0.5">Setup: {fmt.currency(client.setupFee)}</p>
        </div>
      </div>

      {/* Integrations */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Integrações</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className={`flex items-center gap-3 p-3 rounded-lg border ${client.metaConnected ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${client.metaConnected ? 'bg-blue-500' : 'bg-slate-200'}`}>
              {client.metaConnected ? '📘' : '📘'}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-700">Meta Ads</p>
              <p className="text-xs text-slate-400">{client.metaConnected ? 'Conectado' : 'Não conectado'}</p>
            </div>
            {client.metaConnected ? <CheckCircle size={16} className="text-blue-500"/> : <XCircle size={16} className="text-slate-300"/>}
          </div>
          <div className={`flex items-center gap-3 p-3 rounded-lg border ${client.googleConnected ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${client.googleConnected ? 'bg-green-500' : 'bg-slate-200'}`}>
              🔍
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-700">Google Ads</p>
              <p className="text-xs text-slate-400">{client.googleConnected ? 'Conectado' : 'Não conectado'}</p>
            </div>
            {client.googleConnected ? <CheckCircle size={16} className="text-green-500"/> : <XCircle size={16} className="text-slate-300"/>}
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Módulos do Cliente</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {modules.map(m => {
            const Icon = m.icon;
            return (
              <Link key={m.href} href={m.href} className={`flex flex-col items-center gap-2 p-3 rounded-xl border ${m.color} hover:shadow-md transition-shadow text-center`}>
                <Icon size={20}/>
                <span className="text-xs font-medium leading-tight">{m.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Campaigns */}
      {campaigns.length > 0 && (
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Campanhas ({campaigns.length})</h3>
          <div className="space-y-3">
            {campaigns.map(c => (
              <div key={c.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                <div className={`w-2 h-8 rounded-full flex-shrink-0 ${c.platform==='META'?'bg-blue-500':'bg-green-500'}`}/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{c.name}</p>
                  <p className="text-xs text-slate-400">{c.platform} · {c.objective}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-right text-xs flex-shrink-0">
                  <div><p className="font-bold text-slate-700">{fmt.currency(c.spend)}</p><p className="text-slate-400">Gasto</p></div>
                  <div><p className="font-bold text-slate-700">{fmt.number(c.leads)}</p><p className="text-slate-400">Leads</p></div>
                  <div><p className="font-bold text-blue-600">{c.roas}x</p><p className="text-slate-400">ROAS</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-2">Observações</h3>
        <p className="text-sm text-slate-600">{client.notes}</p>
      </div>
    </div>
  );
}
