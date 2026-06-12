// =====================================================================
// Catálogo de productos — Chicken Palace Ibiza
// ---------------------------------------------------------------------
// Datos construidos a partir de las imágenes reales de producto
// (public/products/*.png). Los precios son orientativos y EDITABLES;
// en producción se sincronizan automáticamente con Revo XEF (TPV).
// =====================================================================

export type ProductCategory =
  | 'POLLO'
  | 'CARNES'
  | 'PATATAS'
  | 'CROQUETAS'
  | 'ENSALADAS'
  | 'PASTAS'
  | 'ENTRANTES'
  | 'POSTRES'
  | 'BEBIDAS';

export type MenuFamily = 'COMIDA' | 'BEBIDA';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number; // EUR
  image: string; // ruta en /products
  category: ProductCategory;
  family: MenuFamily;
}

export interface CategoryGroup {
  category: ProductCategory;
  family: MenuFamily;
  label: string;
  emoji: string;
  products: Product[];
}

export const PRODUCTS: Product[] = [
  // ───────────── POLLO ─────────────
  { id: 'pollo_asado', name: 'Pollo Asado Entero', description: 'Pollo entero asado al estilo Chicken Palace', price: 13.5, image: '/products/pollo_asado.png', category: 'POLLO', family: 'COMIDA' },
  { id: 'medio_pollo_asado', name: 'Medio Pollo Asado', description: 'Medio pollo asado, jugoso y dorado', price: 7.5, image: '/products/medio_pollo_asado.png', category: 'POLLO', family: 'COMIDA' },
  { id: 'cuartos_pollo', name: 'Cuartos de Pollo', description: 'Cuartos de pollo asado', price: 4.5, image: '/products/cuartos_pollo.png', category: 'POLLO', family: 'COMIDA' },
  { id: 'pollo_al_horno_verduras', name: 'Pollo al Horno con Verduras', description: 'Pollo al horno acompañado de verduras', price: 9.9, image: '/products/pollo_al_horno_verduras.png', category: 'POLLO', family: 'COMIDA' },
  { id: 'pollo_teriyaki', name: 'Pollo Teriyaki', description: 'Pollo con salsa teriyaki', price: 9.5, image: '/products/pollo_teriyaki.png', category: 'POLLO', family: 'COMIDA' },

  // ───────────── CARNES ─────────────
  { id: 'codillo_cerdo', name: 'Codillo de Cerdo', description: 'Codillo de cerdo asado', price: 11.5, image: '/products/codillo_cerdo.png', category: 'CARNES', family: 'COMIDA' },
  { id: 'costillar_cerdo', name: 'Costillar de Cerdo', description: 'Costillar de cerdo al horno', price: 12.5, image: '/products/costillar_cerdo.png', category: 'CARNES', family: 'COMIDA' },
  { id: 'costillas_barbacoa', name: 'Costillas Barbacoa', description: 'Costillas con salsa barbacoa', price: 12.9, image: '/products/costillas_barbacoa.png', category: 'CARNES', family: 'COMIDA' },
  { id: 'frita_cerdo', name: 'Frita de Cerdo', description: 'Frita de cerdo tradicional', price: 9.5, image: '/products/frita_cerdo.png', category: 'CARNES', family: 'COMIDA' },

  // ───────────── PATATAS ─────────────
  { id: 'patatas_fritas_largas', name: 'Patatas Fritas', description: 'Patatas fritas crujientes', price: 3.5, image: '/products/patatas_fritas_largas.png', category: 'PATATAS', family: 'COMIDA' },
  { id: 'patatas_asadas', name: 'Patatas Asadas', description: 'Patatas asadas al horno', price: 3.9, image: '/products/patatas_asadas.png', category: 'PATATAS', family: 'COMIDA' },
  { id: 'patatas_brost', name: 'Patatas Brost', description: 'Patatas estilo brost', price: 4.2, image: '/products/patatas_brost.png', category: 'PATATAS', family: 'COMIDA' },
  { id: 'patatas_pobres', name: 'Patatas a lo Pobre', description: 'Patatas a lo pobre con cebolla', price: 4.5, image: '/products/patatas_pobres.png', category: 'PATATAS', family: 'COMIDA' },
  { id: 'boniatos_fritos', name: 'Boniatos Fritos', description: 'Boniatos fritos', price: 4.5, image: '/products/boniatos_fritos.png', category: 'PATATAS', family: 'COMIDA' },

  // ───────────── CROQUETAS ─────────────
  { id: 'croqueta_jamon', name: 'Croquetas de Jamón', description: 'Croquetas caseras de jamón (ración)', price: 5.5, image: '/products/croqueta_jamon.png', category: 'CROQUETAS', family: 'COMIDA' },
  { id: 'croqueta_boletus', name: 'Croquetas de Boletus', description: 'Croquetas caseras de boletus (ración)', price: 5.9, image: '/products/croqueta_boletus.png', category: 'CROQUETAS', family: 'COMIDA' },
  { id: 'croqueta_cocido', name: 'Croquetas de Cocido', description: 'Croquetas caseras de cocido (ración)', price: 5.5, image: '/products/croqueta_cocido.png', category: 'CROQUETAS', family: 'COMIDA' },
  { id: 'croqueta_espinaca', name: 'Croquetas de Espinaca', description: 'Croquetas caseras de espinaca (ración)', price: 5.5, image: '/products/croqueta_espinaca.png', category: 'CROQUETAS', family: 'COMIDA' },

  // ───────────── ENSALADAS ─────────────
  { id: 'ensaladilla_rusa', name: 'Ensaladilla Rusa', description: 'Ensaladilla rusa casera', price: 4.9, image: '/products/ensaladilla_rusa.png', category: 'ENSALADAS', family: 'COMIDA' },
  { id: 'ensalada_payesa', name: 'Ensalada Payesa', description: 'Ensalada payesa tradicional', price: 6.5, image: '/products/ensalada_payesa.png', category: 'ENSALADAS', family: 'COMIDA' },
  { id: 'ensalada_arroz', name: 'Ensalada de Arroz', description: 'Ensalada de arroz', price: 5.5, image: '/products/ensalada_arroz.png', category: 'ENSALADAS', family: 'COMIDA' },
  { id: 'ensalada_couscous', name: 'Ensalada de Cuscús', description: 'Ensalada de cuscús', price: 5.5, image: '/products/ensalada_couscous.png', category: 'ENSALADAS', family: 'COMIDA' },
  { id: 'ensalada_garbanzos', name: 'Ensalada de Garbanzos', description: 'Ensalada de garbanzos', price: 5.5, image: '/products/ensalada_garbanzos.png', category: 'ENSALADAS', family: 'COMIDA' },
  { id: 'ensalada_lentejas', name: 'Ensalada de Lentejas', description: 'Ensalada de lentejas', price: 5.5, image: '/products/ensalada_lentejas.png', category: 'ENSALADAS', family: 'COMIDA' },
  { id: 'ensalada_pasta', name: 'Ensalada de Pasta', description: 'Ensalada de pasta', price: 5.5, image: '/products/ensalada_pasta.png', category: 'ENSALADAS', family: 'COMIDA' },
  { id: 'ensalada_patatas_alioli', name: 'Ensalada de Patatas Alioli', description: 'Patatas con alioli', price: 4.9, image: '/products/ensalada_patatas_alioli.png', category: 'ENSALADAS', family: 'COMIDA' },
  { id: 'ensalada_tomate_pelado', name: 'Ensalada de Tomate', description: 'Tomate pelado aliñado', price: 4.5, image: '/products/ensalada_tomate_pelado.png', category: 'ENSALADAS', family: 'COMIDA' },
  { id: 'escalivada', name: 'Escalivada', description: 'Escalivada de verduras asadas', price: 5.9, image: '/products/escalivada.png', category: 'ENSALADAS', family: 'COMIDA' },

  // ───────────── PASTAS ─────────────
  { id: 'canelones', name: 'Canelones', description: 'Canelones caseros', price: 7.5, image: '/products/canelones.png', category: 'PASTAS', family: 'COMIDA' },
  { id: 'lasana_carne', name: 'Lasaña de Carne', description: 'Lasaña de carne casera', price: 7.9, image: '/products/lasana_carne.png', category: 'PASTAS', family: 'COMIDA' },
  { id: 'macarrones', name: 'Macarrones', description: 'Macarrones con tomate', price: 6.5, image: '/products/macarrones.png', category: 'PASTAS', family: 'COMIDA' },
  { id: 'spagueti', name: 'Espaguetis', description: 'Espaguetis con tomate', price: 6.5, image: '/products/spagueti.png', category: 'PASTAS', family: 'COMIDA' },
  { id: 'media_pasta', name: 'Media Ración de Pasta', description: 'Media ración de pasta', price: 4.5, image: '/products/media_pasta.png', category: 'PASTAS', family: 'COMIDA' },

  // ───────────── ENTRANTES ─────────────
  { id: 'crepe_pollo_bacon', name: 'Crepe de Pollo y Bacon', description: 'Crepe relleno de pollo y bacon', price: 6.9, image: '/products/crepe_pollo_bacon.png', category: 'ENTRANTES', family: 'COMIDA' },
  { id: 'crepe_vegetal', name: 'Crepe Vegetal', description: 'Crepe vegetal', price: 6.5, image: '/products/crepe_vegetal.png', category: 'ENTRANTES', family: 'COMIDA' },
  { id: 'jalapenos_cheddar', name: 'Jalapeños con Cheddar', description: 'Jalapeños rellenos de cheddar', price: 5.5, image: '/products/jalapenos_cheddar.png', category: 'ENTRANTES', family: 'COMIDA' },
  { id: 'alioli', name: 'Alioli', description: 'Salsa alioli casera', price: 1.2, image: '/products/alioli.png', category: 'ENTRANTES', family: 'COMIDA' },
  { id: 'barra_pan', name: 'Barra de Pan', description: 'Barra de pan', price: 1.0, image: '/products/barra_pan.png', category: 'ENTRANTES', family: 'COMIDA' },

  // ───────────── POSTRES ─────────────
  { id: 'tarta_chocolate', name: 'Tarta de Chocolate', description: 'Tarta de chocolate casera', price: 4.5, image: '/products/tarta_chocolate.png', category: 'POSTRES', family: 'COMIDA' },
  { id: 'tarta_queso', name: 'Tarta de Queso', description: 'Tarta de queso casera', price: 4.5, image: '/products/tarta_queso.png', category: 'POSTRES', family: 'COMIDA' },
  { id: 'tarta_zanahoria', name: 'Tarta de Zanahoria', description: 'Tarta de zanahoria casera', price: 4.5, image: '/products/tarta_zanahoria.png', category: 'POSTRES', family: 'COMIDA' },
  { id: 'lemon_pie', name: 'Lemon Pie', description: 'Tarta de limón', price: 4.5, image: '/products/lemon_pie.png', category: 'POSTRES', family: 'COMIDA' },
  { id: 'arroz_leche', name: 'Arroz con Leche', description: 'Arroz con leche casero', price: 3.5, image: '/products/arroz_leche.png', category: 'POSTRES', family: 'COMIDA' },
  { id: 'natillas_caseras', name: 'Natillas Caseras', description: 'Natillas caseras', price: 3.5, image: '/products/natillas_caseras.png', category: 'POSTRES', family: 'COMIDA' },

  // ───────────── BEBIDAS ─────────────
  { id: 'cocacola_2l', name: 'Coca-Cola 2L', price: 3.2, image: '/products/cocacola_2l.png', category: 'BEBIDAS', family: 'BEBIDA' },
  { id: 'cocacola_zero_500', name: 'Coca-Cola Zero 500ml', price: 1.8, image: '/products/cocacola_zero_500.png', category: 'BEBIDAS', family: 'BEBIDA' },
  { id: 'fanta_naranja_2l', name: 'Fanta Naranja 2L', price: 3.0, image: '/products/fanta_naranja_2l.png', category: 'BEBIDAS', family: 'BEBIDA' },
  { id: 'fanta_naranja_500', name: 'Fanta Naranja 500ml', price: 1.8, image: '/products/fanta_naranja_500.png', category: 'BEBIDAS', family: 'BEBIDA' },
  { id: 'fanta_limon_2l', name: 'Fanta Limón 2L', price: 3.0, image: '/products/fanta_limon_2l.png', category: 'BEBIDAS', family: 'BEBIDA' },
  { id: 'fanta_limon_500', name: 'Fanta Limón 500ml', price: 1.8, image: '/products/fanta_limon_500.png', category: 'BEBIDAS', family: 'BEBIDA' },
  { id: 'sprite_2l', name: 'Sprite 2L', price: 3.0, image: '/products/sprite_2l.png', category: 'BEBIDAS', family: 'BEBIDA' },
  { id: 'sprite_500', name: 'Sprite 500ml', price: 1.8, image: '/products/sprite_500.png', category: 'BEBIDAS', family: 'BEBIDA' },
];

