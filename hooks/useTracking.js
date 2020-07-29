import { Fragment, createElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import hoistNonReactStatics from 'hoist-non-react-statics';
import snakeCaseKeys from 'snakecase-keys';
import cookie from 'cookie';

import { useLogin } from './useLogin';

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

function createFunctionWithTimeout(callback, timeout = 500) {
  let called = false;
  const fn = () => !called && (called = true) && callback();
  setTimeout(fn, timeout);
  return fn;
}

function trackPageview(url, params = {}) {
  if (typeof window !== 'undefined') {
    if ('gtag' in window && 'gaId' in window) {
      window.gtag('config', window.gaId, {
        transport_type: 'beacon',
        ...snakeCaseKeys(params),
        ...(url ? { page_path: url } : {}),
      });
    }
  }
}

function trackEvent(action, params = {}) {
  if (typeof window !== 'undefined') {
    if ('gtag' in window && 'gaId' in window) {
      window.gtag('event', action, {
        send_to: window.gaId,
        transport_type: 'beacon',
        ...snakeCaseKeys(params),
      });
    }
  }
}

function trackOutboundLink(url, navigate) {
  trackEvent('click', {
    eventCategory: 'outbound',
    eventLabel: url,
    eventCallback: createFunctionWithTimeout(
      () => navigate && (document.location = url)
    ),
  });
}

function trackLogin(url, navigate) {
  trackEvent('login', {
    eventCategory: 'engagement',
    eventLabel: 'Auth0',
    eventCallback: createFunctionWithTimeout(
      () => navigate && (document.location = url)
    ),
  });
}

function trackLogout(url, navigate) {
  trackEvent('logout', {
    eventCategory: 'engagement',
    eventLabel: 'Auth0',
    eventCallback: createFunctionWithTimeout(
      () => navigate && (document.location = url)
    ),
  });
}

function trackVitals({ id, name, label, value }) {
  trackEvent(name, {
    eventCategory: label === 'web-vital' ? 'Web Vitals' : 'Next.js Metrics',
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    eventLabel: id,
    nonInteraction: true,
  });
}

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

export function withTracking(Component, ConsentComponent) {
  const WrappedComponent = (props) => {
    const [hasConsented, setHasConsented] = useState(getConsent());
    const { isLoggedIn, profile } = useLogin();
    const router = useRouter();
    useEffect(() => {
      if (hasConsented && isLoggedIn !== null) {
        const trackWithUserId = (url) => {
          if (isLoggedIn) trackPageview(url, { userId: profile.hash });
          else trackPageview(url);
        };
        loadGtag();
        storeConsent();
        trackWithUserId();
        router.events.on('routeChangeComplete', trackWithUserId);
        return () => {
          router.events.off('routeChangeComplete', trackWithUserId);
        };
      }
    }, [isLoggedIn, hasConsented]);
    if (hasConsented) {
      return createElement(Component, props);
    }
    return createElement(
      Fragment,
      {},
      createElement(ConsentComponent, { onClose: () => setHasConsented(true) }),
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
