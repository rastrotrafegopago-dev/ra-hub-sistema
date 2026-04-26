'use client';
import { useState } from 'react';
import { SITES_PROJECTS, fmt, STATUS_COLORS, STATUS_LABELS } from '@/lib/data';
import { Globe, Plus, CheckCircle, Clock, DollarSign, Calendar } from 'lucide-react';

export default function SitesPage() {
  const [selected, setSelected] = useState(SITES_PROJECTS[0]);
  const [showModal, setShowModal] = useState(false);

  const totalRevenue = SITES_PROJECTS.reduce((s,p) => s + p.budget, 0);
  const totalReceived = SITES_PROJECTS.reduce((s,p) => s + p.paid, 0);
  const inProgress = SITES_PROJECTS.filter(p => p.status === 'IN_PROGRESS').length;

  return (
    <div className="p-6 space-y-5 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Criação de Sites</h1>
          <p className="text-sm text-slate-500">{SITES_PROJECTS.length} projetos · {inProgress} em andamento</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary"><Plus size={15}/> Novo Projeto</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Projetos Totais', value: SITES_PROJECTS.length.toString(), color: 'text-slate-700' },
          { label: 'Em Andamento', value: inProgress.toString(), color: 'text-blue-600' },
          { label: 'Receita Total', value: fmt.currency(totalRevenue), color: 'text-green-600' },
          { label: 'Recebido', value: fmt.currency(totalReceived), color: 'text-purple-600' },
        ].map(s => (
          <div key={s.label} className="card p-4">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project cards */}
        <div className="space-y-3">
          {SITES_PROJECTS.map(project => (
            <div key={project.id} onClick={() => setSelected(project)}
              className={`card p-4 cursor-pointer transition-all ${selected?.id===project.id?'ring-2 ring-blue-500 shadow-md':'hover:shadow-md'}`}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe size={18}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-slate-800 truncate">{project.clientName}</p>
                    <span className={`badge text-xs ${STATUS_COLORS[project.status]}`}>{STATUS_LABELS[project.status]}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{project.name}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Progresso</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full">
                      <div
                        className={`h-full rounded-full transition-all ${project.progress===100?'bg-green-500':project.progress>=50?'bg-blue-500':'bg-yellow-500'}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs mt-2">
                    <span className="text-slate-400 flex items-center gap-1"><Calendar size={10}/>{new Date(project.deadline).toLocaleDateString('pt-BR')}</span>
                    <span className="text-slate-500 font-medium">{fmt.currency(project.budget)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail */}
        {selected && (
          <div className="lg:col-span-2 space-y-4">
            <div className="card p-5">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-base font-bold text-slate-800">{selected.name}</h2>
                  <p className="text-sm text-slate-500">{selected.clientName} · {selected.tech}</p>
                </div>
                <span className={`badge ${STATUS_COLORS[selected.status]}`}>{STATUS_LABELS[selected.status]}</span>
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                  <span>Progresso Geral</span>
                  <span className="font-bold">{selected.progress}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full">
                  <div
                    className={`h-full rounded-full ${selected.progress===100?'bg-green-500':selected.progress>=50?'bg-blue-500':'bg-yellow-500'}`}
                    style={{ width: `${selected.progress}%` }}
                  />
                </div>
              </div>

              {/* Financial */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-slate-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-slate-400">Orçamento</p>
                  <p className="text-sm font-bold text-slate-700">{fmt.currency(selected.budget)}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-slate-400">Recebido</p>
                  <p className="text-sm font-bold text-green-600">{fmt.currency(selected.paid)}</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-slate-400">A receber</p>
                  <p className="text-sm font-bold text-orange-600">{fmt.currency(selected.budget - selected.paid)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                <div><span className="text-slate-400">Início: </span><span className="text-slate-600">{new Date(selected.startDate).toLocaleDateString('pt-BR')}</span></div>
                <div><span className="text-slate-400">Prazo: </span><span className="text-slate-600">{new Date(selected.deadline).toLocaleDateString('pt-BR')}</span></div>
              </div>
            </div>

            {/* Stages */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Etapas do Projeto</h3>
              <div className="space-y-2">
                {selected.stages.map((stage, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${stage.done ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${stage.done ? 'bg-green-500' : 'bg-slate-300'}`}>
                      {stage.done ? <CheckCircle size={14} className="text-white"/> : <span className="text-white text-xs">{i+1}</span>}
                    </div>
                    <span className={`text-sm font-medium ${stage.done ? 'text-green-700' : 'text-slate-500'}`}>{stage.name}</span>
                    {stage.done && <span className="ml-auto text-xs text-green-500">Concluído</span>}
                    {!stage.done && i === selected.stages.findIndex(s => !s.done) && (
                      <span className="ml-auto text-xs text-blue-500 font-medium">Em andamento</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Observações</h3>
              <p className="text-sm text-slate-600">{selected.notes}</p>
            </div>
          </div>
        )}
      </div>

      {/* New Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-semibold text-slate-800">Novo Projeto de Site</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="label">Nome do projeto</label><input className="input" placeholder="Ex: Site Institucional + LP"/></div>
              <div><label className="label">Cliente</label><select className="input">{SITES_PROJECTS.map(p=><option key={p.clientId}>{p.clientName}</option>)}</select></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Tipo</label>
                  <select className="input">{['Institucional','Landing Page','E-commerce','Blog','Portal'].map(t=><option key={t}>{t}</option>)}</select>
                </div>
                <div><label className="label">Tecnologia</label>
                  <select className="input">{['WordPress + Elementor','Next.js','Wix','Squarespace','Outro'].map(t=><option key={t}>{t}</option>)}</select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Orçamento (R$)</label><input className="input" type="number"/></div>
                <div><label className="label">Prazo</label><input className="input" type="date"/></div>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={() => setShowModal(false)}>Criar Projeto</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
