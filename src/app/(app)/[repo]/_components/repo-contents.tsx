import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input, InputIcon, InputRoot } from '@/components/ui/input';
import { useStableSession } from '@/hooks/use-stable-session';
import { importRepoConfig } from '@/lib/api/github';
import { Folder, Plus, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  repo: string;
  setIsConfigDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RepoContents({ repo, setIsConfigDialogOpen }: Props) {
  const stableSession = useStableSession();
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(isLoaded);

  const loadConfigFilePromise = useCallback(
    () =>
      new Promise(async (resolve, reject) => {
        const config = await importRepoConfig({
          accessToken: stableSession?.accessToken,
          username: stableSession?.user?.username,
          repo: repo,
        });

        if (config === null) {
          setIsConfigDialogOpen(true);
          setIsLoaded(false);
          reject();
        }

        resolve(config);
        setIsLoaded(true);
      }),
    [stableSession, repo],
  );

  useEffect(() => {
    if (!stableSession || !repo) return;

    // call toast to init config load and show some feedback
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
  }, [stableSession, loadConfigFilePromise, repo]);

  return (
    <div className="col-span-2 flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="size-5">
            <AvatarImage src={'https://github.com/moonlitgrace.png'} />
          </Avatar>
          <span className="text-muted-foreground/50 text-xl">/</span>
          <Button variant={'ghost'} className="font-bold" asChild>
            <a
              href={`https://github.com/moonlitgrace/${repo}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {repo}
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
        <div className="hover:bg-secondary/50 grid grid-cols-5 gap-2 p-3">
          <div className="col-span-2 flex items-center gap-2">
            <Folder className="fill-muted-foreground text-muted-foreground size-4" />
            <button className="text-sm hover:underline">.gitloom</button>
          </div>
          <a
            href="https://github.com/GitLoomLabs/GitLoom/commit/ca72cffb748c9e9be0a5db83604ebbe81506946f"
            target="_blank"
            rel="noreferrer noopener"
            className="text-muted-foreground col-span-2 text-sm hover:underline"
          >
            chore: update .gitloom settings
          </a>
          <span className="text-muted-foreground ml-auto text-sm">2 hours ago</span>
        </div>
      </div>
    </div>
  );
}
