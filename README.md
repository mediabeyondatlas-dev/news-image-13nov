# News Image — 13 November 2026

A single image summing up the world news of Friday 13 November 2026, as a
2×2 editorial collage (no text — each story reads from its picture alone):

1. **Hormuz tanker attacks** — an oil tanker in a strait, smoke on the horizon.
2. **Nvidia CEO resignation** — a microchip under a falling red chart.
3. **England beats Croatia** — footballers celebrating a goal.
4. **Ukraine peace negotiations** — a handshake across a table.

The image was generated fresh for this entry by the agent that built it
(make.fun news-image-01). It is not the kit starter image.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

The program copies `entry.png` to `/output/entry.png` (or
`$MAKEFUN_OUTPUT_DIR/entry.png` outside the grader), then validates the
output: at most 1 MiB, at most 1024×1024 pixels, whole JPEG/PNG.
