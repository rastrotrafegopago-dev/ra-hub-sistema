'use client';
import { AGENCY_METRICS, REVENUE_CHART, CAMPAIGNS, INSIGHTS, CLIENTS, fmt } from '@/lib/data';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Zap, AlertCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

function StatCard({ label, value, change, icon: Icon, color }: any) {
  const pos = change >= 0;
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
        <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}>
          <Icon size={15} />
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${pos ? 'text-green-600' : 'text-red-500'}`}>
        {pos ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {fmt.change(change)} vs mês anterior
      </div>
    </div>
  );
}

const INSIGHT_COLORS: Record<string, string> = {
  OPPORTUNITY: 'border-green-400 bg-green-50',
  ALERT:       'border-red-400 bg-red-50',
  QUICK_WIN:   'border-blue-400 bg-blue-50',
};

export default function DashboardPage() {
  const m = AGENCY_METRICS;
  const activeCampaigns = CAMPAIGNS.filter(c => c.status === 'ACTIVE').slice(0, 4);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Painel da Agência</h1>
          <p className="text-sm text-slate-500">Visão geral — Junho 2024</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
          Dados de demonstração
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="MRR" value={fmt.currency(m.mrr)} change={m.mrrGrowth} icon={DollarSign} color="bg-blue-100 text-blue-600" />
        <StatCard label="Clientes Ativos" value={`${m.activeClients}/${m.totalClients}`} change={0} icon={Users} color="bg-purple-100 text-purple-600" />
        <StatCard label="Investimento Total" value={fmt.currency(m.totalAdSpend)} change={m.adSpendGrowth} icon={Target} color="bg-green-100 text-green-600" />
        <StatCard label="ROAS Médio" value={`${m.avgROAS}x`} change={m.roasGrowth} icon={TrendingUp} color="bg-orange-100 text-orange-600" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Leads Gerados" value={fmt.number(m.totalLeads)} change={m.leadsGrowth} icon={Zap} color="bg-cyan-100 text-cyan-600" />
        <StatCard label="CPL Médio" value={fmt.currency(m.avgCPL)} change={m.cplChange} icon={Target} color="bg-teal-100 text-teal-600" />
        <div className="stat-card">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Plataformas</p>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm"><span className="text-slate-600">Meta Ads</span><span className="font-semibold text-blue-600">{CAMPAIGNS.filter(c=>c.platform==='META').length} camps.</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-600">Google Ads</span><span className="font-semibold text-green-600">{CAMPAIGNS.filter(c=>c.platform==='GOOGLE').length} camps.</span></div>
          </div>
        </div>
        <div className="stat-card">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Status Clientes</p>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm"><span className="text-slate-600">Ativos</span><span className="font-semibold text-green-600">{CLIENTS.filter(c=>c.status==='ACTIVE').length}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-600">Pausados</span><span className="font-semibold text-yellow-600">{CLIENTS.filter(c=>c.status==='PAUSED').length}</span></div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Receita vs Despesas (6 meses)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REVENUE_CHART}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={v => `R$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => fmt.currency(v)} />
              <Area type="monotone" dataKey="receita"   fill="#dbeafe" stroke="#2563eb" strokeWidth={2} name="Receita" />
              <Area type="monotone" dataKey="despesas"  fill="#fee2e2" stroke="#ef4444" strokeWidth={2} name="Despesas" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Leads por Mês</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={[
              {month:'Jan',leads:180},{month:'Fev',leads:210},{month:'Mar',leads:248},
              {month:'Abr',leads:195},{month:'Mai',leads:312},{month:'Jun',leads:1248},
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip />
              <Bar dataKey="leads" fill="#2563eb" radius={[4,4,0,0]} name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights + Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Insights */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700">Insights & Alertas</h3>
            <span className="badge bg-red-100 text-red-600">{INSIGHTS.filter(i=>i.priority==='HIGH').length} urgentes</span>
          </div>
          <div className="space-y-3">
            {INSIGHTS.map(insight => (
              <div key={insight.id} className={`border-l-4 rounded-r-lg p-3 ${INSIGHT_COLORS[insight.type]}`}>
                <div className="flex items-start gap-2">
                  <span className="text-base">{insight.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-700">{insight.clientName}</p>
                    <p className="text-sm font-medium text-slate-800">{insight.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{insight.description}</p>
                    <p className="text-xs text-blue-600 font-medium mt-1">→ {insight.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700">Campanhas Ativas</h3>
            <Link href="/traffic" className="text-xs text-blue-600 hover:underline">Ver todas →</Link>
          </div>
          <div className="space-y-3">
            {activeCampaigns.map(c => (
              <div key={c.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${c.platform==='META'?'bg-blue-500':'bg-green-500'}`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-700 truncate">{c.clientName}</p>
                  <p className="text-xs text-slate-500 truncate">{c.name}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold text-slate-700">{c.roas}x</p>
                  <p className="text-xs text-slate-400">ROAS</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold text-slate-700">{fmt.currency(c.spend)}</p>
                  <p className="text-xs text-slate-400">gasto</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
