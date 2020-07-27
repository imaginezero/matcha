import {
  ProtectedPage,
  Content,
  Headline,
  Subline,
  ConsentForm,
} from '../components';

import { useTranslation } from '../hooks';

import { isAuthenticated, getUser } from '../utils/auth';

export default function Consent({ isLoggedIn, consent, redirectTo }) {
  const { t } = useTranslation();
  return (
    <ProtectedPage
      title={t('consentTitle')}
      description={t('consentDescription')}
      isLoggedIn={isLoggedIn}
    >
      <Content>
        <Headline>{t('consentHeadline')}</Headline>
        <Subline>{t('consentSubline')}</Subline>
        <ConsentForm consent={consent} redirectTo={redirectTo} />
      </Content>
    </ProtectedPage>
  );
}

export async function getServerSideProps({ req, res, query }) {
  const { redirectTo = null } = query;
  if (redirectTo && !/^[a-zA-Z0-9/][a-zA-Z0-9][^:]+$/.test(redirectTo)) {
    throw new Error('invalid redirect url');
  }
  const isLoggedIn = await isAuthenticated(req);
  if (isLoggedIn) {
    const { appMetadata = {} } = await getUser(req);
    const { consent = null } = appMetadata;
    if (consent && redirectTo) {
      res.writeHead(302, { Location: redirectTo });
      res.end();
      return { props: {} };
    } else {
      return { props: { consent, redirectTo } };
    }
  } else {
    return { props: { isLoggedIn } };
  }
}
