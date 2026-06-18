'use client';

import { useEffect } from 'react';

interface ScopedScrollRevealProps {
  selector: string;
}

export default function ScopedScrollReveal({ selector }: ScopedScrollRevealProps) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (elements.length === 0) return;

    elements.forEach((element, index) => {
      if (index === 0) {
        element.setAttribute('data-revealed', 'true');
      } else {
        element.setAttribute('data-revealed', 'false');
      }
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(element => element.setAttribute('data-revealed', 'true'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.18,
      }
    );

    elements.slice(1).forEach(element => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [selector]);

  return null;
}
