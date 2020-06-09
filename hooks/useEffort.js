import { useState } from 'react';
import { useRouter } from 'next/router';

export const useEffort = (delay = 250) => {
  const router = useRouter();
  const { e = 1, p = 1 } = router.query;
  const [effort, setEffort] = useState(e);

  const [timeoutId, setTimeoutId] = useState(null);
  const { pathname } = router;

  return {
    effort,
    setEffort(e) {
      if (timeoutId) clearTimeout(timeoutId);
      setTimeoutId(
        setTimeout(() => router.push({ pathname, query: { e } }), delay)
      );
      setEffort(e);
    },
    fetchMore() {
      router.push({ pathname, query: { e, p: p + 1 } });
    },
  };
};
