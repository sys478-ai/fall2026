import type { ReactNode } from 'react';
import './sts-concept-sections.css';

export const STS_QUESTIONS_SECTION_LABEL = 'Questions To Ask';

const TOC_EXCLUDED_SECTIONS = new Set(['Examples']);

interface StsConceptSectionProps {
  label: string;
  children: ReactNode;
  className?: string;
}

function getSectionClassName(label: string, className?: string): string {
  const classes = ['sts-concept-section', 'space-y-4', 'pt-4'];

  if (label === STS_QUESTIONS_SECTION_LABEL) {
    classes.push('sts-concept-section--questions');
  }

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
}

export default function StsConceptSection({ label, children, className }: StsConceptSectionProps) {
  const excludeFromToc = TOC_EXCLUDED_SECTIONS.has(label);

  if (!label.trim()) {
    return (
      <div className="sts-concept-section sts-concept-section--intro min-w-0 space-y-4 pt-4 [&_li]:my-2 [&_ol]:pl-5! [&_ul]:pl-5!">
        {children}
      </div>
    );
  }

  return (
    <section
      className={getSectionClassName(label, className)}
      {...(excludeFromToc ? { 'data-toc-exclude': 'true' } : {})}
    >
      <h2 className="sts-concept-section__heading text-3xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
        {label}
      </h2>
      <div className="sts-concept-section__content min-w-0 [&_li]:my-2 [&_ol]:pl-5! [&_ul]:pl-5!">{children}</div>
    </section>
  );
}
