import { getLastCommit, getPathContents } from '@/lib/api/github';
import { useRepoStore } from '@/stores/repo.store';
import { Content } from '@/types/github';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useStableSession } from './use-stable-session';

export default function useRepoContents(repo: string) {
  const { session } = useStableSession();
  const { config } = useRepoStore((state) => state);

  const [history, setHistory] = useState<string[]>(['<root>']);
  const currentPath = history[history.length - 1];
  const canGoBack = history.length > 1;

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

  const navigateTo = useCallback((path: string) => {
    setHistory((prev) => [...prev, path]);
  }, []);

  const navigateBack = useCallback(() => {
    setHistory((prev) => prev.slice(0, prev.length - 1));
  }, []);

  const navigateBackTo = useCallback((path: string) => {
    setHistory((prev) => {
      const targetIdx = prev.findIndex((p) => p === path);
      if (targetIdx === -1) return prev;

      return prev.slice(0, targetIdx + 1);
    });
  }, []);

  const breadcrumbs = useMemo(() => {
    if (currentPath === '<root>') return [];

    const parts = currentPath.split('/');
    return parts.reduce<Array<{ name: string; path: string }>>((acc, part, idx) => {
      const path = idx === 0 ? part : `${parts[idx - 1]}/${part}`;
      return [...acc, { name: part, path }];
    }, []);
  }, [currentPath]);

  return {
    contents,
    isLoading,
    currentPath,
    navigateTo,
    navigateBack,
    navigateBackTo,
    canGoBack,
    breadcrumbs,
  };
}
