import { initAuth0 } from '@auth0/nextjs-auth0';
import { ManagementClient } from 'auth0';
import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

const auth = initAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  redirectUri: `${process.env.BASE_URL}/api/auth/callback`,
  postLogoutRedirectUri: `${process.env.BASE_URL}/api/prefs/reset`,
  session: {
    cookieSecret: process.env.AUTH0_COOKIE_SECRET,
    cookieLifetime: 60 * 60 * 24 * 7,
    storeIdToken: true,
    storeAccessToken: true,
    storeRefreshToken: true,
  },
  scope: 'email openid profile',
});

const getManagementClient = (() => {
  let managementClient;
  return async function getManagementClient() {
    if (!managementClient) {
      try {
        managementClient = new ManagementClient({
          token: await axios
            .post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
              client_id: process.env.AUTH0_CLIENT_ID,
              client_secret: process.env.AUTH0_CLIENT_SECRET,
              audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
              grant_type: 'client_credentials',
              timeout: 5000,
            })
            .then((res) => res.data.access_token),
          domain: process.env.AUTH0_DOMAIN,
        });
      } catch (_) {
        console.error('failed to instantiate Auth0 management client');
      }
    }
    return managementClient;
  };
})();

export async function getProfile(req) {
  try {
    const { user } = await auth.getSession(req);
    return user;
  } catch (_) {
    return null;
  }
}

export async function ensureProfile(req, res) {
  const profile = await getProfile(req);
  if (!profile && /^(?!.*\.json(?:\?.*)?)/.test(req.url)) {
    const params = new URLSearchParams({ redirectTo: req.url });
    res.writeHead(302, { Location: `/api/auth/login?${params.toString()}` });
    res.end();
  }
  return profile;
}

export async function getUser(req) {
  try {
    const client = await getManagementClient();
    const { idToken } = await auth.getSession(req);
    const [user] = await client.getUser(idToken);
    return camelcaseKeys(user);
  } catch (_) {
    return null;
  }
}

export async function updateUserMetadata(req, data) {
  try {
    const client = await getManagementClient();
    const user = await getUser(req);
    const { userId: id, userMetadata } = user;
    await client.updateUserMetadata({ id }, { ...userMetadata, ...data });
    return true;
  } catch (_) {
    return false;
  }
}

export async function updateUserAppMetadata(req, data) {
  try {
    const client = await getManagementClient();
    const user = await getUser(req);
    const { userId: id, appMetadata } = user;
    await client.updateAppMetadata({ id }, { ...appMetadata, ...data });
    return true;
  } catch (_) {
    return false;
  }
}

export default auth;
