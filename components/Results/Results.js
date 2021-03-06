import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

import { useLoading, useTranslation, useEffort } from '../../hooks';

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
  const { t, hasTranslation } = useTranslation();
  const { getEffort } = useEffort();
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

  const headlineCaption = hasTranslation('mainResultsHeadline_' +  + getEffort())
      ? t('mainResultsHeadline_' + getEffort())
      : (

        /* TODO use standard translation processing.
                This clutters the resource space and isn't language-agnostic.
        */
        activities.length === 1 
        ? t('mainResultsHeadlineSingle')
        : t('mainResultsHeadlineMultiple', {count: activities.length})
      );

  
  return (
    <div className={wrapper}>
      <Overlay />
      <Content className={content}>
        <h2 className={headline}>{headlineCaption}</h2>
      </Content>
      <Cards height="high">
        {activities.map((activity) => (
          <div key={activity.slug}>
            <ActivityCard activity={activity} withDetailsButton={true} />
          </div>
        ))}
      </Cards>
      <Content className={content}>
        <FollowupActionsWrapper />
      </Content>
    </div>
  );
}
