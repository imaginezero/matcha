import { ProtectedPage, Content, H1, H4, PreferenceForm } from '../components';
import { useTranslation, withLogin } from '../hooks';
import { getPrefs, ensureProfile } from '../utils';

export default withLogin(function Preferences({ preferences }) {
  const { t } = useTranslation();
  return (
    <ProtectedPage title={t('prefTitle')} description={t('prefDescription')}>
      <Content>
        <H1>{t('prefHeadline')}</H1>
        <H4>{t('prefSubline')}</H4>
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
