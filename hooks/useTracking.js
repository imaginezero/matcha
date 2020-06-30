import {
  trackEvent,
  trackOutboundLink,
  trackLogin,
  trackLogout,
} from '../utils/tracking';

export function useTracking() {
  return { trackEvent, trackOutboundLink, trackLogin, trackLogout };
}
