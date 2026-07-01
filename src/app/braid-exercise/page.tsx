import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContentLayout from '@/components/ContentLayout';
import FieldGuideFlipCards, { type FieldGuideFlipCardItem } from '@/components/FieldGuideFlipCards';
import MarkdownContent from '@/components/MarkdownContent';
import PageHeader from '@/components/PageHeader';
import QuickLinksNav from '@/components/QuickLinksNav';
import { normalizeFeaturedImagePath, getDarkFeaturedImagePath } from '@/lib/featured-image';
import { getAllPosts, getPostData, type PostData } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'BRAID Exercise',
  description:
    'A curated playlist of BRAID-specific SYS 478 materials for technical grounding, STS analysis, and anticipatory governance.',
};

const TECHNICAL_EXPLAINER_ICONS: Record<string, string> = {
  'anomaly-detection': 'fa-solid fa-magnifying-glass-chart',
  'neural-networks': 'fa-solid fa-network-wired',
  'neuromorphic-computing': 'fa-solid fa-microchip',
  'unsupervised-learning': 'fa-solid fa-circle-nodes',
};

const STS_CONCEPT_ICONS: Record<string, string> = {
  'sts-framing-shapes-governance': 'fa-solid fa-quote-left',
  'sts-governance': 'fa-solid fa-gavel',
  'sts-materiality': 'fa-solid fa-mountain-sun',
  'sts-normal-is-constructed': 'fa-solid fa-ruler-horizontal',
  'sts-situated-knowledge': 'fa-solid fa-location-dot',
  'sts-sociotechnical-imaginaries': 'fa-solid fa-masks-theater',
};

function getPostMap(subdirectory: string) {
  return new Map(getAllPosts(subdirectory).map(post => [post.id, post]));
}

function toFieldGuideCardItem(
  post: PostData,
  options?: {
    slugPrefix?: string;
    subtitle?: string;
    iconClass?: string;
  }
): FieldGuideFlipCardItem {
  const slugPrefix = options?.slugPrefix;
  const pathSlug = post.slug ?? post.id;

  return {
    slug: slugPrefix ? `${slugPrefix}/${pathSlug}` : pathSlug,
    num: post.num,
    title: post.title,
    subtitle: options?.subtitle ?? ((post as PostData & { subtitle?: string }).subtitle ?? post.excerpt),
    featured_image: normalizeFeaturedImagePath(post.featured_image),
    featured_image_dark: getDarkFeaturedImagePath(post.featured_image),
    iconClass: options?.iconClass,
  };
}

function makeMissingCard(title: string, subtitle: string, iconClass: string): FieldGuideFlipCardItem {
  return {
    title: `Missing: ${title}`,
    subtitle,
    iconClass,
    isMissing: true,
  };
}

