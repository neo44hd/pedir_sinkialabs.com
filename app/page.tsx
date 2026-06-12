import Link from 'next/link';
import { ShoppingBag, LayoutDashboard, ArrowRight } from 'lucide-react';

// Landing por defecto (dominio genérico o desarrollo).
// En producción, el middleware redirige automáticamente según el dominio:
//   pedir.sinkialabs.com → /pedir
//   app.sinkialabs.com   → /command-center
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-brand to-brand-dark text-white px-4">
      <div className="text-center mb-10">
        <div className="text-6xl mb-4">🍗</div>
        <h1 className="text-4xl font-extrabold">SYNK-IA</h1>
        <p className="text-white/80 mt-2">Chicken Palace Ibiza · Plataforma inteligente</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 w-full max-w-2xl">
        <Link
          href="/pedir"
          className="group bg-white/10 hover:bg-white/20 backdrop-blur rounded-2xl p-6 transition border border-white/20"
        >
          <ShoppingBag className="w-8 h-8 mb-3" />
          <h2 className="text-xl font-bold flex items-center gap-2">
            Pedir online <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </h2>
          <p className="text-white/70 text-sm mt-1">
            Carta digital y pedidos para recoger · <strong>pedir.sinkialabs.com</strong>
          </p>
        </Link>

        <Link
          href="/command-center"
          className="group bg-white/10 hover:bg-white/20 backdrop-blur rounded-2xl p-6 transition border border-white/20"
        >
          <LayoutDashboard className="w-8 h-8 mb-3" />
          <h2 className="text-xl font-bold flex items-center gap-2">
            ERP SYNK-IA <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </h2>
          <p className="text-white/70 text-sm mt-1">
            Panel de control interno · <strong>app.sinkialabs.com</strong>
          </p>
        </Link>
      </div>

      <p className="text-white/50 text-xs mt-10">
        © {new Date().getFullYear()} Chicken Palace Ibiza SL
      </p>
    </main>
  );
}
