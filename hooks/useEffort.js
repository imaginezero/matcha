import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const setBackgroundColor = (effort) => {
  const property = '--effort-background';
  const regExp = /(hsl\([\d.]+, )(?:\d+)(%, \d+%\))/;

  const root = document.documentElement;
  const currentValue = getComputedStyle(root).getPropertyValue(property);

  if (regExp.test(currentValue)) {
    const nextValue = currentValue.replace(regExp, `$1${effort / 2}$2`);
    root.style.setProperty(property, nextValue.trim());
  }
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
