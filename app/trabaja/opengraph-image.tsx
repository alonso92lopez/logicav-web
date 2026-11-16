import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { trabaja } from "@/lib/content";

/*
  Imagen de la vista previa de /trabaja en Facebook y WhatsApp (pedido de
  RRHH, 16-11-2026). Se genera con la letra del sitio (Barlow Condensed,
  licencia OFL en assets/fonts/OFL.txt) y sin fotos.
*/
/* La URL de la imagen lleva un código que Next saca de ESTE archivo, no de
   content.ts. Si cambia el texto de la tarjeta, subir VERSION: así cambia la
   URL y Facebook no sigue mostrando la imagen vieja.
   v2 (16-11-2026): pie «Pago todos los viernes · Postula en 2 minutos». */
const VERSION = 2;
export const alt = trabaja.compartir.titulo;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#0b2540";
const NAVY_LINEA = "#1d4363";
const FLAME = "#e8590c";
const STEEL = "#87a6be";

export default async function Image() {
  const [barlow, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/BarlowCondensed-Bold.ttf")),
    readFile(join(process.cwd(), "public/images/brand/logo.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        data-version={VERSION}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: NAVY,
          borderBottom: `14px solid ${FLAME}`,
          padding: "60px 72px 52px",
          fontFamily: "Barlow",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 76,
              height: 76,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={52} height={52} alt="" />
          </div>
          <div style={{ fontSize: 44, color: "white", letterSpacing: 4 }}>LOGICAV</div>
          <div style={{ flexGrow: 1 }} />
          <div style={{ fontSize: 30, color: FLAME, letterSpacing: 5, textTransform: "uppercase" }}>
            Santiago, Chile
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {trabaja.titulo.map((linea) => (
            <div
              key={linea}
              style={{ fontSize: 86, lineHeight: 1.02, whiteSpace: "nowrap", color: "white", textTransform: "uppercase" }}
            >
              {linea}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            borderTop: `2px solid ${NAVY_LINEA}`,
            paddingTop: 28,
            fontSize: 40,
            color: STEEL,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          <span style={{ color: FLAME, marginRight: 18 }}>›</span>
          {trabaja.compartir.imagenPie}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Barlow", data: barlow, style: "normal", weight: 700 }],
    }
  );
}
