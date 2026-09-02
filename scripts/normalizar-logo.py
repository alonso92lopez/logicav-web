#!/usr/bin/env python3
"""
Normaliza un logo de marca para la franja "Marcas que atendemos".

Los archivos de logo llegan en cualquier estado: PNG, JPG, WEBP, AVIF o SVG,
unos con fondo blanco horneado, otros con alfa y mucho relleno vacío, cada uno
con su color y su proporción. Puestos en celdas iguales se ven desalineados,
que es justo lo que hace ver barata una tira de marcas.

Este script los deja a todos en el mismo estado:

  1. Abre cualquiera de esos formatos. Los SVG se rasterizan a 1200 px de
     ancho, que da margen de sobra para una celda de ~200 px.

  2. Calcula el alfa por lejanía del blanco, multiplicado por el alfa que ya
     traía. Tratar el blanco como hueco es lo que hace funcionar los logos
     calados: en TCL o Carrier las letras son blancas dentro de una forma
     sólida, y con este criterio quedan como agujeros en vez de desaparecer
     cuando se aplana el color. Como es una transición continua y no un
     umbral, el antialias del borde se conserva.

  3. Recorta al contenido real, para que la proporción que declara el archivo
     sea la del logo y no la del lienzo.

  4. Aplana a un solo tono. Es lo que hace que la fila se vea deliberada: con
     los colores originales, un logo rojo intenso y otro celeste pálido nunca
     van a pesar lo mismo.

No sirve para archivos con el damero de transparencia horneado en los píxeles
(pasa al guardar como JPG algo que se veía transparente en el navegador). Ahí
el damero es información real de la imagen y hay que conseguir otro archivo.

Uso:
    python scripts/normalizar-logo.py ~/Downloads/logos/trane.png
    python scripts/normalizar-logo.py ~/Downloads/logos/LG-Logo.webp lg

El segundo argumento es el slug de salida; si se omite se usa el nombre del
archivo. Siempre escribe en public/images/brands/<slug>.png.
"""

import io
import sys
from pathlib import Path

from PIL import Image

# steel-500 del sistema de diseño. Sobre celdas blancas es suficientemente
# sólido para leerse y suficientemente calmado para no competir con el
# contenido de la página.
TONO = (91, 115, 133)  # #5b7385

DESTINO = Path("public/images/brands")
MARGEN = 0.02          # margen alrededor del contenido, sobre el lado menor
ANCHO_SVG = 1200
PISO = 60.0            # evita amplificar ruido en logos muy claros

# Distancia al blanco bajo la cual un píxel se considera fondo y no tinta.
# Varios archivos vienen sobre un gris casi blanco en vez de blanco puro
# (Samsung llega en #f7f7f7, a distancia 13.9): sin este corte quedan con un
# recuadro gris visible. El ramo sigue siendo continuo por encima del umbral,
# así que el antialias del borde se conserva igual.
UMBRAL = 22.0


def distancia_al_blanco(c) -> float:
    return ((255 - c[0]) ** 2 + (255 - c[1]) ** 2 + (255 - c[2]) ** 2) ** 0.5


def abrir(ruta: Path) -> Image.Image:
    if ruta.suffix.lower() == ".svg":
        import cairosvg

        png = cairosvg.svg2png(url=str(ruta), output_width=ANCHO_SVG)
        return Image.open(io.BytesIO(png)).convert("RGBA")
    return Image.open(ruta).convert("RGBA")


def normalizar(ruta: Path, slug: str) -> None:
    im = abrir(ruta)
    w, h = im.size
    px = im.load()

    lejos = PISO
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            if px[x, y][3] > 8:
                d = distancia_al_blanco(px[x, y][:3])
                if d > lejos:
                    lejos = d

    rango = max(1.0, lejos - UMBRAL)
    salida = Image.new("RGBA", (w, h))
    dst = salida.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            cobertura = (distancia_al_blanco((r, g, b)) - UMBRAL) / rango
            cobertura = 0.0 if cobertura < 0 else min(1.0, cobertura)
            dst[x, y] = (*TONO, round((a / 255) * cobertura * 255))

    caja = salida.getchannel("A").getbbox()
    if caja is None:
        print(f"  {ruta.name}: quedó vacío tras el recorte, se omite")
        return

    m = max(1, round(min(w, h) * MARGEN))
    caja = (
        max(0, caja[0] - m),
        max(0, caja[1] - m),
        min(w, caja[2] + m),
        min(h, caja[3] + m),
    )
    salida = salida.crop(caja)

    DESTINO.mkdir(parents=True, exist_ok=True)
    final = DESTINO / f"{slug}.png"
    salida.save(final, optimize=True)

    nw, nh = salida.size
    print(f"  {ruta.name[:44]:46} -> {slug}.png  {nw}x{nh}  aspecto {nw / nh:.2f}")


def main() -> int:
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        return 1

    ruta = Path(args[0])
    if not ruta.exists():
        print(f"no existe: {ruta}", file=sys.stderr)
        return 1

    slug = args[1] if len(args) > 1 else ruta.stem.lower()
    print(f"Aplanando a #{TONO[0]:02x}{TONO[1]:02x}{TONO[2]:02x}:")
    normalizar(ruta, slug)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
