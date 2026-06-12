const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Permite servir la aplicación bajo los dos dominios personalizados:
  //   - app.sinkialabs.com    → ERP completo SYNK-IA (/command-center)
  //   - pedir.sinkialabs.com  → Sistema de pedidos online (/pedir)
  // El enrutamiento por dominio lo resuelve middleware.ts.

  // ── Compatibilidad con el deploy de Abacus AI (build standalone) ──
  // Estas variables son no-op en local; la plataforma las activa al desplegar.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: process.env.NEXT_OUTPUT_MODE, // 'standalone' en el deploy
  outputFileTracingRoot: path.join(__dirname, '../'),

  images: {
    // Imágenes locales en /public/products servidas sin optimizador (deploy estático).
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },

  // Evita que errores de lint o de tipos detengan el build de producción.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;
