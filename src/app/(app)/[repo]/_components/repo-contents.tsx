import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input, InputIcon, InputRoot } from '@/components/ui/input';
import { useStableSession } from '@/hooks/use-stable-session';
import { getLastCommit, getRepoConfig } from '@/lib/api/github';
import datetime from '@/lib/date-time';
import { useRepoStore } from '@/stores/repo.store';
import { Content } from '@/types/github';
import { Folder, Plus, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  repo: string;
  setIsConfigDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RepoContents({ repo, setIsConfigDialogOpen }: Props) {
  const stableSession = useStableSession();
  const { setConfig, setIsValid, config } = useRepoStore((state) => state);
  // const [currentPath, setCurrentPath] = useState<string>('');
  const [contents, setContents] = useState<Content[]>([]);

  const loadConfigFilePromise = useCallback(
    () =>
      new Promise<void>(async (resolve, reject) => {
        const _config = await getRepoConfig({
          accessToken: stableSession?.accessToken,
          username: stableSession?.user?.username,
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
    [stableSession, repo, setIsConfigDialogOpen, setIsValid, setConfig],
  );

  useEffect(() => {
    if (!stableSession) return;

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
  }, [stableSession, loadConfigFilePromise]);

  useEffect(() => {
    if (config === null) return;

    async function getRootContent(path: string): Promise<Content> {
      const lastCommit = await getLastCommit({
        accessToken: stableSession?.accessToken,
        username: stableSession?.user?.username,
        repo,
        path,
      });

      return {
        lastCommit,
        name: path,
        path,
        type: 'dir',
      };
    }

    const paths = [...Object.values(config.contentTypes).map((item) => item.path), '.gitloom'];
    async function initRootContents() {
      const rootContents = await Promise.all(paths.map((path) => getRootContent(path)));
      setContents(rootContents);
    }

    initRootContents();
  }, [config, stableSession, repo]);

  return (
    <div className="col-span-2 flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="size-5">
            <AvatarImage src={stableSession?.user?.image ?? undefined} />
            <AvatarFallback>{stableSession?.user?.name?.[0]}</AvatarFallback>
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
      <div className="mt-2 divide-y overflow-hidden rounded-md border">
        <div className="text-muted-foreground bg-secondary/25 grid grid-cols-5 gap-2 p-3 text-xs font-medium">
          <span className="col-span-2">Name</span>
          <span className="col-span-2">Last commit message</span>
          <span className="ml-auto">Last commit date</span>
        </div>
        {contents.map((content) => (
          <div key={content.path} className="hover:bg-secondary/50 grid grid-cols-5 gap-2 p-3">
            <div className="col-span-2 flex items-center gap-2">
              <Folder className="fill-muted-foreground text-muted-foreground size-4" />
              <button className="text-sm hover:underline">{content.name}</button>
            </div>
            <a
              href={`https://github.com/${stableSession?.user?.username}/${repo}/commit/${content.lastCommit.sha}`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted-foreground col-span-2 text-sm hover:underline"
            >
              {content.lastCommit.message}
            </a>
            <span className="text-muted-foreground ml-auto text-sm">
              {datetime(content.lastCommit.date).fromNow()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
