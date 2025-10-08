'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookCopy,
  Settings,
  UserCircle,
  LogOut,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Logo } from '@/components/shared/logo';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/sessions', icon: BookCopy, label: 'All Sessions' },
  { href: '/dashboard/profile', icon: UserCircle, label: 'Profile' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-16 flex-col border-r bg-card transition-all duration-300 ease-in-out hover:w-56">
      <div className="flex h-16 shrink-0 items-center justify-center overflow-hidden px-4 group-hover:justify-start">
        <Link href="/dashboard" className="flex items-center gap-2">
            <Logo className="h-8 w-8 shrink-0 text-primary" />
            <span className="min-w-max font-headline text-xl font-bold opacity-0 transition-opacity duration-200 group-hover:opacity-100">RehnumaAI</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-2 overflow-hidden p-2">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md p-3 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
                    {
                      'bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary':
                        pathname === item.href,
                    }
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="min-w-max text-sm font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {item.label}
                  </span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="group-hover:hidden">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>

      <div className="mt-auto space-y-2 overflow-hidden p-2">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-center p-3 group-hover:justify-start"
              >
                <LogOut className="h-5 w-5 shrink-0" />
                <span className="min-w-max ml-3 text-sm font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Sign Out
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="group-hover:hidden">
              <p>Sign Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
}
