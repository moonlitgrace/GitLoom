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
import { CONFIG_PATH, DEFAULT_CONFIG } from '@/constants';
import { createContent } from '@/lib/api/github';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
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
        path: CONFIG_PATH,
        message: `chore: create ${CONFIG_PATH}`,
        content: DEFAULT_CONFIG,
      });

      if (!created) throw new Error('failed');
      // showo success toast
      toast.success('Configuration file created!', {
        description: `The ${CONFIG_PATH} file has been added.`,
      });
    } catch {
      toast.error('Failed to create configuration file!', {
        description: `Could not create ${CONFIG_PATH}.`,
      });
    } finally {
      // reload window to re-fetch states
      window.location.reload();
    }
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Configuration File Required</AlertDialogTitle>
          <AlertDialogDescription>
            We noticed your repository doesn&apos;t have a{' '}
            <code className="font-mono text-sm">{CONFIG_PATH}</code> file. This file helps GitLoom
            understand your project structure and workflows.
          </AlertDialogDescription>
          <div className="bg-secondary/25 mt-2 flex gap-4 rounded-md border p-4">
            <Avatar className="size-6">
              <AvatarImage src={session?.user?.image ?? undefined} />
              <AvatarFallback>{session?.user?.name?.[0] ?? 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">Auto-generated configuration</p>
              <p className="text-muted-foreground text-xs">Will create default config with:</p>
              <ul className="text-muted-foreground mt-1 ml-4 list-disc text-xs">
                <li>
                  <code>$schema</code>
                </li>
                <li>
                  <code>__v</code> - Latest version
                </li>
                <li>
                  <code>contentTypes</code> - Content Types with path and extension
                </li>
              </ul>
            </div>
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
            {isCreating && <Loader2 className="size-4 animate-spin" />}
            Create Config
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
