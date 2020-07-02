import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Frame } from '../components';
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
    if (isLoggedIn !== null) trackWithUserId();
  }, [isLoggedIn]);
  useEffect(() => {
    router.events.on('routeChangeComplete', trackWithUserId);
    return () => {
      router.events.off('routeChangeComplete', trackWithUserId);
    };
  }, []);
  if (Component.noFrame) {
    return <Component {...pageProps} />;
  } else {
    return (
      <Frame>
        <Component {...pageProps} />
      </Frame>
    );
  }
});

export function reportWebVitals(params) {
  trackVitals(params);
}
