import type { Metadata } from 'next';
import FieldGuideSectionLayout from '@/components/FieldGuideSectionLayout';
import FieldGuideFlipCards, { type FieldGuideFlipCardItem } from '@/components/FieldGuideFlipCards';
import { FieldGuideViewProvider, FieldGuideCardSection, FieldGuideCompactSection } from '@/components/FieldGuideView';
import { getAllPosts, type PostData } from '@/lib/markdown';

const HISTORY_OF_AI_CARD: FieldGuideFlipCardItem = {
  href: '/field-guide/ai-history',
  title: 'History of AI',
  subtitle: 'An interactive timeline from Turing to today, linking key moments to field guide recognition cards.',
  iconClass: 'fa-solid fa-clock-rotate-left',
  linkLabel: 'Open timeline →',
};

const TEMPLATE_CARD: FieldGuideFlipCardItem = {
  href: '/field-guide/technical-explainers/template',
  title: 'Technical Explainer Template',
  subtitle:
    'A working template for structuring new technical explainers, from the basic idea through course connections.',
  iconClass: 'fa-solid fa-clipboard-list',
  linkLabel: 'Open template →',
};

const EXPLAINER_ICONS: Record<string, string> = {
  'supervised-learning': 'fa-solid fa-tags',
  'unsupervised-learning': 'fa-solid fa-circle-nodes',
  'reinforcement-learning': 'fa-solid fa-trophy',
  'large-language-models': 'fa-solid fa-comments',
  'anomaly-detection': 'fa-solid fa-magnifying-glass-chart',
  'neural-networks': 'fa-solid fa-network-wired',
  'neuromorphic-computing': 'fa-solid fa-microchip',
};

function getExplainerCards(): FieldGuideFlipCardItem[] {
  const explainers = getAllPosts('technical-explainers')
    .filter(post => !post.hide_from_list && !post.no_render && post.card_type === 'technical-explainer')
    .map((post: PostData) => ({
      slug: `technical-explainers/${post.id}`,
      num: post.num,
      title: post.title,
      subtitle: (post as PostData & { subtitle?: string }).subtitle ?? post.excerpt,
      iconClass: EXPLAINER_ICONS[post.id] ?? 'fa-solid fa-gears',
    }))
    .sort((a, b) => (parseInt(a.num ?? '') || 999) - (parseInt(b.num ?? '') || 999));

  return [TEMPLATE_CARD, HISTORY_OF_AI_CARD, ...explainers];
}

export const metadata: Metadata = {
  title: 'Technical Explainers — AI Field Guide',
  description: 'Enough technical understanding to ask better critical questions.',
};

export default function TechnicalExplainersPage() {
  const cards = getExplainerCards();

  return (
    <FieldGuideSectionLayout contentDir="technical-explainers">
      {columns => (
        <FieldGuideViewProvider>
          <FieldGuideCardSection>
            <section className="space-y-5 border-t border-gray-200 px-4 pt-8 dark:border-gray-800 md:px-16">
              <FieldGuideFlipCards
                items={cards}
                preserveOrder
                columns={columns}
                palette="explainers"
                badgeLabel="Explainer"
                linkLabel="Open explainer →"
                iconClass="fa-solid fa-gears"
              />
            </section>
          </FieldGuideCardSection>
          <FieldGuideCompactSection
            cards={cards.map(card => ({
              title: card.title,
              subtitle: card.subtitle,
              href: card.href ?? (card.slug ? `/field-guide/${card.slug}` : undefined),
            }))}
          />
        </FieldGuideViewProvider>
      )}
    </FieldGuideSectionLayout>
  );
}
