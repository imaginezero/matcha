import Link from 'next/link';
import { useRouter } from 'next/router';

import { useEffort, useTracking, useTranslation } from '../../hooks';

import {
  button,
  inactiveButton,
  preferenceLink,
  followupActionsWrapper,
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
  const { trackLogin } = useTracking();
  const { asPath: redirectTo } = useRouter();
  const params = new URLSearchParams({ redirectTo });
  const loginUrl = `/api/auth/login?${params.toString()}`;
  return (
    <div>
      <a
        href={loginUrl}
        onClick={(event) => {
          event.preventDefault();
          trackLogin(event.target.href, true);
        }}
        className={button}
      >
        {t('mainResultsLogin')}
      </a>
    </div>
  );
}

function NextHigherEffortButton() {
  const { hasNextHigherEffortLevel, getNextHigherEffortLevelUrl } = useEffort();
  const { t } = useTranslation();
  return (
    <div>
      {hasNextHigherEffortLevel() ? (
        <Link href={getNextHigherEffortLevelUrl()}>
          <a className={button}>{t('mainResultsNextHigherEffort')}</a>
        </Link>
      ) : (
        null
      )}
    </div>
  );
}

export default function FollowupActionsWrapper({ moreActivities }) {
  // const { isLoggedIn } = useLogin();
  return (
    <div className={followupActionsWrapper}>
      <NextHigherEffortButton />
      {/* {isLoggedIn ? (
        <>
          <LoadMoreButton moreActivities={moreActivities} />
          <PreferenceLink />
        </>
      ) : (
        <LoginButton />
      )} */}
    </div>
  );
}
