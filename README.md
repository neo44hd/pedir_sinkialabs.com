<div align="center">

# 🍗 SYNK-IA

### Sistema ERP Inteligente + Plataforma de Pedidos Online
**Chicken Palace Ibiza SL**

[![Stack](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](#-stack-tecnológico)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](#-stack-tecnológico)
[![Tailwind](https://img.shields.io/badge/TailwindCSS-3-38BDF8?logo=tailwindcss&logoColor=white)](#-stack-tecnológico)

</div>

---

## 📋 Índice

1. [Descripción del proyecto](#-descripción-del-proyecto)
2. [Sobre Chicken Palace Ibiza](#-sobre-chicken-palace-ibiza)
3. [Stack tecnológico](#-stack-tecnológico)
4. [Características principales](#-características-principales)
5. [Estructura del proyecto](#-estructura-del-proyecto)
6. [Instalación y configuración](#-instalación-y-configuración)
7. [Despliegues (app + pedir)](#-despliegues-separados)
8. [Guía de uso](#-guía-de-uso)
9. [Integración Revo XEF](#-integración-revo-xef)
10. [Credenciales de acceso](#-credenciales-de-acceso)
11. [Documentación adicional](#-documentación-adicional)

---

## 🎯 Descripción del proyecto

**SYNK-IA** es un sistema de gestión empresarial (ERP) inteligente, diseñado a medida para
**Chicken Palace Ibiza SL**. Unifica en una sola plataforma la operativa completa de un
restaurante moderno: gestión financiera, recursos humanos, control de producción, email
inteligente, agentes de IA y un **sistema de pedidos online** orientado al cliente final.

El proyecto se divide en **dos experiencias diferenciadas** que se despliegan por separado:

| Aplicación | Dominio | Público | Propósito |
|------------|---------|---------|-----------|
| 🏢 **SYNK-IA ERP** | `app.sinkialabs.com` | Equipo / Dirección | Panel de control interno completo (back office) |
| 🛒 **Pedidos Online** | `pedir.sinkialabs.com` | Clientes | Carta digital y realización de pedidos (`/pedir`) |

---

## 🐔 Sobre Chicken Palace Ibiza

**Chicken Palace Ibiza SL** es un restaurante especializado en pollo asado y comida para
llevar ubicado en Ibiza. SYNK-IA digitaliza su operativa diaria — desde la toma de pedidos
y la sincronización con el TPV (Revo XEF) hasta la gestión de facturas, nóminas y
proveedores — apoyándose en agentes de inteligencia artificial para automatizar tareas
repetitivas y ofrecer una visión ejecutiva en tiempo real.

- 📧 Contacto corporativo: **info@chickenpalace.es**
- 🧾 TPV / Punto de venta: **Revo XEF**
- 📦 Categorías de menú gestionadas: **COMIDA** y **BEBIDA**

---

## 🛠 Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| **Framework Frontend** | React 18 + Vite 6 |
| **Routing** | React Router DOM 7 |
| **Estilos** | Tailwind CSS 3 + `tailwindcss-animate` |
| **Componentes UI** | Radix UI + shadcn/ui (`components.json`) |
| **Iconos** | lucide-react |
| **Animaciones** | Framer Motion |
| **Gráficas** | Recharts |
| **Formularios** | React Hook Form + Zod |
| **Estado / Datos** | TanStack React Query + SDK de backend |
| **Notificaciones UI** | Sonner |
| **Integración TPV** | Revo XEF API |
| **Mensajería** | WhatsApp Business |
| **Almacenamiento** | Amazon S3 |
| **Email** | Gmail + triaje con IA |
| **Calidad** | ESLint 9 |

> **Nota técnica:** El frontend (este repositorio) es una SPA de Vite + React que se comunica
> con el backend de servicios mediante el cliente SDK configurado en `src/api/`. El App ID y
> el endpoint del backend se definen vía variables de entorno (`VITE_APP_ID`,
> `VITE_API_URL`). Las integraciones con Revo XEF, WhatsApp, S3 y los LLM se ejecutan en
> funciones del lado servidor.

---

## ✨ Características principales

### 📊 Dashboard ejecutivo
- Visión 360° del negocio en tiempo real (`Dashboard`, `SystemOverview`, `ExecutiveReports`).
- Métricas de caja, productos más vendidos y alertas consolidadas.

### 🤖 Agentes de IA
- Agente central (`CentralAgent`, `CEOBrain`) que coordina tareas automatizadas.
- Auto-procesamiento con reglas de confianza (alta confianza → automático; baja → revisión manual).
- Hub de automatizaciones (`AutomationHub`) y comandos por voz (`VoiceCommands`).

### 💰 Gestión financiera
- Facturación y gestor de facturas (`Billing`, `Invoices`, `GestorFacturas`).
- Albaranes (`Albaranes`), análisis de negocio (`BusinessAnalysis`, `FinanceDashboard`).
- VeriFactu (`VeriFactu`) y comparador de proveedores (`Comparator`, `Providers`).

### 👥 Recursos Humanos (RRHH)
- Personal y fichajes (`Staff`, `AttendanceControl`, `Timesheets`).
- Nóminas (`Payrolls`), contratos (`Contracts`), vacaciones (`VacationRequests`).
- Agente de RRHH (`HRAgent`, `HRDocuments`), mutua (`MutuaManager`).

### 📧 Email inteligente
- Buzón inteligente y triaje automático (`SmartMailbox`, `EmailTriage`, `EmailProcessor`).
- Configuración de cuentas (`EmailSetup`).

### 🛒 Sistema de pedidos online (`/pedir`)
- Carta digital con categorías **COMIDA** y **BEBIDA**, carrito y modal de producto.
- Panel de pedidos (`OrdersDashboard`) y pantalla de cocina (`KitchenDisplay`).
- Confirmación de pedidos vía **WhatsApp**.

### 🔗 Integración Revo XEF
- Sincronización del menú (`RevoSync`, `RevoDashboard`, `RevoManual`).
- Sincronización web (`WebSync`) e inventario de producto (`ProductInventory`).

### 📁 Archivo y cumplimiento
- Archivo documental inteligente (`DocumentArchive`, `CompanyDocs`).
- Caja fuerte legal (`LegalVault`), RGPD (`RGPDManager`), portal de gestoría (`PortalGestoria`).

### 🔐 Otros módulos
- Cámaras de seguridad (`SecurityCameras`), control de producción (`ProductionControl`),
  interfaz para trabajadores (`WorkerInterface`, `WorkerMobile`, `EmployeeHome`) y
  diagnósticos de conexión/API (`ApiDiagnostics`, `ConnectionDiagnostics`).

---

## 📂 Estructura del proyecto

```
pedir_sinkialabs.com/
├── public/                     # Recursos estáticos
├── src/
│   ├── api/                    # Cliente SDK y entidades de datos
│   │   ├── entities.js         # Entidades de datos
│   │   ├── functions.js        # Funciones backend
│   │   └── integrations.js     # Integraciones (Revo, email, etc.)
│   ├── components/             # Componentes reutilizables
│   │   ├── agents/             # Componentes de agentes IA
│   │   ├── dashboard/          # Widgets del dashboard
│   │   ├── staff/              # Componentes de RRHH
│   │   ├── worker/             # Interfaz de trabajadores
│   │   └── ui/                 # Librería UI (shadcn/Radix)
│   ├── hooks/                  # Hooks de React
│   ├── lib/                    # Utilidades
│   ├── pages/                  # Páginas / rutas (50+ módulos)
│   │   ├── Dashboard.jsx       # Panel ejecutivo
│   │   ├── OrdersDashboard.jsx # Gestión de pedidos
│   │   ├── RevoSync.jsx        # Sincronización Revo XEF
│   │   ├── SmartMailbox.jsx    # Email inteligente
│   │   └── ...                 # (Finanzas, RRHH, IA, etc.)
│   ├── App.jsx                 # Componente raíz
│   └── main.jsx                # Punto de entrada
├── docs/                       # Documentación técnica del proyecto
├── .env.example                # Plantilla de variables de entorno
├── components.json             # Configuración shadcn/ui
├── tailwind.config.js          # Configuración de Tailwind
├── vite.config.js              # Configuración de Vite
└── package.json
```

---

## ⚙️ Instalación y configuración

### Requisitos previos
- **Node.js** ≥ 18
- **npm** ≥ 9 (o `yarn` / `pnpm`)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/neo44hd/pedir_sinkialabs.com.git
cd pedir_sinkialabs.com

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
#    Edita .env con los valores reales (App ID, Revo, WhatsApp, S3, etc.)

# 4. Arrancar en desarrollo
npm run dev
#    Disponible en http://localhost:5173

# 5. Build de producción
npm run build

# 6. Previsualizar el build
npm run preview
```

| Script | Acción |
|--------|--------|
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Compila a `dist/` |
| `npm run preview` | Sirve el build de producción |
| `npm run lint` | Análisis estático con ESLint |

---

## 🚀 Despliegues separados

SYNK-IA está pensado para desplegarse como **dos aplicaciones independientes** que comparten
el mismo código base pero exponen experiencias distintas:

### 1️⃣ `app.sinkialabs.com` — ERP completo (back office)
- **Audiencia:** equipo interno y dirección.
- **Acceso:** requiere autenticación de usuario.
- **Contenido:** todos los módulos (dashboard, finanzas, RRHH, agentes IA, email, etc.).
- **Build:** `npm run build` y servir `dist/` bajo el dominio `app.sinkialabs.com`.

### 2️⃣ `pedir.sinkialabs.com` — Pedidos online (cliente final)
- **Audiencia:** clientes del restaurante.
- **Acceso:** público, ruta principal `/pedir`.
- **Contenido:** carta digital (COMIDA / BEBIDA), carrito, checkout y confirmación por WhatsApp.
- **Build:** mismo proyecto, exponiendo la ruta `/pedir` como página de inicio del dominio.

> **Rutas clave:** la ruta `/pedir` corresponde al sistema de pedidos online
> (dominio `pedir.sinkialabs.com`) y la ruta `/command-center` al panel de control
> interno (dominio `app.sinkialabs.com`).

> **ℹ️ Nota sobre el contenido de este repositorio:**
> Este repositorio contiene el **código fuente** de SYNK-IA (Vite + React, editable y
> mantenible) junto con los **assets reales de producto** en `public/products/`
> (53 imágenes: pollo asado, croquetas, ensaladas, bebidas, postres, etc.) listos para
> la carta digital de `pedir.sinkialabs.com`.

#### Recomendación de configuración
Al separar los deploys, usa la variable `VITE_APP_ID` y las claves de integración
propias de cada entorno en su respectivo `.env`. El deploy de `pedir.` solo necesita las
credenciales de Revo XEF (menú) y WhatsApp (confirmación de pedidos); el deploy de `app.`
necesita el conjunto completo (S3, Gmail, IA, etc.).

---

## 📖 Guía de uso

### Para clientes — pedir.sinkialabs.com
1. Accede a **`/pedir`**.
2. Explora la carta organizada por categorías **COMIDA** y **BEBIDA**.
3. Añade productos al carrito desde el modal de producto.
4. Revisa el carrito y confirma el pedido.
5. Recibe la confirmación por **WhatsApp**.

### Para el equipo — app.sinkialabs.com
1. Inicia sesión con tu cuenta autorizada.
2. **Dashboard:** consulta métricas de caja, ventas y alertas del día.
3. **Pedidos (`OrdersDashboard` / `KitchenDisplay`):** gestiona y despacha los pedidos entrantes.
4. **Revo Sync:** sincroniza el menú y las ventas con el TPV Revo XEF.
5. **Email inteligente:** revisa el buzón con triaje automático por IA.
6. **Finanzas / RRHH:** gestiona facturas, albaranes, nóminas, fichajes y contratos.
7. **Agentes IA:** delega tareas repetitivas al agente central.

---

## 🔄 Integración Revo XEF

SYNK-IA se sincroniza con el TPV **Revo XEF** para mantener el menú y las ventas alineadas:

- **Categorías sincronizadas:** `COMIDA` y `BEBIDA`.
- **Auto-procesamiento con umbrales de confianza:**
  - `≥ 0.90` → procesado automático.
  - `0.70 – 0.90` → requiere revisión manual.
- **Módulos relacionados:** `RevoSync`, `RevoDashboard`, `RevoManual`, `WebSync`, `ProductInventory`.

> La última tarea de mantenimiento documentada fue la **sincronización del menú de Revo XEF
> con las categorías COMIDA y BEBIDA**.

---

## 🔐 Credenciales de acceso

> ⚠️ **Importante:** por seguridad, las contraseñas reales **NO** se almacenan en este
> repositorio. Configúralas únicamente en tu archivo `.env` local (basado en `.env.example`),
> que está excluido por `.gitignore`. A continuación se listan **solo los identificadores**;
> solicita las contraseñas al administrador del sistema.

| Servicio | Usuario / Cuenta | Contraseña |
|----------|------------------|------------|
| **Revo XEF** | `chickenpalaceibiza2` | *(ver `.env` — variable `REVO_XEF_PASSWORD`)* |
| **Gmail corporativo** | `info@chickenpalace.es` | *(OAuth — ver variables `GMAIL_OAUTH_*`)* |
| **Backend / SDK** | App ID en `VITE_APP_ID` | *(gestionado por la plataforma de backend)* |

🔒 **Buenas prácticas:**
- Nunca hagas commit del archivo `.env`.
- Rota las credenciales periódicamente.
- Usa secretos del proveedor de hosting para los despliegues de producción.

---

## 📚 Documentación adicional

La documentación funcional del proyecto está recogida en este propio README:
descripción, stack, instalación, despliegues separados (`app.sinkialabs.com` y
`pedir.sinkialabs.com`), características, guía de uso e integración con Revo XEF.

> Para dudas operativas internas, contacta con el administrador del sistema en
> **info@chickenpalace.es**.

---

<div align="center">

**SYNK-IA** · Desarrollado para **Chicken Palace Ibiza SL** 🍗
_Sinkia Labs — `app.sinkialabs.com` · `pedir.sinkialabs.com`_

</div>
