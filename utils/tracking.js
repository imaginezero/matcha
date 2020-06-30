import snakeCaseKeys from 'snakecase-keys';

export function createFunctionWithTimeout(callback, timeout = 500) {
  let called = false;
  const fn = () => !called && (called = true) && callback();
  setTimeout(fn, timeout);
  return fn;
}

export function trackPageview(url, params = {}) {
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

export function trackEvent(action, params = {}) {
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

export function trackOutboundLink(url, navigate) {
  console.log(url);
  trackEvent('click', {
    eventCategory: 'outbound',
    eventLabel: url,
    eventCallback: createFunctionWithTimeout(
      () => navigate && (document.location = url)
    ),
  });
}

export function trackLogin(url, navigate) {
  trackEvent('login', {
    eventCategory: 'engagement',
    eventLabel: 'Auth0',
    eventCallback: createFunctionWithTimeout(
      () => navigate && (document.location = url)
    ),
  });
}

export function trackLogout(url, navigate) {
  trackEvent('logout', {
    eventCategory: 'engagement',
    eventLabel: 'Auth0',
    eventCallback: createFunctionWithTimeout(
      () => navigate && (document.location = url)
    ),
  });
}

export function trackVitals({ id, name, label, value }) {
  trackEvent(name, {
    eventCategory: label === 'web-vital' ? 'Web Vitals' : 'Next.js Metrics',
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    eventLabel: id,
    nonInteraction: true,
  });
}
