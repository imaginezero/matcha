import { useTranslation } from '../hooks';

import {
  Page,
  Content,
  Headline,
  Subline,
  PreferenceForm,
} from '../components';

export default function Preferences({ preferences }) {
  const { t } = useTranslation();
  return (
    <Page title={t('prefTitle')} description={t('prefDescription')}>
      <Content>
        <Headline>{t('prefHeadline')}</Headline>
        <Subline>{t('prefSubline')}</Subline>
        <PreferenceForm preferences={preferences} />
      </Content>
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
