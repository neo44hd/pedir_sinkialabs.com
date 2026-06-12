# 🚀 Guía de Deploy — SYNK-IA (Chicken Palace Ibiza)

Esta guía explica, paso a paso, cómo publicar el proyecto en producción y conectar
los dominios personalizados **app.sinkialabs.com** y **pedir.sinkialabs.com**.

---

## ✅ Estado del proyecto (verificado)

| Comprobación | Resultado |
|---|---|
| `package.json` y scripts | ✔️ Correctos (`build`, `start`, `postinstall`) |
| Build de producción (`npm run build`) | ✔️ Compila sin errores (6 rutas) |
| Build en modo **standalone** (el que usa Abacus) | ✔️ Compila sin errores |
| Dependencias (`node_modules`) | ✔️ Instaladas |
| Variables de entorno (`.env`) | ✔️ Configuradas |
| Enrutamiento por dominio (`middleware.ts`) | ✔️ Configurado |
| 53 productos con imágenes | ✔️ En `public/products/` |

**El proyecto está listo para desplegarse.**

---

## 🔌 Cómo se hace el deploy en Abacus AI

> **Importante:** El deploy de una web-app a una URL pública `*.abacusai.app` y la
> configuración de dominios personalizados son **acciones del panel (interfaz) de
> Abacus AI**. No existe un CLI ni un método del SDK para hostear web-apps con dominio
> propio (el SDK de Abacus solo despliega modelos de ML / chatbots). Por eso este paso
> lo dispara la propia plataforma / el agente, y la conexión del dominio + DNS la
> completas tú.

---

## 📋 PASO 1 — Lanzar el deploy

1. En la conversación con el agente (o en el panel de tu app en Abacus AI), usa la
   opción **Deploy / Publicar la aplicación**.
2. La plataforma:
   - Reemplaza `next.config` por su configuración estándar (modo `standalone`).
   - Ejecuta `npm install` + `npm run build`.
   - Empaqueta y publica la app.
3. Al terminar, obtendrás una **URL pública** del tipo:
   ```
   https://<tu-app>.abacusai.app
   ```
   👉 **Guarda esa URL**: es tu producción base y el destino al que apuntarán los dominios.

---

## 📋 PASO 2 — Configurar las variables de entorno en el deploy

En la sección de **Environment Variables** del deployment, define exactamente estas:

| Variable | Valor | Para qué sirve |
|---|---|---|
| `NEXT_PUBLIC_APP_HOST` | `app.sinkialabs.com` | Dominio del ERP / Command Center |
| `NEXT_PUBLIC_ORDERING_HOST` | `pedir.sinkialabs.com` | Dominio de pedidos online |
| `NEXT_PUBLIC_WHATSAPP_PHONE` | `34XXXXXXXXX` | ⚠️ **Tu número real** de WhatsApp (prefijo país, sin `+` ni espacios) |
| `NEXT_PUBLIC_ADMIN_PIN` | `XXXX` | PIN para el gestor de carta (cámbialo por uno tuyo) |
| `DATABASE_URL` | *(vacío)* | Vacío = pedidos solo por WhatsApp, sin guardar en BD |
| `NODE_ENV` | `production` | Modo producción |

> 💡 Si más adelante quieres **guardar los pedidos y la carta en base de datos**
> (compartida entre todos los dispositivos), rellena `DATABASE_URL` con tu cadena de
> conexión PostgreSQL. Sin ella, la app funciona en modo "solo WhatsApp" y los cambios
> de la carta se guardan en el navegador de cada administrador.

---

## 📋 PASO 3 — Añadir los dominios personalizados en Abacus AI

En la sección de **Custom Domains / Dominios** del deployment:

1. Añade el dominio: **`pedir.sinkialabs.com`**
2. Añade el dominio: **`app.sinkialabs.com`**
3. Por cada dominio, Abacus AI te mostrará un **valor de destino** (un hostname tipo
   `algo.abacusai.app` o un registro de verificación). **Cópialo** — lo necesitas en el
   paso 4.

---

## 📋 PASO 4 — Crear los registros DNS (en tu proveedor de sinkialabs.com)

Entra en el panel de tu proveedor de dominios (donde compraste/gestionas
`sinkialabs.com`: p. ej. GoDaddy, Cloudflare, IONOS, Namecheap…) y crea **dos registros
CNAME**:

| Tipo | Nombre / Host | Valor / Destino | TTL |
|---|---|---|---|
| `CNAME` | `pedir` | *(el hostname que te dio Abacus, ej. `tu-app.abacusai.app`)* | Auto / 3600 |
| `CNAME` | `app` | *(el mismo hostname que te dio Abacus)* | Auto / 3600 |

**Notas importantes:**
- El campo **Nombre/Host** es solo el subdominio (`pedir`, `app`), **no** el dominio
  completo. Algunos paneles requieren el nombre completo `pedir.sinkialabs.com` — sigue
  el formato que pida tu proveedor.
- El **Valor/Destino** es exactamente lo que te muestre Abacus AI al añadir el dominio
  (paso 3). No lo inventes.
- Si Abacus pide además un registro de **verificación** (tipo `TXT`), créalo también.
- La **propagación DNS** puede tardar de unos minutos a varias horas.

---

## 📋 PASO 5 — Verificar

Cuando el DNS haya propagado y Abacus marque los dominios como "verificados/activos":

- Abre **https://pedir.sinkialabs.com** → debe mostrar el **sistema de pedidos** (carta,
  carrito, WhatsApp).
- Abre **https://app.sinkialabs.com** → debe redirigir al **Command Center (ERP)**.

El enrutamiento ya está resuelto automáticamente por `middleware.ts`:

```
pedir.sinkialabs.com  →  /pedir          (pedidos online)
app.sinkialabs.com    →  /command-center (ERP)
```

---

## 🔁 Resumen visual del flujo

```
1. Deploy en Abacus AI              →  URL pública  https://<app>.abacusai.app
2. Variables de entorno             →  hosts, WhatsApp, PIN
3. Añadir dominios en Abacus        →  pedir. y app.sinkialabs.com
4. Crear CNAME en tu DNS            →  apuntando al destino de Abacus
5. Esperar propagación + verificar  →  ✅ dominios activos
```

---

## ⚠️ Antes de publicar — checklist final

- [ ] Cambiar `NEXT_PUBLIC_WHATSAPP_PHONE` por el **número real** del restaurante.
- [ ] Cambiar `NEXT_PUBLIC_ADMIN_PIN` por un **PIN propio** (no dejar `1234`).
- [ ] Tener acceso al panel DNS de `sinkialabs.com`.
- [ ] (Opcional) Configurar `DATABASE_URL` si quieres persistencia en BD.

---

*Generado para el deploy de SYNK-IA · Chicken Palace Ibiza SL*
