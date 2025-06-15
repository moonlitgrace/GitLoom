import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

export function useStableSession() {
  const { data, status } = useSession();
  // session gets synced everytime
  // which re-triggers all checks
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const session = useMemo(() => data, [data?.accessToken]);

  return { session, status };
}
