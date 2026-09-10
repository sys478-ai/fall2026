/** Approximate node footprint used for empty-slot placement. */
const FOOTPRINT: Record<string, { w: number; h: number }> = {
  switch: { w: 110, h: 90 },
  and: { w: 130, h: 110 },
  or: { w: 130, h: 110 },
  xor: { w: 140, h: 110 },
  not: { w: 120, h: 100 },
  bulb: { w: 110, h: 150 },
  label: { w: 160, h: 80 },
};

function footprintFor(type: string | undefined) {
  return FOOTPRINT[type ?? ''] ?? { w: 140, h: 120 };
}

function boxesOverlap(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number },
  gap = 16
) {
  return !(
    a.x + a.w + gap <= b.x ||
    b.x + b.w + gap <= a.x ||
    a.y + a.h + gap <= b.y ||
    b.y + b.h + gap <= a.y
  );
}

/**
 * Prefer an empty slot inside the visible flow viewport, near the center.
 * Falls back to the viewport center if nothing free is found.
 */
export function findEmptyViewportPosition({
  nodes,
  type,
  topLeft,
  bottomRight,
  center,
}: {
  nodes: { type?: string; position: { x: number; y: number } }[];
  type: string;
  topLeft: { x: number; y: number };
  bottomRight: { x: number; y: number };
  center: { x: number; y: number };
}): { x: number; y: number } {
  const size = footprintFor(type);
  const margin = 24;
  const stepX = Math.max(size.w + 24, 150);
  const stepY = Math.max(size.h + 24, 130);

  const occupied = nodes.map(node => {
    const fp = footprintFor(node.type);
    return { x: node.position.x, y: node.position.y, w: fp.w, h: fp.h };
  });

  function inViewport(x: number, y: number) {
    return (
      x >= topLeft.x + margin &&
      y >= topLeft.y + margin &&
      x + size.w <= bottomRight.x - margin &&
      y + size.h <= bottomRight.y - margin
    );
  }

  function isFree(x: number, y: number) {
    const box = { x, y, w: size.w, h: size.h };
    return !occupied.some(other => boxesOverlap(box, other));
  }

  const originX = center.x - size.w / 2;
  const originY = center.y - size.h / 2;

  for (let ring = 0; ring <= 8; ring++) {
    for (let dy = -ring; dy <= ring; dy++) {
      for (let dx = -ring; dx <= ring; dx++) {
        if (ring > 0 && Math.max(Math.abs(dx), Math.abs(dy)) !== ring) continue;
        const x = originX + dx * stepX;
        const y = originY + dy * stepY;
        if (!inViewport(x, y)) continue;
        if (isFree(x, y)) return { x, y };
      }
    }
  }

  // Nothing free in view — still place at center (may overlap).
  return { x: originX, y: originY };
}
