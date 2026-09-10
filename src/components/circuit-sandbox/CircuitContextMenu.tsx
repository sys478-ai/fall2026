'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useReactFlow } from '@xyflow/react';
import type { CircuitLabelSize, CircuitNode } from '@/lib/circuit-sandbox/types';

export type CircuitContextMenuState = {
  nodeId: string;
  x: number;
  y: number;
  isLabel: boolean;
  textSize: CircuitLabelSize;
};

const MUTATE_EVENT = 'circuit-sandbox-mutate';

function notifyBeforeMutate() {
  window.dispatchEvent(new Event(MUTATE_EVENT));
}

export default function CircuitContextMenu({
  menu,
  onClose,
}: {
  menu: CircuitContextMenuState | null;
  onClose: () => void;
}) {
  const { getNode, setNodes, setEdges } = useReactFlow<CircuitNode>();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;

    function onPointerDown(event: PointerEvent) {
      if (menuRef.current?.contains(event.target as Node)) return;
      onClose();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    function onDismiss() {
      onClose();
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('wheel', onDismiss, { passive: true, capture: true });
    window.addEventListener('resize', onDismiss);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('wheel', onDismiss, true);
      window.removeEventListener('resize', onDismiss);
    };
  }, [menu, onClose]);

  useLayoutEffect(() => {
    if (!menu || !menuRef.current) return;
    const el = menuRef.current;
    el.style.left = `${menu.x}px`;
    el.style.top = `${menu.y}px`;
    const rect = el.getBoundingClientRect();
    const pad = 8;
    let left = menu.x;
    let top = menu.y;
    if (left + rect.width > window.innerWidth - pad) {
      left = Math.max(pad, window.innerWidth - rect.width - pad);
    }
    if (top + rect.height > window.innerHeight - pad) {
      top = Math.max(pad, window.innerHeight - rect.height - pad);
    }
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
  }, [menu]);

  if (!menu || typeof document === 'undefined') return null;

  const portalTarget = (document.fullscreenElement as HTMLElement | null) ?? document.body;

  function duplicateNode() {
    const node = getNode(menu!.nodeId);
    if (!node) return;
    notifyBeforeMutate();
    const nextId = `${node.type ?? 'node'}-copy-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setNodes(nodes => [
      ...nodes.map(n => ({ ...n, selected: false })),
      {
        ...node,
        id: nextId,
        selected: true,
        position: { x: node.position.x + 40, y: node.position.y + 40 },
        data: { ...node.data },
      },
    ]);
    onClose();
  }

  function deleteNode() {
    notifyBeforeMutate();
    const id = menu!.nodeId;
    setNodes(nodes => nodes.filter(node => node.id !== id));
    setEdges(edges => edges.filter(edge => edge.source !== id && edge.target !== id));
    onClose();
  }

  function setSize(size: CircuitLabelSize) {
    notifyBeforeMutate();
    const id = menu!.nodeId;
    setNodes(nodes =>
      nodes.map(node => (node.id === id ? { ...node, data: { ...node.data, textSize: size } } : node))
    );
    onClose();
  }

  return createPortal(
    <div ref={menuRef} className="circuit-sandbox-context-menu nodrag nopan" role="menu">
      <button
        type="button"
        role="menuitem"
        className="block w-full px-3 py-1.5 text-left text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
        onClick={duplicateNode}
      >
        Duplicate
      </button>
      {menu.isLabel ? (
        <>
          <div className="my-1 border-t border-gray-200 dark:border-gray-800" />
          <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">Size</p>
          {(['sm', 'md', 'lg'] as const).map(size => (
            <button
              key={size}
              type="button"
              role="menuitem"
              className={`block w-full px-3 py-1.5 text-left hover:bg-gray-100 dark:hover:bg-gray-800 ${
                menu.textSize === size
                  ? 'font-semibold text-sky-700 dark:text-sky-300'
                  : 'text-gray-800 dark:text-gray-100'
              }`}
              onClick={() => setSize(size)}
            >
              text-{size}
            </button>
          ))}
        </>
      ) : null}
      <div className="my-1 border-t border-gray-200 dark:border-gray-800" />
      <button
        type="button"
        role="menuitem"
        className="block w-full px-3 py-1.5 text-left text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
        onClick={deleteNode}
      >
        Delete
      </button>
    </div>,
    portalTarget
  );
}
