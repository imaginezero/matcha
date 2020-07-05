import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { usePrefs, useEffort, useLoading, useTranslation } from '../../hooks';

import { Explanation } from '../Typo';
import { Checkbox } from '../Checkbox';

import Login from './Login';

import {
  columns,
  questionColumn,
  checkboxColumn,
  submitButton,
} from './PreferenceForm.module.css';

const Form = ({ prefs, setPrefs, handleSubmit }) => {
  const { t } = useTranslation();
  const keys = useMemo(() => Object.keys(prefs), []);
  return (
    <form onSubmit={handleSubmit} action="/api/prefs/update" method="POST">
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
      <Explanation>
        <Login />
      </Explanation>
      <input
        key="submit"
        type="submit"
        value={t('prefSubmitButton')}
        className={submitButton}
      ></input>
    </form>
  );
};

export default function PreferenceForm({ preferences }) {
  const { prefs, setPrefs, savePrefs } = usePrefs(preferences);
  const { setLoading } = useLoading();
  const { getQuery } = useEffort();
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await savePrefs();
    router
      .push({ pathname: '/main', query: getQuery() })
      .then(() => window.scrollTo(0, 0));
  };
  return <Form prefs={prefs} setPrefs={setPrefs} handleSubmit={handleSubmit} />;
}
