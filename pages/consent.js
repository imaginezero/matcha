import { ProtectedPage, Content, H1, H4, ConsentForm } from '../components';
import { useTranslation, withLogin } from '../hooks';
import { ensureProfile, getUser, getRedirectUrl } from '../utils';

export default withLogin(function Consent({ consent, redirectTo }) {
  const { t } = useTranslation();
  return (
    <ProtectedPage
      title={t('consentTitle')}
      description={t('consentDescription')}
    >
      <Content>
        <H1>{t('consentHeadline')}</H1>
        <H4>{t('consentSubline')}</H4>
        <ConsentForm consent={consent} redirectTo={redirectTo} />
      </Content>
    </ProtectedPage>
  );
});

export async function getServerSideProps({ req, res }) {
  const redirectTo = getRedirectUrl(req);
  const profile = await ensureProfile(req, res);
  if (profile) {
    const { appMetadata = {} } = await getUser(req);
    const { consent = null } = appMetadata;
    if (consent && redirectTo) {
      res.writeHead(302, { Location: redirectTo });
      res.end();
      return { props: {} };
    } else {
      return { props: { profile, consent, redirectTo } };
    }
  } else {
    return { props: { profile } };
  }
}
