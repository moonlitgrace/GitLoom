import { LOCAL_STORAGE_KEYS, MAX_RECENT_REPOS } from '@/constants';
import { useEffect, useState } from 'react';

export default function useRecentRepos() {
  const [recentRepos, setRecentRepos] = useState<string[]>([]);

  useEffect(() => {
    const item = localStorage.getItem(LOCAL_STORAGE_KEYS.RECENT_REPOS);
    if (!item) return;

    const parsed = JSON.parse(item);
    if (Array.isArray(parsed)) setRecentRepos(parsed);
  }, []);

  function addRecentRepo(repo: string) {
    setRecentRepos((prev) => {
      const newRepos = [repo, ...prev.filter((r) => r !== repo)].slice(0, MAX_RECENT_REPOS);
      // update localStorage
      localStorage.setItem(LOCAL_STORAGE_KEYS.RECENT_REPOS, JSON.stringify(newRepos));

      return newRepos;
    });
  }

  return {
    recentRepos,
    addRecentRepo,
  };
}
