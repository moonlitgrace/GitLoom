'use client';

import { signOutAction } from '@/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import { ExternalLink, LogOutIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function UserDropdown() {
  const { data: session } = useSession();
  const { username, name, email, image } = session?.user ?? {};

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={image ?? undefined} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full flex-col items-start"
          >
            <span className="text-foreground text-sm font-medium">{name}</span>
            <span className="text-muted-foreground line-clamp-1 text-xs break-all">{email}</span>
          </a>
          <DropdownMenuShortcut>
            <ExternalLink className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          disabled={isLoggingOut}
          onClick={async () => {
            setIsLoggingOut(true);
            await signOutAction({ redirectTo: '/login' });
          }}
        >
          Log out
          <DropdownMenuShortcut>
            {isLoggingOut ? (
              <Spinner className="bg-foreground size-4" />
            ) : (
              <LogOutIcon className="size-4" />
            )}
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
