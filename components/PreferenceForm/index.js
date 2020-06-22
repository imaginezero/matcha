import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { usePrefs, useTranslation } from '../../hooks';

import { Checkbox } from '../Checkbox';

import { Login } from './Login';

import {
  columns,
  questionColumn,
  checkboxColumn,
  submitButton,
} from './styles.module.css';

export function PreferenceForm({ preferences }) {
  const { prefs, setPrefs, savePrefs } = usePrefs(preferences);
  const keys = useMemo(() => Object.keys(prefs), []);
  const { t } = useTranslation();
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await savePrefs();
    router.back();
  };
  return (
    <form onSubmit={handleSubmit} action="/api/prefs/update" method="POST">
      <Login />
      {keys.map((key) => {
        const value = prefs[key];
        return (
          <div className={columns} key={key}>
            <div
              className={questionColumn}
              onClick={() => setPrefs({ ...prefs, [key]: !value })}
            >
              <span>{t(`prefQuestion.${key}`)}</span>
            </div>
            <div className={checkboxColumn}>
              <Checkbox
                id={key}
                checked={value}
                onChange={() => setPrefs({ ...prefs, [key]: !value })}
              />
            </div>
          </div>
        );
      })}
      <input
        key="submit"
        type="submit"
        value={t('prefSubmitButton')}
        className={submitButton}
      ></input>
    </form>
  );
}
