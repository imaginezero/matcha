import { useRouter } from 'next/router';

import { usePrefs } from '../../hooks';

import { Checkbox } from '../Checkbox';

import {
  columns,
  questionColumn,
  checkboxColumn,
  submitButton,
} from './styles.module.css';

const questions = {
  isParent: 'Bist du Mutter oder Vater?',
  isStudent: 'Gehst du zur Schule oder zur Uni?',
  isScientist: 'Bist du Wissenschaftlerin oder Wissenschaftler?',
  isOfficial: 'Repräsentierst du eine Behörde oder Kommune?',
  isNgoExec: 'Repräsentierst du eine NGO oder eine aktivistische Gruppe?',
  isCompanyExec: 'Repräsentierst du ein Unternehmen?',
};

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
        ? Object.entries(prefs).map(([key, value]) => (
            <div className={columns} key={key}>
              <div
                className={questionColumn}
                onClick={() => setPrefs({ ...prefs, [key]: !value })}
              >
                <span>{questions[key]}</span>
              </div>
              <div className={checkboxColumn}>
                <Checkbox
                  id={key}
                  checked={value}
                  onChange={() => setPrefs({ ...prefs, [key]: !value })}
                />
              </div>
            </div>
          ))
        : null}
      <input
        key="submit"
        type="submit"
        value="Einstellungen Speichern"
        className={submitButton}
      ></input>
    </form>
  );
}
