'use client';
import { useState } from 'react';
import { INSIGHTS, CLIENTS } from '@/lib/data';
import { Bell, AlertCircle, TrendingUp, Zap, CheckCircle, Trash2 } from 'lucide-react';

const ALL_ALERTS = [
  ...INSIGHTS.map(i => ({ id: i.id, type: i.type, priority: i.priority, title: i.title, body: i.description, client: i.clientName, action: i.action, read: false, date: '2024-06-26' })),
  { id: 'a1', type: 'SYSTEM', priority: 'LOW', title: 'Sistema atualizado', body: 'RA Hub v1.0 — todos os módulos foram atualizados com sucesso.', client: null, action: null, read: true, date: '2024-06-25' },
  { id: 'a2', type: 'FINANCIAL', priority: 'MEDIUM', title: 'Fatura gerada — Imobiliária Horizonte', body: 'Mensalidade de julho (R$3.200) foi gerada e enviada por e-mail.', client: 'Imobiliária Horizonte', action: 'Ver financeiro', read: false, date: '2024-06-24' },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  OPPORTUNITY: <TrendingUp size={15} className="text-green-600"/>,
  ALERT:       <AlertCircle size={15} className="text-red-500"/>,
  QUICK_WIN:   <Zap size={15} className="text-blue-500"/>,
  SYSTEM:      <Bell size={15} className="text-slate-500"/>,
  FINANCIAL:   <span className="text-green-600 text-sm">$</span>,
};
const PRIORITY_COLORS: Record<string, string> = {
  HIGH: 'bg-red-100 text-red-700', MEDIUM: 'bg-yellow-100 text-yellow-700', LOW: 'bg-slate-100 text-slate-500',
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(ALL_ALERTS);

  function markRead(id: string) {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  }
  function markAllRead() {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  }
  function remove(id: string) {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }

  const unread = alerts.filter(a => !a.read).length;

  return (
    <div className="p-6 space-y-5 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Alertas & Notificações
            {unread > 0 && <span className="badge bg-red-100 text-red-700">{unread} novos</span>}
          </h1>
          <p className="text-sm text-slate-500">{alerts.length} notificações</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="btn-secondary text-xs">
            <CheckCircle size={13}/> Marcar todas como lidas
          </button>
        )}
      </div>

      <div className="space-y-3">
        {alerts.map(alert => (
          <div key={alert.id} className={`card p-4 transition-all ${!alert.read ? 'border-l-4 border-blue-500 bg-blue-50/20' : 'opacity-70'}`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${!alert.read ? 'bg-white shadow' : 'bg-slate-100'}`}>
                {TYPE_ICONS[alert.type] || <Bell size={15}/>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-slate-800">{alert.title}</p>
                  <span className={`badge text-xs ${PRIORITY_COLORS[alert.priority]}`}>{alert.priority}</span>
                  {!alert.read && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"/>}
                </div>
                {alert.client && <p className="text-xs text-blue-600 font-medium">{alert.client}</p>}
                <p className="text-sm text-slate-600 mt-0.5">{alert.body}</p>
                {alert.action && <p className="text-xs text-blue-600 mt-1 font-medium">→ {alert.action}</p>}
                <p className="text-xs text-slate-400 mt-1">{new Date(alert.date).toLocaleDateString('pt-BR')}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {!alert.read && (
                  <button onClick={() => markRead(alert.id)} className="p-1 text-slate-400 hover:text-blue-500 rounded">
                    <CheckCircle size={14}/>
                  </button>
                )}
                <button onClick={() => remove(alert.id)} className="p-1 text-slate-400 hover:text-red-500 rounded">
                  <Trash2 size={14}/>
                </button>
              </div>
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="card p-12 text-center">
            <Bell size={32} className="text-slate-200 mx-auto mb-3"/>
            <p className="text-slate-400">Nenhuma notificação</p>
          </div>
        )}
      </div>
    </div>
  );
}
