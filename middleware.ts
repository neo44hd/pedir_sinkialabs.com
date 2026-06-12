import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// =====================================================================
// Enrutamiento por dominio
// ---------------------------------------------------------------------
//   pedir.sinkialabs.com → Sistema de pedidos online (/pedir)
//   app.sinkialabs.com   → ERP completo SYNK-IA (/command-center)
// ---------------------------------------------------------------------
// Para desarrollo/local se pueden forzar dominios con la query ?host=
// o usando las variables NEXT_PUBLIC_ORDERING_HOST / NEXT_PUBLIC_APP_HOST.
// =====================================================================

const ORDERING_HOSTS = (process.env.NEXT_PUBLIC_ORDERING_HOST || 'pedir.sinkialabs.com')
  .split(',')
  .map((h) => h.trim().toLowerCase());

const APP_HOSTS = (process.env.NEXT_PUBLIC_APP_HOST || 'app.sinkialabs.com')
  .split(',')
  .map((h) => h.trim().toLowerCase());

function getHost(req: NextRequest): string {
  // Permite simular el dominio en local: ?host=pedir.sinkialabs.com
  const forced = req.nextUrl.searchParams.get('host');
  if (forced) return forced.toLowerCase();
  const host = req.headers.get('host') || '';
  return host.split(':')[0].toLowerCase();
}

export function middleware(req: NextRequest) {
  const host = getHost(req);
  const { pathname } = req.nextUrl;

  const isOrderingDomain = ORDERING_HOSTS.includes(host);
  const isAppDomain = APP_HOSTS.includes(host);

  // ───── Dominio de PEDIDOS (pedir.sinkialabs.com) ─────
  if (isOrderingDomain) {
    // La raíz y cualquier ruta no-/pedir redirige al sistema de pedidos.
    if (pathname === '/' || (!pathname.startsWith('/pedir') && !pathname.startsWith('/api'))) {
      const url = req.nextUrl.clone();
      url.pathname = '/pedir';
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // ───── Dominio de APP / ERP (app.sinkialabs.com) ─────
  if (isAppDomain) {
    // La raíz del ERP entra directamente al command center.
    if (pathname === '/') {
      const url = req.nextUrl.clone();
      url.pathname = '/command-center';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // ───── Dominio por defecto / desarrollo ─────
  // Sin dominio específico se sirve la landing (raíz) con acceso a ambos.
  return NextResponse.next();
}

export const config = {
  // Ejecuta el middleware en todas las rutas excepto assets estáticos.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|products|assets|erp).*)'],
};
