import { getLastCommit } from '@/lib/api/github';
import { useRepoStore } from '@/stores/repo.store';
import { Content } from '@/types/github';
import { useQuery } from '@tanstack/react-query';
import { useStableSession } from './use-stable-session';

export default function useRepoContents(repo: string) {
  const stableSession = useStableSession();
  const { config } = useRepoStore((state) => state);

  async function getRootContent(path: string): Promise<Content> {
    const lastCommit = await getLastCommit({
      accessToken: stableSession?.accessToken,
      username: stableSession?.user?.username,
      repo,
      path,
    });

    return {
      lastCommit,
      name: path,
      path,
      type: 'dir',
    };
  }

  const { data: contents, isLoading } = useQuery<Content[]>({
    queryKey: ['repoContents', repo],
    queryFn: async () => {
      if (!config) return [];

      const paths = [...Object.values(config.contentTypes).map((item) => item.path), '.gitloom'];
      return Promise.all(paths.map((path) => getRootContent(path)));
    },
    enabled: !!config,
  });

  return { contents, isLoading };
}
