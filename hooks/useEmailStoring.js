import cookie from 'cookie';

const cookieName = '__email_entered';

export function didEnterEmail() {
  if (typeof document === 'undefined') return true;
  return !!cookie.parse(document.cookie)[cookieName];
}

export function saveEmailEntered() {
  document.cookie = cookie.serialize(cookieName, 1, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
}