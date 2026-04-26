'use client';
import { useState } from 'react';
import { GMB_PROFILES, fmt } from '@/lib/data';
import { Star, MapPin, Eye, Search, Phone, MessageSquare, CheckCircle, Plus } from 'lucide-react';

export default function GMBPage() {
  const [selected, setSelected] = useState(GMB_PROFILES[0]);

  function stars(n: number) {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={12} className={i < Math.floor(n) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'} />
    ));
  }

  return (
    <div className="p-6 space-y-5 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Google Meu Negócio</h1>
          <p className="text-sm text-slate-500">{GMB_PROFILES.length} perfis gerenciados</p>
        </div>
        <button className="btn-primary"><Plus size={15}/> Adicionar Perfil</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Perfis Verificados', value: GMB_PROFILES.filter(p=>p.isVerified).length.toString() },
          { label: 'Avaliações Pendentes', value: GMB_PROFILES.reduce((s,p)=>s+p.pendingReviews,0).toString() },
          { label: 'Visualizações/mês', value: fmt.number(GMB_PROFILES.reduce((s,p)=>s+p.monthlyViews,0)) },
          { label: 'Ações/mês', value: fmt.number(GMB_PROFILES.reduce((s,p)=>s+p.monthlyActions,0)) },
        ].map(s => (
          <div key={s.label} className="card p-4">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className="text-xl font-bold text-slate-800">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile list */}
        <div className="space-y-3">
          {GMB_PROFILES.map(profile => (
            <div key={profile.id} onClick={() => setSelected(profile)}
              className={`card p-4 cursor-pointer transition-all ${selected?.id===profile.id?'ring-2 ring-blue-500 shadow-md':''} hover:shadow-md`}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={18}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-slate-800 truncate">{profile.name.split('—')[0]}</p>
                    {profile.isVerified && <CheckCircle size={13} className="text-blue-500 flex-shrink-0"/>}
                  </div>
                  <p className="text-xs text-slate-500">{profile.category}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    {stars(profile.rating)}
                    <span className="text-xs font-bold text-slate-700 ml-1">{profile.rating}</span>
                    <span className="text-xs text-slate-400">({profile.totalReviews})</span>
                  </div>
                  {profile.pendingReviews > 0 && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full w-fit">
                      <MessageSquare size={10}/> {profile.pendingReviews} avaliações sem resposta
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="card p-4 border-dashed border-2 border-slate-200 flex items-center gap-3 cursor-pointer hover:bg-slate-50">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <Plus size={16} className="text-slate-400"/>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Conectar novo perfil</p>
              <p className="text-xs text-slate-400">Google Meu Negócio API</p>
            </div>
          </div>
        </div>

        {/* Detail */}
        {selected && (
          <div className="lg:col-span-2 space-y-4">
            <div className="card p-5">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={24}/>
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-slate-800">{selected.name}</h2>
                  <p className="text-sm text-slate-500">{selected.category}</p>
                  <p className="text-xs text-slate-400 mt-1">{selected.address}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stars(selected.rating)}
                    <span className="text-sm font-bold text-slate-700 ml-1">{selected.rating}</span>
                    <span className="text-sm text-slate-400">({selected.totalReviews} avaliações)</span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: 'Visualizações', value: fmt.number(selected.monthlyViews), icon: Eye },
                  { label: 'Pesquisas', value: fmt.number(selected.monthlySearches), icon: Search },
                  { label: 'Ações', value: fmt.number(selected.monthlyActions), icon: Phone },
                ].map(m => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="bg-slate-50 rounded-xl p-3 text-center">
                      <Icon size={16} className="text-blue-500 mx-auto mb-1"/>
                      <p className="text-base font-bold text-slate-700">{m.value}</p>
                      <p className="text-xs text-slate-400">{m.label}/mês</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-700">Avaliações Recentes</h3>
                {selected.pendingReviews > 0 && (
                  <span className="badge bg-orange-100 text-orange-600">{selected.pendingReviews} sem resposta</span>
                )}
              </div>
              <div className="space-y-4">
                {selected.recentReviews.map((r, i) => (
                  <div key={i} className="border border-slate-100 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                            {r.author[0]}
                          </div>
                          <span className="text-sm font-medium text-slate-700">{r.author}</span>
                          <div className="flex">{stars(r.rating)}</div>
                        </div>
                        <p className="text-sm text-slate-600">"{r.text}"</p>
                        <p className="text-xs text-slate-400 mt-1">{new Date(r.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    {!r.replied && (
                      <div className="mt-3 flex gap-2">
                        <input className="input flex-1 text-xs" placeholder="Escreva uma resposta profissional..."/>
                        <button className="btn-primary text-xs py-1 px-3">Responder</button>
                      </div>
                    )}
                    {r.replied && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle size={11}/> Respondida
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Posts */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-slate-700">Publicações no Perfil</h3>
                <button className="btn-primary text-xs py-1 px-3"><Plus size={12}/> Nova publicação</button>
              </div>
              <p className="text-sm text-slate-500">Último post: {new Date(selected.lastPost).toLocaleDateString('pt-BR')}</p>
              <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-700">
                ⚡ Conecte a API do Google Meu Negócio para publicar posts e sincronizar avaliações automaticamente.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
