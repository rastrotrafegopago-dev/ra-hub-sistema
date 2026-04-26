'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, getUser } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@radigital.com.br');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getUser()) router.replace('/dashboard');
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const user = login(email, password);
      if (user) {
        router.push('/dashboard');
      } else {
        setError('E-mail ou senha inválidos.');
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Left — branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-14 text-white">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center font-bold text-lg">R</div>
            <span className="text-xl font-bold">RA Hub</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Sistema completo de gestão<br/>
            <span className="text-blue-400">para sua agência.</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Tráfego pago, CRM, financeiro, GMB, social media e criação de sites — tudo em um lugar.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Clientes ativos', value: '5' },
            { label: 'MRR atual', value: 'R$10.350' },
            { label: 'ROAS médio', value: '4.2x' },
          ].map(s => (
            <div key={s.label} className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-300">{s.value}</div>
              <div className="text-sm text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-8 lg:hidden">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white">R</div>
              <span className="text-lg font-bold text-slate-900">RA Hub</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Bem-vinda, Karla</h2>
            <p className="text-slate-500 text-sm mb-7">Faça login para acessar o painel.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label">E-mail</label>
                <input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
              </div>
              <div>
                <label className="label">Senha</label>
                <input type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors">
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <p className="text-xs text-slate-400 font-medium mb-2">Usuários de demonstração:</p>
              <div className="space-y-1.5">
                {[
                  { email: 'admin@radigital.com.br',    role: 'Admin',   color: 'bg-blue-100 text-blue-700'  },
                  { email: 'carlos@radigital.com.br',   role: 'Tráfego', color: 'bg-green-100 text-green-700'},
                  { email: 'fernanda@radigital.com.br', role: 'Social',  color: 'bg-purple-100 text-purple-700'},
                ].map(u => (
                  <button key={u.email} type="button"
                    onClick={() => { setEmail(u.email); setPassword('123456'); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-left">
                    <span className={`badge ${u.color} text-xs`}>{u.role}</span>
                    <span className="text-xs text-slate-500">{u.email}</span>
                    <span className="text-xs text-slate-400 ml-auto">senha: 123456</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center text-slate-500 text-xs mt-4">RA Digital © 2024 — Sistema Interno v1.0</p>
        </div>
      </div>
    </div>
  );
}
