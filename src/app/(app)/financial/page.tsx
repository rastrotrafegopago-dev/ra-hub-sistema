'use client';
import { useState } from 'react';
import { TRANSACTIONS, SUBSCRIPTIONS, REVENUE_CHART, fmt, STATUS_COLORS, STATUS_LABELS, CLIENTS } from '@/lib/data';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle, Plus, CheckCircle } from 'lucide-react';

export default function FinancialPage() {
  const [tab, setTab] = useState<'overview' | 'transactions' | 'subscriptions'>('overview');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);

  const income = TRANSACTIONS.filter(t=>t.type==='INCOME').reduce((s,t)=>s+t.amount,0);
  const expense = TRANSACTIONS.filter(t=>t.type==='EXPENSE').reduce((s,t)=>s+t.amount,0);
  const profit = income - expense;
  const mrr = SUBSCRIPTIONS.filter(s=>s.status==='ACTIVE').reduce((s,sub)=>s+sub.amount,0);
  const pending = TRANSACTIONS.filter(t=>t.status==='PENDING').reduce((s,t)=>s+t.amount,0);
  const overdue = TRANSACTIONS.filter(t=>t.status==='OVERDUE').reduce((s,t)=>s+t.amount,0);

  const filteredTx = TRANSACTIONS.filter(t => typeFilter === 'ALL' || t.type === typeFilter);

  const TXcolor: Record<string, string> = {
    INCOME: 'text-green-600 bg-green-50', EXPENSE: 'text-red-500 bg-red-50',
  };
  const TXlabel: Record<string, string> = { INCOME: 'Entrada', EXPENSE: 'Saída' };

  return (
    <div className="p-6 space-y-5 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Financeiro</h1>
          <p className="text-sm text-slate-500">Junho 2024</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowModal(true)} className="btn-primary"><Plus size={15}/> Lançamento</button>
          <button className="btn-secondary">
            <span className="text-green-600">$</span> Conectar Asaas
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Receita do Mês', value: fmt.currency(income), icon: '↑', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Despesas',       value: fmt.currency(expense), icon: '↓', color: 'text-red-500',   bg: 'bg-red-50' },
          { label: 'Lucro Líquido',  value: fmt.currency(profit),  icon: '=', color: profit>=0?'text-blue-600':'text-red-500', bg: profit>=0?'bg-blue-50':'bg-red-50' },
          { label: 'MRR',            value: fmt.currency(mrr),     icon: '♻', color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map(k => (
          <div key={k.label} className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-base ${k.color}`}>{k.icon}</span>
              <p className="text-xs text-slate-500">{k.label}</p>
            </div>
            <p className={`text-xl font-bold ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {(pending > 0 || overdue > 0) && (
        <div className="flex gap-3 flex-wrap">
          {pending > 0 && (
            <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs px-3 py-2 rounded-lg">
              <AlertCircle size={13}/> {fmt.currency(pending)} a receber este mês
            </div>
          )}
          {overdue > 0 && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg">
              <AlertCircle size={13}/> {fmt.currency(overdue)} em atraso — ação necessária
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        {[['overview','Visão Geral'],['transactions','Lançamentos'],['subscriptions','Mensalidades']].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k as any)}
            className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${tab===k?'bg-white shadow text-slate-800':'text-slate-500'}`}>
            {l}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Receita vs Despesas</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={REVENUE_CHART}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }}/>
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={v=>`R$${(v/1000).toFixed(0)}k`}/>
                <Tooltip formatter={(v:number) => fmt.currency(v)}/>
                <Area type="monotone" dataKey="receita"  fill="#d1fae5" stroke="#059669" strokeWidth={2} name="Receita"/>
                <Area type="monotone" dataKey="despesas" fill="#fee2e2" stroke="#ef4444" strokeWidth={2} name="Despesas"/>
                <Area type="monotone" dataKey="lucro"    fill="#dbeafe" stroke="#2563eb" strokeWidth={2} name="Lucro"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Receita por Cliente</h3>
            <div className="space-y-3">
              {CLIENTS.filter(c=>c.status==='ACTIVE').sort((a,b)=>b.monthlyFee-a.monthlyFee).map(c => (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{c.avatar}</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 font-medium truncate">{c.name}</span>
                      <span className="text-slate-700 font-bold flex-shrink-0 ml-2">{fmt.currency(c.monthlyFee)}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full" style={{width:`${(c.monthlyFee/mrr)*100}%`}}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Transactions */}
      {tab === 'transactions' && (
        <div className="card overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-100">
            <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
              {[['ALL','Todos'],['INCOME','Entradas'],['EXPENSE','Saídas']].map(([k,l]) => (
                <button key={k} onClick={() => setTypeFilter(k)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${typeFilter===k?'bg-white shadow text-slate-800':'text-slate-500'}`}>{l}</button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {filteredTx.map(t => (
              <div key={t.id} className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${TXcolor[t.type]}`}>
                  {t.type==='INCOME' ? '↑' : '↓'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{t.description}</p>
                  <p className="text-xs text-slate-400">{t.category} · {new Date(t.date).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-sm font-bold ${t.type==='INCOME'?'text-green-600':'text-red-500'}`}>
                    {t.type==='INCOME'?'+':'-'} {fmt.currency(t.amount)}
                  </p>
                  <span className={`badge text-xs ${STATUS_COLORS[t.status]}`}>{STATUS_LABELS[t.status]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subscriptions */}
      {tab === 'subscriptions' && (
        <div className="space-y-3">
          {SUBSCRIPTIONS.map(s => (
            <div key={s.clientId} className={`card p-4 flex items-center gap-4 border-l-4 ${s.status==='ACTIVE'?'border-green-400':s.status==='OVERDUE'?'border-red-400':'border-yellow-400'}`}>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-700">{s.clientName}</p>
                <p className="text-xs text-slate-400">{s.plan} · vence dia {s.dueDay}</p>
              </div>
              <div className="text-right">
                <p className="text-base font-bold text-slate-700">{fmt.currency(s.amount)}/mês</p>
                <p className="text-xs text-slate-400">Próximo: {new Date(s.nextDue).toLocaleDateString('pt-BR')}</p>
              </div>
              <span className={`badge ${STATUS_COLORS[s.status]} flex-shrink-0`}>{STATUS_LABELS[s.status]}</span>
              {s.status === 'OVERDUE' && (
                <button className="btn-danger text-xs py-1 px-2 flex-shrink-0">Cobrar</button>
              )}
            </div>
          ))}

          <div className="card p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-700">Integração Asaas</p>
                <p className="text-xs text-slate-500 mt-0.5">Automatize cobranças, boletos e Pix</p>
              </div>
              <button className="btn-primary bg-green-600 hover:bg-green-700">Conectar Asaas</button>
            </div>
          </div>
        </div>
      )}

      {/* New Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-semibold text-slate-800">Novo Lançamento</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-3">
                <button className="flex-1 py-3 border-2 border-green-500 bg-green-50 text-green-700 rounded-xl text-sm font-medium">↑ Entrada</button>
                <button className="flex-1 py-3 border-2 border-slate-200 text-slate-400 rounded-xl text-sm font-medium hover:border-red-300">↓ Saída</button>
              </div>
              <div><label className="label">Descrição</label><input className="input" placeholder="Ex: Mensalidade cliente X"/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Valor (R$)</label><input className="input" type="number" placeholder="0,00"/></div>
                <div><label className="label">Data</label><input className="input" type="date"/></div>
              </div>
              <div><label className="label">Categoria</label>
                <select className="input">
                  {['Mensalidade','Setup','Comissão','Ferramentas','Equipe','Plataformas','Infraestrutura','Outros'].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-xs text-yellow-700">
                💡 Em modo demonstração, lançamentos não são persistidos.
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={() => setShowModal(false)}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
