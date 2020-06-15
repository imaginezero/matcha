import { Fragment } from 'react';
import Link from 'next/link';

import { Slider, Login } from '../components';

export default function Home({ activities }) {
  return (
    <Fragment>
      <Slider />
      <Link href="preferences">
        <a>Einstellungen</a>
      </Link>
      <Login />
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
  const { getPrefs } = require('../utils/prefs');
  const { recommendActivities } = require('../services/activity');

  const { e: effort = 10, p: page = 1 } = query;
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
