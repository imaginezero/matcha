import { useState, useEffect } from 'react';
import Link from 'next/link';

import { useEffort, useLoading, useTranslation } from '../../hooks';

import { Content } from '../Content';
import { Headline } from '../Typo';
import { ActivityCard } from '../ActivityCard';
import { LogoMark } from '../Logo';

import { concatClassnames } from '../utilities';

import {
  wrapper,
  headline,
  content,
  card,
  button,
  spinner,
  spinnerWrapper,
  transparentWrapper,
} from './Results.module.css';

const Button = () => {
  const { getNextUrl } = useEffort();
  const { t } = useTranslation();
  return (
    <Link href={getNextUrl()} scroll={false}>
      <a className={button}>{t('mainResultsLoadMore')}</a>
    </Link>
  );
};

const Spinner = () => {
  const loading = useLoading();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (loading && !open) setOpen(true);
    if (!loading && open) setTimeout(() => setOpen(false), 500);
  });
  const classNames = concatClassnames(
    spinnerWrapper,
    ...(loading ? [] : [transparentWrapper])
  );
  return open ? (
    <div className={classNames}>
      <LogoMark className={spinner} />
    </div>
  ) : null;
};

export default function Results({ activities, moreActivities }) {
  const { t } = useTranslation();
  return (
    <div className={wrapper}>
      <Spinner />
      <Content className={content}>
        <Headline className={headline}>{t('mainResultsHeadline')}</Headline>
        {activities.map((activity) => (
          <div key={activity.slug} className={card}>
            <ActivityCard activity={activity} />
          </div>
        ))}
        {moreActivities ? <Button /> : ''}
      </Content>
    </div>
  );
}
