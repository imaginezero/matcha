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

const managementClient = (async () =>
  new ManagementClient({
    token: await axios
      .post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials',
      })
      .then((res) => res.data.access_token),
    domain: process.env.AUTH0_DOMAIN,
  }))();

export async function getUser(req) {
  try {
    const client = await managementClient;
    const { idToken } = await auth.getSession(req);
    const [user] = await client.getUser(idToken);
    return camelcaseKeys(user);
  } catch (_) {
    return null;
  }
}

export async function updateUserMetadata(req, data) {
  try {
    const client = await managementClient;
    const user = await getUser(req);
    const { userId: id } = user;
    await client.updateUserMetadata({ id }, data);
    return true;
  } catch (_) {
    return false;
  }
}

export async function updateAppMetadata(req, data) {
  try {
    const client = await managementClient;
    const user = await getUser(req);
    const { userId: id } = user;
    await client.updateAppMetadata({ id }, data);
    return true;
  } catch (_) {
    return false;
  }
}

export default auth;
