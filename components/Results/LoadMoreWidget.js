import Link from 'next/link';

import { useEffort, useTranslation } from '../../hooks';

import { button, inactiveButton, preferenceLink } from './Results.module.css';

function MoreButton({ moreActivities }) {
  const { getNextUrl } = useEffort();
  const { t } = useTranslation();
  return moreActivities ? (
    <Link href={getNextUrl()} scroll={false}>
      <a className={button}>{t('mainResultsLoadMore')}</a>
    </Link>
  ) : (
    <a className={inactiveButton}>{t('mainResultsLoadMore')}</a>
  );
}

function PreferenceLink() {
  const { t } = useTranslation();
  return (
    <span className={preferenceLink}>
      <Link href="/preferences">
        <a>{t('mainResultsPrefLink')}</a>
      </Link>
    </span>
  );
}

export default function LoadMoreWidget({ moreActivities, isLoggedIn }) {
  return (
    <>
      <MoreButton moreActivities={moreActivities} />
      <PreferenceLink />
    </>
  );
}
