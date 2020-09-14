import Link from 'next/link';

import { useTranslation } from '../../hooks';

import { Content } from '../Content';
import { H3 } from '../Typo';

import { alternativesWrapper } from './ActivityCard.module.css';

export default function AlternativesCard({ activities }) {
  const { t } = useTranslation();
  return (
    <Content className={alternativesWrapper}>
      <H3>{t('activityAlternativesHeadline')}</H3>
      <p>{t('activityAlternativesDescription')}</p>
      <ul>
        {activities.map(({ slug, title }) => (
          <li key={slug}>
            <Link href="/activity/[slug]" as={`/activity/${slug}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Content>
  );
}
