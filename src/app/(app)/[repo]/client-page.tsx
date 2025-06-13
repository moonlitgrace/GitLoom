'use client';

import { useState } from 'react';
import CreateConfigAlertDialog from './_components/dialogs/create-config-alert-dialog';
import RecentActions from './_components/recent-actions';
import RepoContents from './_components/repo-contents';

export default function ClientPage({ repo }: { repo: string }) {
  const [openCreateConfigAlertDialog, setOpenCreateConfigAlertDialog] = useState(false);

  return (
    <div className="grid grid-cols-3 gap-4 pt-4">
      {/* show dialog to create a config file (in-case) */}
      <CreateConfigAlertDialog
        open={openCreateConfigAlertDialog}
        setOpen={setOpenCreateConfigAlertDialog}
        repo={repo.slice(1)} // remove "@" prefix
      />
      {/* rest of the layout */}
      <RecentActions />
      <RepoContents repo={repo} setOpenCreateConfigAlertDialog={setOpenCreateConfigAlertDialog} />
    </div>
  );
}
