import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input, InputIcon, InputRoot } from '@/components/ui/input';
import { generateMetadataTitleFor } from '@/lib/utils';
import { Folder, NavigationOff, Plus, Search } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ repo: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { repo: rawRepo } = await params;
  const repo = decodeURIComponent(rawRepo);

  return {
    title: generateMetadataTitleFor(repo),
  };
}

export default async function Page({ params }: Props) {
  const { repo: rawRepo } = await params;
  const repo = decodeURIComponent(rawRepo);
  console.log(repo);

  // check if it has prefix '@'
  // otherwise call notFount
  if (!repo.startsWith('@')) {
    notFound();
  }

  return (
    <div className="grid grid-cols-3 gap-4 pt-4">
      <div className="col-span-1">
        <h5 className="text-muted-foreground text-sm font-medium">Recent Actions</h5>
        <div className="flex flex-col items-center justify-center gap-4 py-10">
          <NavigationOff className="text-muted-foreground size-10 stroke-1" />
          <div className="flex flex-col items-center">
            <span className="text-sm">No recent actions!</span>
            <span className="text-muted-foreground text-sm">Do something to show it here.</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="size-5">
              <AvatarImage src={'https://github.com/moonlitgrace.png'} />
            </Avatar>
            <Button variant={'ghost'} className="text-muted-foreground" asChild>
              <a href="https://github.com/moonlitgrace" target="_blank" rel="noreferrer noopener">
                moonlitgrace
              </a>
            </Button>
            <span className="text-muted-foreground/50 text-xl">/</span>
            <Button variant={'ghost'} className="font-bold" asChild>
              <a
                href="https://github.com/moonlitgrace/gitloom-repo"
                target="_blank"
                rel="noreferrer noopener"
              >
                gitloom-repo
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
              href="https://github.com/GitloomLabs/Gitloom/commit/ca72cffb748c9e9be0a5db83604ebbe81506946f"
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
    </div>
  );
}
