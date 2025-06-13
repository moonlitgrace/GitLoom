import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

export function useStableSession() {
  const { data: session } = useSession();
  // session gets synced everytime
  // which re-triggers all checks
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableSession = useMemo(() => session, [session?.accessToken]);

  return stableSession;
}
