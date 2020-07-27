import { useTranslation } from '../hooks';

import { getPrefs } from '../utils/prefs';
import { isAuthenticated } from '../utils/auth';

import {
  ProtectedPage,
  Content,
  Headline,
  Subline,
  PreferenceForm,
} from '../components';

export default function Preferences({ preferences, isLoggedIn }) {
  const { t } = useTranslation();
  return (
    <ProtectedPage
      title={t('prefTitle')}
      description={t('prefDescription')}
      isLoggedIn={isLoggedIn}
    >
      <Content>
        <Headline>{t('prefHeadline')}</Headline>
        <Subline>{t('prefSubline')}</Subline>
        <PreferenceForm preferences={preferences} />
      </Content>
    </ProtectedPage>
  );
}

export async function getServerSideProps({ req }) {
  const preferences = getPrefs(req);
  const isLoggedIn = await isAuthenticated(req);
  return {
    props: { preferences, isLoggedIn },
  };
}
