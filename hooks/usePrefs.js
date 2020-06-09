import { useState } from 'react';

const fetchPrefs = async (prefs) => {
  const response = await fetch(
    '/api/prefs',
    prefs && {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prefs),
    }
  );
  if (response.ok && response.status === 200) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
};

export function usePrefs() {
  const [prefs, setPrefs] = useState(null);
  return {
    prefs,
    async loadPrefs() {
      const prefs = await fetchPrefs();
      setPrefs(prefs);
      return prefs;
    },
    async updatePrefs(prefs) {
      setPrefs(await fetchPrefs(prefs));
      return prefs;
    },
  };
}
