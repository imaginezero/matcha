import { Page, Content, Headline, Subline, ConsentForm } from '../components';

import { useTranslation } from '../hooks';

import { getUser } from '../utils/auth';

export default function Consent({ consent, redirectTo }) {
  const { t } = useTranslation();
  return (
    <Page title={t('consentTitle')} description={t('consentDescription')}>
      <Content>
        <Headline>{t('consentHeadline')}</Headline>
        <Subline>{t('consentSubline')}</Subline>
        <ConsentForm consent={consent} redirectTo={redirectTo} />
      </Content>
    </Page>
  );
}

export async function getServerSideProps({ req, res, query }) {
  const { redirectTo = null } = query;
  if (redirectTo && !redirectTo.startsWith('/')) throw new Error('invalid url');
  try {
    const { appMetadata = {} } = await getUser(req);
    const { consent = null } = appMetadata;
    if (consent && redirectTo) {
      res.writeHead(302, { Location: redirectTo });
      res.end();
      return { props: {} };
    } else {
      return { props: { consent, redirectTo } };
    }
  } catch (error) {
    res.writeHead(302, { Location: '/api/auth/login' });
    res.end();
    return { props: {} };
  }
}
