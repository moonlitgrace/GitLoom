import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input, InputIcon, InputRoot } from '@/components/ui/input';
import useRepoContents from '@/hooks/use-repo-contents';
import { useStableSession } from '@/hooks/use-stable-session';
import { getRepoConfig } from '@/lib/api/github';
import { useRepoStore } from '@/stores/repo.store';
import { Plus, Search } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import ContentItem from './content-item';
import ContentsSkeleton from './contents-skeleton';

interface Props {
  repo: string;
  setIsConfigDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RepoContents({ repo, setIsConfigDialogOpen }: Props) {
  const { session, status } = useStableSession();
  const { setConfig, setIsValid } = useRepoStore((state) => state);
  const { contents, isLoading, currentPath, setCurrentPath } = useRepoContents(repo);

  const loadConfigFilePromise = useCallback(
    () =>
      new Promise<void>(async (resolve, reject) => {
        const _config = await getRepoConfig({
          accessToken: session?.accessToken,
          username: session?.user?.username,
          repo,
        });

        if (_config === null) {
          reject();
          setIsConfigDialogOpen(true);
          setIsValid(false);
        } else {
          resolve();
          setConfig(_config);
          setIsValid(true);
        }
      }),
    [session, repo, setIsConfigDialogOpen, setIsValid, setConfig],
  );

  useEffect(() => {
    if (!session) return;

    // call toast to init config
    // and show some feedback
    toast.promise(loadConfigFilePromise, {
      loading: 'Loading config file...',
      success: {
        message: 'Config loaded successfully!',
        description: 'Fetching content based on configuration...',
      },
      error: {
        message: 'Config load failed',
        description: 'Failed to load repo config file.',
      },
    });
  }, [session, loadConfigFilePromise]);

  return (
    <div className="col-span-2 flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="size-5">
            <AvatarImage src={session?.user?.image ?? undefined} />
            <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground/50 text-xl">/</span>
          <Button variant={'ghost'} className="px-2 font-bold" asChild>
            <a
              href={`https://github.com/moonlitgrace/${repo}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              @{repo}
            </a>
          </Button>
        </div>
        <div className="flex flex-1 items-center gap-4">
          <InputRoot>
            <InputIcon>
              <Search />
            </InputIcon>
            <Input placeholder="Search..." disabled />
          </InputRoot>
          <Button size={'default'}>
            <Plus />
            Add New
          </Button>
        </div>
      </div>
      {/* debug */}
      <div className="text-muted-foreground text-sm">Current path: {currentPath}</div>
      {/* debug */}
      <div className="mt-2 divide-y overflow-hidden rounded-md border">
        <div className="text-muted-foreground bg-secondary/25 grid grid-cols-5 gap-2 p-3 text-xs font-medium">
          <span className="col-span-2">Name</span>
          <span className="col-span-2">Last commit message</span>
          <span className="ml-auto">Last commit date</span>
        </div>
        {isLoading || status === 'loading' || !contents ? (
          <ContentsSkeleton />
        ) : (
          contents.map((content) => (
            <ContentItem
              key={content.path}
              username={session?.user?.username}
              repo={repo}
              content={content}
              setCurrentPath={setCurrentPath}
            />
          ))
        )}
      </div>
    </div>
  );
}
