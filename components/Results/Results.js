import { useState, useEffect } from 'react';
import Link from 'next/link';

import { useEffort, useLoading, useTranslation } from '../../hooks';

import { Content } from '../Content';
import { Headline } from '../Typo';
import { ActivityCard } from '../ActivityCard';

import { concatClassnames } from '../utilities';

import {
  wrapper,
  headline,
  content,
  card,
  button,
  loaderWrapper,
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

const Overlay = () => {
  const { loading } = useLoading();
  const [open, setOpen] = useState(loading);
  const classNames = concatClassnames(
    loaderWrapper,
    ...(loading ? [] : [transparentWrapper])
  );
  useEffect(() => {
    if (loading && !open) setOpen(true);
  });
  return open ? (
    <div
      className={classNames}
      onAnimationEnd={() => {
        if (!loading && open) setOpen(false);
      }}
    />
  ) : null;
};

export default function Results({ activities, moreActivities }) {
  const { t } = useTranslation();
  return (
    <div className={wrapper}>
      <Overlay />
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
