import { createHash } from 'crypto';

import auth from '../../../utils/auth';

export default async function handleAuth(req, res) {
  const { slug: action } = req.query;
  try {
    switch (action) {
      case 'login':
        return await auth.handleLogin(req, res);
      case 'logout':
        return await auth.handleLogout(req, res);
      case 'profile':
        return await auth.handleProfile(req, res);
      case 'callback':
        return await auth.handleCallback(req, res, {
          onUserLoaded: async (req, res, session) => {
            const hash = createHash('sha256');
            hash.update(session.user.sub);
            return {
              ...session,
              user: {
                ...session.user,
                hash: hash.digest('hex'),
              },
            };
          },
          redirectTo: '/api/prefs/restore',
        });
      default:
        throw new Error(`invalid action: ${action}`);
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
