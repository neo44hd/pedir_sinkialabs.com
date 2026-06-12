import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SYNK-IA · Command Center",
  description: "Panel de gestión ERP de Chicken Palace Ibiza",
};

/**
 * Command Center (app.sinkialabs.com)
 * ------------------------------------
 * Monta el ERP completo de SYNK-IA (construido con Vite + base44) servido como
 * contenido estático desde /public/erp. Se incrusta a pantalla completa para
 * que comparta dominio con el resto de la plataforma Next.js.
 */
export default function CommandCenterPage() {
  return (
    <div className="fixed inset-0 h-screen w-screen bg-white">
      <iframe
        src="/erp/index.html"
        title="SYNK-IA Command Center"
        className="h-full w-full border-0"
        allow="clipboard-read; clipboard-write; fullscreen; geolocation; microphone; camera"
      />
    </div>
  );
}
