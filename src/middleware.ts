import { auth } from '@/auth';

const PROTECTED_ROUTES = [
  { path: '/new', exact: true },
  { path: '/@', exact: false },
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_ROUTES.some(({ path, exact }) =>
    exact ? pathname === path : pathname.startsWith(path),
  );

  if (!req.auth && isProtected) {
    const loginUrl = new URL('/login', req.url);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
