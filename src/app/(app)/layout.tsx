'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getUser, logout, verifySession } from '@/lib/auth';
import { LayoutDashboard, Users, Target, BarChart3, DollarSign, MapPin, Share2, Globe, Bell, Settings, Menu, X, ChevronDown, LogOut, User } from 'lucide-react';
const NAV = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/clients', icon: Users, label: 'Clientes' },
  { href: '/traffic', icon: Target, label: 'Tráfego Pago' },
  { href: '/crm', icon: BarChart3, label: 'CRM' },
  { href: '/financial', icon: DollarSign, label: 'Financeiro' },
  { href: '/gmb', icon: MapPin, label: 'Google Meu Negócio' },
  { href: '/social', icon: Share2, label: 'Social Media' },
  { href: '/sites', icon: Globe, label: 'Sites' },
  { href: '/alerts', icon: Bell, label: 'Alertas' },
  { href: '/settings', icon: Settings, label: 'Configurações' },
];
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [checking, setChecking] = useState(true);
  const user = getUser();
  useEffect(() => {
    async function checkAuth() {
      const valid = await verifySession();
      if (!valid) { router.replace('/'); } else { setChecking(false); }
    }
    if (!user) { router.replace('/'); } else { checkAuth(); }
  }, []);
  async function handleLogout() { await logout(); router.push('/'); }
  if (checking) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center"><div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3"><span className="text-white font-bold text-lg">R</span></div><p className="text-slate-400 text-sm">Carregando...</p></div>
    </div>
  );
  if (!user) return null;
  const currentNav = NAV.find(n => pathname.startsWith(n.href));
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)}/>}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-60 bg-slate-900 flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0"><span className="text-white font-bold text-sm">R</span></div>
          <span className="text-white font-bold">RA Hub</span>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto text-slate-400 lg:hidden"><X size={18}/></button>
        </div>
        <nav className="flex-1 py-4 space-y-0.5 px-3 overflow-y-auto">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname.startsWith(href);
            return (<Link key={href} href={href} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}><Icon size={17}/>{label}</Link>);
          })}
        </nav>
        <div className="p-3 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-800">
            <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{user.avatar}</div>
            <div className="flex-1 min-w-0"><p className="text-white text-xs font-medium truncate">{user.name}</p><p className="text-slate-500 text-xs truncate">{user.email}</p></div>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 text-slate-500"><Menu size={20}/></button>
          <div className="flex-1"><h2 className="text-sm font-semibold text-slate-700">{currentNav?.label || 'RA Hub'}</h2></div>
          <div className="flex items-center gap-2">
            <Link href="/alerts" className="p-1.5 text-slate-500 relative"><Bell size={18}/><span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"/></Link>
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100">
                <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">{user.avatar}</div>
                <span className="text-sm font-medium text-slate-700 hidden sm:block">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className="text-slate-400"/>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-slate-100"><p className="text-sm font-medium text-slate-700">{user.name}</p><p className="text-xs text-slate-400">{user.email}</p></div>
                  <Link href="/settings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"><User size={14}/> Meu Perfil</Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"><LogOut size={14}/> Sair</button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
