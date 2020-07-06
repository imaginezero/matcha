import dynamic from 'next/dynamic';

export const CookieConsent = dynamic(() => import('./CookieConsent'), {
  ssr: false,
});
