'use client';
import { useState } from 'react';
import { USERS, CLIENTS } from '@/lib/data';
import { DEMO_USERS, getUser, ROLE_LABELS } from '@/lib/auth';
import { User, Shield, Settings, Bell, Link2, Plus, CheckCircle, XCircle } from 'lucide-react';

export default function SettingsPage() {
  const [tab, setTab] = useState<'profile' | 'users' | 'integrations' | 'notifications'>('profile');
  const currentUser = getUser();

  const INTEGRATIONS = [
    { name: 'Meta Ads API', key: 'META_APP_ID', status: CLIENTS.some(c=>c.metaConnected), desc: 'Campanhas Facebook & Instagram', icon: '📘', setupUrl: 'https://developers.facebook.com/apps' },
    { name: 'Google Ads API', key: 'GOOGLE_CLIENT_ID', status: CLIENTS.some(c=>c.googleConnected), desc: 'Search, Display & YouTube', icon: '🔍', setupUrl: 'https://console.cloud.google.com' },
    { name: 'Asaas', key: 'ASAAS_API_KEY', status: false, desc: 'Cobranças e pagamentos', icon: '💳', setupUrl: 'https://www.asaas.com' },
    { name: 'Resend (E-mail)', key: 'RESEND_API_KEY', status: false, desc: 'E-mails transacionais', icon: '📧', setupUrl: 'https://resend.com' },
    { name: 'OpenAI', key: 'OPENAI_API_KEY', status: false, desc: 'Geração de insights com IA', icon: '🤖', setupUrl: 'https://platform.openai.com' },
    { name: 'Cloudflare R2', key: 'S3_BUCKET', status: false, desc: 'Armazenamento de arquivos', icon: '☁️', setupUrl: 'https://dash.cloudflare.com' },
  ];

  return (
    <div className="p-6 space-y-5 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Configurações</h1>
        <p className="text-sm text-slate-500">Gerencie usuários, integrações e preferências</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit flex-wrap">
        {[
          ['profile', '👤 Meu Perfil'],
          ['users', '👥 Usuários'],
          ['integrations', '🔗 Integrações'],
          ['notifications', '🔔 Notificações'],
        ].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k as any)}
            className={`px-4 py-2 rounded-md text-xs font-medium transition-colors ${tab===k?'bg-white shadow text-slate-800':'text-slate-500'}`}>{l}</button>
        ))}
      </div>

      {/* Profile Tab */}
      {tab === 'profile' && (
        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold">
                {currentUser?.avatar}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">{currentUser?.name}</h2>
                <p className="text-sm text-slate-500">{currentUser?.email}</p>
                <span className="badge bg-blue-100 text-blue-700 mt-1">{ROLE_LABELS[currentUser?.role || '']}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Nome</label><input className="input" defaultValue={currentUser?.name}/></div>
              <div><label className="label">E-mail</label><input className="input" defaultValue={currentUser?.email}/></div>
              <div><label className="label">Nova Senha</label><input className="input" type="password" placeholder="Deixe em branco para manter"/></div>
              <div><label className="label">Confirmar Senha</label><input className="input" type="password"/></div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn-primary">Salvar Alterações</button>
            </div>
          </div>

          <div className="card p-6 bg-yellow-50 border-yellow-200">
            <h3 className="text-sm font-semibold text-yellow-800 mb-2">💡 Modo Demonstração</h3>
            <p className="text-sm text-yellow-700">Este sistema está rodando com dados mockados. Para usar dados reais, conecte o backend (NestJS + PostgreSQL) configurando o arquivo .env com as credenciais de produção.</p>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {tab === 'users' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button className="btn-primary"><Plus size={15}/> Novo Usuário</button>
          </div>
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Usuário','Cargo','Status','Ações'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {USERS.map(u => (
                  <tr key={u.id} className={`hover:bg-slate-50 ${currentUser?.id === u.id ? 'bg-blue-50/30' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">{u.avatar}</div>
                        <div>
                          <p className="text-sm font-medium text-slate-700">{u.name}</p>
                          <p className="text-xs text-slate-400">{u.email}</p>
                        </div>
                        {currentUser?.id === u.id && <span className="badge bg-blue-100 text-blue-600 text-xs">você</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="badge bg-slate-100 text-slate-600">{ROLE_LABELS[u.role]}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge ${u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {u.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-xs text-blue-600 hover:underline">Editar</button>
                        {currentUser?.id !== u.id && <button className="text-xs text-red-500 hover:underline">Remover</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card p-4 bg-slate-50">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Permissões por Cargo</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left text-slate-500 font-medium pb-2">Módulo</th>
                    {['Admin','Tráfego','Social'].map(r => <th key={r} className="text-center text-slate-500 font-medium pb-2 px-3">{r}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { m: 'Dashboard', admin: true, traffic: true, social: true },
                    { m: 'Clientes', admin: true, traffic: false, social: false },
                    { m: 'Tráfego Pago', admin: true, traffic: true, social: false },
                    { m: 'CRM', admin: true, traffic: true, social: false },
                    { m: 'Financeiro', admin: true, traffic: false, social: false },
                    { m: 'GMB', admin: true, traffic: false, social: true },
                    { m: 'Social Media', admin: true, traffic: false, social: true },
                    { m: 'Sites', admin: true, traffic: false, social: false },
                    { m: 'Configurações', admin: true, traffic: false, social: false },
                  ].map(r => (
                    <tr key={r.m}>
                      <td className="py-2 text-slate-600">{r.m}</td>
                      {[r.admin, r.traffic, r.social].map((has, i) => (
                        <td key={i} className="text-center py-2">
                          {has ? <CheckCircle size={14} className="text-green-500 mx-auto"/> : <XCircle size={14} className="text-slate-200 mx-auto"/>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {tab === 'integrations' && (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Configure as integrações com APIs externas. As credenciais são salvas nas variáveis de ambiente do servidor.</p>
          {INTEGRATIONS.map(intg => (
            <div key={intg.key} className={`card p-5 border-l-4 ${intg.status ? 'border-green-400' : 'border-slate-200'}`}>
              <div className="flex items-center gap-4">
                <span className="text-2xl">{intg.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-700">{intg.name}</p>
                    <span className={`badge text-xs ${intg.status ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {intg.status ? '✓ Conectado' : 'Não conectado'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{intg.desc}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <a href={intg.setupUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-1 px-3">
                    Criar credencial
                  </a>
                  <button className={`btn-primary text-xs py-1 px-3 ${intg.status ? 'bg-green-600' : ''}`}>
                    {intg.status ? 'Reconectar' : 'Configurar'}
                  </button>
                </div>
              </div>
              {!intg.status && (
                <div className="mt-3">
                  <input className="input text-xs" placeholder={`Cole sua ${intg.key} aqui`}/>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Notifications Tab */}
      {tab === 'notifications' && (
        <div className="card p-6 space-y-5">
          <h3 className="text-sm font-semibold text-slate-700">Preferências de Notificação</h3>
          {[
            { label: 'CPL sobe mais de 20%', sub: 'Alerta quando o custo por lead aumenta', on: true },
            { label: 'Novo lead no CRM', sub: 'Notificar quando um lead for cadastrado', on: true },
            { label: 'Pagamento em atraso', sub: 'Clientes com mensalidade vencida', on: true },
            { label: 'Campanha pausada', sub: 'Meta ou Google pausam campanhas automaticamente', on: false },
            { label: 'Nova avaliação no GMB', sub: 'Avaliações sem resposta há mais de 24h', on: true },
            { label: 'Relatório semanal', sub: 'Resumo de performance toda segunda-feira', on: false },
          ].map(n => (
            <div key={n.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-700">{n.label}</p>
                <p className="text-xs text-slate-400">{n.sub}</p>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${n.on ? 'bg-blue-500' : 'bg-slate-200'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform m-0.5 ${n.on ? 'translate-x-5' : 'translate-x-0'}`}/>
              </div>
            </div>
          ))}
          <button className="btn-primary">Salvar Preferências</button>
        </div>
      )}
    </div>
  );
}
