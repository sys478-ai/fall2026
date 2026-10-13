import type { Metadata } from 'next';
import Link from 'next/link';
import ContentLayout from '@/components/ContentLayout';
import { getFieldGuideBannerClasses } from '@/lib/field-guide-palettes';

export const metadata: Metadata = {
  title: 'Symposium Research & Design Tips – AI Field Guide',
  description: 'Projects to learn from and questions to ask while designing your symposium exhibit.',
};

interface FeaturedLink {
  title: string;
  href: string;
  description?: string;
}

const FEATURED_LINKS: FeaturedLink[] = [
  {
    title: 'Survival of the Best Fit',
    href: 'https://www.survivalofthebestfit.com/game/',
    description: 'A game where you play a hiring manager and see how biased training data shapes automated hiring.',
  },
  {
    title: 'How Normal Am I?',
    href: 'https://www.hownormalami.eu/',
    description: 'An interactive walk-through of how face-analysis AI judges the person in front of the camera.',
  },
  {
    title: 'The Glass Room',
    href: 'https://www.theglassroom.org/',
    description: 'A pop-up exhibition from Tactical Tech that makes data and technology tangible for visitors.',
  },
  {
    title: 'The Data Nutrition Label',
    href: 'https://datanutrition.org/label/',
    description: 'A “nutrition label” for datasets that shows what is inside and what its limits are.',
  },
  {
    title: 'AI Incident Database',
    href: 'https://incidentdatabase.ai/',
    description: 'A searchable collection of reports of harms and near-harms caused by AI systems.',
  },
  {
    title: 'AI Blindspot',
    href: 'https://aiblindspot.media.mit.edu/index.html',
    description: 'A set of cards for spotting and addressing blindspots in AI systems (MIT Media Lab).',
  },
  {
    title: 'AI Resist List',
    href: 'https://airesistlist.org/',
  },
  {
    title: 'AI Now Institute',
    href: 'https://ainowinstitute.org/',
    description: 'Research on the social implications of AI and the concentration of power in the tech industry.',
  },
  {
    title: 'Algorithmic Justice League',
    href: 'https://www.ajl.org/',
    description: 'Research, art, and advocacy that highlight the harms and biases of AI systems.',
  },
  {
    title: 'AI Ethics for Middle School',
    href: 'https://www.media.mit.edu/projects/ai-ethics-for-middle-school/overview/',
    description: 'A curriculum project for teaching young learners about AI and ethics (MIT Media Lab).',
  },
  {
    title: 'Code.org: AI for Oceans',
    href: 'https://studio.code.org/courses/oceans/units/1/lessons/1/levels/2',
    description: 'A hands-on activity where learners train a model and see how its training data shapes its behavior.',
  },
  {
    title: 'AI Guardians',
    href: 'https://nellwatson.itch.io/ai-guardians',
    description: 'An interactive game about AI ethics, hosted on itch.io.',
  },
  {
    title: 'Better Images of AI',
    href: 'https://betterimagesofai.org/',
    description: 'Free, more accurate and diverse images for representing AI, with guidance on choosing them.',
  },
];

const CONTROVERSY_SIGNALS = [
  'Lawsuits, settlements, or regulator investigations',
  'Journalists or researchers who audited it and found uneven results',
  'Bans, moratoria, or new laws aimed at it',
  'Workers, artists, or communities organizing against it (strikes, open letters, protests)',
  'A company that paused, changed, or retired the product after criticism',
  'The maker and its critics describing the same system in very different ways',
];

