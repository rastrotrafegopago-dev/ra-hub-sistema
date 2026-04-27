'use client';
import { supabase } from './supabase';
export type UserRole = 'ADMIN' | 'TRAFFIC' | 'SOCIAL';
export interface AuthUser { id: string; name: string; email: string; role: UserRole; avatar: string; isActive: boolean; }
export const ROLE_LABELS: Record<string, string> = { ADMIN: 'Administrador', TRAFFIC: 'Tráfego Pago', SOCIAL: 'Social Media' };
const USER_KEY = 'ra_hub_user';
export async function login(email: string, password: string): Promise<AuthUser | null> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) return null;
  const meta = data.user.user_metadata || {};
  const user: AuthUser = { id: data.user.id, name: meta.name || email.split('@')[0], email: data.user.email!, role: (meta.role || 'TRAFFIC') as UserRole, avatar: meta.avatar || email[0].toUpperCase(), isActive: true };
  if (typeof window !== 'undefined') localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}
export async function logout(): Promise<void> {
  await supabase.auth.signOut();
  if (typeof window !== 'undefined') localStorage.removeItem(USER_KEY);
}
export function getUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}
export async function verifySession(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { if (typeof window !== 'undefined') localStorage.removeItem(USER_KEY); return false; }
  const meta = session.user.user_metadata || {};
  const user: AuthUser = { id: session.user.id, name: meta.name || session.user.email!.split('@')[0], email: session.user.email!, role: (meta.role || 'TRAFFIC') as UserRole, avatar: meta.avatar || session.user.email![0].toUpperCase(), isActive: true };
  if (typeof window !== 'undefined') localStorage.setItem(USER_KEY, JSON.stringify(user));
  return true;
}
