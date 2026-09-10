'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type Edge,
  type NodeTypes,
  type OnConnect,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import CircuitMenuBar from '@/components/circuit-sandbox/CircuitMenuBar';
import CircuitContextMenu, {
  type CircuitContextMenuState,
} from '@/components/circuit-sandbox/CircuitContextMenu';
import {
  AndGateNode,
  BulbNode,
  LabelNode,
  NotGateNode,
  OrGateNode,
  SwitchNode,
  useCircuitMutateListener,
  XorGateNode,
} from '@/components/circuit-sandbox/CircuitNodes';
import { evaluateCircuit } from '@/lib/circuit-sandbox/evaluate';
import { findEmptyViewportPosition } from '@/lib/circuit-sandbox/placement';
import { CIRCUIT_PRESETS, getPresetById } from '@/lib/circuit-sandbox/presets';
import {
  clearCircuitDocument,
  deleteSavedDrawing,
  loadCircuitDocument,
  loadDrawingMeta,
  loadSavedDrawings,
  saveCircuitDocument,
  saveDrawingMeta,
  upsertSavedDrawing,
  type SavedDrawing,
} from '@/lib/circuit-sandbox/storage';
import {
  HANDLE,
  type CircuitComponentType,
  type CircuitDocument,
  type CircuitDrawingMeta,
  type CircuitEdge,
  type CircuitLabelSize,
  type CircuitNode,
} from '@/lib/circuit-sandbox/types';

const nodeTypes: NodeTypes = {
  switch: SwitchNode,
  and: AndGateNode,
  or: OrGateNode,
  xor: XorGateNode,
  not: NotGateNode,
  bulb: BulbNode,
  label: LabelNode,
};

function cloneDocument(doc: CircuitDocument): CircuitDocument {
  return {
    nodes: evaluateCircuit(
      doc.nodes.map(node => ({
        ...node,
        selected: false,
        data: { ...node.data },
        position: { ...node.position },
      })) as CircuitNode[],
      doc.edges.map(edge => ({ ...edge, selected: false })) as CircuitEdge[]
    ),
    edges: doc.edges.map(edge => ({ ...edge, selected: false })) as CircuitEdge[],
    viewport: doc.viewport ? { ...doc.viewport } : undefined,
  };
}

function defaultLabel(type: CircuitComponentType): string {
  switch (type) {
    case 'switch':
      return 'Toggle';
    case 'and':
      return 'AND';
    case 'or':
      return 'OR';
    case 'xor':
      return 'XOR';
    case 'not':
      return 'NOT';
    case 'bulb':
      return 'Output';
    case 'label':
      return 'Label';
  }
}

function isOutputHandle(handleId: string | null | undefined) {
  return handleId === HANDLE.out || handleId == null;
}

