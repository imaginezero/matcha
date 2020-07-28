import Head from 'next/head';
import { useRouter } from 'next/router';

import { useLogin } from '../../hooks';

import Page from './Page';

export default function ProtectedPage(props) {
  const { asPath } = useRouter();
  const { isLoggedIn } = useLogin();
  if (!isLoggedIn) {
    const params = new URLSearchParams({ redirectTo: asPath });
    const loginUrl = `/api/auth/login?${params.toString()}`;
    if (typeof window !== 'undefined') {
      window.location.replace(loginUrl);
    }
    return (
      <Head>
        <meta httpEquiv="refresh" content={`0;url=${loginUrl}`} />
      </Head>
    );
  }
  return <Page {...props} />;
}
