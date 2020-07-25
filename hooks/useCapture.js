import { useLogin } from './useLogin';

function captureEvent(name, properties) {
  const body = JSON.stringify({ name, properties });
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/event', body);
  } else {
    fetch('/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
  }
}

function captureOutboundLink(name, url) {
  captureEvent('clicked_outbound_link', { name, url });
}

export function useCapture() {
  const { isLoggedIn } = useLogin();
  return {
    captureEvent(...args) {
      if (isLoggedIn) captureEvent(...args);
    },
    captureOutboundLink(...args) {
      if (isLoggedIn) captureOutboundLink(...args);
    },
  };
}
