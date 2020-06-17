import { useState } from 'react';

const savePrefs = async (prefs) => {
  const response = await fetch('/api/prefs/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(prefs),
  });
  if (response.ok && response.status === 200) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
};

export function usePrefs(currentPrefs) {
  const [prefs, setPrefs] = useState(currentPrefs);
  return {
    prefs,
    setPrefs,
    async savePrefs() {
      setPrefs(await savePrefs(prefs));
      return prefs;
    },
  };
}