const WHERE_TO_LOOK: FeaturedLink[] = [
  {
    title: 'OECD AI Incidents Monitor',
    href: 'https://oecd.ai/en/incidents',
    description: 'AI incidents and hazards drawn from news coverage worldwide, searchable by sector and type of harm.',
  },
  {
    title: 'AI Litigation Database (GWU)',
    href: 'https://blogs.gwu.edu/law-eti/ai-litigation-database/',
    description: 'A database of court cases involving AI, useful for finding systems people are suing over.',
  },
  {
    title: 'ChatGPT Is Eating the World',
    href: 'https://chatgptiseatingtheworld.com/',
    description: 'A tracker of copyright lawsuits against AI companies.',
  },
  {
    title: 'Atlas of Surveillance (EFF)',
    href: 'https://www.atlasofsurveillance.org/',
    description: 'A searchable map of surveillance technology used by U.S. law enforcement agencies.',
  },
  {
    title: 'Awful AI',
    href: 'https://github.com/daviddao/awful-ai',
    description: 'A curated list of troubling or harmful uses of AI.',
  },
  {
    title: 'AlgorithmWatch',
    href: 'https://algorithmwatch.org/en/',
    description: 'Research and reporting on automated decision-making and its effects on people.',
  },
  {
    title: 'The Markup',
    href: 'https://themarkup.org/',
    description: 'Investigative journalism about how technology is used on people.',
  },
  {
    title: 'ProPublica: Machine Bias',
    href: 'https://www.propublica.org/series/machine-bias',
    description: 'Investigations of algorithms used in criminal justice and other high-stakes decisions.',
  },
  {
    title: '404 Media',
    href: 'https://www.404media.co/',
    description: 'Independent tech journalism covering surveillance, platforms, and AI.',
  },
  {
    title: 'MIT Technology Review: Artificial Intelligence',
    href: 'https://www.technologyreview.com/topic/artificial-intelligence/',
    description: 'Reporting and analysis on new AI systems and their consequences.',
  },
  {
    title: 'Tech Policy Press',
    href: 'https://www.techpolicy.press/',
    description: 'Analysis of technology policy, regulation, and governance.',
  },
  {
    title: 'ACLU: Privacy & Technology',
    href: 'https://www.aclu.org/issues/privacy-technology',
    description: 'Cases and reports on surveillance and algorithmic decision-making.',
  },
  {
    title: 'Stanford AI Index',
    href: 'https://hai.stanford.edu/ai-index',
    description: 'An annual report with data on AI development, policy, and incidents.',
  },
];

const DESIGN_QUESTIONS = [
  ['Representation', 'What does the system receive, and how is the world turned into data?'],
  ['Procedure', 'What does the system actually do with that information?'],
  ['Priorities', 'What is it trying to get right, and who decided what counts as success?'],
  ['Impacts', 'What changes when the system is used, and for whom?'],
  ['History', 'How is this similar to technologies, systems, or controversies that came before? What is genuinely new?'],
] as const;

const BENEFITS = [
  ['Accessibility', 'captioning, speech-to-text, image descriptions, translation, assistive communication'],
  ['Healthcare', 'image analysis, clinical decision support, drug discovery, administrative burden reduction'],
  ['Science', 'protein structure, climate modeling, astronomy, materials discovery'],
  ['Education', 'tutoring, feedback, language support, practice generation'],
  ['Creative work', 'brainstorming, prototyping, editing, coding assistance'],
  ['Safety and maintenance', 'anomaly detection, fraud detection, predictive maintenance'],
  ['Everyday convenience', 'navigation, spam filtering, search, recommendations'],
] as const;

const LINK_CLASS =
  'text-[#0b5d8f] underline decoration-1 underline-offset-2 hover:text-violet-700 dark:text-[#8fc4ee] dark:hover:text-violet-300';