const CATEGORY_META: Record<ProductCategory, { label: string; emoji: string; family: MenuFamily }> = {
  POLLO: { label: 'Pollo', emoji: '🍗', family: 'COMIDA' },
  CARNES: { label: 'Carnes', emoji: '🥩', family: 'COMIDA' },
  PATATAS: { label: 'Patatas', emoji: '🍟', family: 'COMIDA' },
  CROQUETAS: { label: 'Croquetas', emoji: '🧆', family: 'COMIDA' },
  ENSALADAS: { label: 'Ensaladas', emoji: '🥗', family: 'COMIDA' },
  PASTAS: { label: 'Pastas', emoji: '🍝', family: 'COMIDA' },
  ENTRANTES: { label: 'Entrantes', emoji: '🥟', family: 'COMIDA' },
  POSTRES: { label: 'Postres', emoji: '🍰', family: 'COMIDA' },
  BEBIDAS: { label: 'Bebidas', emoji: '🥤', family: 'BEBIDA' },
};

export const CATEGORY_ORDER: ProductCategory[] = [
  'POLLO', 'CARNES', 'PATATAS', 'CROQUETAS', 'ENSALADAS', 'PASTAS', 'ENTRANTES', 'POSTRES', 'BEBIDAS',
];

// Metadatos de categoría expuestos para el gestor de carta (admin).
export const CATEGORY_OPTIONS = CATEGORY_ORDER.map((category) => ({
  value: category,
  ...CATEGORY_META[category],
}));

/** Reconstruye los grupos de categoría a partir de una lista plana de productos. */
export function buildCategoryGroups(products: Product[]): CategoryGroup[] {
  return CATEGORY_ORDER.map((category) => {
    const meta = CATEGORY_META[category];
    return {
      category,
      family: meta.family,
      label: meta.label,
      emoji: meta.emoji,
      products: products.filter((p) => p.category === category),
    };
  }).filter((g) => g.products.length > 0);
}

export function getCategoryGroups(): CategoryGroup[] {
  return buildCategoryGroups(PRODUCTS);
}

export function formatPrice(value: number): string {
  return value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
}
