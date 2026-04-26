'use client';
import { useState } from 'react';
import { CRM_LEADS, CRM_STAGES, fmt } from '@/lib/data';
import { Plus, Phone, Mail, Calendar, Tag, GripVertical } from 'lucide-react';

type Lead = typeof CRM_LEADS[0];

export default function CRMPage() {
  const [leads, setLeads] = useState(CRM_LEADS);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', company: '', phone: '', email: '', value: '', source: 'Instagram', stage: 'NOVO' });

  const totalPipeline = leads.filter(l => !['FECHADO_WON','FECHADO_LOST'].includes(l.stage)).reduce((s,l) => s + l.value, 0);
  const wonValue = leads.filter(l => l.stage === 'FECHADO_WON').reduce((s,l) => s + l.value, 0);
  const conversionRate = Math.round((leads.filter(l=>l.stage==='FECHADO_WON').length / leads.length) * 100);

  function moveLead(leadId: string, newStage: string) {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage } : l));
  }

  function addLead() {
    if (!newLead.name) return;
    const lead: Lead = {
      id: String(Date.now()), name: newLead.name, company: newLead.company,
      phone: newLead.phone, email: newLead.email, stage: newLead.stage,
      value: parseFloat(newLead.value) || 0, source: newLead.source,
      assignee: 'Carlos', tags: [], lastContact: new Date().toISOString().slice(0,10), notes: '',
    };
    setLeads(prev => [...prev, lead]);
    setShowNew(false);
    setNewLead({ name: '', company: '', phone: '', email: '', value: '', source: 'Instagram', stage: 'NOVO' });
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-slate-200 bg-white flex-shrink-0">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900">CRM de Leads</h1>
            <p className="text-sm text-slate-500">{leads.length} leads · Pipeline: {fmt.currency(totalPipeline)}</p>
          </div>
          <button onClick={() => setShowNew(true)} className="btn-primary"><Plus size={15}/> Novo Lead</button>
        </div>

        {/* Summary */}
        <div className="flex gap-4 mt-4 overflow-x-auto pb-1">
          {[
            { label: 'Total Pipeline', value: fmt.currency(totalPipeline), color: 'text-blue-600' },
            { label: 'Ganhos', value: fmt.currency(wonValue), color: 'text-green-600' },
            { label: 'Taxa Conversão', value: `${conversionRate}%`, color: 'text-purple-600' },
            { label: 'Em Negociação', value: leads.filter(l=>l.stage==='NEGOCIACAO').length.toString(), color: 'text-orange-600' },
          ].map(s => (
            <div key={s.label} className="bg-slate-50 rounded-lg px-4 py-2 flex-shrink-0">
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Kanban */}
      <div className="flex-1 overflow-x-auto p-4">
        <div className="flex gap-4 h-full min-h-[500px]" style={{ minWidth: `${CRM_STAGES.length * 230}px` }}>
          {CRM_STAGES.map(stage => {
            const stageLeads = leads.filter(l => l.stage === stage.id);
            const stageValue = stageLeads.reduce((s,l) => s+l.value, 0);
            return (
              <div key={stage.id}
                className="flex-1 min-w-[210px] max-w-[260px] flex flex-col"
                onDragOver={e => e.preventDefault()}
                onDrop={() => { if (dragging) { moveLead(dragging, stage.id); setDragging(null); } }}>
                {/* Column header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${stage.dot}`}/>
                    <span className="text-xs font-semibold text-slate-600">{stage.label}</span>
                    <span className="text-xs bg-slate-200 text-slate-600 rounded-full px-1.5">{stageLeads.length}</span>
                  </div>
                  {stageValue > 0 && <span className="text-xs text-slate-400">{fmt.currency(stageValue)}</span>}
                </div>

                {/* Cards */}
                <div className="flex-1 space-y-2 overflow-y-auto">
                  {stageLeads.map(lead => (
                    <div key={lead.id}
                      draggable
                      onDragStart={() => setDragging(lead.id)}
                      onDragEnd={() => setDragging(null)}
                      onClick={() => setSelected(lead)}
                      className={`bg-white border border-slate-200 rounded-xl p-3 cursor-pointer hover:shadow-md transition-all select-none ${dragging===lead.id?'opacity-50 rotate-2':''} ${selected?.id===lead.id?'ring-2 ring-blue-500':''}`}>
                      <div className="flex items-start gap-2">
                        <GripVertical size={12} className="text-slate-300 mt-0.5 flex-shrink-0"/>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">{lead.name}</p>
                          <p className="text-xs text-slate-500 truncate">{lead.company}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-bold text-blue-600">{fmt.currency(lead.value)}</span>
                            <span className="text-xs text-slate-400">{lead.assignee}</span>
                          </div>
                          {lead.tags.length > 0 && (
                            <div className="flex gap-1 mt-1.5 flex-wrap">
                              {lead.tags.map(t => <span key={t} className="badge bg-slate-100 text-slate-500 text-xs">{t}</span>)}
                            </div>
                          )}
                          <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                            <Calendar size={10}/>
                            {new Date(lead.lastContact).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {stageLeads.length === 0 && (
                    <div className="border-2 border-dashed border-slate-200 rounded-xl h-20 flex items-center justify-center text-xs text-slate-300">
                      Soltar aqui
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lead Detail Panel */}
      {selected && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white border-l border-slate-200 shadow-xl z-40 overflow-y-auto">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Detalhes do Lead</h3>
            <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600">✕</button>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <h4 className="text-base font-bold text-slate-800">{selected.name}</h4>
              <p className="text-sm text-slate-500">{selected.company}</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-600"><Mail size={13}/>{selected.email}</div>
              <div className="flex items-center gap-2 text-slate-600"><Phone size={13}/>{selected.phone}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-400">Valor</p>
                <p className="text-sm font-bold text-blue-600">{fmt.currency(selected.value)}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-400">Origem</p>
                <p className="text-sm font-medium text-slate-700">{selected.source}</p>
              </div>
            </div>
            <div>
              <label className="label">Mover para etapa</label>
              <select className="input" value={selected.stage}
                onChange={e => { moveLead(selected.id, e.target.value); setSelected(prev => prev ? {...prev, stage: e.target.value} : null); }}>
                {CRM_STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            {selected.notes && (
              <div>
                <p className="label">Observações</p>
                <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">{selected.notes}</p>
              </div>
            )}
            <div className="pt-2 space-y-2">
              <button className="w-full btn-primary justify-center"><Phone size={13}/> Ligar</button>
              <button className="w-full btn-secondary justify-center"><Mail size={13}/> Enviar e-mail</button>
            </div>
          </div>
        </div>
      )}

      {/* New Lead Modal */}
      {showNew && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-semibold text-slate-800">Novo Lead</h3>
              <button onClick={() => setShowNew(false)} className="text-slate-400">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="label">Nome *</label><input className="input" value={newLead.name} onChange={e=>setNewLead(p=>({...p,name:e.target.value}))} placeholder="Nome do contato"/></div>
              <div><label className="label">Empresa</label><input className="input" value={newLead.company} onChange={e=>setNewLead(p=>({...p,company:e.target.value}))} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">E-mail</label><input className="input" value={newLead.email} onChange={e=>setNewLead(p=>({...p,email:e.target.value}))} /></div>
                <div><label className="label">Telefone</label><input className="input" value={newLead.phone} onChange={e=>setNewLead(p=>({...p,phone:e.target.value}))} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Valor (R$)</label><input className="input" type="number" value={newLead.value} onChange={e=>setNewLead(p=>({...p,value:e.target.value}))} /></div>
                <div><label className="label">Origem</label>
                  <select className="input" value={newLead.source} onChange={e=>setNewLead(p=>({...p,source:e.target.value}))}>
                    {['Instagram','Facebook','Google','WhatsApp','Indicação','Cold Call','Outros'].map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div><label className="label">Etapa</label>
                <select className="input" value={newLead.stage} onChange={e=>setNewLead(p=>({...p,stage:e.target.value}))}>
                  {CRM_STAGES.filter(s=>!s.id.startsWith('FECHADO')).map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t">
              <button className="btn-secondary" onClick={() => setShowNew(false)}>Cancelar</button>
              <button className="btn-primary" onClick={addLead}>Salvar Lead</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
