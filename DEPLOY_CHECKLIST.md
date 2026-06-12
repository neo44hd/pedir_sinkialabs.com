# ✅ CHECKLIST DE DEPLOY - SYNK-IA

## Estado Actual: ✅ LISTO PARA DEPLOY

```
✅ npm install completado
✅ npm run build exitoso (6 rutas compiladas)
✅ next.config.js configurado (standalone ready)
✅ middleware.ts para enrutamiento por dominio
✅ .env con variables de producción (sin WhatsApp por ahora)
✅ Archivos de documentación preparados
```

---

## 📁 Archivos de Referencia Locales

En esta carpeta tienes:

| Archivo | Propósito |
|---|---|
| `ABACUS_DEPLOY_STEPS.md` | Guía paso a paso para el panel de Abacus AI |
| `ENV_VARS_FOR_ABACUS.txt` | Variables de entorno listas para copiar |
| `DEPLOY.md` | Documentación original del proyecto |
| `SOLUCION_DEPLOY.md` | Documentación de soluciones |
| `.next/` | Build compilado (listo para enviar a Abacus) |
| `.env` | Variables de entorno (WhatsApp vacío por ahora) |

---

## 🚀 PRÓXIMOS PASOS (en Abacus AI)

### 1️⃣ DEPLOY EN ABACUS
- [ ] Acceder a https://app.abacusai.com
- [ ] Clickear en "Deploy" o "Publicar aplicación"
- [ ] **Guardar URL pública** que Abacus muestre

### 2️⃣ CONFIGURAR VARIABLES DE ENTORNO
- [ ] En Environment Variables, copiar exactamente:
```
NEXT_PUBLIC_APP_HOST=app.sinkialabs.com
NEXT_PUBLIC_ORDERING_HOST=pedir.sinkialabs.com
NEXT_PUBLIC_WHATSAPP_PHONE=34XXXXXXXXX  (cambiar por número real)
NEXT_PUBLIC_ADMIN_PIN=XXXX              (cambiar por PIN seguro)
DATABASE_URL=
NODE_ENV=production
```

### 3️⃣ AÑADIR DOMINIOS PERSONALIZADOS
- [ ] En Custom Domains: `pedir.sinkialabs.com`
- [ ] En Custom Domains: `app.sinkialabs.com`
- [ ] **Copiar valores CNAME** que Abacus muestre

### 4️⃣ CONFIGURAR DNS
En tu proveedor de `sinkialabs.com`:
- [ ] Crear CNAME `pedir` → valor Abacus
- [ ] Crear CNAME `app` → valor Abacus

### 5️⃣ ESPERAR Y VERIFICAR
- [ ] Esperar propagación DNS (1-2 horas)
- [ ] Verificar https://pedir.sinkialabs.com (sistema de pedidos)
- [ ] Verificar https://app.sinkialabs.com (Command Center)

---

## 📊 DETALLES TÉCNICOS

### Rutas Compiladas
```
/                    → Home
/_not-found          → Página 404
/api/orders          → API de pedidos
/command-center      → ERP / Dashboard
/pedir               → Sistema de pedidos online
```

### Tamaño del Build
- First Load JS: ~96-145 kB (según ruta)
- Chunks compartidos: ~87 kB
- Middleware: 26.5 kB

### Modo de Operación
- **Enrutamiento**: Por dominio (middleware.ts)
- **Base de datos**: Opcional (DATABASE_URL vacío = sin persistencia)
- **Almacenamiento de pedidos**: WhatsApp + localStorage (navegador)
- **Imágenes**: Locales en `/public/products/` (unoptimized)

---

## ⚠️ COSAS A RECORDAR

### Antes del Deploy
- [ ] Cambiar WHATSAPP_PHONE por número real
- [ ] Cambiar ADMIN_PIN por PIN seguro
- [ ] Tener acceso a panel DNS de sinkialabs.com

### Durante el Deploy
- [ ] Guardar URL pública de Abacus
- [ ] Copiar exactamente variables de entorno
- [ ] No añadir valores innecesarios

### Después del Deploy
- [ ] Esperar propagación DNS
- [ ] Probar ambos dominios
- [ ] Verificar WhatsApp integration
- [ ] Verificar PIN de admin

---

## 🆘 PROBLEMAS COMUNES

| Problema | Solución |
|---|---|
| Build falla en Abacus | Verificar que `npm install` y `npm run build` funcionan localmente ✅ |
| Dominios no se verifican | Esperar más tiempo; algunos DNS tardan 1-2 horas |
| 404 al acceder a dominios | Asegurar que deployment en Abacus está "Active" |
| WhatsApp no envía | Verificar formato: `34XXXXXXXXX` sin espacios ni `+` |
| Imagen de productos no se carga | Verificar que `/public/products/` tenga las imágenes |

---

## 📞 CONTACTO & SOPORTE

- **Proyecto**: SYNK-IA
- **Empresa**: Chicken Palace Ibiza SL
- **Autor**: David Roldan
- **Build Date**: 2026-06-12
- **Status**: ✅ Listo para producción

---

## 🎯 RESUMEN RÁPIDO

```
Local:     ✅ Compilado → .next/ listo
Abacus:    📝 Requiere deploy manual en panel
DNS:       🔗 Requiere 2 CNAME records
Resultado: 🌍 https://pedir.sinkialabs.com & https://app.sinkialabs.com
```

---

*Preparado por Oz · Deploy Assistant*
*Última verificación: 2026-06-12 14:12*
