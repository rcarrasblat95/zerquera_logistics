import "./globals.css";
import "leaflet/dist/leaflet.css"; // está bien importado aquí

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
      <body>{children}</body>
    </html>
  );
}