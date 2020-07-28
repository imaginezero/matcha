import Head from 'next/head';

import Page from './Page';

export default function ProtectedPage({ isLoggedIn = null, ...props }) {
  const loginUrl = '/api/auth/login';
  return isLoggedIn === false ? (
    <Head>
      <meta httpEquiv="refresh" content={`0;url=${loginUrl}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.assign(${loginUrl})`,
        }}
      />
    </Head>
  ) : (
    <Page {...props} />
  );
}
