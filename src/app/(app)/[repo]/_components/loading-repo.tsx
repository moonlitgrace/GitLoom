import GithubIcon from '@/components/icons/github';
import GitloomIcon from '@/components/icons/gitloom';
import { checkRepo } from '@/lib/api/github';
import { cn } from '@/lib/utils';
import { CircleCheck, CircleX, Loader2, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

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
        repo: repoName + 'x',
      }).then((ok) => {
        if (!ok) {
          const toastId = 'repo-status-failed-toast';
          failCheck('repo-status');
          if (!toast.getToasts().some((t) => t.id === toastId)) {
            toast.error('OhNo! Repo not accessible', {
              id: toastId,
              description: `Repo doesn't exist or you don't have permission.`,
              action: {
                label: 'Retry',
                onClick: () => window.location.reload(),
              },
              position: 'bottom-center',
              duration: 8000,
            });
          }
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

  // return icon for each status state
  function getIcon(status: CheckStatus) {
    switch (status) {
      case 'checking':
        return <Loader2 className="size-5 animate-spin" />;
      case 'resolved':
        return <CircleCheck className="size-5" />;
      case 'failed':
        return <CircleX className="text-destructive size-5" />;
      default:
        return <Loader2 className="size-5" />;
    }
  }

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
              'flex items-center gap-2 rounded-md border p-2 transition-colors',
              (check.status === 'pending' || check.status === 'resolved') &&
                'text-muted-foreground',
              check.status === 'checking' && 'bg-secondary/50',
              check.status === 'failed' && 'bg-destructive/10',
            )}
          >
            {getIcon(check.status)}
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
