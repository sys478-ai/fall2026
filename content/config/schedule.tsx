import React from 'react';
import topicsConfig from './topics.json';
import taxonomyConfig from './taxonomy.json';

interface TopicMeetingConfig {
  slug: string;
  title: string;
  focus: string;
  ethicalPatterns: string[];
  recognitionPatternNotes?: string[];
  themes: string[];
  braidElsiConnection: string;
}

interface TopicModuleConfig {
  id: number;
  slug: string;
  title: string;
  ethicalPatterns: string[];
  recognitionPatternNotes?: string[];
  themes: string[];
  unitFocus: string;
  braidElsiArc?: string;
  meetings: TopicMeetingConfig[];
}

interface TopicsConfigFile {
  modules: TopicModuleConfig[];
}

interface SemesterActivity {
  title: string;
  url?: string;
  draft?: number;
}

interface SemesterMeetingConfig {
  meetingSlug: string;
  date: string;
  holiday?: boolean;
  activities?: SemesterActivity[];
}

interface SemesterModuleConfig {
  moduleSlug: string;
  meetings: SemesterMeetingConfig[];
}

const patternTitleBySlug = Object.fromEntries(
  (taxonomyConfig.ethicalPatterns || []).map((pattern) => [pattern.slug, pattern.title])
) as Record<string, string>;

const topicModules = (topicsConfig as TopicsConfigFile).modules;

function getRecognitionPatternLabels(patternSlugs: string[], notes?: string[]) {
  return [...patternSlugs.map((slug) => patternTitleBySlug[slug] || slug), ...(notes || [])];
}

function renderModuleDescription(module: TopicModuleConfig) {
  const recognitionPatterns = getRecognitionPatternLabels(module.ethicalPatterns, module.recognitionPatternNotes);

  return (
    <>
      <ul className="list-spaced">
        {recognitionPatterns.length > 0 && (
          <li>
            <strong>Recognition patterns:</strong> {recognitionPatterns.join('; ')}
          </li>
        )}
        <li>
          <strong>Unit focus:</strong> {module.unitFocus}
        </li>
        {module.braidElsiArc && (
          <li>
            <strong>BRAID / ELSI arc:</strong> {module.braidElsiArc}
          </li>
        )}
      </ul>
    </>
  );
}

function renderMeetingDescription(meeting: TopicMeetingConfig) {
  const recognitionPatterns = getRecognitionPatternLabels(meeting.ethicalPatterns, meeting.recognitionPatternNotes);

  return (
    <>
      <p>
        <strong>Topic / focus:</strong> {meeting.focus}
      </p>
      {recognitionPatterns.length > 0 && (
        <>
          <p>
            <strong>Recognition patterns:</strong>
          </p>
          <ul className="list-tight">
            {recognitionPatterns.map((pattern) => (
              <li key={pattern}>{pattern}</li>
            ))}
          </ul>
        </>
      )}
      <p>
        <strong>BRAID / ELSI connection:</strong> {meeting.braidElsiConnection}
      </p>
    </>
  );
}

function buildMeeting(module: TopicModuleConfig, semesterMeeting: SemesterMeetingConfig) {
  const meeting = module.meetings.find((item) => item.slug === semesterMeeting.meetingSlug);

  if (!meeting) {
    throw new Error(`Missing meeting slug "${semesterMeeting.meetingSlug}" for module "${module.slug}"`);
  }

  return {
    slug: meeting.slug,
    topic: meeting.title,
    date: semesterMeeting.date,
    description: semesterMeeting.holiday ? 'No class.' : renderMeetingDescription(meeting),
    holiday: semesterMeeting.holiday || false,
    activities: semesterMeeting.activities,
    ethicalPatterns: meeting.ethicalPatterns,
    recognitionPatternNotes: meeting.recognitionPatternNotes,
    themes: meeting.themes,
  };
}

