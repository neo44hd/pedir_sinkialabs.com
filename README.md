# SYNK-IA · Chicken Palace Ibiza

Plataforma **Next.js 14 (App Router)** preparada para desplegarse en **dos dominios** desde un único proyecto/código, mediante enrutamiento por dominio (`middleware.ts`):

| Dominio | Qué sirve | Ruta interna |
|---|---|---|
| **pedir.sinkialabs.com** | Sistema de **pedidos online** para clientes (recogida en tienda, envío por WhatsApp) | `/pedir` |
| **app.sinkialabs.com** | **ERP completo SYNK-IA** (Command Center: albaranes, proveedores, stock, etc.) | `/command-center` |

> Un solo despliegue de código sirve ambos dominios. El `middleware.ts` detecta el `host` de la petición y reescribe/redirige a la sección correspondiente.

---

## 🗂️ Estructura del proyecto

```
nextjs_space/
├── app/
│   ├── layout.tsx              # Layout raíz (lang="es")
│   ├── page.tsx                # Landing con acceso a /pedir y /command-center
│   ├── globals.css
│   ├── pedir/
│   │   └── page.tsx            # Página de pedidos (server component)
│   ├── command-center/
│   │   └── page.tsx            # ERP embebido a pantalla completa (iframe → /erp)
│   └── api/
│       └── orders/route.ts     # POST de pedidos (referencia CP-XXXXXX + persistencia opcional)
├── components/
│   └── ordering/OrderingApp.tsx  # UI completa del pedido (carrito, checkout, WhatsApp)
├── lib/
│   ├── products.ts             # Catálogo de 53 productos + categorías + precios
│   ├── db.ts                   # Cliente Prisma (singleton)
│   └── utils.ts
├── prisma/
│   └── schema.prisma           # PostgreSQL: Product, Order, OrderItem
├── public/
│   ├── products/               # 53 imágenes reales de producto (.png)
│   └── erp/                     # ERP (build Vite/base44) servido como estático
├── middleware.ts               # Enrutamiento por dominio
├── .env.example                # Variables de entorno (copiar a .env)
└── next.config.js
```

---

## 🚀 Puesta en marcha (local)

```bash
cd nextjs_space
cp .env.example .env        # editar valores
npm install                  # instala dependencias + genera Prisma Client
npm run dev                  # http://localhost:3000
```

- Pedidos: `http://localhost:3000/pedir`
- ERP: `http://localhost:3000/command-center`
- Simular un dominio en local: `http://localhost:3000/?host=pedir.sinkialabs.com`

### Build de producción
```bash
npm run build    # prisma generate + next build
npm start        # sirve en el puerto 3000
```

---

## 🌐 Despliegue en los dos dominios

El **mismo proyecto** se despliega una sola vez. Después se apuntan ambos dominios al despliegue:

1. Despliega el proyecto (Vercel, VPS con `npm start`, etc.).
2. En tu proveedor de DNS, crea registros `CNAME` para:
   - `pedir.sinkialabs.com`
   - `app.sinkialabs.com`
   apuntando al host del despliegue.
3. Añade ambos dominios al despliegue (en Vercel: *Project → Settings → Domains*).
4. El `middleware.ts` se encarga del resto:
   - peticiones a `pedir.sinkialabs.com` → `/pedir`
   - peticiones a `app.sinkialabs.com` → `/command-center`

> Los dominios se pueden cambiar sin tocar código mediante las variables
> `NEXT_PUBLIC_ORDERING_HOST` y `NEXT_PUBLIC_APP_HOST` (admiten varios separados por comas).

---

## 🔑 Variables de entorno (`.env`)

