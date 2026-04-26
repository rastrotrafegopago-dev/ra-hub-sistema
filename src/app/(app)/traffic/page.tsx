'use client';
import { useState } from 'react';
import { CAMPAIGNS, CLIENTS, PERFORMANCE_CHART, INSIGHTS, fmt, STATUS_COLORS, STATUS_LABELS } from '@/lib/data';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, Zap, Target, Eye, MousePointerClick, Link2, AlertCircle } from 'lucide-react';

const PLATFORM_COLORS: Record<string, string> = { META: 'bg-blue-500', GOOGLE: 'bg-green-500' };
const PLATFORM_LABELS: Record<string, string> = { META: 'Meta Ads', GOOGLE: 'Google Ads' };

function Metric({ label, value, sub, trend }: { label: string; value: string; sub?: string; trend?: number }) {
  return (
    <div className="text-center">
      <p className="text-lg font-bold text-slate-800">{value}</p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
      {trend !== undefined && (
        <p className={`text-xs font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </p>
      )}
    </div>
  );
}

export default function TrafficPage() {
  const [platform, setPlatform] = useState('ALL');
  const [clientFilter, setClientFilter] = useState('ALL');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = CAMPAIGNS.filter(c => {
    const matchP = platform === 'ALL' || c.platform === platform;
    const matchC = clientFilter === 'ALL' || c.clientId === clientFilter;
    return matchP && matchC;
  });

  const totals = filtered.reduce((a, c) => ({
    spend: a.spend + c.spend,
    leads: a.leads + c.leads,
    impressions: a.impressions + c.impressions,
    clicks: a.clicks + c.clicks,
    conversions: a.conversions + c.conversions,
  }), { spend: 0, leads: 0, impressions: 0, clicks: 0, conversions: 0 });

  const avgROAS = filtered.length ? (filtered.reduce((s,c)=>s+c.roas,0)/filtered.length).toFixed(1) : '0';
  const avgCTR = filtered.length ? (filtered.reduce((s,c)=>s+c.ctr,0)/filtered.length).toFixed(2) : '0';
  const avgCPL = totals.leads ? (totals.spend / totals.leads).toFixed(2) : '0';

  const selectedCampaign = selected ? CAMPAIGNS.find(c => c.id === selected) : null;

  // Briefing insights
  const trafficInsights = INSIGHTS.filter(i => ['OPPORTUNITY','QUICK_WIN'].includes(i.type));

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Tráfego Pago</h1>
          <p className="text-sm text-slate-500">{filtered.length} campanhas · {filtered.filter(c=>c.status==='ACTIVE').length} ativas</p>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            {['ALL','META','GOOGLE'].map(p => (
              <button key={p} onClick={() => setPlatform(p)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${platform===p?'bg-white shadow text-slate-800':'text-slate-500'}`}>
                {p === 'ALL' ? 'Todas' : p === 'META' ? 'Meta Ads' : 'Google Ads'}
              </button>
            ))}
          </div>
          <select className="input w-auto text-xs" value={clientFilter} onChange={e => setClientFilter(e.target.value)}>
            <option value="ALL">Todos os clientes</option>
            {CLIENTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Investimento', value: fmt.currency(totals.spend), icon: Target },
          { label: 'Impressões', value: fmt.number(totals.impressions), icon: Eye },
          { label: 'Cliques', value: fmt.number(totals.clicks), icon: MousePointerClick },
          { label: 'Leads', value: fmt.number(totals.leads), icon: Zap },
          { label: 'ROAS Médio', value: `${avgROAS}x`, icon: TrendingUp },
          { label: 'CPL Médio', value: fmt.currency(parseFloat(avgCPL)), icon: Link2 },
        ].map(k => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className="text-blue-500"/>
                <p className="text-xs text-slate-500">{k.label}</p>
              </div>
              <p className="text-lg font-bold text-slate-800">{k.value}</p>
            </div>
          );
        })}
      </div>

      {/* Campaigns + Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700">Campanhas</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {filtered.map(c => (
              <div key={c.id}
                onClick={() => setSelected(selected === c.id ? null : c.id)}
                className={`px-5 py-4 cursor-pointer transition-colors ${selected===c.id?'bg-blue-50':'hover:bg-slate-50'}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${PLATFORM_COLORS[c.platform]}`}/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-slate-800">{c.clientName}</p>
                      <span className={`badge ${STATUS_COLORS[c.status]}`}>{STATUS_LABELS[c.status]}</span>
                      <span className="text-xs text-slate-400">{PLATFORM_LABELS[c.platform]}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{c.name}</p>
                    <div className="flex gap-4 mt-2 flex-wrap">
                      {[
                        { l: 'Gasto', v: fmt.currency(c.spend) },
                        { l: 'Leads', v: fmt.number(c.leads) },
                        { l: 'CTR', v: fmt.percent(c.ctr) },
                        { l: 'CPL', v: fmt.currency(c.cpl) },
                        { l: 'ROAS', v: `${c.roas}x` },
                      ].map(m => (
                        <div key={m.l} className="text-xs">
                          <span className="text-slate-400">{m.l}: </span>
                          <span className="font-semibold text-slate-700">{m.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {selectedCampaign ? (
            <div className="card p-5 space-y-4">
              <h3 className="text-sm font-semibold text-slate-700">Detalhes da Campanha</h3>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${selectedCampaign.platform==='META'?'bg-blue-100 text-blue-700':'bg-green-100 text-green-700'}`}>
                <div className={`w-2 h-2 rounded-full ${PLATFORM_COLORS[selectedCampaign.platform]}`}/>
                {PLATFORM_LABELS[selectedCampaign.platform]}
              </div>
              <p className="text-xs font-medium text-slate-700">{selectedCampaign.name}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { l: 'Budget', v: fmt.currency(selectedCampaign.budget) },
                  { l: 'Gasto', v: fmt.currency(selectedCampaign.spend) },
                  { l: 'Impressões', v: fmt.number(selectedCampaign.impressions) },
                  { l: 'Cliques', v: fmt.number(selectedCampaign.clicks) },
                  { l: 'Leads', v: fmt.number(selectedCampaign.leads) },
                  { l: 'Conversões', v: fmt.number(selectedCampaign.conversions) },
                  { l: 'CTR', v: fmt.percent(selectedCampaign.ctr) },
                  { l: 'CPC', v: fmt.currency(selectedCampaign.cpc) },
                  { l: 'CPL', v: fmt.currency(selectedCampaign.cpl) },
                  { l: 'ROAS', v: `${selectedCampaign.roas}x` },
                ].map(m => (
                  <div key={m.l} className="bg-slate-50 rounded-lg p-2.5">
                    <p className="text-xs text-slate-400">{m.l}</p>
                    <p className="text-sm font-bold text-slate-700">{m.v}</p>
                  </div>
                ))}
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-purple-700 mb-1">🏆 Melhor Criativo</p>
                <p className="text-xs text-purple-600">{selectedCampaign.topCreative}</p>
                <p className="text-xs text-purple-500 mt-0.5">Score: {selectedCampaign.creativeScore}/10</p>
              </div>
            </div>
          ) : (
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Performance Semanal</h3>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={PERFORMANCE_CHART}>
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="leads" stroke="#2563eb" strokeWidth={2} dot={false} name="Leads" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Briefing/Insights */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-yellow-500"/>
              <h3 className="text-sm font-semibold text-slate-700">Briefing de Otimização</h3>
            </div>
            <div className="space-y-3">
              {trafficInsights.map(i => (
                <div key={i.id} className="border border-dashed border-slate-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-slate-600">{i.icon} {i.clientName}</p>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">{i.title}</p>
                  <p className="text-xs text-blue-600 mt-1">Ação: {i.action}</p>
                  <p className="text-xs text-green-600">Impacto: {i.impact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Connect APIs */}
          <div className="card p-5 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">🔗 Conectar APIs Reais</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700">
                <span>📘</span> Conectar Meta Ads
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700">
                <span>🔍</span> Conectar Google Ads
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2">Conecte sua conta para ver dados reais em tempo real.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
