import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DEFAULT_CONFIG } from '@/constants';
import { createContent } from '@/lib/api/github';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  repo: string;
}

export default function CreateConfigAlertDialog({ open, setOpen, repo }: Props) {
  const { data: session } = useSession();
  const [isCreating, setIsCreating] = useState(false);

  async function handleCreateConfig() {
    try {
      setIsCreating(true);
      const created = await createContent({
        accessToken: session?.accessToken,
        username: session?.user?.username,
        repo,
        path: '.gitloom/config.json',
        message: 'chore: create .gitloom/config.json',
        content: DEFAULT_CONFIG,
      });

      if (!created) throw new Error('failed');
      // showo success toast
      toast.success('Configuration file created!', {
        description: 'The .gitloom/config.json file has been added to your repo.',
      });
    } catch (err) {
      toast.error('Failed to create configuration file', {
        description: err instanceof Error ? err.message : 'An unknown error occurred',
      });
    } finally {
      setIsCreating(false);
      setOpen(false);
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Configuration File Required</AlertDialogTitle>
          <AlertDialogDescription>
            We noticed your repository doesn&apos;t have a{' '}
            <code className="font-mono text-sm">.gitloom/config.json</code> file. This file helps
            Gitloom understand your project structure and workflows.
          </AlertDialogDescription>
          <div className="bg-secondary/25 mt-2 flex gap-4 rounded-md border p-4">
            <Avatar className="size-6">
              <AvatarImage src={session?.user?.image ?? undefined} />
              <AvatarFallback>{session?.user?.name?.[0] ?? 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">Auto-generated configuration</p>
              <p className="text-muted-foreground text-sm">Will create default config with:</p>
              <ul className="text-muted-foreground mt-1 ml-4 list-disc text-sm">
                <li>Latest version</li>
                <li>Contents and its locations</li>
              </ul>
            </div>
            <span className="text-muted-foreground text-xs">Just now</span>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-4">
          <AlertDialogCancel onClick={() => setOpen(false)} disabled={isCreating}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-primary hover:bg-primary/90"
            onClick={handleCreateConfig}
            disabled={isCreating}
          >
            Create Config
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
