import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input, InputIcon, InputRoot } from '@/components/ui/input';
import { NavigationOff, Plus, Search } from 'lucide-react';

export default function Page() {
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
        <div className="flex items-center gap-4">
          <InputRoot>
            <InputIcon>
              <Search />
            </InputIcon>
            <Input placeholder="Search..." />
          </InputRoot>
          <Button size={'default'}>
            <Plus />
            Add New
          </Button>
        </div>
      </div>
    </div>
  );
}
