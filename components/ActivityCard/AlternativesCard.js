import Link from 'next/link';

import { useTranslation } from '../../hooks';

import { Content } from '../Content';
import { H3 } from '../Typo';

export default function AlternativesCard({ activities }) {
  const { t } = useTranslation();
  return (
    <Content>
      <H3>{t('activityAlternativesHeadline')}</H3>
      <p>{t('activityAlternativesDescription')}</p>
      <ul>
        {activities.map(({ slug, name }) => (
          <li key={slug}>
            <Link href="/activity/[slug]" as={`/activity/${slug}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Content>
  );
}
