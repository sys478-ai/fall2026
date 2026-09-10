import type { CircuitDocument, CircuitDrawingMeta } from './types';
import { DRAWINGS_KEY, DRAWING_META_KEY, STORAGE_KEY } from './types';

export type SavedDrawing = {
  id: string;
  name: string;
  updatedAt: string;
  document: CircuitDocument;
};

export function loadCircuitDocument(): CircuitDocument | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CircuitDocument;
    if (!parsed || !Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveCircuitDocument(doc: CircuitDocument) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(doc));
  } catch {
    // Ignore private mode / quota errors.
  }
}

export function clearCircuitDocument() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures.
  }
}

export function loadDrawingMeta(): CircuitDrawingMeta | null {
  try {
    const raw = localStorage.getItem(DRAWING_META_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CircuitDrawingMeta;
    if (!parsed || typeof parsed.name !== 'string') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveDrawingMeta(meta: CircuitDrawingMeta) {
  try {
    localStorage.setItem(DRAWING_META_KEY, JSON.stringify(meta));
  } catch {
    // Ignore storage failures.
  }
}

export function loadSavedDrawings(): SavedDrawing[] {
  try {
    const raw = localStorage.getItem(DRAWINGS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedDrawing[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        item =>
          item &&
          typeof item.id === 'string' &&
          typeof item.name === 'string' &&
          item.document &&
          Array.isArray(item.document.nodes) &&
          Array.isArray(item.document.edges)
      )
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } catch {
    return [];
  }
}

function writeSavedDrawings(drawings: SavedDrawing[]) {
  try {
    localStorage.setItem(DRAWINGS_KEY, JSON.stringify(drawings));
  } catch {
    // Ignore storage failures.
  }
}

export function upsertSavedDrawing(drawing: SavedDrawing): SavedDrawing[] {
  const current = loadSavedDrawings().filter(item => item.id !== drawing.id);
  const next = [drawing, ...current];
  writeSavedDrawings(next);
  return next;
}

export function deleteSavedDrawing(id: string): SavedDrawing[] {
  const next = loadSavedDrawings().filter(item => item.id !== id);
  writeSavedDrawings(next);
  return next;
}
