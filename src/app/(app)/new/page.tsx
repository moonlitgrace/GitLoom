import { Metadata } from 'next';
import RecentRepoList from './_components/recent-repo-list';
import RepoList from './_components/repo-list';

export const metadata: Metadata = {
  title: 'New Repo',
};

export default async function Page() {
  return (
    <div className="mx-auto my-10 w-full max-w-5xl space-y-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-4xl font-black">Let&apos;s do something new.</h3>
        <span className="text-muted-foreground text-sm">
          Select a repository to link with GitLoom and start managing your content.
        </span>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-card/50 space-y-4 rounded-lg border p-4">
          <h5 className="text-xl font-bold">Import Git Repo</h5>
          <RepoList />
        </div>
        <div className="space-y-4 rounded-lg border p-4">
          <h5 className="text-xl font-bold">Recent Repos</h5>
          <RecentRepoList />
        </div>
      </div>
    </div>
  );
}
