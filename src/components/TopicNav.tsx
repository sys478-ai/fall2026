"use client";

interface Topic {
  id: number;
  title: string;
  description: string;
}

interface TopicNavProps {
  topics: Topic[];
}

export default function TopicNav({ topics }: TopicNavProps) {
  return (
      <nav className="sticky top-[60px] w-84">
        <ol>
        {topics.map((topic) => (
          <li key={`topic-${topic.id}`} className="">
              <a
              key={topic.id}
              href={`#topic-${topic.id}-meeting-0`}
              className="flex text-left min-h-[2em] px-2 py-1 "
            >{topic.title}
            </a>
          </li>
        ))}
        </ol>
      </nav>
  );
} 