'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getUser, logout, ROLE_LABELS } from '@/lib/auth';
import {
  LayoutDashboard, Users, BarChart3, Target, DollarSign,
  MapPin, Share2, Globe, Bell, Settings, LogOut, Menu, X,
  ChevronDown, Megaphone,
} from 'lucide-react';

const NAV = [
  { href: '/dashboard', label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/clients',   label: 'Clientes',     icon: Users           },
  { href: '/traffic',   label: 'Tráfego Pago', icon: Target          },
  { href: '/crm',       label: 'CRM',          icon: BarChart3       },
  { href: '/financial', label: 'Financeiro',   icon: DollarSign      },
  { href: '/gmb',       label: 'Google Meu Negócio', icon: MapPin    },
  { href: '/social',    label: 'Social Media', icon: Share2          },
  { href: '/sites',     label: 'Sites',        icon: Globe           },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<ReturnType<typeof getUser>>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.replace('/'); return; }
    setUser(u);
  }, [router]);

  function handleLogout() {
    logout();
    router.replace('/');
  }

  if (!user) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-white text-sm">Carregando...</div>
    </div>
  );

  const Sidebar = ({ mobile = false }) => (
    <div className={`${mobile ? 'fixed inset-0 z-50 flex' : 'hidden lg:flex'} ${mobile ? '' : 'h-screen'}`}>
      {mobile && <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />}
      <nav className={`${mobile ? 'relative z-10 w-64' : 'w-60 xl:w-64'} bg-sidebar flex flex-col h-full`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm text-white flex-shrink-0">R</div>
          <div>
            <div className="text-white font-bold text-sm">RA Hub</div>
            <div className="text-slate-400 text-xs">Agência RA Digital</div>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {NAV.map(item => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link key={item.href} href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <Icon size={16} className="flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Bottom links */}
        <div className="px-2 py-3 border-t border-white/10 space-y-0.5">
          <Link href="/settings"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              pathname === '/settings' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Settings size={16} />Configurações
          </Link>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <LogOut size={16} />Sair
          </button>
        </div>
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      {sidebarOpen && <Sidebar mobile />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-14 flex items-center px-4 gap-3 flex-shrink-0">
          <button className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100" onClick={() => setSidebarOpen(true)}>
            <Menu size={18} />
          </button>

          {/* Breadcrumb */}
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-700">
              {NAV.find(n => pathname === n.href || pathname.startsWith(n.href + '/'))?.label || 'Sistema'}
            </p>
          </div>

          {/* Alerts */}
          <Link href="/alerts" className="relative p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
            <Bell size={18} />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>

          {/* User menu */}
          <div className="relative">
            <button onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user.avatar}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-700 leading-none">{user.name.split(' ')[0]}</p>
                <p className="text-xs text-slate-400">{ROLE_LABELS[user.role]}</p>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
            {userMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-20">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-700">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                  <Link href="/settings" onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                    <Settings size={14} />Configurações
                  </Link>
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut size={14} />Sair
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
