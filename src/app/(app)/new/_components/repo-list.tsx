'use client';

import GithubIcon from '@/components/icons/github';
import { Button } from '@/components/ui/button';
import { Input, InputIcon, InputRoot } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import useRepos from '@/hooks/use-repos';
import { importRepo } from '@/lib/api/github';
import datetime from '@/lib/date-time';
import { Lock, Search } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { RepoListSkeleton } from './repo-list-skeleton';

export default function RepoList() {
  const { data: session, status } = useSession();
  const { search, setSearch, debouncedSearch, repos, isLoading } = useRepos();
  const [isImporting, setIsImporting] = useState(false);

  const accessToken = session?.accessToken;
  const username = session?.user?.username;

  async function handleImport(repoName: string) {
    try {
      setIsImporting(true);
      if (!session) return;

      const data = await importRepo({
        accessToken,
        username,
        repo: repoName,
      });

      console.log(data);
    } finally {
      setIsImporting(false);
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {status === 'loading' ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <Select defaultValue={String(username)} disabled>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select username" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={String(username)}>{username}</SelectItem>
            </SelectContent>
          </Select>
        )}
        <InputRoot>
          <InputIcon>
            {debouncedSearch.length > 0 && isLoading ? (
              <Spinner className="bg-foreground" />
            ) : (
              <Search />
            )}
          </InputIcon>
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputRoot>
      </div>
      <div className="divide-y rounded-md border">
        {(status === 'loading' || isLoading) && <RepoListSkeleton />}
        {repos?.map((repo) => (
          <div key={repo.id} className="flex h-14 items-center gap-2 px-3">
            <GithubIcon className="fill-muted-foreground size-5" />
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm font-medium hover:underline"
            >
              {repo.name}
            </a>
            {repo.private && <Lock className="text-muted-foreground size-3.5" />}
            <span className="text-muted-foreground text-sm">
              {datetime(repo.updated_at).fromNow()}
            </span>
            <Button
              className="ml-auto"
              onClick={() => handleImport(repo.name)}
              disabled={isImporting}
            >
              Import
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
