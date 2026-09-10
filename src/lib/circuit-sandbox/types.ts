import type { Edge, Node, Viewport } from '@xyflow/react';

export type CircuitComponentType = 'switch' | 'and' | 'or' | 'xor' | 'not' | 'bulb' | 'label';
export type CircuitLabelSize = 'sm' | 'md' | 'lg';

export type CircuitNodeData = {
  label: string;
  /** User-controlled state for switches. */
  on?: boolean;
  /** Computed output signal; null means unresolved (cycle / unknown). */
  signal?: boolean | null;
  /** True when at least one required input is unwired. */
  openInput?: boolean;
  /** True when this node is part of a cycle. */
  cycleError?: boolean;
  /** Text size for freeform label nodes. */
  textSize?: CircuitLabelSize;
  [key: string]: unknown;
};

export type CircuitNode = Node<CircuitNodeData, CircuitComponentType>;
export type CircuitEdge = Edge;

export type CircuitDocument = {
  nodes: CircuitNode[];
  edges: CircuitEdge[];
  viewport?: Viewport;
};

export const STORAGE_KEY = 'sys478-circuit-sandbox';
export const DRAWINGS_KEY = 'sys478-circuit-sandbox-drawings';
export const DRAWING_META_KEY = 'sys478-circuit-sandbox-meta';

export type CircuitDrawingMeta = {
  id?: string;
  name: string;
  source: 'draft' | 'preset' | 'saved';
};

export const HANDLE = {
  out: 'out',
  in: 'in',
  inA: 'in-a',
  inB: 'in-b',
} as const;
