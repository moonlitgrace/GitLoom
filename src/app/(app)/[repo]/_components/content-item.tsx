import datetime from '@/lib/date-time';
import { cn } from '@/lib/utils';
import { Content } from '@/types/github';
import { File, Folder } from 'lucide-react';

interface Props {
  username: string | undefined;
  repo: string;
  content: Content;
  navigateTo: (path: string) => void;
}

export default function ContentItem({ username, repo, content, navigateTo }: Props) {
  const Icon = content.type === 'dir' ? Folder : File;

  function handleClick() {
    if (content.type === 'dir') {
      navigateTo(content.path);
    } else {
      // handle file click
    }
  }

  return (
    <div key={content.path} className="hover:bg-secondary/50 grid grid-cols-5 gap-2 p-3">
      <div className="col-span-2 flex items-center gap-2">
        <Icon
          className={cn(
            'text-muted-foreground size-4',
            content.type === 'dir' && 'fill-muted-foreground',
          )}
        />
        <button className="text-sm hover:underline" onClick={handleClick}>
          {content.name}
        </button>
      </div>
      <a
        href={`https://github.com/${username}/${repo}/commit/${content.lastCommit.sha}`}
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
  );
}
