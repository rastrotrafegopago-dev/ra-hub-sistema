'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, getUser } from '@/lib/auth';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { if (getUser()) router.replace('/dashboard'); }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(email.trim(), password);
      if (user) { router.push('/dashboard'); } else { setError('E-mail ou senha incorretos.'); }
    } catch { setError('Erro de conexao. Tente novamente.'); } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 to-blue-950">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span className="text-white font-bold text-xl">RA Hub</span>
        </div>
        <h1 className="text-4xl font-bold text-white leading-tight mb-4">
          Sistema completo de gestao<br/>
          <span className="text-blue-400">para sua agencia.</span>
        </h1>
        <p className="text-slate-400 text-lg">Trafego pago, CRM, financeiro, GMB, social media.</p>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800">Bem-vindo ao RA Hub</h2>
              <p className="text-slate-500 text-sm mt-1">Faca login para acessar o painel.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="label">E-mail</label>
                <input className="input" type="email" placeholder="seu@email.com.br" value={email} onChange={e => setEmail(e.target.value)} required autoFocus/>
              </div>
              <div>
                <label className="label">Senha</label>
                <div className="relative">
                  <input className="input pr-10" type={showPassword ? 'text' : 'password'} placeholder="sua senha" value={password} onChange={e => setPassword(e.target.value)} required/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                  </button>
                </div>
              </div>
              {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">{error}</div>}
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-2.5">
                {loading ? <><Loader2 size={16} className="animate-spin"/> Entrando...</> : 'Entrar'}
              </button>
            </form>
            <p className="text-center text-xs text-slate-400 mt-6">RA Digital 2025 - Sistema Interno</p>
          </div>
        </div>
      </div>
    </div>
  );
}
