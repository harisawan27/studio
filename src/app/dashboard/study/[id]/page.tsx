import { StudyView } from '@/components/study/study-view';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Mock function to get session details. Replace with actual data fetching.
async function getSessionDetails(id: string) {
  return {
    id,
    title: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    subject: 'Mock Subject',
    // In a real app, you would fetch the OCR content from Firestore/Storage
    ocrContent: `This is the OCR-extracted text for session ${id}. It can be a long piece of text from a textbook or a past paper. For example, it might contain a detailed explanation of a scientific concept, a historical event, or a mathematical problem. This content will be fed into the AI models to generate summaries, explanations, and questions.`
  };
}

export default async function StudyPage({ params }: { params: { id: string } }) {
  const session = await getSessionDetails(params.id);

  return (
    <div className="container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <Link
          href="/dashboard"
          className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">
          {session.title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">{session.subject}</p>
      </header>

      <StudyView sessionId={session.id} ocrContent={session.ocrContent} />
    </div>
  );
}
