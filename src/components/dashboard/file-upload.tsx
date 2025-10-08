'use client';

import { UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function FileUpload() {
  const router = useRouter();

  const handleUpload = () => {
    // In a real app, this would trigger the file upload process.
    // After a successful upload and OCR, it would redirect to the new study session.
    // For this mock, we'll just navigate to a sample study session.
    const newSessionId = `mock-session-${Date.now()}`;
    router.push(`/dashboard/study/${newSessionId}`);
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-12 text-center shadow-sm transition-colors hover:border-primary/50 hover:bg-primary/5">
      <div className="mb-4 text-primary">
        <UploadCloud className="mx-auto h-12 w-12" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">
        Upload textbook pages or past papers
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Drag & drop files here, or click to browse. Supports PDF and images.
      </p>
      <Button onClick={handleUpload} className="mt-6" size="lg">
        <UploadCloud className="mr-2 h-4 w-4" />
        Choose File & Start Studying
      </Button>
      <input type="file" className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
    </div>
  );
}
