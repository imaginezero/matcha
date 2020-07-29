import Link from 'next/link';
import { useRouter } from 'next/router';

import { useEffort, useLogin, useTranslation } from '../../hooks';

import {
  button,
  inactiveButton,
  preferenceLink,
  loadMoreWrapper,
} from './Results.module.css';

function LoadMoreButton({ moreActivities }) {
  const { getNextUrl } = useEffort();
  const { t } = useTranslation();
  return (
    <div>
      {moreActivities ? (
        <Link href={getNextUrl()} scroll={false}>
          <a className={button}>{t('mainResultsLoadMore')}</a>
        </Link>
      ) : (
        <a className={inactiveButton}>{t('mainResultsLoadMore')}</a>
      )}
    </div>
  );
}

function PreferenceLink() {
  const { t } = useTranslation();
  return (
    <div className={preferenceLink}>
      <Link href="/preferences">
        <a>{t('mainResultsPrefLink')}</a>
      </Link>
    </div>
  );
}

function LoginButton() {
  const { t } = useTranslation();
  const { asPath: redirectTo } = useRouter();
  const params = new URLSearchParams({ redirectTo });
  const loginUrl = `/api/auth/login?${params.toString()}`;
  return (
    <div>
      <a href={loginUrl} className={button}>
        {t('mainResultsLogin')}
      </a>
    </div>
  );
}

export default function LoadMoreWidget({ moreActivities }) {
  const { isLoggedIn } = useLogin();
  return (
    <div className={loadMoreWrapper}>
      {isLoggedIn ? (
        <>
          <LoadMoreButton moreActivities={moreActivities} />
          <PreferenceLink />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}
