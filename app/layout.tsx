import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LOGICAV | Climatización e ingeniería",
  description:
    "Instalación, mantención y soluciones de climatización para empresas y sector público.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}