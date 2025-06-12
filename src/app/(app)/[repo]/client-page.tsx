'use client';

import LoadingRepo from './_components/loading-repo';
import RecentActions from './_components/recent-actions';
import RepoContents from './_components/repo-contents';

export default function ClientPage({ repo }: { repo: string }) {
  const isLoading = true;

  if (isLoading) {
    return <LoadingRepo repo={repo} />;
  }

  return (
    <div className="grid grid-cols-3 gap-4 pt-4">
      <RecentActions />
      <RepoContents repo={repo} />
    </div>
  );
}
