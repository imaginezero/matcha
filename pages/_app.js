import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { withLogin, useLogin } from '../hooks';
import { trackPageview, trackVitals } from '../utils/tracking';

import './global.css';

export default withLogin(function MatchaApp({ Component, pageProps }) {
  const router = useRouter();
  const { isLoggedIn, profile } = useLogin();
  const trackWithUserId = (url) => {
    if (isLoggedIn) {
      trackPageview(url, { userId: profile.hash });
    } else {
      trackPageview(url);
    }
  };
  useEffect(() => {
    router.events.on('routeChangeComplete', trackWithUserId);
    return () => {
      router.events.off('routeChangeComplete', trackWithUserId);
    };
  }, []);
  useEffect(() => {
    if (isLoggedIn !== null) trackWithUserId();
  }, [isLoggedIn]);
  return <Component {...pageProps} />;
});

export function reportWebVitals(params) {
  trackVitals(params);
}
