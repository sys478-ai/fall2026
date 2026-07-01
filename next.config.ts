import type { NextConfig } from 'next';

// NOTE: redirects() is not applied in output: 'export' (static export) mode.
// These redirects are defined here for reference and for use if the site moves
// to a server-rendered deployment. For the static export, configure redirects
// at the web server / CDN level using the mappings below.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  basePath: '/fall2026',
  assetPrefix: '/fall2026/',
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // AI Deployment Patterns (was: Recognition Cards at /field-guide/pattern-XX)
      {
        source: '/fall2026/field-guide/pattern-03',
        destination: '/fall2026/field-guide/deployment-patterns/data-collected-for-one-purpose-gets-used-for-another',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-07',
        destination: '/fall2026/field-guide/deployment-patterns/thresholds-make-uncertainty-consequential',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-08',
        destination: '/fall2026/field-guide/deployment-patterns/prediction-imports-the-past',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-09',
        destination: '/fall2026/field-guide/deployment-patterns/opacity-shifts-authority',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-10',
        destination: '/fall2026/field-guide/deployment-patterns/automation-changes-accountability',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-11',
        destination:
          '/fall2026/field-guide/deployment-patterns/ai-can-create-dependency-cognitive-offloading-and-deskilling',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-12',
        destination:
          '/fall2026/field-guide/deployment-patterns/ai-systems-can-encourage-anthropomorphism-aliveness-or-sentience-claims',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-14',
        destination: '/fall2026/field-guide/deployment-patterns/extraction-can-be-disguised-as-innovation',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-15',
        destination: '/fall2026/field-guide/deployment-patterns/power-can-concentrate-in-infrastructure',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-16',
        destination: '/fall2026/field-guide/deployment-patterns/alternatives-can-be-foreclosed',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-18',
        destination: '/fall2026/field-guide/deployment-patterns/governance-is-often-framed-as-a-barrier-to-innovation',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-19',
        destination:
          '/fall2026/field-guide/deployment-patterns/technical-expertise-can-be-used-to-dismiss-democratic-oversight',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-21',
        destination:
          '/fall2026/field-guide/deployment-patterns/delay-refusal-and-non-adoption-can-be-responsible-choices',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-22',
        destination: '/fall2026/field-guide/deployment-patterns/this-system-treats-one-group-as-the-default',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-23',
        destination: '/fall2026/field-guide/deployment-patterns/changing-what-gets-measured-changes-what-exists',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-24',
        destination: '/fall2026/field-guide/deployment-patterns/the-people-most-affected-had-no-voice-in-the-design',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-25',
        destination: '/fall2026/field-guide/deployment-patterns/concentrated-harm-is-hidden-by-aggregate-benefit',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-26',
        destination: '/fall2026/field-guide/deployment-patterns/consent-was-obtained-but-wasnt-meaningful',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-27',
        destination: '/fall2026/field-guide/deployment-patterns/invisible-labor-makes-the-system-possible',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-28',
        destination: '/fall2026/field-guide/deployment-patterns/a-vulnerable-population-is-being-used-as-a-test-case',
        permanent: true,
      },
      // STS Concepts (was: Concept Cards at /field-guide/pattern-XX)
      {
        source: '/fall2026/field-guide/pattern-01',
        destination: '/fall2026/field-guide/sts-concepts/ai-systems-are-socio-technical-systems',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-02',
        destination: '/fall2026/field-guide/sts-concepts/data-is-produced-not-found',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-04',
        destination: '/fall2026/field-guide/sts-concepts/classification-is-not-neutral',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-05',
        destination: '/fall2026/field-guide/sts-concepts/normal-is-constructed',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-06',
        destination: '/fall2026/field-guide/sts-concepts/features-are-value-choices',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-13',
        destination: '/fall2026/field-guide/sts-concepts/ai-is-material',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-17',
        destination: '/fall2026/field-guide/sts-concepts/early-choices-can-shape-future-benefits-and-harms',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/pattern-20',
        destination: '/fall2026/field-guide/sts-concepts/governance-is-broader-than-regulation-alone',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/sts-concepts/anticipatory-governance',
        destination: '/fall2026/field-guide/governance/anticipatory-governance',
        permanent: true,
      },
      // Ethical Frameworks (was: /field-guide/frameworks/X)
      {
        source: '/fall2026/field-guide/frameworks/utilitarian',
        destination: '/fall2026/field-guide/ethical-frameworks/utilitarian',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/frameworks/care-ethics',
        destination: '/fall2026/field-guide/ethical-frameworks/care-ethics',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/frameworks/kantian',
        destination: '/fall2026/field-guide/ethical-frameworks/kantian',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/frameworks/rights-based',
        destination: '/fall2026/field-guide/ethical-frameworks/rights-based',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/frameworks/rawlsian',
        destination: '/fall2026/field-guide/ethical-frameworks/rawlsian',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/frameworks/procedural-justice',
        destination: '/fall2026/field-guide/ethical-frameworks/procedural-justice',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/frameworks/libertarian',
        destination: '/fall2026/field-guide/ethical-frameworks/libertarian',
        permanent: true,
      },
      // Section list page redirects
      {
        source: '/fall2026/field-guide/recognition',
        destination: '/fall2026/field-guide/deployment-patterns',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/concepts',
        destination: '/fall2026/field-guide/sts-concepts',
        permanent: true,
      },
      {
        source: '/fall2026/field-guide/frameworks',
        destination: '/fall2026/field-guide/ethical-frameworks',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
