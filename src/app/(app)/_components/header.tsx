'use client';

import GitloomIcon from '@/components/icons/gitloom';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardHeader() {
  const pathname = usePathname();
  const isNewPath = pathname === '/new';

  return (
    <header className="flex items-center justify-between gap-2 border-b p-4">
      <nav className="flex items-center gap-2">
        <Link href={'/dashboard'} className="flex items-center gap-2">
          <GitloomIcon className="size-5" />
        </Link>
        {!isNewPath && (
          <>
            <span className="text-muted-foreground/50 text-xl">/</span>
            <Button variant={'ghost'} className="gap-2">
              <Avatar className="size-5">
                <AvatarImage src={'https://github.com/moonlitgrace.png'} />
              </Avatar>
              <span className="text-sm font-bold">gitloom-repo</span>
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </>
        )}
      </nav>
      <div className="flex items-center gap-4">
        <Button variant={'outline'}>Feedback</Button>
        <Avatar>
          <AvatarImage src={'https://github.com/moonlitgrace.png'} />
        </Avatar>
      </div>
    </header>
  );
}
