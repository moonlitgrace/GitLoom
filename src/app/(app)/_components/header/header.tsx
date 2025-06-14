'use client';

import GitLoomIcon from '@/components/icons/gitloom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useValidationStore } from '@/stores/validation-store';
import { ChevronsUpDown } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import UserDropdown from './user-dropdown';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { repo } = useParams<{ repo: string }>();
  const isValid = useValidationStore((store) => store.isValid);

  const isNewPath = pathname === '/new';

  return (
    <header className="flex h-15 items-center justify-between gap-2 border-b px-4">
      <nav className="flex items-center gap-2">
        <Link href={'/dashboard'} className="flex items-center gap-2">
          <GitLoomIcon className="size-5" />
        </Link>
        {!isNewPath && (
          <>
            <span className="text-muted-foreground/50 text-xl">/</span>
            <Button variant={'ghost'} className="gap-2" disabled={!isValid}>
              <Avatar className="size-5">
                <AvatarImage src={session?.user?.image ?? undefined} />
                <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-bold">{decodeURIComponent(repo)}</span>
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </>
        )}
      </nav>
      <div className="flex items-center gap-4">
        <Button variant={'outline'}>Feedback</Button>
        <UserDropdown></UserDropdown>
      </div>
    </header>
  );
}
