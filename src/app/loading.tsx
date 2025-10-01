import { Logo } from '@/components/shared/logo';

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-pulse">
          <Logo />
        </div>
        <p className="text-muted-foreground">Loading your study guide...</p>
      </div>
    </div>
  );
}
