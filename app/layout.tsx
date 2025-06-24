import "./globals.css";
import "leaflet/dist/leaflet.css";

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
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}