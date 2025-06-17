'use client';

import GitHubIcon from '@/components/icons/github';
import { buttonVariants } from '@/components/ui/button';
import useRecentRepos from '@/hooks/use-recent-repos';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function RecentRepoList() {
  const { recentRepos } = useRecentRepos();

  return (
    <div className="bg-card/50 divide-y rounded-md border">
      {recentRepos.map((repo) => (
        <div key={repo} className="flex h-14 items-center gap-2 px-3">
          <GitHubIcon className="fill-muted-foreground size-5" />
          <a
            href={repo}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm font-medium hover:underline"
          >
            {repo}
          </a>
          {/* {repo.private && <Lock className="text-muted-foreground size-3.5" />} */}
          {/* <span className="text-muted-foreground text-sm">
            {datetime(repo.updated_at).fromNow()}
          </span> */}
          <Link
            href={`/@${repo}`}
            className={cn('ml-auto', buttonVariants({ variant: 'outline' }))}
          >
            Import
          </Link>
        </div>
      ))}
    </div>
  );
}
