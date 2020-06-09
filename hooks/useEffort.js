import { useState } from 'react';
import { useRouter } from 'next/router';

export const useEffort = (delay = 250) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const router = useRouter();
  const { pathname } = router;
  const { e: effort = 1, p: page = 1 } = router.query;
  return {
    effort,
    setEffort(e) {
      if (timeoutId) clearTimeout(timeoutId);
      setTimeoutId(
        setTimeout(() => router.push({ pathname, query: { e } }), delay)
      );
    },
    fetchMore() {
      router.push({ pathname, query: { e: effort, p: page + 1 } });
    },
  };
};
