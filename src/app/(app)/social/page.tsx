'use client';
import { useState } from 'react';
import { SOCIAL_POSTS, CLIENTS, fmt, STATUS_COLORS, STATUS_LABELS } from '@/lib/data';
import { Instagram, Facebook, Plus, Heart, MessageCircle, Share2, Eye, Calendar } from 'lucide-react';

const PLATFORM_ICON: Record<string, React.ReactNode> = {
  INSTAGRAM: <span className="text-pink-500">📸</span>,
  FACEBOOK:  <span className="text-blue-600">📘</span>,
};
const PLATFORM_COLORS: Record<string, string> = {
  INSTAGRAM: 'bg-pink-100 text-pink-700',
  FACEBOOK:  'bg-blue-100 text-blue-700',
};
const TYPE_COLORS: Record<string, string> = {
  FEED:  'bg-purple-100 text-purple-700',
  STORY: 'bg-orange-100 text-orange-700',
  REEL:  'bg-red-100 text-red-700',
  POST:  'bg-blue-100 text-blue-700',
};

export default function SocialPage() {
  const [clientFilter, setClientFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [showModal, setShowModal] = useState(false);

  const filtered = SOCIAL_POSTS.filter(p => {
    const mc = clientFilter === 'ALL' || p.clientId === clientFilter;
    const ms = statusFilter === 'ALL' || p.status === statusFilter;
    return mc && ms;
  });

  const published = SOCIAL_POSTS.filter(p => p.status === 'PUBLISHED');
  const totalReach = published.reduce((s,p) => s + p.reach, 0);
  const totalLikes = published.reduce((s,p) => s + p.likes, 0);

  // Calendar view: group by date
  const byDate = filtered.reduce<Record<string, typeof SOCIAL_POSTS>>((acc, p) => {
    const d = p.date;
    if (!acc[d]) acc[d] = [];
    acc[d].push(p);
    return acc;
  }, {});

  return (
    <div className="p-6 space-y-5 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Social Media</h1>
          <p className="text-sm text-slate-500">{SOCIAL_POSTS.length} posts gerenciados</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary"><Plus size={15}/> Agendar Post</button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Publicados',  value: published.length.toString(),    icon: '✓', color: 'text-green-600' },
          { label: 'Agendados',   value: SOCIAL_POSTS.filter(p=>p.status==='SCHEDULED').length.toString(), icon: '📅', color: 'text-blue-600' },
          { label: 'Alcance Total', value: fmt.number(totalReach),       icon: '👁', color: 'text-purple-600' },
          { label: 'Curtidas',    value: fmt.number(totalLikes),          icon: '❤️', color: 'text-pink-600' },
        ].map(s => (
          <div key={s.label} className="card p-4">
            <p className="text-xs text-slate-500 mb-1">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters + view toggle */}
      <div className="flex gap-3 flex-wrap items-center">
        <select className="input w-auto text-xs" value={clientFilter} onChange={e => setClientFilter(e.target.value)}>
          <option value="ALL">Todos os clientes</option>
          {CLIENTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select className="input w-auto text-xs" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="ALL">Todos os status</option>
          <option value="PUBLISHED">Publicados</option>
          <option value="SCHEDULED">Agendados</option>
          <option value="DRAFT">Rascunhos</option>
        </select>
        <div className="ml-auto flex gap-1 bg-slate-100 rounded-lg p-1">
          {[['list','☰ Lista'],['calendar','📅 Calendário']].map(([v,l]) => (
            <button key={v} onClick={() => setView(v as any)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${view===v?'bg-white shadow text-slate-800':'text-slate-500'}`}>{l}</button>
          ))}
        </div>
      </div>

      {/* List View */}
      {view === 'list' && (
        <div className="space-y-3">
          {filtered.map(post => (
            <div key={post.id} className="card p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                {/* Platform icon */}
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {PLATFORM_ICON[post.platform]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-sm font-semibold text-slate-700">{post.clientName}</p>
                    <span className={`badge text-xs ${PLATFORM_COLORS[post.platform]}`}>{post.platform}</span>
                    <span className={`badge text-xs ${TYPE_COLORS[post.type]}`}>{post.type}</span>
                    <span className={`badge text-xs ${STATUS_COLORS[post.status]}`}>{STATUS_LABELS[post.status]}</span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">{post.caption}</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Calendar size={10}/>
                    {new Date(post.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                {post.status === 'PUBLISHED' && (
                  <div className="flex gap-4 flex-shrink-0 text-xs">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-pink-500"><Heart size={12}/>{fmt.number(post.likes)}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-blue-500"><MessageCircle size={12}/>{fmt.number(post.comments)}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-green-500"><Share2 size={12}/>{fmt.number(post.shares)}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-purple-500"><Eye size={12}/>{fmt.number(post.reach)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className="card overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700">Calendário Editorial — Junho 2024</h3>
          </div>
          <div className="p-5 space-y-4">
            {Object.entries(byDate).sort((a,b) => b[0].localeCompare(a[0])).map(([date, posts]) => (
              <div key={date}>
                <p className="text-xs font-semibold text-slate-500 mb-2 uppercase">
                  {new Date(date).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {posts.map(p => (
                    <div key={p.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs ${STATUS_COLORS[p.status]}`}>
                      <span>{PLATFORM_ICON[p.platform]}</span>
                      <span className="font-medium">{p.clientName.split(' ')[0]}</span>
                      <span className="text-slate-400">{p.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-semibold text-slate-800">Agendar Post</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Cliente</label>
                  <select className="input">{CLIENTS.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
                </div>
                <div><label className="label">Plataforma</label>
                  <select className="input">{['INSTAGRAM','FACEBOOK','LINKEDIN','TIKTOK'].map(p=><option key={p}>{p}</option>)}</select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Tipo</label>
                  <select className="input">{['FEED','STORY','REEL','POST'].map(t=><option key={t}>{t}</option>)}</select>
                </div>
                <div><label className="label">Data</label><input className="input" type="date"/></div>
              </div>
              <div><label className="label">Legenda (caption)</label>
                <textarea className="input min-h-[100px]" placeholder="Escreva a legenda do post..."/>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-xs text-yellow-700">
                💡 Em modo demo, posts não são persistidos. Conecte a API para usar o calendário completo.
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={() => setShowModal(false)}>Agendar Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
