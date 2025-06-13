import GitHubIcon from '@/components/icons/github';
import GitloomIcon from '@/components/icons/gitloom';
import { checkRepo, importRepoConfig } from '@/lib/api/github';
import { cn } from '@/lib/utils';
import { CircleCheck, CircleX, Loader2, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import CreateConfigDialog from './create-config-dialog';

type CheckStatus = 'pending' | 'checking' | 'resolved' | 'failed';
type CheckIds = 'repo-status' | 'config-file' | 'contents';

interface CheckItem {
  id: CheckIds;
  text: string;
  status: CheckStatus;
}

export default function LoadingRepo({ repo }: { repo: string }) {
  const { data: session } = useSession();
  // session gets synced everytime
  // which re-triggers all checks
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableSession = useMemo(() => session, [session?.accessToken]);

  const [openCreateConfigDialog, setOpenCreateConfigDialog] = useState(false);
  const [checks, setChecks] = useState<CheckItem[]>([
    { id: 'repo-status', text: 'Checking repo status', status: 'checking' },
    { id: 'config-file', text: 'Looking for configuration file', status: 'pending' },
    { id: 'contents', text: 'Loading contents', status: 'pending' },
  ]);

  const updateCheckStatus = useCallback((id: CheckIds, status: CheckStatus) => {
    setChecks((prev) => prev.map((check) => (check.id === id ? { ...check, status } : check)));
  }, []);

  useEffect(() => {
    if (!stableSession) return;
    // remove @ prefix
    const repoName = repo.slice(1);
    const repoStatusToastId = 'repo-status-failed-toast';

    async function doCheckRepo(): Promise<boolean> {
      try {
        const isRepoAccessible = await checkRepo({
          accessToken: stableSession?.accessToken,
          username: stableSession?.user?.username,
          repo: repoName,
        });

        if (!isRepoAccessible) {
          throw new Error('failed');
        }

        updateCheckStatus('repo-status', 'resolved');
        updateCheckStatus('config-file', 'checking');
        return true;
      } catch {
        updateCheckStatus('repo-status', 'failed');
        if (!toast.getToasts().some((t) => t.id === repoStatusToastId)) {
          toast.error('OhNo! Repo not accessible', {
            id: repoStatusToastId,
            description: `Repo doesn't exist or you don't have permission.`,
            action: {
              label: 'Retry',
              onClick: () => window.location.reload(),
            },
          });
        }
        return false;
      }
    }

    async function doImportRepoConfig(): Promise<boolean> {
      try {
        const config = await importRepoConfig({
          accessToken: stableSession?.accessToken,
          username: stableSession?.user?.username,
          repo: repoName,
        });

        if (config === null) {
          throw new Error('failed');
        }

        updateCheckStatus('config-file', 'resolved');
        updateCheckStatus('contents', 'checking');
        return true;
      } catch {
        updateCheckStatus('config-file', 'failed');
        setOpenCreateConfigDialog(true);
        return false;
      }
    }

    async function initChecks(): Promise<void> {
      const repoValid = await doCheckRepo();
      if (!repoValid) return;

      await doImportRepoConfig();
    }

    // init checks
    initChecks();
  }, [stableSession, repo, updateCheckStatus]);

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
      {/* show dialog to create a config file (in-case) */}
      <CreateConfigDialog
        open={openCreateConfigDialog}
        setOpen={setOpenCreateConfigDialog}
        repo={repo.slice(1)}
      />
      {/* rest of the layout */}
      <div className="flex min-w-75 flex-col gap-2 p-4">
        <div className="mx-auto mb-2 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <GitloomIcon className="size-5" />
            <X className="text-muted-foreground/50 size-5 stroke-1 text-xs" />
            <GitHubIcon className="fill-foreground size-5" />
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