function isInputHandle(handleId: string | null | undefined) {
  return handleId === HANDLE.in || handleId === HANDLE.inA || handleId === HANDLE.inB;
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

type CircuitClipboard = {
  nodes: CircuitNode[];
  edges: CircuitEdge[];
};

function CircuitSandboxCanvas() {
  const starter = useMemo(() => cloneDocument(CIRCUIT_PRESETS[0].document), []);
  const [nodes, setNodes, onNodesChange] = useNodesState<CircuitNode>(starter.nodes as CircuitNode[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<CircuitEdge>(starter.edges as CircuitEdge[]);
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState('Example loaded: AND gate.');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [contextMenu, setContextMenu] = useState<CircuitContextMenuState | null>(null);
  const [meta, setMeta] = useState<CircuitDrawingMeta>({
    name: CIRCUIT_PRESETS[0].name,
    source: 'preset',
    id: CIRCUIT_PRESETS[0].id,
  });
  const [savedDrawings, setSavedDrawings] = useState<SavedDrawing[]>([]);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const clipboardRef = useRef<CircuitClipboard | null>(null);
  const historyRef = useRef<{ nodes: CircuitNode[]; edges: CircuitEdge[] }[]>([]);
  const applyingHistoryRef = useRef(false);
  const nodesRef = useRef(nodes);
  const edgesRef = useRef(edges);
  const metaRef = useRef(meta);
  const { screenToFlowPosition, getViewport, setViewport, setCenter, fitView } =
    useReactFlow<CircuitNode, CircuitEdge>();
  const idCounter = useRef(1);

  useEffect(() => {
    nodesRef.current = nodes;
    edgesRef.current = edges;
  }, [nodes, edges]);

  useEffect(() => {
    metaRef.current = meta;
  }, [meta]);

  function snapshotGraph() {
    return {
      nodes: nodesRef.current.map(node => ({
        ...node,
        data: { ...node.data },
        position: { ...node.position },
      })),
      edges: edgesRef.current.map(edge => ({ ...edge })),
    };
  }

  const pushHistory = useCallback(() => {
    if (applyingHistoryRef.current) return;
    const snap = snapshotGraph();
    const last = historyRef.current[historyRef.current.length - 1];
    if (
      last &&
      JSON.stringify({ nodes: last.nodes, edges: last.edges }) ===
        JSON.stringify({ nodes: snap.nodes, edges: snap.edges })
    ) {
      return;
    }
    historyRef.current.push(snap);
    if (historyRef.current.length > 60) historyRef.current.shift();
  }, []);

  function undo() {
    const prev = historyRef.current.pop();
    if (!prev) {
      setStatus('Nothing to undo.');
      return;
    }
    applyingHistoryRef.current = true;
    setNodes(prev.nodes);
    setEdges(prev.edges);
    applyingHistoryRef.current = false;
    setStatus('Undid last change.');
  }

  useCircuitMutateListener(pushHistory);

  function applyDocument(doc: CircuitDocument, nextMeta: CircuitDrawingMeta, statusMessage: string) {
    pushHistory();
    const cloned = cloneDocument(doc);
    setNodes(cloned.nodes as CircuitNode[]);
    setEdges(cloned.edges as CircuitEdge[]);
    setMeta(nextMeta);
    saveDrawingMeta(nextMeta);
    setStatus(statusMessage);
    requestAnimationFrame(() => {
      if (cloned.viewport) setViewport(cloned.viewport);
      else fitView({ padding: 0.2 });
    });
  }

  useEffect(() => {
    setSavedDrawings(loadSavedDrawings());
    const saved = loadCircuitDocument();
    const savedMeta = loadDrawingMeta();
    if (saved) {
      const restoredNodes = evaluateCircuit(saved.nodes as CircuitNode[], saved.edges as CircuitEdge[]);
      setNodes(restoredNodes);
      setEdges(saved.edges as CircuitEdge[]);
      if (saved.viewport) {
        requestAnimationFrame(() => setViewport(saved.viewport!));
      } else if (restoredNodes.length === 0) {
        requestAnimationFrame(() => fitView({ padding: 0.2 }));
      }
      if (savedMeta) setMeta(savedMeta);
      setStatus(
        restoredNodes.length === 0
          ? 'Empty canvas ready.'
          : 'Restored your last circuit from this browser.'
      );
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onFullscreenChange() {
      const active = document.fullscreenElement === shellRef.current;
      setIsFullscreen(active);
      requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    }
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    function copySelection() {
      const selectedNodes = nodesRef.current.filter(node => node.selected);
      if (selectedNodes.length === 0) {
        setStatus('Select a part to copy.');
        return;
      }
      const selectedIds = new Set(selectedNodes.map(node => node.id));
      const selectedEdges = edgesRef.current.filter(
        edge => selectedIds.has(edge.source) && selectedIds.has(edge.target)
      );
      clipboardRef.current = {
        nodes: selectedNodes.map(node => ({
          ...node,
          selected: false,
          data: { ...node.data },
          position: { ...node.position },
        })),
        edges: selectedEdges.map(edge => ({ ...edge, selected: false })),
      };
      setStatus(`Copied ${selectedNodes.length} part${selectedNodes.length === 1 ? '' : 's'}.`);
    }

    function pasteClipboard() {
      const clip = clipboardRef.current;
      if (!clip || clip.nodes.length === 0) {
        setStatus('Clipboard is empty. Copy a part first (⌘/Ctrl+C).');
        return;
      }

      pushHistory();

      const idMap = new Map<string, string>();
      const offset = 40;
      const pastedNodes: CircuitNode[] = clip.nodes.map(node => {
        const nextId = `${node.type ?? 'node'}-${idCounter.current++}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        idMap.set(node.id, nextId);
        return {
          ...node,
          id: nextId,
          selected: true,
          position: {
            x: node.position.x + offset,
            y: node.position.y + offset,
          },
          data: { ...node.data },
        };
      });

      const pastedEdges: CircuitEdge[] = clip.edges.flatMap(edge => {
        const source = idMap.get(edge.source);
        const target = idMap.get(edge.target);
        if (!source || !target) return [];
        return [
          {
            ...edge,
            id: `e-${source}-${target}-${edge.targetHandle ?? 'in'}-${Date.now()}`,
            source,
            target,
            selected: true,
          },
        ];
      });

      setNodes(current => [
        ...current.map(node => ({ ...node, selected: false })),
        ...pastedNodes,
      ]);
      setEdges(current => [
        ...current.map(edge => ({ ...edge, selected: false })),
        ...pastedEdges,
      ]);

      const anchor = pastedNodes[0];
      if (anchor) {
        const { zoom } = getViewport();
        requestAnimationFrame(() => {
          setCenter(anchor.position.x + 50, anchor.position.y + 50, { zoom, duration: 200 });
        });
      }
      setStatus(`Pasted ${pastedNodes.length} part${pastedNodes.length === 1 ? '' : 's'}.`);

      clipboardRef.current = {
        nodes: pastedNodes.map(node => ({
          ...node,
          selected: false,
          data: { ...node.data },
          position: { ...node.position },
        })),
        edges: pastedEdges.map(edge => ({ ...edge, selected: false })),
      };
    }

    function deleteSelection() {
      const selectedNodeIds = new Set(nodesRef.current.filter(n => n.selected).map(n => n.id));
      const selectedEdgeIds = new Set(edgesRef.current.filter(e => e.selected).map(e => e.id));
      if (selectedNodeIds.size === 0 && selectedEdgeIds.size === 0) return;

      pushHistory();
      setNodes(current => current.filter(node => !selectedNodeIds.has(node.id)));
      setEdges(current =>
        current.filter(
          edge =>
            !selectedEdgeIds.has(edge.id) &&
            !selectedNodeIds.has(edge.source) &&
            !selectedNodeIds.has(edge.target)
        )
      );
      setStatus('Deleted selection.');
    }

    function onKeyDown(event: KeyboardEvent) {
      if (isTypingTarget(event.target)) return;

      const mod = event.metaKey || event.ctrlKey;
      const key = event.key.toLowerCase();

      if (mod && key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
        return;
      }
      if (mod && key === 'c') {
        event.preventDefault();
        copySelection();
        return;
      }
      if (mod && key === 'v') {
        event.preventDefault();
        pasteClipboard();
        return;
      }
      if (key === 'delete' || key === 'backspace') {
        const hasSelection =
          nodesRef.current.some(n => n.selected) || edgesRef.current.some(e => e.selected);
        if (!hasSelection) return;
        event.preventDefault();
        deleteSelection();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [getViewport, setCenter, setEdges, setNodes]);

  useEffect(() => {
    if (!hydrated) return;
    setNodes(current => {
      const next = evaluateCircuit(current, edges);
      const unchanged =
        next.length === current.length &&
        next.every((node, i) => {
          const prev = current[i];
          return (
            prev &&
            prev.id === node.id &&
            prev.data.signal === node.data.signal &&
            prev.data.openInput === node.data.openInput &&
            prev.data.cycleError === node.data.cycleError &&
            prev.data.on === node.data.on
          );
        });
      return unchanged ? current : next;
    });
  }, [edges, nodes, hydrated, setNodes]);

  useEffect(() => {
    if (!hydrated) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveCircuitDocument({
        nodes,
        edges,
        viewport: getViewport(),
      });
    }, 300);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [nodes, edges, hydrated, getViewport]);

  const isValidConnection = useCallback((connection: Connection | Edge) => {
    if (!connection.source || !connection.target) return false;
    if (connection.source === connection.target) return false;
    const sourceNode = nodesRef.current.find(node => node.id === connection.source);
    const targetNode = nodesRef.current.find(node => node.id === connection.target);
    if (sourceNode?.type === 'label' || targetNode?.type === 'label') return false;
    if (!isOutputHandle(connection.sourceHandle)) return false;
    if (!isInputHandle(connection.targetHandle)) return false;
    return true;
  }, []);

  const onConnect: OnConnect = useCallback(
    connection => {
      if (!isValidConnection(connection)) return;
      pushHistory();
      setEdges(current => {
        const withoutTarget = current.filter(
          edge =>
            !(edge.target === connection.target && edge.targetHandle === connection.targetHandle)
        );
        return addEdge(
          {
            ...connection,
            id: `e-${connection.source}-${connection.target}-${connection.targetHandle}-${Date.now()}`,
          },
          withoutTarget
        );
      });
      setStatus('Connected. Unwired inputs read as 0.');
    },
    [isValidConnection, setEdges]
  );

  const addComponent = useCallback(
    (type: CircuitComponentType) => {
      const id = `${type}-${idCounter.current++}-${Date.now()}`;
      const rect = canvasRef.current?.getBoundingClientRect();
      const topLeft = screenToFlowPosition({
        x: rect?.left ?? 0,
        y: rect?.top ?? 0,
      });
      const bottomRight = screenToFlowPosition({
        x: rect ? rect.right : window.innerWidth,
        y: rect ? rect.bottom : window.innerHeight,
      });
      const center = screenToFlowPosition({
        x: rect ? rect.left + rect.width / 2 : window.innerWidth / 2,
        y: rect ? rect.top + rect.height / 2 : window.innerHeight / 2,
      });

      const position = findEmptyViewportPosition({
        nodes: nodesRef.current,
        type,
        topLeft,
        bottomRight,
        center,
      });

      const data =
        type === 'switch'
          ? { label: defaultLabel(type), on: false, signal: false }
          : type === 'label'
            ? { label: 'New label', textSize: 'md' as const }
            : { label: defaultLabel(type), signal: false };

      pushHistory();
      setNodes(current => [
        ...current.map(node => ({ ...node, selected: false })),
        {
          id,
          type,
          position,
          selected: true,
          data,
        },
      ]);
      setEdges(current => current.map(edge => ({ ...edge, selected: false })));

      setStatus(
        type === 'label'
          ? 'Added label in view. Double-click to edit; use sm/md/lg when selected.'
          : `Added ${type} in an open spot in view.`
      );
    },
    [screenToFlowPosition, setEdges, setNodes]
  );

  const currentDocument = useCallback((): CircuitDocument => {
    return {
      nodes: nodesRef.current,
      edges: edgesRef.current,
      viewport: getViewport(),
    };
  }, [getViewport]);

  const openPreset = useCallback(
    (id: string) => {
      const preset = getPresetById(id);
      if (!preset) return;
      applyDocument(preset.document, { id: preset.id, name: preset.name, source: 'preset' }, `Opened example: ${preset.name}.`);
    },
    // applyDocument closes over setters; stable enough for this canvas
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fitView, setViewport]
  );

  const openSaved = useCallback(
    (id: string) => {
      const drawing = loadSavedDrawings().find(item => item.id === id);
      if (!drawing) {
        setStatus('Saved drawing not found.');
        return;
      }
      applyDocument(
        drawing.document,
        { id: drawing.id, name: drawing.name, source: 'saved' },
        `Opened saved drawing: ${drawing.name}.`
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fitView, setViewport]
  );

  const saveDrawing = useCallback(
    (forceNewName = false) => {
      const currentMeta = metaRef.current;
      let name = currentMeta.name;
      let id = currentMeta.source === 'saved' ? currentMeta.id : undefined;

      if (forceNewName || !id || currentMeta.source !== 'saved') {
        const suggested =
          currentMeta.source === 'saved' || currentMeta.source === 'preset'
            ? `${currentMeta.name} copy`
            : currentMeta.name || 'My circuit';
        const entered = window.prompt('Name this drawing', suggested);
        if (entered == null) return;
        const trimmed = entered.trim();
        if (!trimmed) {
          setStatus('Save canceled — name required.');
          return;
        }
        name = trimmed;
        id = `drawing-${Date.now()}`;
      }

      const drawing: SavedDrawing = {
        id: id!,
        name,
        updatedAt: new Date().toISOString(),
        document: currentDocument(),
      };
      const next = upsertSavedDrawing(drawing);
      setSavedDrawings(next);
      const nextMeta: CircuitDrawingMeta = { id: drawing.id, name: drawing.name, source: 'saved' };
      setMeta(nextMeta);
      saveDrawingMeta(nextMeta);
      setStatus(`Saved “${drawing.name}” in this browser.`);
    },
    [currentDocument]
  );

  const removeSaved = useCallback(
    (id: string) => {
      const next = deleteSavedDrawing(id);
      setSavedDrawings(next);
      if (metaRef.current.id === id) {
        const nextMeta: CircuitDrawingMeta = { name: 'Untitled circuit', source: 'draft' };
        setMeta(nextMeta);
        saveDrawingMeta(nextMeta);
      }
      setStatus('Deleted saved drawing.');
    },
    []
  );

  const newBlank = useCallback(() => {
    pushHistory();
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
    setNodes([]);
    setEdges([]);
    clearCircuitDocument();
    saveCircuitDocument({ nodes: [], edges: [] });
    const nextMeta: CircuitDrawingMeta = { name: 'Untitled circuit', source: 'draft' };
    setMeta(nextMeta);
    saveDrawingMeta(nextMeta);
    requestAnimationFrame(() => fitView({ padding: 0.2 }));
    setStatus('New blank canvas.');
  }, [fitView, setEdges, setNodes]);

  const clearAll = useCallback(() => {
    pushHistory();
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
    setNodes([]);
    setEdges([]);
    clearCircuitDocument();
    saveCircuitDocument({ nodes: [], edges: [] });
    const nextMeta: CircuitDrawingMeta = { name: 'Untitled circuit', source: 'draft' };
    setMeta(nextMeta);
    saveDrawingMeta(nextMeta);
    requestAnimationFrame(() => fitView({ padding: 0.2 }));
    setStatus('Canvas cleared.');
  }, [fitView, setEdges, setNodes]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await shellRef.current?.requestFullscreen();
        setStatus('Full screen on. Press Esc or the icon again to exit.');
      } else {
        await document.exitFullscreen();
        setStatus('Exited full screen.');
      }
    } catch {
      setStatus('Full screen is not available in this browser.');
    }
  }, []);

  // Persist meta whenever it changes after hydration.
  useEffect(() => {
    if (!hydrated) return;
    saveDrawingMeta(meta);
  }, [meta, hydrated]);

  const onNodeContextMenu = useCallback((event: ReactMouseEvent, node: CircuitNode) => {
    event.preventDefault();
    const textSize: CircuitLabelSize =
      node.data.textSize === 'sm' || node.data.textSize === 'lg' ? node.data.textSize : 'md';
    setContextMenu({
      nodeId: node.id,
      x: event.clientX,
      y: event.clientY,
      isLabel: node.type === 'label',
      textSize,
    });
  }, []);

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  const hasCycle = nodes.some(node => node.data.cycleError);

  const displayEdges = useMemo(() => {
    const byId = new Map(nodes.map(node => [node.id, node]));
    return edges.map(edge => {
      const source = byId.get(edge.source);
      const flowing = Boolean(source?.data.signal) && !source?.data.cycleError;
      return {
        ...edge,
        animated: flowing,
        className: flowing ? 'circuit-edge-flowing' : undefined,
        style: {
          ...edge.style,
          stroke: flowing ? '#f59e0b' : '#64748b',
          strokeWidth: flowing ? 3.25 : 2.5,
        },
      };
    });
  }, [nodes, edges]);

  return (
    <div
      ref={shellRef}
      className={`circuit-sandbox flex h-full min-h-0 flex-col ${
        isFullscreen ? 'gap-2 bg-white p-3 dark:bg-gray-950' : 'gap-2 p-2'
      }`}
    >
      <CircuitMenuBar
        isFullscreen={isFullscreen}
        savedDrawings={savedDrawings}
        onAddComponent={addComponent}
        onOpenPreset={openPreset}
        onOpenSaved={openSaved}
        onDeleteSaved={removeSaved}
        onSave={() => saveDrawing(false)}
        onSaveAs={() => saveDrawing(true)}
        onNewBlank={newBlank}
        onClear={clearAll}
        onToggleFullscreen={toggleFullscreen}
      />

      {hasCycle ? (
        <p className="mb-0 shrink-0 text-sm font-semibold text-red-600 dark:text-red-400">
          Cycle detected – remove a wire to continue.
        </p>
      ) : (
        <p className="mb-0 shrink-0 text-xs text-gray-500 dark:text-gray-500">{status}</p>
      )}

      <div
        ref={canvasRef}
        className="min-h-0 w-full flex-1 overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700"
      >
        <ReactFlow
          nodes={nodes}
          edges={displayEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
          onNodeDragStart={() => {
            setContextMenu(null);
            pushHistory();
          }}
          onNodeContextMenu={onNodeContextMenu}
          onPaneClick={() => setContextMenu(null)}
          onMoveStart={() => setContextMenu(null)}
          onPaneContextMenu={event => {
            event.preventDefault();
            setContextMenu(null);
          }}
          nodeTypes={nodeTypes}
          fitView
          deleteKeyCode={null}
          nodesDraggable
          elementsSelectable
          edgesFocusable
          nodesFocusable
          multiSelectionKeyCode={['Meta', 'Control']}
          defaultEdgeOptions={{
            type: 'default',
            animated: false,
            style: { strokeWidth: 2.5, stroke: '#64748b' },
          }}
        >
          <Background gap={18} size={1} />
          <Controls showFitView={false} showInteractive={false} />
          <MiniMap pannable zoomable />
        </ReactFlow>
        <CircuitContextMenu menu={contextMenu} onClose={closeContextMenu} />
      </div>
    </div>
  );
}

export default function CircuitSandbox() {
  return (
    <ReactFlowProvider>
      <CircuitSandboxCanvas />
    </ReactFlowProvider>
  );
}
