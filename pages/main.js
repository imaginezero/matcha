import { Fragment } from 'react';
import Link from 'next/link';

import { Slider, Preferences } from '../components';

export default function Home({ activities }) {
  return (
    <Fragment>
      <Slider />
      <Preferences />
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
    </Fragment>
  );
}

export async function getServerSideProps({ req, query, preview }) {
  const { getData } = require('../services/data');
  const { getPrefsFilter } = require('../utils/prefs');

  const { e: effort = 10, p: page = 1 } = query;
  const minEffort = Math.max(Number(effort) - 10, 0);
  const maxEffort = Math.min(Number(effort), 100);
  const maxNum = Number(page) * 3;

  const { activities, activityTypes, organizations } = await getData(preview);

  const allActivities = activities
    .filter(
      ({ effortScore }) => effortScore > minEffort && effortScore <= maxEffort
    )
    .filter(getPrefsFilter(req));

  return {
    props: {
      activities: allActivities
        .sort((a, b) => b.impactScore - a.impactScore)
        .slice(0, maxNum)
        .map((activity) => ({
          ...activity,
          organization:
            organizations.find(
              (organization) => organization.name === activity.organization
            ) || null,
          type:
            activityTypes.find(
              (activityType) => activityType.name === activity.type
            ) || null,
        })),
      moreActivities: maxNum > allActivities.length,
    },
  };
}
