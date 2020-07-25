import { parse } from 'url';

import { useRouter } from 'next/router';

import { useConsent, useEffort, useLoading, useTranslation } from '../../hooks';

import { Checkbox } from '../Checkbox';

import {
  columns,
  questionColumn,
  checkboxColumn,
  submitButton,
} from './ConsentForm.module.css';

const Form = ({ consent, setConsent, handleSubmit }) => {
  const { t } = useTranslation();
  const { general, updates, feedback } = consent || {};
  const toggleGeneral = () => setConsent({ ...consent, general: !general });
  const toggleUpdates = () => setConsent({ ...consent, updates: !updates });
  const toggleFeedback = () => setConsent({ ...consent, feedback: !feedback });
  return (
    <form onSubmit={handleSubmit} action="/api/consent" method="POST">
      <div className={columns}>
        <div className={questionColumn} onClick={toggleGeneral}>
          <span>{t('consentQuestion.general')}</span>
        </div>
        <div className={checkboxColumn}>
          <Checkbox id="general" checked={general} onChange={toggleGeneral} />
        </div>
      </div>
      <div className={columns}>
        <div className={questionColumn} onClick={toggleUpdates}>
          <span>{t('consentQuestion.updates')}</span>
        </div>
        <div className={checkboxColumn}>
          <Checkbox id="updates" checked={updates} onChange={toggleUpdates} />
        </div>
      </div>
      <div className={columns}>
        <div className={questionColumn} onClick={toggleFeedback}>
          <span>{t('consentQuestion.feedback')}</span>
        </div>
        <div className={checkboxColumn}>
          <Checkbox
            id="feedback"
            checked={feedback}
            onChange={toggleFeedback}
          />
        </div>
      </div>
      <input
        key="submit"
        type="submit"
        value={t('consentSubmitButton')}
        className={submitButton}
      ></input>
    </form>
  );
};

export default function ConsentForm({ consent: defaultConsent, redirectTo }) {
  const { consent, setConsent, saveConsent } = useConsent(defaultConsent || {});
  const { setLoading } = useLoading();
  const { getQuery } = useEffort();
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await saveConsent();
    router
      .push(
        redirectTo
          ? { ...parse(redirectTo, true) }
          : { pathname: '/', query: getQuery() }
      )
      .then(() => window.scrollTo(0, 0));
  };
  return (
    <Form
      consent={consent}
      setConsent={setConsent}
      handleSubmit={handleSubmit}
    />
  );
}
