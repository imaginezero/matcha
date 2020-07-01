import Link from 'next/link';

import { useEffort, useTranslation } from '../../hooks';

import { Content } from '../Content';
import { Headline } from '../Typo';
import { ActivityCard } from '../ActivityCard';

import { wrapper, headline, content, card, button } from './Results.module.css';

const Button = () => {
  const { getNextUrl } = useEffort();
  const { t } = useTranslation();
  return (
    <Link href={getNextUrl()} scroll={false}>
      <a className={button}>{t('mainResultsLoadMore')}</a>
    </Link>
  );
};

export default function Results({ activities, moreActivities }) {
  const { t } = useTranslation();
  return (
    <div className={wrapper}>
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
