import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { StudySession } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const mockSessions: StudySession[] = [
  {
    id: 'biology-101',
    title: 'Chapter 5: Photosynthesis',
    subject: 'Biology',
    date: '2 days ago',
    imageUrl: PlaceHolderImages[0].imageUrl,
    imageHint: PlaceHolderImages[0].imageHint
  },
  {
    id: 'physics-exam-2022',
    title: 'Past Paper: Mechanics',
    subject: 'Physics',
    date: '5 days ago',
    imageUrl: PlaceHolderImages[1].imageUrl,
    imageHint: PlaceHolderImages[1].imageHint
  },
  {
    id: 'chemistry-notes-3',
    title: 'Organic Compounds',
    subject: 'Chemistry',
    date: '1 week ago',
    imageUrl: PlaceHolderImages[2].imageUrl,
    imageHint: PlaceHolderImages[2].imageHint
  },
];

export async function StudySessionList() {
  // In a real app, you would fetch this data from Firestore.
  const sessions = mockSessions;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sessions.map((session) => (
        <Link href={`/dashboard/study/${session.id}`} key={session.id} className="group">
          <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-primary/50 group-hover:-translate-y-1">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={session.imageUrl}
                  alt={session.title}
                  fill
                  className="object-cover"
                  data-ai-hint={session.imageHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <Badge variant="secondary" className="mb-2">{session.subject}</Badge>
              <CardTitle className="text-lg font-bold group-hover:text-primary">{session.title}</CardTitle>
              <CardDescription className="mt-1 text-sm">{session.date}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0">
               <div className="flex w-full items-center text-sm font-semibold text-primary">
                 <span>View Session</span>
                 <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
               </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}

StudySessionList.Skeleton = function StudySessionListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
         <Card key={i} className="h-full overflow-hidden">
            <CardHeader className="p-0">
              <Skeleton className="h-48 w-full" />
            </CardHeader>
            <CardContent className="p-4">
               <Skeleton className="mb-2 h-5 w-20 rounded-full" />
               <Skeleton className="mt-2 h-6 w-3/4" />
               <Skeleton className="mt-2 h-4 w-1/2" />
            </CardContent>
            <CardFooter className="p-4 pt-0">
               <Skeleton className="h-5 w-28" />
            </CardFooter>
          </Card>
      ))}
    </div>
  );
}
