import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const setBackgroundColor = (effort) => {
  const root = document.documentElement;
  const property = '--effort-background';
  const hue = 200 - effort * 1.25;
  const saturation = 30 + effort * 0.4;
  const lightness = 75 - effort * 0.125;
  root.style.setProperty(
    property,
    `hsl(${hue}, ${saturation}%, ${lightness}%)`
  );
};

export const defaultEffort = 40;

export function useEffort(delay = 250) {
  const router = useRouter();
  const { pathname, query } = router;

  const queryEffort = Number(query.e || defaultEffort);
  const queryPage = Number(query.p || 1);

  const [timeoutId, setTimeoutId] = useState(null);
  const [effort, setEffort] = useState(queryEffort);

  useEffect(() => {
    if (queryEffort !== effort) {
      setEffort(queryEffort);
    }
  }, [queryEffort]);

  useEffect(() => {
    setBackgroundColor(effort);
  }, [effort]);

  return {
    effort,
    setEffort(e) {
      if (timeoutId) clearTimeout(timeoutId);
      setTimeoutId(
        setTimeout(() => router.push({ pathname, query: { e } }), delay)
      );
      setEffort(Number(e));
    },
    getNextUrl() {
      return { pathname, query: { e: queryEffort, p: queryPage + 1 } };
    },
  };
}
