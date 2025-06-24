import "./globals.css";
import "leaflet/dist/leaflet.css";

export const metadata = {
  title: "Mapa con distancia",
  description: "Next.js + Leaflet + ORS",
  viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}