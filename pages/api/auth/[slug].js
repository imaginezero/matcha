import { createHash } from 'crypto';

import { auth } from '../../../utils';

export default async function handleAuth(req, res) {
  const { slug: action } = req.query;
  try {
    switch (action) {
      case 'login':
        return await auth.handleLogin(req, res, { redirectTo: '/' });
      case 'logout':
        return await auth.handleLogout(req, res);
      case 'profile':
        return await auth.handleProfile(req, res);
      case 'callback':
        return await auth.handleCallback(req, res, {
          async onUserLoaded(req, res, { user, ...session }, state) {
            const hash = createHash('sha256').update(user.sub).digest('hex');
            const params = new URLSearchParams({
              redirectTo: state.redirectTo,
            });
            state.redirectTo = `/api/prefs/restore?${params.toString()}`;
            return { ...session, user: { ...user, hash } };
          },
        });
      default:
        throw new Error(`invalid action: ${action}`);
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
