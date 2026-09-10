import { evaluateCircuit } from './evaluate';
import { HANDLE, type CircuitDocument, type CircuitEdge, type CircuitNode } from './types';

export type CircuitPreset = {
  id: string;
  name: string;
  description: string;
  document: CircuitDocument;
};

function doc(nodes: CircuitNode[], edges: CircuitEdge[]): CircuitDocument {
  return {
    nodes: evaluateCircuit(nodes, edges),
    edges,
  };
}

/** Built-in example circuits students can open. */
export const CIRCUIT_PRESETS: CircuitPreset[] = [
  {
    id: 'preset-and',
    name: 'AND gate',
    description: 'Bulb lights only when both toggles are on.',
    document: doc(
      [
        { id: 'sw-a', type: 'switch', position: { x: 40, y: 80 }, data: { label: 'A', on: false, signal: false } },
        { id: 'sw-b', type: 'switch', position: { x: 40, y: 240 }, data: { label: 'B', on: false, signal: false } },
        { id: 'and-1', type: 'and', position: { x: 300, y: 150 }, data: { label: 'A AND B', signal: false } },
        { id: 'bulb-1', type: 'bulb', position: { x: 560, y: 160 }, data: { label: 'Result', signal: false } },
      ],
      [
        { id: 'e1', source: 'sw-a', target: 'and-1', sourceHandle: HANDLE.out, targetHandle: HANDLE.inA },
        { id: 'e2', source: 'sw-b', target: 'and-1', sourceHandle: HANDLE.out, targetHandle: HANDLE.inB },
        { id: 'e3', source: 'and-1', target: 'bulb-1', sourceHandle: HANDLE.out, targetHandle: HANDLE.in },
      ]
    ),
  },
  {
    id: 'preset-or',
    name: 'OR gate',
    description: 'Bulb lights when either toggle is on.',
    document: doc(
      [
        { id: 'sw-a', type: 'switch', position: { x: 40, y: 80 }, data: { label: 'A', on: false, signal: false } },
        { id: 'sw-b', type: 'switch', position: { x: 40, y: 240 }, data: { label: 'B', on: false, signal: false } },
        { id: 'or-1', type: 'or', position: { x: 300, y: 150 }, data: { label: 'A OR B', signal: false } },
        { id: 'bulb-1', type: 'bulb', position: { x: 560, y: 160 }, data: { label: 'Result', signal: false } },
      ],
      [
        { id: 'e1', source: 'sw-a', target: 'or-1', sourceHandle: HANDLE.out, targetHandle: HANDLE.inA },
        { id: 'e2', source: 'sw-b', target: 'or-1', sourceHandle: HANDLE.out, targetHandle: HANDLE.inB },
        { id: 'e3', source: 'or-1', target: 'bulb-1', sourceHandle: HANDLE.out, targetHandle: HANDLE.in },
      ]
    ),
  },
  {
    id: 'preset-xor',
    name: 'XOR gate',
    description: 'Bulb lights when the toggles disagree.',
    document: doc(
      [
        { id: 'sw-a', type: 'switch', position: { x: 40, y: 80 }, data: { label: 'A', on: false, signal: false } },
        { id: 'sw-b', type: 'switch', position: { x: 40, y: 240 }, data: { label: 'B', on: false, signal: false } },
        { id: 'xor-1', type: 'xor', position: { x: 300, y: 150 }, data: { label: 'A XOR B', signal: false } },
        { id: 'bulb-1', type: 'bulb', position: { x: 560, y: 160 }, data: { label: 'Result', signal: false } },
      ],
      [
        { id: 'e1', source: 'sw-a', target: 'xor-1', sourceHandle: HANDLE.out, targetHandle: HANDLE.inA },
        { id: 'e2', source: 'sw-b', target: 'xor-1', sourceHandle: HANDLE.out, targetHandle: HANDLE.inB },
        { id: 'e3', source: 'xor-1', target: 'bulb-1', sourceHandle: HANDLE.out, targetHandle: HANDLE.in },
      ]
    ),
  },
  {
    id: 'preset-not',
    name: 'NOT gate',
    description: 'Bulb lights when the toggle is off (inverts the input).',
    document: doc(
      [
        { id: 'sw-a', type: 'switch', position: { x: 40, y: 140 }, data: { label: 'A', on: false, signal: false } },
        { id: 'not-1', type: 'not', position: { x: 280, y: 150 }, data: { label: 'NOT A', signal: false } },
        { id: 'bulb-1', type: 'bulb', position: { x: 520, y: 140 }, data: { label: 'Result', signal: false } },
      ],
      [
        { id: 'e1', source: 'sw-a', target: 'not-1', sourceHandle: HANDLE.out, targetHandle: HANDLE.in },
        { id: 'e2', source: 'not-1', target: 'bulb-1', sourceHandle: HANDLE.out, targetHandle: HANDLE.in },
      ]
    ),
  },
  {
    id: 'preset-half-adder',
    name: 'Half adder',
    description: 'Sum (XOR) and carry (AND) from two bits.',
    document: doc(
      [
        { id: 'sw-a', type: 'switch', position: { x: 20, y: 60 }, data: { label: 'A', on: false, signal: false } },
        { id: 'sw-b', type: 'switch', position: { x: 20, y: 260 }, data: { label: 'B', on: false, signal: false } },
        { id: 'xor-1', type: 'xor', position: { x: 260, y: 80 }, data: { label: 'Sum', signal: false } },
        { id: 'and-1', type: 'and', position: { x: 260, y: 240 }, data: { label: 'Carry', signal: false } },
        { id: 'bulb-sum', type: 'bulb', position: { x: 520, y: 70 }, data: { label: 'Sum', signal: false } },
        { id: 'bulb-carry', type: 'bulb', position: { x: 520, y: 230 }, data: { label: 'Carry', signal: false } },
      ],
      [
        { id: 'e1', source: 'sw-a', target: 'xor-1', sourceHandle: HANDLE.out, targetHandle: HANDLE.inA },
        { id: 'e2', source: 'sw-b', target: 'xor-1', sourceHandle: HANDLE.out, targetHandle: HANDLE.inB },
        { id: 'e3', source: 'sw-a', target: 'and-1', sourceHandle: HANDLE.out, targetHandle: HANDLE.inA },
        { id: 'e4', source: 'sw-b', target: 'and-1', sourceHandle: HANDLE.out, targetHandle: HANDLE.inB },
        { id: 'e5', source: 'xor-1', target: 'bulb-sum', sourceHandle: HANDLE.out, targetHandle: HANDLE.in },
        { id: 'e6', source: 'and-1', target: 'bulb-carry', sourceHandle: HANDLE.out, targetHandle: HANDLE.in },
      ]
    ),
  },
];

export function getPresetById(id: string): CircuitPreset | undefined {
  return CIRCUIT_PRESETS.find(preset => preset.id === id);
}
