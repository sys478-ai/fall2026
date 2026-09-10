import type { CircuitEdge, CircuitNode, CircuitNodeData } from './types';
import { HANDLE as H } from './types';

function gateInputs(nodeId: string, edges: CircuitEdge[]): { a?: string; b?: string } {
  let a: string | undefined;
  let b: string | undefined;
  for (const edge of edges) {
    if (edge.target !== nodeId) continue;
    if (edge.targetHandle === H.inA) a = edge.source;
    if (edge.targetHandle === H.inB) b = edge.source;
  }
  return { a, b };
}

function unaryInput(nodeId: string, edges: CircuitEdge[]): string | undefined {
  for (const edge of edges) {
    if (edge.target !== nodeId) continue;
    if (edge.targetHandle === H.in || edge.targetHandle === H.inA || !edge.targetHandle) {
      return edge.source;
    }
  }
  return undefined;
}

function bulbInput(nodeId: string, edges: CircuitEdge[]): string | undefined {
  return unaryInput(nodeId, edges);
}

function buildDependents(nodes: CircuitNode[], edges: CircuitEdge[]): Map<string, string[]> {
  const dependents = new Map<string, string[]>();
  for (const node of nodes) dependents.set(node.id, []);
  for (const edge of edges) {
    const list = dependents.get(edge.source);
    if (list && !list.includes(edge.target)) list.push(edge.target);
  }
  return dependents;
}

function detectCycle(nodes: CircuitNode[], edges: CircuitEdge[]): Set<string> {
  const dependents = buildDependents(nodes, edges);
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const inCycle = new Set<string>();

  function dfs(id: string, stack: string[]) {
    if (visiting.has(id)) {
      const start = stack.indexOf(id);
      if (start >= 0) {
        for (const nodeId of stack.slice(start)) inCycle.add(nodeId);
      }
      inCycle.add(id);
      return;
    }
    if (visited.has(id)) return;
    visiting.add(id);
    stack.push(id);
    for (const next of dependents.get(id) ?? []) {
      dfs(next, stack);
    }
    stack.pop();
    visiting.delete(id);
    visited.add(id);
  }

  for (const node of nodes) dfs(node.id, []);
  return inCycle;
}

function topoOrder(nodes: CircuitNode[], edges: CircuitEdge[]): string[] | null {
  const indegree = new Map<string, number>();
  const dependents = buildDependents(nodes, edges);
  for (const node of nodes) indegree.set(node.id, 0);
  for (const edge of edges) {
    indegree.set(edge.target, (indegree.get(edge.target) ?? 0) + 1);
  }

  const queue = nodes.filter(n => (indegree.get(n.id) ?? 0) === 0).map(n => n.id);
  const order: string[] = [];

  while (queue.length > 0) {
    const id = queue.shift()!;
    order.push(id);
    for (const next of dependents.get(id) ?? []) {
      const nextDeg = (indegree.get(next) ?? 0) - 1;
      indegree.set(next, nextDeg);
      if (nextDeg === 0) queue.push(next);
    }
  }

  return order.length === nodes.length ? order : null;
}

/**
 * Recompute signal values for every node.
 * Unconnected gate/bulb inputs are treated as 0 (false) and flagged openInput.
 * Cycles mark involved nodes with cycleError and null signals.
 */
export function evaluateCircuit(nodes: CircuitNode[], edges: CircuitEdge[]): CircuitNode[] {
  const byId = new Map(nodes.map(n => [n.id, n]));
  const cycleNodes = detectCycle(nodes, edges);
  const order = topoOrder(nodes, edges);
  const signals = new Map<string, boolean | null>();

  function readSignal(sourceId: string | undefined): { value: boolean; open: boolean } {
    if (!sourceId) return { value: false, open: true };
    if (cycleNodes.has(sourceId)) return { value: false, open: false };
    const signal = signals.get(sourceId);
    if (signal === undefined || signal === null) return { value: false, open: false };
    return { value: signal, open: false };
  }

  const evaluateOne = (node: CircuitNode) => {
    if (cycleNodes.has(node.id)) {
      signals.set(node.id, null);
      return;
    }

    if (node.type === 'switch') {
      signals.set(node.id, Boolean(node.data.on));
      return;
    }

    if (node.type === 'label') {
      // Annotation only — does not participate in the circuit.
      signals.set(node.id, null);
      return;
    }

    if (node.type === 'bulb') {
      const sourceId = bulbInput(node.id, edges);
      const { value } = readSignal(sourceId);
      signals.set(node.id, value);
      return;
    }

    if (node.type === 'not') {
      const sourceId = unaryInput(node.id, edges);
      const input = readSignal(sourceId);
      signals.set(node.id, !input.value);
      return;
    }

    // binary gates
    const { a, b } = gateInputs(node.id, edges);
    const left = readSignal(a);
    const right = readSignal(b);
    let out = false;
    if (node.type === 'and') out = left.value && right.value;
    else if (node.type === 'or') out = left.value || right.value;
    else if (node.type === 'xor') out = left.value !== right.value;
    signals.set(node.id, out);
  };

  if (order) {
    for (const id of order) {
      const node = byId.get(id);
      if (node) evaluateOne(node);
    }
  } else {
    for (const node of nodes) evaluateOne(node);
  }

  return nodes.map(node => {
    if (node.type === 'label') {
      return {
        ...node,
        data: {
          ...node.data,
          signal: undefined,
          openInput: false,
          cycleError: false,
        },
      };
    }

    const signal = signals.get(node.id) ?? null;
    const inCycle = cycleNodes.has(node.id);
    let openInput = false;

    if (node.type === 'bulb' || node.type === 'not') {
      openInput = !unaryInput(node.id, edges);
    } else if (node.type === 'and' || node.type === 'or' || node.type === 'xor') {
      const { a, b } = gateInputs(node.id, edges);
      openInput = !a || !b;
    }

    const nextData: CircuitNodeData = {
      ...node.data,
      signal: inCycle ? null : signal,
      openInput,
      cycleError: inCycle,
    };

    return { ...node, data: nextData };
  });
}
