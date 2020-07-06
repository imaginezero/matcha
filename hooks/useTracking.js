import { Fragment, createElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import hoistNonReactStatics from 'hoist-non-react-statics';
import cookie from 'cookie';

import { CookieConsent } from '../components';

import {
  trackEvent,
  trackOutboundLink,
  trackLogin,
  trackLogout,
  trackPageview,
  trackVitals,
} from '../utils/tracking';

import { useLogin } from './useLogin';

function getConsent() {
  if (typeof document === 'undefined') return true;
  return !!cookie.parse(document.cookie).__consent;
}

function storeConsent() {
  document.cookie = cookie.serialize('__consent', 1, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
}

function loadGtag() {
  if (window && window.gaId && !window.gaRequested) {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute(
      'src',
      `https://www.googletagmanager.com/gtag/js?id=${window.gaId}`
    );
    document.body.appendChild(script);
    window.gaRequested = true;
  }
}

export function withTracking(Component) {
  const WrappedComponent = (props) => {
    const [hasConsented, setHasConsented] = useState(getConsent());
    const { isLoggedIn, profile } = useLogin();
    const router = useRouter();
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
      if (hasConsented) {
        loadGtag();
        storeConsent();
        router.events.on('routeChangeComplete', trackWithUserId);
        return () => {
          router.events.off('routeChangeComplete', trackWithUserId);
        };
      }
    }, [hasConsented]);
    if (hasConsented) {
      return createElement(Component, props);
    }
    return createElement(
      Fragment,
      {},
      createElement(CookieConsent, { onClose: () => setHasConsented(true) }),
      createElement(Component, props)
    );
  };
  hoistNonReactStatics(WrappedComponent, Component);
  WrappedComponent.displayName = `WithTracking(${
    Component.displayName || Component.name || 'Component'
  })`;
  return WrappedComponent;
}

withTracking.trackVitals = trackVitals;

export function useTracking() {
  return { trackEvent, trackOutboundLink, trackLogin, trackLogout };
}
