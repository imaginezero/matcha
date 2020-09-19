import Link from 'next/link';
import { useRouter } from 'next/router';

import { useEffort, useLogin, useTracking, useTranslation } from '../../hooks';

import {
  button,
  loadMoreWrapper,
} from './Results.module.css';

function LoadMoreButton() {
  const { hasNextHigherEffortLevel, getNextHigherEffortLevelUrl } = useEffort();
  const { t } = useTranslation();
  return (
    <div>
      {hasNextHigherEffortLevel() ? (
        <Link href={getNextHigherEffortLevelUrl()}>
          <a className={button}>{'Papperlabla'}</a>
        </Link>
      ) : (
        null
      )}
    </div>
  );
}

export default function LoadMoreWidget() {
  return (
    <div className={loadMoreWrapper}>
          <LoadMoreButton />
    </div>
  );
}
