import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SYNK-IA · Chicken Palace Ibiza',
  description:
    'Sistema inteligente de gestión y pedidos online de Chicken Palace Ibiza. Pollo asado, comida para llevar y mucho más.',
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#E11D2A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