Ver `.env.example`. Las principales:

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_ORDERING_HOST` | Dominio(s) de pedidos (def. `pedir.sinkialabs.com`) |
| `NEXT_PUBLIC_APP_HOST` | Dominio(s) del ERP (def. `app.sinkialabs.com`) |
| `NEXT_PUBLIC_WHATSAPP_PHONE` | Teléfono del restaurante para recibir pedidos (formato internacional, p.ej. `34600000000`) |
| `DATABASE_URL` | PostgreSQL. **Opcional**: sin ella los pedidos se procesan igualmente vía WhatsApp |
| `REVO_XEF_*` | Credenciales de Revo XEF (sincronización de carta/precios) |
| `GMAIL_*` | Cuenta `info@chickenpalace.es` para notificaciones |
| `AWS_*` / `S3_*` | Almacenamiento de imágenes/adjuntos |

---

## 🍗 Catálogo y precios

- El catálogo (`lib/products.ts`) incluye **53 productos** con sus imágenes reales, agrupados en 9 categorías (Pollo, Carnes, Patatas, Croquetas, Ensaladas, Pastas, Entrantes, Postres, Bebidas) y dos familias (COMIDA / BEBIDA).
- **Los precios actuales son provisionales (placeholders).** La fuente de verdad de la carta y los precios es **Revo XEF**; se pueden editar en `lib/products.ts` o conectar con la API de Revo para sincronizarlos automáticamente.

---

## 🧾 Pedidos

- El cliente arma su pedido, rellena nombre/teléfono y confirma.
- Se genera una referencia `CP-XXXXXX` y se abre **WhatsApp** con el resumen para enviarlo al restaurante.
- Si `DATABASE_URL` está configurada, el pedido también se **persiste en PostgreSQL** (`prisma/schema.prisma`).

---

## 🖥️ Command Center (ERP)

El ERP completo (construido con Vite + base44) se sirve como contenido estático desde `public/erp/` y se incrusta a pantalla completa en `/command-center`. Para regenerarlo tras cambios en el código fuente del ERP:

```bash
# en el repo del ERP (Vite)
npx vite build --base=/erp/
cp -r dist/* /ruta/a/nextjs_space/public/erp/
```

---

## 🚀 Deploy en Abacus AI (producción)

El proyecto está **100% listo para desplegar en Abacus AI**. Pasos:

### Paso 1: Verificación local
Ya completado ✅:
```bash
npm install        # ✅ Ejecutado
npm run build      # ✅ Compilado exitosamente (6 rutas)
ls .next/          # ✅ Build listo para enviar a Abacus
```

### Paso 2: Deploy en Abacus AI
1. Ve a [Abacus AI Panel](https://app.abacusai.com)
2. Selecciona tu app o crea una nueva
3. Busca **"Deploy" / "Publicar aplicación"**
4. Abacus ejecutará automáticamente:
   - `npm install`
   - `npm run build` (modo `standalone`)
   - Empaquetará y desplegará
5. **Guarda la URL pública** que Abacus muestre (ej: `https://tu-app.abacusai.app`)

### Paso 3: Configurar variables de entorno en Abacus
En **Environment Variables**, ingresa exactamente:
```
NEXT_PUBLIC_APP_HOST=app.sinkialabs.com
NEXT_PUBLIC_ORDERING_HOST=pedir.sinkialabs.com
NEXT_PUBLIC_WHATSAPP_PHONE=34XXXXXXXXX
NEXT_PUBLIC_ADMIN_PIN=XXXX
DATABASE_URL=
NODE_ENV=production
```

⚠️ **Importante**:
- `NEXT_PUBLIC_WHATSAPP_PHONE`: Reemplaza `34XXXXXXXXX` con tu número real (sin `+`, sin espacios)
- `NEXT_PUBLIC_ADMIN_PIN`: Usa un PIN seguro, **no dejes `1234`**
- `DATABASE_URL`: Déjalo vacío para modo "solo WhatsApp" sin persistencia en BD

### Paso 4: Añadir dominios personalizados
En **Custom Domains** del panel de Abacus:
1. Añade: `pedir.sinkialabs.com`
2. Añade: `app.sinkialabs.com`
3. Copia los valores CNAME que Abacus muestre para cada dominio

### Paso 5: Configurar DNS
En tu proveedor de `sinkialabs.com` (GoDaddy, Cloudflare, IONOS, etc.), crea **dos registros CNAME**:

| Tipo | Nombre/Host | Valor/Destino | TTL |
|------|---|---|---|
| CNAME | `pedir` | *[valor que Abacus te mostró]* | Auto/3600 |
| CNAME | `app` | *[valor que Abacus te mostró]* | Auto/3600 |

### Paso 6: Verificación final
Una vez que el DNS haya propagado y Abacus marque los dominios como "verificados":
- Abre `https://pedir.sinkialabs.com` → debe mostrar sistema de pedidos
- Abre `https://app.sinkialabs.com` → debe mostrar Command Center (ERP)

---

## 📄 Archivos de documentación para Deploy

En la carpeta encontrarás:
- **`ABACUS_DEPLOY_STEPS.md`**: Guía paso a paso detallada para Abacus AI
- **`ENV_VARS_FOR_ABACUS.txt`**: Variables de entorno listas para copiar
- **`DEPLOY_CHECKLIST.md`**: Checklist completo de verificación

Copia-pega directamente desde `ENV_VARS_FOR_ABACUS.txt` al panel de Abacus para evitar errores.
