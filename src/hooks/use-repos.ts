import { getRepos } from '@/lib/api/github';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import useDebounce from './use-debounce';

export default function useRepos() {
  const { data: session } = useSession();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const accessToken = session?.accessToken;
  const username = session?.user?.username;

  const { data: repos, isLoading } = useQuery({
    queryKey: ['repos', username, debouncedSearch],
    queryFn: () => getRepos({ accessToken, username, query: debouncedSearch }),
    // only fetch if there is valid session
    enabled: !!session,
  });

  return {
    search,
    setSearch,
    debouncedSearch,
    repos,
    isLoading,
  };
}
