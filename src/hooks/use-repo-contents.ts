import { getLastCommit, getPathContents } from '@/lib/api/github';
import { useRepoStore } from '@/stores/repo.store';
import { Content } from '@/types/github';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useStableSession } from './use-stable-session';

export default function useRepoContents(repo: string) {
  const { session } = useStableSession();
  const { config } = useRepoStore((state) => state);
  const [currentPath, setCurrentPath] = useState('<root>');

  const fetchParams = useMemo(
    () => ({
      accessToken: session?.accessToken,
      username: session?.user?.username,
      repo,
    }),
    [session, repo],
  );

  const _getContentDetails = useCallback(
    async (path: string, type: Content['type']): Promise<Content> => {
      const lastCommit = await getLastCommit({
        ...fetchParams,
        path,
      });

      return {
        lastCommit,
        name: path.split('/').pop() ?? path,
        path,
        type,
      };
    },
    [fetchParams],
  );

  const _getRootContents = useCallback(async (): Promise<Content[]> => {
    if (!config) return [];

    const paths = [...Object.values(config.contentTypes).map((item) => item.path), '.gitloom'];
    return Promise.all(paths.map((path) => _getContentDetails(path, 'dir')));
  }, [config, _getContentDetails]);

  const _getPathContents = useCallback(
    async (path: string): Promise<Content[]> => {
      const contents = await getPathContents({
        ...fetchParams,
        path,
      });

      return Promise.all(contents.map((item) => _getContentDetails(item.path, item.type)));
    },
    [fetchParams, _getContentDetails],
  );

  const { data: contents, isLoading } = useQuery<Content[]>({
    queryKey: ['repoContents', repo, currentPath],
    queryFn: async () =>
      currentPath === '<root>' ? await _getRootContents() : await _getPathContents(currentPath),
    enabled: !!config,
  });

  return { contents, isLoading, currentPath, setCurrentPath };
}
