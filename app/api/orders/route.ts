import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface IncomingItem {
  productId?: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

interface IncomingOrder {
  customerName: string;
  customerPhone: string;
  pickupTime?: string;
  notes?: string;
  items: IncomingItem[];
  total: number;
}

function generateReference(): string {
  const n = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, '0');
  return `CP-${n}`;
}

export async function POST(request: Request) {
  let body: IncomingOrder;
  try {
    body = (await request.json()) as IncomingOrder;
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  if (!body.customerName?.trim() || !body.customerPhone?.trim()) {
    return NextResponse.json(
      { error: 'Nombre y teléfono son obligatorios' },
      { status: 400 },
    );
  }
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json(
      { error: 'El pedido no contiene productos' },
      { status: 400 },
    );
  }

  const reference = generateReference();

  // Persistencia en base de datos (opcional).
  // Si DATABASE_URL no está configurada, el pedido se procesa igualmente
  // vía WhatsApp y devolvemos la referencia generada.
  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import('@/lib/db');
      const order = await prisma.order.create({
        data: {
          reference,
          customerName: body.customerName.trim(),
          customerPhone: body.customerPhone.trim(),
          pickupTime: body.pickupTime || null,
          notes: body.notes || null,
          total: body.total,
          channel: 'WEB',
          status: 'PENDING',
          items: {
            create: body.items.map((it) => ({
              productId: it.productId || null,
              name: it.name,
              unitPrice: it.unitPrice,
              quantity: it.quantity,
            })),
          },
        },
        select: { reference: true },
      });
      return NextResponse.json({ reference: order.reference, persisted: true });
    } catch (err) {
      // Si la BD falla, no bloqueamos el pedido del cliente.
      console.error('Error guardando el pedido:', err);
      return NextResponse.json({ reference, persisted: false });
    }
  }

  return NextResponse.json({ reference, persisted: false });
}
