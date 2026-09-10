'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { CIRCUIT_PRESETS } from '@/lib/circuit-sandbox/presets';
import type { SavedDrawing } from '@/lib/circuit-sandbox/storage';
import type { CircuitComponentType } from '@/lib/circuit-sandbox/types';

type MenuKey = 'examples' | 'drawings' | null;

const menuBtn =
  'rounded px-2.5 py-1 text-sm text-gray-800 hover:bg-gray-200/80 dark:text-gray-100 dark:hover:bg-gray-800';
const menuItem =
  'flex w-full items-start gap-2 px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800';
const toolBtn =
  'flex h-8 min-w-8 items-center justify-center rounded px-1.5 text-gray-700 hover:bg-gray-200/80 dark:text-gray-200 dark:hover:bg-gray-800';

function MenuPanel({
  open,
  align = 'left',
  children,
}: {
  open: boolean;
  align?: 'left' | 'right';
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      className={`absolute top-full z-30 mt-1 min-w-[220px] overflow-hidden rounded-md border border-gray-300 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-950 ${
        align === 'right' ? 'right-0' : 'left-0'
      }`}
      role="menu"
    >
      {children}
    </div>
  );
}

function ToolIconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" className={toolBtn} onClick={onClick} aria-label={label} title={label}>
      {children}
    </button>
  );
}

/** Font Awesome for common controls; gate tools use short text labels. */
const ADD_TOOLS: { type: CircuitComponentType; label: string; icon: ReactNode }[] = [
  {
    type: 'switch',
    label: 'Add toggle',
    icon: <i className="fa-solid fa-toggle-on text-sm" aria-hidden />,
  },
  {
    type: 'and',
    label: 'Add AND gate',
    icon: <span className="text-[10px] font-bold tracking-tight" aria-hidden>AND</span>,
  },
  {
    type: 'or',
    label: 'Add OR gate',
    icon: <span className="text-[10px] font-bold tracking-tight" aria-hidden>OR</span>,
  },
  {
    type: 'xor',
    label: 'Add XOR gate',
    icon: <span className="text-[10px] font-bold tracking-tight" aria-hidden>XOR</span>,
  },
  {
    type: 'not',
    label: 'Add NOT gate',
    icon: <span className="text-[10px] font-bold tracking-tight" aria-hidden>NOT</span>,
  },
  {
    type: 'bulb',
    label: 'Add bulb',
    icon: <i className="fa-regular fa-lightbulb text-sm" aria-hidden />,
  },
  {
    type: 'label',
    label: 'Add label',
    icon: <i className="fa-solid fa-font text-xs" aria-hidden />,
  },
];

export default function CircuitMenuBar({
  isFullscreen,
  savedDrawings,
  onAddComponent,
  onOpenPreset,
  onOpenSaved,
  onDeleteSaved,
  onSave,
  onSaveAs,
  onNewBlank,
  onClear,
  onToggleFullscreen,
}: {
  isFullscreen: boolean;
  savedDrawings: SavedDrawing[];
  onAddComponent: (type: CircuitComponentType) => void;
  onOpenPreset: (id: string) => void;
  onOpenSaved: (id: string) => void;
  onDeleteSaved: (id: string) => void;
  onSave: () => void;
  onSaveAs: () => void;
  onNewBlank: () => void;
  onClear: () => void;
  onToggleFullscreen: () => void;
}) {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!barRef.current?.contains(event.target as Node)) setOpenMenu(null);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenMenu(null);
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  function toggleMenu(key: MenuKey) {
    setOpenMenu(current => (current === key ? null : key));
  }

  return (
    <div
      ref={barRef}
      className="flex items-center gap-1 rounded-lg border border-gray-300 bg-gray-100/90 px-1.5 py-1 dark:border-gray-700 dark:bg-gray-900/80"
      role="menubar"
      aria-label="Circuit sandbox menu"
    >
      <div className="relative">
        <button
          type="button"
          className={`${menuBtn} ${openMenu === 'examples' ? 'bg-gray-200/80 dark:bg-gray-800' : ''}`}
          aria-haspopup="menu"
          aria-expanded={openMenu === 'examples'}
          onClick={() => toggleMenu('examples')}
        >
          Examples
        </button>
        <MenuPanel open={openMenu === 'examples'}>
          {CIRCUIT_PRESETS.map(preset => (
            <button
              key={preset.id}
              type="button"
              role="menuitem"
              className={menuItem}
              onClick={() => {
                onOpenPreset(preset.id);
                setOpenMenu(null);
              }}
            >
              <span>
                <span className="block font-medium">{preset.name}</span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">{preset.description}</span>
              </span>
            </button>
          ))}
        </MenuPanel>
      </div>

      <div className="relative">
        <button
          type="button"
          className={`${menuBtn} ${openMenu === 'drawings' ? 'bg-gray-200/80 dark:bg-gray-800' : ''}`}
          aria-haspopup="menu"
          aria-expanded={openMenu === 'drawings'}
          onClick={() => toggleMenu('drawings')}
        >
          My drawings
        </button>
        <MenuPanel open={openMenu === 'drawings'}>
          {savedDrawings.length === 0 ? (
            <p className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">No saved drawings yet.</p>
          ) : (
            savedDrawings.map(drawing => (
              <div key={drawing.id} className="flex items-stretch">
                <button
                  type="button"
                  role="menuitem"
                  className={`${menuItem} flex-1`}
                  onClick={() => {
                    onOpenSaved(drawing.id);
                    setOpenMenu(null);
                  }}
                >
                  <span>
                    <span className="block font-medium">{drawing.name}</span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      {new Date(drawing.updatedAt).toLocaleString()}
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  className="px-2 text-xs text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                  aria-label={`Delete ${drawing.name}`}
                  onClick={() => onDeleteSaved(drawing.id)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </MenuPanel>
      </div>

      <button type="button" className={menuBtn} onClick={onSave}>
        Save
      </button>
      <button type="button" className={menuBtn} onClick={onSaveAs}>
        Save as…
      </button>

      <span className="mx-1 h-5 w-px bg-gray-300 dark:bg-gray-700" aria-hidden />

      <div className="flex items-center gap-0.5" role="group" aria-label="Add parts">
        {ADD_TOOLS.map(tool => (
          <ToolIconButton key={tool.type} label={tool.label} onClick={() => onAddComponent(tool.type)}>
            {tool.icon}
          </ToolIconButton>
        ))}
      </div>

      <span className="mx-1 h-5 w-px bg-gray-300 dark:bg-gray-700" aria-hidden />

      <button type="button" className={menuBtn} onClick={onNewBlank}>
        New
      </button>
      <button type="button" className={menuBtn} onClick={onClear}>
        Clear
      </button>

      <button
        type="button"
        onClick={onToggleFullscreen}
        className={`${menuBtn} ml-auto flex h-8 w-8 shrink-0 items-center justify-center p-0`}
        aria-pressed={isFullscreen}
        aria-label={isFullscreen ? 'Exit full screen' : 'Full screen'}
        title={isFullscreen ? 'Exit full screen' : 'Full screen'}
      >
        <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'}`} aria-hidden />
      </button>
    </div>
  );
}
