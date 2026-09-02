#!/usr/bin/env python3
"""
Normaliza un logo de marca para la franja "Marcas que atendemos".

Los archivos de logo llegan en cualquier estado: unos con fondo blanco
horneado, otros con alfa y mucho relleno vacío, cada uno con su color y su
proporción. Puestos en celdas iguales se ven desalineados, que es
exactamente lo que hace ver barata una tira de marcas.

Este script deja todos en el mismo estado:

  1. Quita el fondo. Si el archivo es opaco, toma el color de la esquina
     como fondo y calcula el alfa por distancia RGB, así conserva el
     antialias del borde en vez de dejarlo dentado.
  2. Recorta al contenido real, para que la proporción que declara el
     archivo sea la del logo y no la del lienzo.
  3. Aplana a un solo tono. Es lo que hace que la fila se vea deliberada:
     con los colores originales, un logo azul intenso y otro celeste
     pálido nunca van a pesar lo mismo.

Limitación: asume marcas de un color sobre fondo plano. Un logo con texto
blanco calado dentro de una forma sólida perdería el calado; ésos hay que
revisarlos a mano.

Uso:
    python scripts/normalizar-logo.py public/images/brands/trane.png
    python scripts/normalizar-logo.py public/images/brands/*.png
"""

import sys
from pathlib import Path

from PIL import Image

# steel-500 del sistema de diseño. Sobre celdas blancas es suficientemente
# sólido para leerse y suficientemente calmado para no competir con el
# contenido de la página.
TONO = (91, 115, 133)  # #5b7385

# Margen que se deja alrededor del contenido, como fracción del lado menor.
MARGEN = 0.02


def distancia(c, ref):
    return sum((a - b) ** 2 for a, b in zip(c, ref)) ** 0.5


def normalizar(ruta: Path) -> None:
    im = Image.open(ruta).convert("RGBA")
    w, h = im.size
    px = im.load()

    alfa_original = im.getchannel("A")
    valores = (
        list(alfa_original.get_flattened_data())
        if hasattr(alfa_original, "get_flattened_data")
        else list(alfa_original.getdata())
    )
    era_opaco = all(a == 255 for a in valores)

    if era_opaco:
        fondo = px[0, 0][:3]
        # Se normaliza por el píxel más lejano del fondo para que un logo
        # de color suave no quede translúcido entero.
        lejos = max(
            distancia(px[x, y][:3], fondo)
            for y in range(0, h, 2)
            for x in range(0, w, 2)
        ) or 1.0
        salida = Image.new("RGBA", (w, h))
        dst = salida.load()
        for y in range(h):
            for x in range(w):
                a = distancia(px[x, y][:3], fondo) / lejos
                dst[x, y] = (*TONO, round(min(1.0, a) * 255))
    else:
        # Ya tiene alfa: se respeta y solo se cambia el color.
        salida = Image.new("RGBA", (w, h))
        dst = salida.load()
        for y in range(h):
            for x in range(w):
                dst[x, y] = (*TONO, px[x, y][3])

    caja = salida.getchannel("A").getbbox()
    if caja is None:
        print(f"  {ruta.name}: quedó vacío, se deja como estaba")
        return

    m = max(1, round(min(w, h) * MARGEN))
    caja = (
        max(0, caja[0] - m),
        max(0, caja[1] - m),
        min(w, caja[2] + m),
        min(h, caja[3] + m),
    )
    salida = salida.crop(caja)
    salida.save(ruta, optimize=True)

    nw, nh = salida.size
    origen = "opaco" if era_opaco else "con alfa"
    print(f"  {ruta.name:14} {w}x{h} ({origen}) -> {nw}x{nh}  aspecto {nw / nh:.2f}")


def main() -> int:
    rutas = [Path(a) for a in sys.argv[1:]]
    if not rutas:
        print(__doc__)
        return 1

    faltan = [r for r in rutas if not r.exists()]
    if faltan:
        for r in faltan:
            print(f"no existe: {r}", file=sys.stderr)
        return 1

    print(f"Aplanando a #{TONO[0]:02x}{TONO[1]:02x}{TONO[2]:02x}:")
    for r in rutas:
        normalizar(r)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
