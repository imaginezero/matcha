import { useRouter } from 'next/router';

import { usePrefs } from '../../hooks';

import { Checkbox } from '../Checkbox';

export function PreferenceForm({ preferences }) {
  const { prefs, setPrefs, savePrefs } = usePrefs(preferences);
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await savePrefs();
    router.back();
  };
  return (
    <form onSubmit={handleSubmit} action="/api/prefs/update" method="POST">
      {prefs
        ? Object.entries(prefs).map(([key, value], index) => (
            <div key={index}>
              <span>{key}</span>
              <Checkbox
                id={key}
                checked={value}
                onChange={() => setPrefs({ ...prefs, [key]: !value })}
              />{' '}
            </div>
          ))
        : null}
      <input key="submit" type="submit" value="Speichern"></input>
    </form>
  );
}
