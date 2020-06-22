import Link from 'next/link';

import { Page, Slider, Headline, Subline } from '../components';
import { useTranslation } from '../hooks';

export default function Home({ activities }) {
  const { t } = useTranslation();
  return (
    <Page>
      <Headline>{t('mainHeadline')}</Headline>
      <Subline>{t('mainSubline')}</Subline>
      <Slider />
      <Link href="preferences">
        <a>{t('prefLink')}</a>
      </Link>
      <ul>
        {activities.map(({ name, slug, organization: org }, index) => (
          <li key={index}>
            <Link href="organization/[slug]" as={`organization/${org.slug}`}>
              <a>{org.name}</a>
            </Link>
            :{' '}
            <Link href="activity/[slug]" as={`activity/${slug}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
}

export async function getServerSideProps({ req, query, preview }) {
  const { getPrefs } = require('../utils/prefs');
  const { recommendActivities } = require('../services/activity');
  const { defaultEffort } = require('../hooks');

  const { e: effort = defaultEffort, p: page = 1 } = query;
  const num = Number(page) * 3;
  const prefs = getPrefs(req);

  const activities = await recommendActivities(effort, prefs, preview);

  return {
    props: {
      activities: activities.slice(0, num),
      moreActivities: num > activities.length,
    },
  };
}
