import GithubIcon from '@/components/icons/github';
import GitloomIcon from '@/components/icons/gitloom';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, Plus } from 'lucide-react';
import Link from 'next/link';

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between gap-2 border-b p-4">
      <nav className="flex items-center gap-2">
        <Link href={'/dashboard'} className="flex items-center gap-2">
          <GitloomIcon className="size-5" />
        </Link>
        <span className="text-muted-foreground/50 text-xl">/</span>
        <Button variant={'ghost'} className="gap-2">
          <GithubIcon className="fill-foreground size-5" />
          <span className="text-sm font-bold">gitloom-repo</span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </nav>
      <div className="flex items-center gap-4">
        <Button>
          <Plus className="size-4" /> New One
        </Button>
        <Avatar>
          <AvatarImage src={'https://github.com/moonlitgrace.png'} />
        </Avatar>
      </div>
    </header>
  );
}
