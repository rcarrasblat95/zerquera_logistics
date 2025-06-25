import "./globals.css";
import { MapProvider } from "./context/MapContext"; // importa el contexto

export const metadata = {
  title: "Mapa con distancia",
  description: "Next.js + Leaflet + ORS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="overflow-x-hidden">
        <MapProvider>{children}</MapProvider>
      </body>
    </html>
  );
}