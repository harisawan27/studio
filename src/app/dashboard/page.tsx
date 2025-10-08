import { FileUpload } from '@/components/dashboard/file-upload';
import { StudySessionList } from '@/components/dashboard/study-session-list';
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back! Upload a new document or review a past study sessions.
        </p>
      </header>

      <div className="space-y-12">
        <section>
          <h2 className="mb-4 font-headline text-2xl font-semibold">
            Start a New Session
          </h2>
          <FileUpload />
        </section>

        <section>
          <h2 className="mb-4 font-headline text-2xl font-semibold">
            Recent Study Sessions
          </h2>
          <Suspense fallback={<StudySessionList.Skeleton />}>
            <StudySessionList />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
