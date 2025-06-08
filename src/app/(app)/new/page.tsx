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
import { auth } from '@/lib/auth';
import datetime from '@/lib/date-time';
import { Construction, Lock, Search } from 'lucide-react';
import { Metadata } from 'next';

interface Repo {
  id: number;
  name: string;
  private: boolean;
  updated_at: string;
  html_url: string;
}

export const metadata: Metadata = {
  title: 'New Repo',
};

export default async function Page() {
  const session = await auth();
  const repos = await fetch(
    'https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=5',
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  )
    .then((res) => res.json())
    .then((data: Repo[]) =>
      data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        private: repo.private,
        updated_at: repo.updated_at,
        html_url: repo.html_url,
      })),
    );

  return (
    <div className="mx-auto my-10 w-full max-w-5xl space-y-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-4xl font-black">Let's do something new.</h3>
        <span className="text-muted-foreground text-sm">
          Select a repository to link with Gitloom and start managing your content.
        </span>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-card/50 space-y-4 rounded-lg border p-4">
          <h5 className="text-xl font-bold">Import Git Repo</h5>
          <div className="grid grid-cols-2 gap-4">
            <Select defaultValue="moonlitgrace" disabled>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="moonlitgrace">moonlitgrace</SelectItem>
              </SelectContent>
            </Select>
            <InputRoot>
              <InputIcon>
                <Search />
              </InputIcon>
              <Input placeholder="Search..." />
            </InputRoot>
          </div>
          <div className="divide-y rounded-md border">
            {repos.map((repo) => (
              <div key={repo.id} className="flex items-center gap-2 p-3">
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
                <Button className="ml-auto">Import</Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-lg border p-4">
          <div>
            <h5 className="text-xl font-bold">Clone Template</h5>
            <span className="text-muted-foreground text-sm">
              Clone from our starter collection.
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <Construction className="text-muted-foreground size-10 stroke-1" />
            <span className="text-muted-foreground text-sm">(Feature comin' soon)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