function LinkList({ links }: { links: FeaturedLink[] }) {
  return (
    <ul className="m-0 max-w-4xl list-disc space-y-4 pl-6 text-base leading-7 text-gray-800 dark:text-gray-200">
      {links.map(link => (
        <li key={link.href}>
          <p className="m-0! font-semibold">
            <a href={link.href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
              {link.title}
            </a>
          </p>
          {link.description && <p className="m-0!">{link.description}</p>}
        </li>
      ))}
    </ul>
  );
}

export default function SymposiumTipsPage() {
  const banner = getFieldGuideBannerClasses('explainers');

  return (
    <ContentLayout
      variant="list"
      fullWidth
      contentPadding={false}
      header={
        <header className={banner.header}>
          <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.18em] ${banner.label}`}>Field Guide</p>
          <h1 className="m-0! max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-gray-950 dark:text-gray-50">
            Symposium Research &amp; Design Tips
          </h1>
          <p className="mb-0 mt-5 max-w-4xl text-lg leading-6 text-gray-700 dark:text-gray-300">
            Projects to learn from, and questions to keep asking, as you research your system and design your exhibit.
          </p>
        </header>
      }
    >
      <div className="space-y-12 px-4 py-10 md:px-16">
        <section>
          <h2 className="mb-2 mt-0 text-3xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
            Projects to explore
          </h2>
          <p className="mb-6 mt-0 max-w-4xl text-base leading-7 text-gray-700 dark:text-gray-300">
            Public education and advocacy projects. Look at how each one gets a visitor to <em>do</em> something, not
            just read, and what you would borrow or change.
          </p>
          <LinkList links={FEATURED_LINKS} />
        </section>

        <section>
          <h2 className="mb-2 mt-0 text-3xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
            Where to find controversial systems
          </h2>
          <p className="mb-4 mt-0 max-w-4xl text-base leading-7 text-gray-700 dark:text-gray-300">
            A system is worth investigating when people disagree about it in public. Look for these signals:
          </p>
          <ul className="mb-6 mt-0 max-w-4xl list-disc space-y-2 pl-6 text-base leading-7 text-gray-800 dark:text-gray-200">
            {CONTROVERSY_SIGNALS.map(signal => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
          <p className="mb-4 mt-0 max-w-4xl text-base leading-7 text-gray-700 dark:text-gray-300">
            <strong>Search tip:</strong> pair a technology with words like <em>lawsuit</em>, <em>audit</em>,{' '}
            <em>investigation</em>, <em>ban</em>, <em>moratorium</em>, or <em>settlement</em>. The{' '}
            <a href="https://incidentdatabase.ai/" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
              AI Incident Database
            </a>{' '}
            above is a good first stop, and our own{' '}
            <Link href="/field-guide/examples" className={LINK_CLASS}>
              Examples
            </Link>{' '}
            show what a well-documented case looks like.
          </p>
          <p className="mb-4 mt-0 max-w-4xl text-base font-semibold leading-7 text-gray-950 dark:text-gray-50">
            Places to look
          </p>
          <LinkList links={WHERE_TO_LOOK} />
        </section>

        <section>
          <h2 className="mb-2 mt-0 text-3xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
            What makes a good exhibit piece?
          </h2>
          <p className="mb-4 mt-0 max-w-4xl text-base leading-7 text-gray-700 dark:text-gray-300">
            Whatever system you choose, help visitors see what is happening beneath the surface:
          </p>
          <ol className="m-0 max-w-4xl list-decimal space-y-3 pl-6 text-base leading-7 text-gray-800 dark:text-gray-200">
            {DESIGN_QUESTIONS.map(([label, question]) => (
              <li key={label}>
                <strong>{label}:</strong> {question}
              </li>
            ))}
          </ol>
          <p className="mb-0 mt-4 max-w-4xl text-base leading-7 text-gray-800 dark:text-gray-200">
            Across all five, keep asking: <strong>How are we deciding what should happen?</strong>
          </p>
        </section>

        <section>
          <h2 className="mb-2 mt-0 text-3xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">
            Keep the benefits in view
          </h2>
          <p className="mb-4 mt-0 max-w-4xl text-base leading-7 text-gray-700 dark:text-gray-300">
            You can be critical of many AI systems and still engage with what they offer. AI isn&apos;t just one thing.
          </p>
          <ul className="m-0 max-w-4xl list-disc space-y-2 pl-6 text-base leading-7 text-gray-800 dark:text-gray-200">
            {BENEFITS.map(([label, detail]) => (
              <li key={label}>
                <strong>{label}:</strong> {detail}
              </li>
            ))}
          </ul>
        </section>

        <div>
          <Link
            href="/field-guide"
            className="inline-flex items-center rounded-full bg-violet-700 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-violet-800 dark:bg-violet-500 dark:hover:bg-violet-400"
          >
            Back to Field Guide
          </Link>
        </div>
      </div>
    </ContentLayout>
  );
}
