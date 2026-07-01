'use client';

import { RefObject, useEffect } from 'react';

function updateSequenceState(sequence: HTMLElement, visibleCount: number) {
  const steps = Array.from(sequence.querySelectorAll<HTMLElement>('[data-sequence-step]'));
  const totalSteps = steps.length;
  const clampedVisibleCount = Math.max(1, Math.min(visibleCount, totalSteps));

  steps.forEach((step, index) => {
    const isVisible = index < clampedVisibleCount;
    step.hidden = !isVisible;
    step.classList.toggle('sequence-step--visible', isVisible);
  });

  sequence.setAttribute('data-visible-steps', String(clampedVisibleCount));

  const nextButton = sequence.querySelector<HTMLButtonElement>('[data-sequence-next]');
  if (nextButton) {
    const isLastStep = clampedVisibleCount >= totalSteps;
    nextButton.disabled = isLastStep;
    nextButton.textContent = isLastStep ? 'Complete' : 'Next';
  }

  const showAllButton = sequence.querySelector<HTMLButtonElement>('[data-sequence-show-all]');
  if (showAllButton) {
    showAllButton.hidden = clampedVisibleCount >= totalSteps;
  }
}

export function useSequences(containerRef: RefObject<HTMLElement | null>, content: string) {
  useEffect(() => {
    if (!containerRef.current) return;

    const sequences = Array.from(containerRef.current.querySelectorAll<HTMLElement>('[data-sequence]'));
    const cleanups: Array<() => void> = [];

    sequences.forEach(sequence => {
      updateSequenceState(sequence, 1);

      const nextButton = sequence.querySelector<HTMLButtonElement>('[data-sequence-next]');
      const showAllButton = sequence.querySelector<HTMLButtonElement>('[data-sequence-show-all]');

      const handleNext = () => {
        const visibleCount = Number(sequence.getAttribute('data-visible-steps') || '1');
        updateSequenceState(sequence, visibleCount + 1);
      };

      const handleShowAll = () => {
        const totalSteps = Number(sequence.getAttribute('data-total-steps') || '1');
        updateSequenceState(sequence, totalSteps);
      };

      nextButton?.addEventListener('click', handleNext);
      showAllButton?.addEventListener('click', handleShowAll);

      cleanups.push(() => {
        nextButton?.removeEventListener('click', handleNext);
        showAllButton?.removeEventListener('click', handleShowAll);
      });
    });

    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
  }, [containerRef, content]);
}
