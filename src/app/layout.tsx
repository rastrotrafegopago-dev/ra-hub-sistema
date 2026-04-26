import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RA Hub — Sistema da Agência',
  description: 'Sistema interno de gestão da RA Digital',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
