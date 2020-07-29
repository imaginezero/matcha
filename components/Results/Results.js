import { useState, useEffect } from 'react';

import { useLoading, useTranslation } from '../../hooks';

import { Content } from '../Content';
import { Headline } from '../Typo';
import { ActivityCard } from '../ActivityCard';

import { concatClassnames } from '../utilities';

import LoadMoreWidget from './LoadMoreWidget';

import {
  wrapper,
  headline,
  content,
  card,
  loaderWrapper,
  transparentWrapper,
} from './Results.module.css';

const Overlay = () => {
  const { loading } = useLoading();
  const [open, setOpen] = useState(loading);
  const classNames = concatClassnames(
    loaderWrapper,
    ...(loading ? [] : [transparentWrapper])
  );
  useEffect(() => {
    if (loading && !open) setOpen(true);
    if (!loading && open) setTimeout(() => setOpen(false), 500);
  });
  return open ? <div className={classNames} /> : null;
};

export default function Results({ activities, moreActivities }) {
  const { t } = useTranslation();
  return (
    <div className={wrapper}>
      <Overlay />
      <Content className={content}>
        <Headline className={headline}>{t('mainResultsHeadline')}</Headline>
      </Content>
      <div>
        {activities.map((activity) => (
          <div key={activity.slug} className={card}>
            <ActivityCard activity={activity} />
          </div>
        ))}
      </div>
      <Content className={content}>
        <LoadMoreWidget moreActivities={moreActivities} />
      </Content>
    </div>
  );
}
