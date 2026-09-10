'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Handle, Position, type NodeProps, useReactFlow } from '@xyflow/react';
import { HANDLE, type CircuitLabelSize, type CircuitNode } from '@/lib/circuit-sandbox/types';

const handleClass =
  '!h-3.5 !w-3.5 !rounded-full !border-2 !border-white !bg-amber-500 dark:!border-gray-900';

const MUTATE_EVENT = 'circuit-sandbox-mutate';

export function useCircuitMutateListener(onMutate: () => void) {
  useEffect(() => {
    window.addEventListener(MUTATE_EVENT, onMutate);
    return () => window.removeEventListener(MUTATE_EVENT, onMutate);
  }, [onMutate]);
}

function LabelField({
  id,
  label,
  placeholder,
}: {
  id: string;
  label: string;
  placeholder: string;
}) {
  const { setNodes } = useReactFlow<CircuitNode>();

  return (
    <input
      className="nodrag nopan w-full rounded border border-transparent bg-transparent px-1 py-0.5 text-center text-xs font-medium text-gray-800 outline-none hover:border-gray-200 focus:border-amber-400 dark:text-gray-100 dark:hover:border-gray-700"
      value={label}
      placeholder={placeholder}
      aria-label="Component label"
      onChange={event => {
        const next = event.target.value;
        setNodes(nodes =>
          nodes.map(node => (node.id === id ? { ...node, data: { ...node.data, label: next } } : node))
        );
      }}
      onMouseDown={event => event.stopPropagation()}
    />
  );
}

