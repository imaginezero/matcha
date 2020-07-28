import { parse } from 'url';

export function getRedirectUrl(req) {
  const { pathname: currentPathname, query } = parse(req.url, true);
  const { redirectTo } = query;
  if (redirectTo) {
    const { protocol, pathname } = parse(redirectTo);
    if (protocol || pathname.startsWith('//')) {
      throw new Error('invalid redirectTo parameter');
    }
    if (currentPathname !== pathname) return redirectTo;
  }
  return null;
}
