import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

import { useLoading, useTranslation } from '../../hooks';

import { Content } from '../Content';
import { Cards } from '../Cards';
import { ActivityCard } from '../ActivityCard';

import { concatClassnames } from '../utilities';

import FollowupActionsWrapper from './FollowupActionsWrapper';

import {
  wrapper,
  headline,
  content,
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

export default function Results({ activities /*, moreActivities */ }) {
  const { t } = useTranslation();
  // const { events } = useRouter();
  // useEffect(() => {
  //   const handleRouteChange = () => (window._scrollY = window.scrollY);
  //   events.on('routeChangeStart', handleRouteChange);
  //   return () => {
  //     delete window._scrollY;
  //     events.off('routeChangeStart', handleRouteChange);
  //   };
  // }, []);
  // useEffect(() => void window.scrollTo(0, window._scrollY || window.scrollY));
  return (
    <div className={wrapper}>
      <Overlay />
      <Content className={content}>
        {/* TODO use standard translation processing.
                 The solution below clutters the resource space and isn't language-agnostic.
                 Cleanup: Search for mainResultsHeadline* resources and clean up.
        */}
        {activities.length === 1 ? (
        <h2 className={headline}>{t('mainResultsHeadlineSingle')}</h2>
        ) : (
          <h2 className={headline}>{t('mainResultsHeadlineMultiple', {count: activities.length})}</h2>
        )}
      </Content>
      <Cards height="high">
        {activities.map((activity) => (
          <div key={activity.slug}>
            <ActivityCard activity={activity} />
          </div>
        ))}
      </Cards>
      <Content className={content}>
        <FollowupActionsWrapper />
      </Content>
    </div>
  );
}
