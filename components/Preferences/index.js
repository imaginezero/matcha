import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { usePrefs } from '../../hooks';

export function PreferenceForm() {
  const [localPrefs, setlocalPrefs] = useState(null);
  const { prefs, loadPrefs, updatePrefs } = usePrefs();
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updatePrefs(localPrefs);
    router.back();
  };
  useEffect(() => {
    if (!prefs) loadPrefs();
    if (prefs && !localPrefs) setlocalPrefs(prefs);
  });
  return (
    <form onSubmit={handleSubmit}>
      {localPrefs
        ? Object.entries(localPrefs)
            .map(([key, value], index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={key}
                  checked={value}
                  onChange={() =>
                    setlocalPrefs({ ...localPrefs, [key]: !value })
                  }
                />{' '}
                <label htmlFor={key}>{key}</label>
              </div>
            ))
            .concat([
              <input key="submit" type="submit" value="Speichern"></input>,
            ])
        : null}
    </form>
  );
}
