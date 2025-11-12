import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Babosas del Futuro - Escape Room Energías Renovables",
  description: "Un viaje educativo sobre energías renovables y reciclaje",
  keywords: ["energías renovables", "reciclaje", "educación", "escape room"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
