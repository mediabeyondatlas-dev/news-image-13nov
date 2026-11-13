// News-image-01 entry (Node 22, standard library only): the image is the
// entry.png beside this file, and the program copies it to /output/entry.png.
// The image is a 2x2 editorial collage summing up the world news of Friday
// 13 November 2026: Hormuz tanker attacks, Nvidia CEO resignation, England
// beats Croatia, Ukraine peace-talks handshake.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Read the image dimensions: JPEG SOF0/SOF2 markers, or the PNG IHDR chunk.
function dimensions(buf: Buffer): [number, number] {
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) break;
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
      }
      i += 2 + len;
    }
    throw new Error('no JPEG SOF marker found');
  }
  if (buf.subarray(1, 4).toString() === 'PNG') {
    return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  }
  throw new Error('not a JPEG or PNG');
}

const out = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
copyFileSync(new URL('./entry.png', import.meta.url), out);

// Validate the output the gate checks: whole file, at most 1 MiB, at most 1024x1024.
const { size } = statSync(out);
if (size > 1048576) throw new Error(`entry.png too big: ${size} bytes`);
const buf = readFileSync(out);
const [w, h] = dimensions(buf);
if (w > 1024 || h > 1024) throw new Error(`entry.png too large: ${w}x${h}`);
console.log(`wrote ${out}: ${w}x${h}, ${size} bytes`);
