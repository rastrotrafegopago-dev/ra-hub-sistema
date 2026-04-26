'use client';
// ─── Auth via localStorage (sem backend) ─────────────────────────────────────
export interface AuthUser {
  id: string; name: string; email: string; role: string; avatar: string;
}

const KEY = 'ra_hub_user';

export const DEMO_USERS: Record<string, AuthUser & { password: string }> = {
  'admin@radigital.com.br': { id: '1', name: 'Admin RA Digital',  email: 'admin@radigital.com.br',    role: 'ADMIN',   avatar: 'A', password: '123456' },
  'carlos@radigital.com.br':{ id: '2', name: 'Carlos Mendes',     email: 'carlos@radigital.com.br',   role: 'TRAFFIC', avatar: 'C', password: '123456' },
  'fernanda@radigital.com.br':{ id: '3', name: 'Fernanda Lima',   email: 'fernanda@radigital.com.br', role: 'SOCIAL',  avatar: 'F', password: '123456' },
};

export function login(email: string, password: string): AuthUser | null {
  const user = DEMO_USERS[email.toLowerCase()];
  if (!user || user.password !== password) return null;
  const { password: _, ...authUser } = user;
  localStorage.setItem(KEY, JSON.stringify(authUser));
  return authUser;
}

export function logout() {
  localStorage.removeItem(KEY);
}

export function getUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function isAdmin(): boolean {
  return getUser()?.role === 'ADMIN';
}

export const ROLE_LABELS: Record<string, string> = {
  ADMIN: 'Administrador', TRAFFIC: 'Tráfego Pago', SOCIAL: 'Social Media', VIEWER: 'Visualização',
};