function SignalHint({
  signal,
  openInput,
  cycleError,
}: {
  signal?: boolean | null;
  openInput?: boolean;
  cycleError?: boolean;
}) {
  if (cycleError) return <span className="text-[10px] font-semibold text-red-600 dark:text-red-400">cycle</span>;
  if (openInput) return <span className="text-[10px] text-gray-400">open→0</span>;
  return (
    <span className={`text-[10px] font-semibold tabular-nums ${signal ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>
      {signal ? '1' : '0'}
    </span>
  );
}

const stroke = 'currentColor';

function gateSvgClass(selected?: boolean, active?: boolean) {
  const color = selected
    ? 'text-sky-500 dark:text-sky-400'
    : active
      ? 'text-sky-700 dark:text-sky-300'
      : 'text-gray-800 dark:text-gray-100';
  const glow = selected ? '[filter:drop-shadow(0_0_2px_#0284c7)_drop-shadow(0_0_6px_#38bdf8)]' : '';
  return `${color} ${glow}`;
}

function AndGateSymbol({ active, selected }: { active?: boolean; selected?: boolean }) {
  const sw = selected ? 3.5 : 2.5;
  return (
    <svg viewBox="0 0 90 70" className={`h-[70px] w-[90px] ${gateSvgClass(selected, active)}`} aria-hidden>
      <path
        d="M 18 8 H 48 C 70 8 78 22 78 35 C 78 48 70 62 48 62 H 18 Z"
        fill="white"
        className="dark:fill-gray-900"
        stroke={stroke}
        strokeWidth={sw}
      />
      <line x1="2" y1="22" x2="18" y2="22" stroke={stroke} strokeWidth={sw} />
      <line x1="2" y1="48" x2="18" y2="48" stroke={stroke} strokeWidth={sw} />
      <line x1="78" y1="35" x2="88" y2="35" stroke={stroke} strokeWidth={sw} />
    </svg>
  );
}

function OrGateSymbol({ active, selected }: { active?: boolean; selected?: boolean }) {
  const sw = selected ? 3.5 : 2.5;
  return (
    <svg viewBox="0 0 90 70" className={`h-[70px] w-[90px] ${gateSvgClass(selected, active)}`} aria-hidden>
      <path
        d="M 16 8
           C 34 8 52 14 78 35
           C 52 56 34 62 16 62
           C 30 48 30 22 16 8 Z"
        fill="white"
        className="dark:fill-gray-900"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <line x1="2" y1="22" x2="24" y2="22" stroke={stroke} strokeWidth={sw} />
      <line x1="2" y1="48" x2="24" y2="48" stroke={stroke} strokeWidth={sw} />
      <line x1="78" y1="35" x2="88" y2="35" stroke={stroke} strokeWidth={sw} />
    </svg>
  );
}

function XorGateSymbol({ active, selected }: { active?: boolean; selected?: boolean }) {
  const sw = selected ? 3.5 : 2.5;
  return (
    <svg viewBox="0 0 98 70" className={`h-[70px] w-[98px] ${gateSvgClass(selected, active)}`} aria-hidden>
      <path
        d="M 6 8 C 20 22 20 48 6 62"
        fill="none"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      <path
        d="M 22 8
           C 40 8 58 14 86 35
           C 58 56 40 62 22 62
           C 36 48 36 22 22 8 Z"
        fill="white"
        className="dark:fill-gray-900"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <line x1="0" y1="22" x2="28" y2="22" stroke={stroke} strokeWidth={sw} />
      <line x1="0" y1="48" x2="28" y2="48" stroke={stroke} strokeWidth={sw} />
      <line x1="86" y1="35" x2="96" y2="35" stroke={stroke} strokeWidth={sw} />
    </svg>
  );
}

function NotGateSymbol({ active, selected }: { active?: boolean; selected?: boolean }) {
  const sw = selected ? 3.5 : 2.5;
  return (
    <svg viewBox="0 0 90 70" className={`h-[70px] w-[90px] ${gateSvgClass(selected, active)}`} aria-hidden>
      <path
        d="M 18 10 L 68 35 L 18 60 Z"
        fill="white"
        className="dark:fill-gray-900"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <circle
        cx="74"
        cy="35"
        r="6"
        fill="white"
        className="dark:fill-gray-900"
        stroke={stroke}
        strokeWidth={sw}
      />
      <line x1="2" y1="35" x2="18" y2="35" stroke={stroke} strokeWidth={sw} />
      <line x1="80" y1="35" x2="88" y2="35" stroke={stroke} strokeWidth={sw} />
    </svg>
  );
}

function ToggleButtonGraphic({
  on,
  onToggle,
  selected,
}: {
  on: boolean;
  onToggle: () => void;
  selected?: boolean;
}) {
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const didDrag = useRef(false);

  return (
    <div
      role="switch"
      tabIndex={0}
      aria-checked={on}
      aria-label={`Toggle ${on ? 'on' : 'off'}. Click to flip, drag to move.`}
      className={`relative h-10 w-[72px] cursor-grab rounded-full border-2 transition-colors duration-150 active:cursor-grabbing ${
        on
          ? 'border-emerald-600 bg-emerald-500 dark:border-emerald-400 dark:bg-emerald-500'
          : 'border-gray-400 bg-gray-300 dark:border-gray-500 dark:bg-gray-700'
      } ${selected ? 'ring-2 ring-sky-500 ring-offset-2 dark:ring-sky-400 dark:ring-offset-gray-950' : ''}`}
      onPointerDown={event => {
        // Allow React Flow to drag the node; only treat a short stationary press as a click-toggle.
        if (event.button !== 0) return;
        pointerStart.current = { x: event.clientX, y: event.clientY };
        didDrag.current = false;

        const onMove = (ev: PointerEvent) => {
          if (!pointerStart.current) return;
          const dx = ev.clientX - pointerStart.current.x;
          const dy = ev.clientY - pointerStart.current.y;
          if (Math.hypot(dx, dy) > 5) didDrag.current = true;
        };

        const onUp = () => {
          window.removeEventListener('pointermove', onMove);
          window.removeEventListener('pointerup', onUp);
          window.removeEventListener('pointercancel', onUp);
          const wasClick = Boolean(pointerStart.current) && !didDrag.current;
          pointerStart.current = null;
          if (wasClick) onToggle();
        };

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onUp);
      }}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onToggle();
        }
      }}
    >
      <span
        className={`pointer-events-none absolute top-0.5 left-0.5 h-8 w-8 rounded-full bg-white shadow transition-transform duration-150 ${
          on ? 'translate-x-8' : 'translate-x-0'
        }`}
      />
    </div>
  );
}

function LightBulbGraphic({ lit, selected }: { lit: boolean; selected?: boolean }) {
  const glassStroke = selected ? '#0284c7' : lit ? '#d97706' : '#9ca3af';
  const glassWidth = selected ? 3 : 2;

  return (
    <svg
      viewBox="0 0 80 110"
      className={`h-[110px] w-20 ${selected ? '[filter:drop-shadow(0_0_2px_#0284c7)_drop-shadow(0_0_6px_#38bdf8)]' : ''}`}
      aria-hidden
    >
      {lit && (
        <ellipse cx="40" cy="42" rx="34" ry="36" fill="rgba(251, 191, 36, 0.35)" className="dark:fill-amber-400/25" />
      )}
      <path
        d="M 24 48 C 18 34 22 16 40 12 C 58 16 62 34 56 48 C 54 54 54 58 54 62 L 26 62 C 26 58 26 54 24 48 Z"
        fill={lit ? '#fde68a' : '#f3f4f6'}
        stroke={glassStroke}
        strokeWidth={glassWidth}
        className={lit || selected ? '' : 'dark:fill-gray-700 dark:stroke-gray-500'}
      />
      <path
        d="M 34 36 Q 40 28 46 36 Q 40 44 34 36"
        fill="none"
        stroke={lit ? '#b45309' : '#9ca3af'}
        strokeWidth="1.5"
      />
      <rect
        x="28"
        y="62"
        width="24"
        height="8"
        fill="#d1d5db"
        stroke={selected ? '#0284c7' : '#9ca3af'}
        strokeWidth={selected ? 2 : 1.5}
        className="dark:fill-gray-600"
      />
      <rect x="30" y="70" width="20" height="4" rx="1" fill="#9ca3af" />
      <rect x="30" y="76" width="20" height="4" rx="1" fill="#9ca3af" />
      <rect x="30" y="82" width="20" height="4" rx="1" fill="#9ca3af" />
      <path d="M 34 88 H 46 L 43 96 H 37 Z" fill="#6b7280" />
    </svg>
  );
}

export function SwitchNode({ id, data, selected }: NodeProps<CircuitNode>) {
  const { setNodes } = useReactFlow<CircuitNode>();
  const on = Boolean(data.on);

  function toggle() {
    setNodes(nodes =>
      nodes.map(node => (node.id === id ? { ...node, data: { ...node.data, on: !node.data.on } } : node))
    );
  }

  return (
    <div className="relative w-[100px] cursor-grab p-1 active:cursor-grabbing">
        <div className="flex flex-col items-center gap-2 py-2">
          <ToggleButtonGraphic on={on} onToggle={toggle} selected={selected} />
          <span
            className={`text-[10px] font-semibold ${on ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}
          >
            {on ? 'ON' : 'OFF'}
          </span>
        </div>
        <LabelField id={id} label={data.label} placeholder="Input label" />
        <Handle type="source" position={Position.Right} id={HANDLE.out} className={handleClass} style={{ top: '42%' }} />
      </div>
  );
}

function GateNodeShell({
  data,
  symbol,
  selected,
}: {
  data: CircuitNode['data'];
  symbol: ReactNode;
  selected?: boolean;
}) {
  return (
    <div className="relative w-[120px] cursor-grab p-1 active:cursor-grabbing">
        <div className="flex flex-col items-center gap-1">
          <div className="relative">
            {symbol}
            <Handle
              type="target"
              position={Position.Left}
              id={HANDLE.inA}
              className={handleClass}
              style={{ top: '32%', left: 0 }}
            />
            <Handle
              type="target"
              position={Position.Left}
              id={HANDLE.inB}
              className={handleClass}
              style={{ top: '68%', left: 0 }}
            />
            <Handle
              type="source"
              position={Position.Right}
              id={HANDLE.out}
              className={handleClass}
              style={{ top: '50%', right: 0 }}
            />
          </div>
          <SignalHint signal={data.signal} openInput={data.openInput} cycleError={data.cycleError} />
        </div>
      </div>
  );
}

export function AndGateNode({ data, selected }: NodeProps<CircuitNode>) {
  return (
    <GateNodeShell
      data={data}
      selected={selected}
      symbol={<AndGateSymbol active={Boolean(data.signal)} selected={selected} />}
    />
  );
}

export function OrGateNode({ data, selected }: NodeProps<CircuitNode>) {
  return (
    <GateNodeShell
      data={data}
      selected={selected}
      symbol={<OrGateSymbol active={Boolean(data.signal)} selected={selected} />}
    />
  );
}

export function XorGateNode({ data, selected }: NodeProps<CircuitNode>) {
  return (
    <GateNodeShell
      data={data}
      selected={selected}
      symbol={<XorGateSymbol active={Boolean(data.signal)} selected={selected} />}
    />
  );
}

export function NotGateNode({ data, selected }: NodeProps<CircuitNode>) {
  return (
    <div className="relative w-[120px] cursor-grab p-1 active:cursor-grabbing">
        <div className="flex flex-col items-center gap-1">
          <div className="relative">
            <NotGateSymbol active={Boolean(data.signal)} selected={selected} />
            <Handle
              type="target"
              position={Position.Left}
              id={HANDLE.in}
              className={handleClass}
              style={{ top: '50%', left: 0 }}
            />
            <Handle
              type="source"
              position={Position.Right}
              id={HANDLE.out}
              className={handleClass}
              style={{ top: '50%', right: 0 }}
            />
          </div>
          <SignalHint signal={data.signal} openInput={data.openInput} cycleError={data.cycleError} />
        </div>
      </div>
  );
}

export function BulbNode({ id, data, selected }: NodeProps<CircuitNode>) {
  const lit = Boolean(data.signal) && !data.cycleError;

  return (
    <div className="relative w-[100px] cursor-grab p-1 active:cursor-grabbing">
        <div className="flex flex-col items-center gap-1">
          <div className={lit && !selected ? 'drop-shadow-[0_0_12px_rgba(251,191,36,0.85)]' : undefined}>
            <LightBulbGraphic lit={lit} selected={selected} />
          </div>
          <SignalHint signal={data.signal} openInput={data.openInput} cycleError={data.cycleError} />
          <LabelField id={id} label={data.label} placeholder="Output label" />
        </div>
        <Handle type="target" position={Position.Left} id={HANDLE.in} className={handleClass} style={{ top: '38%' }} />
      </div>
  );
}

const LABEL_SIZE_CLASS: Record<CircuitLabelSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-2xl',
};

