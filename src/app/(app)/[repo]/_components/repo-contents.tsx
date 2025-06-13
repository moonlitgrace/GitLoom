import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input, InputIcon, InputRoot } from '@/components/ui/input';
import { Folder, Plus, Search } from 'lucide-react';

export default function RepoContents({ repo }: { repo: string }) {
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
