import { useTranslation, withLogin } from '../hooks';

import { getPrefs } from '../utils/prefs';
import { ensureProfile } from '../utils/auth';

import {
  ProtectedPage,
  Content,
  Headline,
  Subline,
  PreferenceForm,
} from '../components';

export default withLogin(function Preferences({ preferences }) {
  const { t } = useTranslation();
  return (
    <ProtectedPage title={t('prefTitle')} description={t('prefDescription')}>
      <Content>
        <Headline>{t('prefHeadline')}</Headline>
        <Subline>{t('prefSubline')}</Subline>
        <PreferenceForm preferences={preferences} />
      </Content>
    </ProtectedPage>
  );
});

export async function getServerSideProps({ req, res }) {
  const preferences = getPrefs(req);
  const profile = await ensureProfile(req, res);
  return {
    props: { preferences, profile },
  };
}
