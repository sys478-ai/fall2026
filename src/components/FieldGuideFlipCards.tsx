'use client';

import Link from 'next/link';
import { useCallback, useState, type KeyboardEvent } from 'react';
import ThemedImage from './ThemedImage';

export type FieldGuideFlipCardPalette =
  | 'patterns'
  | 'sts'
  | 'examples'
  | 'frameworks'
  | 'explainers';

export interface FieldGuideFlipCardItem {
  slug?: string;
  href?: string;
  title: string;
  subtitle?: string;
  shortDescription?: string;
  featured_image?: string;
  featured_image_dark?: string;
  num?: string;
  tags?: { label: string; href?: string }[];
  iconClass?: string;
  linkLabel?: string;
  isMissing?: boolean;
}

function FieldGuideFlipCard({
  item,
  badgeLabel,
  linkLabel: defaultLinkLabel,
  iconClass: defaultIconClass,
}: {
  item: FieldGuideFlipCardItem;
  badgeLabel: string;
  linkLabel: string;
  iconClass: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const href = item.href ?? (item.slug ? `/field-guide/${item.slug}` : undefined);
  const iconClass = item.iconClass ?? defaultIconClass;
  const linkLabel = item.linkLabel ?? defaultLinkLabel;
  const showShortDescription =
    item.shortDescription && item.shortDescription.trim() !== item.subtitle?.trim();

  const toggle = useCallback(() => {
    setFlipped(current => !current);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    },
    [toggle],
  );

  return (
    <div
      className={`flip-card${flipped ? ' is-flipped' : ''}${item.isMissing ? ' flip-card--missing' : ''}`}
      aria-label={`${item.title} — click to flip`}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      onClick={toggle}
      onKeyDown={handleKeyDown}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {item.featured_image ? (
            <div className="flip-card-thumb" aria-hidden="true">
              <ThemedImage
                src={item.featured_image}
                darkSrc={item.featured_image_dark}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flip-card-icon" aria-hidden="true">
              <i className={iconClass} />
            </div>
          )}
          {item.num && (
            <span className="flip-card-badge">
              {badgeLabel} {item.num}
            </span>
          )}
          <h3>{item.title}</h3>
          <span className="flip-card-hint">Click to flip</span>
        </div>
        <div className="flip-card-back">
          <h3>{item.title}</h3>
          {item.subtitle && <p>{item.subtitle}</p>}
          {showShortDescription && <p>{item.shortDescription}</p>}
          {item.tags && item.tags.length > 0 && (
            <div className="flip-card-tags">
              {item.tags.map(tag => (
                tag.href ? (
                  <Link
                    key={tag.label}
                    href={tag.href}
                    className="flip-card-tag"
                    onClick={event => event.stopPropagation()}
                  >
                    {tag.label}
                  </Link>
                ) : (
                  <span key={tag.label} className="flip-card-tag">
                    {tag.label}
                  </span>
                )
              ))}
            </div>
          )}
          {href && (
            <Link
              href={href}
              className="flip-card-link"
              onClick={event => event.stopPropagation()}
            >
              {linkLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FieldGuideFlipCards({
  items,
  preserveOrder = false,
  columns = 1,
  palette = 'sts',
  badgeLabel = 'Concept',
  linkLabel = 'Open →',
  iconClass = 'fa-solid fa-lightbulb',
}: {
  items: FieldGuideFlipCardItem[];
  preserveOrder?: boolean;
  columns?: 1 | 2;
  palette?: FieldGuideFlipCardPalette;
  badgeLabel?: string;
  linkLabel?: string;
  iconClass?: string;
}) {
  const sortedItems = preserveOrder
    ? items
    : [...items].sort((a, b) => (parseInt(a.num ?? '') || 999) - (parseInt(b.num ?? '') || 999));

  return (
    <div
      id="field-guide"
      className={`prose max-w-none ${columns === 2 ? 'max-w-6xl' : 'max-w-5xl'}`}
    >
      <div
        className={`flip-card-grid flip-card-grid--field-guide flip-card-grid--palette-${palette}`}
        data-toc-exclude="true"
        style={{
          gridTemplateColumns:
            columns === 2
              ? 'repeat(auto-fit, minmax(260px, 1fr))'
              : 'repeat(auto-fit, minmax(220px, 1fr))',
        }}
      >
        {sortedItems.map(item => (
          <FieldGuideFlipCard
            key={item.href ?? item.slug ?? item.title}
            item={item}
            badgeLabel={badgeLabel}
            linkLabel={linkLabel}
            iconClass={iconClass}
          />
        ))}
      </div>
    </div>
  );
}
