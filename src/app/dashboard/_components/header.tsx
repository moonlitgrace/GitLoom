import GitloomIcon from '@/components/icons/gitloom';
import GitloomTextIcon from '@/components/icons/gitloom-text';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between gap-2 border-b p-4">
      <nav className="flex items-center gap-2">
        <Link href={'/dashboard'} className="flex items-center gap-2">
          <GitloomIcon className="size-5" />
          <GitloomTextIcon className="h-4 w-max" />
        </Link>
      </nav>
      <nav className="flex items-center gap-2">
        <Button>New Post</Button>
      </nav>
    </header>
  );
}
