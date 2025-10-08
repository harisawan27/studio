'use client';

import { Suspense, use, useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  getSummary,
  getExplanations,
  getPracticeQuestions,
  getRevisionPrompts,
} from '@/app/actions';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type StudyViewProps = {
  sessionId: string;
  ocrContent: string;
};

type AIContentPromise = {
  summary: Promise<string>;
  explanations: Promise<string>;
  questions: Promise<string[]>;
  revision: Promise<string[]>;
};

function ContentRenderer({ promise }: { promise: Promise<string> }) {
  const content = use(promise);
  return <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />;
}

function ListContentRenderer({ promise }: { promise: Promise<string[]> }) {
  const items = use(promise);
  return (
    <ul className="prose prose-lg dark:prose-invert max-w-none list-disc space-y-4 pl-5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function ContentSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-3/4" />
        </div>
    )
}

export function StudyView({ sessionId, ocrContent }: StudyViewProps) {
  const [promises] = useState<AIContentPromise>(() => ({
    summary: getSummary(sessionId, ocrContent),
    explanations: getExplanations(sessionId, ocrContent),
    questions: getPracticeQuestions(sessionId, ocrContent),
    revision: getRevisionPrompts(sessionId, ocrContent),
  }));

  const tabs = [
    { value: 'summary', label: 'Summary' },
    { value: 'explanations', label: 'Simple Explanations' },
    { value: 'questions', label: 'Practice Questions' },
    { value: 'revision', label: 'Revision Prompts' },
  ];

  return (
    <Tabs defaultValue="summary" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <Card className="mt-4">
        <CardContent className="p-6">
          <TabsContent value="summary">
            <Suspense fallback={<ContentSkeleton />}>
              <ContentRenderer promise={promises.summary} />
            </Suspense>
          </TabsContent>
          <TabsContent value="explanations">
            <Suspense fallback={<ContentSkeleton />}>
              <ContentRenderer promise={promises.explanations} />
            </Suspense>
          </TabsContent>
          <TabsContent value="questions">
            <Suspense fallback={<ContentSkeleton />}>
              <ListContentRenderer promise={promises.questions} />
            </Suspense>
          </TabsContent>
          <TabsContent value="revision">
            <Suspense fallback={<ContentSkeleton />}>
              <ListContentRenderer promise={promises.revision} />
            </Suspense>
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