export function LabelNode({ id, data, selected }: NodeProps<CircuitNode>) {
  const { setNodes } = useReactFlow<CircuitNode>();
  const textSize: CircuitLabelSize = data.textSize === 'sm' || data.textSize === 'lg' ? data.textSize : 'md';
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) {
      textareaRef.current?.focus();
      textareaRef.current?.select();
    }
  }, [editing]);

  useEffect(() => {
    if (!selected) setEditing(false);
  }, [selected]);

  return (
    <div
        className={`relative min-w-[120px] max-w-[280px] cursor-grab p-1 active:cursor-grabbing ${
          selected ? '[filter:drop-shadow(0_0_2px_#0284c7)_drop-shadow(0_0_6px_#38bdf8)]' : ''
        }`}
      >
        {editing ? (
          <textarea
            ref={textareaRef}
            className={`nodrag nopan w-full resize-none overflow-hidden rounded border border-sky-400 bg-white px-1.5 py-1 font-medium text-gray-900 outline-none dark:border-sky-500 dark:bg-gray-950 dark:text-gray-50 ${LABEL_SIZE_CLASS[textSize]}`}
            rows={2}
            value={data.label}
            placeholder="Label"
            aria-label="Canvas label"
            onChange={event => {
              const next = event.target.value;
              setNodes(nodes =>
                nodes.map(node => (node.id === id ? { ...node, data: { ...node.data, label: next } } : node))
              );
            }}
            onBlur={() => setEditing(false)}
            onMouseDown={event => event.stopPropagation()}
            onKeyDown={event => {
              if (event.key === 'Escape') {
                event.preventDefault();
                setEditing(false);
              }
            }}
          />
        ) : (
          <div
            className={`w-full rounded border px-1.5 py-1 font-medium text-gray-900 dark:text-gray-50 ${LABEL_SIZE_CLASS[textSize]} ${
              selected ? 'border-sky-400 dark:border-sky-500' : 'border-transparent'
            } whitespace-pre-wrap break-words`}
            onDoubleClick={event => {
              event.stopPropagation();
              setEditing(true);
            }}
            title="Drag to move · double-click to edit · right-click for size/delete"
          >
            {data.label || 'Label'}
          </div>
        )}
      </div>
  );
}
