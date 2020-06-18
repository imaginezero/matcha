import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const setBackgroundColor = (effort) => {
  const root = document.documentElement;
  const property = '--effort-background';
  // root.style.setProperty(property, `hsl(122.4, ${effort / 2}%, 70%)`);
  root.style.setProperty(property, `hsl(80, ${effort / 2 + 10}%, 70%)`);
};

export const useEffort = (delay = 250) => {
  const router = useRouter();
  const { pathname, query } = router;

  const queryEffort = Number(query.e || 10);
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
    fetchMore() {
      router.push({ pathname, query: { e: queryEffort, p: queryPage + 1 } });
    },
  };
};
