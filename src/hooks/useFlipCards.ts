'use client';

import { RefObject, useEffect } from 'react';

export function useFlipCards(containerRef: RefObject<HTMLElement | null>, content: string) {
  useEffect(() => {
    if (!containerRef.current) return;

    const flipCards = containerRef.current.querySelectorAll<HTMLElement>('.flip-card');

    const toggleFlip = (card: HTMLElement) => {
      card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', card.classList.contains('is-flipped') ? 'true' : 'false');
    };

    const handleClick = (event: Event) => {
      toggleFlip(event.currentTarget as HTMLElement);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleFlip(event.currentTarget as HTMLElement);
      }
    };

    flipCards.forEach((card) => {
      if (card.dataset.flipListenerAdded) return;

      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-pressed', 'false');
      card.addEventListener('click', handleClick);
      card.addEventListener('keydown', handleKeyDown);
      card.dataset.flipListenerAdded = 'true';
    });

    return () => {
      flipCards.forEach((card) => {
        card.removeEventListener('click', handleClick);
        card.removeEventListener('keydown', handleKeyDown);
        card.dataset.flipListenerAdded = '';
      });
    };
  }, [containerRef, content]);
}