const semesterSchedule: SemesterModuleConfig[] = [
  {
    moduleSlug: 'what-is-intelligence',
    meetings: [
      {
        meetingSlug: 'course-launch-human-machine-intelligence-public-issue',
        date: 'Tue, Aug 18',
        activities: [
          { title: 'Course framing; “Is this AI?” activity' },
          {
            title: 'Career Module 1: Career quiz, values, coaching access',
            url: '/assignments/career-module01/',
            draft: 0
          }
        ]
      },
      {
        meetingSlug: 'what-counts-as-intelligence-human-animal-machine-social-embodied',
        date: 'Thu, Aug 20',
        activities: [{ title: 'Lab 0: Map an AI system' }]
      },
      {
        meetingSlug: 'measurement-categories-and-intelligence',
        date: 'Tue, Aug 25',
        activities: [{ title: 'Lab 1: Classification Is Not Neutral', url: '/assignments/lab01a/', draft: 0 }]
      },
      {
        meetingSlug: 'objectivity-neutrality-and-who-gets-defined',
        date: 'Thu, Aug 27',
        activities: [
          { title: 'Discussion: case + theory' },
          {
            title: 'Career Module 2: Three possible lives + SMART goals',
            url: '/assignments/career-module02/',
            draft: 0
          }
        ]
      },
      {
        meetingSlug: 'human-learning-memory-dreams-prediction-adaptation',
        date: 'Tue, Sep 1',
        activities: [{ title: 'Lab 2: Turning experience into data', url: '/assignments/lab02/', draft: 0 }]
      },
      {
        meetingSlug: 'embodiment-interiority-and-difficult-to-measure-experience',
        date: 'Thu, Sep 3',
        activities: [
          { title: 'Discussion: case + theory' },
          {
            title: 'Career Module 4: Strengths, accomplishments, durable skills',
            url: '/assignments/career-module04/',
            draft: 0
          }
        ]
      }
    ]
  },
  {
    moduleSlug: 'how-do-machines-learn',
    meetings: [
      {
        meetingSlug: 'data-rules-models-training-and-inference',
        date: 'Tue, Sep 8',
        activities: [{ title: 'Lab 3: Features Are Value Choices', url: '/assignments/lab03/', draft: 0 }]
      },
      {
        meetingSlug: 'generative-ai-as-one-paradigm-not-all-ai',
        date: 'Thu, Sep 10',
        activities: [
          { title: 'Discussion: case + theory' },
          {
            title: 'Career Module 3: Life after college + salary negotiation',
            url: '/assignments/career-module03/',
            draft: 0
          }
        ]
      },
      {
        meetingSlug: 'supervised-learning-scores-and-decisions',
        date: 'Tue, Sep 15',
        activities: [{ title: 'Lab 4: Thresholds and the Cost of Error', url: '/assignments/lab04/', draft: 0 }]
      },
      {
        meetingSlug: 'error-responsibility-and-decision-thresholds',
        date: 'Thu, Sep 17',
        activities: [{ title: 'Discussion: case + theory' }]
      },
      {
        meetingSlug: 'prediction-and-historical-data',
        date: 'Tue, Sep 22',
        activities: [{ title: 'Lab 5: Prediction and Historical Data', url: '/assignments/lab05/', draft: 0 }]
      },
      {
        meetingSlug: 'feedback-loops-and-neutral-prediction',
        date: 'Thu, Sep 24',
        activities: [
          { title: 'Discussion: case + theory' },
          {
            title: 'Career Module 5: Career storytelling + interview introductions',
            url: '/assignments/career-module05/',
            draft: 0
          }
        ]
      }
    ]
  },
  {
    moduleSlug: 'brain-inspired-computing-and-neuromorphic-systems',
    meetings: [
      {
        meetingSlug: 'neuroscience-primer-neurons-synapses-weights-plasticity',
        date: 'Tue, Sep 29',
        activities: [{ title: 'Lab 6A: Biological Neurons vs Artificial Neurons', url: '/assignments/lab06/', draft: 0 }]
      },
      {
        meetingSlug: 'neural-networks-opacity-trust-contestability-dependency',
        date: 'Thu, Oct 1',
        activities: [{ title: 'Discussion: case + theory' }, { title: 'Interview story practice' }]
      },
      {
        meetingSlug: 'fall-break',
        date: 'Tue, Oct 6',
        holiday: true,
        activities: [{ title: 'No class' }]
      },
      {
        meetingSlug: 'neuromorphic-computing-snns-spikes-timing',
        date: 'Thu, Oct 8',
        activities: [{ title: 'Lab 6B: Spiking / timing / simple SNN activity', url: '/assignments/lab13/', draft: 0 }]
      }
    ]
  },
  {
    moduleSlug: 'from-mechanism-to-implications',
    meetings: [
      {
        meetingSlug: 'unsupervised-learning-clustering-anomaly-detection',
        date: 'Tue, Oct 13',
        activities: [{ title: 'Lab 7: Anomaly Detection and Normal', url: '/assignments/lab08/', draft: 0 }]
      },
      {
        meetingSlug: 'normality-anomaly-surveillance',
        date: 'Thu, Oct 15',
        activities: [
          { title: 'Discussion: case + theory' },
          {
            title: 'Career Module 6: LinkedIn, networking, informational interviews',
            url: '/assignments/career-module06/',
            draft: 0
          }
        ]
      },
      {
        meetingSlug: 'sensors-edge-ai-wearables-biosensing-cybersecurity',
        date: 'Tue, Oct 20',
        activities: [{ title: 'Lab 8: Edge AI, Privacy, and Accountability', url: '/assignments/lab09/', draft: 0 }]
      },
      {
        meetingSlug: 'edge-ai-cloud-chips-vendors-human-judgment',
        date: 'Thu, Oct 22',
        activities: [{ title: 'Discussion: case + theory' }, { title: 'Informational interview prep' }]
      },
      {
        meetingSlug: 'hardware-memristors-energy-and-material-ai',
        date: 'Tue, Oct 27',
        activities: [{ title: 'Lab 9: Neuromorphic Hardware and Material AI', url: '/assignments/lab12/', draft: 0 }]
      },
      {
        meetingSlug: 'braid-neuromorphic-anomaly-detection',
        date: 'Thu, Oct 29',
        activities: [
          { title: 'Discussion: case + governance frameworks' },
          {
            title: 'Career Module 7: Cultural capital, fit, boundaries',
            url: '/assignments/career-module07/',
            draft: 0
          }
        ]
      },
      {
        meetingSlug: 'explainability-adaptive-hardware-and-public-understanding',
        date: 'Tue, Nov 3',
        activities: [{ title: 'Project workshop: technical explainer' }]
      },
      {
        meetingSlug: 'environmental-claims-efficiency-lifecycle-costs',
        date: 'Thu, Nov 5',
        activities: [{ title: 'Discussion / project workshop' }, { title: 'Professional boundaries / fit reflection' }]
      }
    ]
  },
  {
    moduleSlug: 'governing-uncertain-futures',
    meetings: [
      {
        meetingSlug: 'stakeholders-harms-benefits-governance',
        date: 'Tue, Nov 10',
        activities: [{ title: 'Project workshop: stakeholder map + harm/benefit analysis' }]
      },
      {
        meetingSlug: 'alternatives-refusal-repair-democratic-governance',
        date: 'Thu, Nov 12',
        activities: [{ title: 'Discussion / project workshop' }]
      },
      {
        meetingSlug: 'university-senior-symposium',
        date: 'Tue, Nov 17',
        holiday: true,
        activities: [{ title: 'No class' }]
      },
      {
        meetingSlug: 'governance-frameworks-nist-eu-ai-act-oecd-ieee',
        date: 'Thu, Nov 19',
        activities: [
          { title: 'Project conferences / studio work' },
          {
            title: 'Career Module 8: Career readiness synthesis presentation prep',
            url: '/assignments/career-module08/',
            draft: 0
          }
        ]
      }
    ]
  },
  {
    moduleSlug: 'public-communication-and-final-synthesis',
    meetings: [
      {
        meetingSlug: 'draft-presentations-peer-review',
        date: 'Tue, Nov 24',
        activities: [{ title: 'Peer critique + revision' }, { title: 'Career synthesis presentation draft' }]
      },
      {
        meetingSlug: 'thanksgiving-break',
        date: 'Thu, Nov 26',
        holiday: true,
        activities: [{ title: 'No class' }]
      },
      {
        meetingSlug: 'last-day-of-class-synthesis',
        date: 'Tue, Dec 1',
        activities: [{ title: 'Final synthesis workshop' }, { title: 'Career readiness synthesis due / share-out' }]
      },
      {
        meetingSlug: 'optional-support',
        date: 'Thu, Dec 3',
        activities: [{ title: 'Optional conferences or no class' }, { title: 'Optional support' }]
      }
    ]
  },
  {
    moduleSlug: 'final-exam-presentations',
    meetings: [
      {
        meetingSlug: 'final-presentations',
        date: 'Final exam period',
        activities: [{ title: 'Final reflection' }]
      }
    ]
  }
];

export const baseTopics = semesterSchedule.map((scheduledModule) => {
  const module = topicModules.find((item) => item.slug === scheduledModule.moduleSlug);

  if (!module) {
    throw new Error(`Missing module slug "${scheduledModule.moduleSlug}" in topics.json`);
  }

  return {
    id: module.id,
    slug: module.slug,
    title: module.title,
    description: renderModuleDescription(module),
    ethicalPatterns: module.ethicalPatterns,
    recognitionPatternNotes: module.recognitionPatternNotes,
    themes: module.themes,
    meetings: scheduledModule.meetings.map((meeting) => buildMeeting(module, meeting))
  };
});
