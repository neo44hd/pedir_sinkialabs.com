'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import {
  ShoppingCart, Plus, Minus, X, Trash2, Phone, Clock, ChevronRight,
  Star, MapPin, Bike, UtensilsCrossed, Settings, Lock, Pencil, Save,
  RotateCcw, Download, PackagePlus,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  type CategoryGroup,
  type Product,
  type ProductCategory,
  type MenuFamily,
  buildCategoryGroups,
  CATEGORY_OPTIONS,
  formatPrice,
} from '@/lib/products';
import { cn } from '@/lib/utils';

interface CartLine {
  product: Product;
  quantity: number;
}

interface OrderingAppProps {
  groups: CategoryGroup[];
  whatsappPhone: string;
  adminPin: string;
}

const STORAGE_KEY = 'synkia_catalog_v1';

export default function OrderingApp({ groups, whatsappPhone, adminPin }: OrderingAppProps) {
  // Lista de productos por defecto (aplanada desde los grupos del servidor).
  const defaultProducts = useMemo(
    () => groups.flatMap((g) => g.products),
    [groups],
  );

  // Catálogo editable (puede sobreescribirse desde el gestor de carta).
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [hydrated, setHydrated] = useState(false);

  // Carga el catálogo personalizado guardado en el navegador (si existe).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Product[];
        if (Array.isArray(parsed) && parsed.length > 0) setProducts(parsed);
      }
    } catch {
      /* noop */
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Product[]) => {
    setProducts(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* noop */
    }
  }, []);

  const resetCatalog = useCallback(() => {
    setProducts(defaultProducts);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  }, [defaultProducts]);

  const dynamicGroups = useMemo(() => buildCategoryGroups(products), [products]);

  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(groups[0]?.category ?? '');

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev[product.id];
      return {
        ...prev,
        [product.id]: { product, quantity: (existing?.quantity ?? 0) + 1 },
      };
    });
  }, []);

  const decrement = useCallback((productId: string) => {
    setCart((prev) => {
      const existing = prev[productId];
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        const { [productId]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: { ...existing, quantity: existing.quantity - 1 } };
    });
  }, []);

  const removeLine = useCallback((productId: string) => {
    setCart((prev) => {
      const { [productId]: _removed, ...rest } = prev;
      return rest;
    });
  }, []);

  const lines = useMemo(() => Object.values(cart), [cart]);
  const itemCount = useMemo(() => lines.reduce((s, l) => s + l.quantity, 0), [lines]);
  const total = useMemo(
    () => lines.reduce((s, l) => s + l.product.price * l.quantity, 0),
    [lines],
  );

  return (
    <div className="min-h-screen flex flex-col bg-surface-gradient text-zinc-100 relative">
      {/* Resplandor decorativo de fondo */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* ───────── Header ───────── */}
      <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-xl shadow-glow">
              🍗
            </div>
            <div className="leading-tight">
              <h1 className="font-bold text-base">Chicken Palace Ibiza</h1>
              <p className="text-[11px] text-zinc-400">Pide online · Recoge en tienda</p>
            </div>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition px-4 py-2 font-medium backdrop-blur"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">{formatPrice(total)}</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-gradient text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-glow">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* ───────── Barra de categorías ───────── */}
        <nav className="no-scrollbar overflow-x-auto border-t border-white/5">
          <div className="mx-auto max-w-5xl px-2 flex gap-1.5 py-2.5">
            {dynamicGroups.map((g) => (
              <a
                key={g.category}
                href={`#cat-${g.category}`}
                onClick={() => setActiveCategory(g.category)}
                className={cn(
                  'whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition border',
                  activeCategory === g.category
                    ? 'bg-brand-gradient text-white border-transparent shadow-glow'
                    : 'text-zinc-300 border-white/10 bg-white/5 hover:bg-white/10',
                )}
              >
                <span className="mr-1">{g.emoji}</span>
                {g.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* ───────── Hero ───────── */}
      <Hero />

      {/* ───────── Catálogo ───────── */}
      <main id="carta" className="flex-1 mx-auto max-w-5xl w-full px-4 py-8 scroll-mt-32 relative z-10">
        {dynamicGroups.map((group) => (
          <section key={group.category} id={`cat-${group.category}`} className="scroll-mt-32 mb-10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                {group.emoji}
              </span>
              {group.label}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {group.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cart[product.id]?.quantity ?? 0}
                  onAdd={() => addToCart(product)}
                  onRemove={() => decrement(product.id)}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* ───────── Botón flotante de carrito (móvil) ───────── */}
      {itemCount > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 rounded-full bg-brand-gradient text-white px-6 py-3 shadow-glow font-semibold animate-fade-in"
        >
          <ShoppingCart className="w-5 h-5" />
          Ver pedido · {itemCount}
          <span className="font-bold">{formatPrice(total)}</span>
        </button>
      )}

      {/* ───────── Drawer del carrito ───────── */}
      <CartDrawer
        open={cartOpen}
        lines={lines}
        total={total}
        onClose={() => setCartOpen(false)}
        onInc={(p) => addToCart(p)}
        onDec={(id) => decrement(id)}
        onRemove={(id) => removeLine(id)}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* ───────── Modal de checkout ───────── */}
      <CheckoutModal
        open={checkoutOpen}
        lines={lines}
        total={total}
        whatsappPhone={whatsappPhone}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={() => {
          setCheckoutOpen(false);
          setCart({});
        }}
      />

      {/* ───────── Gestor de carta (admin) ───────── */}
      <AdminPanel
        open={adminOpen}
        adminPin={adminPin}
        products={products}
        onClose={() => setAdminOpen(false)}
        onSave={persist}
        onReset={resetCatalog}
      />

      {/* ───────── Footer ───────── */}
      <footer className="relative z-10 border-t border-white/10 bg-zinc-950/60 backdrop-blur text-zinc-500 text-center text-xs py-7 px-4">
        <p>© {new Date().getFullYear()} Chicken Palace Ibiza SL · Pedidos online por SYNK-IA</p>
        <p className="mt-1">Los precios pueden variar. Pedido sujeto a confirmación del restaurante.</p>
        <button
          onClick={() => setAdminOpen(true)}
          className="mt-3 inline-flex items-center gap-1.5 text-zinc-600 hover:text-zinc-300 transition"
        >
          <Settings className="w-3.5 h-3.5" /> Gestionar carta
        </button>
      </footer>
    </div>
  );
}

/* ───────────────────────── Hero ───────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <Image
          src="/products/pollo_asado.png"
          alt="Pollo asado de Chicken Palace Ibiza"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-110 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/95 via-zinc-950/80 to-brand-dark/40" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-14 sm:py-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur px-3 py-1 text-xs font-semibold tracking-wide uppercase text-zinc-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Abierto ahora · Recoge en tienda
          </span>

          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight">
            Chicken Palace{' '}
            <span className="bg-brand-gradient bg-clip-text text-transparent">Ibiza</span> 🍗
          </h1>
          <p className="mt-3 text-base sm:text-lg text-zinc-300 max-w-xl">
            Pollo asado jugoso, costillas a la barbacoa, croquetas caseras y mucho más.
            Haz tu pedido online y recógelo recién hecho.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5 text-sm">
            {[
              { icon: <Star className="w-4 h-4 text-accent fill-accent" />, label: '4,8 · Excelente' },
              { icon: <Clock className="w-4 h-4 text-accent" />, label: 'Listo en 15–20 min' },
              { icon: <MapPin className="w-4 h-4 text-accent" />, label: 'Ibiza' },
              { icon: <Bike className="w-4 h-4 text-accent" />, label: 'Recogida gratis' },
            ].map((pill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/8 border border-white/10 backdrop-blur px-3 py-1.5 text-zinc-200"
              >
                {pill.icon} {pill.label}
              </span>
            ))}
          </div>

          <a
            href="#carta"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-gradient text-white px-7 py-3.5 font-bold shadow-glow hover:scale-[1.02] active:scale-95 transition"
          >
            <UtensilsCrossed className="w-5 h-5" /> Ver la carta
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── Tarjeta de producto ───────────────────────── */
function ProductCard({
  product,
  quantity,
  onAdd,
  onRemove,
}: {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-brand/40 hover:shadow-glow flex flex-col transition backdrop-blur">
      <div className="relative aspect-square bg-zinc-900">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition duration-300"
        />
        {quantity > 0 && (
          <span className="absolute top-2 right-2 bg-brand-gradient text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-glow">
            {quantity}
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-semibold text-sm leading-tight text-zinc-100">{product.name}</h3>
        {product.description && (
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 flex-1">{product.description}</p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-accent">{formatPrice(product.price)}</span>
          {quantity === 0 ? (
            <button
              onClick={onAdd}
              className="rounded-full bg-brand-gradient text-white w-8 h-8 flex items-center justify-center hover:scale-110 transition shadow-glow"
              aria-label={`Añadir ${product.name}`}
            >
              <Plus className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onRemove}
                className="rounded-full bg-white/10 border border-white/10 w-8 h-8 flex items-center justify-center hover:bg-white/20 transition"
                aria-label="Quitar uno"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold w-4 text-center">{quantity}</span>
              <button
                onClick={onAdd}
                className="rounded-full bg-brand-gradient text-white w-8 h-8 flex items-center justify-center hover:scale-110 transition shadow-glow"
                aria-label="Añadir uno"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Drawer del carrito ───────────────────────── */
function CartDrawer({
  open,
  lines,
  total,
  onClose,
  onInc,
  onDec,
  onRemove,
  onCheckout,
}: {
  open: boolean;
  lines: CartLine[];
  total: number;
  onClose: () => void;
  onInc: (p: Product) => void;
  onDec: (id: string) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-zinc-950/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col shadow-2xl text-zinc-100"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-accent" /> Tu pedido
              </h2>
              <button onClick={onClose} aria-label="Cerrar carrito">
                <X className="w-6 h-6 text-zinc-400 hover:text-white transition" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {lines.length === 0 && (
                <p className="text-center text-zinc-500 mt-12">Tu carrito está vacío 🛒</p>
              )}
              {lines.map((line) => (
                <div key={line.product.id} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-2">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0">
                    <Image src={line.product.image} alt={line.product.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{line.product.name}</p>
                    <p className="text-accent font-bold text-sm">
                      {formatPrice(line.product.price * line.quantity)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => onDec(line.product.id)} className="rounded-full bg-white/10 border border-white/10 w-7 h-7 flex items-center justify-center hover:bg-white/20" aria-label="Quitar uno">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold">{line.quantity}</span>
                    <button onClick={() => onInc(line.product)} className="rounded-full bg-brand-gradient text-white w-7 h-7 flex items-center justify-center shadow-glow" aria-label="Añadir uno">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => onRemove(line.product.id)} className="ml-1 text-zinc-500 hover:text-brand-light transition" aria-label="Eliminar">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-white/10 p-4 space-y-3">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-accent">{formatPrice(total)}</span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full rounded-xl bg-brand-gradient text-white py-3 font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] transition shadow-glow"
                >
                  Continuar con el pedido <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ───────────────────────── Modal de checkout ───────────────────────── */
function CheckoutModal({
  open,
  lines,
  total,
  whatsappPhone,
  onClose,
  onSuccess,
}: {
  open: boolean;
  lines: CartLine[];
  total: number;
  whatsappPhone: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const buildWhatsappMessage = useCallback(
    (reference: string) => {
      const itemsText = lines
        .map((l) => `• ${l.quantity}x ${l.product.name} — ${formatPrice(l.product.price * l.quantity)}`)
        .join('\n');
      return (
        `*Nuevo pedido — Chicken Palace Ibiza* 🍗\n` +
        (reference ? `Ref: ${reference}\n` : '') +
        `\n*Cliente:* ${name}\n` +
        `*Teléfono:* ${phone}\n` +
        (pickupTime ? `*Hora de recogida:* ${pickupTime}\n` : '') +
        (notes ? `*Notas:* ${notes}\n` : '') +
        `\n*Productos:*\n${itemsText}\n` +
        `\n*TOTAL: ${formatPrice(total)}*`
      );
    },
    [lines, name, phone, pickupTime, notes, total],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || submitting) return;
    setSubmitting(true);

    let reference = '';
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          pickupTime,
          notes,
          items: lines.map((l) => ({
            productId: l.product.id,
            name: l.product.name,
            unitPrice: l.product.price,
            quantity: l.quantity,
          })),
          total,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        reference = data?.reference ?? '';
      }
    } catch {
      /* Si falla la persistencia, continuamos igualmente con WhatsApp. */
    }

    const message = buildWhatsappMessage(reference);
    const waUrl = `https://wa.me/${whatsappPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    setSubmitting(false);
    onSuccess();
  };

  if (!open) return null;

  const inputCls =
    'mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-zinc-100 placeholder-zinc-500 focus:border-brand focus:ring-1 focus:ring-brand outline-none';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-zinc-900 border border-white/10 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5 animate-fade-in max-h-[92vh] overflow-y-auto text-zinc-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Finalizar pedido</h2>
          <button onClick={onClose} aria-label="Cerrar"><X className="w-6 h-6 text-zinc-400 hover:text-white" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm font-medium text-zinc-400">Nombre *</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Tu nombre" />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> Teléfono *
            </label>
            <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} placeholder="600 000 000" />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Hora de recogida
            </label>
            <input value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className={inputCls} placeholder="Ej: 14:30" />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-400">Notas</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className={cn(inputCls, 'resize-none')} placeholder="Alergias, indicaciones, etc." />
          </div>

          <div className="flex items-center justify-between text-lg font-bold pt-2">
            <span>Total</span>
            <span className="text-accent">{formatPrice(total)}</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-[#25D366] text-white py-3 font-semibold flex items-center justify-center gap-2 hover:brightness-95 transition disabled:opacity-60"
          >
            {submitting ? 'Enviando...' : 'Confirmar y enviar por WhatsApp'}
          </button>
          <p className="text-xs text-zinc-500 text-center">
            Al confirmar se abrirá WhatsApp con el resumen de tu pedido para enviarlo al restaurante.
          </p>
        </form>
      </div>
    </div>
  );
}

/* ───────────────────────── Gestor de carta (admin) ───────────────────────── */
type DraftProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: ProductCategory;
  family: MenuFamily;
};

function emptyDraft(): DraftProduct {
  return { id: '', name: '', description: '', price: '', image: '/products/', category: 'POLLO', family: 'COMIDA' };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 40) || `prod_${Date.now()}`;
}

function AdminPanel({
  open,
  adminPin,
  products,
  onClose,
  onSave,
  onReset,
}: {
  open: boolean;
  adminPin: string;
  products: Product[];
  onClose: () => void;
  onSave: (next: Product[]) => void;
  onReset: () => void;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [editing, setEditing] = useState<DraftProduct | null>(null);

  // Reinicia el estado al cerrar.
  useEffect(() => {
    if (!open) {
      setUnlocked(false);
      setPinInput('');
      setPinError(false);
      setEditing(null);
    }
  }, [open]);

  const startNew = () => setEditing(emptyDraft());
  const startEdit = (p: Product) =>
    setEditing({
      id: p.id,
      name: p.name,
      description: p.description ?? '',
      price: String(p.price),
      image: p.image,
      category: p.category,
      family: p.family,
    });

  const saveDraft = () => {
    if (!editing) return;
    const price = parseFloat(editing.price.replace(',', '.'));
    if (!editing.name.trim() || isNaN(price)) return;
    const meta = CATEGORY_OPTIONS.find((c) => c.value === editing.category);
    const id = editing.id || slugify(editing.name);
    const product: Product = {
      id,
      name: editing.name.trim(),
      description: editing.description.trim() || undefined,
      price,
      image: editing.image.trim() || '/products/pollo_asado.png',
      category: editing.category,
      family: meta?.family ?? 'COMIDA',
    };
    const exists = products.some((p) => p.id === id);
    const next = exists
      ? products.map((p) => (p.id === id ? product : p))
      : [...products, product];
    onSave(next);
    setEditing(null);
  };

  const deleteProduct = (id: string) => {
    onSave(products.filter((p) => p.id !== id));
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'carta-chicken-palace.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!open) return null;

  const inputCls =
    'w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-brand focus:ring-1 focus:ring-brand outline-none';

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-black/70 backdrop-blur-sm">
      <div className="w-full sm:max-w-lg h-full bg-zinc-950 border-l border-white/10 flex flex-col text-zinc-100 animate-fade-in">
        {/* Cabecera */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-zinc-900/50">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <Settings className="w-5 h-5 text-accent" /> Gestor de carta
          </h2>
          <button onClick={onClose} aria-label="Cerrar"><X className="w-6 h-6 text-zinc-400 hover:text-white" /></button>
        </div>

        {/* Bloqueo por PIN */}
        {!unlocked ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <Lock className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-semibold text-lg">Acceso restringido</h3>
            <p className="text-sm text-zinc-400 mt-1 mb-5 max-w-xs">
              Introduce el PIN de administración para gestionar los productos de la carta.
            </p>
            <input
              type="password"
              inputMode="numeric"
              value={pinInput}
              onChange={(e) => { setPinInput(e.target.value); setPinError(false); }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (pinInput === adminPin) setUnlocked(true);
                  else setPinError(true);
                }
              }}
              className={cn(inputCls, 'max-w-[200px] text-center tracking-[0.4em] text-lg', pinError && 'border-brand ring-1 ring-brand')}
              placeholder="••••"
              autoFocus
            />
            {pinError && <p className="text-brand-light text-xs mt-2">PIN incorrecto</p>}
            <button
              onClick={() => (pinInput === adminPin ? setUnlocked(true) : setPinError(true))}
              className="mt-5 rounded-xl bg-brand-gradient text-white px-6 py-2.5 font-semibold shadow-glow"
            >
              Acceder
            </button>
          </div>
        ) : editing ? (
          /* Formulario de edición / alta */
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Pencil className="w-4 h-4 text-accent" />
              {products.some((p) => p.id === editing.id) ? 'Editar producto' : 'Nuevo producto'}
            </h3>
            <div>
              <label className="text-xs text-zinc-400">Nombre *</label>
              <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={inputCls} placeholder="Ej: Pollo Asado Entero" />
            </div>
            <div>
              <label className="text-xs text-zinc-400">Descripción</label>
              <input value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className={inputCls} placeholder="Breve descripción" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-400">Precio (€) *</label>
                <input value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} className={inputCls} placeholder="9.50" inputMode="decimal" />
              </div>
              <div>
                <label className="text-xs text-zinc-400">Categoría</label>
                <select
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value as ProductCategory })}
                  className={cn(inputCls, 'appearance-none')}
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value} className="bg-zinc-900">{c.emoji} {c.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-zinc-400">Ruta de imagen</label>
              <input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className={inputCls} placeholder="/products/nombre.png" />
              <p className="text-[11px] text-zinc-500 mt-1">
                Usa una imagen existente en <code className="text-zinc-400">/products/</code> o sube la tuya a esa carpeta.
              </p>
            </div>
            {editing.image && (
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/10 bg-zinc-900">
                <Image src={editing.image} alt="Vista previa" fill sizes="96px" className="object-cover" />
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <button onClick={saveDraft} className="flex-1 rounded-xl bg-brand-gradient text-white py-2.5 font-semibold flex items-center justify-center gap-2 shadow-glow">
                <Save className="w-4 h-4" /> Guardar
              </button>
              <button onClick={() => setEditing(null)} className="rounded-xl bg-white/10 border border-white/10 px-4 py-2.5 hover:bg-white/20 transition">
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          /* Lista de productos */
          <>
            <div className="p-3 border-b border-white/10 flex flex-wrap gap-2">
              <button onClick={startNew} className="flex-1 min-w-[140px] rounded-xl bg-brand-gradient text-white py-2.5 font-semibold flex items-center justify-center gap-2 shadow-glow">
                <PackagePlus className="w-4 h-4" /> Añadir producto
              </button>
              <button onClick={exportJson} className="rounded-xl bg-white/10 border border-white/10 px-3 py-2.5 hover:bg-white/20 transition flex items-center gap-1.5 text-sm" title="Exportar carta">
                <Download className="w-4 h-4" /> Exportar
              </button>
              <button
                onClick={() => { if (confirm('¿Restablecer la carta a los valores por defecto? Se perderán tus cambios.')) onReset(); }}
                className="rounded-xl bg-white/10 border border-white/10 px-3 py-2.5 hover:bg-white/20 transition flex items-center gap-1.5 text-sm"
                title="Restablecer carta"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              <p className="text-xs text-zinc-500 px-1">{products.length} productos en la carta</p>
              {products.map((p) => {
                const meta = CATEGORY_OPTIONS.find((c) => c.value === p.category);
                return (
                  <div key={p.id} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-2">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0">
                      <Image src={p.image} alt={p.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{p.name}</p>
                      <p className="text-xs text-zinc-400">{meta?.emoji} {meta?.label} · <span className="text-accent font-semibold">{formatPrice(p.price)}</span></p>
                    </div>
                    <button onClick={() => startEdit(p)} className="rounded-lg bg-white/10 border border-white/10 w-8 h-8 flex items-center justify-center hover:bg-white/20 transition" aria-label="Editar">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => { if (confirm(`¿Eliminar "${p.name}"?`)) deleteProduct(p.id); }} className="rounded-lg bg-white/10 border border-white/10 w-8 h-8 flex items-center justify-center hover:bg-brand/30 transition text-zinc-300" aria-label="Eliminar">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
