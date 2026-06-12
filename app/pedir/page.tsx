import OrderingApp from '@/components/ordering/OrderingApp';
import { getCategoryGroups } from '@/lib/products';

export const metadata = {
  title: 'Pedir online · Chicken Palace Ibiza',
  description:
    'Haz tu pedido online en Chicken Palace Ibiza: pollo asado, croquetas, ensaladas, pastas, postres y bebidas. Recoge en tienda.',
};

export default function PedirPage() {
  const groups = getCategoryGroups();
  // Número de WhatsApp Business del restaurante (configurable por entorno).
  const whatsappPhone =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '34600000000';
  // PIN para acceder al gestor de carta (configurable por entorno).
  const adminPin = process.env.NEXT_PUBLIC_ADMIN_PIN || '1234';

  return <OrderingApp groups={groups} whatsappPhone={whatsappPhone} adminPin={adminPin} />;
}
