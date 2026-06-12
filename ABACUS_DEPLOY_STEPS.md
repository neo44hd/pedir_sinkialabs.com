# 🚀 ABACUS AI DEPLOY - SYNK-IA

## ✅ PRE-REQUISITOS COMPLETADOS

- ✅ `npm install` ejecutado
- ✅ `npm run build` compilado sin errores (6 rutas)
- ✅ Proyecto listo en modo `standalone`
- ✅ `.env` configurado con variables de producción

---

## 📋 PASOS EN EL PANEL DE ABACUS AI

### PASO 1: Iniciar Deploy

1. Ve a **[Abacus AI Panel](https://app.abacusai.com)**
2. Selecciona tu app o crea una nueva
3. Busca el botón **"Deploy" / "Publicar aplicación"**
4. Abacus ejecutará:
   - `npm install`
   - `npm run build`
   - Empaquetará y desplegará

### PASO 2: Obtener URL Pública

Cuando el deploy termine, **Abacus te mostrará una URL** tipo:
```
https://<nombre-app>.abacusai.app
```

✏️ **GUARDA ESTA URL** — la necesitarás para configurar los dominios personalizados.

---

## 📋 PASO 3: Configurar Variables de Entorno en Abacus

En la sección **Environment Variables** del deployment, **ingresa exactamente estas**:

```
NEXT_PUBLIC_APP_HOST=app.sinkialabs.com
NEXT_PUBLIC_ORDERING_HOST=pedir.sinkialabs.com
NEXT_PUBLIC_WHATSAPP_PHONE=34XXXXXXXXX
NEXT_PUBLIC_ADMIN_PIN=XXXX
DATABASE_URL=
NODE_ENV=production
```

**Notas importantes:**
- `NEXT_PUBLIC_WHATSAPP_PHONE`: Reemplaza `34XXXXXXXXX` con el número real (sin `+`, sin espacios)
- `NEXT_PUBLIC_ADMIN_PIN`: Usa un PIN seguro, **no dejes `1234`**
- `DATABASE_URL`: Déjalo vacío (modo "solo WhatsApp", sin persistencia en BD)

---

## 📋 PASO 4: Añadir Dominios Personalizados

En **Custom Domains** del panel de Abacus:

1. Haz clic en **"Add Domain"** o **"+ Añadir Dominio"**
2. Ingresa: `pedir.sinkialabs.com`
3. Haz clic en **"Add Domain"** de nuevo
4. Ingresa: `app.sinkialabs.com`

Para **cada dominio**, Abacus mostrará:
- Un **CNAME target** (ej: `tu-app-123.abacusai.app`)
- O un **TXT record de verificación** (si lo pide)

✏️ **COPIA ESTOS VALORES** — los usarás en el paso 5.

---

## 📋 PASO 5: Configurar DNS en tu Proveedor

Accede al panel de tu proveedor de `sinkialabs.com` (GoDaddy, Cloudflare, IONOS, Namecheap, etc.)

**Crea dos registros CNAME:**

| Tipo | Nombre/Host | Valor/Destino | TTL |
|------|---|---|---|
| `CNAME` | `pedir` | *[valor de Abacus]* | Auto / 3600 |
| `CNAME` | `app` | *[valor de Abacus]* | Auto / 3600 |

**Notas importantes:**
- El **Nombre/Host** es solo el subdominio (`pedir`, `app`), NO el dominio completo
- El **Valor/Destino** es exactamente lo que te mostró Abacus en el paso 4
- La **propagación DNS** puede tardar de minutos a horas

---

## ✅ PASO 6: Verificación Final

Cuando Abacus marque los dominios como **"Verified" / "Verificados"** y el DNS haya propagado:

1. Abre en el navegador:
   ```
   https://pedir.sinkialabs.com
   ```
   **Debes ver:** El sistema de pedidos online (carta, carrito, WhatsApp)

2. Abre en el navegador:
   ```
   https://app.sinkialabs.com
   ```
   **Debes ver:** El Command Center (ERP completo)

---

## 🆘 SOLUCIÓN DE PROBLEMAS

| Problema | Solución |
|---|---|
| "Domain verification failed" | Verifica que el CNAME en DNS apunte exactamente al valor de Abacus |
| "DNS not propagating" | Espera 1-2 horas; algunos proveedores tardan más |
| "404 en los dominios" | Asegúrate de que el deployment en Abacus está en estado "Active/Activo" |
| "WhatsApp no funciona" | Verifica que `NEXT_PUBLIC_WHATSAPP_PHONE` tenga el formato correcto: `34XXXXXXXXX` |

---

## 📞 RESUMEN

```
✅ Código compilado y listo
📝 Ingresa en Abacus AI panel
🚀 Deploy → obtener URL pública
⚙️ Configurar 6 variables de entorno
🌐 Añadir 2 dominios personalizados
🔗 Crear 2 registros CNAME en DNS
⏳ Esperar propagación DNS
✨ Verificar en https://pedir.sinkialabs.com y https://app.sinkialabs.com
```

---

*Preparado para SYNK-IA · Chicken Palace Ibiza*
