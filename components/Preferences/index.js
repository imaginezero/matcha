import { useRouter } from 'next/router';

import { usePrefs } from '../../hooks';

export function PreferenceForm() {
  const { prefs, setPrefs, savePrefs } = usePrefs();
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await savePrefs();
    router.back();
  };
  return (
    <form onSubmit={handleSubmit}>
      {prefs
        ? Object.entries(prefs)
            .map(([key, value], index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={key}
                  checked={value}
                  onChange={() => setPrefs({ ...prefs, [key]: !value })}
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
