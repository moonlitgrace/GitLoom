'use client';

import { useState } from 'react';
import CreateConfigAlertDialog from './_components/dialogs/create-config-alert-dialog';
import RecentActions from './_components/recent-actions';
import RepoContents from './_components/repo-contents';

export default function ClientPage({ repo }: { repo: string }) {
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);

  return (
    <div className="grid grid-cols-3 gap-4 pt-4">
      <CreateConfigAlertDialog
        open={isConfigDialogOpen}
        setOpen={setIsConfigDialogOpen}
        repo={repo.slice(1)} // remove "@" prefix
      />
      <RecentActions />
      <RepoContents repo={repo} setIsConfigDialogOpen={setIsConfigDialogOpen} />
    </div>
  );
}
