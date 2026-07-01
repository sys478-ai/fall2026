'use client';

import { ReactNode, useCallback, useState } from 'react';
import TopicSectionNav, { type TopicSectionNavItem } from '@/components/TopicSectionNav';
import AssignmentScenarioCards, { type AssignmentScenarioCardItem } from '@/components/assignments/AssignmentScenarioCards';
import TopicWorkList, { type TopicWorkItem } from '@/components/TopicWorkList';
import MarkdownContent from '@/components/MarkdownContent';
import {
  resolveAssignmentTabIdFromHash,
  resolveTopicCardIdFromHash,
} from '@/lib/assignment-series-hash';

interface AssignmentSeriesHubProps {
  navItems: TopicSectionNavItem[];
  overviewContent: string;
  stepContents: Array<{ tabId: string; content: string }>;
  scenarioItems: AssignmentScenarioCardItem[];
  checklistItems: TopicWorkItem[];
  seriesId: string;
}

function StepPanel({ content }: { content: string }) {
  return (
    <div className="assignment-page max-w-4xl">
      <MarkdownContent content={content} className="[&_a]:underline [&_a]:underline-offset-2" />
    </div>
  );
}

export default function AssignmentSeriesHub({
  navItems,
  overviewContent,
  stepContents,
  scenarioItems,
  checklistItems,
  seriesId,
}: AssignmentSeriesHubProps) {
  const [expandedScenarioId, setExpandedScenarioId] = useState<string | null>(null);

  const handleHashSync = useCallback((hashId: string) => {
    setExpandedScenarioId(resolveTopicCardIdFromHash(hashId));
  }, []);

  const panels: ReactNode[] = [
    <div key="overview" className="assignment-page max-w-4xl">
      <MarkdownContent content={overviewContent} className="[&_a]:underline [&_a]:underline-offset-2" />
    </div>,
    <AssignmentScenarioCards
      key="topics"
      items={scenarioItems}
      expandedId={expandedScenarioId}
      onExpandedChange={setExpandedScenarioId}
    />,
    ...stepContents.map(step => <StepPanel key={step.tabId} content={step.content} />),
    ...(checklistItems.length > 0
      ? [
          <TopicWorkList
            key="checklist"
            id="checklist"
            topicSlug={seriesId}
            items={checklistItems}
            kicker="Assignment Checklist"
            title="What to complete for this assignment"
            storageNamespace="assignment"
            trackProgress={false}
          />,
        ]
      : []),
  ];

  return (
    <TopicSectionNav
      items={navItems}
      ariaLabel="Assignment sections"
      resolveTabIdFromHash={resolveAssignmentTabIdFromHash}
      onHashSync={handleHashSync}
    >
      {panels}
    </TopicSectionNav>
  );
}
