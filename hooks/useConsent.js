import { useState } from 'react';

const saveConsent = async (consent) => {
  const response = await fetch('/api/consent', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(consent),
  });
  if (response.ok && response.status === 200) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
};

export function useConsent(currentConsent) {
  const [consent, setConsent] = useState(currentConsent);
  return {
    consent,
    setConsent,
    async saveConsent() {
      setConsent(await saveConsent(consent));
      return consent;
    },
  };
}
