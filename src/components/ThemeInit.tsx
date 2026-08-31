'use client';

import { useServerInsertedHTML } from 'next/navigation';

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;var s=t==='dark'||(!t&&d);var h=document.documentElement;if(s){h.classList.add('dark');h.style.colorScheme='dark';}else{h.classList.remove('dark');h.style.colorScheme='light';}}catch(e){}})();`;

export default function ThemeInit() {
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
  ));

  return null;
}
