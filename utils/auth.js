import { initAuth0 } from '@auth0/nextjs-auth0';
import { ManagementClient } from 'auth0';
import axios from 'axios';

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
  // scope: 'openid profile',
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

auth.getManagementClient = async () => managementClient;

export default auth;