function Section({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-5 border-t border-gray-200 pt-8 dark:border-gray-800">
      <div className="space-y-3">
        <h2 className="m-0 text-3xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">{title}</h2>
        {intro && <p className="mb-0 max-w-4xl text-base leading-7 text-gray-700 dark:text-gray-300">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

export default async function BraidExercisePage() {
  const postData = await getPostData('braid-exercise');

  const technicalPosts = getPostMap('technical-explainers');
  const stsPosts = getPostMap('sts-concepts');
  const patternPosts = getPostMap('ai-deployment-patterns');
  const frameworkPosts = getPostMap('ethical-frameworks');
  const governancePosts = getPostMap('governance');
  const examplePosts = getPostMap('examples');

  const technicalCards: FieldGuideFlipCardItem[] = [
    toFieldGuideCardItem(technicalPosts.get('neuromorphic-computing')!, {
      slugPrefix: 'technical-explainers',
      iconClass: TECHNICAL_EXPLAINER_ICONS['neuromorphic-computing'],
    }),
    toFieldGuideCardItem(technicalPosts.get('anomaly-detection')!, {
      slugPrefix: 'technical-explainers',
      iconClass: TECHNICAL_EXPLAINER_ICONS['anomaly-detection'],
    }),
    toFieldGuideCardItem(technicalPosts.get('unsupervised-learning')!, {
      slugPrefix: 'technical-explainers',
      iconClass: TECHNICAL_EXPLAINER_ICONS['unsupervised-learning'],
    }),
    toFieldGuideCardItem(technicalPosts.get('neural-networks')!, {
      slugPrefix: 'technical-explainers',
      iconClass: TECHNICAL_EXPLAINER_ICONS['neural-networks'],
    }),
    makeMissingCard(
      'Event-Driven Computation',
      'No dedicated field-guide card exists yet for spikes, timing, and event-driven processing as a standalone explainer.',
      'fa-solid fa-bolt'
    ),
    makeMissingCard(
      'On-Chip Learning and State',
      'No dedicated field-guide card exists yet for hardware-level learning, changing internal state, and traceability concerns.',
      'fa-solid fa-memory'
    ),
  ];

  const stsCards: FieldGuideFlipCardItem[] = [
    toFieldGuideCardItem(stsPosts.get('sts-materiality')!, {
      slugPrefix: 'sts-concepts',
      iconClass: STS_CONCEPT_ICONS['sts-materiality'],
    }),
    toFieldGuideCardItem(stsPosts.get('sts-framing-shapes-governance')!, {
      slugPrefix: 'sts-concepts',
      iconClass: STS_CONCEPT_ICONS['sts-framing-shapes-governance'],
    }),
    toFieldGuideCardItem(stsPosts.get('sts-sociotechnical-imaginaries')!, {
      slugPrefix: 'sts-concepts',
      iconClass: STS_CONCEPT_ICONS['sts-sociotechnical-imaginaries'],
    }),
    toFieldGuideCardItem(stsPosts.get('sts-situated-knowledge')!, {
      slugPrefix: 'sts-concepts',
      iconClass: STS_CONCEPT_ICONS['sts-situated-knowledge'],
    }),
    toFieldGuideCardItem(stsPosts.get('sts-normal-is-constructed')!, {
      slugPrefix: 'sts-concepts',
      iconClass: STS_CONCEPT_ICONS['sts-normal-is-constructed'],
    }),
    toFieldGuideCardItem(stsPosts.get('sts-governance')!, {
      slugPrefix: 'sts-concepts',
      iconClass: STS_CONCEPT_ICONS['sts-governance'],
    }),
  ];

  const patternCards: FieldGuideFlipCardItem[] = [
    toFieldGuideCardItem(patternPosts.get('dp-baseline-and-categories')!, { slugPrefix: 'deployment-patterns' }),
    toFieldGuideCardItem(patternPosts.get('dp-thresholds')!, { slugPrefix: 'deployment-patterns' }),
    toFieldGuideCardItem(patternPosts.get('dp-opacity')!, { slugPrefix: 'deployment-patterns' }),
    toFieldGuideCardItem(patternPosts.get('dp-accountability-gap')!, { slugPrefix: 'deployment-patterns' }),
    toFieldGuideCardItem(patternPosts.get('dp-asymmetric-visibility')!, { slugPrefix: 'deployment-patterns' }),
    toFieldGuideCardItem(patternPosts.get('dp-infrastructure-power')!, { slugPrefix: 'deployment-patterns' }),
    toFieldGuideCardItem(patternPosts.get('dp-anthropomorphism')!, { slugPrefix: 'deployment-patterns' }),
  ];

  const exampleCards: FieldGuideFlipCardItem[] = [
    {
      href: '/field-guide/examples/workplace-wellness-insurance',
      title: examplePosts.get('workplace-wellness-insurance')!.title,
      subtitle: examplePosts.get('workplace-wellness-insurance')!.excerpt,
      iconClass: 'fa-solid fa-briefcase-medical',
    },
    {
      href: '/field-guide/examples/prism-surveillance',
      title: examplePosts.get('prism-surveillance')!.title,
      subtitle: examplePosts.get('prism-surveillance')!.excerpt,
      iconClass: 'fa-solid fa-satellite-dish',
    },
    {
      href: '/field-guide/examples/speech-recognition-accent',
      title: examplePosts.get('speech-recognition-accent')!.title,
      subtitle: examplePosts.get('speech-recognition-accent')!.excerpt,
      iconClass: 'fa-solid fa-microphone-lines',
    },
    {
      href: '/field-guide/examples/pulse-oximeters-skin-tone',
      title: examplePosts.get('pulse-oximeters-skin-tone')!.title,
      subtitle: examplePosts.get('pulse-oximeters-skin-tone')!.excerpt,
      iconClass: 'fa-solid fa-heart-pulse',
    },
    {
      href: '/field-guide/examples/face-recognition-wrongful-arrests',
      title: examplePosts.get('face-recognition-wrongful-arrests')!.title,
      subtitle: examplePosts.get('face-recognition-wrongful-arrests')!.excerpt,
      iconClass: 'fa-solid fa-camera',
    },
    {
      href: '/field-guide/examples/boston-street-bump',
      title: examplePosts.get('boston-street-bump')!.title,
      subtitle: examplePosts.get('boston-street-bump')!.excerpt,
      iconClass: 'fa-solid fa-road',
    },
  ];

  const ethicalCards: FieldGuideFlipCardItem[] = [
    toFieldGuideCardItem(frameworkPosts.get('ef-procedural-justice')!, {
      slugPrefix: 'ethical-frameworks',
      iconClass: 'fa-solid fa-gavel',
    }),
    toFieldGuideCardItem(frameworkPosts.get('ef-rights-based')!, {
      slugPrefix: 'ethical-frameworks',
      iconClass: 'fa-solid fa-user-shield',
    }),
    {
      href: '/field-guide/governance/anticipatory-governance',
      title: governancePosts.get('anticipatory-governance')!.title,
      subtitle: (governancePosts.get('anticipatory-governance') as PostData & { subtitle?: string }).subtitle,
      featured_image: normalizeFeaturedImagePath(governancePosts.get('anticipatory-governance')!.featured_image),
      featured_image_dark: getDarkFeaturedImagePath(governancePosts.get('anticipatory-governance')!.featured_image),
      iconClass: 'fa-solid fa-binoculars',
    },
    {
      href: '/field-guide/governance/how-to-use-anticipatory-governance',
      title: governancePosts.get('how-to-use-anticipatory-governance')!.title,
      subtitle: (governancePosts.get('how-to-use-anticipatory-governance') as PostData & { subtitle?: string }).subtitle,
      featured_image: normalizeFeaturedImagePath(governancePosts.get('how-to-use-anticipatory-governance')!.featured_image),
      featured_image_dark: getDarkFeaturedImagePath(governancePosts.get('how-to-use-anticipatory-governance')!.featured_image),
      iconClass: 'fa-solid fa-list-check',
    },
    makeMissingCard(
      'Auditability and Traceability',
      'No dedicated field-guide card exists yet for audit trails, hardware traceability, and post-hoc reconstruction in adaptive edge systems.',
      'fa-solid fa-file-circle-question'
    ),
  ];

  return (
    <ContentLayout
      variant="detail-with-toc"
      leftNav={<QuickLinksNav />}
      showToc={postData.toc !== false}
      tocMaxLevel={postData.heading_max_level || 2}
    >
      <Breadcrumbs
        items={[
          { label: 'Syllabus', href: '/' },
          { label: postData.title },
        ]}
      />
      <PageHeader title={postData.title} excerpt={postData.excerpt} borderless />
      <MarkdownContent content={postData.content} />

      <Section
        title="BRAID-Specific Technical Grounding"
        intro="These are the most relevant technical explainer cards for understanding neuromorphic anomaly detection, plus a couple of clear gaps where a dedicated field-guide card does not yet exist."
      >
        <FieldGuideFlipCards
          items={technicalCards}
          preserveOrder
          columns={1}
          palette="explainers"
          badgeLabel="Explainer"
          linkLabel="Open explainer →"
          iconClass="fa-solid fa-gears"
        />
      </Section>

      <Section
        title="STS Concepts for the BRAID Case"
        intro="Use these cards to connect the technical system to knowledge, materiality, framing, normality, and governance."
      >
        <FieldGuideFlipCards
          items={stsCards}
          preserveOrder
          columns={1}
          palette="sts"
          badgeLabel="Concept"
          linkLabel="Open concept →"
          iconClass="fa-solid fa-lightbulb"
        />
      </Section>

      <Section
        title="Recognition Patterns Most Relevant to BRAID"
        intro="These recurring deployment patterns are especially useful for moving from mechanism to downstream institutional and governance questions."
      >
        <FieldGuideFlipCards
          items={patternCards}
          preserveOrder
          columns={1}
          palette="patterns"
          badgeLabel="Pattern"
          linkLabel="Open pattern →"
          iconClass="fa-solid fa-magnifying-glass"
        />
      </Section>

      <Section
        title="Examples to Compare Against the BRAID Case"
        intro="These examples help students practice on more familiar systems before or alongside the neuromorphic case."
      >
        <FieldGuideFlipCards
          items={exampleCards}
          preserveOrder
          columns={1}
          palette="examples"
          linkLabel="Open example →"
          iconClass="fa-solid fa-landmark"
        />
      </Section>

      <Section
        title="Ethical and Governance Issues"
        intro="These are the most useful framework and governance cards for asking what should be documented, contested, limited, or shaped before neuromorphic anomaly detection becomes normalized infrastructure."
      >
        <FieldGuideFlipCards
          items={ethicalCards}
          preserveOrder
          columns={1}
          palette="frameworks"
          badgeLabel="Framework"
          linkLabel="Open page →"
          iconClass="fa-solid fa-scale-balanced"
        />
      </Section>
    </ContentLayout>
  );
}
