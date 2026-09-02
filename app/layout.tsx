import type { Metadata } from "next";
import { Inter, Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  // [POR VALIDAR] dominio definitivo
  metadataBase: new URL("https://logicav.cl"),
  title: {
    default:
      "LOGICAV — Mantención y climatización para empresas | Santiago, RM",
    template: "%s | LOGICAV",
  },
  description:
    "Mantención preventiva y correctiva, instalación y proyectos de climatización para empresas, edificios e instituciones en la Región Metropolitana. Informe técnico y trazabilidad por equipo.",
  keywords: [
    "mantención aire acondicionado empresas",
    "climatización Santiago",
    "mantención preventiva HVAC",
    "instalación aire acondicionado comercial",
    "contrato de mantención climatización",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "LOGICAV",
    title: "LOGICAV — Mantención y climatización para empresas",
    description:
      "Instalación, mantención preventiva y correctiva de climatización para empresas, edificios e instituciones. Región Metropolitana.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${interTight.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
