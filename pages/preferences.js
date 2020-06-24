import { useTranslation } from '../hooks';

import { Page, Headline, Subline, PreferenceForm } from '../components';

import { subline } from './common.module.css';

export default function Preferences({ preferences }) {
  const { t } = useTranslation();
  return (
    <Page>
      <Headline>{t('prefHeadline')}</Headline>
      <Subline className={subline}>{t('prefSubline')}</Subline>
      <PreferenceForm preferences={preferences} />
    </Page>
  );
}

export async function getServerSideProps({ req }) {
  const { getPrefs } = require('../utils/prefs');
  const preferences = getPrefs(req);
  return {
    props: { preferences },
  };
}
