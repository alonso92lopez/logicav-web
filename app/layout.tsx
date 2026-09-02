import type { Metadata } from "next";
import { Barlow_Condensed, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

/* Transitoria: solo la usan las clases .kicker y .step-num de la paleta
   anterior, que se van cuando /equipos quede repintada. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.logicav.cl"),
  title: {
    default: "LOGICAV | Climatización e ingeniería",
    template: "%s | LOGICAV",
  },
  description:
    "Instalación, mantención y proyectos de climatización para hogar, empresas y faena. Equipos inverter Anwo, Midea y Clark con instalación certificada.",
  keywords: [
    "climatización",
    "aire acondicionado",
    "HVAC",
    "instalación aire acondicionado",
    "mantención climatización",
    "minería",
    "Chile",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://www.logicav.cl",
    siteName: "LOGICAV",
    title: "LOGICAV | Climatización e ingeniería",
    description:
      "Instalación, mantención y proyectos de climatización para hogar, empresas y faena.",
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
      lang="es-CL"
      className={`${barlow.variable} ${plex.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
