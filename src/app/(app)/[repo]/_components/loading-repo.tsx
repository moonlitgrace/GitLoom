import GithubIcon from '@/components/icons/github';
import GitloomIcon from '@/components/icons/gitloom';
import { checkRepo } from '@/lib/api/github';
import { cn } from '@/lib/utils';
import { CircleCheck, CircleX, Loader2, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

type CheckStatus = 'pending' | 'checking' | 'resolved' | 'failed';
type CheckIds = 'repo-status' | 'config-file' | 'contents';

interface CheckItem {
  id: CheckIds;
  text: string;
  status: CheckStatus;
}

export default function LoadingRepo({ repo }: { repo: string }) {
  const { data: session } = useSession();
  const [checks, setChecks] = useState<CheckItem[]>([
    { id: 'repo-status', text: 'Checking repo status', status: 'checking' },
    { id: 'config-file', text: 'Looking for configuration file', status: 'pending' },
    { id: 'contents', text: 'Loading contents', status: 'pending' },
  ]);

  const failCheck = useCallback(
    (id: CheckIds) => {
      setChecks((prev) =>
        prev.map((check) => (check.id === id ? { ...check, status: 'failed' } : check)),
      );
    },
    [setChecks],
  );

  useEffect(() => {
    if (!session) return;
    // remove @ prefix
    const repoName = repo.slice(1);
    (async () => {
      // step: 0
      // check if repo exists or not
      // and can access
      await checkRepo({
        accessToken: session.accessToken,
        username: session.user?.username,
        repo: repoName,
      }).then((ok) => {
        console.log(ok);
        if (!ok) {
          failCheck('repo-status');
          return;
        }

        setChecks((prev) =>
          prev.map((check) =>
            check.id === 'repo-status'
              ? { ...check, status: 'resolved' }
              : check.id === 'config-file'
                ? { ...check, status: 'checking' }
                : check,
          ),
        );
      });
    })();
  }, [session, repo, failCheck]);

  return (
    <div className="grid h-full place-items-center">
      <div className="flex min-w-75 flex-col gap-2 p-4">
        <div className="mx-auto mb-2 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <GitloomIcon className="size-5" />
            <X className="text-muted-foreground size-5 stroke-1 text-xs" />
            <GithubIcon className="fill-foreground size-5" />
          </div>
          <h2 className="text-xl font-bold">{repo}</h2>
        </div>
        {checks.map((check, idx) => (
          <div
            key={idx}
            className={cn(
              'flex items-center gap-2 rounded-md border p-2',
              ['pending', 'resolved'].includes(check.status) && 'text-muted-foreground',
            )}
          >
            {check.status === 'checking' ? (
              <Loader2 className="size-5 animate-spin" />
            ) : check.status === 'resolved' ? (
              <CircleCheck className="size-5" />
            ) : check.status === 'failed' ? (
              <CircleX className="text-destructive size-5" />
            ) : (
              <Loader2 className="size-5" />
            )}
            <span
              className={cn(
                'text-sm font-medium transition-colors',
                check.status === 'failed' && 'text-destructive',
              )}
            >
              {check.text}...
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
