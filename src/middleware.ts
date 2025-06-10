// to keep sessions alive
export { auth as middleware } from '@/auth';

// optionally, don't invoke middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
