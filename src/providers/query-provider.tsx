'use client';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';

function makeClient(): QueryClient {
  return new QueryClient();
}

let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient(): QueryClient {
  if (isServer) {
    // server: always return new instance
    return makeClient();
  } else {
    // browser: return new if we don't have one
    // else return old one
    if (!browserQueryClient) browserQueryClient = makeClient();
    return browserQueryClient;
  }
}

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
